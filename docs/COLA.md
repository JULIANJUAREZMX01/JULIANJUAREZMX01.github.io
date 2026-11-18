# Cola multi-repositorio · 2026-11-18

Repos activos inventariados: **33** · unidades en cola: **64** · tope diario: **3**

Sin altas desde el turno anterior: 0 PRs e issues nuevos creados en las ultimas 48 h. Las 3 unidades del turno son las mismas que quedaron pendientes ayer, con la de seguridad elevada al puesto 1.

## Turno de hoy (maximo 3, ritmo calmado)
- [PR #68] JULIANJUAREZMX01/KYNYKOS_AI_Agent — 🛡️ Sentinel: Fix argument injection in git_operation (7 d) · SEGURIDAD · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
- [PR #1] sistemascancunjefe-ai/asio-platform — Netlify Deploy Error: Missing "packageManager" Field in package.json (262 d) · https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
- [PR #127] sistemascancunjefe-ai/MueveRepartoEnCancun- — 🧪 [testing improvement] Add comprehensive tests for session management (228 d) · https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127

## Esperando turno (61)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #43 · ⚡ Use asyncio.to_thread for explorer index saving (212 d)
- JULIANJUAREZMX01/MueveCancun #472 · [REPORTE] RUTA — Ruta 71 (219 d)
- JULIANJUAREZMX01/MueveCancun #481 · [REPORTE] COMENTARIO (218 d)
- JULIANJUAREZMX01/MueveCancun #491 · [REPORTE] COMENTARIO (216 d)
- sistemascancunjefe-ai/MueveRepartoEnCancun- #129 · Fix Render build failure by optimizing WASM setup (177 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #369 · 🛡️ Sentinel: Fix backend URL scheme validation and update UTC alert ti (28 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #370 · 🛡️ Sentinel: Fix naive timestamp vulnerability in security alerts (27 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #377 · 🛡️ Sentinel: Fix naive UTC timestamp in embedded node telemetry sync (24 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #378 · fix: update datetime.utcnow() to timezone-aware datetime.now(UTC) (23 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #379 · 🛡️ Sentinel: Fix UTC ISO8601 Timestamps and Dict Feature Serialization (22 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #381 · Fix ISO8601 UTC timestamp generation in API alert logging (21 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #384 · 🛡️ Sentinel: Fix AttributeError in honeypot endpoints when request.cli (20 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #382 · 🛡️ Sentinel: Fix unhandled request.client null access in honeypot and  (20 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #385 · 🛡️ Sentinel: Fix honeypot client host null dereference DoS risk (18 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #362 · 🛡️ Sentinel: Harden API timestamps & subprocess validation (34 d)

## Micro-decisiones del turno

### PR #68 · KYNYKOS_AI_Agent — SEGURIDAD, elevada al puesto 1
https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
Severidad declarada HIGH: inyeccion de argumentos en `git_operation`. El diff sustituye la validacion por subcadena por una lista blanca sobre el primer token, valida `repo_path` con `_is_safe_path` y bloquea banderas peligrosas incluida la forma `--flag=valor`. Toca 4 archivos: `app/core/tools.py` (+26/-8), `tests/test_tools.py` (+79), `.jules/sentinel.md` y `docs/agentes/MEMORIA.md`. GitHub lo da `mergeable_state: clean`. CI: el unico workflow que corre sobre este SHA es `memoria-guardian` (verde); no hay suite de pruebas ejecutandose en PR.
**Micro-decision: corregir.** Cuatro PRs abiertos para el mismo defecto (#60, #62, #66, #68, entre 7 y 10 dias). #68 es el mas completo y el que trae pruebas. Consolidar en #68, cerrar los otros tres como duplicados y agregar casos de bypass explicitos (`git -c core.fsmonitor=...`, `--upload-pack=`, rutas con `../`) antes del merge. Sin merge hasta que Julian lo autorice.

### PR #1 · asio-platform — despliegue Netlify
https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
Abierta y `mergeable_state: clean`, pero el diff son **+5,636 / -14 en 9 archivos**, con artefactos de `.netlify` y un `sitemap.xml` regenerado. El arreglo declarado es un campo `packageManager` en `package.json`.
**Micro-decision: posponer.** Rehacer el diff minimo y meter `.netlify/` al `.gitignore`. Es la segunda vez consecutiva que se pospone por la misma razon.

### PR #127 · MueveRepartoEnCancun- — pruebas de sesion
https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127
Un archivo nuevo (`src/tests/session.test.ts`, +177), CodeQL en verde, pero GitHub reporta `mergeable: false`, `mergeable_state: dirty`: conflicto contra `main`.
**Micro-decision: corregir.** Resolver el conflicto y reejecutar la suite. Riesgo bajo, valor claro: cubre `session.ts` sin tocar codigo de produccion.

## Fuera de turno, para constancia
- `JULIANJUAREZMX01/KYNYKOS_AI_Agent#43` (asyncio.to_thread en `explorer.py`) paso de `clean` a `dirty`: conflicto contra `main`. Ya no entra al turno; cuando toque, hay que rebasear.
- Dependabot en `JULIANJUAREZMX01.github.io`: 2 alertas abiertas (1 media `astro`, 1 baja `astro`). No se tocaron.

## Nota de operacion
`scripts/cola.py` sigue escribiendo `COLA.md` en la raiz del directorio de trabajo en lugar de `docs/COLA.md`. Se movio a mano otra vez. Pendiente corregir la ruta en el script.

No se abrieron PRs ni se hizo merge. Ningun cambio externo fue autorizado.
