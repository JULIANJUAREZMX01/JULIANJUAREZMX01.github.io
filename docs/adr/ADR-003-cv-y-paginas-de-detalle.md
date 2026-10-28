# ADR-003: CV imprimible y páginas de detalle por proyecto

- **Estado:** Aceptada · **Fecha:** 2026-10-28 · **Serie:** Portafolio JAJA.DEV

## Contexto

Los pendientes declarados eran: recuperar el HomeLab y el TerminalProfile del portafolio original, páginas de detalle por proyecto y CV descargable. Julián indicó que su CV también vive en LinkedIn, pero el portafolio no debe depender de servicios externos ni de sesiones para mostrar su trayectoria.

## Decisión

1. **CV propio en `/cv/`**: página HTML imprimible (CSS `@media print` que oculta navegación, Nexus, terminal y lab, y pasa a fondo blanco). El botón "Descargar / Imprimir PDF" usa `window.print()`: el PDF lo genera el navegador, sin servicio externo. Incluye un enlace al perfil de LinkedIn para el CV completo.
2. **Páginas de detalle** en `/proyectos/<slug>/` generadas con `getStaticPaths` desde `src/data/detalles.ts`: problema, solución, métricas, stack, evidencia y enlaces. Contenido separado de la presentación.
3. **HomeLab y TerminalProfile** reconstruidos con los datos reales del portafolio original (Dell R720, UDM Pro, Synology DS920+; perfil y skills de `profile/julian.json`), sin content collections ni JS extra.
4. **Dependencias**: Astro actualizado a 7.x y `npm audit fix`; de 16 vulnerabilidades (1 crítica) a **0**.

## Consecuencias

- El CV es texto real: se indexa, se traduce y se imprime sin plugins.
- Añadir un proyecto al sitio = una entrada en `detalles.ts` + su tarjeta.
- Se corrigió el correo del JSON original (`sistemascancunjefe@gmail.com.mx` → `.com`, y el principal `julianjuarezmx01@gmail.com`).
