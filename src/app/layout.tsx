import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AceAgency',
  description: 'Full-service digital marketing agency in Bucharest, Romania',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="antialiased">{children}</body>
    </html>
  )
}
