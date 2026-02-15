import type { Metadata } from 'next'
import {
  Poppins,
  Red_Hat_Display,
  Anton,
  Josefin_Sans,
} from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

// Josefin Sans - geometric sans-serif fallback for Glacial Indifference (not available on Google Fonts)
const josefinSans = Josefin_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-glacial',
  display: 'swap',
})

// Poppins - body text font
const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-poppins',
  display: 'swap',
})

// Red Hat Display - subheadings font
const redHatDisplay = Red_Hat_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-redhat',
  display: 'swap',
})

// Anton - secondary headlines font
const anton = Anton({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AceAgency',
  description: 'Full-service digital marketing agency in Bucharest, Romania',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${josefinSans.variable} ${poppins.variable} ${redHatDisplay.variable} ${anton.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
