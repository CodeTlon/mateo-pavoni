import type { Viewport } from 'next'
import { Space_Grotesk, Inter, Fraunces } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

// Editorial serif for big headlines (robbowen-style). opsz lets it scale elegantly.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: 'variable',
  axes: ['opsz'],
  style: ['normal', 'italic'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${spaceGrotesk.variable} ${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface text-on-surface min-h-screen overflow-x-hidden antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
