# Portfolio

Dark, motion-rich personal portfolio built with **Nuxt 4**, **Tailwind v4**, and **Nuxt Content**. Personal content is driven by local JSON files and optional external asset URLs so the project stays forkable.

---

## Current features

- home / about / work / writing pages
- markdown blog posts via Nuxt Content
- contact form API endpoint
- cursor trail + ambient background motion
- glass / backdrop-blur card treatment
- route-level page reveal animations (no global page fade)
- SEO layer with canonical / OG / Twitter metadata
- structured data (`WebSite`, `Person`, `ProfilePage`, `AboutPage`, `CollectionPage`, `Article`)
- generated `robots.txt` and `sitemap.xml`

## Stack

- **Nuxt 4**
- **Tailwind CSS v4**
- **Nuxt Content**
- **pnpm**

## Project structure

```text
app/
  assets/css/          # global styles, motion, transitions
  components/          # header, footer, contact form, cursor/background FX, lightbox
  composables/         # SEO helper, reveal logic
  layouts/             # default layout
  pages/               # index, work, about, writing/[slug]
  utils/data.ts        # types + data re-exports
server/
  api/                 # contact form endpoint (local/private implementation)
  routes/              # robots.txt, sitemap.xml
data/                  # local content source
content/
  blog/                # markdown posts
```

## Setup

### 1. Install

```bash
git clone https://github.com/amiano4/portfolio.git
cd portfolio
pnpm install
```

### 2. Fill in your data

Copy the example files and customize them:

```bash
cp data/examples/site.json data/site.json
cp data/examples/projects.json data/projects.json
cp data/examples/principles.json data/principles.json
cp data/examples/ai-tools.json data/ai-tools.json
```

| File | Controls |
|---|---|
| `data/site.json` | branding, hero copy, about page, contact info, SEO config |
| `data/projects.json` | work page entries + featured projects |
| `data/principles.json` | “How I Work” section |
| `data/ai-tools.json` | AI tooling sections |

### 3. Assets

Asset URLs are **data-driven** and can point to your own CDN / R2 / external host.

#### Resume

```json
"assets": {
  "resume": "https://your-cdn.com/resume.pdf"
}
```

#### Optional logo / favicon

The app supports them if you provide URLs in `data/site.json`, but does **not** ship tracked logo or favicon fallback assets.

```json
"assets": {
  "logo": "https://your-cdn.com/logo.svg",
  "favicon": "https://your-cdn.com/favicon.svg"
}
```

If omitted:
- logo falls back to text branding
- favicon link is not injected

#### Project screenshots

```json
"images": [
  "https://your-cdn.com/snapshots/project-01.png"
]
```

Use externally hosted image URLs so the template stays clean and reusable.

### 4. Social preview images

Page-level OG images are configured in `data/site.json`:

```json
"seo": {
  "siteUrl": "https://your-domain.com",
  "images": {
    "home": "https://your-cdn.com/og/home.png",
    "about": "https://your-cdn.com/og/about.png",
    "work": "https://your-cdn.com/og/work.png",
    "writing": "https://your-cdn.com/og/writing.png"
  }
}
```

### 5. Run

```bash
pnpm dev
```

## Writing

Create blog posts under:

```text
content/blog/
```

Each post needs frontmatter like:

```md
---
title: Your Post Title
date: 2026-01-01
description: Short summary for index and SEO
tags:
  - Nuxt
  - TypeScript
---

Your content here.
```

## SEO

Current SEO setup includes:

- `usePageSeo()` helper for page metadata
- canonical URLs
- Open Graph / Twitter metadata
- per-page social image support
- global `WebSite` + `Person` schema
- page/article JSON-LD
- `/robots.txt`
- `/sitemap.xml`

Make sure `data/site.json > seo.siteUrl` matches production.

## Type checking

```bash
pnpm exec nuxi typecheck
```

## Design tokens

Defined in `app/assets/css/main.css`:

| Token | Value |
|---|---|
| canvas | `#080C14` |
| surface | `#0C1221` |
| elevated | `#111927` |
| accent | `#0EA5E9` |
| accent dim | `#0284C7` |
| amber | `#FBBF24` |

Fonts:
- **Space Grotesk**
- **JetBrains Mono**
- **Inter**

## Deployment

```bash
# static
pnpm generate

# SSR
pnpm build
```

For deployment, provide your production env vars and asset URLs through your hosting platform / runtime configuration.
