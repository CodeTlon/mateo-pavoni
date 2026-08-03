'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import SectionKicker from '@/components/SectionKicker'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type ProjectsDict = Dictionary['projects']

type ProjectBase = {
  id: string
  dictKey: keyof ProjectsDict['items']
  name?: string
  tags: string[]
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
    tags: ['Next.js 14', 'Supabase', 'TypeScript', 'n8n', 'Docker'],
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
    tags: ['Next.js 14', 'TypeScript', 'Tailwind', 'Resend'],
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
    tags: ['Next.js 16', 'Supabase', 'CMS', 'TypeScript'],
    accentColor: '#38bdf8',
    bgColor: '#0a1628',
    url: 'https://gc2entrenamientoderesistencia.com.ar',
    screenshot: '/gc2.png',
  },
  {
    id: 'chronoflow',
    dictKey: 'chronoflow',
    name: 'ChronoFlow',
    tags: ['React Flow', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'WebSockets'],
    accentColor: '#8b5cf6',
    bgColor: '#0f0a1a',
    url: 'https://chronoflow.mateopavoni.com.ar',
    screenshot: '/chronoflow.png',
  },
  {
    id: 'tutienda',
    dictKey: 'tutienda',
    name: 'TuTienda',
    tags: ['Go', 'MongoDB', 'Redis', 'SvelteKit', 'Microservicios'],
    accentColor: '#1B03EA',
    bgColor: '#111111',
    url: 'https://tutienda.mateopavoni.com.ar',
    screenshot: '/tutienda.png',
  },
  {
    id: 'inglobal',
    dictKey: 'inglobal',
    name: 'Grúas InGlobal',
    tags: ['Next.js 15', 'Supabase', 'CMS', 'Resend'],
    accentColor: '#f5a524',
    bgColor: '#18181b',
    url: 'https://gruasinglobal.com',
    screenshot: '/inglobal.png',
  },
  {
    id: 'chaos-playground',
    dictKey: 'chaos_playground',
    name: 'Chaos Playground',
    tags: ['Elixir', 'Phoenix LiveView', 'OTP', 'PostgreSQL', 'Docker'],
    accentColor: '#ff5c5c',
    bgColor: '#f5f5f7',
    url: 'https://chaos-playground.mateopavoni.com.ar/',
    screenshot: '/chaos-playground.png',
  },
  {
    id: 'clubcore',
    dictKey: 'clubcore',
    name: 'ClubCore',
    tags: ['Java 21', 'Spring Boot', 'MySQL', 'Resilience4j', 'Docker'],
    accentColor: '#22c55e',
    bgColor: '#0f172a',
    url: 'https://api.clubcore.mateopavoni.com.ar/swagger-ui.html',
  },
  {
    id: 'coming-soon',
    dictKey: 'coming_soon',
    tags: [],
    accentColor: '#2563eb',
    bgColor: '#f0edef',
    url: '#contacto',
    screenshot: '/vimet-desarollo.png',
    wip: true,
    priority: true,
  },
]

// tags order = first-seen across projectBases, wip project has none
const ALL_TAGS = Array.from(new Set(projectBases.flatMap((p) => p.tags)))

export default function ProjectsGrid({ dict }: { dict: ProjectsDict }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const projects = useMemo(
    () =>
      projectBases.map((base) => {
        const item = dict.items[base.dictKey]
        return {
          ...base,
          name: base.name ?? ('name' in item ? item.name : base.id),
          description: item.description,
        }
      }),
    [dict],
  )

  const filtered = activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects

  return (
    <section id="proyectos" className="reveal py-20 md:py-28">
      <SectionKicker index="02" label={dict.heading} />

      <div className="flex gap-2 flex-wrap mb-10 md:mb-12">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`micro text-[0.65rem] rounded-full px-3 py-1.5 border hairline transition-colors ${
            activeTag === null
              ? 'bg-primary text-on-primary border-transparent'
              : 'text-on-surface-variant hover:text-primary hover:border-secondary-container'
          }`}
        >
          {dict.filter_all}
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`micro text-[0.65rem] rounded-full px-3 py-1.5 border hairline transition-colors ${
              activeTag === tag
                ? 'bg-primary text-on-primary border-transparent'
                : 'text-on-surface-variant hover:text-primary hover:border-secondary-container'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((project) => {
          const external = project.url.startsWith('http')
          const hasScreenshot = Boolean(project.screenshot)
          return (
            <a
              key={project.id}
              href={project.url}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group panel shot rounded flex flex-col overflow-hidden"
            >
              <div
                className="relative aspect-[1920/1040] overflow-hidden"
                style={{ background: project.bgColor }}
              >
                {hasScreenshot ? (
                  <Image
                    src={project.screenshot as string}
                    alt={`Captura de ${project.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    priority={project.priority}
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                      project.wip ? 'blur-[4px] opacity-70' : ''
                    }`}
                  />
                ) : (
                  <div
                    className="serif absolute inset-0 flex items-center justify-center text-6xl"
                    style={{ color: project.accentColor }}
                  >
                    {project.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 p-5 flex-1">
                <h3 className="serif text-2xl text-primary leading-tight">{project.name}</h3>
                <p
                  className="text-sm text-on-surface-variant leading-relaxed line-clamp-3"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {project.description}
                </p>
                <span className="micro text-xs edit-link text-primary group-hover:text-secondary-container inline-flex items-center gap-2 w-max mt-2">
                  {external ? 'Ver proyecto' : 'Hablemos'}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
