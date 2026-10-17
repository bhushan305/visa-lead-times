#!/usr/bin/env bash
# One-time setup of Visa Case Times on a (new) Mac. Safe to re-run.
#
#   git clone https://github.com/bhushan305/visa-lead-times.git ~/Claude/VisaLeadTime
#   cd ~/Claude/VisaLeadTime && npm run setup
#
# What it does: checks git + Node 22, installs dependencies, creates
# .env.local (from Vercel if possible), checks the required keys, and prints
# the remaining manual steps (Claude desktop folder, Chrome extension,
# scheduled task). See SETUP.md, "Moving to a new Mac".
set -euo pipefail
cd "$(dirname "$0")/.."

say() { printf '\n==> %s\n' "$*"; }
die() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

say "Checking prerequisites"
command -v git >/dev/null || die "git not found. Run: xcode-select --install"
command -v node >/dev/null || die "Node not found. Install Node 22 (brew install node@22, or nvm install 22)"
major=$(node -p 'process.versions.node.split(".")[0]')
[ "$major" -ge 22 ] || die "Node $major found; this project uses Node 22 (see .nvmrc)"
echo "git $(git --version | awk '{print $3}'), node $(node -v)"

say "Installing dependencies"
npm install --no-audit --no-fund

if [ ! -f .env.local ]; then
  say ".env.local not found: pulling Production env vars from Vercel (project visa-lead-times-v2)"
  echo "A browser window may open to log in to Vercel."
  npx --yes vercel link --yes --scope bhushan-projects --project visa-lead-times-v2 \
    && npx --yes vercel env pull .env.local --environment=production --yes \
    || echo "Vercel pull failed. Copy .env.local from the old Mac instead (see SETUP.md)."
fi

say "Checking .env.local"
[ -f .env.local ] || die ".env.local is missing. Copy it from the old Mac, or fill it in from .env.example (SETUP.md lists where each value lives)."
missing=""
for k in SUPABASE_URL SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY APPS_SCRIPT_URL; do
  v=$(grep -E "^$k=" .env.local | head -1 | cut -d= -f2- | tr -d '"' || true)
  [ -n "$v" ] || missing="$missing $k"
done
if [ -n "$missing" ]; then
  echo "Empty in .env.local:$missing"
  echo "Vercel won't export 'Sensitive' variables. Copy them from the Supabase dashboard"
  echo "(Project Settings > API) or from the old Mac's .env.local."
else
  echo "All required keys are set."
fi

say "Checking git remote"
git remote get-url origin
git fetch --quiet origin && git status -sb | head -1

cat <<'MSG'

==> Remaining manual steps (one time, see SETUP.md):
  1. Claude desktop app: add this folder to Cowork ("Add folder").
  2. Chrome: install the Claude extension and sign in, then open
     https://egov.uscis.gov/processing-times once to confirm it loads.
  3. Scheduled task "USCIS daily scrape": in the Claude desktop app on this
     Mac, open the task and turn on "Require this computer" (or ask Claude
     to re-link it). If it asks which Chrome to use, pick this Mac's.
  4. Try it: npm run dev  ->  http://localhost:3010

MSG
