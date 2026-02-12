# Architecture Research: B2B Agency Website with Next.js

**Domain:** B2B Digital Agency Marketing Website
**Researched:** 2026-02-13
**Confidence:** HIGH

## Standard Architecture

### System Overview

Next.js 15 App Router follows a server-first architecture with client-side interactivity islands:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     App Router (Server Components)                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Root     │→ │ Layout   │→ │ Template │→ │ Page     │            │
│  │ Layout   │  │ (nested) │  │ (opt)    │  │ Component│            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │             │              │             │                  │
│  [Error Boundary]  [Loading]  [Not Found]  [Client Islands]        │
│       │             │              │             │                  │
├───────┴─────────────┴──────────────┴─────────────┴──────────────────┤
│                     Data & Content Layer                            │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │ MDX Content     │  │ i18n Messages   │  │ Server Actions  │     │
│  │ (Blog Posts)    │  │ (RO+EN)         │  │ (Form Handlers) │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
├─────────────────────────────────────────────────────────────────────┤
│                     Metadata & SEO Layer                            │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ generateMetadata() + JSON-LD Schema + Breadcrumbs           │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Root Layout** | Wraps entire app, contains HTML/body tags, global providers (i18n, analytics) | `app/layout.tsx` with `<html>` tag |
| **Locale Layout** | Language-specific wrapper, loads translations, sets locale context | `app/[locale]/layout.tsx` |
| **Route Group Layouts** | Shared UI for sections (e.g., marketing pages vs legal pages) | `app/(marketing)/layout.tsx` |
| **Page Components** | Individual route content, primary SEO content (server-rendered) | `app/[locale]/page.tsx` |
| **Server Actions** | Form submissions, contact form handling, server-side mutations | `app/actions/contact.ts` |
| **Client Islands** | Interactive UI only (forms, animations, tracking events) | `"use client"` components |
| **Metadata Functions** | SEO tags, OG images, schema markup, canonicals | `generateMetadata()` per route |
| **Content Collections** | Blog posts stored as MDX files with frontmatter | `content/blog/*.mdx` |
| **i18n Messages** | Translation JSON files per locale | `messages/ro.json`, `messages/en.json` |
| **Design System** | ReactBits + custom Tailwind components | `components/ui/*` |

## Recommended Project Structure

For a 15+ page B2B agency site with bilingual support, use the **`src/` folder + route groups** pattern:

```
aceagency-website/
├── public/
│   ├── fonts/                # Brand fonts
│   ├── images/               # Static images, logos
│   └── locales/              # OPTIONAL: if not using next-intl messages
├── src/
│   ├── app/
│   │   ├── [locale]/         # i18n routing segment
│   │   │   ├── (marketing)/  # Main site pages (shared header/footer)
│   │   │   │   ├── layout.tsx          # Marketing layout
│   │   │   │   ├── page.tsx            # Homepage
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── services/
│   │   │   │   │   ├── [slug]/
│   │   │   │   │   │   └── page.tsx    # Dynamic service pages
│   │   │   │   │   └── page.tsx        # Services overview
│   │   │   │   ├── portfolio/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── contact/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── faq/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [city]/             # Local SEO pages
│   │   │   │       └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── layout.tsx          # Blog-specific layout
│   │   │   │   ├── page.tsx            # Blog index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx        # Individual blog post
│   │   │   ├── (legal)/                # Legal pages (minimal layout)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── privacy/page.tsx
│   │   │   │   └── terms/page.tsx
│   │   │   ├── layout.tsx              # Locale layout (loads translations)
│   │   │   ├── not-found.tsx           # 404 page
│   │   │   └── error.tsx               # Error boundary
│   │   ├── layout.tsx                  # Root layout (HTML, GA4, fonts)
│   │   ├── globals.css                 # Tailwind imports
│   │   └── api/                        # OPTIONAL: API routes if needed
│   ├── components/
│   │   ├── ui/                         # ReactBits + custom components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/                     # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── forms/                      # Form components
│   │   │   ├── ContactForm.tsx         # Client component with validation
│   │   │   └── HoneypotField.tsx       # Hidden anti-spam field
│   │   ├── seo/                        # SEO utilities
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── JsonLd.tsx              # Schema markup component
│   │   └── blog/                       # Blog-specific components
│   │       ├── BlogCard.tsx
│   │       ├── MDXComponents.tsx
│   │       └── TableOfContents.tsx
│   ├── content/
│   │   └── blog/                       # MDX blog posts
│   │       ├── first-post.mdx
│   │       └── second-post.mdx
│   ├── messages/                       # i18n translation files
│   │   ├── en.json
│   │   └── ro.json
│   ├── lib/
│   │   ├── i18n.ts                     # i18n config (next-intl)
│   │   ├── mdx.ts                      # MDX parsing utilities
│   │   ├── analytics.ts                # GA4 event helpers
│   │   ├── metadata.ts                 # Shared metadata generation
│   │   └── schemas.ts                  # JSON-LD schema builders
│   ├── actions/
│   │   └── contact.ts                  # Server Actions for forms
│   ├── styles/
│   │   └── design-tokens.css           # Brand colors as CSS variables
│   └── types/
│       ├── blog.ts                     # Blog post types
│       └── i18n.ts                     # Locale types
├── middleware.ts                       # next-intl locale detection
├── next.config.mjs                     # Next.js config (MDX, i18n)
├── tailwind.config.ts                  # Tailwind + brand palette
├── tsconfig.json
└── package.json
```

### Structure Rationale

- **`src/` folder:** Separates app code from config files at root, industry standard for Next.js projects in 2026
- **`[locale]/` segment:** Enables URL-based i18n (`/en/about`, `/ro/despre`) with next-intl
- **Route groups:** `(marketing)` and `(legal)` organize pages without affecting URLs, enable different layouts per section
- **`components/` by type:** UI primitives, layout components, forms, SEO utilities separated for clarity
- **`content/` for MDX:** Keeps blog content separate from routing logic, easier to manage
- **`messages/` for i18n:** JSON files per locale, standard next-intl pattern
- **`lib/` for utilities:** Reusable helpers, keeps page components clean
- **`actions/` for Server Actions:** Form handlers, mutations, clearly separated from components

## Architectural Patterns

### Pattern 1: Server-First with Client Islands

**What:** Render all content server-side by default, sprinkle in small "use client" components only for interactivity.

**When to use:** Always, especially for SEO-critical B2B sites. Server Components are the Next.js 15 default.

**Trade-offs:**
- **Pros:** Better SEO (Googlebot sees full content), faster initial load, smaller JS bundles, zero hydration delay for static content
- **Cons:** Client components can't access server-only APIs, requires careful boundary placement

**Example:**
```typescript
// app/[locale]/contact/page.tsx (SERVER COMPONENT)
import { ContactForm } from '@/components/forms/ContactForm'
import { generateMetadata } from '@/lib/metadata'

export const metadata = generateMetadata({
  title: 'Contact Us',
  description: 'Get in touch with AceAgency',
})

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      {/* Server-rendered static content */}
      <p>We'd love to hear from you...</p>

      {/* Client island for interactivity */}
      <ContactForm />
    </main>
  )
}

// components/forms/ContactForm.tsx (CLIENT COMPONENT)
'use client'

import { useFormState } from 'react-dom'
import { submitContactForm } from '@/actions/contact'

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, null)

  return <form action={formAction}>...</form>
}
```

### Pattern 2: Route Group Layouts for Shared UI

**What:** Use `(groupName)` folders to organize routes and apply different layouts without changing URLs.

**When to use:** When different page sections need different UI wrappers (e.g., marketing pages with full header/footer vs legal pages with minimal layout).

**Trade-offs:**
- **Pros:** Clean separation, layout state preserved on navigation, avoids duplicate layout code
- **Cons:** Adds folder depth, can be confusing for developers unfamiliar with the pattern

**Example:**
```
app/[locale]/
├── (marketing)/
│   ├── layout.tsx        # Full header/footer, navigation
│   ├── page.tsx          # Homepage at /
│   └── about/page.tsx    # /about
└── (legal)/
    ├── layout.tsx        # Minimal header, just logo
    ├── privacy/page.tsx  # /privacy
    └── terms/page.tsx    # /terms
```

```typescript
// app/[locale]/(marketing)/layout.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function MarketingLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

// app/[locale]/(legal)/layout.tsx
export default function LegalLayout({ children }) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      {children}
    </div>
  )
}
```

### Pattern 3: next-intl for i18n Architecture

**What:** Use next-intl library with `[locale]` dynamic segment for URL-based internationalization.

**When to use:** Multi-language sites requiring SEO-friendly localized URLs, server-side translation loading, automatic locale detection.

**Trade-offs:**
- **Pros:** Best-in-class Next.js i18n solution, server-side message loading (fast), automatic locale routing, TypeScript support
- **Cons:** Requires middleware for locale detection, adds complexity vs monolingual site

**Example:**
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ro'],
  defaultLocale: 'ro',
  localePrefix: 'always' // /en/about, /ro/despre
})

// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function LocaleLayout({ children, params }) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

// Usage in components
import { useTranslations } from 'next-intl'

function Header() {
  const t = useTranslations('Navigation')
  return <nav>{t('home')}</nav>
}
```

### Pattern 4: MDX Content Collections for Blog

**What:** Store blog posts as `.mdx` files in a `content/` directory with frontmatter metadata, use helper functions to load and parse them.

**When to use:** Content-heavy sites with technical blog posts, when you want React components in markdown, Git-based content workflow.

**Trade-offs:**
- **Pros:** Version control for content, React components in posts, no CMS complexity, developer-friendly
- **Cons:** Non-technical editors can't easily contribute, requires build-time parsing, no admin UI

**Example:**
```typescript
// content/blog/seo-tips.mdx
---
title: "10 SEO Tips for 2026"
publishedAt: "2026-02-10"
summary: "Boost your rankings with these proven strategies"
tags: ["SEO", "Marketing"]
---

# SEO Tips

Here's what you need to know...

<CTAButton href="/contact">Get Started</CTAButton>

// lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: filename.replace(/\.mdx$/, ''),
      metadata: data,
      content,
    }
  })
}

// app/[locale]/blog/[slug]/page.tsx
import { getBlogPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default function BlogPost({ params }) {
  const post = getBlogPosts().find(p => p.slug === params.slug)
  return <MDXRemote source={post.content} />
}
```

### Pattern 5: Server Actions for Form Handling

**What:** Use Next.js Server Actions with `useFormState` for form submissions, server-side validation with Zod, return errors to client.

**When to use:** Contact forms, newsletter signups, any user input that needs server processing.

**Trade-offs:**
- **Pros:** No API route needed, automatic form state management, progressive enhancement, type-safe
- **Cons:** Requires React 19+ features, learning curve for devs used to API routes

**Example:**
```typescript
// actions/contact.ts (Server Action)
'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().max(0), // Anti-spam: must be empty
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    honeypot: formData.get('website'), // Hidden field
  }

  // Validate
  const result = contactSchema.safeParse(rawData)
  if (!result.success) {
    return { error: 'Invalid input', fields: result.error.flatten() }
  }

  // Check honeypot
  if (result.data.honeypot !== '') {
    return { error: 'Spam detected' }
  }

  // Process form (send email, save to DB, etc.)
  await sendEmail(result.data)

  return { success: true }
}

// components/forms/ContactForm.tsx
'use client'

import { useFormState } from 'react-dom'
import { submitContactForm } from '@/actions/contact'
import { HoneypotField } from './HoneypotField'

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, null)

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <HoneypotField />

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">Message sent!</p>}

      <button type="submit">Submit</button>
    </form>
  )
}

// components/forms/HoneypotField.tsx
export function HoneypotField() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      className="absolute -left-[9999px]"
      aria-hidden="true"
    />
  )
}
```

### Pattern 6: Metadata API for SEO

**What:** Use Next.js `generateMetadata()` function to create page-specific SEO tags, combine with JSON-LD schema markup for rich results.

**When to use:** Every page. SEO is non-negotiable for B2B agency sites.

**Trade-offs:**
- **Pros:** Type-safe metadata, automatic deduplication, server-rendered (good for SEO), supports dynamic metadata
- **Cons:** Requires separate function per page, schema markup is verbose

**Example:**
```typescript
// lib/metadata.ts
import type { Metadata } from 'next'

export function generateMetadata({
  title,
  description,
  path,
  locale = 'ro',
  ogImage,
}: {
  title: string
  description: string
  path: string
  locale?: 'ro' | 'en'
  ogImage?: string
}): Metadata {
  const baseUrl = 'https://aceagency.ro'
  const url = `${baseUrl}/${locale}${path}`

  return {
    title: `${title} | AceAgency`,
    description,
    alternates: {
      canonical: url,
      languages: {
        ro: `${baseUrl}/ro${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AceAgency',
      images: ogImage ? [{ url: ogImage }] : [],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

// app/[locale]/about/page.tsx
import { generateMetadata as genMeta } from '@/lib/metadata'
import { JsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata({ params }) {
  return genMeta({
    title: 'About Us',
    description: 'Learn about AceAgency',
    path: '/about',
    locale: params.locale,
  })
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@type': 'Organization',
          name: 'AceAgency',
          url: 'https://aceagency.ro',
          logo: 'https://aceagency.ro/logo.png',
        }}
      />
      <main>...</main>
    </>
  )
}

// components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          ...data,
        }),
      }}
    />
  )
}
```

### Pattern 7: Tailwind + ReactBits Design System

**What:** Use Tailwind CSS for utility-first styling with brand colors as CSS variables, integrate ReactBits components via copy-paste (not npm).

**When to use:** Agency sites needing custom brand identity with modern, animated UI components.

**Trade-offs:**
- **Pros:** Full control over component code, no library bloat, easy customization, brand-specific palette
- **Cons:** Manual updates to ReactBits components, more code to maintain vs npm dependency

**Example:**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'electric-violet': 'var(--electric-violet)',
        'burgundy': 'var(--burgundy)',
        'electric-mint': 'var(--electric-mint)',
        'cobalt-blue': 'var(--cobalt-blue)',
      },
    },
  },
} satisfies Config

// src/styles/design-tokens.css
:root {
  --electric-violet: #8B00FF;
  --burgundy: #800020;
  --electric-mint: #00FFA6;
  --cobalt-blue: #0047AB;
}

// components/ui/button.tsx (ReactBits component, customized)
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-electric-violet text-white hover:opacity-90',
        secondary: 'bg-burgundy text-white hover:opacity-90',
        outline: 'border-2 border-electric-violet text-electric-violet hover:bg-electric-violet hover:text-white',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6',
        lg: 'h-13 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}
```

## Data Flow

### Request Flow (Server Components)

```
Browser Request
    ↓
Middleware (locale detection) → Redirects to /ro/* or /en/*
    ↓
App Router matches /[locale]/about → app/[locale]/about/page.tsx
    ↓
React renders Server Component tree:
    Root Layout (HTML, fonts, GA4)
        ↓
    Locale Layout (loads messages/ro.json)
        ↓
    Route Group Layout (Header, Footer)
        ↓
    Page Component (about page content)
        ↓
    generateMetadata() runs → SEO tags generated
    ↓
Complete HTML sent to browser (no hydration for static content)
    ↓
Client JS loads only for interactive islands ("use client" components)
```

### Form Submission Flow (Server Actions)

```
User fills form → clicks Submit
    ↓
Browser sends FormData to Server Action (actions/contact.ts)
    ↓
Server validates with Zod
    ↓
Server checks honeypot field (anti-spam)
    ↓
If valid: Server processes (send email, track GA4 event)
    ↓
Server returns { success: true } or { error: '...' }
    ↓
useFormState updates component state
    ↓
Success/error message shows to user
```

### Blog Content Flow

```
Build time:
    getBlogPosts() reads content/blog/*.mdx
        ↓
    gray-matter parses frontmatter (metadata)
        ↓
    generateStaticParams() creates routes for each post
        ↓
    MDX compiled to React components
        ↓
    Static HTML generated for each blog post

Runtime:
    User visits /blog/seo-tips
        ↓
    Pre-rendered HTML served instantly
        ↓
    Client JS hydrates interactive MDX components (if any)
```

### i18n Translation Flow

```
Request: /ro/despre
    ↓
Middleware detects locale = 'ro'
    ↓
Locale Layout loads messages/ro.json server-side
    ↓
NextIntlClientProvider passes messages to client
    ↓
Components call useTranslations('Navigation') → gets Romanian strings
    ↓
Page renders with localized content
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Using Client Components for Static Content

**What people do:** Add `"use client"` to page components to use hooks, even when content is static.

**Why it's wrong:** Breaks SEO (Googlebot must execute JS), increases bundle size, slower initial render, loses server-side caching benefits.

**Do this instead:** Keep pages as Server Components, move interactive parts to small Client Components. Use Server Actions for data mutations instead of useState.

**Example:**
```typescript
// BAD
'use client'
export default function AboutPage() {
  return <h1>About Us</h1> // No interactivity, shouldn't be client
}

// GOOD
export default function AboutPage() {
  return (
    <>
      <h1>About Us</h1>
      <ContactForm /> {/* Only form is client component */}
    </>
  )
}
```

### Anti-Pattern 2: Per-Page i18n Files

**What people do:** Create separate translation files for each page (about.en.json, about.ro.json, services.en.json...).

**Why it's wrong:** Fragmentation, duplication (shared strings like "Contact Us" repeated), hard to maintain consistency, loading overhead.

**Do this instead:** Use namespaced messages in single locale files. next-intl supports nested keys.

**Example:**
```json
// BAD: about.en.json, services.en.json, contact.en.json

// GOOD: messages/en.json
{
  "Navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact Us"
  },
  "AboutPage": {
    "title": "About AceAgency",
    "description": "We are a digital agency..."
  },
  "ServicesPage": {
    "title": "Our Services"
  }
}
```

### Anti-Pattern 3: Inline Metadata in Pages

**What people do:** Define metadata objects directly in page files, duplicating logic across pages.

**Why it's wrong:** Inconsistent metadata structure, missing canonical URLs, no automatic locale alternates, hard to maintain brand consistency.

**Do this instead:** Use shared metadata generator function in `lib/metadata.ts` that enforces consistent structure, handles canonical URLs, OG tags, locale alternates automatically.

### Anti-Pattern 4: API Routes for Forms

**What people do:** Create `/api/contact` route, submit form via fetch, manage loading state manually.

**Why it's wrong:** More boilerplate, no progressive enhancement (breaks without JS), requires manual state management, CSRF considerations.

**Do this instead:** Use Server Actions with `useFormState`. Works without JS (progressive enhancement), automatic state management, no CSRF issues.

### Anti-Pattern 5: CMS for Simple Blog

**What people do:** Integrate headless CMS (Contentful, Sanity) for a basic blog with 10-20 posts.

**Why it's wrong:** Over-engineering, adds build complexity, API dependencies, potential costs, slower builds, security surface.

**Do this instead:** Use MDX files in `content/` directory for blogs with <50 posts, developer-authored content, technical audience. Only use CMS if non-technical editors need to publish frequently.

### Anti-Pattern 6: Global CSS for Brand Colors

**What people do:** Define brand colors directly in Tailwind config as hex values.

**Why it's wrong:** Can't change at runtime, no theme switching capability, harder to maintain if palette evolves.

**Do this instead:** Use CSS variables for colors, reference them in Tailwind. Enables runtime theming, easier brand updates.

```typescript
// BAD
export default {
  theme: {
    extend: {
      colors: {
        primary: '#8B00FF',
        secondary: '#800020',
      },
    },
  },
}

// GOOD
export default {
  theme: {
    extend: {
      colors: {
        'electric-violet': 'var(--electric-violet)',
        'burgundy': 'var(--burgundy)',
      },
    },
  },
}
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Google Analytics 4** | `@next/third-parties/google` in root layout | Use `<GoogleAnalytics gaId="G-XXX" />`, track events with `sendGAEvent()` in client components |
| **Email Provider** (Resend, SendGrid) | Server Action calls API in `actions/contact.ts` | Keep API keys in `.env.local`, validate inputs with Zod |
| **ReactBits Components** | Copy-paste individual components into `components/ui/` | Not an npm package, customizable, use `class-variance-authority` for variants |
| **MDX Compiler** | `next-mdx-remote` for rendering MDX in pages | Install: `npm i next-mdx-remote gray-matter` |
| **i18n Library** | `next-intl` with middleware | Best Next.js i18n solution in 2026 |
| **Form Validation** | Zod in Server Actions | `npm i zod`, validate server-side, return errors to client |
| **Deployment** | Vercel (recommended) or Netlify | Vercel optimized for Next.js, automatic edge deployment, zero config |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Page ↔ Server Action** | FormData via form action prop | Server Action receives FormData, returns serializable object |
| **Server Component ↔ Client Component** | Props (must be serializable) | Can't pass functions or class instances, only JSON-serializable data |
| **Layout ↔ Page** | Nested rendering | Layout wraps page, can pass data via React Context (client) or direct props (server) |
| **MDX ↔ React Components** | Import components in MDX | Define allowed components in MDXRemote `components` prop |
| **Metadata Function ↔ Page** | Separate functions in same file | `generateMetadata()` runs before page render, can access params/searchParams |
| **Locale Layout ↔ Messages** | next-intl server-side loading | `getMessages()` loads JSON server-side, passed to client provider |

## Build Order & Dependencies

For roadmap planning, here's the recommended component build order:

### Phase 1: Foundation (Build First)
**Dependencies:** None
**Components:**
- Next.js project setup with TypeScript
- Tailwind CSS configuration with brand colors
- Root layout (HTML, fonts, GA4)
- Design token CSS variables
- Base ReactBits components (Button, Card)

**Why first:** Everything depends on this infrastructure.

### Phase 2: i18n Infrastructure
**Dependencies:** Phase 1
**Components:**
- next-intl middleware
- Locale layout with message loading
- Translation JSON files (en.json, ro.json)
- Language switcher component

**Why second:** Affects routing structure, must be in place before building pages.

### Phase 3: Layout Components
**Dependencies:** Phase 1, Phase 2
**Components:**
- Header with navigation
- Footer
- Route group layouts (marketing, legal)

**Why third:** Shared by all pages, needed before page development.

### Phase 4: SEO Foundation
**Dependencies:** Phase 1
**Components:**
- Metadata generator utility
- JSON-LD schema components
- Breadcrumbs component
- Sitemap generation

**Why fourth:** Each page will use these, better to build once.

### Phase 5: Core Pages (Parallel Development)
**Dependencies:** Phase 1, 2, 3, 4
**Components:**
- Homepage
- About page
- Services overview
- Service detail pages (dynamic routes)
- Portfolio page
- FAQ page

**Why fifth:** Main content, can be built in parallel once infrastructure ready.

### Phase 6: Forms & Server Actions
**Dependencies:** Phase 1, 2
**Components:**
- Contact form component
- Honeypot field
- Server Action for form submission
- Email integration (Resend/SendGrid)
- GA4 event tracking for form submissions

**Why sixth:** Depends on analytics (Phase 1) and i18n (Phase 2) for error messages.

### Phase 7: Blog System
**Dependencies:** Phase 1, 2, 3, 4
**Components:**
- MDX parsing utilities
- Blog layout
- Blog index page
- Blog post template page
- MDX custom components
- Blog card components

**Why seventh:** Self-contained feature, doesn't block other pages.

### Phase 8: Secondary Pages
**Dependencies:** Phase 1, 2, 3, 4
**Components:**
- Local SEO pages (city-specific)
- Legal pages (privacy, terms)
- 404 page
- Error boundary

**Why eighth:** Lower priority, can be last.

## Scaling Considerations

| Concern | At Launch (Day 1) | At 1K visitors/month | At 10K+ visitors/month |
|---------|-------------------|----------------------|------------------------|
| **Rendering** | SSG for all pages (pre-rendered at build) | SSG for marketing pages, ISR for blog (revalidate every 1 hour) | Add edge caching, consider PPR (Partial Prerendering) for dynamic sections |
| **Analytics** | Basic GA4 pageviews | GA4 events for key actions (form submits, CTA clicks) | Server-side analytics + client-side, consider PostHog for session replay |
| **Forms** | Single contact form, email notifications | Add rate limiting to Server Actions (10 req/min per IP) | Implement CAPTCHA (hCaptcha) if spam increases, use queue for email sending |
| **i18n** | 2 locales (RO, EN) | Same, monitor analytics for locale usage | Add more locales if international traffic grows, consider locale-specific hosting |
| **Blog** | Static MDX files | Same, up to ~100 posts | Consider CMS if non-devs need to publish, or keep MDX with Git UI (Forestry, Tina) |
| **Images** | Next.js Image component with automatic optimization | Same, ensure WebP/AVIF formats | Add Cloudinary/Imgix CDN if many high-res images, implement lazy loading offscreen images |
| **Deployment** | Vercel Hobby plan (free) | Vercel Pro ($20/mo) for better performance guarantees | Monitor ISR cache hit rates, consider dedicated edge workers for API routes |

**Key Scaling Insight:** B2B agency sites rarely exceed 10K visitors/month. The architecture described handles 100K+ visitors without changes. Premature optimization wastes time — focus on content quality and SEO over infrastructure.

## Sources

**Official Documentation:**
- [Next.js 15 App Router Official Docs](https://nextjs.org/docs/app)
- [Next.js Project Structure Guide](https://nextjs.org/docs/app/getting-started/project-structure)
- [next-intl Official Documentation](https://next-intl.dev/docs/getting-started/app-router)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Next.js Forms Guide](https://nextjs.org/docs/app/guides/forms)

**Architecture Patterns (2026):**
- [Next.js Architecture in 2026 — Server-First, Client-Islands, and Scalable App Router Patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js 15 Advanced Patterns: App Router, Server Actions, and Caching Strategies](https://johal.in/next-js-15-advanced-patterns-app-router-server-actions-and-caching-strategies-for-2026/)
- [The Battle-Tested NextJS Project Structure](https://medium.com/@burpdeepak96/the-battle-tested-nextjs-project-structure-i-use-in-2025-f84c4eb5f426)

**i18n Architecture:**
- [next-intl Design Principles](https://next-intl.dev/docs/design-principles)
- [Complete Guide to Internationalization in Next.js](https://blog.logrocket.com/complete-guide-internationalization-nextjs/)

**Form Handling & Security:**
- [Next.js Server Actions: The Complete Guide (2026)](https://makerkit.dev/blog/tutorials/nextjs-server-actions)
- [Form Honeypot Implementation Guide](https://formshield.dev/blog/form-honeypot-implementation-guide)
- [Building Secure Contact Forms in Next.js](https://arnab-k.medium.com/building-secure-and-resilient-contact-forms-in-next-js-450cbb437e68)

**SEO Architecture:**
- [Next.js SEO Optimization Guide (2026 Edition)](https://www.djamware.com/post/697a19b07c935b6bb054313e/next-js-seo-optimization-guide--2026-edition)
- [Complete Guide to SEO Optimization in Next.js 15](https://medium.com/@thomasaugot/the-complete-guide-to-seo-optimization-in-next-js-15-1bdb118cffd7)
- [SEO Schema Types and Metadata with Next.js](https://www.sanity.io/learn/course/seo-optimization/seo-schema-types-and-metadata)

**Design System:**
- [ReactBits Official Documentation](https://reactbits.dev/get-started/introduction)
- [Creating a Design System in Next.js with Tailwind CSS and CVA](https://www.freecodecamp.org/news/how-a-design-system-in-next-js-with-tailwind-css-and-class-variance-authority/)
- [Modern CSS Architecture with Tailwind CSS and Next.js](https://vladimirsiedykh.com/blog/modern-css-architecture-tailwind-nextjs)

**Blog Architecture:**
- [Building a blog with Next.js App Router and MDX](https://www.alexchantastic.com/building-next-and-mdx)
- [MDX in Next.js: A Practical Production Guide](https://thelinuxcode.com/mdx-in-nextjs-a-practical-production-guide/)

**Analytics & Deployment:**
- [Google Analytics (GA4) Implementation Guide for Next.js](https://medium.com/@aashari/google-analytics-ga4-implementation-guide-for-next-js-16-a7bbf267dbaa)
- [Next.js on Vercel Official Docs](https://vercel.com/docs/frameworks/full-stack/nextjs)

---

*Architecture research for: B2B Agency Website (AceAgency)*
*Researched: 2026-02-13*
*Confidence: HIGH (verified with official docs, current community patterns, production examples)*
