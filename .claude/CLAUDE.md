# mateo-pavoni — Project Context

> **Contexto de sesión para Claude Code.**
> Al iniciar: leer este archivo + TASKS.md. Ir directo al problema.
> Al finalizar: si hubo cambios estructurales → editar la sección correspondiente + agregar fila en Historial de Cambios.

---

## Identidad del Proyecto
- **Cliente:** Mateo Pavoni (portfolio personal)
- **Tipo:** L1 — Landing page / single-page portfolio
- **Generado:** 2026-05-05
- **URL Producción:** pendiente
- **Repo GitHub:** codetlon/mateo-pavoni
- **Deploy:** Vercel

## Stack
- Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI
- Supabase: no
- Resend: sí — formulario de contacto: sí
- Fuentes: Space Grotesk (headings/labels) + Inter (body)

## Mapa de Archivos Clave
| Archivo | Rol |
|---------|-----|
| `app/layout.tsx` | Root layout — Navbar, fuentes, metadata |
| `app/page.tsx` | Single page — bento grid de secciones |
| `components/Navbar.tsx` | Nav glassmorphism fijo |
| `components/Footer.tsx` | Footer + CodeTlonBadge |
| `components/sections/HeroCard.tsx` | Bento card — About Me |
| `components/sections/TechStack.tsx` | Bento card — tech stack |
| `components/sections/ProjectsGrid.tsx` | Proyectos portfolio (Marcovich + más) |
| `components/sections/Experience.tsx` | Historial / About CodeTlon |
| `components/sections/Contact.tsx` | Bento card — formulario contacto |
| `app/actions/contact.ts` | Server Action Resend |
| `emails/ContactTemplate.tsx` | React Email template |

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
- Grain texture via CSS `::before` con SVG data-uri — no usar imagen externa
- Bento cards: `border: 1px solid rgba(30, 41, 59, 0.05)` + hover glow `0 0 20px rgba(57, 184, 253, 0.15)`
- Navbar usa `backdrop-blur-lg + bg-white/80` — glassmorphism
- No usar `@apply group` o `@apply peer` en CSS (Bug 3)
- Formulario usa `useFormState` de `react-dom` (Next.js 14, NO `useActionState`)

## Comandos Rápidos
```bash
npm run dev          # Dev server
npm run build        # Build producción
npm start            # Serve producción (para Lighthouse)
npx playwright test  # Tests E2E
```

## Historial de Cambios
| Fecha | Rama | Cambio |
|-------|------|--------|
| 2026-05-05 | main | chore: initial setup — Next.js 14 + git + deps |
