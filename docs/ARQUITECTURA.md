<!-- Adoptado del documento del autor (2-nov-2026); ver docs/adr/ADR-006-estandar-arquitectura-aei.md -->
> **Estado en el portafolio:** este documento es el estándar vigente de arquitectura (AEI).
> Verificado y aplicado parcialmente el 3-nov-2026: ver ADR-006 y docs/CALENDARIO.md.

# Estándar de arquitectura JAJA y plan de migración a GitHub Pages

Nov 2, 2026 · @JAJA01

Todo lo estático puede vivir en GitHub Pages con CI/CD, ADR y workflows propios; lo que necesita un proceso en ejecución (agente, webhooks, APIs, escrituras con datos de personas) requiere una capa de borde y una base PostgreSQL fuera de Pages. Antes de migrar hay que cerrar un riesgo de secretos en Cantabria y arreglar el build roto de MueveCancun.

## 1. Qué cabe y qué no en GitHub Pages

| Tema | Regla vigente | Consecuencia |
| --- | --- | --- |
| Contenido | Solo estático; no ejecuta código de servidor | Nada de bots, webhooks ni APIs en Pages |
| Tamaño | Sitio publicado de hasta 1 GB; repo recomendado hasta 1 GB | Optimizar imágenes y audio |
| Tráfico | Límite blando de 100 GB al mes | Suficiente para portafolio y demos |
| Builds | 10 por hora (no aplica con un workflow propio de Actions); despliegue de 10 minutos máximo | Usar siempre `pages.yml` con Actions |
| Cuentas | Un sitio de usuario u organización por cuenta; el resto son sitios de proyecto en `/repo` | `JULIANJUAREZMX01.github.io` es el sitio de usuario |
| Planes | Repos públicos en Free; privados requieren Pro, Team o Enterprise | Un sitio de Pages es público; no poner datos privados |
| Términos | No es hosting gratuito para un negocio en línea ni para transacciones sensibles | Sitios con ventas o pagos van a otro destino estático |

Fuente: [GitHub Docs, límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), consultada el 2 de noviembre de 2026.

## 2. Inventario y destino

| Proyecto | Hoy | Destino | Fase |
| --- | --- | --- | --- |
| Portafolio | Pages (ya) y Render suspendido | Pages; borrar el servicio de Render | 1 |
| MueveCancun (PWA) | Render estático, último build **fallido** | Pages como sitio de proyecto, con `output: static` | 0 y 1 |
| QueRutaMeLLevaCancun | Render estático, mismo repo que MueveCancun | Absorber en el build de MueveCancun | 1 |
| MueveCancun servicio web | Render, runtime Python, suspendido | Retirar; lo que sea API pasa a función de borde | 2 |
| Teotl V4 | Render estático | Pages (ya tiene `wasm-build.yml` y `web-build.yml`) | 1 |
| Kalpixk | Interfaz en Pages (`deploy-pages.yml`) y API en Python | Interfaz en Pages; API con ADR propio fuera de Pages | 2 |
| Hotel Cantabria | Pages (espejo), Netlify (producción propuesta) y Base44 | Landing en Pages; PMS escribe por función de borde y PostgreSQL | 0 y 2 |
| nanobot-cloud / KYNYKOS | Render, servicio web suspendido | **No Pages**: workflows programados y un Worker para el webhook de Telegram | 3 |
| ASIO | Cloudflare Pages y FastAPI | Sitio comercial en Cloudflare Pages; API fuera de Pages | 3 |
| KynicOS | Orquestación en Python | No Pages; solo su documentación | 3 |

## 3. Estándar de arquitectura (AEI)

Se basa en tu propio método (DACC/AEI), en el codestyle Diógenes.dev y en los ADR de MueveCancun. El detalle está en `docs/ARQUITECTURA.md` del kit.

- **Cinco estratos:** presentación estática en Astro; datos como archivos versionados; frontera única (`src/gateway/`); servicios con proceso fuera de Pages; operación agéntica con humano que decide.
- **Reglas:** salida `static`; tipos estrictos; dependencia nueva o salto mayor de framework con ADR; acciones fijadas por SHA; un comando construye y otro prueba; sin secretos ni datos personales en el cliente, en `public/` o en el historial.
- **Estructura de repo:** `.github/workflows/`, `docs/adr/`, `scripts/`, `src/domain/` (lógica pura), `src/gateway/`, `src/client/`, `public/` (solo datos públicos).

## 4. CI/CD y gates

| Gate | Dónde | Falla cuando |
| --- | --- | --- |
| Tipos y pruebas | `ci.yml` | `npm run check` o `npm test` fallan |
| Superficie pública | `ci.yml` y `pages.yml` | hay `PUBLIC_*` con secretos, CURP, tokens o llaves |
| ADR | `ci.yml` en PR | dependencia nueva sin ADR (aviso; fallo con `ADR_STRICT=true`) |
| Build | `ci.yml` y `pages.yml` | `npm run build` falla |
| Humo | `pages.yml` | la URL publicada no responde 200 |
| CodeQL | `codeql.yml` | hallazgos de seguridad |
| Auditoría semanal | `audit-weekly.yml` (lunes 09:00, Cancún) | `npm audit` encuentra vulnerabilidades altas |
| Dependabot | `dependabot.yml` | los saltos mayores de Astro y Vite quedan bloqueados hasta tener ADR |

El gate de superficie pública se probó contra tus repos: marca **16 errores en Cantabria**, 0 en el portafolio y 1 falso positivo en MueveCancun (`PUBLIC_MAPBOX_TOKEN`, un token público de mapas que se declara en la lista de excepciones).

## 5. Datos, base de datos y alojamiento

**Decisión:** cuatro niveles, y PostgreSQL administrado con RLS para todo dato de personas.

| Nivel | Cuándo | Dónde vive | Proyecto |
| --- | --- | --- | --- |
| 0. Git como dato | Solo lectura y público | JSON o CSV validados en CI | Catálogo de rutas (78 rutas), `status.json` |
| 1. Cliente | Estado local y cola offline | IndexedDB o SQLite en WASM | Cola de sincronización de MueveCancun |
| 2. Transaccional | Personas, escrituras y roles | PostgreSQL con RLS (Supabase o Neon), solo por función de borde | Reservas de Cantabria |
| 3. Memoria de agentes | Historial de agentes | Tablas en el mismo PostgreSQL o archivos sin datos personales | KynicOS y nanobot |

- **Supabase o Neon:** MueveCancun ya tiene `docs/SUPABASE_MIGRATION.md` y un workflow `neon_workflow.yml`, así que ambos están evaluados. Elige uno; Supabase incluye autenticación, RLS y funciones de borde en el mismo servicio. Revisa los límites y precios vigentes antes de decidir.
- **Alojamiento:** la base en el proveedor administrado, la función de borde junto a ella (o en Cloudflare Workers o Netlify), migraciones SQL en el repo y aplicadas desde CI.
- **Gateway:** se conserva la interfaz de `src/gateway/`; Base44 queda como implementación `legacy` hasta tener paridad.
- **Respaldo:** exportación diaria a CSV cifrado fuera de un repo público; el dueño puede exportar sus datos.
- **MueveCancun:** el ADR-006 define tiers de pago (3 y 10 USD al mes); el cobro debe ir por un proveedor de pagos con página alojada, no por Pages.

## 6. Secretos y seguridad: hallazgo de Cantabria

- **Qué se ve en el código \[H\]:** `pages.yml` pasa `PUBLIC_WRITE_TOKEN`, `PUBLIC_STAFF_PIN` y `PUBLIC_OWNER_PIN` al build, y `src/gateway/index.ts` los lee en el cliente. En Astro, toda variable `PUBLIC_*` se incrusta en el JavaScript de cada visitante.
- **Cuándo se expone \[inferencia\]:** el valor por defecto del modo es `demo`; con la variable de repo `GATEWAY_MODE=legacy` los tres valores quedan en el bundle público. No pude abrir el sitio para ver en qué modo corre producción.
- **Acción:** (1) revisa `GATEWAY_MODE` en Settings > Variables; (2) si es `legacy`, rota el token y los PIN hoy; (3) pasa a `proxy` con `netlify/functions/api.ts`, que ya existe (`/api/login`, `/api/event`, `/api/snapshot`); (4) quita los datos de huéspedes de `data.js` y revísalo en el historial de git.
- **Regla permanente:** ADR-0004 del kit: cero secretos en el cliente; la frontera es una función de borde.

## 7. Identidad: GitHub y Gmail

- **Roles:** `JULIANJUAREZMX01` como identidad personal y firmante; `sistemascancunjefe-ai` como marca. Parece ser una cuenta personal; si necesitas equipos, reglas de rama y entornos protegidos, conviértela en una organización de GitHub.
- **Acceso:** una sola forma de entrar por cuenta, con llaves de acceso (passkeys) o llave de seguridad y 2FA, tanto en las dos cuentas de GitHub como en los dos Gmail. Gmail queda como correo de registro y recuperación.
- **Commits:** al menos tres correos Gmail asociados a tus identidades aparecen en commits públicos. Usa el correo `noreply` de GitHub y activa el bloqueo de pushes que expongan el correo; `.mailmap` unifica los nombres ("JAJA DEV", "Julian Juarez", "JULIANJUAREZMX01") en uno. Lo ya publicado solo se borra reescribiendo el historial.
- **Alertas:** revisa las alertas de seguridad de Google de la cuenta principal.

## 8. ADR y documentación

- **Un formato:** `docs/adr/ADR-NNNN-titulo.md`, cuatro dígitos. Hoy hay tres numeraciones distintas en tres repos.
- **Estados:** Propuesta, Aceptada, Reemplazada, Rechazada. Los ADR 007 a 012 de Cantabria siguen en Propuesta aunque ya están en producción; hay que cerrarlos.
- **Cinco ADR iniciales** en el kit: registrar decisiones, GitHub Pages como hosting, niveles de datos, secretos y frontera, identidad de cuentas.
- **Contradicción pendiente:** `ARCH_MANIFEST.md` de MueveCancun prohíbe LLM en la nube desde el cliente, y `AGENTS.md` describe un agente serverless con Groq. Un ADR debe aclarar que el endpoint corre en el borde y no en el navegador.

## 9. Plan por fases

1. **Fase 0, hoy:** cerrar el riesgo de Cantabria (sección 6); arreglar el build de MueveCancun (fijar Astro en 6.4.4 o corregir la entrada SSR); activar secret scanning y push protection.
2. **Fase 1, semana 1:** instalar el kit en `github.io`, MueveCancun y Teotl-V4; absorber QueRutaMeLLevaCancun; apagar los servicios estáticos de Render; proteger `main`.
3. **Fase 2, semanas 2 y 3:** PostgreSQL con RLS y función de borde para Cantabria; modo `proxy` en producción; retirar Base44 tras paridad; ADR de la API de Kalpixk.
4. **Fase 3, semana 4:** agentes con workflows y un Worker de Telegram; ASIO en Cloudflare Pages; documentación de KynicOS en Pages.
5. **Fase 4, continua:** auditoría semanal, cierre de ADR y `.mailmap`.

Criterio de salida por fase: CI en verde, página respondiendo 200, ADR aprobado y sin hallazgos de superficie pública.

## 10. Decisiones que necesito de ti

- [ ] ¿Cantabria sigue en Pages como landing informativa o pasa a Netlify por los términos de GitHub?
- [ ] ¿Supabase o Neon?
- [ ] ¿Convertimos `sistemascancunjefe-ai` en organización?
- [ ] ¿El agente nanobot va a un Worker gratuito o a un plan de pago de Render?
- [ ] ¿Usas un dominio propio (por ejemplo para `jaja.dev`)?

## Fuentes

- [GitHub Docs: límites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- Repos leídos: `cantabria-pms-demo`, `MueveCancun`, `JULIANJUAREZMX01.github.io`, `Teotl-V4`, `Wasm-Kalpixk_IA_DevOps`, `KYNYKOS_AI_Agent` (clon del 2 de noviembre de 2026).
- Capturas del panel de Render y registro de deploy `7a21b47` aportados por el autor.
