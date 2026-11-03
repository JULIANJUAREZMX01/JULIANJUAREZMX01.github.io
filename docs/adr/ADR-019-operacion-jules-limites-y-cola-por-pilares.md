# ADR-019 — Operación Jules: límites reales, servicios conectados y cola paralela por pilares

- **Fecha:** 3 de noviembre de 2026
- **Estado:** Aceptada
- **Contexto:** Jules entra en solo lectura el 11-nov-2026 y se apaga el 31-dic-2026. Quedan 8 días de capacidad real. Julián nunca ha alcanzado su límite diario y pide aprovechar la máquina para trabajo de backend, con personalidades por pilar y en paralelo, corrigiendo el diseño anterior que acumuló 108 PRs sin límite ni memoria.

## Contexto verificado (no supuesto)

| Dato | Valor medido | Cómo se comprobó |
| --- | --- | --- |
| Sesiones simultáneas | **3** | Cuarta petición devuelve `400 Precondition check failed`; con 2 activas la misma petición pasa |
| Límite diario | 15 por cuenta | Indicador "Daily session limit (3/15)" en la interfaz |
| Endpoint operativo | `v1alpha` | `v1` devuelve 404 |
| PR automático | `automationMode: AUTO_CREATE_PR` | Aceptado en creación de sesión |
| Conocimiento (knowledge) | **sin API** | `/sessions/{id}/knowledge` y `/v1alpha/knowledge` devuelven 404 |
| Tarea programada | **solo interfaz** | No existe campo de programación en la API; el "Schedule task" es UI |
| SESIONES cancelables | `DELETE /v1alpha/sessions/{id}` | Devuelve 200 y libera cupo |

**Consecuencia:** el contexto tiene que vivir en `AGENTS.md` del repositorio, no en la knowledge de la interfaz. Y la programación paralela la ejerce un despachador propio que respeta el techo de 3.

## Servicios conectados a Jules (inventario del 3-nov)

| Servicio | Estado observado | Decisión |
| --- | --- | --- |
| Context7 | conecta y responde | **Mantener**: documentación de librerías, útil para backend |
| Render | conecta; `list_workspaces` y `list_services` responden | **Mantener**: sirve para diagnóstico de despliegues |
| v0 | conecta | **Desconectar**: es interfaz y frontend; Jules aquí es backend |
| Stitch | conecta | **Desconectar**: diseño de UI |
| Linear | falla: sin herramientas | Desconectar; no se usa gestión de issues externa |
| Tinybird | falla: sin herramientas | Desconectar; no se usa analítica de eventos |
| Supabase | falla: sin herramientas | Descartado como base (ADR-018) |
| Neon | falla: sin herramientas | Requiere llave con permisos de organización; la actual está limitada al proyecto `muevecancun` |

De ocho conexiones, cuatro funcionan y cuatro fallan. Ninguna de las que falla es imprescindible hoy; dos de las que funcionan no sirven al propósito (v0 y Stitch son visuales).

## Decisión

1. **Jules se usa exclusivamente para backend.** Quedan fuera de su alcance interfaz, estilos, componentes visuales, copy y diseño. Ese trabajo lo asumen palette o trabajo humano.
2. **Cuatro pilares como personalidades**, cada una con su sesgo:
   - `sentinel` — seguridad y robustez: validación, timeouts, manejo de errores, permisos.
   - `bolt` — rendimiento medible: caches, estructuras O(1), menos I/O, menos llamadas.
   - `speedy` — consolidación: quitar duplicación, simplificar el camino caliente.
   - `palette` — solo accesibilidad y micro-UX no visual (etiquetas ARIA, foco, contraste).
3. **Techo de concurrencia 3 y máximo una sesión por repositorio.** Es la corrección del diseño anterior: 102 sesiones en un solo repo produjeron 108 PRs con colisiones en `.jules/sentinel.md` y `src/lib/app-params.js`.
4. **Todo despacho lleva `automationMode: AUTO_CREATE_PR`** pero **nunca** auto-merge. El PR es el mecanismo de revisión, no de publicación.
5. **Cada prompt exige entrada en `docs/agentes/MEMORIA.md`** con la medición. Sin memoria escrita, el siguiente agente repite el trabajo.
6. **Cola rotativa:** `scripts/jules_cola.py` mantiene una lista priorizada y despacha solo cuando hay cupo real, consultando el estado en vivo en lugar de enviar a ciegas.

## Capacidad de los 8 días

Con 15 sesiones diarias y techo de 3 concurrentes, el máximo útil es de **unas 100 sesiones**, siempre que se liberen a tiempo. En la práctica, con sesiones de 10 a 25 minutos, caben entre 6 y 8 ciclos por jornada. Prioridad: seguridad en KYNYKOS, rendimiento en MueveCancún y Kalpixk, consolidación en Cantabria y SAC_OS.

## Consecuencias

- Se deja de esperar que Jules programe tareas: no puede. La programación la aporta GitHub Actions (turno) y el despachador de cola.
- El cupo se gestiona como recurso escaso: una sesión atascada en `AWAITING_USER_FEEDBACK` bloquea un tercio de la capacidad.
- La knowledge de la interfaz queda como anexo opcional y desechable, nunca como fuente de verdad.
- Al apagarse Jules, la cola, las personas y el `AGENTS.md` sobreviven; solo cambia el ejecutor.
