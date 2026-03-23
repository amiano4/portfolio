# Almario Portfolio

Nuxt 4 portfolio starter focused on:

- product-grade presentation
- blog support via local markdown content
- GitHub-powered `/projects`
- AI/tooling and workflow positioning
- dark mode + quick command palette

## Stack

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS v4
- Nuxt Content
- Nuxt Color Mode

## Setup

```bash
pnpm install
cp .env.example .env
```

Update these values if needed:

- `NUXT_PUBLIC_GITHUB_USERNAME`
- `NUXT_GITHUB_TOKEN` for higher GitHub API rate limits and private repo access
- `NUXT_PUBLIC_CONTACT_EMAIL`
- `NUXT_PUBLIC_SITE_URL`

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Content

Blog posts live in:

- `content/blog/*.md`

## GitHub project wiring

The projects page is powered by Nuxt/Nitro server routes in this same app:

- `server/api/projects.get.ts`
- `server/api/project-assets/[owner]/[repo]/[...asset].ts`

Local portfolio-specific overrides still live in:

- `shared/site.ts`

That means you can:

- read public and private repos server-side
- keep GitHub as the primary metadata source
- enrich projects with optional per-repo portfolio files
- safely proxy private snapshot assets without exposing the token

## Repo-level portfolio metadata

Each project repo can optionally include:

```txt
repo/
  .portfolio/
    info.json
    snapshots/
      cover.webp
      01.webp
      02.webp
```

Notes:

- `.portfolio/info.json` is optional
- `.portfolio/snapshots/*` is optional
- GitHub metadata is still used as fallback if some fields are missing
- `.portfolio` is meant for portfolio curation, not app/runtime code

## Recommended GitHub topic conventions

GitHub topics are the preferred day-to-day workflow for organizing projects.
Use `.portfolio/info.json` only when you need extra curation like snapshots, role/highlights overrides, or custom titles/summaries.

### Section / placement topics

These decide where a repo shows up in the portfolio:

- `featured-project` → Featured Projects
- `project` → Projects
- `tool` → Tools / Plugins
- `plugin` → Tools / Plugins
- `template` → Tools / Plugins
- `boilerplate` → Tools / Plugins
- `package` → Tools / Plugins

### Platform / product-type topics

These describe what the project is:

- `web-app`
- `website`
- `mobile`
- `android`
- `ios`
- `desktop`
- `iot`
- `internal-tool`
- `capstone`

### Stack / technical topics

These remain normal GitHub topics and help with categorization/fallbacks:

- `php`
- `javascript`
- `typescript`
- `laravel`
- `vue`
- `quasar`
- `electron`
- `symfony`
- `nuxt`
- `docker`

## Portfolio presentation rules

Recommended interpretation of topics:

- `featured-project` → show in **Featured Projects**
- `project` or app/platform topics like `web-app`, `website`, `mobile`, `desktop`, `android`, `ios`, `iot` → show in **Projects**
- `tool`, `plugin`, `package`, `template`, `boilerplate` → show in **Tools / Plugins**

### Suggested terminology

To keep the portfolio consistent, prefer these labels:

- **Featured Projects**
- **Projects**
- **Tools / Plugins**

And for repo topics, these are cleaner than vague terms:

- `web-app` instead of just `web`
- `internal-tool` instead of only `admin`
- `featured-project` instead of a generic `featured`
- `tool` / `plugin` / `package` / `template` depending on the repo type

## Metadata fallback behavior

If `.portfolio/info.json` exists, it can override fields like:

- title
- summary
- role
- categories
- stack
- highlights
- snapshots
- visibility-related presentation fields

If `.portfolio/info.json` is missing or incomplete, the app falls back to full GitHub metadata such as:

- repo name
- description
- topics
- language
- homepage
- stars / forks
- updated date

## Visibility and access model

There are two layers:

1. **Token access**
   - controlled by the fine-grained GitHub token
   - decides which repos the app can read at all

2. **Portfolio presentation**
   - controlled by GitHub topics and optional `.portfolio/info.json`
   - decides how a readable repo is displayed in the portfolio
