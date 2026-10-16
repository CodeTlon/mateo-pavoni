<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# mateo-pavoni

> ⚠️ **Este proyecto está EN PRODUCCIÓN**, sirviendo tráfico real en `www.mateopavoni.com.ar` (auto-deploy en push/merge a `main` vía Vercel Git Integration — verificado, no asumido). Nunca ejecutes nada que mute datos reales (Resend, variables de entorno de Vercel, DNS/dominios) sin confirmación explícita del usuario. Leer/inspeccionar producción está bien; escribir no. Antes de asumir cómo se despliega algo, verificalo contra `vercel`/`gh api` reales — la documentación puede estar desactualizada.

Portfolio personal (L1, single-page) de Mateo Pavoni, bilingüe es/en. Sin base de datos. Dos integraciones externas reales: **Resend** (emails del form de contacto) y **Gemini 2.5 Flash vía REST** (bot de chat "Nova", con function calling que puede disparar un email real).

## Stack

- **Next.js 16.4.2** (App Router) + React 19.3.1 + TypeScript 6
- Tailwind CSS 4 (tokens en `@theme`, sin `tailwind.config`) + Lucide React. Versiones de la flota: `codetlon-cloud/.claude/modules/stack-versions.md`
- i18n propio vía `app/[lang]/` (`es` default, `en`) + `proxy.ts` (Next 16 usa `proxy.ts`, **no** `middleware.ts`)
- Dark mode: `ThemeProvider` (patrón next-themes)
- Sin Supabase / sin DB
- Resend (contacto) + Gemini REST sin SDK (Nova)
- Fuentes: Space Grotesk (headings) + Inter (body) vía `next/font`

## Comandos básicos

```bash
npm run dev      # dev server
npm run build    # build de producción
npm start        # serve del build (para Lighthouse)
npm run lint     # ESLint 10 (config plana; las reglas nuevas de React estan como aviso)
npx tsc --noEmit # chequeo de tipos sin emitir
```

## Convenciones críticas (verificadas, no asumidas)

- **Todo texto va en `dictionaries/es.json` / `en.json`**, nunca hardcodeado en el componente — excepción real conocida hoy: dos `aria-label` en `components/Navbar.tsx` quedaron fijos en un idioma (ver `.ai/context/KNOWN_ISSUES.md` #6). No repetir ese patrón.
- `proxy.ts` es el middleware de Next 16 real (no `middleware.ts`). Maneja el redirect de locale.
- `lib/utils.ts` expone `cn()` (clsx + tailwind-merge) — usarlo para cualquier componente nuevo en `components/ui/`.
- No usar `@apply group` / `@apply peer` en CSS.
- Formulario de contacto usa `useFormState` de `react-dom` (no `useActionState`).
- Patrón "mounted flag" (`useEffect(() => setX(true), [])`) es intencional en varios componentes (hidratación diferida) y dispara warnings aceptados de `react-hooks/set-state-in-effect` en `npm run lint` — no es un bug a "arreglar" sin criterio.
- El helper `sendContactEmail` (`app/actions/contact.ts`) es compartido entre el form de contacto y Nova (function calling `schedule_interview`) — cualquier cambio ahí afecta ambos flujos.
- Antes de tocar CSP (`next.config.mjs`), leer el comentario propio del archivo: `unsafe-inline` es una decisión consciente documentada, no un descuido.

## Para más contexto

Ver `.ai/context/00_INDEX.md` — índice de qué archivo leer según el tipo de tarea (arquitectura/deploy, seguridad, dominio, convenciones, decisiones tomadas, estado actual, issues conocidos con severidad, preguntas abiertas).

Nota: existe también `.claude/CLAUDE.md` (+ `ARCHITECTURE.md`, `TASKS.md`) con el workflow de mantenimiento de sesiones Claude Code (`/cambio`→`/cerrar`) — es un sistema paralelo, más antiguo, y quedó desactualizado respecto al HEAD real (ver `.ai/context/OPEN_QUESTIONS.md`). Para contexto técnico verificado y vigente, preferir `.ai/context/`.
