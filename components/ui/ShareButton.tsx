'use client'

import { useState } from 'react'

// Web Share API where available (mobile browsers, most desktop browsers now
// too); falls back to copying the current URL to the clipboard.
export default function ShareButton({ label, copiedLabel }: { label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const shareData = {
      title: document.title,
      text: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? document.title,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // user dismissed the native share sheet — nothing to do
      }
      return
    }

    try {
      await navigator.clipboard.writeText(shareData.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — silent no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="micro text-xs uppercase tracking-widest text-outline hover:text-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded transition-colors inline-flex items-center gap-1.5"
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      {copied ? copiedLabel : label}
    </button>
  )
}
