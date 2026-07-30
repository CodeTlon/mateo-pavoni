'use client'

import { useState, useRef, useEffect } from 'react'
import { askNova, type ChatMessage } from '@/app/actions/chat'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

type ChatDict = Dictionary['chat']

export default function NovaChat({ dict, lang }: { dict: ChatDict; lang: Locale }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(text: string) {
    if (!text.trim() || pending) return
    const next: ChatMessage[] = [...messages, { role: 'user', text }]
    setMessages(next)
    setInput('')
    setPending(true)
    const result = await askNova(next, lang)
    setMessages([
      ...next,
      { role: 'model', text: 'reply' in result ? result.reply : dict.error },
    ])
    setPending(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="panel bg-surface-container-lowest w-[min(90vw,340px)] h-[min(70vh,460px)] rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b hairline">
            <div>
              <p className="serif text-lg text-primary leading-none">{dict.heading}</p>
              <p className="text-xs text-on-surface-variant mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                {dict.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.close}
              className="text-outline hover:text-primary transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex flex-col gap-2">
                {dict.suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="text-left text-xs px-3 py-2 rounded border hairline text-on-surface-variant hover:border-secondary-container hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded max-w-[85%] ${
                  m.role === 'user'
                    ? 'self-end bg-primary text-on-primary'
                    : 'self-start bg-surface-container text-on-surface'
                }`}
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {m.text}
              </div>
            ))}
            {pending && (
              <div className="self-start text-xs text-on-surface-variant" style={{ fontFamily: 'var(--font-inter)' }}>
                …
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 px-3 py-3 border-t hairline"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.placeholder}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-outline-variant text-on-surface"
              style={{ fontFamily: 'var(--font-inter)' }}
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label={dict.send}
              className="micro text-xs bg-primary text-on-primary px-3 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {dict.send}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="micro text-xs bg-primary text-on-primary px-4 py-3 rounded-full shadow-lg hover:bg-secondary-container transition-colors"
      >
        {dict.trigger}
      </button>
    </div>
  )
}
