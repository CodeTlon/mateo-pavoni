import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const simpleIcon = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`
