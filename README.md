# Portfolio de Mateo Pavoni

Portfolio bilingue (es/en) de Mateo Pavoni, desarrollador full stack: https://www.mateopavoni.com.ar. Incluye el widget de chat "Nova" (Gemini, con base de conocimiento cerrada) y un formulario de contacto por Resend.

## Stack
Next.js 16.4.2 (App Router) · React 19.3.1 · TypeScript 6 · Tailwind CSS 4.3.3 (tokens en `@theme` de `app/globals.css`, sin `tailwind.config`) · Resend + React Email · Zod 4. i18n propio en `app/[lang]/` con `proxy.ts` (Next 16). Versiones de la flota: `codetlon-cloud/.claude/modules/stack-versions.md`.

**Deploy: Vercel.** Es de los pocos proyectos que van a Vercel porque **no tiene backend propio** (sin base de datos ni archivos): los proyectos con backend van a Coolify. Auto-deploy en push a `main`.

## Desarrollo
```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint 10 (config plana)
npx tsc --noEmit
npm run build
```
Variables de entorno (Resend y Gemini) solo en Vercel y en `.env.local`; nunca en el repo.

## Ramas
`feature/*` -> `dev` -> `test` (merge directo) -> PR a `main` (produccion, con OK de Mateo).

## Documentacion para sesiones de IA
[`AGENTS.md`](AGENTS.md), [`ARCHITECTURE.md`](ARCHITECTURE.md) y [`.ai/context/`](.ai/context/00_INDEX.md).

## Changelog

| Fecha | Cambio |
|-------|--------|
| 2026-06-02 | feat: agrego proyectos al portfolio (CodeTlon, GC², MasiPhone v2) + "Próximo proyecto" como banner full-width; descripciones es/en |
| 2026-07-11 | chore: headers de seguridad (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) + feat: loading/error states progresivos (skeleton bento + fallback branded es/en) |
| 2026-07-27 | feat: reemplazo MasiPhone por ChronoFlow, TuTienda e InGlobal en el grid de proyectos (descripciones es/en) + amplío tech stack (Svelte, Go, FastAPI, PostgreSQL, Redis) + actualizo screenshots (CodeTlon, GC², Marcovich) + saco banner "Vimet" del placeholder de próximo proyecto |
| 2026-07-27 | fix: recorto screenshots a 1920x1040 exacto (sacaba bordes negros por letterbox) + vuelvo a poner Vimet desenfocado como placeholder + logos/favicon visibles en modo oscuro + feat: toggle de tema con animación View Transitions aleatoria (4 estilos, portado de theme-toggle.rdsx.dev) |
| 2026-07-27 | fix: saco etiqueta "Full Stack Developer" del hero + favicon dark mode de Electric Blue a blanco |
| 2026-07-29 | fix: bullet Encode (C#/.NET) + agrego React al tech stack + Coderhouse a educación + feat: widget de chat "Nova" (Gemini 2.5 Flash) |
| 2026-07-29 | fix: borde negro real en screenshots de proyectos (era el hairline del panel, no un tema de aspect ratio) + feat: Nova ahora responde en streaming, agenda entrevistas de verdad (manda mail real) y recuerda la charla entre visitas |
| 2026-07-31 | feat: agrego Chaos Playground y ClubCore al grid de proyectos (descripciones es/en, tags de stack) |
| 2026-10-15 | feat: puesto actual Junior Full Stack en AR IT Services (es/en, JSON-LD `worksFor`, llms.txt), freelance cerrado en Sep 2026; Nova con base de conocimiento cerrada (`lib/nova-context.ts`), `systemInstruction`, validación de body, `thinkingBudget: 0`, API key por header y evento `error`; sección Credenciales (`components/sections/Credentials.tsx`, 23 credenciales como lista; oculta si `credentials.items` queda vacío) |
| 2026-10-16 | chore: estandar de versiones de la flota (Next 16.4.2, React 19.3.1, Zod 4.6.7, Resend 6.33, ESLint 10.13.0, `@types/node` 22, Tailwind 4.3.3 exacto). `react-hooks/set-state-in-effect` pasa de error a aviso (3 componentes con el patron de hidratacion; el lint ya estaba rojo antes del cambio). `npm audit --omit=dev` en 0; el audit completo conserva solo `braces` (cadena de `eslint-config-next`, sin parche publicado). Verificado: `tsc`, lint (0 errores, 3 avisos) y build. **Sin verificar:** comparacion visual en navegador ni deploy de Vercel con esta version. |
