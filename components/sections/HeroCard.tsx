export default function HeroCard() {
  return (
    <section
      id="about"
      className="bento-card col-span-1 md:col-span-8 bg-surface-container-lowest rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative overflow-hidden"
    >
      {/* Avatar — initials */}
      <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-primary-container border-2 border-surface-container-high flex items-center justify-center shrink-0 relative z-10">
        <span
          className="text-2xl md:text-3xl font-bold text-secondary-container"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          MP
        </span>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        <span
          className="text-xs font-bold uppercase tracking-widest text-secondary-container border border-secondary-container rounded px-2 py-1 w-max"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Full Stack Developer
        </span>

        <h1
          className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.04em' }}
        >
          Mateo Pavoni
        </h1>

        <p
          className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Construyo productos digitales con foco en el producto final. Fundador de{' '}
          <span className="text-secondary-container font-medium">CodeTlon</span> — una software factory
          que entrega web apps reales, listas para producción.
        </p>

        <div className="flex gap-3 mt-1">
          <a
            href="#proyectos"
            className="bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:bg-secondary-container transition-all duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="border border-outline-variant text-on-surface-variant text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:border-secondary-container hover:text-secondary-container transition-all duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Contactar
          </a>
        </div>
      </div>

      {/* Decorative terminal icon */}
      <div className="absolute right-4 bottom-4 opacity-[0.04] select-none pointer-events-none">
        <svg width="160" height="160" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10l1.5 1.5L6 13l1 1 2.5-2.5L7 9l-1 1zm5 4h6v-1.5h-6V14z" />
        </svg>
      </div>
    </section>
  )
}
