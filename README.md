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
- `NUXT_GITHUB_TOKEN` for higher GitHub API rate limits
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

The projects page loads public repositories from the configured GitHub profile through:

- `server/api/projects.get.ts`

Local portfolio-specific overrides live in:

- `shared/site.ts`

That means you can:

- feature specific repos
- add custom highlights/stack labels
- hide repos from the portfolio
- keep GitHub as the source of truth for the repo list
