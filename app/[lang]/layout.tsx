import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RainingLetters from '@/components/RainingLetters'
import NovaChat from '@/components/NovaChat'
import HtmlLang from '@/components/HtmlLang'
import { JsonLd } from '@/components/seo/JsonLd'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'
import CookieConsent from '@/components/ui/CookieConsent'
import BackToTop from '@/components/ui/BackToTop'
import StickyMobileCta from '@/components/ui/StickyMobileCta'
import { getDictionary, hasLocale, locales, type Dictionary, type Locale } from './dictionaries'

const SITE_URL = 'https://mateopavoni.com.ar'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { es: '/es', en: '/en', 'x-default': '/es' },
    },
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

// Person schema — this is a personal portfolio, not a business, so Person
// (not LocalBusiness) is the right entity. Feeds off the same dictionary
// data already shown on the page, no duplication.
function personSchema(lang: Locale, dict: Dictionary) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mateo Pavoni',
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/mateo.jpg`,
    jobTitle: 'Junior Full Stack Developer',
    worksFor: { '@type': 'Organization', name: 'AR IT Services' },
    description: dict.meta.description,
    email: 'mailto:mateopavonint905@gmail.com',
    sameAs: ['https://github.com/mateopavoni', 'https://www.linkedin.com/in/mateopavonidev'],
    knowsAbout: ['Next.js', 'TypeScript', 'React', 'Supabase', 'Node.js', 'n8n'],
  }
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      {/* ponytail: root <html> vive en app/layout.tsx, arriba del segmento [lang] — no ve params.lang.
          Setearlo via headers() forzaba render dinamico en TODO el sitio (TTFB 1.3s -> ~2s). Se
          setea client-side; el SSR inicial queda sin lang hasta hidratar, ceiling conocido. */}
      <HtmlLang lang={lang} />
      <JsonLd data={personSchema(lang, dict)} />
      {gaId && <GoogleAnalytics gaId={gaId} />}
      <RainingLetters />
      <Navbar dict={dict.nav} lang={lang} showCredentials={dict.credentials.items.length > 0} />
      {children}
      <Footer dict={dict.footer} ui={dict.ui} />
      <NovaChat dict={dict.chat} lang={lang} />
      <BackToTop label={dict.ui.back_to_top} />
      <StickyMobileCta label={dict.ui.sticky_cta} />
      {gaId && <CookieConsent dict={dict.cookies} />}
    </>
  )
}
