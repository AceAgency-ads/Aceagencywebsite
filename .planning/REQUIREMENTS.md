# Requirements: AceAgency Website

**Defined:** 2026-02-13
**Core Value:** Generate qualified B2B leads through a professional, trustworthy online presence that clearly communicates AceAgency's full-service value proposition and makes it effortless for potential clients to reach out.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation & Infrastructure

- [ ] **FOUND-01**: Next.js 16 project initialized with TypeScript, App Router, and `src/` directory structure
- [ ] **FOUND-02**: Tailwind CSS configured with brand design tokens (Electric Violet #650CBE, Burgundy #56151A, Electric Mint #66F2A6, Cobalt Blue #4500D0, Black #252523, Grey #D9D9D9, White #FFFFFF)
- [ ] **FOUND-03**: Custom fonts loaded (Glacial Indifference, Red Hat Display, Poppins, Anton) with `next/font` for zero FOUT
- [ ] **FOUND-04**: ReactBits components integrated and validated for React Server Component compatibility with `"use client"` wrappers
- [ ] **FOUND-05**: Mobile-first responsive design system working across 320px-2560px breakpoints
- [ ] **FOUND-06**: ESLint + Prettier configured for consistent code quality
- [ ] **FOUND-07**: Unsplash image optimization configured with `remotePatterns` in next.config.js and WebP format

### Internationalization (i18n)

- [ ] **I18N-01**: Bilingual routing with `[locale]` segments — `/ro/*` (Romanian primary) and `/en/*` (English)
- [ ] **I18N-02**: next-intl middleware for automatic locale detection and URL rewriting
- [ ] **I18N-03**: Server-side translation loading (translations visible in View Source HTML)
- [ ] **I18N-04**: Language switcher component preserving current page path when switching locale
- [ ] **I18N-05**: Proper hreflang tags on every page with reciprocal links (RO↔EN) plus x-default
- [ ] **I18N-06**: Complete Romanian and English translation files for all UI strings

### SEO & Metadata

- [ ] **SEO-01**: Unique `<title>` and `<meta description>` on every page via generateMetadata()
- [ ] **SEO-02**: Canonical URLs on every page (self-referencing, absolute)
- [ ] **SEO-03**: Open Graph and Twitter Card meta tags on every page
- [ ] **SEO-04**: JSON-LD Organization schema on homepage
- [ ] **SEO-05**: JSON-LD LocalBusiness schema with Bucharest location data
- [ ] **SEO-06**: JSON-LD Service schema on each service page
- [ ] **SEO-07**: JSON-LD FAQPage schema on FAQ page
- [ ] **SEO-08**: JSON-LD BreadcrumbList schema on all pages except homepage
- [ ] **SEO-09**: JSON-LD Article schema on blog post pages
- [ ] **SEO-10**: Multilingual sitemap.xml with both `/ro/*` and `/en/*` URLs and `<xhtml:link rel="alternate">` cross-references
- [ ] **SEO-11**: robots.txt with sitemap reference, disallow `/api/` and internal routes
- [ ] **SEO-12**: Proper heading hierarchy: single H1 per page, no skipped levels (H1>H2>H3)
- [ ] **SEO-13**: Breadcrumb navigation component on all pages except homepage
- [ ] **SEO-14**: Internal linking: minimum 3-5 internal links per page

### Layout & Navigation

- [ ] **LAYOUT-01**: Header with logo, main navigation, language switcher, and CTA button
- [ ] **LAYOUT-02**: Footer with contact info, social links, service links, legal links, and newsletter
- [ ] **LAYOUT-03**: Route group layouts: `(marketing)` with full header/footer, `(legal)` with minimal layout
- [ ] **LAYOUT-04**: Mobile hamburger menu with smooth animation
- [ ] **LAYOUT-05**: Sticky/fixed header on scroll

### Homepage

- [ ] **HOME-01**: Hero section with headline, subheadline, primary CTA, and background visual
- [ ] **HOME-02**: Pain-point messaging section addressing B2B client challenges
- [ ] **HOME-03**: Services overview grid/cards linking to individual service pages
- [ ] **HOME-04**: Key stats section (200+ projects, 50+ businesses, 4M+ EUR, 95% retention, 350% ROI, 6+ years)
- [ ] **HOME-05**: Client testimonials or trust signals section
- [ ] **HOME-06**: Final CTA section for consultation booking

### Service Pages

- [ ] **SVC-01**: Dedicated page for Marketing Digital (Google Ads, Facebook Ads, TikTok Ads) — URL: `/servicii/marketing-digital`
- [ ] **SVC-02**: Dedicated page for SEO services — URL: `/servicii/seo`
- [ ] **SVC-03**: Dedicated page for Email Marketing — URL: `/servicii/email-marketing`
- [ ] **SVC-04**: Dedicated page for Consultanta Marketing — URL: `/servicii/consultanta-marketing`
- [ ] **SVC-05**: Dedicated page for AI Automation (Chatbots, email automation, CRM) — URL: `/servicii/automatizare-ai`
- [ ] **SVC-06**: Dedicated page for Website Development — URL: `/servicii/dezvoltare-web`
- [ ] **SVC-07**: Dedicated page for Video Production — URL: `/servicii/productie-video`
- [ ] **SVC-08**: Each service page includes: hero, description, benefits, process, pricing indication, related services, CTA
- [ ] **SVC-09**: Service pages use dynamic `[slug]` routing with shared template

### About Page

- [ ] **ABOUT-01**: Agency story and mission section
- [ ] **ABOUT-02**: Team section with photos and roles
- [ ] **ABOUT-03**: Values or methodology section
- [ ] **ABOUT-04**: Key achievements/stats section

### Portfolio / Case Studies

- [ ] **PORT-01**: Portfolio index page with project cards
- [ ] **PORT-02**: Individual case study detail pages with Challenge-Strategy-Results format
- [ ] **PORT-03**: Filterable by service type

### FAQ Page

- [ ] **FAQ-01**: FAQ page with collapsible question/answer accordion
- [ ] **FAQ-02**: FAQPage JSON-LD schema markup (covered by SEO-07)
- [ ] **FAQ-03**: Organized by category (services, pricing, process)

### Contact & Forms

- [ ] **CONTACT-01**: Contact page with form (name, email, phone, message fields)
- [ ] **CONTACT-02**: Server-side form validation with Zod schema
- [ ] **CONTACT-03**: Honeypot anti-spam field (hidden, must be empty)
- [ ] **CONTACT-04**: Server Action for form submission (no API route)
- [ ] **CONTACT-05**: Success and error state feedback to user
- [ ] **CONTACT-06**: Email notification to office@aceads.co on submission
- [ ] **CONTACT-07**: GA4 event tracking for form submissions (server-side)
- [ ] **CONTACT-08**: Rate limiting on form submissions

### Blog

- [ ] **BLOG-01**: Blog index page with article cards, pagination
- [ ] **BLOG-02**: Individual blog post template with MDX rendering
- [ ] **BLOG-03**: Blog posts stored as MDX files with frontmatter metadata
- [ ] **BLOG-04**: Route-based pagination (`/blog/page/2`) not query params
- [ ] **BLOG-05**: Article JSON-LD schema on each post (covered by SEO-09)
- [ ] **BLOG-06**: Blog sitemap entries for both locales

### Local SEO Pages

- [ ] **LOCAL-01**: Bucuresti local SEO page — URL: `/agentie-marketing-bucuresti`
- [ ] **LOCAL-02**: Cluj local SEO page — URL: `/agentie-marketing-cluj`
- [ ] **LOCAL-03**: City-specific content with LocalBusiness schema

### Legal & Compliance

- [ ] **LEGAL-01**: Privacy Policy page (GDPR compliant)
- [ ] **LEGAL-02**: Terms of Service page
- [ ] **LEGAL-03**: Cookie Policy page
- [ ] **LEGAL-04**: Cookie consent banner (GDPR compliant, default reject)
- [ ] **LEGAL-05**: Custom 404 page with helpful navigation links

### Performance

- [ ] **PERF-01**: Core Web Vitals: LCP < 2.5s
- [ ] **PERF-02**: Core Web Vitals: CLS < 0.1
- [ ] **PERF-03**: Core Web Vitals: INP < 200ms
- [ ] **PERF-04**: PageSpeed Insights score 90+ on mobile
- [ ] **PERF-05**: Images served in WebP format with proper sizing
- [ ] **PERF-06**: Only LCP hero image preloaded, other images lazy-loaded

### Analytics & Tracking

- [ ] **TRACK-01**: Google Analytics 4 integration via `@next/third-parties/google`
- [ ] **TRACK-02**: Google Tag Manager container integration
- [ ] **TRACK-03**: GA4 page view tracking on all navigation
- [ ] **TRACK-04**: GA4 event tracking for CTA clicks and form submissions

### Accessibility

- [ ] **A11Y-01**: WCAG 2.1 AA compliance
- [ ] **A11Y-02**: Semantic HTML5 structure with proper ARIA labels
- [ ] **A11Y-03**: Keyboard navigation for all interactive elements
- [ ] **A11Y-04**: Minimum 48x48px tap targets on mobile
- [ ] **A11Y-05**: Sufficient color contrast ratios

### Error Handling

- [ ] **ERR-01**: Error boundary (error.tsx) at page level preventing full-app crashes
- [ ] **ERR-02**: Loading states (loading.tsx) with Suspense boundaries
- [ ] **ERR-03**: Graceful fallbacks for failed image loads and API errors

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Engagement

- **V2-01**: Interactive ROI calculator for potential clients
- **V2-02**: Video showreel on homepage leveraging video production capability
- **V2-03**: Appointment booking integration (Calendly or similar)
- **V2-04**: Resource library / downloadable lead magnets

### Advanced Features

- **V2-05**: AI chatbot lead qualifier (after 100+ form submissions)
- **V2-06**: Enhanced analytics (heatmaps, session recording via PostHog)
- **V2-07**: Client testimonials carousel with video testimonials
- **V2-08**: Blog search functionality

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Public pricing tables | Attracts wrong leads for custom agency services |
| Client login portal | Use existing tools (Google Drive, Notion) |
| CMS / admin panel | Static/code-managed content for v1 |
| User authentication | Not needed for agency site |
| E-commerce / payments | Services sold through consultation |
| Real-time chat widget | Contact form is sufficient for v1 |
| Mobile native app | Web-only |
| Auto-playing video with sound | Bad UX, accessibility issues |
| Multi-page intake forms | High abandonment rates |
| Personalized landing pages | Requires 1000+ monthly visitors first |
| Service-specific sub-brands | Complex maintenance overhead |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1: Foundation & Infrastructure | Pending |
| FOUND-02 | Phase 1: Foundation & Infrastructure | Pending |
| FOUND-03 | Phase 1: Foundation & Infrastructure | Pending |
| FOUND-04 | Phase 1: Foundation & Infrastructure | Pending |
| FOUND-05 | Phase 1: Foundation & Infrastructure | Pending |
| FOUND-06 | Phase 1: Foundation & Infrastructure | Pending |
| FOUND-07 | Phase 1: Foundation & Infrastructure | Pending |
| I18N-01 | Phase 1: Foundation & Infrastructure | Pending |
| I18N-02 | Phase 1: Foundation & Infrastructure | Pending |
| I18N-03 | Phase 1: Foundation & Infrastructure | Pending |
| I18N-04 | Phase 1: Foundation & Infrastructure | Pending |
| I18N-05 | Phase 1: Foundation & Infrastructure | Pending |
| I18N-06 | Phase 1: Foundation & Infrastructure | Pending |
| SEO-01 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-02 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-03 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-04 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-05 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-06 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-07 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-08 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-09 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-10 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-11 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-12 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-13 | Phase 2: SEO Foundation & Layout | Pending |
| SEO-14 | Phase 2: SEO Foundation & Layout | Pending |
| LAYOUT-01 | Phase 2: SEO Foundation & Layout | Pending |
| LAYOUT-02 | Phase 2: SEO Foundation & Layout | Pending |
| LAYOUT-03 | Phase 2: SEO Foundation & Layout | Pending |
| LAYOUT-04 | Phase 2: SEO Foundation & Layout | Pending |
| LAYOUT-05 | Phase 2: SEO Foundation & Layout | Pending |
| HOME-01 | Phase 3: Core Marketing Pages | Pending |
| HOME-02 | Phase 3: Core Marketing Pages | Pending |
| HOME-03 | Phase 3: Core Marketing Pages | Pending |
| HOME-04 | Phase 3: Core Marketing Pages | Pending |
| HOME-05 | Phase 3: Core Marketing Pages | Pending |
| HOME-06 | Phase 3: Core Marketing Pages | Pending |
| SVC-01 | Phase 3: Core Marketing Pages | Pending |
| SVC-02 | Phase 3: Core Marketing Pages | Pending |
| SVC-03 | Phase 3: Core Marketing Pages | Pending |
| SVC-04 | Phase 3: Core Marketing Pages | Pending |
| SVC-05 | Phase 3: Core Marketing Pages | Pending |
| SVC-06 | Phase 3: Core Marketing Pages | Pending |
| SVC-07 | Phase 3: Core Marketing Pages | Pending |
| SVC-08 | Phase 3: Core Marketing Pages | Pending |
| SVC-09 | Phase 3: Core Marketing Pages | Pending |
| ABOUT-01 | Phase 3: Core Marketing Pages | Pending |
| ABOUT-02 | Phase 3: Core Marketing Pages | Pending |
| ABOUT-03 | Phase 3: Core Marketing Pages | Pending |
| ABOUT-04 | Phase 3: Core Marketing Pages | Pending |
| PORT-01 | Phase 3: Core Marketing Pages | Pending |
| PORT-02 | Phase 3: Core Marketing Pages | Pending |
| PORT-03 | Phase 3: Core Marketing Pages | Pending |
| FAQ-01 | Phase 3: Core Marketing Pages | Pending |
| FAQ-02 | Phase 3: Core Marketing Pages | Pending |
| FAQ-03 | Phase 3: Core Marketing Pages | Pending |
| LOCAL-01 | Phase 3: Core Marketing Pages | Pending |
| LOCAL-02 | Phase 3: Core Marketing Pages | Pending |
| LOCAL-03 | Phase 3: Core Marketing Pages | Pending |
| CONTACT-01 | Phase 4: Contact & Conversion | Pending |
| CONTACT-02 | Phase 4: Contact & Conversion | Pending |
| CONTACT-03 | Phase 4: Contact & Conversion | Pending |
| CONTACT-04 | Phase 4: Contact & Conversion | Pending |
| CONTACT-05 | Phase 4: Contact & Conversion | Pending |
| CONTACT-06 | Phase 4: Contact & Conversion | Pending |
| CONTACT-07 | Phase 4: Contact & Conversion | Pending |
| CONTACT-08 | Phase 4: Contact & Conversion | Pending |
| TRACK-01 | Phase 4: Contact & Conversion | Pending |
| TRACK-02 | Phase 4: Contact & Conversion | Pending |
| TRACK-03 | Phase 4: Contact & Conversion | Pending |
| TRACK-04 | Phase 4: Contact & Conversion | Pending |
| BLOG-01 | Phase 5: Blog System | Pending |
| BLOG-02 | Phase 5: Blog System | Pending |
| BLOG-03 | Phase 5: Blog System | Pending |
| BLOG-04 | Phase 5: Blog System | Pending |
| BLOG-05 | Phase 5: Blog System | Pending |
| BLOG-06 | Phase 5: Blog System | Pending |
| LEGAL-01 | Phase 6: Legal, Error Handling & Polish | Pending |
| LEGAL-02 | Phase 6: Legal, Error Handling & Polish | Pending |
| LEGAL-03 | Phase 6: Legal, Error Handling & Polish | Pending |
| LEGAL-04 | Phase 6: Legal, Error Handling & Polish | Pending |
| LEGAL-05 | Phase 6: Legal, Error Handling & Polish | Pending |
| PERF-01 | Phase 6: Legal, Error Handling & Polish | Pending |
| PERF-02 | Phase 6: Legal, Error Handling & Polish | Pending |
| PERF-03 | Phase 6: Legal, Error Handling & Polish | Pending |
| PERF-04 | Phase 6: Legal, Error Handling & Polish | Pending |
| PERF-05 | Phase 6: Legal, Error Handling & Polish | Pending |
| PERF-06 | Phase 6: Legal, Error Handling & Polish | Pending |
| A11Y-01 | Phase 6: Legal, Error Handling & Polish | Pending |
| A11Y-02 | Phase 6: Legal, Error Handling & Polish | Pending |
| A11Y-03 | Phase 6: Legal, Error Handling & Polish | Pending |
| A11Y-04 | Phase 6: Legal, Error Handling & Polish | Pending |
| A11Y-05 | Phase 6: Legal, Error Handling & Polish | Pending |
| ERR-01 | Phase 6: Legal, Error Handling & Polish | Pending |
| ERR-02 | Phase 6: Legal, Error Handling & Polish | Pending |
| ERR-03 | Phase 6: Legal, Error Handling & Polish | Pending |

**Coverage:**
- v1 requirements: 97 total
- Mapped to phases: 97
- Unmapped: 0

---
*Requirements defined: 2026-02-13*
*Last updated: 2026-02-13 after roadmap creation*
