# ADR-006: Adoptar el Estándar de arquitectura JAJA (AEI) y el plan de migración a Pages

- **Estado:** Aceptada · **Fecha:** 2026-11-03 · **Autor:** KynicOS (operador) · **Decisión de:** Julián Juárez
- **Fuente:** "Estándar de arquitectura JAJA y plan de migración a GitHub Pages", @JAJA01, 2-nov-2026
- **Copia canónica:** `docs/ARQUITECTURA.md`

## Contexto

Los proyectos han acumulado tres numeraciones de ADR, cuatro destinos de hosting y decisiones de datos
implícitas. Pages ya aloja el portafolio, Kalpixk y Cantabria (espejo), mientras Render y Vercel acumulan
servicios suspendidos por facturación.

## Decisión

1. Adoptar los cinco estratos del AEI: presentación estática, datos como archivos, frontera única
   (`src/gateway/`), servicios con proceso fuera de Pages y operación agéntica con humano que decide.
2. Todo sitio público en Pages usa `output: static`, `pages.yml` con Actions y gate de humo (200).
3. Ningún secreto, dato personal o llave en `PUBLIC_*`, `public/` ni historial de git.
4. Regla permanente: la frontera es una función de borde; Base44 queda como implementación `legacy`
   hasta alcanzar paridad, con ADR por componente.
5. Los saltos mayores de framework no se aceptan automáticamente: requieren ADR y rama dedicada.

## Aplicado el 3-nov-2026

- **MueveCancun / build roto:** causa raíz identificada (astro 7.2.8 rompe la entrada SSR) y revertida
  en el commit `cedcc42` con ADR-014 propio del repo. Build local verde en 4.7 s.
- **Cantabria / riesgo de secretos:** verificado en producción que el bundle público **no** contiene el
  token ni los PIN (modo `demo`). Se añadió un gate que falla el deploy si `GATEWAY_MODE=legacy` llega con
  el secreto cargado (commit `578f7fe` del repo Cantabria).

## Consecuencias

- Queda pendiente decidir: Supabase vs Neon, Pages vs Netlify para la landing del hotel, organización de
  la segunda cuenta, Worker vs Render para nanobot y dominio propio.
- La modernización a Astro 7 necesita su propio ADR y pruebas de paridad antes de reintentarse.
