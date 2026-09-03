'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import SectionKicker from '@/components/SectionKicker'
import { sendContact, type ContactState } from '@/app/actions/contact'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

type ContactDict = Dictionary['contact']

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2'

function SubmitButton({ dict }: { dict: ContactDict }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={`micro text-xs w-full bg-primary text-on-primary py-4 rounded hover:bg-secondary-container active:scale-[0.98] ${focusRing} transition-colors duration-150 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`}
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

export default function Contact({ dict, lang }: { dict: ContactDict; lang: Locale }) {
  const [state, action] = useActionState<ContactState, FormData>(sendContact, null)

  return (
    <section id="contacto" className="reveal py-20 md:py-32">
      <SectionKicker index="04" label={dict.heading} />

      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
        <div className="md:col-span-5">
          <p
            className="serif text-3xl md:text-4xl text-primary leading-snug"
          >
            {dict.subtitle}
          </p>
        </div>

        <div className="md:col-span-7">
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
          <input type="hidden" name="lang" value={lang} />

          {state?.error && (
            <p
              role="alert"
              aria-live="polite"
              className="text-xs text-red-500"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {state.error || dict.error}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="micro text-[0.7rem] text-outline"
            >
              {dict.name_label}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              className={`bg-transparent border-b border-outline-variant text-on-surface text-sm py-2 outline-none focus:border-secondary-container ${focusRing} transition-colors placeholder:text-outline-variant`}
              style={{ fontFamily: 'var(--font-inter)' }}
              placeholder={dict.name_placeholder}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="micro text-[0.7rem] text-outline"
            >
              {dict.email_label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`bg-transparent border-b border-outline-variant text-on-surface text-sm py-2 outline-none focus:border-secondary-container ${focusRing} transition-colors placeholder:text-outline-variant`}
              style={{ fontFamily: 'var(--font-inter)' }}
              placeholder={dict.email_placeholder}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="micro text-[0.7rem] text-outline"
            >
              {dict.message_label}
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={3}
              className={`bg-transparent border-b border-outline-variant text-on-surface text-sm py-2 outline-none focus:border-secondary-container ${focusRing} transition-colors resize-none placeholder:text-outline-variant`}
              style={{ fontFamily: 'var(--font-inter)' }}
              placeholder={dict.message_placeholder}
            />
          </div>

          <div className="mt-2">
            <SubmitButton dict={dict} />
          </div>
        </form>
      )}
        </div>
      </div>
    </section>
  )
}
