Deployment and Supabase setup
=============================

This document explains how to make the site work professionally across devices by using Supabase as a shared database and a GitHub Actions workflow to build and deploy the site.

1) Create a Supabase project
- Go to https://app.supabase.com and create a new project.
- From the SQL editor run the following to create a `teams` table:

```sql
create table if not exists teams (
  id text primary key,
  payload jsonb not null
);
```

2) Add GitHub repository secrets
- In your GitHub repo go to Settings → Secrets → Actions and add:
  - `VITE_SUPABASE_URL` — your Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` — the anon/public key

3) Enable GitHub Pages via Actions
- The included workflow (`.github/workflows/deploy.yml`) uses the official Pages actions. When you push to `main` (or `master`) it will build and deploy the `dist/` output.

4) Local testing and migration notes
- To test locally with Supabase, create a `.env` (or set your shell env) with the two env vars above and run:

```bash
npm ci
VITE_SUPABASE_URL=your_url VITE_SUPABASE_ANON_KEY=your_key npm run dev
```

- Migrating existing localStorage teams: open the admin UI in your browser, confirm the Supabase env vars are active (deployed site or local dev), then open the Admin → Teams and save/modify a team — the app will call `saveTeamsAndSync` and push to Supabase automatically. Alternatively, export the `nextgen_admin_teams` JSON from your browser and import via a small script that uses the Supabase client (I can add this script if desired).

5) Security note
- For testing you may relax RLS policies, but for production add RLS policies to restrict writes (or require authenticated users) if needed.

If you want, I can add a small `scripts/` migration helper to push existing team JSON into Supabase and/or add a GitHub Actions secret check and PR for enabling Pages deployment.
