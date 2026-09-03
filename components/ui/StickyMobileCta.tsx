// Sticky mobile CTA — bottom-left pill, md:hidden. Deliberately kept clear of
// NovaChat's bottom-right trigger (fixed bottom-5 right-5) so it never covers it.
export default function StickyMobileCta({ label }: { label: string }) {
  return (
    <a
      href="#contacto"
      className="md:hidden fixed bottom-5 left-5 z-40 micro text-xs inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-full shadow-lg hover:bg-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 transition-[background-color,transform] duration-200"
    >
      {label}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}
