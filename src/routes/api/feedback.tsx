import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

/**
 * Feedback submission endpoint. Writes directly to Supabase via PostgREST
 * (not @supabase/supabase-js — see supabase.server.ts for the rationale).
 *
 * Inputs come from the public site so we validate aggressively here. The
 * service-role key bypasses RLS to write to the read-locked feedback table.
 */
export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      email: string;
      message: string;
      user_name?: string | null;
      page_path?: string | null;
      case_slug?: string | null;
      user_agent?: string | null;
      user_id?: string | null;
    }) => d
  )
  .handler(async ({ data }) => {
    const email = String(data.email ?? "").trim();
    const message = String(data.message ?? "").trim();
    if (!email.includes("@") || email.length < 3 || email.length > 320) {
      return { ok: false, reason: "invalid-email" as const };
    }
    if (message.length < 1 || message.length > 4000) {
      return { ok: false, reason: "invalid-message" as const };
    }
    const name = data.user_name?.trim().slice(0, 120) || null;

    const url =
      process.env.SUPABASE_URL ??
      process.env.NEXT_PUBLIC_SUPABASE_URL ??
      process.env.VITE_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) return { ok: false, reason: "no-supabase" as const };

    try {
      const res = await fetch(`${url}/rest/v1/feedback`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify([
          {
            user_name: name,
            email,
            message,
            page_path: data.page_path ?? null,
            case_slug: data.case_slug ?? null,
            user_agent: data.user_agent?.slice(0, 512) ?? null,
            user_id: data.user_id ?? null,
          },
        ]),
      });
      if (!res.ok) {
        const text = await res.text();
        return { ok: false, reason: `db-error: ${text.slice(0, 200)}` };
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, reason: e?.message ?? String(e) };
    }
  });

export const Route = createFileRoute("/api/feedback")({
  component: () => null,
});
