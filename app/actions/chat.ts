'use server'

import { getDictionary, type Locale } from '@/app/[lang]/dictionaries'

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const STACK =
  'Next.js, React, TypeScript, Tailwind, Svelte, Sass, Bootstrap, Node.js, Go, FastAPI, Supabase, .NET Core, PHP, PostgreSQL, MySQL'

export type ChatMessage = { role: 'user' | 'model'; text: string }

export async function askNova(
  history: ChatMessage[],
  locale: Locale,
): Promise<{ reply: string } | { error: string }> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return { error: 'Bot no configurado (falta GEMINI_API_KEY).' }

  const dict = await getDictionary(locale)
  const work = dict.experience.work
    .map((w) => `${w.role} en ${w.place} (${w.period}): ${w.bullets.join(' ')}`)
    .join('\n')
  const education = dict.experience.education
    .map((e) => `${e.degree} — ${e.institution} (${e.period})`)
    .join('\n')

  const systemPrompt = `Sos "Nova", asistente conversacional del portfolio de Mateo Pavoni, Full Stack Developer.
Respondé SOLO sobre su perfil profesional, en ${locale === 'en' ? 'inglés' : 'español'}, tono cercano y breve (2-4 frases). Texto plano, sin markdown (nada de **, *, #, listas).

Stack: ${STACK}

Experiencia:
${work}

Educación:
${education}

Si piden el CV, decí que pueden descargarlo en /cv.pdf.
Si piden agendar una entrevista, invitalos a completar el formulario de la sección Contacto de esta misma página.
Si preguntan algo fuera de lo profesional, redirigí amablemente al tema.`

  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    {
      role: 'model',
      parts: [{ text: locale === 'en' ? 'Got it, ready to help.' : 'Entendido, lista para ayudar.' }],
    },
    ...history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
  ]

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents }),
  })

  if (!res.ok) {
    console.error('[Gemini]', await res.text())
    return { error: 'No pude responder ahora, probá de nuevo.' }
  }

  const data = await res.json()
  const reply: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text
  return reply ? { reply } : { error: 'No pude responder ahora, probá de nuevo.' }
}
