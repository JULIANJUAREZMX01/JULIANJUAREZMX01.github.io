# Cola multi-repositorio · 2026-11-20

Repos activos inventariados: **33** · unidades en cola: **64** · tope diario: **3**

Sin altas nuevas: **0** unidades con 3 días o menos. El turno es el mismo de los últimos tres días, con la de seguridad al frente.

## Turno de hoy (máximo 3, ritmo calmado)

### 1. PR #68 · JULIANJUAREZMX01/KYNYKOS_AI_Agent 🔒 SEGURIDAD
https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
**Elevada al puesto 1 por criterio, no por ranking.** El script la dejó en posición 29 de 64 porque pesa la edad y el PR tiene 9 días.
Severidad **HIGH**: inyección de argumentos en `git_operation`. Lista blanca del primer token, valida `repo_path` y bloquea `-c`, `--exec-path`, `--upload-pack`.
Diff: 4 archivos, +111/−8 (`.jules/sentinel.md`, `app/core/tools.py`, `docs/agentes/MEMORIA.md`, `tests/test_tools.py`).
`mergeable_state: clean`. CI: solo corre `memoria` en verde. No hay suite de pruebas ejecutándose.
**→ Corregir.** Siguen cuatro PRs abiertos del mismo defecto (#60, #62, #66, #68). #68 es el único con pruebas. Consolidar ahí, cerrar los otros tres y agregar casos de bypass (`git -c core.fsmonitor=`, `--upload-pack=`, `../`) antes del merge.

### 2. PR #1 · sistemascancunjefe-ai/asio-platform
https://github.com/sistemascancunjefe-ai/asio-platform/pull/1
El arreglo declarado es un campo `packageManager`. El diff real: **+5,636/−14 en 9 archivos**, con artefactos de `.netlify` y sitemap regenerado. Sin actualizar desde 2026-03-01.
Checks: GitGuardian en verde, tres de Netlify en neutral.
**→ Posponer.** Tercera vez seguida por la misma razón. Que rehaga el diff mínimo y meta `.netlify/` al `.gitignore`.

### 3. PR #127 · sistemascancunjefe-ai/MueveRepartoEnCancun-
https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127
Un archivo nuevo de pruebas para `session.ts`, +177, CodeQL y `build-wasm` en verde. GitHub lo da `dirty`: conflicto contra `main`.
**→ Corregir.** Riesgo bajo, valor claro. Resolver el conflicto y reejecutar la suite.

## Fuera de turno

- `KYNYKOS_AI_Agent#43` entró al turno automático y salió: está `dirty` (conflicto contra `main`), sin checks. No se trabaja hasta que se rebasee.
- Dependabot en el portafolio: 2 alertas de `astro` (1 media, 1 baja). No se tocaron, no estaban en el turno.

## Nota de proceso

`scripts/cola.py` no tiene criterio de severidad: ordena por edad y tipo, así que un HIGH de seguridad de 9 días queda debajo de PRs de 200 días sin riesgo. Se sube a mano cada día. Pendiente: añadir detección de `sentinel|security|CVE` con peso dominante en `peso()`.
