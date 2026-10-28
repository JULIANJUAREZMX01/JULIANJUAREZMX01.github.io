# Calendario vivo — Portafolio JAJA.DEV

## 2026-28-oct · Nexus semántico v2

- Rescatado el 'campo semántico Nexus' del portafolio original y reimplementado sin React/d3/R3F: grafo en SVG con física propia (repulsión + resortes + gravedad), 18 nodos (método, 6 proyectos, 5 tecnologías, 5 verticales) y 30 hilos. Hover/tap resalta vecinos, arrastre con pointer capture, clic abre proyecto, soporte de teclado, prefers-reduced-motion y lista textual equivalente. ADR-002.
- Archivos: src/data/nexus.ts (datos), src/client/nexus.ts (motor), sección #nexus en index, estilos en global.css.

## 2026-28-oct · Pendientes completados (CV, detalles, lab, dependencias)

- /cv/ imprimible con logros verificables (SAC ROI 3411%, Validador, preventiva, SQL maestro), experiencia, stack y proyectos; botón PDF vía window.print; enlace a LinkedIn. ADR-003.
- /proyectos/<slug>/: 6 páginas de detalle (problema, solución, métricas, stack, evidencia, enlaces) generadas con getStaticPaths.
- HomeLab (R720, UDM Pro, DS920+) y TerminalProfile rescatados con datos reales del repo original.
- Dependencias: astro 7.x + audit fix → 0 vulnerabilidades (antes 16, una crítica). Build: 8 páginas, check 0 errores.

## Próximos turnos
| Fecha | Foco previsto |
|---|---|
| Lun 2 nov 2026 | Revisar status.json generado por el workflow; decidir si Mis Pekes y MueveCancún se migran a Pages/Vercel estable |
| Lun 9 nov 2026 | Añadir versión EN del portafolio + dominio propio |
| Lun 16 nov 2026 | Caso de estudio largo de Cantabria (ADR-001 del PMS) enlazado desde el portafolio |

## Pendientes (requieren a Julián)
- Confirmar visibilidad de repos privados (MueveCancun) para enlazarlos o publicarlos.
- Decidir dominio propio (p. ej. jajadev.mx) — el sitio está listo, solo se cambia `site` en astro.config.
- Autorizar publicación de capturas/evidencias de clientes (Mis Pekes, hoteles).

## Registro
- 2026-10-28 · Nace el portafolio estático (ADR-001): Astro + Pages, motion GSAP, status semanal, CI y gobernanza. Métricas de referencia: 0 servidores, 0 costo recurrente.
