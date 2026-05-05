type WorkEntry = {
  period: string
  role: string
  place: string
  bullets: string[]
}

type EduEntry = {
  period: string
  degree: string
  institution: string
  note?: string
}

const workHistory: WorkEntry[] = [
  {
    period: 'Abr 2025 — Dic 2025',
    role: 'Desarrollador Trainee (.NET)',
    place: 'Encode S.A. · Córdoba, Argentina',
    bullets: [
      'Desarrollo de lógica de negocio en C# y .NET 8, asegurando escalabilidad y rendimiento corporativo.',
      'Optimización de bases de datos relacionales (SQL Server / MySQL) con esquemas eficientes y consultas complejas.',
      'Aplicación de principios SOLID y patrones de diseño en refactorización de código.',
      'Colaboración en metodologías ágiles con shadowing y code review junto a desarrolladores senior.',
    ],
  },
  {
    period: 'Nov 2025 — Presente',
    role: 'Full Stack Developer & Automatización',
    place: 'Freelance',
    bullets: [
      'Marcovich Barbería (En producción): Plataforma integral con Next.js/Supabase, turnero automatizado vía WhatsApp API y n8n, despliegue en VPS (Docker/Coolify) con Cloudflare y Google Calendar.',
      'Automatización y QA: Flujos n8n para prospección B2B, testing con Playwright y Lighthouse (Performance/SEO).',
      'Proyectos activos: E-commerce con pasarela de pagos, sistema Health-Tech para nutrición y Marketing Sites optimizados.',
    ],
  },
]

const education: EduEntry[] = [
  {
    period: '2026 — Presente',
    degree: 'Ingeniería en Sistemas de Información',
    institution: 'UTN - FRC',
  },
  {
    period: '2024 — 2026 (Est.)',
    degree: 'Tecnicatura Superior en Desarrollo de Software',
    institution: 'Inst. Superior Cura Gabriel Brochero',
    note: 'Beca del 100% al mérito académico — Fundación Encode.',
  },
]

export default function Experience() {
  return (
    <section id="experiencia" className="bento-card col-span-1 md:col-span-8 bg-surface-container-lowest rounded-lg p-6 md:p-8">
      <h2
        className="text-lg font-semibold text-primary flex items-center gap-2 border-b border-surface-container-high pb-4 mb-6"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#75777d" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        Operational_History
      </h2>

      {/* Work experience */}
      <div className="flex flex-col gap-8 mb-8">
        {workHistory.map(({ period, role, place, bullets }) => (
          <div key={role} className="flex flex-col md:flex-row gap-2 md:gap-8 group">
            <div
              className="text-xs text-outline-variant w-44 shrink-0 pt-0.5"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {period}
            </div>
            <div className="flex-1">
              <h3
                className="text-base font-semibold text-primary group-hover:text-secondary-container transition-colors"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {role}
              </h3>
              <p
                className="text-xs text-outline mb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {place}
              </p>
              <ul className="flex flex-col gap-1.5">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-on-surface-variant leading-relaxed"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <span className="text-secondary-container shrink-0 mt-0.5 select-none">›</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="border-t border-surface-container-high pt-6">
        <p
          className="text-xs font-bold uppercase tracking-widest text-outline mb-4"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          // Educación
        </p>
        <div className="flex flex-col gap-4">
          {education.map(({ period, degree, institution, note }) => (
            <div key={degree} className="flex flex-col md:flex-row gap-1 md:gap-8">
              <div
                className="text-xs text-outline-variant w-44 shrink-0"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {period}
              </div>
              <div>
                <p
                  className="text-sm font-semibold text-primary"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {degree}
                </p>
                <p
                  className="text-xs text-outline"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {institution}
                </p>
                {note && (
                  <p
                    className="text-xs text-secondary-container mt-1"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
