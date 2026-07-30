'use client'

import { useState, useRef, useEffect } from 'react'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

type ChatDict = Dictionary['chat']
type ChatMessage = { role: 'user' | 'model'; text: string }

const STORAGE_KEY = 'nova-chat-history'

export default function NovaChat({ dict, lang }: { dict: ChatDict; lang: Locale }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setMessages(JSON.parse(saved))
    } catch {
      // ponytail: corrupt/blocked storage just starts fresh, not worth a UI error
    }
    loadedRef.current = true
  }, [])

  useEffect(() => {
    if (!loadedRef.current) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(text: string) {
    if (!text.trim() || pending) return
    const next: ChatMessage[] = [...messages, { role: 'user', text }]
    setMessages([...next, { role: 'model', text: '' }])
    setInput('')
    setPending(true)

    try {
      const res = await fetch('/api/nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: next, lang }),
      })
      if (!res.body) throw new Error('no body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let scheduledOk: boolean | null = null

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const evt = JSON.parse(line.slice(6))
          if (evt.type === 'text') {
            setMessages((prev) => {
              const copy = [...prev]
              const last = copy[copy.length - 1]
              copy[copy.length - 1] = { ...last, text: last.text + evt.value }
              return copy
            })
          } else if (evt.type === 'scheduled') {
            scheduledOk = evt.ok
          }
        }
      }

      if (scheduledOk !== null) {
        const ok = scheduledOk
        setMessages((prev) => [...prev, { role: 'model', text: ok ? dict.scheduled_ok : dict.scheduled_error }])
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'model', text: dict.error }
        return copy
      })
    } finally {
      setPending(false)
    }
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
                {m.text || (pending && i === messages.length - 1 ? '…' : '')}
              </div>
            ))}
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
