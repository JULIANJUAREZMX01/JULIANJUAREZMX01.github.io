# Cola multi-repositorio · 2026-11-06

Repos activos inventariados: **33** · unidades en cola: **56** · tope diario: **3**

## Turno de hoy (maximo 3, ritmo calmado)

- [PR #12] JULIANJUAREZMX01/KYNYKOS_AI_Agent — 🔒 [security fix] Fix multiple command injection vulnerabilities in ToolExecutor (238 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/12
- [PR #1] sistemascancunjefe-ai/asio-platform — Netlify Deploy Error: Missing "packageManager" Field in package.json (250 d) · https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
- [PR #16] JULIANJUAREZMX01/KYNYKOS_AI_Agent — 🔒 [Security Fix] Eliminate Command Injection in ToolHandlers (223 d) · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/16

## Veredicto verificado de las 3 del turno

### #12 · JULIANJUAREZMX01/KYNYKOS_AI_Agent — **SEGURIDAD**

`mergeable_state: dirty`. Toca solo `app/core/tools.py`, pero `main` ya no tiene la vulnerabilidad que arregla:
`_git_operation` usa `shlex.split` + `shell=False`, `_search_code` usa `-Command` con `$args`, y `_system_control`
ya usa listas de argumentos en vez de `os.system`. Las tres cosas llegaron a `main` por otra via. Sus 51 lineas
chocan con el archivo actual y no aportarian ninguna correccion que no este ya aplicada.

**Decision: corregir** (no aprobar). Rebase sobre `main` para confirmar que no queda nada; si el rebase sale vacio,
cerrar el PR como superado y anotarlo. No se mergea: seria un conflicto con cero ganancia de seguridad.

### #1 · sistemascancunjefe-ai/asio-platform — Netlify, no seguridad

`mergeable_state: clean`, autor `netlify-coding[bot]`. Es el unico de los tres que se puede integrar hoy sin
trabajo previo. Pero el diff trae lo que no debe entrar en git:

1. `.netlify/plugins/package-lock.json` con 5582 lineas, que es cache generada por Netlify.
2. `.netlify/plugins/package.json` con una dependencia `neon-buildhooks` apuntando a un `.tgz` alojado en
   `37fb2d91-....netlify.app`. Es un artefacto de construccion, no fuente. Meter eso en el repo ata el proyecto
   a un host de Netlify sin version ni integridad verificable.
3. El arreglo real (campo `packageManager` en el `package.json` raiz) son 2 lineas y sigue **ausente en `main`**.

**Decision: corregir.** Rehacer en una rama limpia solo el `packageManager`, sin el directorio `.netlify/`, y
anadir `.netlify/` al `.gitignore`. El bot no debe escribir cache en el repositorio.

### #16 · JULIANJUAREZMX01/KYNYKOS_AI_Agent — **SEGURIDAD**

`mergeable_state: dirty`. Cubre `_git_operation`, `_search_code`, `_network_scan`, `_manage_processes`,
`_muevecancun_listener` y `_system_speak`. Los seis ya estan con `shell=False` en `main`, igual que #12.
Choca con #12 (mismo archivo, misma rama base) y con el estado actual del archivo.

**Decision: posponer.** No porque sea mala, sino porque #12 y #16 se pisan entre si y ninguna de las dos tiene
nada que aplicar. Primero se resuelve #12 con su rebase; #16 se revisa despues contra el resultado. Aprobarlas
en paralelo es imposible por diseno.

## Seguridad: existe, pero no en estos PRs

Al revisar `app/core/tools.py` en `main` quedan dos puntos reales que **no** cubren #12 ni #16:

- Linea 449-457: `_get_system_stats` sigue con `shell=True` en las tres llamadas a `powershell -Command`. Aqui el
  texto es constante y no viene del usuario, asi que no es inyeccion explotable, pero es el patron que conviene no dejar.
- Linea 759-765: `git pull origin main` y `pip install -r requirements.txt` con `shell=True`. Los argumentos son fijos.
  De ahi el riesgo no viene del comando sino de lo que haga ese `pip install` al ejecutarse dentro del nodo.

Ninguno es critico hoy; los dos son deuda tecnica con el mismo arreglo mecanico (listas de argumentos). Van a cola
como unidad nueva y ahi si merecen prioridad sobre #12 y #16.

## Esperando turno (53)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #19 · 🔒 Fix command injection vulnerabilities in ToolExecutor (219 d)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #14 · 🧹 Remove unused import in main.py (223 d)
- sistemascancunjefe-ai/MueveRepartoEnCancun- #127 · 🧪 [testing improvement] Add comprehensive tests for session management (216 d)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #43 · ⚡ Use asyncio.to_thread for explorer index saving (200 d)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #39 · ⚡ perf: optimize ShadowExplorer with async I/O (200 d)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #35 · 🧹 Remove unused asyncio import in skill_builder.py (200 d)
- JULIANJUAREZMX01/KYNYKOS_AI_Agent #30 · 🧹 Remove unused import 're' in skill_engine.py (200 d)
- JULIANJUAREZMX01/MueveCancun #472 · [REPORTE] RUTA — Ruta 71 (207 d)
- JULIANJUAREZMX01/MueveCancun #481 · [REPORTE] COMENTARIO (206 d)
- JULIANJUAREZMX01/MueveCancun #491 · [REPORTE] COMENTARIO (204 d)
- sistemascancunjefe-ai/MueveRepartoEnCancun- #129 · Fix Render build failure by optimizing WASM setup (165 d)
- JULIANJUAREZMX01/MueveCancun #566 · Add Functional Reality Gates: local route map, telemetry improvements, (147 d)
- JULIANJUAREZMX01/MueveCancun #571 · build(deps): bump sharp from 0.34.5 to 0.35.1 (144 d)
- JULIANJUAREZMX01/MueveCancun #570 · build(deps): bump fuse.js from 7.3.0 to 7.4.2 (144 d)
- JULIANJUAREZMX01/MueveCancun #569 · build(deps): bump @supabase/supabase-js from 2.108.1 to 2.108.2 (144 d)

## Despacho a Jules

| Fecha | Repo | Sesion | Objetivo | Estado |
|---|---|---|---|---|
| 2026-11-03 | KYNYKOS_AI_Agent | sessions/10442019894751081557 | Limpieza reversible de imports sin usar (PR #13) | En cola de Jules |

Sin cambios hoy: no se despacho nada nuevo. Nada se aprueba ni se mergea sin autorizacion explicita de Julian.
