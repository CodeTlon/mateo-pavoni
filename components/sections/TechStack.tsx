'use client'

import { useState } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type TechDict = Dictionary['tech']

type Tech = {
  name: string
  src?: string
  abbr?: string
}

type Category = {
  label: string
  items: Tech[]
}

const cdn = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`

const categories: Category[] = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js',    src: cdn('nextdotjs',   'ffffff') },
      { name: 'TypeScript', src: cdn('typescript',  '3178c6') },
      { name: 'Tailwind',   src: cdn('tailwindcss', '06b6d4') },
      { name: 'Sass',       src: cdn('sass',        'cc6699') },
      { name: 'Bootstrap',  src: cdn('bootstrap',   '7952b3') },
      { name: 'Vercel',     src: cdn('vercel',      'ffffff') },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js',    src: cdn('nodedotjs', '339933') },
      { name: 'Supabase',   src: cdn('supabase',  '3fcf8e') },
      { name: '.NET Core',  src: cdn('dotnet',    '512bd4') },
      { name: 'PHP',        src: cdn('php',       '777bb4') },
      { name: 'MySQL',      src: cdn('mysql',     '4479a1') },
      { name: 'MongoDB',    src: cdn('mongodb',   '47a248') },
      { name: 'SQL Server', src: '/sql-server.svg' },
      { name: 'Resend',     src: '/resend.svg' },
    ],
  },
  {
    label: 'Infra',
    items: [
      { name: 'Docker',     src: cdn('docker',     '2496ed') },
      { name: 'Cloudflare', src: cdn('cloudflare', 'f38020') },
      { name: 'Linux',      src: cdn('linux',      'fcc624') },
      { name: 'Coolify',    src: '/coolify.svg' },
    ],
  },
  {
    label: 'IA & Auto',
    items: [
      { name: 'n8n',          src: cdn('n8n',         'ea4b71') },
      { name: 'Meta API',     src: cdn('meta',        '0082fb') },
      { name: 'Google Cloud', src: cdn('googlecloud', '4285f4') },
      { name: 'Claude',       src: '/claude.svg' },
    ],
  },
]

export default function TechStack({ dict }: { dict: TechDict }) {
  const [active, setActive] = useState(0)
  const current = categories[active]

  return (
    <aside className="bento-card col-span-1 md:col-span-4 bg-primary-container rounded-lg p-5 sm:p-6 md:p-8 flex flex-col">
      <h2
        className="text-xl font-semibold text-surface-container-lowest flex items-center gap-2 mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-container shrink-0">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        {dict.heading}
      </h2>

      {/* Category tabs */}
      <div className="flex gap-1 mb-5 flex-wrap border-b border-white/10 pb-3">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActive(i)}
            className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded transition-all duration-150 ${
              i === active
                ? 'text-secondary-container bg-white/10'
                : 'text-on-primary-container hover:text-secondary-container'
            }`}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Icons grid */}
      <div className="grid grid-cols-3 gap-3 flex-1 content-start">
        {current.items.map(({ name, src, abbr }) => (
          <div key={name} className="tech-item flex flex-col items-center gap-1.5 group cursor-default">
            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={name} width={24} height={24} className="w-6 h-6 object-contain" />
              ) : (
                <span
                  className="text-xs font-bold text-secondary-container"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {abbr}
                </span>
              )}
            </div>
            <span
              className="text-xs text-on-primary-container text-center leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </aside>
  )
}
