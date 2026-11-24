# Cola multi-repositorio · 2026-11-24

Repos activos inventariados: **33** · unidades en cola: **68** · tope diario: **3**

## Turno de hoy (maximo 3, ritmo calmado)

1. **PR #68 · KYNYKOS_AI_Agent** — SEGURIDAD (HIGH), subida a mano al puesto 1 · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
   Inyeccion de argumentos en `git_operation`. Lista blanca del primer token con `shlex.split`, valida `repo_path` y bloquea `-c`, `--config-env`, `--upload-pack`, `--receive-pack`, `--exec-path`. 4 archivos, +111/−8, `clean`. Decision: **corregir**.
   Pendiente: `arg.startswith("-c")` bloquea tambien `git diff --cached` (falso positivo); faltan pruebas de bypass (`git -c core.fsmonitor=`, `--upload-pack=`, `repo_path` con `../`). Consolidar aqui y cerrar #60, #62, #66 y #49.

2. **PR #15 · cantabria-pms-demo** — REMEDIACION DE SEGURIDAD · https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/15
   `astro` 7.4.2 → 7.4.13. Cierra las 2 alertas abiertas de Dependabot: media (endpoint `/_image` de `@astrojs/node`) y baja (XSS por inyeccion de atributos en nombres de etiqueta dinamicos). 2 archivos, +1263/−325, todo lockfile. Decision: **aprobar**, requiere OK de Julian.

3. **PR #127 · MueveRepartoEnCancun-** · https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127
   Pruebas para `session.ts`, 1 archivo, +177, sin tocar desde abril. GitHub lo da `dirty`. Decision: **corregir** (rebase y reejecutar suite).

## Fuera del turno
- **PR #1 · asio-platform** — `clean`, pero el arreglo son 2 lineas envueltas en +5636/−14 de 9 archivos (artefactos `.netlify` + sitemap). **Posponer** por cuarta vez: que rehaga el diff minimo y meta `.netlify/` al `.gitignore`.
- **PR #43 · KYNYKOS_AI_Agent** — `dirty` desde abril, fuera por conflicto.
- **#16 y #17 · cantabria-pms-demo** — bumps triviales (`vitest`, `gsap`), entran despues de #15.

## Nota de proceso
`scripts/cola.py` sigue sin criterio de severidad: ordena por edad, por eso el HIGH de 13 dias cae en la posicion 29 de 68. Se sube a mano por sexto dia consecutivo. Fix pendiente: detectar `sentinel|security|CVE` con peso dominante.

Sin PRs abiertos ni merges en esta corrida.
