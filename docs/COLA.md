# Cola multi-repositorio · 2026-11-10

Repos activos inventariados: **33** · unidades en cola: **59** · tope diario: **3**.

## Turno de hoy (máximo 3)
- [PR #62] JULIANJUAREZMX01/KYNYKOS_AI_Agent — 🛡️ Sentinel: [HIGH] Fix argument injection and path traversal in git_o (1 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/62
- [PR #1] sistemascancunjefe-ai/asio-platform — Netlify Deploy Error: Missing "packageManager" Field in package.json (254 d) · https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
- [PR #127] sistemascancunjefe-ai/MueveRepartoEnCancun- — 🧪 [testing improvement] Add comprehensive tests for session management (220 d) · https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127

## Revisión y micro-decisiones

### 🔒 #62 · KYNYKOS_AI_Agent — seguridad, prioridad elevada
La cola original lo situaba en la posición 27. Se sube al turno de hoy por tratar argumento-injection y path traversal en `git_operation`. La revisión del diff confirma validación de subcomando, bloqueo de flags peligrosos, comprobación de ruta, y pruebas negativas que afirman que no se ejecuta subprocess. GitHub informa `mergeable: true`, `mergeable_state: clean`. No se ejecutó ni aprobó el PR.
**Micro-decisión: aprobar** como recomendación de revisión; dejar la aprobación y cualquier merge a Julián. La rama está limpia y el diff incluye pruebas para entradas de inyección y rutas fuera de directorios permitidos.

### #1 · asio-platform — corrección de despliegue
PR abierto, no draft, `mergeable_state: clean`. El diff mezcla el cambio de `packageManager` con actualización de `turbo.json`, eliminación de integración Astro sitemap y artefactos generados bajo `.netlify/`, incluyendo un paquete desde un host externo. El alcance mezcla solución y caché/artefactos, así que no conviene integrar tal cual.
**Micro-decisión: corregir.** Separar el arreglo mínimo de `packageManager`; excluir `.netlify/` y revisar aparte cambios funcionales de sitemap y Turbo. No se tocó el PR.

### #127 · MueveRepartoEnCancun- — pruebas de sesión
PR abierto, no draft, `mergeable_state: dirty`. Añade pruebas unitarias de sesión, pero primero debe resolverse el conflicto con `main` y ejecutarse la suite contra la base actual.
**Micro-decisión: corregir.** Rebase/actualizar y ejecutar pruebas; no aprobar con el conflicto abierto. No se tocó el PR.

## Seguridad en el turno
El PR #62 es de seguridad y se elevó explícitamente al primer puesto. La cola tiene otros PRs de seguridad más abajo; el tope diario sigue en 3. No se abrieron PRs ni se hizo merge.

## Esperando turno
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #43 · ⚡ Use asyncio.to_thread for explorer index saving (204 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/43
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #39 · ⚡ perf: optimize ShadowExplorer with async I/O (204 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/39
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #35 · 🧹 Remove unused asyncio import in skill_builder.py (204 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/35
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #30 · 🧹 Remove unused import 're' in skill_engine.py (204 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/30
- JULIANJUAREZMX01/MueveCancun #472 · [REPORTE] RUTA — Ruta 71 (211 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/issues/472
- JULIANJUAREZMX01/MueveCancun #481 · [REPORTE] COMENTARIO (210 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/issues/481
- JULIANJUAREZMX01/MueveCancun #491 · [REPORTE] COMENTARIO (208 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/issues/491
- sistemascancunjefe-ai/MueveRepartoEnCancun- #129 · Fix Render build failure by optimizing WASM setup (169 d) · https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/129
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #369 · 🛡️ Sentinel: Fix backend URL scheme validation and update UTC alert ti (20 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/369
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #370 · 🛡️ Sentinel: Fix naive timestamp vulnerability in security alerts (19 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/370
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #377 · 🛡️ Sentinel: Fix naive UTC timestamp in embedded node telemetry sync (16 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/377
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #378 · fix: update datetime.utcnow() to timezone-aware datetime.now(UTC) (15 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/378
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #379 · 🛡️ Sentinel: Fix UTC ISO8601 Timestamps and Dict Feature Serialization (14 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/379
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #381 · Fix ISO8601 UTC timestamp generation in API alert logging (13 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/381
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #384 · 🛡️ Sentinel: Fix AttributeError in honeypot endpoints when request.cli (12 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/384
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #382 · 🛡️ Sentinel: Fix unhandled request.client null access in honeypot and  (12 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/382
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #385 · 🛡️ Sentinel: Fix honeypot client host null dereference DoS risk (10 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/385
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #362 · 🛡️ Sentinel: Harden API timestamps & subprocess validation (26 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/362
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #363 · Implement Node-10 Embedded Defense Node and Sync Endpoint (25 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/363
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #365 · 🛡️ Sentinel: Harden simulator endpoint validation & API timestamps (24 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/365
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #364 · 🛡️ Sentinel: [HIGH] Harden API against non-finite float injection and  (24 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/364
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #366 · feat: Decentralized Embedded Defense Nodes & SAC_OS Tactical UI Integr (23 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/366
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #60 · 🛡️ Sentinel: Fix subcommand bypass and flag injection in git_operation (2 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/60
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #367 · 🛡️ Sentinel: Enforce timezone-aware ISO8601 UTC timestamps in API aler (22 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/367
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #66 · 🛡️ Sentinel: [HIGH] Fix argument injection and path traversal in git_o (0 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/66
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #371 · feat: Implement Node-10 Embedded Defense Node and API sync (19 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/371
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #373 · Implement Node-10 Embedded Defense Nodes and Telemetry Sync API (18 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/373
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #383 · Integrate SAC_OS military visual design tokens and embedded defense no (12 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/383
- JULIANJUAREZMX01/cantabria-pms-demo #10 · chore(deps-dev): bump @types/node from 26.6.5 to 26.6.6 (9 d) · https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/10
- JULIANJUAREZMX01/JULIANJUAREZMX01.github.io #2 · docs(agentes): migración de Jules y bucle de entrenamiento KynicOS (7 d) · https://github.com/JULIANJUAREZMX01/JULIANJUAREZMX01.github.io/pull/2
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #387 · 🛡️ Sentinel: [HIGH] Harden simulate_start against Subprocess URL Injec (7 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/387
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #50 · ⚡ Bolt: pre-compile regexes in concierge loop skill routing (6 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/50
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #49 · 🛡️ Sentinel: [HIGH] Harden git_operation and remove shell=True in self (6 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/49
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #52 · ⚡ Bolt: optimize transport query keyword matching in mueve_cancun (5 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/52
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #51 · 🎨 Palette: keyboard tab navigation & roving tabindex (5 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/51
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #53 · 🎨 Palette: Accessible keyboard navigation and contrast polish for dash (4 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/53
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #56 · ⚡ Bolt: optimize transport query keyword matching in mueve_cancun (3 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/56
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #55 · 🎨 Palette: Implement arrow-key keyboard navigation for dashboard tabs (3 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/55
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #59 · 🎨 Palette: Accessible tab keyboard navigation and sessions refresh (2 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/59
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #58 · ⚡ Bolt: optimize transport query keyword matching in mueve_cancun (2 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/58
- JULIANJUAREZMX01/cantabria-pms-demo #13 · chore(deps): bump astro from 7.4.2 to 7.4.5 (2 d) · https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/13
- JULIANJUAREZMX01/cantabria-pms-demo #12 · chore(deps-dev): bump vitest from 5.0.5 to 5.1.0 (2 d) · https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/12
- JULIANJUAREZMX01/cantabria-pms-demo #11 · chore(deps): bump actions/checkout from 4 to 7 (2 d) · https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/11
- JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps #388 · 🛡️ Sentinel: Enforce pagination limit validation on /api/alerts (2 d) · https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps/pull/388
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #63 · ⚡ Bolt: optimize dashboard session listing by pruning files before dis (1 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/63
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #61 · 🎨 Palette: WAI-ARIA roving tabindex & arrow key navigation for dashboa (1 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/61
- JULIANJUAREZMX01/MueveCancun #606 · build(deps-dev): bump jsdom from 29.1.1 to 31.0.0 (1 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/pull/606
- JULIANJUAREZMX01/MueveCancun #605 · build(deps): bump @mlc-ai/web-llm from 0.2.84 to 0.2.87 (1 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/pull/605
- JULIANJUAREZMX01/MueveCancun #604 · build(deps): bump the astro group with 6 updates (1 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/pull/604
- JULIANJUAREZMX01/MueveCancun #603 · build(deps): bump the dev-tooling group with 5 updates (1 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/pull/603
- JULIANJUAREZMX01/MueveCancun #602 · build(deps): update rstar requirement from 0.13 to 0.14 in /rust-wasm (1 d) · https://github.com/JULIANJUAREZMX01/MueveCancun/pull/602
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #65 · ⚡ Bolt: optimize session retrieval in dashboard API (0 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/65
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #64 · 🎨 Palette: keyboard tab navigation & roving tabindex (0 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/64
- JULIANJUAREZMX01/JULIANJUAREZMX01.github.io #4 · Turno sentinel 2026-11-09 (1 d) · https://github.com/JULIANJUAREZMX01/JULIANJUAREZMX01.github.io/issues/4
- JULIANJUAREZMX01/KynicOS #9 · Turno sentinel 2026-11-09 (1 d) · https://github.com/JULIANJUAREZMX01/KynicOS/issues/9
- JULIANJUAREZMX01/sanaciones-cuanticas #1 · Turno sentinel 2026-11-09 (1 d) · https://github.com/JULIANJUAREZMX01/sanaciones-cuanticas/issues/1
