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

      <ul className="flex flex-col">
        {items.map(({ title, issuer, date, url }) => (
          <li
            key={`${issuer}-${title}`}
            className="flex flex-col gap-1 border-b hairline py-4 md:flex-row md:items-baseline md:gap-8"
          >
            <span
              className="w-28 shrink-0 text-xs text-outline-variant"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {date}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-base text-primary" style={{ fontFamily: 'var(--font-inter)' }}>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2"
                  >
                    {title}
                    <span className="sr-only"> — {dict.view}</span>
                  </a>
                ) : (
                  title
                )}
              </h3>
              <p className="text-xs text-outline" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {issuer}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
