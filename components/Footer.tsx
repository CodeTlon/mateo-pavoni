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

export default function Footer() {
  return (
    <footer className="border-t border-primary/5 w-full py-12 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span
          className="text-xs uppercase tracking-widest text-outline"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Hecho con dedicación por Mateo Pavoni
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
