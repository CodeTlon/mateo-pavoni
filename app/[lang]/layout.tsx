import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RainingLetters from '@/components/RainingLetters'
import NovaChat from '@/components/NovaChat'
import { getDictionary, hasLocale, locales } from './dictionaries'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    metadataBase: new URL('https://mateopavoni.com.ar'),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: `/${lang}` },
    icons: {
      icon: [
        { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
        { url: '/favicon-dark.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      ],
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.og_description,
      url: `/${lang}`,
      siteName: 'Mateo Pavoni',
      type: 'website',
      locale: lang === 'es' ? 'es_AR' : 'en_US',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: dict.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.og_description,
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <RainingLetters />
      <Navbar dict={dict.nav} lang={lang} />
      {children}
      <Footer dict={dict.footer} />
      <NovaChat dict={dict.chat} lang={lang} />
    </>
  )
}
