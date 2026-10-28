# JAJA.DEV · Portafolio de Julián Juárez Alvarado

**Sitio en vivo:** https://julianjuarezmx01.github.io/

Portafolio profesional estático, sin servidores, construido con la arquitectura **DACC** (Desarrollo Agéntico de Ciclo Cerrado). Este repositorio no es solo una web: es el molde replicable de todos mis proyectos.

## Qué hay aquí

| Página | Contenido |
|---|---|
| [`/`](https://julianjuarezmx01.github.io/) | Portafolio: proyectos, método DACC, Nexus semántico, terminal, homelab, evidencia |
| [`/yo/`](https://julianjuarezmx01.github.io/yo/) | El humano: trayectoria, logros con métricas verificables y forma de trabajo |
| [`/kynicos/`](https://julianjuarezmx01.github.io/kynicos/) | El agente operador: qué hace, qué no hace y cómo funciona |
| [`/diogenes/`](https://julianjuarezmx01.github.io/diogenes/) | Diógenes.dev: codestyle de 8 principios y reglas de estilo |
| [`/repos/`](https://julianjuarezmx01.github.io/repos/) | Catálogo de 21 repositorios públicos + 6 privados, con ficha por proyecto |
| [`/cv/`](https://julianjuarezmx01.github.io/cv/) | CV imprimible (PDF vía navegador, sin servicios externos) |
| `/proyectos/<slug>/` | Detalle de los proyectos insignia (Cantabria, MueveCancún, Kalpixk, etc.) |

## Arquitectura

- **Presentación:** Astro 7 + TypeScript estricto, HTML estático en GitHub Pages (CDN, cero servidores)
- **Animación:** GSAP + ScrollTrigger + Lenis, con `prefers-reduced-motion` respetado
- **Nexus semántico:** grafo propio en SVG con física vanilla — sin d3, sin react-three, sin bloat (ADR-002)
- **Automatización:** CI (astro check + build) y deploy por workflow; workflow semanal de estado que sondea los sitios vivos y publica `status.json`
- **Gobernanza:** ADRs en `docs/adr/`, calendario vivo en `docs/CALENDARIO.md`, catálogo en `docs/REPOSITORIOS.md`

## Números verificables

- CI verde en cada push · 0 vulnerabilidades de dependencias · 33 páginas estáticas
- 0 servidores propios · 0 servicios de pago para el sitio · 0 plugins de CMS

## Proyectos insignia

- **Hotel Cantabria PMS** — [demo](https://julianjuarezmx01.github.io/cantabria-pms-demo/) · [repo](https://github.com/JULIANJUAREZMX01/cantabria-pms-demo) — 329 commits, 15 ADRs, 42 pruebas
- **MueveCancún** — [demo](https://mueve-cancun-sigma.vercel.app) · [repo](https://github.com/JULIANJUAREZMX01/MueveCancun)
- **Kalpixki** — [demo](https://julianjuarezmx01.github.io/Wasm-Kalpixk_IA_DevOps/) · [repo](https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps)

## Catálogo completo

Los 21 repositorios públicos, clasificados por producto, herramienta, cliente, plantilla y laboratorio:
**https://julianjuarezmx01.github.io/repos/**

## Contacto

- LinkedIn: https://www.linkedin.com/in/julianjuarezalvarado/
- GitHub: https://github.com/JULIANJUAREZMX01
- Correo: julianjuarezmx01@gmail.com
- Telegram del agente: @Kalpixk_AI_bot

---

Construido por **Julián Juárez Alvarado** con **KynicOS** como operador. Codestyle: **Diógenes.dev** — mínimo de piezas, máximo de función.
