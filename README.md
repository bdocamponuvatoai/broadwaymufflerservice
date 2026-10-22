# Broadway Muffler Service

Website for Broadway Muffler Service, an exhaust shop at 2596 N Main St, Walnut Creek, CA. Built with Next.js (App Router), React, Tailwind CSS and TypeScript. Every route is prerendered as static HTML.

The site is **not indexed** until the owner approves launch. See [Pre-launch checklist](#pre-launch-checklist).

## Quick start

Requires Node 24 (see `.nvmrc`; Node 22.18 or later works).

```sh
npm ci
npm run dev          # http://localhost:3000
```

## Scripts

| Script              | What it does                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`       | Development server                                                                                                                                  |
| `npm run build`     | Production build                                                                                                                                    |
| `npm run start`     | Serve the production build                                                                                                                          |
| `npm run check`     | Format check, zero-warning lint, typecheck and unit tests. CI runs this.                                                                            |
| `npm run lint`      | ESLint with `--max-warnings=0`                                                                                                                      |
| `npm run typecheck` | `next typegen && tsc --noEmit`. `next typegen` is required: `next-env.d.ts` is gitignored, so a clean checkout can't type image imports without it. |
| `npm run test`      | Unit tests for the request-form logic (Node's built-in test runner, no framework)                                                                   |
| `npm run test:e2e`  | Playwright end-to-end and accessibility tests against the production build                                                                          |
| `npm run format`    | Prettier, including Tailwind class sorting                                                                                                          |

### End-to-end tests

```sh
npm run build
npx playwright install firefox webkit     # once
PW_CHANNEL=msedge npx playwright test    # Chromium projects reuse installed Edge (or use chrome)
```

Five projects run: desktop Chromium, Firefox and WebKit, plus Pixel 7 and iPhone 15. Any console error fails a test, which also catches Content Security Policy violations. `e2e/accessibility.spec.ts` runs axe with WCAG 2.2 AA tags on every page, every form step, the gallery lightbox and the mobile menu.

## Environment

Copy `.env.example` to `.env.local`.

| Variable                     | Default                 | Purpose                                                                                    |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`       | `http://localhost:3000` | Canonical origin for metadata, sitemap and structured data                                 |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false`                 | `true` removes `noindex` and opens `robots.txt`. Set only after the owner approves launch. |

## Structure

```text
app/                    routes, layout, metadata routes, error pages, icon.svg
  services/[slug]/      four service pages, generated from lib/content.ts
  globals.css           design tokens (@theme), utilities, motion
components/
  sections/             page sections (hero, services grid, exhaust diagram, FAQ…)
  request/              the three-step request form
  site-header.tsx, site-footer.tsx, mobile-action-bar.tsx, reveal-observer.tsx, work-gallery.tsx
  ui.tsx, icons.tsx     shared primitives
lib/
  site.ts               business facts and navigation: the single source of truth
  content.ts            services, exhaust parts, gallery, FAQs
  request.ts            pure form logic (validation, message, mailto), unit-tested in request.test.ts
  metadata.ts           per-page metadata helper
e2e/                    Playwright specs
assets/images/          images imported by next/image (blur placeholders)
public/og.jpg           1200 × 630 social preview
source-assets/          original PNG and photo masters; not deployed
docs/                   content provenance and image prompts
```

Components never hard-code contact details: change the phone number, email or address in `lib/site.ts` and it updates everywhere, including structured data and the global error page.

## How it works

- **Server Components by default.** Client components are only the header and menu, mobile action bar, reveal observer, exhaust diagram, work gallery and request form.
- **Request form.** Validates in the browser, shows a review step, then opens an email draft to the shop with `mailto:`. Nothing is sent, stored or booked, and the wording never claims a booking. `/request?service=<slug>` preselects a service.
- **Native `<dialog>`** for the mobile menu and gallery lightbox: focus trapping, Escape to close and focus return (handled explicitly, because Safari doesn't focus buttons on click).
- **Motion.** One `RevealObserver` serves every `data-reveal` element. Content is hidden-until-revealed only when scripting is on and reduced motion is off. Without JavaScript, everything is visible and the phone link works.
- **Security headers** (production only, in `next.config.ts`): strict CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, COOP and Permissions-Policy. Adding analytics or embeds means extending the CSP, or the e2e console check will fail.

## Design system

The palette comes from the shop itself:

| Token    | Value     | Source                                                      |
| -------- | --------- | ----------------------------------------------------------- |
| `signal` | `#b8261b` | Red Broadway Muffler bumper sticker in the shop's own photo |
| `ink`    | `#15171a` | Soot and graphite                                           |
| `steel`  | `#575d65` | Galvanized corrugated walls of the bay                      |
| `paper`  | `#f4f2ed` | Warm primer white                                           |
| `lift`   | `#f2b631` | Yellow lift ramps; focus rings on dark backgrounds          |

Type is Barlow Condensed for headlines and Barlow for text. Barlow was drawn from California highway signs and licence plates, which suits a Walnut Creek car shop.

The signature element is the **"Follow the pipe" diagram** (`components/sections/exhaust-finder.tsx`): an exhaust system from manifold to tailpipe, where each part shows common symptoms and links to the matching service. It's an accessible tab list, and phones get a tighter crop of the drawing.

Contrast is checked for every text pairing. Steel on paper is 5.9:1, white on signal 6.3:1, and paper text on ink no lower than 65% opacity (7.3:1). The wordmark is a proposed identity, because the shop hasn't supplied a logo.

## Content rules

Read `docs/content-sources.md` before changing any business fact. In short:

- Only facts traceable to supplied details or public listings appear on the site.
- No ratings, review counts, retyped reviews, hours, guarantees, pricing, licence numbers or years in business until the owner confirms them.
- The five AI-generated service images are final assets (`docs/image-generation.md`). Never caption them as the shop's own jobs. The work gallery uses real photos only.

## Measured results

Lighthouse 13.5.0, mobile preset, local production build on a laptop, three runs per page, 2026-10-23. These are not live-site scores.

| Page                        | Performance | Accessibility | Best practices | SEO (indexing on) |
| --------------------------- | ----------- | ------------- | -------------- | ----------------- |
| Home                        | 92–100      | 100           | 100            | 100               |
| Catalytic converter service | 95–98       | 100           | 100            | 100               |
| Work gallery                | 93–94       | 100           | 100            | not measured      |
| Request                     | 95–96       | 100           | 100            | 100               |

SEO reads 66–69 while `noindex` is on; that is the `is-crawlable` audit, by design. CLS was 0 on every run.

## Deployment

Built for Vercel: connect the repository, set the two environment variables per environment, and every pull request gets a preview link. Any Node host that runs `next start` also works.

## Known advisories

`npm audit` reports high-severity `braces`, `micromatch` and `fast-glob` advisories through `eslint-config-next`. They are **dev-only** (`npm audit --omit=dev` is clean). Don't run `npm audit fix --force`: it downgrades `eslint-config-next` to v14.

## Pre-launch checklist

- [ ] Owner confirms the business facts in `docs/content-sources.md` and answers the open questions (hours, owner name, services).
- [ ] **Owner confirms rights to the three Yelp photos, or supplies their own.** Launch is blocked until this is done.
- [ ] Owner approves the proposed wordmark or supplies a logo.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain and `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- [ ] Connect the domain; test the call button and a real request from the owner's phone.
- [ ] Submit `sitemap.xml` to Google Search Console.
- [ ] Re-run Lighthouse on the live site before quoting any score.
