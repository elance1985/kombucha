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
    content.ts        # placeholder content source
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

## Next Steps

- Replace `lib/content.ts` with MDX files or a CMS-backed source
- Add product models and cart flows under a future shop module
- Add shared components (header/footer/navigation) as the app grows
