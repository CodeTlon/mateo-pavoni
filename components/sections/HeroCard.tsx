import Avatar from '@/components/Avatar'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type HeroDict = Dictionary['hero']

export default function HeroCard({ dict }: { dict: HeroDict }) {
  return (
    <section
      id="about"
      className="hatch full-bleed relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-10 pt-28 md:pt-32 pb-16">
      <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-center">
        {/* Text */}
        <div className="md:col-span-7 flex flex-col gap-6 order-2 md:order-1">
          <span className="rise rise-1 micro text-[0.7rem] text-secondary-container">{dict.badge}</span>

          <h1 className="rise rise-2 serif font-medium text-primary text-6xl sm:text-7xl md:text-8xl leading-[0.92]">
            Mateo
            <br />
            Pavoni<span className="text-secondary-container">.</span>
          </h1>

          <p
            className="rise rise-3 text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            {dict.bio_pre}
            <span className="text-on-surface font-medium">{dict.bio_highlight}</span>
            {dict.bio_post}
          </p>

          <div className="rise rise-4 flex flex-wrap items-center gap-7 mt-2">
            <a
              href="#proyectos"
              className="group micro text-xs inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded hover:bg-secondary-container transition-colors duration-150"
            >
              {dict.cta_projects}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#contacto"
              className="micro text-xs edit-link text-on-surface-variant hover:text-secondary-container"
            >
              {dict.cta_contact}
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="rise rise-2 md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <Avatar />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="rise rise-5 hidden md:flex items-center gap-4 mt-20">
        <span className="micro text-[0.6rem] text-outline tracking-[0.4em]">SCROLL</span>
        <span className="hairline w-28 border-t" />
      </div>
      </div>
    </section>
  )
}
