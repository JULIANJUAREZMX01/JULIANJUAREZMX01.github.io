# Cola multi-repositorio · 2026-11-17

Repos activos inventariados: **33** · unidades en cola: **64** · tope diario: **3**

## Turno de hoy (maximo 3, ritmo calmado)
- [PR #68] JULIANJUAREZMX01/KYNYKOS_AI_Agent — 🛡️ Sentinel: Fix argument injection in git_operation (6 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
- [PR #1] sistemascancunjefe-ai/asio-platform — Netlify Deploy Error: Missing "packageManager" Field in package.json (261 d) · https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
- [PR #127] sistemascancunjefe-ai/MueveRepartoEnCancun- — 🧪 [testing improvement] Add comprehensive tests for session management (227 d) · https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127

## Esperando turno (61)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #43 · ⚡ Use asyncio.to_thread for explorer index saving (211 d)
- JULIANJUAREZMX01/MueveCancun #472 · [REPORTE] RUTA — Ruta 71 (218 d)
- JULIANJUAREZMX01/MueveCancun #481 · [REPORTE] COMENTARIO (217 d)
- JULIANJUAREZMX01/MueveCancun #491 · [REPORTE] COMENTARIO (215 d)
- sistemascancunjefe-ai/MueveRepartoEnCancun- #129 · Fix Render build failure by optimizing WASM setup (176 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #369 · 🛡️ Sentinel: Fix backend URL scheme validation and update UTC alert ti (27 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #370 · 🛡️ Sentinel: Fix naive timestamp vulnerability in security alerts (26 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #377 · 🛡️ Sentinel: Fix naive UTC timestamp in embedded node telemetry sync (23 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #378 · fix: update datetime.utcnow() to timezone-aware datetime.now(UTC) (22 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #379 · 🛡️ Sentinel: Fix UTC ISO8601 Timestamps and Dict Feature Serialization (21 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #381 · Fix ISO8601 UTC timestamp generation in API alert logging (20 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #384 · 🛡️ Sentinel: Fix AttributeError in honeypot endpoints when request.cli (19 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #382 · 🛡️ Sentinel: Fix unhandled request.client null access in honeypot and  (19 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #385 · 🛡️ Sentinel: Fix honeypot client host null dereference DoS risk (17 d)
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #362 · 🛡️ Sentinel: Harden API timestamps & subprocess validation (33 d)

## Micro-decisiones del turno

### PR #68 · KYNYKOS_AI_Agent — SEGURIDAD, elevada al puesto 1
https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
Severidad declarada HIGH. El diff sustituye la validacion por subcadena (`any(op in operation.lower() for op in safe_ops)`) por una lista blanca sobre el primer token, valida `repo_path` con `_is_safe_path` y bloquea `-c`, `--config-env`, `--upload-pack`, `--receive-pack` y `--exec-path`. Toca 4 archivos: `app/core/tools.py`, `tests/test_tools.py`, `.jules/sentinel.md` y `docs/agentes/MEMORIA.md`. GitHub reporta `mergeable_state: clean`; el unico check es `memoria` en verde, no hay suite de pruebas ejecutandose.
**Micro-decision: corregir.** Hay cuatro PRs abiertos para el mismo defecto (#60, #62, #66 y #68, entre 6 y 9 dias de edad) y #68 es el mas completo, pero se solapan. Consolidar en uno, cerrar los otros tres y agregar pruebas explicitas de bypass (`git -c core.fsmonitor=...`, `--upload-pack=`, `../`) antes de que Julian decida el merge.

### PR #1 · asio-platform — despliegue Netlify
https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
Abierta y `mergeable_state: clean`, pero el diff son **+5,636 / -14 en 9 archivos**, entre ellos `apps/marketing/.netlify/netlify.toml`, `.netlify/plugins/package.json` y `.netlify/plugins/package-lock.json`. El arreglo declarado es un campo `packageManager` en `package.json`. El resto es ruido de despliegue versionado.
**Micro-decision: posponer.** No se puede aprobar un PR cuyo arreglo real son dos lineas y cuyo cuerpo arrastra artefactos de `.netlify` y un `sitemap.xml` regenerado. Pedir al autor que rehaga el diff minimo con `.netlify/` en `.gitignore`.

### PR #127 · MueveRepartoEnCancun- — pruebas de sesion
https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127
Abierta, un solo archivo nuevo (`src/tests/session.test.ts`, +177) y CodeQL en verde. GitHub reporta `mergeable: false`, `mergeable_state: dirty`: hay conflicto contra `main`.
**Micro-decision: corregir.** Resolver el conflicto, reejecutar la suite y volver a evaluar. El contenido es de riesgo bajo y valor claro: cubre `session.ts` sin tocar codigo de produccion.

## Nota de operacion
`scripts/cola.py` escribe `COLA.md` en la raiz del directorio de trabajo, pero el archivo versionado vive en `docs/COLA.md`. Se movio manualmente; conviene corregir la ruta en el script.

No se abrieron PRs ni se hizo merge. Ningun cambio externo fue autorizado.
