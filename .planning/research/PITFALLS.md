# Pitfalls Research

**Domain:** B2B Digital Agency Website (Multi-page, Bilingual, Next.js)
**Researched:** 2026-02-13
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Server Component Breaking with Client-Side Dependencies

**What goes wrong:**
Third-party component libraries (like ReactBits) often use client-only features (`useState`, `useEffect`, browser APIs) without the `"use client"` directive. When imported directly into Server Components, Next.js throws errors or content fails to render, breaking the page.

**Why it happens:**
Developers assume all React components work in Server Components by default, not realizing Next.js 15+ treats components as Server Components unless explicitly marked with `"use client"`. Component library authors don't always add this directive to their exports.

**How to avoid:**
- Wrap third-party components in your own Client Component wrapper with `"use client"` directive
- Create a dedicated `src/components/client-wrappers/` directory for all external library components
- Add bundle size monitoring - Client Components increase JavaScript sent to browser
- Position `"use client"` at the highest possible level that needs interactivity, not at layout/page level

**Warning signs:**
- Errors mentioning "cannot use X in Server Component"
- Hydration mismatches in browser console
- Components rendering on server but not client (or vice versa)
- Blank sections where third-party components should appear

**Phase to address:**
Phase 1 (Foundation Setup) - Establish component wrapper pattern before integrating ReactBits library. Create documentation on when to use Server vs Client Components.

---

### Pitfall 2: CSS-in-JS Libraries Destroying Core Web Vitals

**What goes wrong:**
CSS-in-JS libraries (Styled Components, Emotion) run JavaScript on the client to hash class names and inject styles into the DOM. Each injection causes browser style recalculation for the entire page, significantly hurting LCP (Largest Contentful Paint), FCP (First Contentful Paint), and INP (Interaction to Next Paint). This makes achieving the required 90+ mobile Core Web Vitals score nearly impossible.

**Why it happens:**
Teams choose CSS-in-JS for developer experience (scoped styles, dynamic styling) without understanding the runtime performance cost. The pattern worked acceptably in traditional React apps but conflicts with Next.js Server Component architecture.

**How to avoid:**
- Use Tailwind CSS or CSS Modules (zero runtime JavaScript)
- If using ReactBits components with CSS-in-JS, configure to extract styles at build time
- Avoid runtime style generation - compute styles server-side or at build time
- Set aggressive `minimumCacheTTL` in next.config.js for any unavoidable runtime styles

**Warning signs:**
- LCP scores above 2.5s on mobile
- PageSpeed Insights showing high JavaScript execution time
- Browser Performance tab showing repeated style recalculations
- INP (Interaction to Next Paint) scores above 200ms

**Phase to address:**
Phase 1 (Foundation Setup) - Choose styling approach before any component development. If ReactBits uses CSS-in-JS, evaluate alternatives or configure build-time extraction immediately.

---

### Pitfall 3: Broken i18n with Client-Side Rendering

**What goes wrong:**
Loading translated content client-side means search engines receive empty markup or default language only. Google doesn't index the alternate language pages properly, destroying bilingual SEO value. Users also see flash of default language before translation loads (FOUC - Flash of Unstyled Content).

**Why it happens:**
Developers treat i18n as a client-side concern, loading translations via `useEffect` or client-side fetch. They don't configure Next.js routing to handle language prefixes at the framework level.

**How to avoid:**
- Use `next-intl` with App Router - designed for server-side i18n routing
- Configure middleware to detect locale and rewrite URLs before rendering
- Ensure all translated content renders server-side using Server Components
- Generate static pages for both languages using `generateStaticParams`
- Never use client-side language switching for initial page load

**Warning signs:**
- Search Console shows only one language indexed
- `/en` and `/ro` URLs render identical initial HTML
- Browser console shows hydration mismatches for translated text
- PageSpeed Insights shows different content for "View Source" vs rendered page

**Phase to address:**
Phase 1 (Foundation Setup) - Configure i18n routing in `middleware.ts` and `next.config.js` before creating any pages. Test with one page that it renders correct language server-side.

---

### Pitfall 4: Missing or Broken Hreflang Implementation

**What goes wrong:**
Over 65% of bilingual websites have critical hreflang errors: missing reciprocal links, incorrect language codes, conflicts with canonical tags, or missing self-referential tags. This causes Google to ignore language variants, show wrong language in search results, or treat pages as duplicates.

**Why it happens:**
Developers add hreflang to homepage only, forget reciprocal links (EN page must reference RO, RO must reference EN), use wrong ISO codes (using "uk" instead of "gb"), or conflict canonical with hreflang (canonical pointing to different URL than hreflang specifies).

**How to avoid:**
- Generate hreflang tags automatically in `layout.tsx` based on current route
- Every page must include self-referential hreflang: `<link rel="alternate" hreflang="en" href="current-page-en-url" />`
- Include ALL language variants on every page (EN page has EN + RO, RO page has EN + RO)
- Use correct ISO 639-1 language codes: `en`, `ro` (NOT `en-us`, `ro-ro` unless region-specific)
- Ensure canonical URL matches the URL specified in hreflang for that language
- Add `x-default` hreflang pointing to default language for unmatched locales

**Warning signs:**
- Google Search Console shows "No return tag" errors
- Search results showing wrong language pages to users
- Duplicate content warnings for translated pages
- hreflang validator tools showing reciprocal link errors

**Phase to address:**
Phase 2 (SEO Foundation) - Implement hreflang generation as reusable component/function. Validate with Google Search Console and hreflang validators before going live.

---

### Pitfall 5: Unoptimized Unsplash Images Destroying Performance

**What goes wrong:**
Loading full-resolution Unsplash images (often 4000x3000px, 2-5MB each) without optimization destroys LCP and causes 2-4× bandwidth waste. Over-preloading 8-12 images per page wastes bandwidth for users who bounce. Not configuring `remotePatterns` causes Next.js Image optimization to fail.

**Why it happens:**
Developers use Unsplash URLs directly in `<img>` tags or forget to configure `next/image` for external domains. They preload every above-the-fold image instead of just the LCP image. They don't use Unsplash's built-in image transformation API.

**How to avoid:**
- Configure Unsplash in `next.config.js` `remotePatterns`: `{ protocol: 'https', hostname: 'images.unsplash.com' }`
- Use Unsplash Image API parameters: `?w=1920&q=80&fm=webp` for size/quality/format
- Only use `priority` prop on the ONE image that is LCP (typically hero image)
- For Unsplash images, always specify explicit `width` and `height` props
- Use `loading="lazy"` for all below-fold images
- Set `minimumCacheTTL: 31536000` in next.config.js for Unsplash images
- Consider downloading and self-hosting critical hero images to avoid external dependencies

**Warning signs:**
- LCP times above 2.5s on mobile
- Network tab showing multi-megabyte image downloads
- PageSpeed Insights showing "Serve images in modern formats" warning
- Build errors: "Invalid src prop... hostname not configured under images in next.config.js"

**Phase to address:**
Phase 1 (Foundation Setup) - Configure image optimization settings in next.config.js. Create reusable `<OptimizedImage>` component wrapping `next/image` with proper defaults.

---

### Pitfall 6: GA4 Double-Tracking and Data Loss

**What goes wrong:**
Installing Google Analytics through multiple methods (GTM + manual gtag.js + CMS plugin) causes duplicate tracking, inflating pageviews/sessions/events by 2-3×. Alternatively, client-side-only GA4 loses 20-40% of tracking data due to ad blockers, privacy tools, and browser restrictions. Not configuring data retention properly means losing historical data after 2 months.

**Why it happens:**
Developers add GA4 without checking for existing implementations. They install both GTM and direct gtag.js. They don't understand that 2026 client-side-only tracking is unreliable. They skip the data retention configuration during setup.

**How to avoid:**
- Use ONE tracking method only: `@next/third-parties/google` for Next.js (official, recommended)
- Never install both GTM and gtag.js - choose one
- Configure data retention to maximum (14 months) in GA4 Admin > Data Settings
- Implement server-side tracking via GA4 Measurement Protocol for critical events (form submissions)
- Set up Consent Mode v2 for EEA compliance - required for accurate tracking in 2026
- Define Key Events (conversions) immediately - not custom events (causes duplication)
- Enable BigQuery export for historical data beyond 14 months

**Warning signs:**
- GA4 showing 2× expected traffic suddenly after adding tracking
- Conversion rates dropping unexpectedly (likely ad blocker impact)
- Inability to access historical data older than 2 months
- Events appearing twice with slightly different timestamps

**Phase to address:**
Phase 3 (Contact & Conversion) - Implement GA4 only when contact form is ready. Use Server Actions to send server-side events for form submissions to avoid ad blocker losses.

---

### Pitfall 7: Client-Side Waterfall Data Fetching

**What goes wrong:**
Loading data sequentially in `useEffect` chains creates request waterfalls: component mounts → fetch translation data → render → child component mounts → fetch blog posts → render. Each step adds full network latency (200-500ms each). This destroys LCP and makes pages feel slow, even with fast hosting.

**Why it happens:**
Developers coming from traditional React apps default to `useEffect` for data loading. They don't realize Next.js Server Components can fetch in parallel server-side. They create component hierarchies that wait for parent data before fetching child data.

**How to avoid:**
- Fetch ALL data in Server Components using parallel `Promise.all()` or `Promise.allSettled()`
- Use `React.cache()` to deduplicate identical requests across components
- Pass data down via props instead of fetching in each component
- For unavoidable client-side fetching, preload data: `<link rel="preload" as="fetch" href="api-url" />`
- Use `loading.tsx` and Suspense boundaries to stream content progressively
- Never fetch in `useEffect` for critical above-fold content

**Warning signs:**
- Network tab showing sequential requests with gaps between them
- TTFB (Time to First Byte) acceptable but LCP still poor
- Lighthouse showing "Eliminate render-blocking resources"
- Content popping in sequentially rather than together

**Phase to address:**
Phase 1 (Foundation Setup) - Establish data fetching patterns in first page implementation. Document server-side parallel fetching as standard pattern.

---

### Pitfall 8: Broken Multilingual Sitemap Generation

**What goes wrong:**
Next.js doesn't support multilingual sitemaps out-of-the-box. Developers generate sitemap for one language only, missing `/ro/*` URLs entirely. Or they generate separate sitemaps without cross-linking via `<xhtml:link rel="alternate">`. This causes search engines to miss half the site content or not understand language relationships.

**Why it happens:**
Next.js 15 `sitemap.ts` examples don't cover i18n. Developers follow basic docs and generate sitemap from routes without considering locale prefixes. They don't know sitemaps should include alternate language URLs.

**How to avoid:**
- Generate sitemap dynamically in `app/sitemap.ts` including ALL locales
- For each page, include entries for `/en/page` AND `/ro/page`
- Each sitemap entry should have `<xhtml:link>` tags pointing to alternate languages
- Consider generating separate sitemaps: `sitemap-en.xml`, `sitemap-ro.xml` with sitemap index
- Use `next-sitemap` library if manual generation becomes complex
- Include hreflang attributes in sitemap URLs matching meta tags
- Validate with Google Search Console after generation

**Warning signs:**
- Google Search Console shows only ~50% of expected pages indexed
- Sitemap validator showing missing URLs for one language
- Romanian pages not appearing in Romanian Google search results
- "Duplicate content" warnings for pages that should be language variants

**Phase to address:**
Phase 2 (SEO Foundation) - Generate multilingual sitemap before indexing begins. Test with both languages represented and hreflang attributes correct.

---

### Pitfall 9: Missing Schema Markup for Agency-Specific Entities

**What goes wrong:**
Only 30% of websites implement structured data, missing 30% higher click-through rates. For B2B agencies, missing Organization, Service, FAQPage, Review, and LocalBusiness schema means lower visibility in rich results, no knowledge panel, and no local pack rankings.

**Why it happens:**
Developers treat schema markup as "nice to have" rather than critical SEO infrastructure. They don't understand JSON-LD syntax or which schema types apply to agencies. They implement Organization schema but forget Service schemas for individual service pages.

**How to avoid:**
- Implement Organization schema in root layout with complete agency data
- Add Service schema to each service page with specific offerings, pricing guidance, service area
- Use FAQPage schema on FAQ page for rich snippet eligibility
- Add LocalBusiness schema if targeting local SEO (with address, opening hours, service areas)
- Include Review/AggregateRating schema when testimonials exist
- Use BreadcrumbList schema on all non-homepage pages
- Generate JSON-LD dynamically in Server Components, inject via `<script type="application/ld+json">`
- Validate with Google Rich Results Test before deployment

**Warning signs:**
- Competitors appearing with rich snippets in search results, your site doesn't
- No knowledge panel when searching for agency name
- FAQ content not appearing as expandable rich results
- Search Console showing "Unparsable structured data" errors

**Phase to address:**
Phase 2 (SEO Foundation) - Implement Organization + BreadcrumbList schemas first. Add Service/FAQPage schemas when those pages are built.

---

### Pitfall 10: Form Validation Only Client-Side

**What goes wrong:**
Contact forms with only HTML5 validation (`required`, `type="email"`) can be bypassed. Bots submit spam, malicious payloads reach server, or data validation errors aren't caught until after submission. No rate limiting means spam floods the inbox.

**Why it happens:**
Developers rely on `required` attribute thinking it's sufficient. They don't realize client-side validation is trivial to bypass (disable JavaScript, use Postman, intercept request). They don't implement server-side schema validation.

**How to avoid:**
- Use Zod schema validation in Server Actions for all form submissions
- Implement honeypot field (hidden input, reject if filled - bots auto-fill)
- Add CSRF token validation for form submissions
- Rate limit submissions by IP using Vercel Edge Config or Redis
- Never trust client-side validation - always validate server-side
- Sanitize all inputs before processing (prevent XSS)
- Use reCAPTCHA v3 or Turnstile for additional bot protection if spam is severe
- Return field-level errors to client for UX, but validate fully on server

**Warning signs:**
- Spam submissions filling contact form despite "required" fields
- Form accepting invalid emails like "test@test"
- Successful submissions with missing required data
- Server errors from malformed data (SQL injection attempts, script tags)

**Phase to address:**
Phase 3 (Contact & Conversion) - Implement server-side validation with Zod when building contact form. Add honeypot field and rate limiting from day one.

---

## Moderate Pitfalls

### Pitfall 11: Heading Hierarchy Violations

**What goes wrong:**
Skipping heading levels (`<h1>` → `<h3>`) or multiple `<h1>` tags per page confuses screen readers and weakens SEO. Accessibility score drops, and search engines struggle to understand content hierarchy.

**Prevention:**
- One `<h1>` per page (typically page title)
- Never skip levels: h1 → h2 → h3, not h1 → h3
- Use semantic HTML even if visual design wants different sizes (use CSS to resize)
- Audit with axe DevTools or WAVE during development

---

### Pitfall 12: Canonical URL Misconfigurations

**What goes wrong:**
Missing canonical tags cause Google to treat language variants as duplicates. Self-referencing canonicals pointing to wrong language version destroys language-specific indexing. Trailing slash inconsistencies dilute link equity.

**Prevention:**
- Every page must have `<link rel="canonical">` pointing to itself
- Never use canonical to point EN page to RO page or vice versa
- Decide trailing slash strategy: always add or always remove, enforce consistently
- Canonical URL must match exactly the URL in hreflang for that language
- Use absolute URLs, not relative paths

---

### Pitfall 13: Blog Pagination Harming SEO

**What goes wrong:**
Client-side pagination (loading posts via JavaScript) makes paginated content invisible to search engines. Using `?page=2` query parameters without canonical strategy dilutes ranking signals. Not implementing `rel="next"` and `rel="prev"` confuses crawlers.

**Prevention:**
- Use route-based pagination: `/blog/page/2` not `/blog?page=2`
- Generate static pages for first 5-10 pagination pages using `generateStaticParams`
- Canonicalize paginated pages to page 1 if content is duplicate
- OR use `rel="next"` and `rel="prev"` to signal pagination relationship
- Ensure pagination links are real `<a>` tags, not JavaScript-only buttons
- Include paginated pages in sitemap

---

### Pitfall 14: Missing Meta Description Uniqueness

**What goes wrong:**
Duplicate or missing meta descriptions across pages means Google generates poor snippets from page content, reducing click-through rates by 20-30%.

**Prevention:**
- Generate unique meta descriptions for every page (150-160 characters)
- Use dynamic metadata API in Next.js: export `generateMetadata()` function
- Include target keywords naturally
- For blog posts, use excerpt or first paragraph
- Audit with Screaming Frog or Sitebulb before launch

---

### Pitfall 15: Environment Variable Exposure

**What goes wrong:**
Using `NEXT_PUBLIC_` prefix exposes secrets to client bundle. API keys, database credentials, or private tokens leak to browser, visible in View Source.

**Prevention:**
- NEVER prefix secrets with `NEXT_PUBLIC_`
- Use `NEXT_PUBLIC_` ONLY for truly public values (GA4 Measurement ID is safe)
- Keep API keys server-side, call them from Server Components or Route Handlers
- Use `server-only` package to enforce server-only imports
- Audit bundle with Next.js Bundle Analyzer before production deploy

---

### Pitfall 16: Over-Preloading Resources

**What goes wrong:**
Preloading 8-12 images, fonts, or scripts causes 2-4× bandwidth waste for users who bounce. Browser downloads everything immediately, delaying LCP.

**Prevention:**
- Preload ONLY the single LCP image (hero image)
- Preload critical font files (2 maximum)
- Don't preload entire font families - subset to used characters
- Use `<link rel="preconnect">` for external domains, not `preload`
- Test with Network throttling to see impact on slower connections

---

### Pitfall 17: Font Loading Waterfalls

**What goes wrong:**
Loading Google Fonts from CDN creates request chain: DNS lookup → CSS with @font-face → font file download. Each step adds latency, delaying text rendering and hurting LCP.

**Prevention:**
- Self-host fonts using `@next/font` (automatically optimizes)
- Use `next/font/google` for automatic subsetting and preloading
- Set `font-display: swap` to show fallback text immediately
- Limit to 2-3 font variants maximum (Regular + Bold, not 8 weights)
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` if CDN is necessary

---

### Pitfall 18: Missing robots.txt Granularity

**What goes wrong:**
Generic `robots.txt` allows crawling of admin routes, API endpoints, or development pages. Missing sitemap reference in robots.txt means crawlers don't discover sitemap.

**Prevention:**
- Create `public/robots.txt` with environment-aware rules
- Disallow: `/api/`, `/admin/`, `/_next/static/`, `/private/`
- Include: `Sitemap: https://domain.com/sitemap.xml`
- For staging environments, disallow all: `User-agent: * \n Disallow: /`
- Test with Google Search Console URL Inspection tool

---

### Pitfall 19: Component Library TypeScript Conflicts

**What goes wrong:**
ReactBits components may have TypeScript definitions incompatible with Next.js 15 or React 19. Build fails with type errors, or components lack proper type inference.

**Prevention:**
- Verify ReactBits TypeScript version compatibility before integration
- Use `skipLibCheck: true` in tsconfig.json as temporary workaround (not recommended long-term)
- Create local type declaration files in `src/types/` for missing definitions
- Report type issues to library maintainers
- Consider forking library if types are severely broken

---

### Pitfall 20: Neglecting Mobile-First Development

**What goes wrong:**
Designing desktop-first and adapting to mobile leads to hidden content, tap targets too small (< 48px), or horizontally scrolling sections. Core Web Vitals score fails on mobile despite passing desktop.

**Prevention:**
- Develop mobile viewport first, enhance for desktop
- Test on real mobile devices, not just Chrome DevTools
- Ensure tap targets minimum 48×48px with adequate spacing
- Use touch-friendly interactions (avoid hover-only UIs)
- Test with Lighthouse mobile simulation (slow 4G throttling)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding translations in components | Fast initial development | Impossible to scale, content updates require code changes | Never - always externalize translations |
| Using `any` types in TypeScript | Bypasses type errors | Loses type safety, bugs slip through | Only for truly dynamic third-party library workarounds |
| Skipping alt text on images | Saves time writing descriptions | Fails accessibility audits, hurts SEO | Never - alt text is critical for both |
| Inline styles instead of classes | Quick styling fixes | Bundle bloat, no caching, hard to maintain | Only for truly dynamic styles (user preferences) |
| Client-side rendering for SEO content | Easier state management | Content invisible to search engines | Never for above-fold or indexable content |
| Loading all blog posts at once | Simple implementation | Page weight grows infinitely, performance degrades | Only if blog will NEVER exceed 20 posts |
| Copy-pasting components instead of abstracting | Faster initial implementation | Maintenance nightmare when changes needed | Acceptable until 3rd duplication (then abstract) |
| Skipping error boundaries | One less thing to build | Entire page crashes on component error | Never - at least wrap page level |
| Using external API directly in components | Less code to write | Can't swap provider, hard to test, rate limit issues | Only for POC/prototype, refactor before production |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Unsplash API | Hitting rate limits by fetching on every request | Cache image URLs in database or static generation time |
| Google Analytics | Tracking page views on client-side navigation only | Use Next.js Router events to track all navigation |
| ReactBits Components | Importing all components increasing bundle | Use dynamic imports for large components |
| Email Service (Contact Form) | Exposing SMTP credentials in env variables | Use Server Actions with credentials in environment not exposed to client |
| Font CDNs | Loading fonts on demand causing FOUT/FOIT | Preload critical fonts in document head |
| i18n Libraries | Loading all language files upfront | Code-split translations by route/page |
| Image CDNs | Not configuring next/image domains | Add all external image domains to remotePatterns |
| Analytics Scripts | Loading analytics synchronously in head | Use Next.js Script component with strategy="afterInteractive" |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all blog posts in memory | Slow build times, high memory usage | Implement pagination, limit to 50 posts per page | > 100 blog posts |
| No image optimization | Slow page loads, high bandwidth | Use next/image with proper sizing | > 10 images per page |
| Client-side filtering 1000+ items | Janky UI, slow interactions | Server-side filtering with API routes | > 200 items |
| Synchronous data fetching | Request waterfalls, slow TTFB | Parallel fetching with Promise.all | > 3 data sources |
| No caching strategy | Repeated API calls, high costs | Implement ISR or on-demand revalidation | > 1000 requests/day |
| Bundling all translations | Large initial bundle | Split by route, lazy load | > 500 translation keys |
| Over-hydration (everything client-side) | High JavaScript bundle | Use Server Components by default | Bundle > 300KB |
| No CDN for static assets | Slow loads from distant users | Deploy to Vercel Edge Network | Global audience |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing GA4 Admin API keys | Attacker can manipulate analytics data | Use Measurement Protocol with restricted IP |
| No rate limiting on contact form | Spam floods, DDoS vulnerability | Implement rate limiting by IP, add CAPTCHA |
| Storing user data in localStorage | XSS attacks can steal data | Use httpOnly cookies for sensitive data |
| No CSRF protection on forms | Cross-site request forgery | Implement CSRF tokens in Server Actions |
| Trusting client-side validation | Bot spam, malicious payloads | Always validate server-side with Zod |
| Missing Content Security Policy | XSS vulnerability from injected scripts | Set CSP headers in next.config.js |
| Exposing internal API routes | Data leakage, unauthorized access | Protect API routes with authentication middleware |
| No input sanitization | SQL injection, XSS attacks | Sanitize all inputs before processing/storage |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Language switcher reloads from homepage | User loses place, frustrating | Switch language preserving current page path |
| Contact form with no loading state | User clicks submit multiple times, duplicate submissions | Show loading spinner, disable button during submission |
| Portfolio images without lazy loading | Slow initial page load, users bounce | Lazy load below-fold images, prioritize hero |
| No error messages on form validation | User doesn't know what's wrong | Show field-level errors inline with helpful messages |
| Language auto-detection without override | User stuck in wrong language | Detect but allow manual override, persist choice |
| Mobile menu requiring precise clicks | Frustration on touch devices | Large tap targets (48×48px minimum) |
| Links opening in new tab without warning | Unexpected behavior, lost context | Open in same tab or add icon indicating new tab |
| Search with no "no results" state | User thinks site is broken | Show helpful message with suggestions |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **i18n Implementation:** Often missing middleware configuration for locale detection - verify `middleware.ts` handles locale routing
- [ ] **Image Optimization:** Often missing remotePatterns config - verify external domains configured in next.config.js
- [ ] **Contact Form:** Often missing server-side validation - verify Zod schema validates in Server Action
- [ ] **SEO Meta Tags:** Often missing dynamic generation - verify each page has unique title/description
- [ ] **Hreflang Tags:** Often missing reciprocal links - verify both languages reference each other
- [ ] **Sitemap:** Often missing alternate language URLs - verify both /en/* and /ro/* paths included
- [ ] **Schema Markup:** Often missing on non-homepage - verify Service/FAQ schemas on relevant pages
- [ ] **Analytics:** Often missing server-side events - verify form submissions tracked server-side
- [ ] **Accessibility:** Often missing keyboard navigation - verify all interactive elements keyboard-accessible
- [ ] **Error Boundaries:** Often missing page-level wrapping - verify error.tsx exists for each route
- [ ] **Loading States:** Often missing Suspense boundaries - verify loading.tsx provides fallback UI
- [ ] **Font Loading:** Often missing preload tags - verify critical fonts preloaded in layout
- [ ] **Robots.txt:** Often missing sitemap reference - verify Sitemap: directive included
- [ ] **Canonical URLs:** Often missing or self-conflicting - verify matches hreflang for language
- [ ] **Rate Limiting:** Often missing on public forms - verify IP-based limiting implemented

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Server Component importing client library | LOW | Wrap component in client wrapper with "use client", redeploy |
| CSS-in-JS performance issues | HIGH | Migrate to Tailwind/CSS Modules, refactor all components, retest CWV |
| Client-side i18n breaking SEO | MEDIUM | Reconfigure with next-intl middleware, regenerate static pages, reindex |
| Missing hreflang tags | LOW | Add generateMetadata to layouts, redeploy, wait for re-crawl (2-4 weeks) |
| Unoptimized images hurting LCP | MEDIUM | Replace img with next/image, configure domains, optimize sizes, redeploy |
| GA4 double-tracking | LOW | Remove duplicate implementation, clear cookies, verify in debug mode |
| Data fetching waterfalls | MEDIUM | Refactor to Server Components with parallel fetching, redeploy |
| Missing multilingual sitemap | LOW | Generate sitemap.ts with both locales, submit to Search Console |
| No schema markup | LOW | Add JSON-LD to layouts, validate with Rich Results Test, redeploy |
| Client-only form validation | MEDIUM | Add Zod schema to Server Action, add honeypot, implement rate limiting |
| Broken canonical URLs | LOW | Fix generateMetadata function, redeploy, request re-indexing |
| Blog pagination harming SEO | MEDIUM | Refactor to route-based pagination, generate static pages, update sitemap |
| Environment variable exposure | HIGH | Rotate exposed secrets immediately, fix prefixes, redeploy, audit bundle |
| Missing accessibility | MEDIUM | Audit with axe, fix heading hierarchy, add ARIA labels, test with screen reader |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Server Component breaking with client libraries | Phase 1: Foundation Setup | Test ReactBits component renders without errors |
| CSS-in-JS destroying Core Web Vitals | Phase 1: Foundation Setup | Lighthouse mobile score LCP < 2.5s |
| Broken i18n with client-side rendering | Phase 1: Foundation Setup | View Source shows translated content server-rendered |
| Missing/broken hreflang | Phase 2: SEO Foundation | Google hreflang validator shows no errors |
| Unoptimized Unsplash images | Phase 1: Foundation Setup | PageSpeed Insights shows no image optimization warnings |
| GA4 double-tracking and data loss | Phase 3: Contact & Conversion | GA4 DebugView shows single events, not duplicates |
| Client-side waterfall data fetching | Phase 1: Foundation Setup | Network tab shows parallel requests, not sequential |
| Broken multilingual sitemap | Phase 2: SEO Foundation | Sitemap includes both /en/* and /ro/* URLs |
| Missing schema markup | Phase 2: SEO Foundation | Rich Results Test validates Organization/Service schemas |
| Form validation only client-side | Phase 3: Contact & Conversion | Postman bypass attempt rejected by server |
| Heading hierarchy violations | All content phases | axe DevTools shows no heading order violations |
| Canonical URL misconfigurations | Phase 2: SEO Foundation | Every page has self-referencing canonical |
| Blog pagination harming SEO | Phase 4: Content Creation (Blog) | Pagination URLs follow /blog/page/N pattern |
| Missing meta description uniqueness | All content phases | Screaming Frog shows unique descriptions |
| Environment variable exposure | Phase 1: Foundation Setup | Bundle analyzer shows no NEXT_PUBLIC_ secrets |
| Over-preloading resources | Phase 1: Foundation Setup | Network tab shows only LCP image preloaded |
| Font loading waterfalls | Phase 1: Foundation Setup | Fonts load from self-hosted, not CDN |
| Missing robots.txt granularity | Phase 2: SEO Foundation | robots.txt disallows /api/, includes sitemap |
| Component library TypeScript conflicts | Phase 1: Foundation Setup | Build completes with no type errors |
| Neglecting mobile-first development | All UI phases | Lighthouse mobile score > 90 |

## Sources

### Official Documentation (HIGH Confidence)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js Internationalization Guide](https://nextjs.org/docs/pages/guides/internationalization)
- [Google Managing Multi-Regional and Multilingual Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Next.js Forms and Mutations](https://nextjs.org/docs/pages/building-your-application/data-fetching/forms-and-mutations)

### Verified Technical Articles (MEDIUM-HIGH Confidence)
- [App Router Pitfalls: Common Next.js Mistakes and Practical Ways to Avoid Them](https://imidef.com/en/2026-02-11-app-router-pitfalls)
- [10 Common Next.js Mistakes That Hurt Core Web Vitals](https://pagepro.co/blog/common-nextjs-mistakes-core-web-vitals/)
- [Typical Next.js SEO Pitfalls to Avoid in 2024](https://focusreactive.com/typical-next-js-seo-pitfalls-to-avoid-in-2024/)
- [Next.js Image Component: Performance and CWV in Practice](https://pagepro.co/blog/nextjs-image-component-performance-cwv/)

### Multilingual & SEO Resources (MEDIUM Confidence)
- [Multilingual SEO: Frequent Issues and How to Fix Them](https://www.seobility.net/en/blog/multilingual-seo-issues/)
- [Hreflang and Canonical Tags: The Only Guide You'll Ever Need](https://translatepress.com/hreflang-canonical/)
- [Hreflang Implementation Guide: Complete Technical Reference for International SEO | 2026](https://www.linkgraph.com/blog/hreflang-implementation-guide/)
- [Next.js Multilingual SEO Checklist 2024](https://staarter.dev/blog/nextjs-multilingual-seo-checklist-2024)

### Analytics & Tracking (MEDIUM Confidence)
- [6 Common GA4 Implementation Mistakes (And How to Fix Them)](https://www.perrill.com/6-common-ga4-implementation-mistakes-and-how-to-fix-them/)
- [10 Google Analytics 4 Mistakes in Configuration You Should Avoid](https://www.analyticsmania.com/post/google-analytics-4-mistakes/)
- [Doing GA4 in 2026: The Definitive Guide to Google Analytics in the Post-Cookie Era](https://ankitnagarsheth.medium.com/doing-ga4-in-2026-the-definitive-guide-to-google-analytics-in-the-post-cookie-era-c717faed2033)

### Performance & Optimization (MEDIUM Confidence)
- [7 Common Performance Mistakes in Next.js and How to Fix Them](https://medium.com/full-stack-forge/7-common-performance-mistakes-in-next-js-and-how-to-fix-them-edd355e2f9a9)
- [React & Next.js Best Practices in 2026: Performance, Scale & Cleaner Code](https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale)
- [SEO Copilot: Improve Core Web Vitals for JavaScript Websites](https://www.seocopilot.com/next-js/improve-core-web-vitals-for-javascript-websites-practical-guide)

### Component Integration & Forms (MEDIUM Confidence)
- [Building Secure and Resilient Contact Forms in Next.js](https://arnab-k.medium.com/building-secure-and-resilient-contact-forms-in-next-js-450cbb437e68)
- [The Only Guide You Need for Next.js Forms: Server Actions, Zod & Validation (2025)](https://www.deepintodev.com/blog/form-handling-in-nextjs)
- [How to Effectively Set Up NextJS with a Component Library using Monorepos](https://dainemawer.com/articles/how-to-effectively-setup-nextjs-with-a-component-library-using-monorepos)

### Agency & Design Systems (MEDIUM Confidence)
- [Branding Mistakes in Design: 10 Critical Errors & Strategic Fixes](https://weandthecolor.com/the-10-most-common-branding-mistakes-in-design-and-how-to-avoid-them/208098)
- [Common Mistakes When Creating a Portfolio (and How to Avoid Them)](https://www.wix.com/blog/common-portfolio-mistakes)

---
*Pitfalls research for: B2B Digital Agency Website (Bilingual, Next.js 15, Core Web Vitals 90+)*
*Researched: 2026-02-13*
*Confidence: HIGH - Based on official Next.js docs, Google developer documentation, and verified 2025-2026 technical articles*
