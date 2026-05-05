'use client'

import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'proyectos', 'experiencia', 'contacto']
      for (const id of sections.reverse()) {
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
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-primary/5">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <a
          href="#"
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

        {/* Contact CTA */}
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded hover:bg-secondary-container transition-all duration-150"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Contactar
        </a>

        {/* Mobile hamburger */}
        <button
          aria-label="Abrir menú"
          className="md:hidden text-on-surface"
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
        </div>
      )}
    </nav>
  )
}
