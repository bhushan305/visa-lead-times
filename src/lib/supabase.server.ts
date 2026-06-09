/**
 * Server-only Supabase client — implemented as a thin wrapper over PostgREST.
 *
 * We previously used `@supabase/supabase-js` here, but that pulls in
 * `@supabase/auth-js` which transitively requires `tslib`. Nitro's bundler
 * externalizes `tslib` and Vercel's lambda trace doesn't pick it up, so the
 * function crashes at runtime with `ERR_MODULE_NOT_FOUND`.
 *
 * The supabase-js client gives us auth, realtime, storage, and edge-functions.
 * We only need basic CRUD against PostgREST. Implementing that directly with
 * fetch() avoids the entire transitive-dep chain.
 *
 * The exported API matches the small subset of supabase-js we actually call
 * (`from(table).select(cols).eq(col, val).order(col).maybeSingle()` and
 * `.insert()`, `.upsert()`) so callers don't need to change.
 */

let cachedUrl: string | null = null;
let cachedKey: string | null = null;

function readUrl(): string | null {
  if (cachedUrl) return cachedUrl;
  cachedUrl =
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL ??
    null;
  return cachedUrl;
}
function readKey(): string | null {
  if (cachedKey) return cachedKey;
  cachedKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    null;
  return cachedKey;
}

export function hasSupabase(): boolean {
  return !!(readUrl() && readKey());
}

/** Encode a PostgREST filter value (handles strings with reserved chars). */
function fq(value: unknown): string {
  return encodeURIComponent(String(value));
}

class Query {
  private url: string;
  private key: string;
  private table: string;
  private cols = "*";
  private filters: string[] = [];
  private orderBy: string | null = null;
  private rangeLimit: number | null = null;

  constructor(url: string, key: string, table: string) {
    this.url = url;
    this.key = key;
    this.table = table;
  }

  select(cols: string) {
    this.cols = cols;
    return this;
  }
  eq(col: string, value: unknown) {
    this.filters.push(`${col}=eq.${fq(value)}`);
    return this;
  }
  gte(col: string, value: unknown) {
    this.filters.push(`${col}=gte.${fq(value)}`);
    return this;
  }
  in(col: string, values: unknown[]) {
    const list = values.map((v) => encodeURIComponent(String(v))).join(",");
    this.filters.push(`${col}=in.(${list})`);
    return this;
  }
  not(col: string, op: string, value: unknown) {
    this.filters.push(`${col}=not.${op}.${fq(value)}`);
    return this;
  }
  order(col: string, opts?: { ascending?: boolean }) {
    const dir = opts?.ascending === false ? "desc" : "asc";
    this.orderBy = `${col}.${dir}`;
    return this;
  }
  limit(n: number) {
    this.rangeLimit = n;
    return this;
  }

  private buildUrl(): string {
    const params = [...this.filters, `select=${this.cols}`];
    if (this.orderBy) params.push(`order=${this.orderBy}`);
    if (this.rangeLimit != null) params.push(`limit=${this.rangeLimit}`);
    return `${this.url}/rest/v1/${this.table}?${params.join("&")}`;
  }

  private headers(): Record<string, string> {
    return {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      "Content-Type": "application/json",
    };
  }

  /** Resolve as a Promise<{ data, error }>. */
  then<TResult1 = { data: any[]; error: any }, TResult2 = never>(
    onfulfilled?:
      | ((value: { data: any[]; error: any }) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined
  ): Promise<TResult1 | TResult2> {
    return this.exec().then(onfulfilled as any, onrejected);
  }

  private async exec(): Promise<{ data: any[]; error: any }> {
    try {
      const res = await fetch(this.buildUrl(), { headers: this.headers() });
      if (!res.ok) {
        const text = await res.text();
        return {
          data: [],
          error: { message: text, code: String(res.status) },
        };
      }
      const data = await res.json();
      return { data, error: null };
    } catch (e: any) {
      return { data: [], error: { message: e?.message ?? String(e) } };
    }
  }

  /** Convenience: return the first row or null. Matches supabase-js .maybeSingle(). */
  async maybeSingle(): Promise<{ data: any | null; error: any }> {
    const { data, error } = await this.exec();
    if (error) return { data: null, error };
    return { data: data?.[0] ?? null, error: null };
  }
}

class Table {
  constructor(
    private url: string,
    private key: string,
    private table: string
  ) {}

  select(cols = "*") {
    return new Query(this.url, this.key, this.table).select(cols);
  }

  async insert(rows: any | any[]) {
    const body = Array.isArray(rows) ? rows : [rows];
    try {
      const res = await fetch(`${this.url}/rest/v1/${this.table}`, {
        method: "POST",
        headers: {
          apikey: this.key,
          Authorization: `Bearer ${this.key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: { message: text, code: String(res.status) } };
      }
      return { data: null, error: null };
    } catch (e: any) {
      return { data: null, error: { message: e?.message ?? String(e) } };
    }
  }

  async upsert(rows: any | any[], opts?: { onConflict?: string }) {
    const body = Array.isArray(rows) ? rows : [rows];
    const params = opts?.onConflict ? `?on_conflict=${opts.onConflict}` : "";
    try {
      const res = await fetch(`${this.url}/rest/v1/${this.table}${params}`, {
        method: "POST",
        headers: {
          apikey: this.key,
          Authorization: `Bearer ${this.key}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: { message: text, code: String(res.status) } };
      }
      return { data: null, error: null };
    } catch (e: any) {
      return { data: null, error: { message: e?.message ?? String(e) } };
    }
  }
}

class SupabaseLite {
  constructor(
    private url: string,
    private key: string
  ) {}
  from(table: string) {
    return new Table(this.url, this.key, table);
  }
  /** Stubbed — we don't call rpc on the read path; kept for type compat. */
  async rpc(_name: string, _params?: any) {
    return { data: null, error: null };
  }
}

export type SupabaseClient = SupabaseLite;

let cached: SupabaseLite | null = null;

export function getSupabase(): SupabaseLite | null {
  if (cached) return cached;
  const url = readUrl();
  const key = readKey();
  if (!url || !key) return null;
  cached = new SupabaseLite(url, key);
  return cached;
}
