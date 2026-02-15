# Roadmap: AceAgency Website

## Overview

This roadmap delivers a bilingual (Romanian + English) B2B lead generation website for AceAgency across 6 phases. The approach is foundation-first: i18n routing and brand styling are established before any pages exist, SEO infrastructure is built as reusable utilities before content pages, and revenue-generating marketing pages ship before support features (blog, legal). Each phase delivers a coherent, independently verifiable capability that builds toward a production-ready site scoring 90+ on PageSpeed Insights.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Infrastructure** - Next.js project with bilingual routing, brand design system, and optimized asset pipeline
- [ ] **Phase 2: SEO Foundation & Layout Components** - Reusable metadata/schema generators and shared Header/Footer/Navigation
- [ ] **Phase 3: Core Marketing Pages** - All revenue-generating pages: Homepage, Services, About, Portfolio, FAQ, Local SEO
- [ ] **Phase 4: Contact & Conversion System** - Validated contact form with spam protection, email delivery, and GA4 tracking
- [ ] **Phase 5: Blog System** - MDX-powered blog with bilingual content, pagination, and Article schema
- [ ] **Phase 6: Legal, Error Handling & Polish** - Legal compliance, error boundaries, accessibility audit, and Core Web Vitals optimization

## Phase Details

### Phase 1: Foundation & Infrastructure
**Goal**: A working bilingual Next.js project skeleton where any new page automatically gets locale-based routing, brand-compliant styling, and optimized image loading
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves a page at `/ro` and `/en` with locale-specific content visible in View Source HTML
  2. A language switcher toggles between Romanian and English while preserving the current page path, and hreflang tags appear in the HTML head for both locales plus x-default
  3. Brand colors (Electric Violet, Burgundy, Electric Mint, Cobalt Blue) and fonts (Glacial Indifference, Poppins, Red Hat Display, Anton) render correctly with zero flash of unstyled text
  4. At least 3 ReactBits components render without errors in the Next.js project, wrapped for Server Component compatibility
  5. An Unsplash image loaded via next/image renders in WebP format at the correct responsive size, and the page layout adapts cleanly from 320px to 2560px viewport width
**Plans:** 3 plans

Plans:
- [ ] 01-01-PLAN.md -- Next.js 16 project setup, Tailwind CSS 4 brand design tokens, custom fonts, ESLint/Prettier
- [ ] 01-02-PLAN.md -- Bilingual routing with next-intl, locale middleware, language switcher, hreflang tags, translation files
- [ ] 01-03-PLAN.md -- ReactBits RSC validation, Unsplash image integration, responsive design system verification

### Phase 2: SEO Foundation & Layout Components
**Goal**: Reusable SEO infrastructure and shared layout components so every page built from this point forward automatically gets correct metadata, schema markup, hreflang tags, sitemaps, and consistent navigation
**Depends on**: Phase 1
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, SEO-10, SEO-11, SEO-12, SEO-13, SEO-14, LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05
**Success Criteria** (what must be TRUE):
  1. A test page using the metadata generator utility shows a unique title, meta description, canonical URL, Open Graph tags, and Twitter Card tags in View Source -- all correct for the current locale
  2. The multilingual sitemap.xml at `/sitemap.xml` lists both `/ro/*` and `/en/*` URLs with `<xhtml:link rel="alternate">` cross-references, and robots.txt references the sitemap and disallows `/api/`
  3. Header displays logo, navigation links, language switcher, and CTA button; it sticks to the top on scroll; hamburger menu opens smoothly on mobile
  4. Footer displays contact info (email, phone, address), social media links, service links, and legal page links
  5. Breadcrumb navigation renders on all pages except the homepage, with correct BreadcrumbList JSON-LD schema
**Plans**: TBD

Plans:
- [ ] 02-01: Metadata generator utility, canonical URLs, Open Graph, Twitter Cards, hreflang automation
- [ ] 02-02: JSON-LD schema components (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article), sitemap.xml, robots.txt
- [ ] 02-03: Header, Footer, Navigation, mobile menu, sticky header, breadcrumbs, route group layouts

### Phase 3: Core Marketing Pages
**Goal**: All revenue-generating pages are live and navigable, communicating AceAgency's full service offering to prospective B2B clients in both Romanian and English
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, SVC-01, SVC-02, SVC-03, SVC-04, SVC-05, SVC-06, SVC-07, SVC-08, SVC-09, ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, PORT-01, PORT-02, PORT-03, FAQ-01, FAQ-02, FAQ-03, LOCAL-01, LOCAL-02, LOCAL-03
**Success Criteria** (what must be TRUE):
  1. Homepage loads with hero section, pain-point messaging, services overview grid linking to individual service pages, key stats (200+ projects, 50+ businesses, 4M+ EUR, 95% retention, 350% ROI, 6+ years), trust signals, and a final CTA -- all in the current locale
  2. All 7 service pages (`/servicii/marketing-digital`, `/servicii/seo`, `/servicii/email-marketing`, `/servicii/consultanta-marketing`, `/servicii/automatizare-ai`, `/servicii/dezvoltare-web`, `/servicii/productie-video`) render via dynamic `[slug]` routing with hero, description, benefits, process, pricing indication, related services, and CTA
  3. About page shows agency story, team members with photos, values/methodology, and achievements; Portfolio page shows filterable project cards linking to individual case study pages with Challenge-Strategy-Results format
  4. FAQ page renders collapsible accordion organized by category with FAQPage JSON-LD schema; Local SEO pages for Bucuresti and Cluj render city-specific content with LocalBusiness schema
  5. Every page has a single H1, no skipped heading levels, at least 3 internal links, and correct Service/Organization schema markup where applicable
**Plans**: TBD

Plans:
- [ ] 03-01: Homepage (hero, pain-points, services grid, stats, testimonials, CTA)
- [ ] 03-02: Service pages with dynamic [slug] routing and shared template (7 services)
- [ ] 03-03: About page, Portfolio/Case Studies pages
- [ ] 03-04: FAQ page with accordion and schema, Local SEO pages (Bucuresti, Cluj)

### Phase 4: Contact & Conversion System
**Goal**: Visitors can submit inquiries through a validated, spam-protected contact form, and every meaningful user action (page views, CTA clicks, form submissions) is tracked in GA4
**Depends on**: Phase 2
**Requirements**: CONTACT-01, CONTACT-02, CONTACT-03, CONTACT-04, CONTACT-05, CONTACT-06, CONTACT-07, CONTACT-08, TRACK-01, TRACK-02, TRACK-03, TRACK-04
**Success Criteria** (what must be TRUE):
  1. Contact page displays a form with name, email, phone, and message fields; submitting valid data shows a success message and sends an email notification to office@aceads.co
  2. Submitting invalid data (empty required fields, malformed email) shows inline validation errors without page reload; the honeypot field is hidden and submissions with it filled are silently rejected
  3. Rapid repeated submissions are rate-limited with an appropriate error message
  4. GA4 tracks page views on all navigation, CTA click events, and form submission events (viewable in GA4 real-time reports)
  5. Google Tag Manager container is loaded and operational alongside GA4 without double-tracking
**Plans**: TBD

Plans:
- [ ] 04-01: Contact form (React Hook Form + Zod), Server Action, honeypot, rate limiting, success/error states
- [ ] 04-02: Email delivery integration (Resend/SendGrid), GA4 setup, GTM, event tracking for forms and CTAs

### Phase 5: Blog System
**Goal**: A working blog that drives organic traffic with MDX content rendered in both languages, proper pagination, and Article schema for search engines
**Depends on**: Phase 2
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06
**Success Criteria** (what must be TRUE):
  1. Blog index page at `/blog` displays article cards and paginates via route-based URLs (`/blog/page/2`, `/blog/page/3`) -- not query parameters
  2. Individual blog posts render MDX content with frontmatter metadata (title, date, author, description) and display Article JSON-LD schema
  3. Blog posts exist as MDX files in the repository with content available in both Romanian and English
  4. Blog pages appear in the multilingual sitemap with both `/ro/blog/*` and `/en/blog/*` entries
**Plans**: TBD

Plans:
- [ ] 05-01: MDX parsing setup, blog post template, Article schema, blog index with pagination
- [ ] 05-02: Bilingual blog content structure, sitemap entries, sample posts

### Phase 6: Legal, Error Handling & Polish
**Goal**: Production-ready site with GDPR-compliant legal pages, graceful error handling, WCAG 2.1 AA accessibility, and Core Web Vitals scoring 90+ on mobile PageSpeed Insights
**Depends on**: Phases 3, 4, 5
**Requirements**: LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04, LEGAL-05, PERF-01, PERF-02, PERF-03, PERF-04, PERF-05, PERF-06, A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, ERR-01, ERR-02, ERR-03
**Success Criteria** (what must be TRUE):
  1. Privacy Policy, Terms of Service, and Cookie Policy pages are accessible from the footer and render in the minimal legal layout
  2. A GDPR cookie consent banner appears on first visit with default-reject behavior; cookie preferences persist across sessions
  3. Custom 404 page displays helpful navigation links when visiting a nonexistent URL; error boundaries catch page-level errors without crashing the entire site; loading states show visual feedback during navigation
  4. All interactive elements are keyboard-navigable, tap targets are at least 48x48px on mobile, color contrast meets WCAG 2.1 AA ratios, and semantic HTML with ARIA labels is used throughout
  5. PageSpeed Insights scores 90+ on mobile: LCP under 2.5s, CLS under 0.1, INP under 200ms; images serve in WebP with correct sizing; only the LCP hero image is preloaded, all others lazy-load
**Plans**: TBD

Plans:
- [ ] 06-01: Legal pages (Privacy, Terms, Cookie Policy), GDPR cookie consent banner, custom 404
- [ ] 06-02: Error boundaries, loading states, graceful fallbacks
- [ ] 06-03: Accessibility audit and fixes (WCAG 2.1 AA, keyboard nav, tap targets, contrast, ARIA)
- [ ] 06-04: Core Web Vitals optimization (LCP, CLS, INP, image optimization, preload audit)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6
Note: Phases 3, 4, and 5 all depend on Phase 2 but not on each other. They could overlap, but sequential execution is recommended for a solo developer.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Infrastructure | 0/3 | Planned | - |
| 2. SEO Foundation & Layout Components | 0/3 | Not started | - |
| 3. Core Marketing Pages | 0/4 | Not started | - |
| 4. Contact & Conversion System | 0/2 | Not started | - |
| 5. Blog System | 0/2 | Not started | - |
| 6. Legal, Error Handling & Polish | 0/4 | Not started | - |
