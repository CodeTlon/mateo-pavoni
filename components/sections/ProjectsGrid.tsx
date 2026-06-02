import Image from 'next/image'
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
    <section id="proyectos" className="col-span-1 md:col-span-12">
      <h2
        className="text-xs font-bold uppercase tracking-widest text-outline mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {dict.heading}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`bento-card bg-surface-container-lowest rounded-lg overflow-hidden group flex flex-col ${
              project.wide ? 'md:col-span-2' : ''
            }`}
          >
            {/* Thumbnail */}
            <div
              className={`w-full relative overflow-hidden ${
                project.wide ? 'aspect-video md:aspect-[16/5]' : 'aspect-video'
              }`}
              style={{ background: project.bgColor }}
            >
              {project.screenshot ? (
                <>
                  <Image
                    src={project.screenshot}
                    alt={`Captura de ${project.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={project.priority}
                    className={`object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
                      project.wip ? 'blur-[4px] opacity-70' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <div
                    className="w-12 h-12 rounded border-2 flex items-center justify-center"
                    style={{ borderColor: project.accentColor }}
                  >
                    <span
                      className="text-xl font-bold"
                      style={{ color: project.accentColor, fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {project.name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 flex flex-col grow">
              <div className="flex justify-between items-start mb-2">
                <h3
                  className="text-lg font-semibold text-primary"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {project.name}
                </h3>
                <a
                  href={project.url}
                  target={project.url.startsWith('http') ? '_blank' : undefined}
                  rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`Ver ${project.name}`}
                  className="text-outline group-hover:text-secondary-container transition-colors shrink-0 ml-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>

              <p
                className="text-sm text-on-surface-variant leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {project.description}
              </p>

              <div className="flex gap-2 mt-auto flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold uppercase tracking-widest border border-outline-variant text-on-surface-variant rounded px-2 py-1"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
