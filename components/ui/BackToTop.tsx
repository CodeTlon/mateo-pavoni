'use client'

import { useEffect, useState } from 'react'

// Floating scroll-to-top pill. Stacked above NovaChat's trigger (same right-5
// offset, bottom-24 instead of bottom-5) so the two never overlap.
export default function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={label}
      title={label}
      className="rise fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border hairline bg-surface-container-lowest text-on-surface-variant shadow-lg hover:text-secondary-container hover:border-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 transition-[color,border-color,transform] duration-150"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
