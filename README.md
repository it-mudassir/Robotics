# NEXA Robotics — The Future, Delivered

A modern, premium e-commerce website for consumer robotics (AI companions, home assistants, and DIY/education kits). Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Dark, futuristic design** with glassmorphism, soft-glow accents, and smooth scroll/viewport animations
- **Home page** — hero, featured products grid, "Why NEXA" stats, use-case showcase, testimonials carousel, newsletter signup
- **Shop page** — filter by category, use case, and price; sort by featured, price, or rating
- **Product detail page** — image gallery, color variant selector, quantity stepper, specs table, customer reviews with write-a-review form
- **Cart drawer** — slide-in cart with quantity controls, localStorage persistence, and checkout confirmation
- **Sticky navbar** with live cart count, mobile menu, and hash-based routing
- **Fully responsive** mobile-first layout

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Supabase (Postgres database with RLS)
- lucide-react icons

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

The following are pre-configured in the deployment environment:

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key

## Deploy to Vercel

1. Push this repository to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite — no extra config needed
4. Add the environment variables above in the Vercel dashboard
5. Deploy

## License

MIT
