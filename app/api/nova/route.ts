import { z } from 'zod'
import { getDictionary, type Locale } from '@/app/[lang]/dictionaries'
import { sendContactEmail } from '@/app/actions/contact'

const GEMINI_STREAM_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent'

const STACK =
  'Next.js, React, TypeScript, Tailwind, Svelte, Sass, Bootstrap, Node.js, Go, FastAPI, Supabase, .NET Core, PHP, PostgreSQL, MySQL'

const scheduleArgsSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  reason: z.string().min(3),
})

const SCHEDULE_TOOL = {
  functionDeclarations: [
    {
      name: 'schedule_interview',
      description:
        'Registra un pedido de entrevista/contacto. Solo llamala cuando ya tengas nombre, email y motivo confirmados por el usuario — no inventes ni asumas datos.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          reason: { type: 'string', description: 'Motivo o contexto de la entrevista/contacto' },
        },
        required: ['name', 'email', 'reason'],
      },
    },
  ],
}

type ChatMessage = { role: 'user' | 'model'; text: string }

export async function POST(req: Request) {
  const { history, lang } = (await req.json()) as { history: ChatMessage[]; lang: Locale }
  const apiKey = process.env.GEMINI_API_KEY
  const encoder = new TextEncoder()
  const errorText = lang === 'en' ? "Couldn't reply right now, try again." : 'No pude responder ahora, probá de nuevo.'

  if (!apiKey) {
    return sseError(encoder, errorText)
  }

  const dict = await getDictionary(lang)
  const work = dict.experience.work
    .map((w) => `${w.role} en ${w.place} (${w.period}): ${w.bullets.join(' ')}`)
    .join('\n')
  const education = dict.experience.education
    .map((e) => `${e.degree} — ${e.institution} (${e.period})`)
    .join('\n')

  const systemPrompt = `Sos "Nova", asistente conversacional del portfolio de Mateo Pavoni, Full Stack Developer.
Respondé SOLO sobre su perfil profesional, en ${lang === 'en' ? 'inglés' : 'español'}, tono cercano y breve (2-4 frases). Texto plano, sin markdown (nada de **, *, #, listas).

Stack: ${STACK}

Experiencia:
${work}

Educación:
${education}

Si piden el CV, decí que pueden descargarlo en /cv.pdf.
Si piden agendar una entrevista o contacto real, pedile nombre, email y motivo (de a uno si hace falta) y cuando tengas los tres llamá a la función schedule_interview — no la llames sin datos confirmados.
Si preguntan algo fuera de lo profesional, redirigí amablemente al tema.`

  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    {
      role: 'model',
      parts: [{ text: lang === 'en' ? 'Got it, ready to help.' : 'Entendido, lista para ayudar.' }],
    },
    ...history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
  ]

  const upstream = await fetch(`${GEMINI_STREAM_URL}?alt=sse&key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools: [SCHEDULE_TOOL] }),
  })

  if (!upstream.ok || !upstream.body) {
    console.error('[Gemini]', await upstream.text())
    return sseError(encoder, errorText)
  }

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))

      const reader = upstream.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const chunk = JSON.parse(line.slice(6))
            const part = chunk.candidates?.[0]?.content?.parts?.[0]

            if (part?.text) {
              send({ type: 'text', value: part.text })
            }

            if (part?.functionCall?.name === 'schedule_interview') {
              const parsed = scheduleArgsSchema.safeParse(part.functionCall.args)
              if (parsed.success) {
                const { name, email, reason } = parsed.data
                const { error } = await sendContactEmail({
                  name,
                  email,
                  message: `[Vía Nova] ${reason}`,
                  subject: `Pedido de entrevista vía Nova — ${name}`,
                })
                send({ type: 'scheduled', ok: !error })
              } else {
                send({ type: 'scheduled', ok: false })
              }
            }
          }
        }
      } catch (err) {
        console.error('[Nova stream]', err)
      } finally {
        send({ type: 'done' })
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  })
}

function sseError(encoder: TextEncoder, message: string) {
  const body = `data: ${JSON.stringify({ type: 'text', value: message })}\n\ndata: ${JSON.stringify({ type: 'done' })}\n\n`
  return new Response(encoder.encode(body), {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
