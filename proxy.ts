import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['es', 'en'] as const
type Locale = (typeof locales)[number]

const defaultLocale: Locale = 'es'

function getPreferredLocale(request: NextRequest): Locale {
  const acceptLang = request.headers.get('accept-language') ?? ''
  for (const part of acceptLang.split(',')) {
    const lang = part.split(';')[0]?.trim().split('-')[0]?.toLowerCase()
    if (lang && (locales as readonly string[]).includes(lang)) {
      return lang as Locale
    }
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = (locales as readonly string[]).some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  if (hasLocale) return
  const locale = getPreferredLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)', '/'],
}
