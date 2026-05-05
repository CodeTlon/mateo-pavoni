'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type NavDict = Dictionary['nav']

const sectionIds = ['about', 'proyectos', 'experiencia', 'contacto'] as const

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-6 h-6" />
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="text-on-surface-variant hover:text-secondary-container transition-colors"
    >
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function LangSwitcher({ lang }: { lang: string }) {
  const router = useRouter()
  const other = lang === 'es' ? 'en' : 'es'
  return (
    <button
      onClick={() => router.push(`/${other}`)}
      className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-secondary-container transition-colors border border-outline-variant rounded px-2 py-1"
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      {other}
    </button>
  )
}

export default function Navbar({ dict, lang }: { dict: NavDict; lang: string }) {
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: dict.about, href: '#about' },
    { label: dict.projects, href: '#proyectos' },
    { label: dict.experience, href: '#experiencia' },
    { label: dict.contact, href: '#contacto' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/5">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <a
          href={`/${lang}`}
          className="text-lg font-bold tracking-tighter text-primary"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          MP.DEV
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`nav-link text-sm font-medium tracking-tight ${
                active === href.slice(1) ? 'active text-secondary-container' : 'text-on-surface-variant'
              }`}
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <LangSwitcher lang={lang} />
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-secondary-container transition-all duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {dict.cta}
          </a>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <LangSwitcher lang={lang} />
          <button
            aria-label="Abrir menú"
            className="text-on-surface"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-primary/5 px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-on-surface-variant hover:text-secondary-container transition-colors"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:bg-secondary-container transition-all duration-150 mt-2"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {dict.cta}
          </a>
        </div>
      )}
    </nav>
  )
}
