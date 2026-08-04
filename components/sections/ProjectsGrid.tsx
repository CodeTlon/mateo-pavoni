'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import SectionKicker from '@/components/SectionKicker'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

type ProjectsDict = Dictionary['projects']

type ProjectBase = {
  id: string
  dictKey: keyof ProjectsDict['items']
  name?: string
  stack?: string[]
  // adjacent projects sharing a groupId get one shared Nova callout instead of one each
  groupId?: string
  accentColor: string
  bgColor: string
  url: string
  screenshot?: string
  wip?: boolean
  priority?: boolean
}

// shared stack mentioned in a group's Nova line (the common ground across its projects)
const GROUP_STACKS: Record<string, string[]> = {
  'nextjs-ts': ['Next.js'],
}

const projectBases: ProjectBase[] = [
  {
    id: 'marcovich',
    dictKey: 'marcovich',
    name: 'Marcovich Barbería',
    stack: ['Next.js 14', 'Supabase', 'TypeScript', 'n8n', 'Docker'],
    groupId: 'nextjs-ts',
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
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Resend'],
    groupId: 'nextjs-ts',
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
    stack: ['Next.js 16', 'Supabase', 'CMS', 'TypeScript'],
    groupId: 'nextjs-ts',
    accentColor: '#38bdf8',
    bgColor: '#0a1628',
    url: 'https://gc2entrenamientoderesistencia.com.ar',
    screenshot: '/gc2.png',
  },
  {
    id: 'inglobal',
    dictKey: 'inglobal',
    name: 'Grúas InGlobal',
    stack: ['Next.js 15', 'Supabase', 'CMS', 'Resend'],
    groupId: 'nextjs-ts',
    accentColor: '#f5a524',
    bgColor: '#18181b',
    url: 'https://gruasinglobal.com',
    screenshot: '/inglobal.png',
  },
  {
    id: 'chronoflow',
    dictKey: 'chronoflow',
    name: 'ChronoFlow',
    stack: ['React Flow', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'WebSockets'],
    accentColor: '#8b5cf6',
    bgColor: '#0f0a1a',
    url: 'https://chronoflow.mateopavoni.com.ar',
    screenshot: '/chronoflow.png',
  },
  {
    id: 'tutienda',
    dictKey: 'tutienda',
    name: 'TuTienda',
    stack: ['Go', 'MongoDB', 'Redis', 'SvelteKit', 'Microservicios'],
    accentColor: '#1B03EA',
    bgColor: '#111111',
    url: 'https://tutienda.mateopavoni.com.ar',
    screenshot: '/tutienda.png',
  },
  {
    id: 'chaos-playground',
    dictKey: 'chaos_playground',
    name: 'Chaos Playground',
    stack: ['Elixir', 'Phoenix LiveView', 'OTP', 'PostgreSQL', 'Docker'],
    accentColor: '#ff5c5c',
    bgColor: '#f5f5f7',
    url: 'https://chaos-playground.mateopavoni.com.ar/',
    screenshot: '/chaos-playground.png',
  },
  {
    id: 'clubcore',
    dictKey: 'clubcore',
    name: 'ClubCore',
    stack: ['Java 21', 'Spring Boot', 'MySQL', 'Resilience4j', 'Docker'],
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

const THINKING_MS = 600
const TYPE_SPEED_MS = 15
const GAP_MS = 450

// thinking: dots before the opening line. intro: the opening line types out.
// nova: mini stack callout for the current project (or its group) types out.
// card: that project's card appears and its description types out.
// Loop nova->card per project (skipping nova for non-first members of a group), then done.
type Stage = 'thinking' | 'intro' | 'nova' | 'card'

export default function ProjectsGrid({ dict, lang }: { dict: ProjectsDict; lang: Locale }) {
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [stage, setStage] = useState<Stage>('thinking')
  const [current, setCurrent] = useState(0)
  const [typedLen, setTypedLen] = useState(0)

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

  const isGroupStart = useCallback(
    (i: number) =>
      !projects[i].groupId || i === 0 || projects[i - 1].groupId !== projects[i].groupId,
    [projects],
  )
  const stageForIndex = useCallback(
    (i: number) => (isGroupStart(i) && (projects[i].groupId ? true : Boolean(projects[i].stack)) ? 'nova' : 'card'),
    [projects, isGroupStart],
  )

  const listFormatter = useMemo(
    () => new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' }),
    [lang],
  )
  const novaLineFor = useCallback(
    (i: number) => {
      const project = projects[i]
      if (project.groupId) {
        const stack = GROUP_STACKS[project.groupId] ?? []
        return dict.nova_group_line.replace('{stack}', listFormatter.format(stack))
      }
      const template = dict.nova_project_lines[i % dict.nova_project_lines.length]
      return template.replace('{stack}', listFormatter.format(project.stack ?? []))
    },
    [projects, dict.nova_group_line, dict.nova_project_lines, listFormatter],
  )

  const introLen = dict.nova_intro.length

  function start() {
    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setStage('card')
      setPhase('done')
      return
    }
    setPhase('running')
  }

  // thinking -> intro
  useEffect(() => {
    if (phase !== 'running' || stage !== 'thinking') return
    const t = setTimeout(() => {
      setStage('intro')
      setTypedLen(0)
    }, THINKING_MS)
    return () => clearTimeout(t)
  }, [phase, stage])

  // intro typewriter -> first project
  useEffect(() => {
    if (phase !== 'running' || stage !== 'intro') return
    if (typedLen < introLen) {
      const t = setTimeout(() => setTypedLen((n) => n + 1), TYPE_SPEED_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setCurrent(0)
      setTypedLen(0)
      setStage(stageForIndex(0))
    }, GAP_MS)
    return () => clearTimeout(t)
  }, [phase, stage, typedLen, introLen, stageForIndex])

  // nova mini-intro typewriter for the current project/group -> its card
  useEffect(() => {
    if (phase !== 'running' || stage !== 'nova') return
    const text = novaLineFor(current)
    if (typedLen < text.length) {
      const t = setTimeout(() => setTypedLen((n) => n + 1), TYPE_SPEED_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setStage('card')
      setTypedLen(0)
    }, 250)
    return () => clearTimeout(t)
  }, [phase, stage, typedLen, current, novaLineFor])

  // current project's description typewriter -> next project (or done)
  useEffect(() => {
    if (phase !== 'running' || stage !== 'card') return
    const text = projects[current].description
    if (typedLen < text.length) {
      const t = setTimeout(() => setTypedLen((n) => n + 1), TYPE_SPEED_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      const next = current + 1
      if (next >= projects.length) {
        setPhase('done')
        return
      }
      setCurrent(next)
      setTypedLen(0)
      setStage(stageForIndex(next))
    }, GAP_MS)
    return () => clearTimeout(t)
  }, [phase, stage, typedLen, current, projects, stageForIndex])

  const settled = (i: number) => phase === 'done' || i < current

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
        <div className="rise flex items-baseline gap-3 mb-4 md:mb-5">
          <span className="serif text-lg text-secondary-container leading-relaxed shrink-0">Nova</span>
          <p className="text-base text-on-surface-variant leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            {stage === 'thinking' ? (
              <span className="inline-flex gap-1 py-1">
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-current opacity-60 inline-block" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-current opacity-60 inline-block" />
                <span className="chat-dot h-1.5 w-1.5 rounded-full bg-current opacity-60 inline-block" />
              </span>
            ) : (
              <>
                {dict.nova_intro}
                {stage === 'intro' && <span className="typing-cursor" />}
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col">
        {projects.map((project, i) => {
          if (phase === 'idle') return null
          if (i > current && phase !== 'done') return null

          const external = project.url.startsWith('http')
          const hasScreenshot = Boolean(project.screenshot)
          const isCurrent = !settled(i) && i === current
          const hasNovaLine = project.groupId ? isGroupStart(i) : Boolean(project.stack)
          const showNovaLine = hasNovaLine && (settled(i) || stage === 'nova' || stage === 'card')
          const novaTyping = isCurrent && stage === 'nova'
          const novaText = hasNovaLine ? novaLineFor(i) : ''
          const showCard = settled(i) || stage === 'card'
          const descTyping = isCurrent && stage === 'card'
          const description = descTyping ? project.description.slice(0, typedLen) : project.description

          return (
            <div key={project.id} className="border-t hairline first:border-t-0">
              {showNovaLine && (
                <div className="rise flex items-baseline gap-3 pt-5 md:pt-6">
                  <span className="serif text-lg text-secondary-container leading-relaxed shrink-0">Nova</span>
                  <p className="text-sm text-on-surface-variant leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                    {novaTyping ? novaText.slice(0, typedLen) : novaText}
                    {novaTyping && <span className="typing-cursor" />}
                  </p>
                </div>
              )}

              {showCard && (
                <article className="rise group grid md:grid-cols-12 gap-6 md:gap-12 items-center py-12 md:py-16">
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
                      {description}
                      {descTyping && <span className="typing-cursor" />}
                    </p>

                    {(settled(i) || phase === 'done') && (
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
                    )}
                  </div>
                </article>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
