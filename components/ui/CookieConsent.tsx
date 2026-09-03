'use client'

import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'mp-cookie-consent'
const PLACEHOLDER = 'G-XXXXXXXXXX'

type Choice = 'granted' | 'denied'
type CookieDict = { message: string; accept: string; reject: string }

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Only ask for consent if GA is actually configured.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const gaActive = Boolean(GA_ID && GA_ID !== PLACEHOLDER)

/**
 * Lightweight cookie consent banner, no dependencies. Saves the choice to
 * localStorage and updates GA4 (Consent Mode v2); the 'denied' default is
 * set by GoogleAnalytics.tsx before its config call.
 *
 * z-[60] — deliberately above Navbar/NovaChat (both z-50): it's a transient,
 * dismissible first-visit prompt, so briefly sitting on top of the chat
 * trigger while unanswered is fine; it fully unmounts once a choice is made.
 */
export default function CookieConsent({ dict }: { dict: CookieDict }) {
  const [visible, setVisible] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!gaActive) return
    let prev: string | null = null
    try {
      prev = localStorage.getItem(STORAGE_KEY)
    } catch {
      prev = null
    }
    // ponytail: must start `visible=false` on both server and client render
    // (localStorage doesn't exist server-side) and only flip post-mount, or
    // the banner would mismatch during hydration — same pattern already used
    // by ThemeToggle's `mounted` flag and NovaChat's history-restore effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (prev !== 'granted' && prev !== 'denied') setVisible(true)
  }, [])

  useEffect(() => {
    if (visible) acceptRef.current?.focus()
  }, [visible])

  function decide(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // localStorage unavailable — hide the banner anyway
    }
    window.gtag?.('consent', 'update', {
      analytics_storage: choice,
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={dict.message}
      onKeyDown={(e) => {
        if (e.key === 'Escape') decide('denied')
      }}
      className="fixed inset-x-0 bottom-0 z-[60] border-t hairline bg-surface-container-lowest px-4 py-4 shadow-xl backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-on-surface-variant" style={{ fontFamily: 'var(--font-inter)' }}>
          {dict.message}
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="micro text-xs rounded border hairline px-4 py-2 text-on-surface-variant hover:text-primary hover:border-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 transition-colors duration-150"
          >
            {dict.reject}
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={() => decide('granted')}
            className="micro text-xs rounded bg-primary text-on-primary px-4 py-2 hover:bg-secondary-container active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 transition-colors duration-150"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
