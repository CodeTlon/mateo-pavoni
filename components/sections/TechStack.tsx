import type { Dictionary } from '@/app/[lang]/dictionaries'
import SectionKicker from '@/components/SectionKicker'

type TechDict = Dictionary['tech']

type Tech = {
  name: string
  src?: string
  abbr?: string
  invert?: boolean
}

type Category = {
  label: string
  items: Tech[]
}

const cdn = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`

// ponytail: ink (#091426) for marks that are white-by-default, so they survive on the light bg; `invert: true` flips them back to white in dark mode
const categories: Category[] = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js',    src: cdn('nextdotjs',   '091426'), invert: true },
      { name: 'React',      src: cdn('react',       '61dafb') },
      { name: 'TypeScript', src: cdn('typescript',  '3178c6') },
      { name: 'Tailwind',   src: cdn('tailwindcss', '06b6d4') },
      { name: 'Svelte',     src: cdn('svelte',      'ff3e00') },
      { name: 'Sass',       src: cdn('sass',        'cc6699') },
      { name: 'Bootstrap',  src: cdn('bootstrap',   '7952b3') },
      { name: 'Vercel',     src: cdn('vercel',      '091426'), invert: true },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js',    src: cdn('nodedotjs', '339933') },
      { name: 'Go',         src: cdn('go',        '00add8') },
      { name: 'FastAPI',    src: cdn('fastapi',   '009688') },
      { name: 'Java',       src: cdn('openjdk',   '437291') },
      { name: 'Spring Boot',src: cdn('springboot','6db33f') },
      { name: 'Elixir',     src: cdn('elixir',    '4b275f') },
      { name: 'Phoenix',    src: cdn('phoenixframework', 'fd4f00') },
      { name: 'Supabase',   src: cdn('supabase',  '3fcf8e') },
      { name: '.NET Core',  src: cdn('dotnet',    '512bd4') },
      { name: 'PHP',        src: cdn('php',       '777bb4') },
      { name: 'PostgreSQL', src: cdn('postgresql','4169e1') },
      { name: 'MySQL',      src: cdn('mysql',     '4479a1') },
      { name: 'MongoDB',    src: cdn('mongodb',   '47a248') },
      { name: 'Redis',      src: cdn('redis',     'ff4438') },
      { name: 'SQL Server', src: '/sql-server.svg' },
      { name: 'Resend',     src: '/resend.svg', invert: true },
    ],
  },
  {
    label: 'Infra',
    items: [
      { name: 'Docker',     src: cdn('docker',     '2496ed') },
      { name: 'Cloudflare', src: cdn('cloudflare', 'f38020') },
      { name: 'Linux',      src: cdn('linux',      'fcc624') },
      { name: 'Coolify',    src: '/coolify.svg' },
    ],
  },
  {
    label: 'IA & Auto',
    items: [
      { name: 'n8n',          src: cdn('n8n',         'ea4b71') },
      { name: 'Meta API',     src: cdn('meta',        '0082fb') },
      { name: 'Google Cloud', src: cdn('googlecloud', '4285f4') },
      { name: 'Claude',       src: '/claude.svg' },
    ],
  },
]

export default function TechStack({ dict }: { dict: TechDict }) {
  return (
    <section className="reveal py-20 md:py-28">
      <SectionKicker index="01" label={dict.heading} />

      <div className="flex flex-col">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="grid md:grid-cols-12 gap-4 md:gap-8 py-7 border-t hairline first:border-t-0"
          >
            <h3 className="md:col-span-3 serif text-2xl md:text-3xl text-primary">
              {cat.label}
            </h3>
            <div className="md:col-span-9 flex flex-wrap gap-x-7 gap-y-4">
              {cat.items.map(({ name, src, abbr, invert }) => (
                <div
                  key={name}
                  className="tech-item flex items-center gap-2.5 text-on-surface-variant hover:text-secondary-container transition-colors"
                >
                  <span className="w-6 h-6 flex items-center justify-center shrink-0">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt={name}
                        width={22}
                        height={22}
                        className={`w-[22px] h-[22px] object-contain ${invert ? 'dark:invert' : ''}`}
                      />
                    ) : (
                      <span className="micro text-[0.65rem] text-secondary-container">{abbr}</span>
                    )}
                  </span>
                  <span className="text-sm" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
