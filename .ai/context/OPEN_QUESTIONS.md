# OPEN_QUESTIONS.md — mateo-pavoni

Cosas que quedaron como UNKNOWN tras la auditoría, o decisiones que quedan explícitamente para el usuario.

## UNKNOWN técnico

- **Mecanismo exacto de la integración Git↔Vercel**: confirmado que el auto-deploy en push a `main` está activo de verdad (evidencia: correlación de timestamps commit↔deployment), pero no se pudo confirmar si es vía GitHub App instalada a nivel de organización o webhook clásico — `gh api repos/CodeTlon/mateo-pavoni/hooks` devolvió `[]` y no hubo permisos de token para listar `installations`. No cambia nada operativo, es solo el detalle de "cómo" por dentro.

## Decisiones pendientes del usuario

- **Reconciliación de `.claude/CLAUDE.md` / `ARCHITECTURE.md` / `TASKS.md`** (legacy): quedaron ~5 semanas desactualizados y `ARCHITECTURE.md` tiene una afirmación falsa sobre CORS/route handlers (ver [[KNOWN_ISSUES]] #10). Por decisión explícita del usuario, esta auditoría no los tocó — queda para una próxima sesión `/cambio` si se quiere poner al día ese sistema de documentación en paralelo a `.ai/context/`.
- **Separación de API keys dev/prod** (ver [[KNOWN_ISSUES]] #6): hoy se usan las mismas keys en local y en producción. Es una decisión de trade-off (simplicidad vs. blast-radius) que depende de qué tan crítico se considere ese riesgo para un proyecto solo-dev.
- **CSP sin nonces** (ver [[KNOWN_ISSUES]] #4): aceptado mientras no haya un sink de HTML dinámico con input de usuario. Si en algún momento se agrega uno (ej. renderizar markdown/HTML generado por Nova en el chat), esto pasa de MEDIA a un riesgo real y hay que revisarlo antes de shippear esa feature.
- **`react-hooks/set-state-in-effect` (3 warnings)**: ¿documentar como excepción aceptada (comentario `// eslint-disable-next-line` puntual explicando el patrón) o dejarlo como está? Hoy `npm run lint` no sale limpio en sentido estricto.

## Verificado, sin acción pendiente

- `public/cv.pdf` — confirmado que existe en disco, el link de descarga de Nova no está roto.

## Pendientes de la rama feature/dev2-portfolio-update (2026-10-15)

- `public/cv.pdf` está desactualizado (no incluye AR IT Services ni las credenciales). Mateo lo actualizará y lo pasará; hasta entonces Nova sigue linkeando el CV viejo.
- Links de verificación de las 23 credenciales (Credly, Udemy, Coderhouse): Mateo los pasará; se cargan como `url` en `credentials.items` de ambos JSON.
- Probar Nova contra Gemini real con una key propia antes de llevar a `main` (no verificado en esta cuenta).
- Disponibilidad laboral de Mateo para Nova: sin definir, Nova no la menciona.
- CV: Mateo dio la ruta `C:\Users\mateo\Documents\CV_Mateo_Pavoni_IT.pdf` (su PC); la VPS no puede leerla. Hay que subir el PDF al repo (o pegarlo) para que se le agregue la experiencia en AR IT Services y reemplazar `public/cv.pdf`.
