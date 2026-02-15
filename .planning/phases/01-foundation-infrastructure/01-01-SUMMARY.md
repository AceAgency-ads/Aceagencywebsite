---
phase: 01-foundation-infrastructure
plan: 01
subsystem: foundation
tags: [nextjs, tailwind, typescript, fonts, design-system, tooling]
dependency-graph:
  requires: []
  provides:
    - Next.js 16 project structure with App Router
    - Tailwind CSS 4 brand design system
    - TypeScript 5 configuration
    - Brand fonts with zero FOUT
    - ESLint 9 + Prettier 3 code quality tooling
  affects:
    - All subsequent plans (foundation layer)
tech-stack:
  added:
    - Next.js 16.1.6
    - React 19.0.0
    - TypeScript 5
    - Tailwind CSS 4.1.0
    - ESLint 9 with flat config
    - Prettier 3 with Tailwind plugin
    - next/font/google for web fonts
  patterns:
    - CSS-first @theme configuration for design tokens
    - Font loading with display:swap for zero FOUT
    - ESLint flat config with Next.js core-web-vitals
    - Prettier integration with Tailwind CSS class sorting
key-files:
  created:
    - package.json
    - tsconfig.json
    - next.config.ts
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/globals.css
    - eslint.config.mjs
    - .prettierrc
    - .gitignore
  modified: []
decisions:
  - Used Josefin Sans as geometric sans-serif fallback for Glacial Indifference (not available on Google Fonts)
  - Used next/font/google for all fonts (Poppins, Red Hat Display, Anton, Josefin Sans) instead of local .woff2 files
  - Simplified ESLint flat config by directly importing eslint-config-next instead of using FlatCompat wrapper
  - Deferred next-intl integration to Plan 02 as specified in plan
metrics:
  duration: 334 seconds
  completed: 2026-02-15
---

# Phase 01 Plan 01: Next.js 16 Foundation with Brand Design System

Next.js 16 project initialized with TypeScript 5, React 19, Tailwind CSS 4 brand design tokens, Google Fonts with zero FOUT, and ESLint/Prettier code quality tooling.

## Tasks Completed

### Task 1: Initialize Next.js 16 project with Tailwind CSS 4 brand design tokens

**Commit:** 736ed63

Created the foundational Next.js 16 project structure with all brand colors configured as Tailwind CSS 4 design tokens using the new @theme syntax.

**Files created:**
- `package.json` - Project dependencies with Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- `tsconfig.json` - TypeScript configuration with strict mode and path aliases
- `next.config.ts` - Next.js config with Unsplash remote patterns for image optimization
- `src/app/layout.tsx` - Root layout with metadata
- `src/app/page.tsx` - Test page displaying brand colors and typography samples
- `src/app/globals.css` - Tailwind CSS 4 @theme block with 6 brand colors and 4 font families
- `.gitignore` - Standard Next.js ignore patterns

**Brand colors configured:**
- Electric Violet (#650CBE) → `bg-electric-violet`
- Burgundy (#56151A) → `bg-burgundy`
- Electric Mint (#66F2A6) → `bg-electric-mint`
- Cobalt Blue (#4500D0) → `bg-cobalt-blue`
- Brand Black (#252523) → `bg-brand-black`
- Brand Grey (#D9D9D9) → `bg-brand-grey`

**Verification:** Production build succeeded. Test page renders all 6 brand colors correctly.

### Task 2: Load brand fonts and configure ESLint + Prettier

**Commit:** 83a27df

Loaded all 4 brand fonts using next/font/google with zero FOUT, configured ESLint 9 flat config with Next.js core-web-vitals, and set up Prettier 3 with Tailwind CSS plugin.

**Files created:**
- `eslint.config.mjs` - ESLint 9 flat config with Next.js and Prettier integration
- `.prettierrc` - Prettier configuration with Tailwind CSS class sorting plugin

**Files modified:**
- `src/app/layout.tsx` - Added font imports and CSS variables
- `package.json` - Added prettier and eslint-config-prettier dependencies
- `src/app/globals.css`, `src/app/page.tsx` - Auto-formatted by Prettier

**Fonts loaded:**
- Josefin Sans (400, 700) → `font-headline` (fallback for Glacial Indifference)
- Poppins (400, 500) → `font-body`
- Red Hat Display (400) → `font-subheading`
- Anton (400) → `font-secondary`

All fonts use `display: swap` to eliminate flash of unstyled text (FOUT).

**Verification:**
- `npm run lint` passes without errors
- `npm run format` successfully formats all TypeScript/TSX files
- Production build succeeds
- Fonts render correctly on test page

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] create-next-app naming restriction**
- **Found during:** Task 1 initialization
- **Issue:** Directory name "Aceagencywebsite" contains capitals, violating npm naming restrictions when using `create-next-app . --yes`
- **Fix:** Created project structure manually by writing package.json, tsconfig.json, next.config.ts, and source files directly instead of using create-next-app scaffold
- **Files created:** All foundational files written manually
- **Commit:** 736ed63

**2. [Rule 3 - Blocking] ESLint flat config circular structure error**
- **Found during:** Task 2 ESLint verification
- **Issue:** FlatCompat wrapper with compat.extends() caused "Converting circular structure to JSON" error in ESLint 9
- **Fix:** Simplified config to directly import and spread eslint-config-next instead of using FlatCompat wrapper
- **Files modified:** eslint.config.mjs
- **Commit:** 83a27df

**3. [Rule 2 - Missing critical functionality] Font fallback strategy**
- **Found during:** Task 2 font loading
- **Issue:** Glacial Indifference not available on Google Fonts and no .woff2 files readily available
- **Fix:** Used Josefin Sans (geometric sans-serif on Google Fonts) as documented fallback, matching the brand's modern aesthetic
- **Files modified:** src/app/layout.tsx
- **Commit:** 83a27df

## Verification Results

All success criteria met:

- ✅ Next.js 16 project initialized with TypeScript 5, React 19, App Router, src/ directory
- ✅ Tailwind CSS 4 configured with 6 brand colors as @theme CSS variables generating utility classes
- ✅ 4 brand fonts loaded via next/font/google with zero FOUT
- ✅ ESLint 9 flat config + Prettier 3 configured and passing
- ✅ Unsplash remotePatterns configured in next.config.ts
- ✅ Test page displays all brand colors and typography correctly
- ✅ Production build succeeds
- ✅ `npm run lint` passes
- ✅ `npm run format` successfully formats all files

## Self-Check

### Created Files Verification

```bash
✓ FOUND: package.json
✓ FOUND: tsconfig.json
✓ FOUND: next.config.ts
✓ FOUND: src/app/layout.tsx
✓ FOUND: src/app/page.tsx
✓ FOUND: src/app/globals.css
✓ FOUND: eslint.config.mjs
✓ FOUND: .prettierrc
✓ FOUND: .gitignore
```

### Commits Verification

```bash
✓ FOUND: 736ed63 (Task 1 - Next.js initialization)
✓ FOUND: 83a27df (Task 2 - Fonts and tooling)
```

**Self-Check: PASSED**

## Next Steps

**Plan 02:** i18n Configuration with next-intl
- Install and configure next-intl 3.x for Romanian/English bilingual support
- Create locale routing structure with [locale] dynamic segment
- Set up translation files (ro.json, en.json)
- Configure middleware for locale detection
- Update layout.tsx to use locale-specific metadata
