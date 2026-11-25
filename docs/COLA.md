# Cola multi-repositorio · 2026-11-25

Repos activos inventariados: **33** · unidades en cola: **68** · tope diario: **3**

## Turno de hoy (maximo 3, ritmo calmado)

1. **PR #68 · KYNYKOS_AI_Agent** — SEGURIDAD (HIGH), subida a mano al puesto 1 · https://github.com/JULIANJUAREZMX01/KYNYKOS_AI_Agent/pull/68
   Inyeccion de argumentos en `git_operation`. Lista blanca del primer token con `shlex.split`, valida `repo_path` y bloquea `-c`, `--config-env`, `--upload-pack`, `--receive-pack`, `--exec-path`. 4 archivos, +111/−8, `clean`. Decision: **corregir**.
   Pendiente: `arg.startswith("-c")` bloquea tambien `git diff --cached` (falso positivo); faltan pruebas de bypass (`git -c core.fsmonitor=`, `--upload-pack=`, `repo_path` con `../`). Consolidar aqui y cerrar #60, #62, #66 y #49.
   Nota: el script lo dejo en la posicion 29 de 68 por peso de edad. Septimo dia consecutivo subiendolo a mano.

2. **PR #15 · cantabria-pms-demo** — REMEDIACION DE SEGURIDAD · https://github.com/JULIANJUAREZMX01/cantabria-pms-demo/pull/15
   `astro` 7.4.2 → 7.4.13. Cierra las 2 alertas abiertas de Dependabot: media (endpoint `/_image` de `@astrojs/node`) y baja (XSS por inyeccion de atributos en nombres de etiqueta dinamicos). 2 archivos, +1263/−325, todo lockfile. Decision: **corregir** (cambio respecto de ayer, que era aprobar).
   **Nuevo hoy:** el PR ya no esta `clean`, esta `unstable`. El job `verify` falla en el paso **Tipos (astro check, TypeScript estricto)**: la 7.4.13 rompe el chequeo estricto. No se mergea hasta arreglar los tipos o fijar 7.4.7 (primer parche de la alerta media).
   **Hallazgo:** el check `memoria` tambien falla, pero por un falso positivo. `memoria-guardian.yml` matchea el autor contra `sentinel|bolt|palette|...|bot` y `dependabot[bot]` cae ahi, asi que exige entrada en `docs/agentes/MEMORIA.md` a un bump de dependencias. **Todo PR de Dependabot va a fallar ese check siempre.** Fix: excluir `dependabot[bot]` del regex o saltar el job si el autor es bot de dependencias.

3. **PR #127 · MueveRepartoEnCancun-** · https://github.com/sistemascancunjefe-ai/MueveRepartoEnCancun-/pull/127
   Pruebas para `session.ts`, 1 archivo, +177, sin tocar desde el 4 de abril. GitHub lo da `dirty`. Decision: **corregir** (rebase y reejecutar suite).

## Fuera del turno
- **PR #1 · asio-platform** — `clean`, pero el arreglo son 2 lineas envueltas en +5636/−14 de 9 archivos (artefactos `.netlify` + sitemap). **Posponer** por quinta vez: que rehaga el diff minimo y meta `.netlify/` al `.gitignore`.
- **PR #43 · KYNYKOS_AI_Agent** — `dirty` desde el 20 de abril, fuera por conflicto aunque el script lo puso en el top 3.
- **#16 y #17 · cantabria-pms-demo** — bumps triviales (`vitest`, `gsap`), entran despues de #15.
- **`pages.yml` de cantabria-pms-demo** — el job `build` de Pages falla en `main` desde el 24 nov. `main` esta rojo, no solo el PR. Revisar aparte.

## Altas (48 h)
- ISSUE `JULIANJUAREZMX01.github.io#6` · Turno sentinel 2026-11-24
- ISSUE `KynicOS#11` · Turno sentinel 2026-11-24

## Nota de proceso
`scripts/cola.py` sigue sin criterio de severidad: ordena por edad, por eso el HIGH de 14 dias cae en la posicion 29 de 68. Fix pendiente: detectar `sentinel|security|CVE` con peso dominante.

Sin PRs abiertos ni merges en esta corrida.
