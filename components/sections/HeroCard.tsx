import Avatar from '@/components/Avatar'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type HeroDict = Dictionary['hero']

export default function HeroCard({ dict }: { dict: HeroDict }) {
  return (
    <section
      id="about"
      className="bento-card col-span-1 md:col-span-8 bg-surface-container-lowest rounded-lg p-5 sm:p-6 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center relative overflow-hidden"
    >
      <Avatar />

      <div className="flex flex-col gap-3 relative z-10 min-w-0">
        <span
          className="text-xs font-bold uppercase tracking-widest text-secondary-container border border-secondary-container rounded px-2 py-1 w-max"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {dict.badge}
        </span>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary leading-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.04em' }}
        >
          Mateo Pavoni
        </h1>

        <p
          className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {dict.bio_pre}
          <span className="text-on-surface font-medium">{dict.bio_highlight}</span>
          {dict.bio_post}
        </p>

        <div className="flex flex-wrap gap-3 mt-1">
          <a
            href="#proyectos"
            className="bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:bg-secondary-container transition-all duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {dict.cta_projects}
          </a>
          <a
            href="#contacto"
            className="border border-outline-variant text-on-surface-variant text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:border-secondary-container hover:text-secondary-container transition-all duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {dict.cta_contact}
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
