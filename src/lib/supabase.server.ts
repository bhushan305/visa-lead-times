/**
 * Server-only Supabase client. Reads from process.env at REQUEST time
 * so it works on Cloudflare Workers, Vercel, and Node.
 *
 * If Supabase credentials are missing, callers should fall back to the
 * live Apps Script API (data/live-api.server.ts).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export function hasSupabase(): boolean {
  return !!(process.env.SUPABASE_URL && (process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY));
}
