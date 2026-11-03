# Memoria compartida de agentes — JULIANJUAREZMX01.github.io

> Una sola bitácora para todos los agentes y herramientas. Léela antes de trabajar; agrega UNA entrada al terminar.
> Formato: fecha · área · problema · técnica · resultado. No dupliques. Esta memoria sobrevive aunque cambie la herramienta.

| Fecha | Área | Problema | Técnica aplicada | Resultado |
|---|---|---|---|---|
| 2026-11-03 | Inicio | Memoria creada | Sembrada al migrar de Jules | Pendiente de aprendizajes |
| 2024-05-18 | Seguridad | Ruido tensorial adversarial (FGSM/PGD) que ciega a los autoencoders | Auditoría de rugosidad de tensor en Zig/WASM antes de la inferencia (`v7_audit_tensor`) | Perturbaciones invisibles detectables a nivel de bit |
| 2024-05-22 | Seguridad | JIT spraying y evasión por deduplicación de buffers en nodos descentralizados | Entropía caótica no lineal (Logistic Map) y padding polimórfico de instrucciones | JIT Shield activo en la capa de metal (Zig/Rust) |
| 2026-04-09 | Rendimiento | Derivaciones sin memo en el dashboard y bucles nativos de Python en ML | `useMemo` para derivados de arrays grandes; NumPy vectorizado (`np.clip`, `np.abs`) en lugar de list comprehensions | Menos re-render y menos CPU en rutas calientes sobre MI300X |
| 2024-04-13 | Rendimiento | Cálculo de estados derivados en el cuerpo del componente con logs llegando cada segundo | `useMemo` con dependencias ajustadas (`[events]`) | Se evita O(N) por cada actualización de estado no relacionada |
| 2024-04-14 | Rendimiento | Listas con índice como key provocaban remount de todas las filas al llegar un log | Keys estables (timestamp + log crudo) y fila extraída en componente con `React.memo()` | Render O(1) por evento nuevo en lugar de O(N) |
| 2024-05-20 | Rendimiento | Intervalos de alta frecuencia (70–1000 ms) arrastraban cascadas de render en componentes pesados | `React.memo()` en hijos pesados para cortar la cascada | CPU estable con reloj y animaciones activas |
| 2024-05-21 | Datos | N+1 al insertar anomalías una por una en `/analyze` | Acumular payloads y `executemany` en una sola transacción | Throughput del endpoint sin degradación por lote |
| 2026-08-14 | Rendimiento | Recálculo de `strikes` y `targetedAlerts` en `WarRoomTab` en cada render | `useMemo` con `terminalOutput` y `alerts` como dependencias | Menos ciclos de cómputo en la vista de guerra |
| 2026-11-03 | Gobernanza | 102 sesiones en un solo repo produjeron 108 PRs con colisiones en `.jules/sentinel.md` y `src/lib/app-params.js` | Techo de 3 sesiones simultáneas, una por repositorio, `automationMode: AUTO_CREATE_PR` y sin auto-merge (ADR-019) | El PR vuelve a ser mecanismo de revisión, no de publicación |
| 2026-11-03 | Gobernanza | El conocimiento de Jules moría con la herramienta | Reglas a `AGENTS.md`, aprendizajes a esta memoria, personas a `.jules/{persona}.md` | La cola, las personas y las reglas sobreviven al apagado del 31-dic |

## Personas y su sesgo

- **sentinel** — seguridad y robustez: validación en la frontera, timeouts, permisos, manejo de errores.
- **bolt** — rendimiento medible: menos I/O, estructuras O(1), caches, menos llamadas.
- **speedy** — consolidación: quitar duplicación y simplificar el camino caliente.
- **palette** — accesibilidad y micro-UX no visual: etiquetas ARIA, foco, contraste. Nunca diseño visual.

## Reglas duras (ADR-019)

1. Jules se usa solo para backend. Interfaz, estilos, componentes visuales, copy y diseño quedan fuera.
2. Techo de 3 sesiones simultáneas y máximo una sesión por repositorio.
3. Todo despacho lleva `automationMode: AUTO_CREATE_PR`. Nunca auto-merge.
4. Cada encargo exige entrada en esta memoria con la medición.
5. La programación no la hace Jules: la aportan GitHub Actions y `scripts/jules_cola.py`.

## Origen de esta migración

Absorbidas las fichas de `Wasm-Kalpixk_IA_DevOps/.jules/`: `sentinel.md`, `bolt.md`, `ordnance_ops.md` (operaciones Atlatl-Ordnance v5–v9), `WASM_COMPILE_TASK.md` (compilación del core WASM y montaje del dashboard). Las personas `speedy.md` y `palette.md` no existían en ese repositorio y se crearon el 3-nov-2026.

Lecciones aún sin medir de `ordnance_ops.md` (hardening v5–v9): las fichas describen vectores y defensas, pero no reportan cifras antes/después. Cualquier agente que las retome debe aportar la medición o no entra a esta tabla.
