# Cola multi-repositorio · 2026-11-23

Repos activos inventariados: **33** · unidades en cola: **65** · tope diario: **3**

Hay **3 altas nuevas**, las tres del mismo lote: Dependabot en `cantabria-pms-demo` (1 día). Una de ellas es remediación de seguridad y entra al turno.

## Turno de hoy (máximo 3, ritmo calmado)

### 1. PR #68 · JULIANJUAREZMX01/KYNYKOS_AI_Agent 🔒 SEGURIDAD
https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
**Elevada al puesto 1 por criterio, no por ranking.** El script la deja en la posición 29 de 65 porque pesa la edad (12 d) y hay PRs de 200+ días.
Severidad **HIGH**: inyección de argumentos en `git_operation`. Sustituye la validación por subcadena por lista blanca del primer token con `shlex.split`, valida `repo_path` con `_is_safe_path()` y bloquea `-c`, `--config-env`, `--upload-pack`, `--receive-pack` y `--exec-path`.
Diff: 4 archivos, +111/−8 (`.jules/sentinel.md`, `app/core/tools.py`, `docs/agentes/MEMORIA.md`, `tests/test_tools.py`). `mergeable_state: clean`, sin checks corriendo.
**→ Corregir.** Cuatro PRs abiertos del mismo defecto (#60, #62, #66, #68) más #49. #68 es el único con pruebas. Consolidar ahí, cerrar los otros. Dos hallazgos de revisión: `arg.startswith("-c")` bloquea también `git diff --cached` (falso positivo, usar `-c` exacto o `-c=`), y las pruebas solo cubren comandos legítimos, faltan casos de bypass (`git -c core.fsmonitor=`, `--upload-pack=`, `repo_path` con `../`).

### 2. PR #15 · JULIANJUAREZMX01/cantabria-pms-demo 🔒 SEGURIDAD (remediación)
https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/15
**Elevada al turno: cierra las 2 alertas abiertas de Dependabot.** Bump de `astro` 7.4.2 → 7.4.13.
- `GHSA-r3h5-4585-7x3w` (media, CVE-2026-126364): el endpoint `/_image` de `@astrojs/node` puede leer archivos de un hermano del directorio de salida con variante de mayúsculas. Rango vulnerable `<= 7.4.6`, parcheado en **7.4.7**.
- `GHSA-mh32-jxcr-mh9f` (baja, CVE-2026-126361): XSS por inyección de atributos en nombres de etiqueta dinámicos. Rango `<= 7.4.4`, parcheado en **7.4.5**.
Diff: 2 archivos, +1,263/−325 (lockfile). `mergeable_state: unstable`, sin checks.
**→ Aprobar.** Es un patch bump dentro de la misma minor y resuelve las dos alertas. Requiere tu autorización para mergear. Los otros dos del lote, #16 (`vitest` 5.0.5 → 5.1.1) y #17 (`gsap` 3.15.0 → 3.15.1), pueden ir en la misma tanda.

### 3. PR #127 · sistemascancunjefe-ai/MueveRepartoEnCancun-
https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127
Un archivo nuevo de pruebas para `session.ts`, +177/−0. `mergeable: false`, `mergeable_state: dirty`: conflicto contra `main`. Sin tocar desde 2026-04-04.
**→ Corregir.** Riesgo bajo y valor claro. Rebase sobre `main` y reejecutar la suite antes de pedir merge.

## Fuera de turno

- `asio-platform#1`: **posponer por cuarta vez.** El arreglo declarado es un campo `packageManager`; el diff real es +5,636/−14 en 9 archivos, con artefactos de `.netlify` y sitemap regenerado. Que rehaga el diff mínimo y meta `.netlify/` al `.gitignore`.
- `KYNYKOS_AI_Agent#43`: sigue `dirty` (conflicto contra `main`). No se trabaja hasta que se rebasee.
- `cantabria-pms-demo#16` y `#17`: Dependabot, patch/minor bumps triviales. Van con #15.
- `Wasm-Kalpixk_IA_DevOps`: 13 PRs `Sentinel` abiertos (20 a 42 días). No entran al turno por el tope, pero es el mayor cúmulo de seguridad sin revisar del portafolio.

## Nota de proceso

`scripts/cola.py` no tiene criterio de severidad: ordena por edad y tipo, así que un HIGH de 12 días queda en la posición 29. Se sube a mano cada día. Pendiente: añadir detección de `sentinel|security|CVE` con peso dominante en `peso()`.
