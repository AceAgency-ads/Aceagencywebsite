import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['ro', 'en'],
  defaultLocale: 'ro',
  localePrefix: 'always', // Force /ro and /en in all URLs
})

// Typed navigation helpers for use in components
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
