---
phase: 01-foundation-infrastructure
plan: 02
subsystem: i18n
tags: [next-intl, i18n, routing, translations, localization, seo]
dependency-graph:
  requires:
    - Next.js 16 project structure (01-01)
    - Tailwind CSS configuration (01-01)
  provides:
    - Bilingual routing infrastructure (/ro and /en URL segments)
    - Server-side translation system with next-intl
    - Language switcher component
    - Hreflang tags for SEO
    - Dynamic lang attribute on HTML element
  affects:
    - All future pages (must be created under [locale] route)
    - All components using translations
tech-stack:
  added:
    - next-intl 3.x
  patterns:
    - [locale] dynamic segment for bilingual routing
    - Server Components with getTranslations for SSR translations
    - NextIntlClientProvider for client component translations
    - Middleware-based locale detection and URL rewriting
    - Namespaced translation keys in single ro.json/en.json files
    - Dynamic lang attribute via getLocale() in root layout
    - generateMetadata with hreflang tags for multilingual SEO
key-files:
  created:
    - src/i18n/routing.ts
    - src/i18n/request.ts
    - src/middleware.ts
    - src/app/[locale]/layout.tsx
    - src/app/[locale]/page.tsx
    - src/messages/ro.json
    - src/messages/en.json
    - src/components/layout/LanguageSwitcher.tsx
  modified:
    - next.config.ts (wrapped with createNextIntlPlugin)
    - src/app/layout.tsx (added getLocale() for dynamic lang attribute)
  deleted:
    - src/app/page.tsx (moved to [locale]/page.tsx)
decisions:
  - Used server-side translations with getTranslations for SEO-friendly SSR content
  - Set localePrefix: 'always' to force /ro and /en in all URLs (no unprefixed paths)
  - Placed translation files at src/messages/ (not per-page) with namespaced keys
  - Used getLocale() in root layout to dynamically set HTML lang attribute per request
  - Combined Tasks 1 and 2 into single commit since translation files are required for config to build
metrics:
  duration: 398 seconds
  completed: 2026-02-15
---

# Phase 01 Plan 02: i18n Configuration with next-intl

Bilingual routing infrastructure with next-intl enabling Romanian (default) and English locales, server-rendered translations, language switcher, and hreflang SEO tags.

## Tasks Completed

### Combined Task: Configure next-intl routing, translations, and language switcher

**Commit:** a6c7d99

Installed next-intl and configured complete bilingual routing infrastructure with server-side translations, middleware, locale layouts, translation files, homepage, and language switcher component.

**Files created:**
- `src/i18n/routing.ts` - Routing configuration with ro/en locales, ro as default, localePrefix: 'always', and typed navigation helpers
- `src/i18n/request.ts` - Server-side config loading translation messages from ro.json/en.json
- `src/middleware.ts` - next-intl middleware for locale detection and URL rewriting
- `src/app/[locale]/layout.tsx` - Locale layout with NextIntlClientProvider, generateMetadata with hreflang tags, generateStaticParams
- `src/app/[locale]/page.tsx` - Homepage using server-side getTranslations with Romanian/English content
- `src/messages/ro.json` - Romanian translations with namespaced keys (Metadata, HomePage, Navigation, LanguageSwitcher, Common)
- `src/messages/en.json` - English translations with identical namespace structure
- `src/components/layout/LanguageSwitcher.tsx` - Client component for switching locales while preserving current path

**Files modified:**
- `next.config.ts` - Wrapped with createNextIntlPlugin('./src/i18n/request.ts')
- `src/app/layout.tsx` - Made async, imported getLocale(), set `lang={locale}` dynamically on `<html>` tag
- `package.json` / `package-lock.json` - Added next-intl dependency

**Files deleted:**
- `src/app/page.tsx` - Removed root-level page, replaced by [locale]/page.tsx

**Features implemented:**
1. **Routing:** / redirects to /ro (default locale), both /ro and /en routes work
2. **Translations:** Server-rendered using getTranslations - visible in HTML source
3. **Language switcher:** RO/EN buttons switch locales while preserving current path
4. **SEO:** hreflang tags for ro, en, and x-default in HTML head via generateMetadata
5. **HTML lang attribute:** Dynamically set per locale using getLocale() in root layout
6. **Translation namespace structure:** Metadata, HomePage, Navigation, LanguageSwitcher, Common

**Verification:**
- ✅ Production build succeeds: `npm run build` completes without errors
- ✅ ESLint passes: `npm run lint` reports no issues
- ✅ Locale layout has generateMetadata with hreflang tags
- ✅ Root layout uses getLocale() to set dynamic lang attribute
- ✅ Middleware redirects / to /ro
- ✅ Both /ro and /en routes are generated
- ✅ Translation files contain all Phase 1 UI strings

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Translation files required for build**
- **Found during:** Task 1 - Running `npm run build` after creating i18n config files
- **Issue:** Build failed with "Module not found: Can't resolve '../messages/' <dynamic> '.json'" because request.ts tries to import translation files that didn't exist yet
- **Fix:** Created translation files (ro.json, en.json) immediately as part of Task 1 instead of waiting for Task 2, since they're required dependencies for the i18n configuration to compile
- **Files created:** src/messages/ro.json, src/messages/en.json
- **Commit:** Combined with a6c7d99 (single commit for both tasks since they're interdependent)

**Rationale:** The plan separated configuration (Task 1) and translation files (Task 2), but next-intl's request.ts config uses dynamic imports that fail at build time if the message files don't exist. This is a blocking build error (Rule 3), so creating the translation files as part of the configuration setup was necessary. Both tasks were combined into a single commit since they form one cohesive unit of functionality.

## Verification Results

All success criteria met:

- ✅ next-intl routing active with /ro and /en URL segments
- ✅ Middleware redirects / to /ro (default locale)
- ✅ Server-side translations visible in View Source HTML for both locales (using getTranslations in Server Components)
- ✅ Language switcher toggles between RO/EN preserving current page path
- ✅ Hreflang tags in HTML head for ro, en, and x-default via generateMetadata
- ✅ HTML lang attribute set dynamically per locale using getLocale()
- ✅ Translation files (ro.json, en.json) contain namespaced keys for HomePage, Navigation, LanguageSwitcher, Common, Metadata
- ✅ Production build generates static pages for both locales
- ✅ No regression from Plan 01 - brand colors and fonts still render correctly

## Self-Check

### Created Files Verification

```bash
✓ FOUND: src/i18n/routing.ts
✓ FOUND: src/i18n/request.ts
✓ FOUND: src/middleware.ts
✓ FOUND: src/app/[locale]/layout.tsx
✓ FOUND: src/app/[locale]/page.tsx
✓ FOUND: src/messages/ro.json
✓ FOUND: src/messages/en.json
✓ FOUND: src/components/layout/LanguageSwitcher.tsx
```

### Commits Verification

```bash
✓ FOUND: a6c7d99 (feat(01-02): configure bilingual routing with next-intl)
```

**Self-Check: PASSED**

## Next Steps

**Plan 03:** SEO Meta Infrastructure
- Create shared metadata generator function in lib/metadata.ts
- Implement JSON-LD schema builders for Organization, LocalBusiness, Service, etc.
- Add Open Graph and Twitter Card meta tags
- Configure sitemap.xml and robots.txt generation
- Ensure all metadata is bilingual and uses translation keys
