'use client'

// global-error.tsx replaces the root layout entirely when it throws, so it
// must define its own <html>/<body> and re-import the global stylesheet —
// RootLayout (app/layout.tsx) does not render in this case.
import './globals.css'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="bg-surface text-on-surface min-h-screen antialiased flex items-center justify-center px-5">
        <div className="text-center flex flex-col items-center gap-4 max-w-md">
          <span className="text-lg font-bold tracking-tighter text-primary">MP.DEV</span>
          <h1 className="text-2xl font-bold text-primary">Something went wrong</h1>
          <p className="text-on-surface-variant text-sm">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="mt-2 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded hover:bg-secondary-container transition-colors duration-150"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
