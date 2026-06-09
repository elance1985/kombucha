# Kombucha

Kombucha is a Next.js 14 (App Router) starter focused on a food/wellness brand.
It includes a minimal blog-ready content setup and a placeholder shop page for
future e-commerce work.

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Google Font via `next/font` (`Lora`)

## Project Structure

```text
kombucha/
  app/
    blog/
      [slug]/
        page.tsx      # dynamic article page
      page.tsx        # blog listing placeholder
    shop/
      page.tsx        # e-commerce placeholder
    globals.css
    layout.tsx
    page.tsx          # homepage with hero + article cards
  content/
    posts/            # reserved for markdown/mdx content
  lib/
    content.ts        # reads MDX posts from content/posts
    mdx.ts            # compiles MDX body for blog pages
  mdx-components.tsx  # styles for rendered MDX elements
```

## Routes

- `/` homepage with hero section and placeholder articles grid
- `/blog` placeholder blog listing
- `/blog/[slug]` dynamic blog post page
- `/shop` coming soon page

## Local Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing Strategy (simple + critical)

This project uses Cypress as the only testing tool, focused on critical user flows:

- homepage render + primary CTA
- mobile navbar hamburger interaction
- blog listing and navigation to a published article
- published blog articles (parametrized via `cypress/fixtures/critical-posts.ts`)
- one draft article smoke test with preview badge
- shop route render
- newsletter section copy, MailerLite embed wiring, and Italian success message

When you publish a new article, add it to `cypress/fixtures/critical-posts.ts`
with `published: true` instead of creating a new dedicated spec.

### Run Cypress locally

```bash
npm run test
```

Run all E2E specs:

```bash
npm run test:e2e
```

Interactive mode:

```bash
npm run test:e2e:open
```

## Pull Request Blocking Checks

On every pull request to `master`, GitHub Actions runs:

1. `npm run lint`
2. `npm run build`
3. Cypress critical E2E flows

Workflow file: `.github/workflows/pr-checks.yml`

To make it strictly blocking in GitHub UI, set this workflow status as **Required** in:
`Settings -> Branches -> Branch protection rules -> Require status checks`.

## Blog content (MDX)

Add a file under `content/posts/<slug>.mdx` with YAML frontmatter:

```mdx
---
title: Titolo dell'articolo
excerpt: Breve descrizione per l'elenco del blog
category: Ricette
draft: false
subtitle: Sottotitolo opzionale
readingTime: Circa 10 min di lettura
level: Principiante
---

Il corpo dell'articolo in **Markdown** o MDX.
```

- `slug` comes from the filename (`first-brew.mdx` → `/blog/first-brew`)
- Set `draft: false` when the article is ready to publish (hides preview badges)

## Next Steps

- Add product models and cart flows under a future shop module
- Add shared components (header/footer/navigation) as the app grows
