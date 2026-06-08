/**
 * Client-side helpers used by routes/components.
 *
 * Data shapes mirror the server `repo.server.ts` DTOs but live here so the
 * client bundle doesn't pull in the Supabase SDK.
 */

export type CaseSummary = {
  slug: string;
  name: string;
  form: string;
  category: string;
  office: string;
  current_display: string | null;
};

export type FormGroup = {
  code: string;
  title: string;
  slug: string;
  count: number;
  cases: CaseSummary[];
};

export type DailyPoint = { d: string; lo: number; hi: number };
export type MonthlyPoint = { month: string; avg_lo: number; avg_hi: number };
export type HistoricYear = {
  fiscal_year: number;
  avg_months: number;
  is_ytd: boolean;
  classification: string;
};

export type CaseDetail = {
  summary: {
    slug: string;
    name: string;
    form_code: string;
    category: string;
    office: string;
    current_display: string | null;
    current_lo: number | null;
    current_hi: number | null;
    inquiry_date: string | null;
    last_change_date: string | null;
    as_of: string | null;
  };
  daily: DailyPoint[];
  monthly: MonthlyPoint[];
  historic: HistoricYear[];
};

/* ---------- Tiered series for the trend chart ----------
 * Tier 1 (right-most): last 30 days, one point per day
 * Tier 2: weekly averages from daily snapshots older than 30d
 * Tier 3: YTD national average from historic-pt for the current fiscal year
 *         (only if we don't already have any daily/weekly coverage for it)
 * Tier 4 (left-most): prior fiscal-year averages from historic-pt
 */
export type SeriesPoint = {
  label: string;
  midpoint: number;
  lo: number;
  hi: number;
  type: "daily" | "weekly" | "ytd" | "yearly";
  date: string; // sort key
};

/** ISO-week bucket key (Mon-anchored). "2026-W18" sorts lexicographically. */
function isoWeekKey(d: string): { key: string; weekStart: string } {
  const dt = new Date(d + "T00:00:00Z");
  // Move to Monday of this week
  const day = dt.getUTCDay(); // 0=Sun
  const mondayOffset = (day + 6) % 7;
  dt.setUTCDate(dt.getUTCDate() - mondayOffset);
  const monday = dt.toISOString().slice(0, 10);
  // ISO week number
  const jan1 = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  const daysSinceJan1 = Math.floor((dt.getTime() - jan1.getTime()) / 86400000);
  const week = Math.floor(daysSinceJan1 / 7) + 1;
  const key = `${dt.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
  return { key, weekStart: monday };
}

export function buildSeries(detail: CaseDetail): SeriesPoint[] {
  const points: SeriesPoint[] = [];

  /* ---------- Tier 4: prior fiscal years ----------
   * Dedupe by fiscal_year — if the repo accidentally returns more than one
   * classification, the chart line would zigzag between them. Keep the
   * first row per year (repo already sorts by year ASC + chose the best
   * classification, so first-write-wins is the right policy).
   */
  const seenYears = new Set<number>();
  const closedYears = detail.historic
    .filter((h) => !h.is_ytd && typeof h.avg_months === "number")
    .sort((a, b) => a.fiscal_year - b.fiscal_year)
    .filter((h) => {
      if (seenYears.has(h.fiscal_year)) return false;
      seenYears.add(h.fiscal_year);
      return true;
    });
  for (const y of closedYears) {
    points.push({
      label: `FY${String(y.fiscal_year).slice(-2)}`,
      midpoint: y.avg_months,
      lo: y.avg_months,
      hi: y.avg_months,
      type: "yearly",
      date: `${y.fiscal_year}-01-01`,
    });
  }

  /* ---------- Tier 3: current-FY YTD ---------- */
  const ytd = detail.historic.find((h) => h.is_ytd);
  const haveCurrentYearDaily = detail.daily.length > 0;
  if (ytd && !haveCurrentYearDaily) {
    points.push({
      label: `FY${String(ytd.fiscal_year).slice(-2)} YTD`,
      midpoint: ytd.avg_months,
      lo: ytd.avg_months,
      hi: ytd.avg_months,
      type: "ytd",
      date: `${ytd.fiscal_year}-06-15`,
    });
  }

  /* ---------- Tier 1 + 2: daily (last 30d) + weekly (older) ----------
   * Cutoff is "today minus 30", not "latest-snapshot minus 30". The latter
   * gives a misleading "last 30 days" label if the most recent snapshot is
   * stale (e.g. a missing day shifts the window). Anchor to wall-clock.
   */
  const sortedDaily = [...detail.daily].sort((a, b) => a.d.localeCompare(b.d));
  if (sortedDaily.length) {
    const today = new Date();
    const cutoff = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    cutoff.setUTCDate(cutoff.getUTCDate() - 30);
    const cutoffIso = cutoff.toISOString().slice(0, 10);

    const older = sortedDaily.filter((p) => p.d <= cutoffIso);
    const recent = sortedDaily.filter((p) => p.d > cutoffIso);

    // Tier 2: bucket older daily snapshots into ISO weeks.
    if (older.length) {
      const byWeek = new Map<string, { lo: number[]; hi: number[]; start: string }>();
      for (const p of older) {
        const { key, weekStart } = isoWeekKey(p.d);
        if (!byWeek.has(key)) byWeek.set(key, { lo: [], hi: [], start: weekStart });
        byWeek.get(key)!.lo.push(p.lo);
        byWeek.get(key)!.hi.push(p.hi);
      }
      for (const k of [...byWeek.keys()].sort()) {
        const b = byWeek.get(k)!;
        const lo = avg(b.lo);
        const hi = avg(b.hi);
        points.push({
          label: new Date(b.start + "T00:00:00Z").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          midpoint: (lo + hi) / 2,
          lo,
          hi,
          type: "weekly",
          date: b.start,
        });
      }
    }

    // Tier 1: daily detail for the last 30 days.
    for (const p of recent) {
      points.push({
        label: new Date(p.d + "T00:00:00Z").toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        midpoint: (p.lo + p.hi) / 2,
        lo: p.lo,
        hi: p.hi,
        type: "daily",
        date: p.d,
      });
    }
  }

  // Final sort by date so all four tiers chain left-to-right.
  return points.sort((a, b) => a.date.localeCompare(b.date));
}

function avg(xs: number[]) {
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

export function formatMonths(m: number | null | undefined) {
  if (m == null) return "—";
  if (m < 1) return `${Math.round(m * 30)} days`;
  return `${m.toFixed(1)} mo`;
}

export function trendDelta(series: SeriesPoint[]): { delta: number; pct: number } | null {
  const daily = series.filter((s) => s.type === "daily");
  if (daily.length < 2) return null;
  const first = daily[0].midpoint;
  const last = daily[daily.length - 1].midpoint;
  return { delta: last - first, pct: ((last - first) / first) * 100 };
}

/* ---------- Search ----------
 * Common-term aliases route the user to the form they almost certainly meant,
 * not to a derivative that happens to mention the term in its category text.
 * (e.g. "h1b" should surface I-129 H-1B petitions, not I-765 H-4 spouse EADs.)
 */
const ALIASES: Record<string, { form: string; subterm?: string }> = {
  h1b:           { form: "I-129", subterm: "h1b" },
  h1:            { form: "I-129", subterm: "h1" },
  h2a:           { form: "I-129", subterm: "h2a" },
  h2b:           { form: "I-129", subterm: "h2b" },
  l1:            { form: "I-129", subterm: "l" },
  o1:            { form: "I-129", subterm: "o" },
  h4:            { form: "I-539", subterm: "h4" },
  greencard:     { form: "I-485" },
  gc:            { form: "I-485" },
  aos:           { form: "I-485" },
  ead:           { form: "I-765" },
  workpermit:    { form: "I-765" },
  ap:            { form: "I-131" },
  advanceparole: { form: "I-131" },
  travel:        { form: "I-131" },
  citizenship:   { form: "N-400" },
  naturalization:{ form: "N-400" },
  fiance:        { form: "I-129F" },
  k1:            { form: "I-129F" },
  removeconditions: { form: "I-751" },
  roc:           { form: "I-751" },
  renewgreencard:{ form: "I-90" },
};

export function buildSearch(allCases: CaseSummary[], query: string): CaseSummary[] {
  const raw = query.trim().toLowerCase();
  if (!raw) return [];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const nTerm = norm(raw);
  if (!nTerm) return [];

  const alias = ALIASES[nTerm];
  const targetForm = alias ? norm(alias.form) : null;
  const subterm = alias?.subterm ?? null;

  const scored: { c: CaseSummary; score: number }[] = [];
  for (const c of allCases) {
    const nForm = norm(c.form);
    const nName = norm(c.name);
    const nCat = norm(c.category);
    const nOff = norm(c.office);

    let score = 0;

    // Alias path: the user said "h1b" → strongly prefer cases on that form
    // whose name/category also matches the sub-term ("h1b" inside I-129).
    if (targetForm) {
      if (nForm === targetForm) {
        score += 80;
        if (subterm && (nName.includes(subterm) || nCat.includes(subterm))) {
          score += 40; // exact petition type within the form
        }
      }
    }

    // Direct-match scoring (accumulates with alias score)
    if (nForm === nTerm) score += 100;
    else if (nForm.startsWith(nTerm)) score += 90;

    // Name matches the user's term as a code fragment ("h1b" in "I-129 H-1B ...")
    // We score this higher than a category description match, because matches
    // in the name correspond to the form/petition itself rather than a
    // derivative beneficiary mentioned in prose.
    if (nName.startsWith(nTerm)) score += 70;
    else if (nName.includes(nTerm)) score += 45;

    if (nCat.includes(nTerm)) score += 30;
    if (nOff.includes(nTerm)) score += 10;

    if (score > 0) scored.push({ c, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map((s) => s.c);
}

/**
 * Form/category-level search result. Each row represents a single (form, category)
 * group; the office list is collapsed behind it so the user picks the petition
 * type first, then the service center.
 */
export type GroupedResult = {
  form: string;
  category: string;
  offices: { slug: string; office: string; current_display: string | null }[];
  primarySlug: string; // first office — used as the "open" target
  rangeDisplay: string | null; // representative range (first office) for the row
};

export function buildSearchGrouped(allCases: CaseSummary[], query: string): GroupedResult[] {
  const hits = buildSearch(allCases, query);
  if (!hits.length) return [];

  // Bucket by (form, category) preserving relevance order.
  const order: string[] = [];
  const groups = new Map<string, GroupedResult>();
  for (const c of hits) {
    const key = `${c.form}::${c.category}`;
    if (!groups.has(key)) {
      order.push(key);
      groups.set(key, {
        form: c.form,
        category: c.category,
        offices: [],
        primarySlug: c.slug,
        rangeDisplay: c.current_display,
      });
    }
    groups.get(key)!.offices.push({
      slug: c.slug,
      office: c.office,
      current_display: c.current_display,
    });
  }

  // Fill in any siblings we didn't surface via top-20 (so office count is accurate
  // for the picker on the detail page). Bounded to the same (form, category) pair.
  for (const c of allCases) {
    const key = `${c.form}::${c.category}`;
    const g = groups.get(key);
    if (g && !g.offices.some((o) => o.slug === c.slug)) {
      g.offices.push({ slug: c.slug, office: c.office, current_display: c.current_display });
    }
  }

  return order.map((k) => groups.get(k)!).slice(0, 12);
}
