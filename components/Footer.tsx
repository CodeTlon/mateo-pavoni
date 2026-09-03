import type { Dictionary } from '@/app/[lang]/dictionaries'
import ShareButton from '@/components/ui/ShareButton'

type FooterDict = Dictionary['footer']
type UiDict = Dictionary['ui']

const linkClass =
  'text-xs uppercase tracking-widest text-outline hover:text-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded transition-colors'

export default function Footer({ dict, ui }: { dict: FooterDict; ui: UiDict }) {
  return (
    <footer className="border-t border-primary/5 w-full py-10 md:py-12 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <span
          className="text-xs uppercase tracking-widest text-outline"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {dict.copy}
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/mateopavoni"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mateopavonidev"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            LinkedIn
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mateopavonint905@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Email
          </a>
          <ShareButton label={ui.share} copiedLabel={ui.share_copied} />
        </div>
      </div>
    </footer>
  )
}
