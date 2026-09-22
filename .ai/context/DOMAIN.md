# DOMAIN.md — mateo-pavoni

No hay base de datos. El "modelo de datos" de este proyecto es enteramente contenido estático + shapes de datos en código, más una única regla de negocio real con efecto secundario externo (enviar un email). Ver [[ARCHITECTURE]] para dónde vive cada pieza.

## Dictionaries (`dictionaries/es.json`, `dictionaries/en.json`)

Fuente única de verdad para todo texto visible. Verificado programáticamente: **ambos archivos son estructuralmente simétricos**, mismas claves anidadas en ambos, sin claves huérfanas de un lado ni del otro. Cualquier texto nuevo va acá, en ambos idiomas a la vez — ver excepción real conocida en [[KNOWN_ISSUES]] #6 (dos `aria-label` que no siguen esta regla).

Secciones relevantes del dictionary:
- `hero`, `experience`, `projects` (incluye `nova_intro`, `nova_project_lines`, `nova_group_line`, `items.*` con descripción por proyecto)
- `chat.*` — todos los textos/prompts de UI de Nova
- `contact.*` — labels y mensajes de validación del form

## Proyectos (`components/sections/ProjectsGrid.tsx`)

Array de items en código (no en dictionary, salvo la descripción de cada uno vía `dictKey`). Shape aproximado por item: `{ id, dictKey, image?, tech[], groupId? }`. `groupId` agrupa proyectos relacionados (ej. varios hechos con Next.js/TS) para que la narración de "Nova" (guionada, ver [[ARCHITECTURE]]) los presente como un solo bloque en vez de repetir la misma frase por cada uno.

## Regla de negocio real: envío de email

Hay un único flujo con efecto secundario real en todo el proyecto — mandar un email vía Resend — y dos caminos que llegan a él:

1. **Form de contacto** (`components/sections/Contact.tsx` → `sendContact` en `app/actions/contact.ts`): usuario llena nombre/email/mensaje → validación Zod → `sendContactEmail`.
2. **Nova / function calling** (`app/api/nova/route.ts`): si durante la conversación el usuario da nombre+email+motivo y Gemini decide que están "confirmados", invoca la tool `schedule_interview` → el handler valida con Zod → llama al mismo `sendContactEmail`.

En ambos casos el destino (`to`) es siempre `COMPANY_EMAIL` (fijo, configurado por env var) — nunca una dirección provista por el usuario. Esto acota el impacto de cualquier abuso al buzón del dueño del sitio, no habilita relay de spam hacia terceros. Ver [[KNOWN_ISSUES]] #1 y #2 para los dos vectores de abuso reales sobre este flujo (uno por cada camino de entrada).

## i18n como regla de dominio

El locale (`es`/`en`) determina no solo el texto sino el comportamiento de algunos flujos: el mensaje de error de `sendContact` se arma en el idioma correspondiente (antes hardcodeado en español sin importar el locale — ya corregido, comentario visible en `app/actions/contact.ts:12`), y `Intl.ListFormat` en `ProjectsGrid.tsx` usa el `lang` recibido para formatear listas de tecnologías de forma nativa por idioma.
