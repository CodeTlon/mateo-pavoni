import type { Dictionary } from '@/app/[lang]/dictionaries'

export type CredentialItem = {
  title: string
  issuer: string
  /** fecha de expedicion ya formateada para el idioma (ej. "Ago 2026") */
  date: string
  /** link de verificacion (Credly, Udemy, Coderhouse...). Sin url, la fila no es link. */
  url?: string
}

// El JSON vacio se infiere como never[]; este cast fija la forma real de los items.
export const credentialItems = (dict: Dictionary['credentials']) => dict.items as CredentialItem[]
