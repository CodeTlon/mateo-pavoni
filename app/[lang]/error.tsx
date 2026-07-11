'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const copy = {
  es: {
    title: 'Algo salió mal',
    body: 'Ocurrió un error inesperado al cargar esta sección. Podés intentar de nuevo.',
    retry: 'Reintentar',
  },
  en: {
    title: 'Something went wrong',
    body: 'An unexpected error occurred while loading this section. You can try again.',
    retry: 'Try again',
  },
} as const

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/en') ? 'en' : 'es'
  const t = copy[lang]

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10 pt-28 md:pt-32 pb-16 min-h-[60vh] flex items-center justify-center">
      <div className="panel rounded-lg p-10 md:p-14 max-w-lg w-full text-center flex flex-col items-center gap-4">
        <span
          className="text-lg font-bold tracking-tighter text-primary"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          MP.DEV
        </span>
        <h1
          className="text-2xl md:text-3xl font-medium text-primary serif"
          style={{ fontFamily: 'var(--font-fraunces)' }}
        >
          {t.title}
        </h1>
        <p className="text-on-surface-variant text-sm md:text-base" style={{ fontFamily: 'var(--font-inter)' }}>
          {t.body}
        </p>
        <button
          onClick={() => reset()}
          className="mt-2 micro text-xs inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded hover:bg-secondary-container transition-colors duration-150"
        >
          {t.retry}
        </button>
      </div>
    </main>
  )
}
