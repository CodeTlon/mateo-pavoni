# CURRENT_STATE.md — mateo-pavoni

Estado verificado el 2026-09-18 (HEAD `1a5d140`), no inferido de documentación previa.

## Completo y real

- Formulario de contacto → Resend (email real).
- Nova (chat) → Gemini real, streaming SSE real, function calling real que dispara email real.
- i18n es/en completo, dictionaries simétricos.
- Headers de seguridad (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP) en `next.config.mjs`.
- GA4 + Consent Mode v2 + banner de cookies (condicionales a `NEXT_PUBLIC_GA_ID` real).
- SEO: JSON-LD, sitemap multi-idioma, `robots.ts`, `public/llms.txt`.
- Dark mode con transición animada (`document.startViewTransition`).
- `public/cv.pdf` existe (confirmado en disco) — el link de descarga de Nova/CV apunta a un archivo real, no roto.

## Mockeado / guionado intencionalmente (no es deuda, es decisión de producto)

- **`ProjectsGrid.tsx`** — la narración "Preguntale a Nova sobre mis proyectos" es 100% local (`setTimeout`+`useEffect`), no llama a ninguna API. Ver [[ARCHITECTURE]] y [[DECISIONS]].

## Estado de build/lint (verificado hoy, comandos de solo lectura)

- `npx tsc --noEmit` → **limpio**, sin errores de tipos.
- `npm audit` → **0 vulnerabilidades** (info/low/moderate/high/critical todos en 0), 480 dependencias totales. Nota: esto es una foto del advisory database de npm al momento de correr el comando, no una garantía permanente — re-correr periódicamente, sobre todo con `next@16.x` tan reciente.
- `npm run lint` → **3 warnings** de `react-hooks/set-state-in-effect` (`Navbar.tsx:20`, `NovaChat.tsx:65`, `RainingLetters.tsx:25`) — patrón "mounted flag" intencional, ver [[CONVENTIONS]]. No sale "limpio" en sentido estricto, pero no son bugs.

## Pendiente / no evaluado en esta auditoría

- No se corrió Lighthouse ni se evaluó performance real.
- No se corrieron los tests E2E (`npx playwright test`) como parte de esta auditoría — fuera de alcance (era documentación, no verificación funcional end-to-end).
- Ver [[OPEN_QUESTIONS]] para lo que quedó como UNKNOWN explícito.
