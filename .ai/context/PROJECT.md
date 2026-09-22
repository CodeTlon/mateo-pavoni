# PROJECT.md — mateo-pavoni

## Qué es

Portfolio personal de Mateo Pavoni (desarrollador, CodeTlon). Landing single-page, bilingüe (es/en), sin backend propio más allá de dos integraciones externas puntuales (Resend para email, Gemini para el chat "Nova"). Producción real en `https://www.mateopavoni.com.ar`.

## Para quién

Visitantes que evalúan contratar/contactar a Mateo — reclutadores, clientes potenciales, colegas. El sitio funciona como CV interactivo + muestrario de proyectos.

## Qué problema resuelve

- Presentar stack, experiencia y proyectos de forma navegable en dos idiomas.
- Dar un canal de contacto directo (form → Resend) sin depender de terceros (LinkedIn, mail manual).
- Ofrecer una forma conversacional de explorar el perfil (bot "Nova") que además puede agendar una entrevista/contacto de forma proactiva vía function calling, sin que el visitante tenga que llenar el form tradicional.
- SEO/AEO: además de SEO clásico (sitemap, JSON-LD, `robots.ts`), el sitio publica `public/llms.txt` pensado para que LLMs externos (buscadores de IA) puedan citar el perfil directamente — no es contexto para agentes de desarrollo, es contenido para agentes de búsqueda de terceros.

## Alcance

Single page (`app/[lang]/page.tsx`), sin dashboard, sin login, sin roles, sin base de datos. Todo el "estado" real que persiste entre visitas vive en `localStorage` del navegador del visitante (historial de chat de Nova) o en el buzón de Resend (emails enviados) — no hay ningún dato de negocio que el propio sitio almacene server-side.
