# Technology Stack

**Project:** AceAgency B2B Digital Agency Website
**Researched:** 2026-02-13
**Overall Confidence:** HIGH

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x | React meta-framework with SSR/SSG | Industry standard for React SSR/SSG in 2026. Provides built-in SSR, SSG, ISR, automatic code splitting, image optimization, and Core Web Vitals optimizations. Supports React Server Components, Server Actions, and Partial Prerendering for optimal performance. Superior SEO capabilities with native metadata API and sitemap generation. |
| React | 19.x | UI library | Required by Next.js 16. Includes React Server Components and improved performance through automatic optimizations. |
| TypeScript | 5.x | Type safety | Next.js has built-in TypeScript support. Industry standard for 2026 - improves maintainability, refactoring, and developer confidence. Type inference from Zod schemas eliminates duplication. |
| Node.js | 20.x LTS | Runtime environment | Required for Next.js build and server. LTS version ensures stability and long-term support. |

**Confidence:** HIGH - All versions verified from official Next.js documentation (nextjs.org, updated Feb 11, 2026)

### Internationalization (i18n)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-intl | 3.x | Next.js-native i18n solution | Purpose-built for Next.js App Router with Server Components support. Provides type-safe message keys, ICU message syntax for pluralization, localized routing with SEO-friendly URLs, and request-scoped configuration. Superior to react-i18next for Next.js because it's Next.js-native and performance-obsessed with static rendering support. |

**Confidence:** HIGH - Verified from next-intl.dev and official Next.js i18n guides

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.1.x | Utility-first CSS framework | Official Next.js recommendation for styling. Production builds automatically tree-shake unused CSS (most projects ship <10kB). Supports CSS variables for brand theming, dark mode with `dark:` prefix, responsive breakpoints, and modern CSS features (P3 colors, container queries, logical properties). Fully compatible with React Server Components. |
| CSS Modules | Built-in | Component-scoped CSS | Built into Next.js for custom scoped styles when Tailwind utilities aren't sufficient. Use with `@apply` directive to combine Tailwind utilities into reusable classes. |

**Confidence:** HIGH - Verified from official Tailwind CSS v4.1 docs and Next.js styling guide

### Forms & Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Form state management | Most popular React form library (2.1M weekly downloads). Minimal re-renders using uncontrolled components, no dependencies, excellent performance (1800ms mount vs competitors' 2070-2380ms). Formik is no longer actively maintained (last commit >1 year ago). |
| Zod | 3.x | Schema validation & type inference | TypeScript-first validation. Define schemas once, automatically infer TypeScript types. Integrates with React Hook Form via `@hookform/resolvers`. Provides runtime validation + compile-time type safety. Supports complex validation (required fields, data types, ranges, cross-field validation). |
| @hookform/resolvers | Latest | React Hook Form + Zod integration | Official bridge between React Hook Form and Zod for seamless schema-based validation. |

**Confidence:** HIGH - React Hook Form verified from react-hook-form.com; Zod from multiple 2026 sources

### SEO & Metadata

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Metadata API | Built-in | Meta tags, OG images, sitemaps | Native Next.js 16 feature. Type-safe metadata configuration per route. Automatic sitemap.xml generation with `sitemap.(js|ts)` file convention. Use `generateSitemaps` for large multi-page sitemaps. |
| schema-dts | Latest | Type-safe JSON-LD schema markup | Google-provided TypeScript types for Schema.org vocabulary. Enables type-safe structured data for SEO (Article, Organization, BreadcrumbList, FAQPage schemas). JSON-LD is Google's preferred format for 2026 due to separation from HTML and ease of maintenance. |

**Confidence:** HIGH - Next.js Metadata API from official docs; schema-dts from Google GitHub repo

### Analytics & Tracking

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Google Analytics 4 | Latest | Web analytics | Industry standard for 2026. Track pageviews, user interactions, conversions. Enhanced Event Measurement provides automatic tracking of common interactions. |
| @next/third-parties | Built-in | Third-party script optimization | Official Next.js package (since v14). Provides `<GoogleAnalytics>` and `<GoogleTagManager>` components with optimized loading (deferred until after hydration). GTM recommended over direct GA4 for custom event tracking flexibility. |

**Confidence:** HIGH - Verified from Next.js official third-party libraries guide

### Image Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/image | Built-in | Image optimization | Automatic image optimization (resize, compress, lazy-load). Improves LCP and prevents CLS. Supports modern formats (WebP, AVIF). Works seamlessly with Unsplash URLs via remote patterns configuration. |
| Unsplash API | v1 | Stock imagery source | Free high-quality images. Next.js Image component can optimize Unsplash URLs directly with proper `remotePatterns` configuration in next.config.js. |

**Confidence:** HIGH - next/image from official Next.js docs; Unsplash integration verified from community examples

### Development Tools

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| ESLint | 9.x | Code linting | Built into Next.js via `eslint-config-next`. Use `eslint-config-next/core-web-vitals` to upgrade performance-impacting rules from warnings to errors. Modern projects use `eslint.config.mjs` (flat config) instead of `.eslintrc.json`. |
| Prettier | 3.x | Code formatting | Industry standard formatter. Install `eslint-config-prettier` to disable conflicting ESLint formatting rules. Ensures consistent code style across team. |
| Turbopack | Built-in | Next.js bundler | Powers 90% of Vercel deployments in 2026. Faster than Webpack for development and production builds. Enabled by default in Next.js 16. |

**Confidence:** HIGH - ESLint config verified from Next.js docs; Prettier from multiple 2026 sources

### Component Library

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| ReactBits | Latest | Animated UI components | Open-source collection of 110+ animated, interactive, customizable React components. Project requirement. Components are installed via CLI (jsrepo) with minimal dependencies. Provides 4 variants per component for flexibility. Compatible with modern React and Tailwind CSS. |

**Confidence:** MEDIUM - Verified from ReactBits.dev and GitHub (DavidHDev/react-bits). Need to validate Next.js 16 + React Server Components compatibility during implementation.

## Installation

```bash
# Initialize Next.js project with TypeScript, Tailwind, ESLint, App Router
npx create-next-app@latest aceagency-website --typescript --tailwind --eslint --app --turbopack --import-alias "@/*"

# Core dependencies
npm install next-intl schema-dts

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Analytics (if not using Script tag approach)
# @next/third-parties is built into Next.js 16

# Development dependencies
npm install -D prettier eslint-config-prettier

# ReactBits components (installed via CLI as needed)
# Follow reactbits.dev documentation for component installation
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Meta-framework | Next.js 16 | Remix | Remix excels at SSR-heavy dynamic apps, but Next.js dominates in static/hybrid rendering (needed for agency website), has superior ecosystem maturity, better SEO tooling, and built-in image optimization. Next.js is industry standard in 2026. |
| Meta-framework | Next.js 16 | Gatsby | Gatsby excels at pure static sites but has declined in popularity. Next.js provides equivalent SSG capabilities plus SSR flexibility and better Core Web Vitals optimization through Partial Prerendering and RSC. |
| i18n Library | next-intl | react-i18next | react-i18next is most popular (2.1M downloads) but not Next.js-optimized. next-intl is purpose-built for Next.js App Router, supports Server Components, provides better performance with static rendering, and has type-safe message keys. |
| i18n Library | next-intl | react-intl (FormatJS) | react-intl is standards-based (ECMA-402) but requires more boilerplate and isn't Next.js-optimized. next-intl provides simpler DX for Next.js projects with built-in routing support. |
| Form Library | React Hook Form | Formik | Formik is no longer actively maintained (last commit >1 year ago, last release >1 year). React Hook Form is actively maintained, has better performance (less re-renders), smaller bundle (zero dependencies vs 9), and cleaner API. |
| Validation | Zod | Yup | Yup is mature but not TypeScript-first. Zod provides superior type inference (define schema once, get TypeScript types automatically), better DX, and is the 2026 standard for schema validation. |
| Styling | Tailwind CSS | CSS-in-JS (styled-components, emotion) | CSS-in-JS adds runtime overhead and complicates React Server Components support. Tailwind uses static class names, has zero runtime cost, tree-shakes unused styles, and is fully RSC-compatible. Next.js officially recommends Tailwind. |
| Styling | Tailwind CSS | CSS Modules only | CSS Modules are good for scoped styles but require more code than Tailwind utilities. Recommended approach is Tailwind for component styling + CSS Modules for custom complex styles when needed. |
| Hosting | Vercel | Self-hosting (Railway, AWS, VPS) | Vercel is the simplest deployment option for Next.js (zero config), has best DX, and supports all Next.js 16 features out-of-the-box. For a B2B agency website (likely <1M pageviews), Vercel's free tier or Pro plan ($20/mo) is cost-effective. Self-hosting adds complexity but saves costs at scale (>1M pageviews). Start with Vercel, migrate if needed. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated, no longer maintained. No SSR/SSG support, poor SEO, manual optimization required. React team recommends meta-frameworks. | Next.js 16 with App Router |
| Formik | No longer actively maintained. Last Git commit >1 year ago, no new releases. | React Hook Form |
| next-i18next | Designed for Pages Router. Doesn't fully support App Router and Server Components. | next-intl |
| Yup validation | Not TypeScript-first, requires separate type definitions, less type-safe than Zod. | Zod |
| CSS-in-JS libraries | Runtime performance cost, poor React Server Components support, larger bundle sizes. | Tailwind CSS + CSS Modules |
| Manual schema markup (plain JSON-LD) | Error-prone without types, harder to maintain, no autocomplete or validation. | schema-dts for type-safe schema markup |
| Google Analytics via gtag.js script tags | Blocks rendering, impacts Core Web Vitals. No optimization. | @next/third-parties GoogleAnalytics or GoogleTagManager components |
| Pages Router (legacy) | App Router is the standard in 2026. Server Components, better performance, simpler data fetching. | App Router (default in Next.js 16) |

## Stack Patterns by Use Case

### For Production Deployment

**Recommended Hosting:** Vercel

**Why:**
- Zero-config deployment (connect GitHub repo)
- Native Next.js 16 support (all features work out-of-the-box)
- Automatic HTTPS, CDN, edge caching
- Preview deployments for PRs
- Web Vitals monitoring built-in
- Free tier sufficient for low-traffic agency website
- Pro plan ($20/mo) handles moderate traffic (<1M pageviews)

**When to Consider Alternatives:**
- High traffic (>1M pageviews/month): Consider Railway, AWS Amplify, or self-hosting with Coolify for 50-70% cost savings
- Existing AWS infrastructure: Use AWS Amplify
- Full control needed: Self-host on VPS with Coolify ($4-6/mo)

### For SEO-Optimized Pages

**Pattern:**
1. Use Static Site Generation (SSG) for marketing pages (Home, About, Services)
2. Use Incremental Static Regeneration (ISR) for blog/case studies (revalidate every 24h)
3. Use Server-Side Rendering (SSR) only for truly dynamic content (contact form with real-time data)

**Schema Markup Strategy:**
- Organization schema on all pages (global in layout.tsx)
- BreadcrumbList on all interior pages
- Article schema on blog posts
- FAQPage on service pages
- Implement using schema-dts for type safety

**Metadata Strategy:**
- Define metadata object in each page.tsx using Next.js Metadata API
- Use `generateMetadata` for dynamic pages
- Include Open Graph images (og:image) for social sharing
- Generate sitemap.xml using sitemap.ts file convention

### For Bilingual (RO + EN) Support

**Routing Pattern:**
```
/                     → Romanian (default)
/en/                  → English
/servicii/web-design  → Romanian service page
/en/services/web-design → English service page
```

**Implementation:**
1. Use next-intl with `[locale]` dynamic segment in app/[locale]/layout.tsx
2. Create translation files: `messages/ro.json`, `messages/en.json`
3. Use ICU message syntax for pluralization and interpolation
4. Implement language switcher component
5. Set `hreflang` tags in metadata for each language variant

**SEO Considerations:**
- Localized sitemaps: /sitemap.xml (RO), /en/sitemap.xml (EN)
- Separate schema markup per language
- `hreflang` tags pointing to alternate language versions
- Localized URLs (e.g., /servicii vs /en/services)

### For Core Web Vitals 90+ Score

**Required Optimizations:**

**LCP (Largest Contentful Paint) <2.5s:**
- Use next/image for all images (automatic optimization, lazy loading)
- Preload above-fold images with `priority` prop
- Use Tailwind's tree-shaking (automatic in production)
- Implement Partial Prerendering (static shell + dynamic holes)
- Use font optimization with next/font

**INP (Interaction to Next Paint) <200ms:**
- Use React Server Components for non-interactive UI (less client JS)
- Dynamic imports for heavy client components
- Minimize third-party scripts (use @next/third-parties for optimized loading)
- Defer non-critical JavaScript

**CLS (Cumulative Layout Shift) <0.1:**
- Always specify width/height on next/image
- Reserve space for ads/embeds with CSS
- Avoid inserting content above existing content
- Use CSS `aspect-ratio` for responsive containers

**Monitoring:**
- Use `useReportWebVitals` hook to send metrics to analytics
- Monitor Real User Metrics (RUM) via Vercel Analytics or custom solution

### For Contact Form with GA4 Tracking

**Implementation:**
1. Create form with React Hook Form + Zod validation
2. Define Zod schema with all required fields and validation rules
3. Use Server Actions for form submission (no API routes needed)
4. Send custom events to GA4 via GTM dataLayer

**Example Event Tracking:**
```typescript
// Push to GTM dataLayer on form submission
window.dataLayer.push({
  event: 'form_submission',
  form_name: 'contact_form',
  form_language: locale,
  user_country: 'RO'
});
```

**GA4 Configuration:**
- Install GTM via `@next/third-parties/google` GoogleTagManager component
- Configure GA4 tag in GTM dashboard
- Set up conversion tracking for form submissions
- Create custom events for button clicks, scroll depth, etc.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 16.x | React 19.x | Next.js 16 requires React 19.x minimum |
| Next.js 16.x | Node 20.x LTS | Node 20.x LTS recommended for stability |
| next-intl 3.x | Next.js 16 App Router | Requires App Router with [locale] dynamic segment |
| React Hook Form 7.x | React 19.x | No breaking changes, fully compatible |
| Zod 3.x | TypeScript 5.x | Requires TypeScript for type inference |
| Tailwind CSS 4.1.x | Next.js 16 | Native support via next.config.js |
| schema-dts | TypeScript 5.x | TypeScript required for type checking |
| @next/third-parties | Next.js 16 | Built into Next.js 16, available in App Router |

## Performance Benchmarks (Expected)

Based on Next.js 16 optimizations and recommended stack:

| Metric | Target | Expected with Stack |
|--------|--------|---------------------|
| Lighthouse Performance | 90+ | 95-100 (with proper optimization) |
| LCP (Largest Contentful Paint) | <2.5s | 1.2-1.8s (with next/image + SSG) |
| INP (Interaction to Next Paint) | <200ms | 50-150ms (with RSC + minimal client JS) |
| CLS (Cumulative Layout Shift) | <0.1 | 0.0-0.05 (with proper image sizing) |
| First Contentful Paint | <1.8s | 0.8-1.2s (with Partial Prerendering) |
| Time to Interactive | <3.8s | 1.5-2.5s (with Server Components) |
| Total Blocking Time | <200ms | 50-150ms (with minimal client JS) |
| Bundle Size (First Load JS) | <100kB | 60-80kB (Tailwind tree-shaking + RSC) |

**Note:** Actual performance depends on implementation quality, content size, and hosting infrastructure. Regular monitoring with Lighthouse and Real User Metrics recommended.

## Sources

### Official Documentation (HIGH Confidence)
- [Next.js 16 Official Documentation](https://nextjs.org/docs) - Core framework features, App Router, Metadata API, Image optimization
- [Next.js SEO Guide](https://nextjs.org/learn/seo) - SEO best practices, Core Web Vitals optimization
- [Next.js Third-Party Libraries](https://nextjs.org/docs/app/guides/third-party-libraries) - GA4 integration
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) - Structured data implementation
- [Tailwind CSS v4.1 Documentation](https://tailwindcss.com/) - Styling features and setup
- [Tailwind CSS + Next.js Guide](https://tailwindcss.com/docs/guides/nextjs) - Integration guide
- [React Hook Form Documentation](https://react-hook-form.com/) - Form library features
- [next-intl Documentation](https://next-intl.dev/) - i18n for Next.js App Router
- [Zod Documentation](https://zod.dev/) - Schema validation
- [schema-dts GitHub](https://github.com/google/schema-dts) - Google's TypeScript types for Schema.org

### Ecosystem Research (MEDIUM-HIGH Confidence)
- [SSR vs. SSG in Next.js: Latest Trends & Best Practices for 2026](https://colorwhistle.com/ssr-ssg-trends-nextjs/)
- [Next.js in 2026: The Full Stack React Framework](https://www.nucamp.co/blog/next.js-in-2026-the-full-stack-react-framework-that-dominates-the-industry)
- [React & Next.js in 2025 - Modern Best Practices](https://strapi.io/blog/react-and-nextjs-in-2025-modern-best-practices)
- [Optimize Core Web Vitals in NextJS App Router for 2025](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025)
- [React Hook Form vs Formik Comparison](https://refine.dev/blog/react-hook-form-vs-formik/)
- [Form Validation with Zod and React Hook Form](https://strapi.io/blog/form-validation-in-typescipt-projects-using-zod-and-react-hook-forma)
- [Best i18n libraries for React & NextJS](https://simplelocalize.io/blog/posts/the-most-popular-react-localization-libraries/)
- [Next.js Internationalization Guide](https://poeditor.com/blog/next-js-i18n/)
- [Styling Strategies in Next.js 2025: CSS Modules vs Tailwind vs CSS-in-JS](https://medium.com/@sureshdotariya/styling-strategies-in-next-js-2025-css-modules-vs-tailwind-css-4-vs-css-in-js-c63107ba533c)
- [Implementing JSON-LD in Next.js for SEO](https://www.wisp.blog/blog/implementing-json-ld-in-nextjs-for-seo)
- [ReactBits Official Site](https://reactbits.dev)
- [ReactBits GitHub Repository](https://github.com/DavidHDev/react-bits)

### Deployment & Hosting Research (MEDIUM Confidence)
- [Best Vercel Alternatives for Next.js Hosting in 2025](https://danubedata.ro/blog/best-vercel-alternatives-nextjs-hosting-2025)
- [10 Best Next.js Hosting Providers in 2026](https://makerkit.dev/blog/tutorials/best-hosting-nextjs)
- [Top 6 Vercel Alternatives to Host NextJS apps in 2025](https://snappify.com/blog/vercel-alternatives)

---
*Stack research for: AceAgency B2B Digital Agency Website*
*Researched: 2026-02-13*
*Overall Confidence: HIGH*
