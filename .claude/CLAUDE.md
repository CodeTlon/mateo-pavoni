# mateo-pavoni — Project Context

> **Contexto de sesión para Claude Code.**
> Al iniciar: leer este archivo + `ARCHITECTURE.md` + `TASKS.md`.
> Sesión de mantenimiento: `/cambio "<tema>"` abre la rama; cada prompt commitea ahí (sin coautor, sin tocar main); `/cerrar` mergea/pushea/tagea cuando lo pidas.
> Al cerrar: fila(s) en el **Changelog del README.md (raíz)** + fila en Historial de Cambios acá. Si hubo cambios estructurales → editar la sección + ARCHITECTURE.md.

---

## Identidad del Proyecto
- **Cliente:** Mateo Pavoni (portfolio personal)
- **Tipo:** L1 — Landing / single-page portfolio (con i18n es/en)
- **Generado:** 2026-05-05
- **URL Producción:** pendiente
- **Repo GitHub:** CodeTlon/mateo-pavoni
- **Deploy:** Vercel

## Stack
- **Next.js 16.2** (App Router) + React 19 + TypeScript
- Tailwind CSS + Lucide React
- **i18n propio** vía `app/[lang]/` (locales `es` default + `en`) + `proxy.ts` (redirect por Accept-Language)
- Dark mode vía `ThemeProvider` (next-themes pattern)
- Supabase: **no**
- Resend: **sí** — formulario de contacto (sin DB)
- Fuentes: Space Grotesk (headings/labels) + Inter (body) vía `next/font`

## Mapa de Archivos Clave
| Archivo | Rol |
|---------|-----|
| `proxy.ts` | Middleware Next 16: redirige `/` → `/es` o `/en` según Accept-Language |
| `app/layout.tsx` | Root layout (html/body, providers globales) |
| `app/page.tsx` | Raíz no-localizada (redirect/fallback al locale) |
| `app/[lang]/layout.tsx` | Layout localizado — Navbar, Footer, ThemeProvider, fuentes, metadata |
| `app/[lang]/page.tsx` | Single page — bento grid de secciones (localizado) |
| `app/[lang]/dictionaries.ts` | Loader de diccionarios por locale |
| `dictionaries/es.json` / `en.json` | Textos traducidos |
| `app/actions/contact.ts` | Server Action `sendContact` (form) + `sendContactEmail` (helper compartido, también usado por `app/api/nova/route.ts`) |
| `app/api/nova/route.ts` | Route Handler del bot "Nova" — streaming SSE desde Gemini REST (`fetch`, sin SDK) + function calling (`schedule_interview`) que dispara `sendContactEmail` de verdad |
| `components/NovaChat.tsx` | Widget flotante bottom-right (bento-independiente, vive en `app/[lang]/layout.tsx`) — UI del chat "Nova", lee el stream con `ReadableStream`, persiste historial en `localStorage` |
| `components/Navbar.tsx` | Nav glassmorphism fijo (incluye switch de idioma/tema) |
| `components/Footer.tsx` | Footer + CodeTlonBadge |
| `components/ThemeProvider.tsx` | Provider de dark/light mode |
| `components/Avatar.tsx` | Avatar del hero |
| `components/sections/HeroCard.tsx` | Bento card — About Me |
| `components/sections/TechStack.tsx` | Bento card — tech stack |
| `components/sections/ProjectsGrid.tsx` | Proyectos portfolio |
| `components/sections/Experience.tsx` | Historial / About CodeTlon |
| `components/sections/Contact.tsx` | Bento card — formulario contacto |
| `app/sitemap.ts` / `app/robots.ts` | SEO técnico |
| `app/[lang]/loading.tsx` | Skeleton (bento-shaped) mientras carga la ruta localizada |
| `app/[lang]/error.tsx` | Error boundary de la ruta — fallback branded bilingüe (es/en) |
| `app/global-error.tsx` | Error boundary raíz — solo si falla el propio `app/layout.tsx` |
| `components/ui/skeleton.tsx` | Componente shadcn `Skeleton` (primer componente de `components/ui/` en este proyecto) |
| `lib/utils.ts` | Helper `cn()` (clsx + tailwind-merge) para `components/ui/*` |

## Variables de Entorno
```
RESEND_API_KEY=
RESEND_FROM_EMAIL=
COMPANY_EMAIL=mateopavonint905@gmail.com
GEMINI_API_KEY=
```
Ver `.env.example` para el listado completo.

## Diseño — Decisiones Clave
- **Sistema:** Glacial Logic — estilo "high-precision terminal"
- **Paleta:** primary `#091426` · background `#fbf8fa` (Ice White) · accent `#39b8fd` (Electric Blue)
- **Tipografía:** Space Grotesk (display/headings/labels) / Inter (body)
- **Secciones en orden:** Navbar → Hero+TechStack → Projects → Experience+Contact → Footer
- **Estilo general:** Minimalism + Glassmorphism, Bento Grid, grain texture, hover glow Electric Blue
- **Bento logic:** hero spans 8 cols, tech stack 4 cols, projects full 12 cols, experience 8 + contact 4

## Quirks y Advertencias
- **Config de Next consolidada en `next.config.mjs`** (images/formats/deviceSizes/headers). Se eliminó el `next.config.ts` (era un stub vacío que en Next 16 podía ganar prioridad y dejar sin efecto la config de imágenes). Hay un único archivo de config.
- **Headers de seguridad en `next.config.mjs`** (`headers()`): HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`. HSTS asumido seguro porque el deploy es Vercel (HTTPS-only).
- **Sin Supabase en este proyecto.** Sí hay un route handler (`app/api/nova/route.ts`, ver abajo) — es same-origin, sin CORS que auditar. Si se agrega Supabase más adelante, retomar `security-owasp.md` §5 de codetlon-cloud.
- **Bot "Nova"** (`components/NovaChat.tsx` + `app/api/nova/route.ts`): widget de chat que responde sobre el perfil de Mateo. Gemini 2.5 Flash directo por `fetch` a la REST API con streaming SSE (`GEMINI_API_KEY`, sin SDK — ladder de ponytail, `fetch` ya alcanza; el route handler existe porque streaming real desde una Server Action requiere el SDK de Vercel AI, esto lo evita). Contexto del bot se arma en runtime desde `dict.experience` (no hay duplicación de datos). Historial de charla persiste en `localStorage` del cliente (clave `nova-chat-history`), no hay backend de sesión. Function calling real: si el usuario pide agendar/contactar y da nombre+email+motivo, Gemini llama a `schedule_interview` y el route handler dispara `sendContactEmail` (mismo Resend que el formulario de Contact) — manda un mail de verdad, no es un mock. Sin CV en PDF real todavía — si piden el CV el bot linkea a `/cv.pdf`, hay que subir ese archivo a `public/` para que el link funcione.
- **`components/ui/` nace en esta sesión** (antes no existía ningún componente shadcn en el repo) con `skeleton.tsx` + `lib/utils.ts` (`cn()`, requiere `clsx` + `tailwind-merge`, agregados como deps). Nuevos componentes shadcn deben seguir el mismo patrón (`cn()` desde `lib/utils`).
- i18n: las rutas viven bajo `app/[lang]/`. Todo texto nuevo va en `dictionaries/es.json` + `en.json`, nunca hardcodeado en el componente.
- `proxy.ts` es el middleware de Next 16 (no `middleware.ts`). Maneja el redirect de locale.
- Grain texture via CSS `::before` con SVG data-uri — no usar imagen externa.
- Bento cards: `border: 1px solid rgba(30, 41, 59, 0.05)` + hover glow `0 0 20px rgba(57, 184, 253, 0.15)`. Ese hairline de `.panel` es el que se veía como "borde negro" en los screenshots de proyectos con fondo claro (InGlobal/TuTienda/ChronoFlow) — invisible en los de fondo oscuro solo por casualidad de color, no por ningún bug de aspect ratio. Fix: `.panel.shot { border-color: transparent }` en `globals.css`, clase `shot` agregada al contenedor de imagen en `ProjectsGrid.tsx` — el hover glow (`.panel:hover`) sigue andando igual.
- Navbar usa `backdrop-blur-lg + bg-white/80` — glassmorphism.
- No usar `@apply group` o `@apply peer` en CSS (Bug 3 del FOS).
- Formulario usa `useFormState` de `react-dom` (NO `useActionState`).

## Comandos Rápidos
```bash
npm run dev          # Dev server
npm run build        # Build producción
npm start            # Serve producción (para Lighthouse)
npm run lint         # ESLint
npx playwright test  # Tests E2E
```

## Historial de Cambios
| Fecha | Rama | Cambio |
|-------|------|--------|
| 2026-05-05 | main | chore: initial setup — Next.js + git + deps |
| 2026 | main | feat: i18n es/en (`app/[lang]` + `proxy.ts` + dictionaries) + dark mode |
| 2026 | main | fix: meta de la página + descripción en inglés |
| 2026-06-02 | main | feat: nuevos proyectos en la grilla (CodeTlon, GC², MasiPhone v2) + "Próximo proyecto" full-width; ProjectsGrid mapea descripción por `dictKey` |
| 2026-07-11 | chore/security-headers-loading-states | chore: headers de seguridad (HSTS/nosniff/X-Frame-Options/Referrer-Policy/Permissions-Policy) en `next.config.mjs`; CORS y RLS auditados y sin cambios (no hay route handlers ni Supabase); feat: loading.tsx + error.tsx (`app/[lang]`) + global-error.tsx con skeleton `components/ui/skeleton.tsx` (primer componente shadcn del repo) |
| 2026-07-27 | feat/portfolio-projects-update | feat: `ProjectsGrid.tsx` reemplaza MasiPhone por ChronoFlow, TuTienda e InGlobal (+ dictionaries es/en); `TechStack.tsx` suma Svelte, Go, FastAPI, PostgreSQL, Redis; chore: screenshots actualizados (CodeTlon, GC², Marcovich); banner "próximo proyecto" (`coming_soon`) vuelve a avatar-letra sin screenshot (se sacó `vimet-desarollo.png`, ya no representa un proyecto activo) |
| 2026-07-27 | fix/screenshot-borders-vimet-back | fix: todos los screenshots de proyectos recortados a 1920x1040 exacto vía sharp (el mismatch de aspect ratio dejaba bordes bgColor —casi siempre negro— asomando en `object-contain`); Vimet vuelve al placeholder "próximo proyecto" (`vimet-desarollo.png`, el `vimet.png` nuevo se perdió, no está en git); `TechStack.tsx` marca `invert: true` en Next.js/Vercel/Resend (marcas negras por defecto) → `dark:invert` para que no desaparezcan en dark mode; favicon dark-mode vía `icons.icon[]` con `media: prefers-color-scheme` (`public/favicon-dark.png`, mismo isotipo MP recoloreado); `Navbar.tsx` ThemeToggle usa `document.startViewTransition` + `flushSync(setTheme)` con 4 estilos de wipe CSS (`[data-vt]` en `globals.css`, ported de theme-toggle.rdsx.dev) elegidos al azar por click, respeta `prefers-reduced-motion` |
| 2026-07-27 | fix/hero-badge-favicon-white | fix: `HeroCard.tsx` saca el `<span>{dict.badge}</span>` ("Full Stack Developer") arriba del h1 — key `hero.badge` eliminada de `dictionaries/es.json` y `en.json`; `public/favicon-dark.png` recoloreado de Electric Blue a blanco puro |
| 2026-07-29 | main | fix: bullet Encode (C#/.NET) en `dictionaries` es/en + React en `TechStack.tsx` (frontend) + Coderhouse (2025—2026) en `experience.education`; fix: `ProjectsGrid.tsx` cambia `object-contain`→`object-cover` en screenshots (gap de redondeo sub-pixel dejaba ver un borde negro contra bordes claros del screenshot en InGlobal/TuTienda/ChronoFlow, invisible en los demás por casualidad de color); feat: bot "Nova" — `app/actions/chat.ts` (Server Action, Gemini 2.5 Flash vía fetch) + `components/NovaChat.tsx` (widget flotante en `app/[lang]/layout.tsx`), agrego `chat.*` a dictionaries es/en y `GEMINI_API_KEY` a `.env.example`; chore: nuevo hook global `SessionEnd` (`~/.claude/settings.json` + `~/.claude/scripts/kill-orphan-dev-servers.ps1`) que mata dev servers Next/Vite huérfanos bajo CODETLON FACTORY al cerrar sesión de Claude Code (no afecta este repo puntualmente, es infra de todo el factory) |
| 2026-07-31 | main | feat: `ProjectsGrid.tsx` suma Chaos Playground (Elixir/Phoenix LiveView/OTP, screenshot `/chaos-playground.png` reusado de `docs/screenshots/canvas-dark.png` del repo del proyecto) y ClubCore (Java/Spring Boot/Resilience4j, sin screenshot — cae al placeholder de letra) antes de la card "próximo proyecto"; dictionaries es/en suman `projects.items.chaos_playground` y `.clubcore` |
| 2026-08-03 | main | fix: saca badge "CodeTlon Labs" del footer; Nova anima el cierre del panel igual que la apertura (delay de desmonte + `chat-panel-out` keyframe, respeta `prefers-reduced-motion`); feat: `ProjectsGrid.tsx` pasa de lista alternada a grid de cards (3 col) con filtro por tecnología (pills, client component) — los tags dejan de mostrarse como chips/logos en la card, quedan solo como criterio de filtro; nuevo `simpleIcon()` en `lib/utils.ts` (extraído de `TechStack.tsx`, reusable) |
| 2026-08-03 | main | feat: el grid+filtro de Proyectos no convenció — `ProjectsGrid.tsx` vuelve al formato lista alternada imagen/texto original, ahora gatillado por un botón "Preguntale a Nova sobre mis proyectos" que dispara una secuencia local guionada (thinking dots -> intro con efecto máquina de escribir -> proyectos apareciendo uno por uno cada 350ms, todo con `setTimeout`+`useEffect`, sin llamar a la API real de Nova); tags/logos no vuelven, ClubCore (sin screenshot) queda texto full-width sin ningún placeholder |
| 2026-08-03 | main | feat: Nova narra Proyectos con máquina de escribir letra por letra (descripción incluida, cursor parpadeante `.typing-cursor`); Marcovich/CodeTlon/GC²/InGlobal comparten `groupId: 'nextjs-ts'` (adyacentes, reordenados) y se narran como un solo grupo ("Estos los armé con Next.js, con variantes en cada uno:") en vez de 4 líneas repetidas; frases de Nova para proyectos solo rotan entre 5 templates (`dict.projects.nova_project_lines`); `lang` ahora se pasa a `ProjectsGrid` (necesario para `Intl.ListFormat`); espacio entre líneas de Nova consecutivas reducido |
| 2026-07-29 | main | fix: el borde negro real era el hairline de `.panel` (visible contra screenshots claros, invisible contra oscuros) — `.panel.shot { border-color: transparent }` en `globals.css`, no el `object-cover` del commit anterior; feat: Nova pasa de Server Action a Route Handler (`app/api/nova/route.ts`, se borra `app/actions/chat.ts`) para poder hacer streaming SSE real desde Gemini; suma function calling (`schedule_interview`) que dispara `sendContactEmail` (helper nuevo compartido en `app/actions/contact.ts`, mismo Resend que el form) cuando el usuario da nombre+email+motivo — manda mail real, no mock; historial de chat persiste en `localStorage` (`nova-chat-history`) |
<!-- Agregar fila al finalizar cada sesión de mantenimiento -->
