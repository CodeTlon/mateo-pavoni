'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionKicker from '@/components/SectionKicker'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type ProjectsDict = Dictionary['projects']

type ProjectBase = {
  id: string
  dictKey: keyof ProjectsDict['items']
  name?: string
  accentColor: string
  bgColor: string
  url: string
  screenshot?: string
  wip?: boolean
  priority?: boolean
}

const projectBases: ProjectBase[] = [
  {
    id: 'marcovich',
    dictKey: 'marcovich',
    name: 'Marcovich Barbería',
    accentColor: '#C8A97E',
    bgColor: '#1a1a1a',
    url: 'https://marcovichbarber.com.ar/',
    screenshot: '/marcovich-preview.png',
    priority: true,
  },
  {
    id: 'codetlon',
    dictKey: 'codetlon',
    name: 'CodeTlon',
    accentColor: '#ffb690',
    bgColor: '#0e1516',
    url: 'https://codetlon.com',
    screenshot: '/codetlon.png',
    priority: true,
  },
  {
    id: 'gc2',
    dictKey: 'gc2',
    name: 'GC² Entrenamiento',
    accentColor: '#38bdf8',
    bgColor: '#0a1628',
    url: 'https://gc2entrenamientoderesistencia.com.ar',
    screenshot: '/gc2.png',
  },
  {
    id: 'chronoflow',
    dictKey: 'chronoflow',
    name: 'ChronoFlow',
    accentColor: '#8b5cf6',
    bgColor: '#0f0a1a',
    url: 'https://chronoflow.mateopavoni.com.ar',
    screenshot: '/chronoflow.png',
  },
  {
    id: 'tutienda',
    dictKey: 'tutienda',
    name: 'TuTienda',
    accentColor: '#1B03EA',
    bgColor: '#111111',
    url: 'https://tutienda.mateopavoni.com.ar',
    screenshot: '/tutienda.png',
  },
  {
    id: 'inglobal',
    dictKey: 'inglobal',
    name: 'Grúas InGlobal',
    accentColor: '#f5a524',
    bgColor: '#18181b',
    url: 'https://gruasinglobal.com',
    screenshot: '/inglobal.png',
  },
  {
    id: 'chaos-playground',
    dictKey: 'chaos_playground',
    name: 'Chaos Playground',
    accentColor: '#ff5c5c',
    bgColor: '#f5f5f7',
    url: 'https://chaos-playground.mateopavoni.com.ar/',
    screenshot: '/chaos-playground.png',
  },
  {
    id: 'clubcore',
    dictKey: 'clubcore',
    name: 'ClubCore',
    accentColor: '#22c55e',
    bgColor: '#0f172a',
    url: 'https://api.clubcore.mateopavoni.com.ar/swagger-ui.html',
  },
  {
    id: 'coming-soon',
    dictKey: 'coming_soon',
    accentColor: '#2563eb',
    bgColor: '#f0edef',
    url: '#contacto',
    screenshot: '/vimet-desarollo.png',
    wip: true,
    priority: true,
  },
]

const THINKING_MS = 700
const TYPE_SPEED_MS = 20
const REVEAL_INTERVAL_MS = 350

type Phase = 'idle' | 'thinking' | 'active'

export default function ProjectsGrid({ dict }: { dict: ProjectsDict }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [typedLen, setTypedLen] = useState(0)
  const [revealCount, setRevealCount] = useState(0)

  const projects = projectBases.map((base) => {
    const item = dict.items[base.dictKey]
    return {
      ...base,
      name: base.name ?? ('name' in item ? item.name : base.id),
      description: item.description,
    }
  })

  const introLen = dict.nova_intro.length
  const typingDone = typedLen >= introLen

  const reducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function start() {
    if (reducedMotion()) {
      setTypedLen(introLen)
      setRevealCount(projects.length)
      setPhase('active')
      return
    }
    setPhase('thinking')
  }

  // thinking -> active (typewriter starts)
  useEffect(() => {
    if (phase !== 'thinking') return
    const t = setTimeout(() => setPhase('active'), THINKING_MS)
    return () => clearTimeout(t)
  }, [phase])

  // active: typewriter first, then staggered project reveal
  useEffect(() => {
    if (phase !== 'active') return
    if (!typingDone) {
      const t = setTimeout(() => setTypedLen((n) => n + 1), TYPE_SPEED_MS)
      return () => clearTimeout(t)
    }
    if (revealCount < projects.length) {
      const t = setTimeout(() => setRevealCount((n) => n + 1), REVEAL_INTERVAL_MS)
      return () => clearTimeout(t)
    }
  }, [phase, typingDone, typedLen, revealCount, projects.length])

  return (
    <section id="proyectos" className="reveal py-20 md:py-28">
      <SectionKicker index="02" label={dict.heading} />

      {phase === 'idle' && (
        <button
          type="button"
          onClick={start}
          className="micro relative text-xs bg-primary text-on-primary px-5 py-3.5 rounded-full shadow-lg hover:bg-secondary-container hover:scale-105 transition-[background-color,transform] duration-200"
        >
          {dict.nova_cta}
        </button>
      )}

      {phase !== 'idle' && (
        <div className="rise flex items-start gap-3 mb-12 md:mb-16">
          <span className="serif text-lg text-secondary-container leading-none shrink-0">Nova</span>
          <p className="text-base text-on-surface-variant leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            {phase === 'thinking' ? (
              <span className="inline-flex gap-1 py-1">
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-current opacity-60 inline-block" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-current opacity-60 inline-block" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-current opacity-60 inline-block" />
              </span>
            ) : (
              dict.nova_intro.slice(0, typedLen)
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col">
        {projects.slice(0, revealCount).map((project, i) => {
          const external = project.url.startsWith('http')
          const hasScreenshot = Boolean(project.screenshot)
          return (
            <article
              key={project.id}
              className="rise group grid md:grid-cols-12 gap-6 md:gap-12 items-center py-12 md:py-16 border-t hairline first:border-t-0"
            >
              {hasScreenshot && (
                <a
                  href={project.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={`Ver ${project.name}`}
                  className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  <div
                    className="panel shot relative aspect-[1920/1040] rounded overflow-hidden"
                    style={{ background: project.bgColor }}
                  >
                    <Image
                      src={project.screenshot as string}
                      alt={`Captura de ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      priority={project.priority}
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                        project.wip ? 'blur-[4px] opacity-70' : ''
                      }`}
                    />
                  </div>
                </a>
              )}

              <div
                className={`flex flex-col gap-4 ${hasScreenshot ? 'md:col-span-5' : 'md:col-span-12'} ${
                  hasScreenshot && i % 2 === 1 ? 'md:order-1' : ''
                }`}
              >
                <span className="micro text-[0.7rem] text-secondary-container">
                  {String(i + 1).padStart(2, '0')}
                  {project.wip ? ` · ${dict.wip_label}` : ''}
                </span>

                <h3 className="serif text-3xl md:text-4xl text-primary leading-tight">
                  {project.name}
                </h3>

                <p
                  className="text-base text-on-surface-variant leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {project.description}
                </p>

                <a
                  href={project.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="micro text-xs edit-link text-primary hover:text-secondary-container inline-flex items-center gap-2 w-max mt-1"
                >
                  {external ? 'Ver proyecto' : 'Hablemos'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
