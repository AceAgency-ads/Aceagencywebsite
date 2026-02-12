# AceAgency Website

## What This Is

A multi-page, bilingual (Romanian + English) website for AceAgency, a full-service digital marketing agency based in Bucharest, Romania. The site serves as the primary B2B lead generation platform, showcasing 4 core services (Marketing Digital, AI Automation, Website Development, Video Production) with a professional, aesthetic design built on React using ReactBits components. Replaces the current single-page aceagency.ro with a comprehensive, SEO-optimized multi-page architecture.

## Core Value

Generate qualified B2B leads through a professional, trustworthy online presence that clearly communicates AceAgency's full-service value proposition and makes it effortless for potential clients to reach out.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Multi-page website with full SEO spec URL structure (15+ pages)
- [ ] Bilingual support: Romanian (primary) + English with hreflang tags
- [ ] Homepage with hero, pain-point messaging, services overview, stats, CTA
- [ ] 4 dedicated service pages: Google Ads, Facebook Ads, TikTok Ads, SEO
- [ ] Additional service pages: Email Marketing, Consultanta Marketing
- [ ] About page (Despre Noi) with team and agency story
- [ ] Blog index page with article listing
- [ ] Blog article template with proper Article schema
- [ ] Portfolio / Case studies page
- [ ] Contact page with simple form (name, email, phone, message)
- [ ] FAQ page with FAQ schema markup
- [ ] Local SEO pages (Bucuresti, Cluj)
- [ ] Legal pages: Terms, Privacy Policy, Cookie Policy
- [ ] Custom 404 page with helpful navigation
- [ ] Full schema markup per SEO spec (Organization, LocalBusiness, Service, FAQ, BreadcrumbList, Article)
- [ ] Proper heading hierarchy (single H1 per page, H1>H2>H3)
- [ ] Canonical URLs, Open Graph, Twitter Cards on every page
- [ ] Sitemap.xml auto-generation
- [ ] Robots.txt configuration
- [ ] Breadcrumb navigation on all pages except homepage
- [ ] Internal linking strategy (min 3-5 per page)
- [ ] Core Web Vitals targets: LCP <2.5s, CLS <0.1, INP <200ms, PageSpeed 90+ mobile
- [ ] Mobile-first responsive design (320px-2560px)
- [ ] Contact form with honeypot anti-spam, GA4 event tracking
- [ ] Cookie consent banner (GDPR compliant)
- [ ] Google Tag Manager integration
- [ ] Unsplash imagery throughout the site
- [ ] ReactBits component library integration for interactive UI elements
- [ ] Brand-compliant design using official color palette and typography

### Out of Scope

- CMS / admin panel for content management — static/code-managed content for v1
- User authentication / login system — not needed for agency site
- E-commerce / online payments — services sold through consultation
- Real-time chat widget — contact form is sufficient for v1
- Automated blog publishing system — blog articles added manually via code
- Mobile native app — web-only

## Context

**Current State:** aceagency.ro exists as a single-page dark-themed site built on (likely) a website builder. It covers the 4 services, has stats (4M+ EUR sales, 50+ businesses, 95% retention, 6+ years), and a CTA for free consultation. Romanian only, no contact form, no multi-page structure.

**Brand Identity:**
- Logo: "ace" spade symbol representing strategy & performance
- Tagline: "Web . ADS . AI . Media"
- Brand positioning: Premium digital agency, partner not vendor
- Tone: Elegant, direct, performance-anchored

**Brand Colors:**
| Color | Hex | Usage |
|-------|-----|-------|
| White | #FFFFFF | Backgrounds, text on dark |
| Black | #252523 | Primary text, dark backgrounds |
| Electric Violet | #650CBE | Accent, CTAs, highlights |
| Burgundy | #56151A | Secondary accent, depth |
| Electric Mint | #66F2A6 | Success states, highlights, energy |
| Grey | #D9D9D9 | Borders, subtle backgrounds |
| Cobalt Blue | #4500D0 | Links, interactive elements |

**Typography:**
| Role | Font | Weight |
|------|------|--------|
| Headlines | Glacial Indifference | Bold, Regular |
| Subheadings | Red Hat Display | Regular |
| Body text | Poppins | Regular, Medium |
| Secondary headlines | Anton | Regular |

**Contact Info:**
- Location: Bucharest, Romania
- Email: office@aceads.co
- Phone: +40 750 465 757
- Social: LinkedIn, Instagram, Facebook, YouTube

**Key Stats (from current site):**
- 200+ projects delivered
- 50+ businesses served
- 4M+ EUR in sales generated for clients
- 6+ years in Romanian digital market
- 95% client retention rate
- 350% average ROI for clients

**Services & Pricing:**
1. **AceAds** (Marketing Digital): Google Ads, Meta Ads, TikTok Ads — from EUR500/month
2. **AceAI** (AI Automation): Chatbots, email automation, CRM integration — from EUR1,500 setup
3. **AceWeb** (Website Development): React sites, SEO optimized — from EUR2,000
4. **AceMedia** (Video Production): Video ads, social content — from EUR500 per video

**SEO Specification:** Comprehensive technical SEO document exists (`Specificatii-Tehnice-SEO-AceAgency.md`) covering HTML structure, URL architecture, heading hierarchy, schema markup, sitemap, robots.txt, image optimization, Core Web Vitals, internal linking, mobile-first design, security headers, forms, tracking, and launch checklist.

**Technical Approach:**
- React (with proper SSR/SSG for SEO)
- ReactBits component library for interactive UI elements
- frontend-design skill for non-AI-looking component generation
- Unsplash for professional photography
- i18n for Romanian/English bilingual support
- Follow SEO spec exactly for URL structure, meta tags, schema markup

**Design Direction:**
- Professional B2B aesthetic — trust-building, not flashy
- Clean layouts with generous whitespace
- Brand color palette as defined in guidelines
- Photography style: natural light, clean textures, airy compositions, neutral palette with brand color accents
- No heavy filters or saturated effects
- Mobile-first responsive

## Constraints

- **Brand compliance**: Must follow brand guidelines exactly (colors, typography, logo usage)
- **SEO spec**: Must implement all requirements from the technical SEO document
- **Bilingual**: Full Romanian + English with proper hreflang implementation
- **Performance**: Core Web Vitals 90+ on mobile (PageSpeed Insights)
- **Tech stack**: React + ReactBits components, frontend-design skill for component generation
- **Images**: Use Unsplash for stock photography, WebP format with JPG fallback
- **Accessibility**: WCAG 2.1 AA compliance, semantic HTML5, ARIA labels

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React with SSR/SSG (Next.js) | SEO requires server-rendered HTML, React for interactivity + ReactBits | -- Pending |
| Full SEO spec implementation | Client has prepared comprehensive SEO requirements document | -- Pending |
| Multi-page over SPA | Better SEO, proper URL structure per spec, independent page optimization | -- Pending |
| Bilingual (RO+EN) with i18n | Target Romanian market primarily + international reach | -- Pending |
| Brand colors from guidelines | Official brand identity must be respected | -- Pending |
| Poppins as web body font | Canva Sans not freely available, Poppins listed as secondary/support font | -- Pending |

---
*Last updated: 2026-02-13 after initialization*
