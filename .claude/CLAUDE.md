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
| `app/actions/contact.ts` | Server Action Resend `(prevState, formData)` |
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
- **Sin route handlers (`app/api/**/route.ts`) ni Supabase en este proyecto** — por eso no hay allowlist de CORS ni políticas RLS que auditar. Si se agrega un route handler o Supabase más adelante, retomar `security-owasp.md` §2/§5 de codetlon-cloud.
- **`components/ui/` nace en esta sesión** (antes no existía ningún componente shadcn en el repo) con `skeleton.tsx` + `lib/utils.ts` (`cn()`, requiere `clsx` + `tailwind-merge`, agregados como deps). Nuevos componentes shadcn deben seguir el mismo patrón (`cn()` desde `lib/utils`).
- i18n: las rutas viven bajo `app/[lang]/`. Todo texto nuevo va en `dictionaries/es.json` + `en.json`, nunca hardcodeado en el componente.
- `proxy.ts` es el middleware de Next 16 (no `middleware.ts`). Maneja el redirect de locale.
- Grain texture via CSS `::before` con SVG data-uri — no usar imagen externa.
- Bento cards: `border: 1px solid rgba(30, 41, 59, 0.05)` + hover glow `0 0 20px rgba(57, 184, 253, 0.15)`.
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
<!-- Agregar fila al finalizar cada sesión de mantenimiento -->
