import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { SeriesPoint } from "@/lib/processing-times";

/**
 * Four-tier trend chart:
 *   - yearly  (FY closed)   → small dot, gray
 *   - ytd     (FY current)  → diamond, accent
 *   - monthly (avg)         → square, primary muted
 *   - daily   (snapshot)    → connected line with hi/lo band, primary
 *
 * Separators are drawn between tiers so users can see where each data source begins.
 */
export function ProcessingTimeChart({ series }: { series: SeriesPoint[] }) {
  if (!series.length) {
    return (
      <div className="border rule bg-card p-8 text-sm text-muted-foreground">
        No time-series data yet for this case. We collect new snapshots every weekday.
      </div>
    );
  }

  const findFirstOfType = (t: SeriesPoint["type"]) =>
    series.find((p) => p.type === t)?.label ?? null;

  const haveHistoric = series.some((p) => p.type === "yearly" || p.type === "ytd");
  const dailyStart = findFirstOfType("daily");
  // Only label the historic→recent boundary when historic data actually exists,
  // otherwise the label collapses on top of the "last 30 days →" tag.
  const historicEnd = haveHistoric
    ? findFirstOfType("monthly") ?? findFirstOfType("daily")
    : null;

  return (
    <div className="border rule bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Processing time trend
          </p>
          <p className="display text-2xl text-primary">Months to decision</p>
        </div>
        <Legend />
      </div>
      <div style={{ width: "100%", height: 340 }}>
        <ResponsiveContainer>
          <ComposedChart data={series} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
            <defs>
              <linearGradient id="rangeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              stroke="var(--color-rule)"
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              stroke="var(--color-rule)"
              unit=" mo"
              width={60}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-rule)" }} />

            {historicEnd && historicEnd !== dailyStart && (
              <ReferenceLine
                x={historicEnd}
                stroke="var(--color-rule)"
                strokeDasharray="3 3"
                label={{
                  value: "← historic",
                  position: "insideTopLeft",
                  fontSize: 10,
                  fill: "var(--color-muted-foreground)",
                }}
              />
            )}
            {dailyStart && (
              <ReferenceLine
                x={dailyStart}
                stroke="var(--color-rule)"
                strokeDasharray="3 3"
                label={{
                  value: "last 30 days →",
                  position: "insideTopRight",
                  fontSize: 10,
                  fill: "var(--color-muted-foreground)",
                }}
              />
            )}

            <Area
              type="monotone"
              dataKey="hi"
              stroke="none"
              fill="url(#rangeFill)"
              activeDot={false}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="lo"
              stroke="none"
              fill="var(--color-background)"
              activeDot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="midpoint"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={<TypedDot />}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        <strong className="text-foreground">FY bars</strong> are USCIS-published yearly national averages.{" "}
        <strong className="text-foreground">Monthly</strong> points average our daily snapshots.{" "}
        <strong className="text-foreground">Daily</strong> points are individual USCIS snapshots from the last 30 days.
      </p>
    </div>
  );
}

function TypedDot(props: any) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null) return null;
  const t = (payload as SeriesPoint).type;
  if (t === "yearly")
    return <circle cx={cx} cy={cy} r={3} fill="var(--color-muted-foreground)" />;
  if (t === "ytd")
    return (
      <rect
        x={cx - 4}
        y={cy - 4}
        width={8}
        height={8}
        transform={`rotate(45, ${cx}, ${cy})`}
        fill="var(--color-accent)"
      />
    );
  if (t === "monthly")
    return (
      <rect x={cx - 2.5} y={cy - 2.5} width={5} height={5} fill="var(--color-primary)" opacity={0.65} />
    );
  return <circle cx={cx} cy={cy} r={2.5} fill="var(--color-primary)" />;
}

function Legend() {
  return (
    <div className="hidden sm:flex items-center gap-3 text-[11px] text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-muted-foreground" /> FY
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 bg-accent rotate-45" /> YTD
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 bg-primary/65" /> Monthly
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-3 h-0.5 bg-primary" /> Daily
      </span>
    </div>
  );
}

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload as SeriesPoint;
  const tier =
    p.type === "daily"
      ? "Daily snapshot"
      : p.type === "monthly"
        ? "Monthly average"
        : p.type === "ytd"
          ? "Fiscal year (YTD)"
          : "Fiscal year average";
  return (
    <div className="border rule bg-card px-3 py-2 text-xs shadow-sm">
      <div className="font-medium text-foreground">{p.label}</div>
      <div className="text-muted-foreground mt-1">{tier}</div>
      <div className="mt-1 num">
        {p.lo === p.hi ? (
          <span className="text-primary font-medium">{p.midpoint.toFixed(1)} mo</span>
        ) : (
          <span className="text-primary font-medium">
            {p.lo.toFixed(1)}–{p.hi.toFixed(1)} mo
          </span>
        )}
      </div>
    </div>
  );
}
