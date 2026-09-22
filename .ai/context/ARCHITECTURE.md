# ARCHITECTURE.md — mateo-pavoni

Todo lo de este archivo fue verificado en la auditoría del 2026-09-18 contra código/config/git/`vercel` CLI/`gh api` reales, no contra documentación previa. Ver [[OPEN_QUESTIONS]] para lo que quedó como UNKNOWN.

## Stack

- **Next.js 16.x** (App Router) + React 19 + TypeScript
- Tailwind CSS + Lucide React
- i18n propio: `app/[lang]/` + `proxy.ts` (Next 16 renombró `middleware.ts` → `proxy.ts`) + `dictionaries/{es,en}.json`
- `next-themes`-style `ThemeProvider` para dark mode
- Sin Supabase, sin ninguna base de datos
- **Resend** — envío de emails (form de contacto + notificaciones de Nova)
- **Gemini 2.5 Flash vía REST directa** (`fetch`, sin SDK) — bot "Nova", streaming SSE + function calling
- Google Analytics 4 + Consent Mode v2 (`components/ui/GoogleAnalytics.tsx`), condicional a que `NEXT_PUBLIC_GA_ID` esté seteado con un valor real (no el placeholder `G-XXXXXXXXXX`)

## Cadena de deploy real (Fase 0 — reconstruida con evidencia, no asumida)

```
push/merge a `main`  (github.com/CodeTlon/mateo-pavoni)
        │
        ▼
Vercel Git Integration
  proyecto: "mateo-pavoni" · team: CodeTlon (scope mateo-pavonis-projects)
  projectId: prj_1CJNJt7Aqi4hZPlo53kJcDZ8EGxZ
        │  build command: `npm run build` / `next build` · Node 24.x (confirmado con `vercel project inspect`)
        ▼
Deployment "Production" → alias mateo-pavoni-git-main-mateo-pavonis-projects.vercel.app
        │
        ▼
Dominio custom: https://www.mateopavoni.com.ar
```

**Evidencia del auto-deploy** (no es una suposición): correlación temporal exacta entre commits y deployments —
- commit `5c3e518` (2026-09-06 19:14:51) ↔ deployment creado 19:14:56 (5s después)
- commit `1a5d140` (2026-09-10 00:51:53) ↔ deployment 00:55:10 (~3min, tiempo de build)

**No hay GitHub Actions ni script de deploy custom** (`.github/workflows/` no existe, `package.json` no tiene `postinstall` ni script de deploy propio) — el pipeline completo vive en la integración nativa Git↔Vercel.

**Ramas no-`main`** (`dev`, `feature/*`, `fix/*`) generan **Preview deployments**, no producción — confirmado con `vercel ls` (deployments históricos marcados "Preview").

**Ambientes — variables de entorno reales** (`vercel env ls`, nombres únicamente, sin exponer valores):

| Variable | Production | Preview |
|---|---|---|
| `RESEND_API_KEY` | ✅ | ✅ |
| `RESEND_FROM_EMAIL` | ✅ | ✅ |
| `COMPANY_EMAIL` | ✅ | ✅ |
| `GEMINI_API_KEY` | ✅ | ❌ |
| `NEXT_PUBLIC_GA_ID` | ✅ | ❌ |

Consecuencia práctica: en un Preview deployment (rama de feature), **Nova no funciona** (falta la key de Gemini) y **GA4 no se activa** — solo el form de contacto funciona igual que en producción. Tenerlo en cuenta al probar features de Nova en una rama: no vas a poder probarlas en Preview, solo local (`.env.local`) o mergeado a `main`.

**No hay archivos `.env.production`/`.env.staging`/`.env.development`** en el repo — toda la separación de ambientes vive en el dashboard de Vercel, no en archivos versionados.

**Dominio**: hardcodeado en `app/sitemap.ts` y `app/robots.ts` como `https://mateopavoni.com.ar` (sin lógica condicional por `VERCEL_ENV`). Hubo una migración de dominio anterior (`.dev` → `.com.ar`, commit `4e11d8d`) — si se vuelve a mover de dominio, estos dos archivos son los que hay que tocar.

**Mecanismo exacto de la integración** (GitHub App instalada a nivel org vs. webhook clásico de repo): queda como **UNKNOWN** — `gh api repos/CodeTlon/mateo-pavoni/hooks` devolvió `[]` (no es un webhook clásico visible) y no hubo permisos de token para listar `installations` de GitHub Apps. El *efecto* (auto-deploy real) está confirmado igual, por la evidencia de timestamps de arriba.

## Route handlers y Server Actions — mapa completo

Verificado exhaustivamente (no hay ningún endpoint oculto):

- **`app/api/nova/route.ts`** — único Route Handler del proyecto. Streaming SSE real hacia `generativelanguage.googleapis.com` (Gemini 2.5 Flash), function calling (`schedule_interview`), rate limiting in-memory por IP (15 req/10min, con limitación conocida — ver [[KNOWN_ISSUES]] #3). Same-origin, sin CORS explícito (correcto para el caso de uso: no hay ningún cliente de terceros que necesite llamarlo).
- **`app/actions/contact.ts`** (`'use server'`) — único archivo con Server Actions. Exporta `sendContactEmail` (helper compartido, usado también por Nova) y `sendContact` (la Server Action real detrás del formulario de `components/sections/Contact.tsx`).

**Nota de corrección de documentación:** el `ARCHITECTURE.md` legacy de este repo (no este archivo) afirma *"Sin `app/api/**/route.ts` ni Supabase: no hay CORS ni RLS que mantener"* — eso es **falso hoy** (existe `app/api/nova/route.ts` desde hace varios commits). Ese archivo legacy no se tocó en esta auditoría por decisión explícita del usuario; queda anotado en [[OPEN_QUESTIONS]].

## Bot "Nova" — qué es real y qué es guionado (verificado línea por línea)

Hay **dos superficies distintas** que se llaman "Nova" y es fácil confundirlas:

1. **`components/NovaChat.tsx` + `app/api/nova/route.ts` → 100% real.**
   - El widget hace `fetch('/api/nova', ...)` y lee la respuesta como stream real (`res.body.getReader()`), no simulado.
   - El Route Handler llama de verdad a la REST API de Gemini con streaming SSE (`?alt=sse`), parsea los eventos y los reenvía al cliente.
   - Function calling real: si el usuario da nombre+email+motivo y Gemini decide invocar `schedule_interview`, el handler llama a `sendContactEmail` (mismo Resend que el form) y **manda un email de verdad** a `COMPANY_EMAIL`.
   - Historial persiste en `localStorage` (`nova-chat-history`) con TTL de 6h — no hay sesión server-side.
   - Rate limiting real (débil, ver [[KNOWN_ISSUES]] #3) y guardrails anti-prompt-injection extensos en el system prompt.

2. **`components/sections/ProjectsGrid.tsx` ("Preguntale a Nova sobre mis proyectos") → 100% local, sin llamar a ninguna API.**
   - Es una máquina de estados (`thinking` → `intro` → `nova` → `card`) manejada enteramente con `useState`/`useEffect`/`setTimeout`.
   - "Tipea" letra por letra textos que **ya vienen completos** de `dictionaries/{es,en}.json` (`nova_intro`, `nova_project_lines`, `nova_group_line`, y la descripción de cada proyecto) — es una animación de efecto máquina de escribir sobre contenido estático, no una generación real.
   - Esto **no es un mock oculto**: está documentado como decisión explícita en el historial de commits del repo (ver [[DECISIONS]]). Se señala acá para que quien lea el código no asuma que también llama a Gemini.

## Mapa de archivos clave (vigente, incluye lo que la doc legacy no tenía)

| Archivo | Rol |
|---|---|
| `proxy.ts` | Middleware Next 16 real — redirect `/` → `/es`/`/en` por `Accept-Language`. Matcher excluye `_next`, `/api`, archivos con extensión. |
| `app/[lang]/layout.tsx` | Layout localizado — Navbar, Footer, ThemeProvider, fuentes, NovaChat |
| `app/[lang]/page.tsx` | Single page, bento grid de secciones |
| `app/[lang]/dictionaries.ts` | Loader `server-only` de dictionaries por locale |
| `app/actions/contact.ts` | `sendContact` (Server Action del form) + `sendContactEmail` (helper compartido con Nova) |
| `app/api/nova/route.ts` | Route Handler de Nova — streaming SSE + function calling real |
| `components/NovaChat.tsx` | Widget flotante del chat real |
| `components/sections/ProjectsGrid.tsx` | Grid de proyectos + narración local guionada (no real) |
| `components/sections/Contact.tsx` | Form de contacto (validación solo client-side, ver [[KNOWN_ISSUES]] #1) |
| `components/seo/JsonLd.tsx` | JSON-LD estático para SEO (no input de usuario) |
| `components/ui/GoogleAnalytics.tsx` | GA4 + Consent Mode v2, condicional a `NEXT_PUBLIC_GA_ID` real |
| `components/ui/CookieConsent.tsx` | Banner de cookies, mismo gate que GA4 |
| `components/ui/{ShareButton,StickyMobileCta,BackToTop,skeleton}.tsx` | UI misceláneo |
| `components/{RainingLetters,ScrambleText,HtmlLang}.tsx` | Efectos visuales / helper de `<html lang>` |
| `emails/ContactTemplate.tsx` | Plantilla real de email (`@react-email/render`), usada por `sendContactEmail` |
| `public/llms.txt` | Contexto para LLMs externos de búsqueda (AEO/GEO) — no es contexto de desarrollo |
| `next.config.mjs` | Headers de seguridad (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP) — único archivo de config de Next |
| `lib/utils.ts` | `cn()` (clsx + tailwind-merge), `simpleIcon()` |

## Auth / autorización

No existe ninguna capa de autenticación ni autorización en este proyecto — no hay login, no hay roles, no hay rutas protegidas ni dashboard. El único control de acceso relevante es el rate limiting in-memory de Nova (débil, ver [[KNOWN_ISSUES]] #3) y la ausencia total de rate limiting en el Server Action de contacto (ver [[KNOWN_ISSUES]] #1). No aplica el patrón "chequeo solo en UI, no en servidor" en el sentido de auth — pero sí aplica en un sentido distinto y real: el historial de chat de Nova es una fuente de "confianza" que el servidor no re-valida (ver [[KNOWN_ISSUES]] #2).
