'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Root-level not-found: catches notFound() thrown from app/[lang]/layout.tsx
// (invalid locale segment) and any genuinely unmatched URL. Lives above the
// [lang] segment, so it can't read a dictionary — same inline-copy pattern as
// app/[lang]/error.tsx, keyed off the pathname instead of params.
const copy = {
  es: {
    eyebrow: '404',
    title: 'Página no encontrada',
    body: 'La página que buscás no existe o fue movida. Volvé al inicio para seguir explorando el portfolio.',
    cta: 'Volver al inicio',
  },
  en: {
    eyebrow: '404',
    title: 'Page not found',
    body: "The page you're looking for doesn't exist or was moved. Head back home to keep exploring the portfolio.",
    cta: 'Back to home',
  },
} as const

export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/en') ? 'en' : 'es'
  const t = copy[lang]

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="panel rounded-lg p-10 md:p-14 max-w-lg w-full text-center flex flex-col items-center gap-4">
        <span
          className="text-lg font-bold tracking-tighter text-primary"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          MP.DEV
        </span>
        <span className="micro text-[0.7rem] text-secondary-container">{t.eyebrow}</span>
        <h1
          className="text-2xl md:text-3xl font-medium text-primary serif"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          {t.title}
        </h1>
        <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
          {t.body}
        </p>
        <Link
          href={`/${lang}`}
          className="mt-2 micro text-xs inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded hover:bg-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 transition-colors duration-150"
        >
          {t.cta}
        </Link>
      </div>
    </main>
  )
}
