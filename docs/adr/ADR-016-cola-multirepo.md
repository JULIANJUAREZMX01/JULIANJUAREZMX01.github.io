# ADR-016: cola multi-repositorio con cadencia calmada

- **Estado:** Aceptado (3 nov 2026)
- **Contexto:** el trabajo está repartido en 33 repositorios activos con 48 unidades pendientes; revisar todo de golpe produce ruido y decisiones apresuradas. Jules estaba apuntado a un solo repositorio.
- **Decisión:** una cola única que inventaría todos los repos, prioriza por edad, tipo y riesgo, y publica como máximo **3 unidades al día** en `docs/COLA.md`. El agente corre la cola desde su agenda, no cada repo por su cuenta. Cada unidad se cierra con micro-decisión explícita (aprobar, corregir, posponer).
- **Mecánica:** `scripts/cola.py` usa la API de GitHub con el token del agente, calcula peso = 2×días + 25 si es PR + 40 si toca seguridad, y ordena descendentemente.
- **Consecuencias:** + una sola fuente de verdad · + ritmo sostenible · + el agente decide con datos frescos · − los repos inactivos siguen entrando al inventario y hay que depurarlos.
