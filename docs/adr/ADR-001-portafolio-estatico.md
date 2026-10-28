# ADR-001: Portafolio estático sin servidores (migración desde Render)

- **Estado:** Aceptada · **Fecha:** 2026-10-28 · **Serie:** JAJA.DEV Portafolio

## Contexto
El portafolio Nexus vivía en Render y quedó inaccesible por suspensión de facturación de toda la cuenta (7 servicios detenidos desde abril 2026). El objetivo: un portafolio que no dependa de servidores, servicios de pago ni alojamientos, y que además sirva de vitrina del método propio.

## Decisión
1. Sitio **estático Astro** desplegado en **GitHub Pages** (repo raíz `JULIANJUAREZMX01.github.io` → URL limpia), replicando la arquitectura DACC/AEI validada en Hotel Cantabria.
2. **Datos como archivos**: `public/status.json` se regenera con un workflow semanal que sondea los sitios vivos del portafolio; el propio repo guarda el historial.
3. **Motion premium** con GSAP + ScrollTrigger + Lenis, respetando `prefers-reduced-motion`.
4. **Gobernanza**: CI (astro check + build), ADRs, calendario vivo en `docs/CALENDARIO.md`.
5. Costo recurrente: **cero**. CDN de GitHub Pages.

## Consecuencias
- Positivas: disponibilidad independiente de facturación externa, velocidades de CDN, costo cero, trazabilidad git, y el sitio demuestra exactamente lo que vende.
- Negativas: sin CMS visual (contenido en código, decisión consciente por seguridad); los enlaces a demos externos (MueveCancún en Vercel, Mis Pekes) siguen dependiendo de sus plataformas — el estado se declara honestamente en cada tarjeta y en status.json.
- Evolución: i18n EN, caso de estudio largo por proyecto, y dominio propio cuando se decida.
