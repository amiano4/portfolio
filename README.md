# Portfolio

A dark, minimal, content-focused personal portfolio built with Nuxt 4. Designed to be forkable — all personal content lives in local JSON files that are never committed.

---

## Stack

- **Nuxt 4** — framework
- **Tailwind CSS v4** — styling via `@theme` tokens
- **Nuxt Content** — blog posts (Markdown)
- **pnpm** — package manager

## Project Structure

```
app/
  assets/css/        # Tailwind + global styles
  components/        # SiteHeader, SiteFooter, ContactForm, ImageLightbox, LogoMark, SectionLabel
  layouts/           # default.vue
  pages/             # index, work, about, writing/[slug]
  utils/data.ts      # Types + re-exports from data/*.json
content/
  blog/              # Markdown blog posts
data/                # gitignored — personal content lives here
  examples/          # Template files — copy and rename to set up
public/
  favicon.svg
  resume.pdf         # gitignored — add your own
  snapshots/         # gitignored — add your own project screenshots
```

## Setup

### 1. Clone & install

```bash
git clone https://github.com/amiano4/portfolio.git
cd portfolio
pnpm install
```

### 2. Fill in your data

Copy the example files and fill in your own content:

```bash
cp data/examples/site.json data/site.json
cp data/examples/projects.json data/projects.json
cp data/examples/principles.json data/principles.json
cp data/examples/ai-tools.json data/ai-tools.json
```

All personal content — name, bio, projects, stack, social links, copy — is driven by these files. No TypeScript knowledge required to customize.

| File | What it controls |
|---|---|
| `data/site.json` | Name, hero copy, about page, page descriptions, contact links |
| `data/projects.json` | Work page — all project entries |
| `data/principles.json` | "How I Work" section on the home page |
| `data/ai-tools.json` | AI tooling section on home + about pages |

### 3. Add your assets

Asset URLs are configured in `data/site.json` and `data/projects.json` — they can point anywhere.

**Resume** — set the URL in `data/site.json`:
```json
"assets": {
  "resume": "https://your-cdn.com/resume.pdf"
}
```
Or drop a local file and keep the default `/resume.pdf` path (gitignored).

**Favicon** — optional. If set, overrides the default `/favicon.svg`:
```json
"assets": {
  "favicon": "https://your-cdn.com/favicon.svg"
}
```

**Project screenshots** — set full URLs directly in the `images` array of each project in `data/projects.json`:
```json
"images": [
  "https://your-cdn.com/snapshots/project/01.png"
]
```
Or use local files under `public/snapshots/[slug]/` (gitignored).

### 4. Run

```bash
pnpm dev
```

## Writing

Blog posts go in `content/blog/`. Each post needs frontmatter:

```md
---
title: Your Post Title
date: 2026-01-01
description: A short summary shown in the writing index.
---

Your content here.
```

## Design Tokens

Defined in `app/assets/css/main.css` via Tailwind v4 `@theme`:

| Token | Value | Usage |
|---|---|---|
| `bg-canvas` | `#080C14` | Page background |
| `bg-surface` | `#0c1221` | Card/section background |
| `bg-elevated` | `#111827` | Elevated surfaces |
| `text-accent` | `#0EA5E9` | Primary accent (electric blue) |
| `text-amber` | `#FBBF24` | Secondary accent |

Fonts: **Space Grotesk** (headings), **JetBrains Mono** (mono/labels), **Inter** (body) — loaded via Google Fonts.

## Deployment

```bash
# Static
pnpm generate

# SSR (Vercel, Render, etc.)
pnpm build
```
