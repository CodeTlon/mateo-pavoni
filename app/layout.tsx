import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Mateo Pavoni - Full Stack Developer',
  description:
    'Portfolio de Mateo Pavoni - desarrollador full stack y fundador de CodeTlon. Especializado en Next.js, TypeScript y Supabase.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Mateo Pavoni - Full Stack Developer',
    description:
      'Desarrollador full stack especializado en Next.js, TypeScript y Supabase. Fundador de CodeTlon Software Factory.',
    type: 'website',
    locale: 'es_AR',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-surface text-on-surface min-h-screen bg-grain antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
