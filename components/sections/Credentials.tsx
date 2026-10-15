import Image from 'next/image'
import SectionKicker from '@/components/SectionKicker'
import { credentialItems } from '@/lib/credentials'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type CredentialsDict = Dictionary['credentials']

export default function Credentials({ dict }: { dict: CredentialsDict }) {
  const items = credentialItems(dict)
  if (items.length === 0) return null

  return (
    <section id="credenciales" className="reveal py-20 md:py-28">
      <SectionKicker index="04" label={dict.heading} />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ title, issuer, date, image, file }) => (
          <li key={file} className="panel flex flex-col overflow-hidden rounded-lg bg-surface-container-lowest">
            <div className="relative aspect-[4/3] bg-surface-container">
              <Image
                src={image}
                alt={`${dict.alt_prefix} ${title} — ${issuer}`}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <h3 className="serif text-lg text-primary">{title}</h3>
              <p className="text-xs text-outline" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {issuer} · {date}
              </p>
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 self-start text-xs text-on-surface-variant underline underline-offset-2 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {dict.view}
                <span className="sr-only"> — {title}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
