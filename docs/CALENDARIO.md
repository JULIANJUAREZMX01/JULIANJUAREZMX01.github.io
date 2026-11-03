# Calendario vivo — Portafolio JAJA.DEV

## 2026-28-oct · Nexus semántico v2

- Rescatado el 'campo semántico Nexus' del portafolio original y reimplementado sin React/d3/R3F: grafo en SVG con física propia (repulsión + resortes + gravedad), 18 nodos (método, 6 proyectos, 5 tecnologías, 5 verticales) y 30 hilos. Hover/tap resalta vecinos, arrastre con pointer capture, clic abre proyecto, soporte de teclado, prefers-reduced-motion y lista textual equivalente. ADR-002.
- Archivos: src/data/nexus.ts (datos), src/client/nexus.ts (motor), sección #nexus en index, estilos en global.css.

## 2026-28-oct · Pendientes completados (CV, detalles, lab, dependencias)

- /cv/ imprimible con logros verificables (SAC ROI 3411%, Validador, preventiva, SQL maestro), experiencia, stack y proyectos; botón PDF vía window.print; enlace a LinkedIn. ADR-003.
- /proyectos/<slug>/: 6 páginas de detalle (problema, solución, métricas, stack, evidencia, enlaces) generadas con getStaticPaths.
- HomeLab (R720, UDM Pro, DS920+) y TerminalProfile rescatados con datos reales del repo original.
- Dependencias: astro 7.x + audit fix → 0 vulnerabilidades (antes 16, una crítica). Build: 8 páginas, check 0 errores.

## 2026-28-oct · Presentación al mundo: /yo, /kynicos, /diogenes + catálogo de 27 repos

- Páginas nuevas: /yo (el humano y su trayectoria), /kynicos (el agente operador: qué hace y qué no), /diogenes (codestyle de 8 principios + 6 reglas de estilo), /repos (catálogo navegable por categoría) y /repos/<slug> (ficha de cada repositorio). Total del sitio: 33 páginas estáticas.
- Catálogo verificado vía API de GitHub: 21 repositorios públicos + 6 privados declarados. Clasificados en producto / herramienta / cliente / plantilla / laboratorio, con evidencia real (commits, pruebas, demos).
- README reescrito con el enlace vivo en el encabezado, mapa de páginas, arquitectura, números verificables y enlaces a cada proyecto insignia. Documentos durables: docs/REPOSITORIOS.md y docs/CODESTYLE-DIOGENES.md.
- Honestidad de catálogo: los repos de laboratorio sin descripción (APP, GREEN16, AMERICANGLOBALGORUP) se listan declarando que hoy no aportan. Diógenes manda.

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

## 2026-03-nov · Estándar AEI aplicado + build de MueveCancun arreglado

- **MueveCancun:** build roto por astro 7.2.8 (entrada SSR). Revertido en `cedcc42`; build local verde (4.7 s). ADR-014 en ese repo.
- **Cantabria:** auditado el bundle público (sin token ni PIN, modo demo). Gate nuevo en `pages.yml` (commit `578f7fe`).
- **Portafolio:** `docs/ARQUITECTURA.md` (copia canónica del estándar) y ADR-006.
- **Pendiente:** decisión de Supabase/Neon, Pages vs Netlify, organización de la 2.ª cuenta, Worker vs Render, dominio propio.

## 3 nov 2026 — arquitectura y seguridad
- Cola multi-repositorio DACC operativa (scripts/cola.py, docs/COLA.md): 33 repos, 48 pendientes, tope 3/día
- Credenciales de Cantabria rotadas y guardadas cifradas en ja-vault (GPG AES-256)
- ADR-015 Neon Postgres · ADR-016 cola multi-repo
- Pendiente: reemplazar token y PINs en GitHub Secrets (requiere clic del dueño) y en la función cantabriaWrite

## 3 nov 2026 — sistema agéntico multi-repositorio (ADR-017)
- Kit desplegado en 12 repos: AGENTS.md, CLAUDE.md, GEMINI.md, docs/agentes/MEMORIA.md, ADR y 2 workflows
- Turno de agente probado de punta a punta: guardia anti-avalancha ✓, issue de turno generado ✓
- Documento canónico del sistema: `docs/AGENTES.md`
- Personas asignadas: sentinel (5 repos), palette (2), bolt (1), speedy (2)
- Pendiente prioritario: triaje de los 108 PRs abiertos en trs-cmu-c2-bares (cierre masivo con criterio)
- Próximo turno automático: lunes 09:00 America/Cancun
