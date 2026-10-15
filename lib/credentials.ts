import type { Dictionary } from '@/app/[lang]/dictionaries'

export type CredentialItem = {
  title: string
  issuer: string
  date: string
  /** miniatura en /public/credenciales (PNG/JPG) */
  image: string
  /** diploma completo en /public/credenciales (PDF o imagen) */
  file: string
}

// El JSON vacio se infiere como never[]; este cast fija la forma real de los items.
export const credentialItems = (dict: Dictionary['credentials']) => dict.items as CredentialItem[]
