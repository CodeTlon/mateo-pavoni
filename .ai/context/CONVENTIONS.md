# CONVENTIONS.md — mateo-pavoni

Patrones verificados en el código real del repo (no aspiracionales).

## i18n

- Todo texto nuevo va en `dictionaries/es.json` + `dictionaries/en.json`, en las mismas claves anidadas en ambos archivos (verificado simétrico hoy — no romper esa simetría).
- Excepción real conocida (no repetir): `components/Navbar.tsx` tiene dos `aria-label` hardcodeados con idioma fijo, cruzado entre sí (ver [[KNOWN_ISSUES]] #6). Cualquier `aria-label`/`title`/texto visible nuevo debe venir de `dict`, incluso en componentes que ya reciben `dict` como prop para otra cosa.
- `proxy.ts` es el middleware real de Next 16 (no `middleware.ts` — ese nombre no existe en este proyecto).

## Estilos

- No usar `@apply group` ni `@apply peer` en CSS global.
- `cn()` (clsx + tailwind-merge) vive en `lib/utils.ts` — usarlo en cualquier componente de `components/ui/` nuevo, es el patrón que ya siguen los existentes.
- CSP (`next.config.mjs`) permite `unsafe-inline` en `script-src`/`style-src` por decisión consciente (documentada en el propio archivo) — no asumir que se puede sacar sin agregar nonces vía middleware primero.

## Forms

- El form de contacto usa `useFormState` de `react-dom`, explícitamente **no** `useActionState` (la migración a `useActionState` no se hizo todavía — si se hace, hay que revisar el flujo completo del form, no es un simple rename).

## React / hooks

- Patrón "mounted flag" (`useEffect(() => setMounted(true), [])`) aparece en varios componentes (`Navbar.tsx`, `NovaChat.tsx`, `RainingLetters.tsx`, `CookieConsent.tsx`) para diferir hidratación — es intencional, dispara warnings aceptados de `react-hooks/set-state-in-effect` en `npm run lint` (3 hoy). No "arreglar" estos sin criterio; si se toca uno, mantener el mismo patrón que los demás para consistencia.

## Server Actions / Route Handlers

- `sendContactEmail` (`app/actions/contact.ts`) es un helper **compartido** entre el form de contacto y Nova — cualquier cambio de firma, validación o comportamiento ahí impacta ambos flujos, probar los dos.
- Validación de input server-side siempre con Zod en los dos puntos de entrada que aceptan datos de usuario con efecto secundario (`sendContact`, `schedule_interview` en `route.ts`).

## Nomenclatura

- El bot se llama **"Nova"** en todo el código/UI actual. `.env.example` todavía tiene un comentario residual que dice "Ana" (ver [[KNOWN_ISSUES]] #9) — no usar ese nombre en código nuevo.
