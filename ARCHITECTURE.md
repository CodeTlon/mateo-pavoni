# ARCHITECTURE — mateo-pavoni

Mapa para mantenimiento. **No releas el repo entero**: buscá tu tipo de cambio acá y abrí solo esos archivos.

## Stack
**Next.js 16.2** (App Router) · React 19 · TS · Tailwind · Lucide · Resend · Vercel. i18n propio (`app/[lang]/`, locales `es`/`en`) + `proxy.ts`. Single-page bento portfolio con dark mode.

## Para cambios comunes, leé solo esto

| Querés cambiar… | Abrí |
|-----------------|------|
| Un texto / copy (cualquier idioma) | `dictionaries/es.json` + `dictionaries/en.json` (nunca hardcodear en el componente) |
| Una sección del portfolio | `components/sections/<Seccion>.tsx` + su entrada en los dictionaries |
| Orden / layout del bento | `app/[lang]/page.tsx` |
| Navbar / Footer / switch idioma o tema | `components/Navbar.tsx`, `components/Footer.tsx`, `components/ThemeProvider.tsx` |
| Lógica de redirect de idioma | `proxy.ts` (Accept-Language → `/es` o `/en`) |
| Formulario de contacto (envío) | `app/actions/contact.ts` (Resend) + `components/sections/Contact.tsx` |
| Metadata / SEO | `metadata` export en `app/[lang]/layout.tsx` + `app/sitemap.ts` / `app/robots.ts` |
| Config de imágenes / dominios remotos / headers de seguridad | `next.config.mjs` (único archivo de config) |
| Paleta / fuentes / grain | `tailwind.config.*` + `globals.css` + `app/[lang]/layout.tsx` (`next/font`) |
| Estado de carga de la página | `app/[lang]/loading.tsx` (skeleton bento-shaped, usa `components/ui/skeleton.tsx`) |
| Fallback de error de la ruta | `app/[lang]/error.tsx` (branded, bilingüe) · `app/global-error.tsx` (solo si falla `app/layout.tsx`) |
| Nuevo componente shadcn | `components/ui/` + `cn()` de `lib/utils.ts` (patrón sembrado con `skeleton.tsx`) |

## Dónde NO meterse sin pensar
- **Config de Next:** un único archivo, `next.config.mjs` (incluye headers de seguridad: HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy). (Se eliminó el `next.config.ts` vacío que en Next 16 podía pisar la config de imágenes del `.mjs`.)
- **Sin `app/api/**/route.ts` ni Supabase:** no hay CORS ni RLS que mantener. Si se agrega alguno, correr `security-owasp.md` §2/§5 de codetlon-cloud antes de mergear.
- `proxy.ts` — es el middleware de locale. Romperlo deja el sitio sin idioma por defecto.
- `app/[lang]/` — toda ruta cuelga del segmento dinámico `[lang]`. Agregar páginas adentro, no en `app/` raíz.
- `globals.css` — sin `@apply group`/`peer`; grain via `::before` SVG data-uri.

## Patrón i18n
`proxy.ts` detecta el idioma y redirige a `/<lang>`. `app/[lang]/layout.tsx` carga el diccionario vía `app/[lang]/dictionaries.ts` y lo pasa a las secciones. Cualquier string visible = clave en `es.json` **y** `en.json`.

## Deploy
Vercel (push a `main`). Vars de entorno (Resend) cargadas manualmente en Vercel.
