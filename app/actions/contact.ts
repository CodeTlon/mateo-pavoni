'use server'

import { z } from 'zod'
import { Resend } from 'resend'
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

export async function sendContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const result = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.success) {
    return { success: false, error: result.error.issues[0].message }
  }

  const { name, email, message } = result.data
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: process.env.COMPANY_EMAIL ?? 'mateopavonint905@gmail.com',
      subject: `Nuevo mensaje de ${name} — Portfolio`,
      react: ContactTemplate({ name, email, message }),
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Error al enviar. Intentá de nuevo.' }
  }
}
