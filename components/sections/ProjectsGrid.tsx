const projects = [
  {
    id: 'marcovich',
    name: 'Marcovich Barbería',
    description:
      'Plataforma completa para barbería premium: sistema de reservas online en 5 pasos, autenticación de clientes, panel de administración y notificaciones por email y WhatsApp.',
    tags: ['Next.js 14', 'Supabase', 'TypeScript'],
    type: 'L3 — Dashboard + Auth',
    accentColor: '#C8A97E',
    bgColor: '#1a1a1a',
    url: 'https://github.com/codetlon/marcovich-barberia',
  },
  {
    id: 'coming-soon',
    name: 'Próximo proyecto',
    description:
      'Continuamente construyendo nuevos productos. Si tenés un proyecto en mente, hablemos.',
    tags: ['En desarrollo'],
    type: 'Próximamente',
    accentColor: '#39b8fd',
    bgColor: '#f0edef',
    url: '#contacto',
  },
]

export default function ProjectsGrid() {
  return (
    <section id="proyectos" className="col-span-1 md:col-span-12">
      <h2
        className="text-xs font-bold uppercase tracking-widest text-outline mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        // Proyectos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <article
            key={project.id}
            className="bento-card bg-surface-container-lowest rounded-lg overflow-hidden group flex flex-col"
          >
            {/* Thumbnail */}
            <div
              className="h-40 w-full relative overflow-hidden flex items-center justify-center"
              style={{ background: project.bgColor }}
            >
              <div className="flex flex-col items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
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
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: project.accentColor, fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {project.type}
                </span>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity duration-500"
                   style={{ background: project.bgColor === '#1a1a1a' ? '#000' : '#fbf8fa' }} />
            </div>

            <div className="p-6 flex flex-col grow">
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
                  className="text-outline group-hover:text-secondary-container transition-colors"
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
