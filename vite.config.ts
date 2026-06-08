// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Default to Vercel as the deploy target. Override with DEPLOY_TARGET=netlify|cloudflare.
// We need a Node-compatible preset because Supabase + the sync script use node:fs.
const target =
  process.env.DEPLOY_TARGET === "netlify"
    ? "netlify"
    : process.env.DEPLOY_TARGET === "cloudflare"
      ? "cloudflare-pages"
      : "vercel";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: target,
    // Force-include tslib in the serverless bundle. Without this, Nitro
    // externalizes tslib (as a transitive dep of @supabase/auth-js) but
    // Vercel's lambda trace doesn't pick it up, and the function crashes at
    // runtime with ERR_MODULE_NOT_FOUND. Adding it to noExternal tells Nitro
    // to bundle it directly into the function code.
    noExternal: ["tslib"],
    // Belt-and-suspenders: also tell nodeFileTrace to keep tslib's node_modules
    // entry, in case Nitro decides to externalize anyway.
    externals: {
      traceInclude: ["tslib"],
    },
  },
});
