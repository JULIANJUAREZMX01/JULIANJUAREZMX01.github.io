# ADR-024 — Página operativa de la bóveda, publicada sin costo

- **Fecha:** 3 de noviembre de 2026
- **Estado:** Aceptada e implementada
- **Repositorio:** `JULIANJUAREZMX01/JULIANJUAREZMX01.github.io` · **Bóveda:** `JULIANJUAREZMX01/ja-vault`
- **Nota de numeración:** la secuencia de ADR es global entre repositorios. KynicOS usa 020-023; este continúa en 024 para no repetir números.

## Contexto

Hacía falta un documento operativo con los comandos exactos para trabajar con la bóveda desde Windows, porque el reglamento (`docs/agentes/BOVEDA.md`, PR #2) explica el porqué pero no el cómo hacerlo en PowerShell ni en CMD. Se intentó primero entregar un archivo HTML desde el CDN de la plataforma, y ese enlace caducó: devolvió 403 al segundero siguiente de una sesión. Un documento operativo que deja de abrir no sirve.

## Decisión

Publicar la página en el propio sitio del portafolio, en `public/boveda.html`, porque el proyecto es Astro: todo lo que vive en `public/` se copia tal cual a la raíz del sitio construido.

- URL: `https://julianjuarezmx01.github.io/boveda.html`
- Verificado: HTTP 200, título correcto, catorce bloques con botón de copiar.
- Costo: cero. GitHub Pages está incluido y el portafolio no debe depender de servicios de pago.
- Se eliminó la copia que se había subido a la raíz del repositorio, donde Astro no la sirve.

### Contenido de la página

Estado real de la bóveda (cuatro de cuatro archivos abren, con líneas por archivo), el diagnóstico del token de escritura que no es de GitHub, los comandos para PowerShell y CMD con pestañas, la verificación que descifra hacia la nada sin escribir texto plano, las cuatro prohibiciones y la rotación en su orden exacto.

### Regla de contenido

La página no contiene ningún valor de credencial, ni la frase, ni tokens, ni PINs. Solo comandos, nombres de archivo y reglas. El cifrado sigue siendo la única protección, no el secreto de la página.

## Consecuencias

- Los comandos quedaron accesibles desde el móvil sin pasar por GitHub, que era el problema real cuando se trabaja en una PC ajena.
- Cualquier cambio en la bóveda obliga a actualizar la página en el mismo turno, porque un documento operativo desactualizado es peor que uno inexistente.
- El enlace es permanente mientras el repositorio exista; no depende de la plataforma ni de un CDN con caducidad.
