const stack = [
  { name: 'Next.js', icon: 'N' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Supabase', icon: 'SB' },
  { name: 'Tailwind', icon: 'TW' },
  { name: 'PostgreSQL', icon: 'PG' },
  { name: 'Resend', icon: 'RS' },
]

export default function TechStack() {
  return (
    <aside className="bento-card col-span-1 md:col-span-4 bg-primary-container rounded-lg p-6 md:p-8 flex flex-col">
      <h2
        className="text-xl font-semibold text-surface-container-lowest flex items-center gap-2 mb-6"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39b8fd" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
        Tech_Stack
      </h2>

      <div className="grid grid-cols-3 gap-4 mt-auto">
        {stack.map(({ name, icon }) => (
          <div key={name} className="tech-item flex flex-col items-center gap-2 group cursor-default">
            <div className="w-10 h-10 rounded bg-primary/30 flex items-center justify-center">
              <span
                className="tech-icon text-xs font-bold text-surface-variant group-hover:text-secondary-container transition-colors"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {icon}
              </span>
            </div>
            <span
              className="text-xs text-on-primary-container text-center"
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
