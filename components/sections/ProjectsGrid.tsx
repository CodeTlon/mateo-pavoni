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
  wide?: boolean
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
    id: 'masiphone',
    dictKey: 'masiphone',
    name: 'MasiPhone v2',
    tags: ['Next.js 14', 'Nest.js', 'Supabase', 'MercadoPago'],
    accentColor: '#2563eb',
    bgColor: '#0b0b0c',
    url: 'https://masiphone.com.ar',
    screenshot: '/masiphone.png',
  },
  {
    id: 'coming-soon',
    dictKey: 'coming_soon',
    tags: ['En desarrollo'],
    accentColor: '#2563eb',
    bgColor: '#f0edef',
    url: '#contacto',
    screenshot: '/vimet-desarollo.png',
    wip: true,
    priority: true,
    wide: true,
  },
]

export default function ProjectsGrid({ dict }: { dict: ProjectsDict }) {
  const projects = projectBases.map((base) => {
    const item = dict.items[base.dictKey]
    return {
      ...base,
      name: base.name ?? ('name' in item ? item.name : base.id),
      description: item.description,
    }
  })

  return (
    <section id="proyectos" className="reveal py-20 md:py-28">
      <SectionKicker index="02" label={dict.heading} />

      <div className="flex flex-col">
        {projects.map((project, i) => {
          const external = project.url.startsWith('http')
          return (
            <article
              key={project.id}
              className="group grid md:grid-cols-12 gap-6 md:gap-12 items-center py-12 md:py-16 border-t hairline first:border-t-0"
            >
              {/* Screenshot */}
              <a
                href={project.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={`Ver ${project.name}`}
                className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}
              >
                <div
                  className="panel relative aspect-[16/10] rounded overflow-hidden"
                  style={{ background: project.bgColor }}
                >
                  {project.screenshot ? (
                    <Image
                      src={project.screenshot}
                      alt={`Captura de ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      priority={project.priority}
                      className={`object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                        project.wip ? 'blur-[4px] opacity-70' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span
                        className="serif text-5xl"
                        style={{ color: project.accentColor }}
                      >
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </a>

              {/* Text */}
              <div className={`md:col-span-5 flex flex-col gap-4 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <span className="micro text-[0.7rem] text-secondary-container">
                  {String(i + 1).padStart(2, '0')}
                  {project.wip ? ` · ${project.tags[0]}` : ''}
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

                {!project.wip && (
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="micro text-[0.6rem] border hairline text-on-surface-variant rounded px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

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
