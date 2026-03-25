# Agent Instructions

## Project
Dark, minimal personal portfolio built with Nuxt 4, Tailwind v4, and Nuxt Content. All personal content is driven by `data/*.json` files (gitignored). The codebase is designed to be a generic forkable template.

## Important Notes
- **Never commit or push without explicit user approval.** Always present changes first.
- Do not hardcode personal information in Vue components — all content belongs in `data/*.json`.
- `data/` is gitignored. The example templates are in `data/examples/`.
- Asset URLs are configured in `data/site.json` under `assets` — `resume` (required) and `favicon` (optional, falls back to `/favicon.svg`). Project screenshot URLs live in `data/projects.json` under each project's `images[]`. All of these accept absolute URLs pointing to any external host.
- `public/resume.pdf`, `public/snapshots/`, and `public/favicon.svg` are local fallbacks and are gitignored where applicable.
- Import data via `import { site, projects, principles, aiTools } from '~/utils/data'` — `~` resolves to `app/`.
- Dark-only design. No light mode.

## Dev Server
```bash
pnpm dev --port 3333 > /tmp/portfolio-dev.log 2>&1 &
pkill -f "nuxt.mjs dev"   # stop
```
