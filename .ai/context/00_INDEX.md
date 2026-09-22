# Índice de contexto — mateo-pavoni

Generado por auditoría de Context Engineering (2026-09-18), con evidencia verificada contra código/config/git/`vercel`/`gh api` reales — no contra lo que dijera la documentación previa. Ver [[OPEN_QUESTIONS]] para lo que quedó sin verificar al 100%.

## Qué leer según la tarea

| Vas a... | Leé primero |
|---|---|
| Entender qué es el proyecto y para quién | `PROJECT.md` |
| Tocar deploy, CI/CD, dominios, variables de entorno de Vercel | `ARCHITECTURE.md` §Deploy |
| Tocar `app/api/nova/route.ts`, `components/NovaChat.tsx`, o cualquier cosa que mande emails | `ARCHITECTURE.md` §Nova + `KNOWN_ISSUES.md` #1, #2, #3 |
| Tocar el formulario de contacto (`app/actions/contact.ts`, `components/sections/Contact.tsx`) | `ARCHITECTURE.md` §Nova + `KNOWN_ISSUES.md` #1 |
| Agregar/editar un proyecto en el grid (`ProjectsGrid.tsx`) o textos de dictionaries | `DOMAIN.md` |
| Tocar CSP/headers de seguridad (`next.config.mjs`) | `KNOWN_ISSUES.md` #4 + `DECISIONS.md` |
| Agregar un componente nuevo, saber qué patrón seguir | `CONVENTIONS.md` |
| Saber qué está roto/pendiente antes de tocar algo | `KNOWN_ISSUES.md` |
| Saber qué está completo vs mockeado/guionado hoy | `CURRENT_STATE.md` |
| Entender por qué algo quedó como quedó (Nova, CSP, ProjectsGrid) | `DECISIONS.md` |
| Cualquier duda de seguridad antes de un cambio | `KNOWN_ISSUES.md` (severidad explícita) |

## Archivos

- [[PROJECT]] — qué es, para quién, qué resuelve.
- [[ARCHITECTURE]] — stack real, cadena de deploy reconstruida con evidencia, mapa de archivos vigente.
- [[DOMAIN]] — modelo de datos (dictionaries, proyectos), reglas de negocio reales (Nova → email).
- [[CONVENTIONS]] — patrones de código verificados en el repo real.
- [[DECISIONS]] — decisiones ya tomadas y por qué (con evidencia de commits).
- [[CURRENT_STATE]] — qué está completo, qué es mock/guionado intencional, qué falta.
- [[KNOWN_ISSUES]] — hallazgos con severidad CRÍTICA/ALTA/MEDIA/BAJA explícita. **No hay ninguno CRÍTICO hoy** (se buscó y no apareció).
- [[OPEN_QUESTIONS]] — lo que quedó como UNKNOWN o pendiente de decisión del usuario.

## Regla de producción (repetida a propósito)

Este proyecto sirve tráfico real. Nunca mutar datos de producción (Resend, env vars de Vercel, DNS) sin confirmación explícita. Verificar el mecanismo de deploy real antes de asumir nada — la cadena está reconstruida con evidencia en `ARCHITECTURE.md`, pero puede cambiar; volver a verificar si algo no cuadra.
