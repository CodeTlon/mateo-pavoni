'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import ContactTemplate from '@/emails/ContactTemplate'

type FormLocale = 'es' | 'en'

// Inline validation copy for both locales — the form posts a hidden `lang`
// field so the message returned matches whatever language the visitor is on
// (previously this was hardcoded Spanish regardless of locale).
const validationMessages: Record<FormLocale, { name: string; email: string; message: string; generic: string }> = {
  es: {
    name: 'Nombre requerido',
    email: 'Email inválido',
    message: 'El mensaje debe tener al menos 10 caracteres',
    generic: 'Error al enviar. Intentá de nuevo.',
  },
  en: {
    name: 'Name is required',
    email: 'Invalid email address',
    message: 'Message must be at least 10 characters',
    generic: 'Failed to send. Please try again.',
  },
}

function schemaFor(locale: FormLocale) {
  const t = validationMessages[locale]
  return z.object({
    name: z.string().min(2, t.name),
    email: z.string().email(t.email),
    message: z.string().min(10, t.message),
  })
}

export type ContactState = {
  success: boolean
  error?: string
} | null

export async function sendContactEmail({
  name,
  email,
  message,
  subject,
}: {
  name: string
  email: string
  message: string
  subject?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const html = await render(ContactTemplate({ name, email, message }))

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
    to: process.env.COMPANY_EMAIL ?? 'mateopavoni6@gmail.com',
    subject: subject ?? `Nuevo mensaje de ${name} — Portfolio`,
    html,
  })
}

export async function sendContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const locale: FormLocale = formData.get('lang') === 'en' ? 'en' : 'es'
  const schema = schemaFor(locale)

  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  const { data, error } = await sendContactEmail(result.data)

  if (error) {
    console.error('[Resend]', error)
    return { success: false, error: validationMessages[locale].generic }
  }

  console.log('[Resend] Email enviado:', data?.id)
  return { success: true }
}
