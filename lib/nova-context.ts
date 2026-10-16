// Fuente unica de los datos que Nova puede usar para responder (su "base de conocimiento").
// Experiencia y educacion NO viven aca: se leen en runtime de dictionaries/*.json para no duplicar.
// Si un dato no esta en este archivo ni en el diccionario, Nova no lo sabe y debe decirlo.

export const BIRTH_DATE = '2006-03-20'

export function ageOn(now: Date, birth = BIRTH_DATE) {
  const [y, m, d] = birth.split('-').map(Number)
  let age = now.getFullYear() - y
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--
  return age
}

export const LOCATION = 'Córdoba, Argentina'

export const CONTACT = {
  email: 'mateopavonint905@gmail.com',
  github: 'https://github.com/mateopavoni',
  linkedin: 'https://www.linkedin.com/in/mateopavonidev',
  site: 'https://www.mateopavoni.com.ar',
  contactForm: 'https://www.mateopavoni.com.ar/es#contacto',
}

export const STACK =
  'React, TypeScript, .NET Core (C#), Java, Spring Boot, SQL Server, MySQL, PostgreSQL, Tailwind, Angular, React Native, Expo, Node.js, Go, FastAPI, Elixir, Phoenix LiveView, Next.js, Supabase, Firebase, MongoDB, Redis, Docker, Coolify, Dokku, herramientas de IA (Claude, Gemini, Codex, OpenCode, OpenRouter, Grok)'

// Mateo orienta su perfil a estas tecnologias; Nova las pone primero cuando le preguntan por su especialidad.
export const FOCUS = 'React, .NET (C#) y Java (Spring Boot)'
  'Next.js, React, TypeScript, Tailwind, Svelte, Sass, Bootstrap, Node.js, Go, FastAPI, Java, Spring Boot, Elixir, Phoenix LiveView, Supabase, .NET Core, PHP, PostgreSQL, MySQL, MongoDB, Redis, Docker, Coolify, Dokku, Angular, Firebase, React Native, Expo, Gemini API, herramientas de IA (Claude, Gemini, Codex, OpenCode, OpenRouter, Grok)'

// Vimet App e InGlobal Agenda estan "tapados" (ver HIDDEN_IDS en ProjectsGrid.tsx): Nova no los menciona.
const PROJECT_LIST: Array<[string, string]> = [
  ['ClubCore', 'API REST en Java + Spring Boot para gestión de un club/instituto de salud, motor de estados de membresía on-demand, cupo de reservas cerrado bajo concurrencia real, resiliencia con Resilience4j'],
  ['CodeSync', 'IDE colaborativo para aprender a programar: editor Monaco sincronizado en tiempo real, 34 desafíos en 7 lenguajes con ejecución sandboxed en Docker, IA Coach vía Gemini API que da feedback sin resolver el ejercicio, y salas de pair programming en vivo, .NET 8 + Angular 20 + Firebase'],
  ['Marcovich Barbería', 'gestión de turnos de barbería, migración de legacy PHP/MySQL a Next.js + Supabase, turnero automatizado vía WhatsApp API + n8n'],
  ['CodeTlon', 'sitio institucional de su software factory, Next.js + Resend + GA4'],
  ['GC² Entrenamiento', 'sitio + dashboard CMS para un equipo de coaching deportivo, Next.js + Supabase con Row Level Security'],
  ['ChronoFlow', 'motor de workflows tipo DAG con paralelismo asíncrono real y Time-Travel Debugging, FastAPI + PostgreSQL + React Flow'],
  ['TuTienda', 'SaaS de e-commerce multi-tienda estilo Tienda Nube, microservicios en Go + MongoDB + Redis, frontend en SvelteKit'],
  ['Grúas InGlobal', 'sitio institucional con dashboard CMS, reescritura de legacy PHP a Next.js + Supabase'],
  ['TV Pro Academy', 'sitio + dashboard admin para una academia de entrenamiento individual de fútbol, Next.js + Supabase'],
  ['Vimet', 'plataforma de turnos y seguimiento clínico para un centro de nutrición y entrenamiento, migración de legacy PHP/MySQL a Next.js + Supabase con Row Level Security'],
  ['Chaos Playground', 'playground de Chaos Engineering estilo Gremlin/Chaos Monkey en Elixir + Phoenix LiveView; cada nodo del canvas es un GenServer real de OTP, matarlo desde la UI mata el proceso de verdad'],
]

export const PROJECTS = PROJECT_LIST.map(([name, blurb]) => `${name}: ${blurb}`).join('\n')
