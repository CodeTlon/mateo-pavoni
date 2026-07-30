'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import ContactTemplate from '@/emails/ContactTemplate'

const schema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

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
    to: process.env.COMPANY_EMAIL ?? 'mateopavonint905@gmail.com',
    subject: subject ?? `Nuevo mensaje de ${name} — Portfolio`,
    html,
  })
}

export async function sendContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
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
    return { success: false, error: `Error: ${error.message}` }
  }

  console.log('[Resend] Email enviado:', data?.id)
  return { success: true }
}
