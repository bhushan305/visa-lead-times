/**
 * Server-only Supabase client. Reads from process.env at REQUEST time
 * so it works on Cloudflare Workers, Vercel, and Node.
 *
 * If Supabase credentials are missing, callers should fall back to the
 * live Apps Script API (data/live-api.server.ts).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

// Support both old and new Supabase key naming, plus Next-style prefixes,
// so the same env-vars work whether they were configured for a Next.js,
// Vite, or vanilla deployment.
function readUrl() {
  return (
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.VITE_SUPABASE_URL ??
    null
  );
}
function readKey() {
  return (
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.VITE_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? // fallback: scripts/cron can reuse this
    process.env.SUPABASE_SECRET_KEY ??
    null
  );
}

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;
  const url = readUrl();
  const key = readKey();
  if (!url || !key) return null;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export function hasSupabase(): boolean {
  return !!(readUrl() && readKey());
}
