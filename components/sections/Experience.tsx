const history = [
  {
    period: '2024 — Presente',
    role: 'Fundador & Lead Developer',
    place: 'CodeTlon Software Factory',
    description: 'Software factory especializada en desarrollo web full stack para clientes de Córdoba y LATAM.',
  },
  {
    period: '2023 — Presente',
    role: 'Freelance Full Stack Developer',
    place: 'Proyectos independientes',
    description: 'Desarrollo de landings, e-commerce y dashboards para distintos rubros.',
  },
  {
    period: '2022 — 2023',
    role: 'Desarrollador Web',
    place: 'Proyectos académicos + personales',
    description: 'Aprendizaje intensivo de React, TypeScript y backend con Node.js y PostgreSQL.',
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

      <div className="flex flex-col gap-6">
        {history.map(({ period, role, place, description }) => (
          <div key={role} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 group">
            <div
              className="text-xs text-outline-variant w-36 shrink-0"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {period}
            </div>
            <div>
              <h3
                className="text-base font-semibold text-primary group-hover:text-secondary-container transition-colors"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {role}
              </h3>
              <p
                className="text-sm text-on-surface-variant"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {place}
              </p>
              <p
                className="text-sm text-on-surface-variant mt-1 leading-relaxed"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
