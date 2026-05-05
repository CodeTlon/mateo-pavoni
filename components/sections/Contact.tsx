'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { sendContact, type ContactState } from '@/app/actions/contact'
import type { Dictionary } from '@/app/[lang]/dictionaries'

type ContactDict = Dictionary['contact']

function SubmitButton({ dict }: { dict: ContactDict }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary-container text-on-primary text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-secondary-container hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-150 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      {pending ? dict.sending : (
        <>
          {dict.submit}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </>
      )}
    </button>
  )
}

export default function Contact({ dict }: { dict: ContactDict }) {
  const [state, action] = useActionState<ContactState, FormData>(sendContact, null)

  return (
    <section
      id="contacto"
      className="bento-card col-span-1 md:col-span-4 bg-surface-container-lowest rounded-lg p-5 sm:p-6 md:p-8 flex flex-col justify-between"
    >
      <div>
        <h2
          className="text-lg font-semibold text-primary flex items-center gap-2 mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-outline shrink-0">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {dict.heading}
        </h2>
        <p
          className="text-sm text-on-surface-variant leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {dict.subtitle}
        </p>
      </div>

      {state?.success ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary-container">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm text-on-surface-variant" style={{ fontFamily: 'var(--font-inter)' }}>
            {dict.success}
          </p>
        </div>
      ) : (
        <form action={action} className="flex flex-col gap-3">
          {state?.error && (
            <p className="text-xs text-red-500" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {dict.error}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-widest text-outline"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {dict.name_label}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="bg-transparent border-b border-outline-variant text-on-surface text-sm py-2 outline-none focus:border-secondary-container transition-colors placeholder:text-outline-variant"
              style={{ fontFamily: 'var(--font-inter)' }}
              placeholder={dict.name_placeholder}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-widest text-outline"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {dict.email_label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="bg-transparent border-b border-outline-variant text-on-surface text-sm py-2 outline-none focus:border-secondary-container transition-colors placeholder:text-outline-variant"
              style={{ fontFamily: 'var(--font-inter)' }}
              placeholder={dict.email_placeholder}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-xs font-bold uppercase tracking-widest text-outline"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {dict.message_label}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              className="bg-transparent border-b border-outline-variant text-on-surface text-sm py-2 outline-none focus:border-secondary-container transition-colors resize-none placeholder:text-outline-variant"
              style={{ fontFamily: 'var(--font-inter)' }}
              placeholder={dict.message_placeholder}
            />
          </div>

          <div className="mt-2">
            <SubmitButton dict={dict} />
          </div>
        </form>
      )}
    </section>
  )
}
