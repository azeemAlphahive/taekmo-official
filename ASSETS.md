# TAEKMO Assets & Content Notes

## Logo

- Official wordmark: `public/images/brand/taekmo-logo.png` (dark letters) and `taekmo-logo-light.png` (white letters for dark headers).
- Wired through `src/components/ui/Logo.tsx` (`variant="light"` | `"dark"`).

## Imagery

Local Unsplash photography (free license) stored under `public/images/`:

| Path | Role |
|------|------|
| `hero/solar-farm.jpg` | Homepage hero background |
| `solutions/solutions-bg.jpg` | Solutions section background |
| `solutions/*.jpg` | Residential / Commercial / Industrial / Utility cards |
| `products/*.jpg` | Product card imagery (illustrative placeholders) |
| `promo/technician.jpg` | Why Choose / story promo |

Product cutouts and official brand photography should replace these when available.

## Sample content

- Stats in `src/data/content.ts` are **editable placeholders**.
- Product names, prices, and descriptions in `src/data/products.ts` are **illustrative** until business-verified.
- No fabricated certifications, testimonials, or verified technical claims.

## Product detail page

- Route: `/products/[slug]` (e.g. `/products/taekmo-hi-mo-6-585w`)
- Detail content lives in `src/data/products.ts` (`productDetails`)
- Specs, warranty terms, and prices are **illustrative** until business-verified
- Datasheets / PDFs are marked unavailable (no dummy file links)
- Reviews tab uses an empty state — no fabricated ratings or testimonials
- Inquiry form is demo-only until a CRM/email backend is connected

## Backend boundaries (not implemented)

- Product verification form → demo-only frontend state
- Newsletter signup → demo-only frontend validation
- Product inquiry form → demo-only frontend state
- Auth, admin, payments, inventory, QR API → deferred

## Design reference

Primary UI/UX source of truth: the supplied TAEKMO Solar Energy UI/UX Showcase image.
