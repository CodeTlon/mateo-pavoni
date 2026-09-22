# DECISIONS.md — mateo-pavoni

Decisiones reales ya tomadas, reconstruidas desde el historial de commits y comentarios en el propio código (no propuestas nuevas).

## Nova: Server Action → Route Handler

Nova empezó como Server Action (`app/actions/chat.ts`, ya borrado) y se migró a Route Handler (`app/api/nova/route.ts`). Razón documentada: streaming SSE real desde Gemini requiere el SDK de Vercel AI si se hace desde una Server Action; como Route Handler, un `fetch` directo a la REST API alcanza sin agregar esa dependencia. Consecuencia: es el único endpoint del proyecto, y por eso es el único punto que necesita su propio rate limiting (no hay middleware de auth/rate-limit compartido).

## ProjectsGrid: grid+filtro → lista guionada por Nova

Hubo una versión intermedia con grid de cards (3 columnas) + filtro por tecnología (pills). No convenció y se revirtió al formato lista alternada imagen/texto original, ahora disparado por un botón que activa una narración local guionada ("Preguntale a Nova sobre mis proyectos"). Decisión de producto/UX, no técnica — documentada en el historial de commits. Ver [[ARCHITECTURE]] para la aclaración de que esa narración es local, no una llamada real a Gemini.

## CSP con `unsafe-inline` (no nonces)

`next.config.mjs` mantiene `unsafe-inline` en `script-src`/`style-src` porque no hay middleware de generación de nonce, y el bootstrap inline de Next + el script de GA (gtag) + estilos inline puntuales (`CookieConsent.tsx`) lo necesitarían. Decisión documentada en el propio comentario del archivo — aceptada mientras no aparezca un sink de HTML dinámico con input de usuario (hoy no existe: el único `dangerouslySetInnerHTML` es `JsonLd.tsx` con datos estáticos de SEO). Ver [[KNOWN_ISSUES]] #4 si se quiere revisar esto a futuro.

## Historial de chat de Nova en `localStorage`, no server-side

Decisión de simplicidad: no hay sesión de usuario ni backend de estado, así que el historial de conversación vive en el navegador del visitante. Trade-off aceptado en su momento por no requerir infraestructura de sesión — pero tiene una consecuencia de seguridad real no evaluada explícitamente en el momento de la decisión: ese historial es la única "memoria" que el servidor usa para decidir si ya hay datos "confirmados" para disparar `schedule_interview`, y es editable por el cliente. Ver [[KNOWN_ISSUES]] #2.

## Rate limiting de Nova: in-memory, no distribuido

Decisión explícita y auto-documentada en el propio código (`route.ts`, comentario junto al `Map` de rate limiting): se eligió una solución simple (Map en memoria por IP) sabiendo sus límites (se resetea en cold start, no comparte estado entre instancias), con la intención declarada de migrar a Upstash/Vercel KV "si aparece abuso distribuido real". No es una omisión, es una decisión de "suficiente por ahora" documentada en el momento en que se escribió.

## Dominio: `.dev` → `.com.ar`

El proyecto migró de dominio (`mateopavoni.dev` → `mateopavoni.com.ar`) en algún momento; `sitemap.ts`/`robots.ts` tuvieron que corregirse porque quedaron apuntando al dominio viejo. Si se vuelve a migrar de dominio, esos dos archivos son el punto de falla conocido (están hardcodeados, no leen de una env var de "site URL").
