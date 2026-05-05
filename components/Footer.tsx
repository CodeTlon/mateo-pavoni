import type { Dictionary } from '@/app/[lang]/dictionaries'

type FooterDict = Dictionary['footer']

export function CodeTlonBadge() {
  return (
    <a
      href="https://codetlon.com.ar"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded"
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      CodeTlon Labs
    </a>
  )
}

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="border-t border-primary/5 w-full py-10 md:py-12 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <span
          className="text-xs uppercase tracking-widest text-outline"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {dict.copy}
        </span>

        <CodeTlonBadge />

        <div className="flex gap-6">
          <a
            href="https://github.com/mateopavoni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-outline hover:text-secondary-container transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mateopavonidev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-outline hover:text-secondary-container transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            LinkedIn
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mateopavonint905@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-outline hover:text-secondary-container transition-colors"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
