# ADR-002: Nexus semántico como grafo propio en SVG

- **Estado:** Aceptada · **Fecha:** 2026-10-28 · **Serie:** Portafolio JAJA.DEV

## Contexto

El portafolio original (Portfolio_JAJA_DEV, cuenta sistemascancunjefe-ai) tenía un "Nexus semántico": un grafo donde cada proyecto era un nodo interconectado. Julián lo quiere de vuelta porque explicaba su trabajo como sistema, no como lista. La versión original dependía de React + d3 + framer-motion + @react-three/fiber (R3F) con post-procesado: decenas de KB, tres ecosistemas y un canvas 3D para dibujar veinte círculos.

## Decisión

Reimplementar el Nexus SIN dependencias nuevas:

- **Física propia** (repulsión, resortes y gravedad al centro) en `src/client/nexus.ts`, ~180 líneas de TypeScript.
- **Render en SVG** (nodos, hilos y etiquetas como elementos del DOM): accesible por teclado, texto seleccionable, sin canvas opaco.
- **Simulación por pasos**, no bucle perpetuo: se estabiliza al cargar (420 pasos) y solo recalcula al arrastrar o cambiar de tamaño. Ahorra batería y CPU.
- **Interacción:** hover/tap resalta vecinos y atenúa el resto; arrastre con pointer capture; clic o Enter abre el proyecto.
- **Degradación:** `prefers-reduced-motion` calcula el layout sin animación; y la sección incluye la lista textual completa de conexiones para lectores de pantalla.

## Consecuencias

- 0 KB de dependencias nuevas (antes: React + d3 + framer-motion + three).
- El grafo es texto real: indexable, traducible y auditable por agentes.
- Los datos viven en `src/data/nexus.ts`, separados de la presentación: agregar un proyecto = dos líneas de datos.
- Coste asumido: menor espectáculo visual que un canvas 3D; se compensa con halo en el hub, resaltado de vecinos y lectura inmediata.
