# TAEKMO Solar — Official Brand Website

Premium Next.js frontend for the TAEKMO solar energy brand homepage, implemented to match the supplied UI/UX showcase.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Lucide React
- Framer Motion
- `next/image`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Project structure

```
src/app/                 # App Router entry, metadata, styles
src/components/layout/   # Header, Footer
src/components/home/     # Homepage sections
src/components/products/ # Product card + filters
src/components/ui/       # Logo, Button, SectionReveal
src/data/                # Editable content & catalogue
src/types/               # Shared TypeScript types
public/images/           # Brand, hero, product, solution assets
```

## Notes

See [ASSETS.md](./ASSETS.md) for logo status, sample content, and deferred backend integrations.
