# AceAgency Website

Bilingual (Romanian + English) B2B lead generation website for AceAgency, a full-service digital marketing agency in Bucharest, Romania.

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4.1 with CSS variable design tokens
- **i18n**: next-intl 3.x with `[locale]` routing — Romanian primary, English secondary
- **Forms**: React Hook Form 7 + Zod 3 + @hookform/resolvers
- **SEO**: Next.js Metadata API + schema-dts for typed JSON-LD
- **Analytics**: GA4 + GTM via @next/third-parties
- **Images**: next/image with Unsplash remote patterns, WebP format
- **Blog**: MDX files with next-mdx-remote + gray-matter
- **Components**: ReactBits (copy-paste, not npm) + custom Tailwind components
- **Linting**: ESLint 9 (flat config) + Prettier 3
- **Hosting**: Vercel

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
  app/
    [locale]/              # i18n routing (ro/en)
      (marketing)/         # Full header/footer layout
        page.tsx           # Homepage
        about/
        services/[slug]/   # Dynamic service pages
        portfolio/
        contact/
        faq/
        [city]/            # Local SEO pages
      blog/
        [slug]/
      (legal)/             # Minimal layout
        privacy/
        terms/
      layout.tsx           # Locale layout (loads translations)
      not-found.tsx
      error.tsx
    layout.tsx             # Root layout (HTML, fonts, GA4)
  components/
    ui/                    # ReactBits + custom components
    layout/                # Header, Footer, Navigation, LanguageSwitcher
    forms/                 # ContactForm, HoneypotField
    seo/                   # Breadcrumbs, JsonLd
    blog/                  # BlogCard, MDXComponents
  content/blog/            # MDX blog posts
  messages/                # ro.json, en.json
  lib/                     # i18n config, metadata helpers, schema builders, analytics
  actions/                 # Server Actions (contact form)
  styles/                  # design-tokens.css
  types/                   # TypeScript types
middleware.ts              # next-intl locale detection
```

## Brand Identity

**Colors:**
| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Electric Violet | #650CBE | `electric-violet` | Accent, CTAs, highlights |
| Burgundy | #56151A | `burgundy` | Secondary accent, depth |
| Electric Mint | #66F2A6 | `electric-mint` | Success states, energy |
| Cobalt Blue | #4500D0 | `cobalt-blue` | Links, interactive elements |
| Black | #252523 | `brand-black` | Primary text, dark backgrounds |
| Grey | #D9D9D9 | `brand-grey` | Borders, subtle backgrounds |
| White | #FFFFFF | (default) | Backgrounds, text on dark |

**Typography:**
| Role | Font | Weight |
|------|------|--------|
| Headlines | Glacial Indifference | Bold, Regular |
| Subheadings | Red Hat Display | Regular |
| Body text | Poppins | Regular, Medium |
| Secondary headlines | Anton | Regular |

**Contact:**
- Email: office@aceads.co
- Phone: +40 750 465 757
- Location: Bucharest, Romania

**Stats:** 200+ projects, 50+ businesses, 4M+ EUR sales, 95% retention, 350% ROI, 6+ years

## Architecture Rules

- **Server-first**: All pages are Server Components by default. Only use `"use client"` for interactive islands (forms, animations, tracking events).
- **Route groups**: `(marketing)` for pages with full header/footer, `(legal)` for minimal layout. Groups don't affect URLs.
- **i18n**: Use namespaced keys in single locale files (`messages/ro.json`, `messages/en.json`). Never create per-page translation files.
- **Metadata**: Use shared `lib/metadata.ts` generator for all pages. Never inline metadata objects directly.
- **Forms**: Use Server Actions with `useFormState`, not API routes. Validate with Zod server-side.
- **Blog**: MDX files in `content/blog/` with frontmatter. No CMS.
- **Rendering**: SSG for marketing pages, ISR for blog (revalidate 24h), SSR only for truly dynamic content.
- **Brand colors**: Define as CSS variables in `styles/design-tokens.css`, reference via Tailwind config. Never hardcode hex values in components.

## Design Direction

- Professional B2B aesthetic — trust-building, not flashy
- Clean layouts with generous whitespace
- Photography: natural light, clean textures, airy, neutral palette with brand color accents
- No heavy filters or saturated effects
- Mobile-first responsive (320px-2560px)
- Use `/frontend-design` skill for component generation to avoid generic AI aesthetics
- Use ReactBits for interactive/animated UI elements

## SEO Requirements

- Single H1 per page, no skipped heading levels (H1 > H2 > H3)
- Canonical URLs on every page (self-referencing, absolute)
- Open Graph + Twitter Card tags on every page
- hreflang tags with reciprocal links (RO, EN, x-default)
- JSON-LD schemas: Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article
- Multilingual sitemap.xml with `<xhtml:link rel="alternate">` cross-references
- robots.txt: reference sitemap, disallow `/api/`
- Minimum 3-5 internal links per page
- Breadcrumb navigation on all pages except homepage

## Performance Targets

- PageSpeed Insights: 90+ mobile
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Only preload LCP hero image, lazy-load everything else
- WebP images with proper sizing via next/image
- WCAG 2.1 AA accessibility compliance

## URL Structure (Romanian primary)

```
/ro/                              # Homepage
/ro/servicii/marketing-digital    # Service pages (7 total)
/ro/servicii/seo
/ro/servicii/email-marketing
/ro/servicii/consultanta-marketing
/ro/servicii/automatizare-ai
/ro/servicii/dezvoltare-web
/ro/servicii/productie-video
/ro/despre-noi                    # About
/ro/portofoliu                    # Portfolio
/ro/contact                       # Contact
/ro/faq                           # FAQ
/ro/blog                          # Blog index
/ro/blog/[slug]                   # Blog posts
/ro/agentie-marketing-bucuresti   # Local SEO
/ro/agentie-marketing-cluj        # Local SEO
/en/...                           # English mirrors
```

## What NOT to Do

- No `"use client"` on pages with static content
- No per-page translation files (use namespaced single files)
- No API routes for forms (use Server Actions)
- No CMS for blog (MDX files in repo)
- No inline hex colors (use Tailwind brand classes)
- No Create React App, Formik, Yup, next-i18next, CSS-in-JS
- No placeholder lorem ipsum text — use real Romanian/English content
- No generic AI-looking components — use `/frontend-design` skill
- No auto-playing video with sound

## Current Progress

Phase 1 of 6: Foundation & Infrastructure — Ready to plan
See `.planning/STATE.md` for detailed status.
