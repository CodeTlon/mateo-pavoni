import type { MetadataRoute } from 'next'
import { locales } from './[lang]/dictionaries'

const baseUrl = 'https://mateopavoni.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === 'es' ? 1 : 0.9,
    alternates: {
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  }))
}
