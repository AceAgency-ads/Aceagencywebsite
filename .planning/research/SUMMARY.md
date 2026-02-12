# Project Research Summary

**Project:** AceAgency B2B Digital Agency Website
**Domain:** B2B Digital Agency Marketing Website (Bilingual RO+EN)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Executive Summary

AceAgency is a bilingual (Romanian + English) B2B digital agency website built on Next.js 16 with the App Router, React 19, TypeScript, Tailwind CSS, and ReactBits animated components. The research converges on a clear architectural approach: a server-first, statically generated site with small client-side "islands" for interactivity (forms, animations, language switching). This is the established pattern for SEO-critical B2B marketing sites in 2026 and aligns perfectly with the project's requirements for comprehensive SEO, Core Web Vitals 90+ scores, and bilingual content. The stack is mature, well-documented, and the team of Next.js + next-intl + Tailwind CSS has become the industry standard for this exact type of project.

The recommended approach is to build the i18n routing infrastructure first (it affects every route), then layer in the SEO foundation (metadata, schema markup, sitemaps), then build pages on top. The architecture uses `[locale]` dynamic segments with next-intl middleware for URL-based internationalization (`/ro/servicii`, `/en/services`), route groups for layout separation (marketing pages vs. legal pages), MDX files for the blog, and Server Actions with Zod validation for form handling. Static Site Generation (SSG) should be the default rendering strategy, with ISR for blog content that updates periodically. This approach delivers sub-2-second load times and 95+ Lighthouse scores out of the box.

The primary risks are: (1) ReactBits component compatibility with React Server Components -- components using client-side hooks need `"use client"` wrappers, and TypeScript compatibility with Next.js 16 / React 19 must be validated early; (2) bilingual SEO implementation -- hreflang tags, multilingual sitemaps, and canonical URLs have a >65% error rate across the industry and must be built as reusable infrastructure, not per-page afterthoughts; (3) performance degradation from unoptimized images (Unsplash) and over-preloading resources. All three risks are mitigable by addressing them in the foundation phase rather than retrofitting later.

## Key Findings

### Recommended Stack

The stack is entirely mainstream with HIGH confidence. Next.js 16 (App Router) with React 19 provides the foundation. TypeScript 5.x ensures type safety throughout. Tailwind CSS 4.1.x handles styling with zero runtime cost and full React Server Component compatibility. next-intl 3.x is the purpose-built i18n solution for Next.js App Router, superior to react-i18next for this context. Forms use React Hook Form 7.x + Zod 3.x (Formik is abandoned). SEO uses the built-in Next.js Metadata API + schema-dts for type-safe JSON-LD. Analytics uses @next/third-parties for optimized GA4 loading. Deployment targets Vercel (zero-config, free tier sufficient).

**Core technologies:**
- **Next.js 16 + React 19:** SSR/SSG meta-framework -- industry standard for SEO-critical React sites, built-in image optimization, Partial Prerendering, React Server Components
- **TypeScript 5.x:** Type safety -- built-in Next.js support, Zod schema type inference eliminates duplication
- **Tailwind CSS 4.1.x:** Utility-first CSS -- zero runtime cost, automatic tree-shaking (<10kB production), full RSC compatibility, Next.js official recommendation
- **next-intl 3.x:** Internationalization -- purpose-built for App Router, server-side translation loading, type-safe message keys, SEO-friendly localized routing
- **React Hook Form 7.x + Zod 3.x:** Form handling -- minimal re-renders, TypeScript-first validation, single schema for both runtime validation and type inference
- **schema-dts:** SEO structured data -- Google-provided TypeScript types for Schema.org, type-safe JSON-LD generation
- **ReactBits:** Animated UI components -- 110+ components, copy-paste installation via jsrepo CLI, Tailwind compatible (needs RSC compatibility validation)

### Expected Features

**Must have (table stakes -- v1.0 launch):**
- 4 service pages (Marketing Digital, AI Automation, Web Dev, Video Production) with specific deliverables
- 3-5 portfolio/case studies with Challenge-Strategy-Execution-Results format and hard metrics
- Contact form with CRM integration and server-side validation
- Client logos + key stats above the fold (200+ projects, 50+ businesses, 95% retention)
- Bilingual RO+EN with full site translation and SEO for both languages
- About/Team page with photos and bios
- Mobile-first responsive design (60%+ traffic is mobile)
- Core Web Vitals optimized (sub-2s load, 90+ Lighthouse)
- GDPR compliance (cookie consent, privacy policy)
- Blog foundation (launch with 5-10 SEO-optimized articles)
- WCAG 2.2 accessibility compliance

**Should have (differentiators -- v1.1-v1.5):**
- AI chatbot lead qualifier (after 100+ form submissions establish patterns)
- Interactive ROI calculator (increases engagement 40%+)
- Video showreel (leverages existing video production capability)
- Appointment booking integration (Calendly)
- Resource library / lead magnets
- Enhanced analytics (heatmaps, session recording)

**Defer (v2+):**
- Personalized landing pages (requires marketing automation platform + 1000+ monthly visitors)
- Client dashboard preview (high dev cost, low differentiation at launch)
- Service-specific sub-brands (complex maintenance)

**Anti-features (explicitly do NOT build):**
- Public pricing tables (attracts wrong leads for custom agency services)
- Client login portal (use existing tools like Google Drive, Notion)
- Auto-playing video with sound
- Immediate chatbot popup on every page
- Complex multi-page forms (high abandonment)

### Architecture Approach

The architecture follows a server-first model with client islands. All pages render as React Server Components by default (full HTML sent to browser, no hydration needed). Interactive elements (forms, animations, language switcher, analytics events) are isolated in small `"use client"` components. The project uses `src/` directory structure with `app/[locale]/(marketing)/` and `app/[locale]/(legal)/` route groups for layout separation. i18n routing is handled by next-intl middleware that detects locale and rewrites URLs. Blog content lives as MDX files in `content/blog/` parsed at build time. Form submissions use Server Actions with Zod validation and honeypot anti-spam.

**Major components:**
1. **Root Layout** (`app/layout.tsx`) -- HTML/body tags, global providers, GA4, fonts
2. **Locale Layout** (`app/[locale]/layout.tsx`) -- Loads translations via next-intl, sets locale context
3. **Route Group Layouts** (`(marketing)/layout.tsx`, `(legal)/layout.tsx`) -- Header/Footer for marketing pages, minimal layout for legal pages
4. **Page Components** -- Individual route content, server-rendered with generateMetadata() for SEO
5. **Client Islands** -- ContactForm, LanguageSwitcher, animations (ReactBits), analytics event triggers
6. **Server Actions** (`actions/contact.ts`) -- Form submission handling with Zod validation, email sending
7. **SEO Layer** -- Metadata generator utility, JSON-LD schema components, breadcrumbs, sitemap generation
8. **Content System** -- MDX blog posts with frontmatter, parsed by gray-matter, rendered by next-mdx-remote
9. **i18n Messages** -- `messages/ro.json`, `messages/en.json` with namespaced keys

### Critical Pitfalls

1. **ReactBits + Server Components incompatibility** -- ReactBits components likely use client-only hooks. Create `"use client"` wrapper components in `components/client-wrappers/` from day one. Test each component for RSC compatibility before integrating. Also verify TypeScript compatibility with React 19 types.

2. **Broken bilingual SEO (hreflang + sitemaps)** -- 65%+ of bilingual sites have critical hreflang errors. Build hreflang generation as a reusable function in the metadata utility, not manually per page. Every page must have reciprocal links (EN references RO, RO references EN) plus `x-default`. Sitemap must include both `/en/*` and `/ro/*` URLs with `<xhtml:link rel="alternate">` cross-references.

3. **Client-side i18n breaking search indexing** -- Loading translations via useEffect means search engines see empty markup. Use next-intl with server-side message loading exclusively. Verify with "View Source" that translated content appears in the HTML.

4. **Unoptimized Unsplash images killing LCP** -- Full-resolution Unsplash images are 2-5MB each. Configure `remotePatterns` in next.config.js, use Unsplash URL parameters for sizing (`?w=1920&q=80`), use `priority` prop on only the single LCP hero image, and self-host critical images to avoid external dependency.

5. **GA4 double-tracking and data loss** -- Use exactly ONE tracking method: `@next/third-parties/google`. Never combine GTM and gtag.js. Implement server-side event tracking via Server Actions for form submissions (client-side tracking loses 20-40% to ad blockers). Set data retention to 14 months immediately.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Infrastructure
**Rationale:** Everything depends on the project skeleton, styling system, i18n routing, and image optimization config. i18n especially must be in place before any page is built because it affects the entire routing structure (`[locale]` segment).
**Delivers:** Working Next.js 16 project with TypeScript, Tailwind CSS with brand design tokens, next-intl middleware and locale routing, ReactBits component wrappers validated for RSC compatibility, image optimization config, font loading, ESLint/Prettier setup.
**Addresses:** Fast loading infrastructure, bilingual routing, mobile-first foundation, GDPR cookie consent shell.
**Avoids:** Pitfalls 1 (RSC breaking), 2 (CSS-in-JS), 3 (client-side i18n), 5 (unoptimized images), 7 (data fetching waterfalls), 15 (env variable exposure), 17 (font loading waterfalls), 19 (TypeScript conflicts).

### Phase 2: SEO Foundation & Layout Components
**Rationale:** Metadata generation, schema markup, sitemaps, and shared layouts (Header, Footer, Navigation) are used by every page. Building these as reusable infrastructure before pages prevents per-page SEO mistakes and ensures consistency.
**Delivers:** Metadata generator utility with automatic hreflang, JSON-LD schema components (Organization, BreadcrumbList, Service, FAQPage), multilingual sitemap generation, robots.txt, Header/Footer/Navigation/LanguageSwitcher components, breadcrumbs component.
**Addresses:** Basic SEO, clear navigation, trust signals (footer), hreflang compliance.
**Avoids:** Pitfalls 4 (broken hreflang), 8 (broken multilingual sitemap), 9 (missing schema markup), 11 (heading hierarchy), 12 (canonical misconfiguration), 14 (missing meta descriptions), 18 (robots.txt).

### Phase 3: Core Marketing Pages
**Rationale:** With infrastructure and layouts in place, core pages can be built in parallel. These are the table-stakes content that B2B buyers expect. Service pages and portfolio are the highest-value pages for lead conversion.
**Delivers:** Homepage, About/Team page, 4 Service pages (dynamic routes via `[slug]`), Portfolio/Case Studies page, FAQ page, local SEO city pages.
**Addresses:** Services overview, portfolio/case studies, client logos/stats, about/team, clear CTAs, trust signals, accessibility (WCAG 2.2).
**Avoids:** Pitfall 20 (neglecting mobile-first) -- test each page on mobile first.

### Phase 4: Contact & Conversion System
**Rationale:** The contact form is the primary conversion mechanism. It depends on Server Actions, Zod validation, email integration, and GA4 tracking -- all of which should be built together as a cohesive conversion pipeline.
**Delivers:** Contact form with React Hook Form + Zod, Server Action for submission, honeypot anti-spam, email integration (Resend/SendGrid), GA4 event tracking (server-side for form submissions), rate limiting, success/error states.
**Addresses:** Contact form + CRM integration, GA4 analytics, GDPR-compliant tracking.
**Avoids:** Pitfalls 6 (GA4 double-tracking), 10 (client-only form validation).

### Phase 5: Blog System
**Rationale:** The blog is a self-contained feature that depends on the foundation and SEO layers but not on other pages. It drives organic traffic and establishes topical authority. Launch with 5-10 articles.
**Delivers:** MDX parsing utilities, blog layout, blog index with pagination, individual blog post template, MDX custom components (CTAButton, code blocks), blog card components, Table of Contents, blog-specific schema markup (Article), blog sitemap entries.
**Addresses:** Blog foundation, content SEO, resource for lead nurturing.
**Avoids:** Pitfall 13 (blog pagination harming SEO) -- use route-based pagination from the start.

### Phase 6: Legal Pages, Error Handling & Polish
**Rationale:** Legal pages (privacy, terms), 404 page, error boundaries, and loading states are critical for production but lower priority than revenue-generating pages. This phase also covers final accessibility audit and performance optimization.
**Delivers:** Privacy policy page, terms of service page, custom 404 page, error boundaries (error.tsx), loading states (loading.tsx with Suspense), final accessibility audit, Core Web Vitals optimization pass, pre-launch checklist.
**Addresses:** GDPR compliance, error handling, accessibility, performance polish.
**Avoids:** Pitfall 16 (over-preloading) -- final performance audit catches resource waste.

### Phase Ordering Rationale

- **i18n before pages:** The `[locale]` routing segment affects every URL in the app. Retrofitting i18n into an existing route structure is painful and error-prone. Build it first.
- **SEO infrastructure before content:** Metadata generation, schema markup, and sitemaps as reusable utilities prevent the #1 pitfall category (bilingual SEO errors). Each page automatically gets correct hreflang, canonical, and schema by using the shared utilities.
- **Contact form as standalone phase:** Conversion tracking (GA4), server-side validation, email integration, and anti-spam form a tightly coupled system. Building them together ensures nothing falls through the cracks.
- **Blog after core pages:** The blog is valuable but lower priority than the pages B2B buyers visit first (services, portfolio, contact). It can launch with minimal content and grow post-launch.
- **Polish last:** Error boundaries, loading states, and legal pages don't generate revenue but are required for production. Grouping them allows focused testing and audit.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Foundation):** ReactBits + Next.js 16 + React 19 compatibility needs hands-on validation. The library is installed via CLI (jsrepo), not npm -- verify the installation flow works with the `src/` directory structure. Test at least 3-4 representative components for RSC compatibility before committing to the library.
- **Phase 4 (Contact & Conversion):** Email service provider selection (Resend vs. SendGrid vs. AWS SES) and CRM integration specifics need research. Rate limiting implementation on Vercel (Edge Config vs. Upstash Redis) needs evaluation.
- **Phase 5 (Blog):** MDX compilation strategy needs validation -- `next-mdx-remote` vs. `@next/mdx` vs. `contentlayer` (if still maintained). Bilingual blog content management (separate MDX files per locale vs. single file with both languages) needs a decision.

Phases with standard patterns (skip research-phase):
- **Phase 2 (SEO Foundation):** Well-documented Next.js Metadata API patterns, schema-dts usage, and sitemap generation. Official docs cover all of this thoroughly.
- **Phase 3 (Core Pages):** Standard Next.js page development. Route groups, dynamic routes, and Server Components are extensively documented with production examples.
- **Phase 6 (Legal & Polish):** Standard error handling, accessibility audit, and performance optimization. No novel patterns needed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified from official documentation (Next.js 16, React 19, Tailwind 4.1, next-intl 3.x). Version compatibility confirmed. Only ReactBits is MEDIUM (needs RSC validation). |
| Features | MEDIUM | Based on 40+ industry articles and agency examples from 2026 trend reports. No single authoritative source for "agency feature standards" exists -- this is synthesized from competitor analysis and B2B marketing research. Feature prioritization is sound but market-specific assumptions should be validated. |
| Architecture | HIGH | Server-first with client islands is the established Next.js 16 pattern. Project structure follows official recommendations and battle-tested community patterns. i18n architecture verified from next-intl docs. MDX blog pattern is well-established. |
| Pitfalls | HIGH | Based on official Next.js docs, Google developer documentation, and verified 2025-2026 technical articles. The pitfall-to-phase mapping provides clear prevention strategies. The >65% hreflang error rate is documented across multiple SEO industry sources. |

**Overall confidence:** HIGH

### Gaps to Address

- **ReactBits RSC compatibility:** No official documentation on Server Component support. Must be validated hands-on in Phase 1. Mitigation: create client wrapper components for all ReactBits imports. If compatibility is severely broken, fall back to Radix UI + Framer Motion as alternatives.
- **Email service provider:** Research identified the need for email integration but didn't prescribe a specific provider. Evaluate Resend (developer-friendly, Next.js ecosystem), SendGrid (established, more features), or AWS SES (cheapest at scale) during Phase 4 planning.
- **CRM integration specifics:** FEATURES.md identifies CRM integration as a requirement but the specific CRM (HubSpot, Pipedrive, etc.) is not defined. This affects the contact form Server Action implementation. Clarify before Phase 4.
- **Blog content workflow:** MDX is recommended for developer-authored content, but if non-technical team members need to publish, a CMS migration path should be planned. Evaluate Tina CMS (Git-based, works with MDX) as a future option.
- **Bilingual content management:** The approach for managing translations of blog posts (separate MDX files per locale vs. other strategies) needs a concrete decision during Phase 5 planning. next-intl handles UI translations but blog content is a separate concern.
- **Vercel plan requirements:** Free tier is likely sufficient for launch but Pro plan ($20/mo) may be needed for preview deployments and team collaboration. Evaluate during Phase 1.

## Sources

### Primary (HIGH confidence)
- [Next.js 16 Official Documentation](https://nextjs.org/docs) -- Core framework, App Router, Metadata API, Image optimization, SSG/SSR/ISR
- [next-intl Documentation](https://next-intl.dev/) -- i18n architecture, middleware, server-side message loading
- [Tailwind CSS v4.1 Documentation](https://tailwindcss.com/) -- Styling, tree-shaking, Next.js integration
- [React Hook Form Documentation](https://react-hook-form.com/) -- Form handling patterns
- [Zod Documentation](https://zod.dev/) -- Schema validation, TypeScript type inference
- [Google Search Central - Managing Multi-Regional Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) -- Hreflang, international SEO
- [schema-dts GitHub (Google)](https://github.com/google/schema-dts) -- Type-safe Schema.org markup
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) -- RSC boundary patterns

### Secondary (MEDIUM-HIGH confidence)
- [App Router Pitfalls: Common Next.js Mistakes](https://imidef.com/en/2026-02-11-app-router-pitfalls) -- Pitfall patterns and avoidance
- [10 Common Next.js Mistakes That Hurt Core Web Vitals](https://pagepro.co/blog/common-nextjs-mistakes-core-web-vitals/) -- Performance pitfalls
- [Next.js Architecture in 2026 - Server-First, Client-Islands](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) -- Architecture patterns
- [Multilingual SEO: Frequent Issues and Fixes](https://www.seobility.net/en/blog/multilingual-seo-issues/) -- Hreflang error rates and prevention
- [Top 10 B2B Website Design Trends for 2026](https://www.axongarside.com/blog/b2b-website-design-trends-2026) -- Feature landscape
- [ReactBits Official Site](https://reactbits.dev) -- Component library capabilities

### Tertiary (MEDIUM confidence)
- [6 Common GA4 Implementation Mistakes](https://www.perrill.com/6-common-ga4-implementation-mistakes-and-how-to-fix-them/) -- Analytics pitfalls
- [Hreflang Implementation Guide 2026](https://www.linkgraph.com/blog/hreflang-implementation-guide/) -- i18n SEO specifics
- [Best Digital Agency Websites 2026](https://www.camgomersall.com/blog/best-digital-agency-websites) -- Competitor feature analysis
- [Lead Generation for Marketing Agencies 2026](https://www.involve.me/blog/lead-generation-for-digital-marketing-agencies) -- Conversion optimization features

---
*Research completed: 2026-02-13*
*Ready for roadmap: yes*
