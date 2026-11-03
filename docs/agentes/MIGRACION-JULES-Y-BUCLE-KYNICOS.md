# Migración de Jules y bucle de entrenamiento KynicOS

- **Estado:** propuesta para revisión (PR, sin merge automático)
- **Fecha:** 2026-11-03
- **Autor:** agente KynicOS (Base44)
- **Marco:** ADR-006 (estándar AEI) y ADR de agentes (`AGENTS.md` como fuente única de reglas)

## 1. Por qué este documento

Jules (Google) pasa a **solo lectura el 2026-11-11** y **se apaga el 2026-12-31**. Hoy su conocimiento operativo (personas Bolt, Sentinel, Palette, Speedy; reglas de trabajo; decisiones de arquitectura) vive en su consola y en carpetas `.jules/` repartidas por repo. Si no se migra antes del 11-nov, se pierde contexto y se duplican PRs.

Objetivo: que **KynicOS** sea el operador que herede ese conocimiento, entrene con las reglas compartidas y se pruebe de forma continua en `Wasm-Kalpixk_IA_DevOps` y los demás repositorios.

## 2. Configuración de Jules (estado actual y límites)

| Parámetro | Valor |
| --- | --- |
| Modo desde 11-nov-2026 | solo lectura |
| Apagado total | 31-dic-2026 |
| Alcance por tarea | máximo **un PR abierto por agente** |
| Merge automático | **prohibido** |
| Carpetas propias | `.jules/` por repo (a retirar) |
| Destino de reglas | `AGENTS.md` en la raíz |
| Destino de memoria | `docs/agentes/MEMORIA.md` |
| Perfil de riesgo del repo de estándares | bajo |

Regla operativa: Jules deja de ser el lugar donde vive el criterio. Pasa a ser, mientras siga encendido, un ejecutor al que se le entrega contexto desde `AGENTS.md` y `MEMORIA.md`.

## 3. Checklist de migración (antes del 11-nov-2026)

1. Consolidar en `AGENTS.md` toda regla que hoy solo exista en `.jules/` o en la consola.
2. Volcar a `docs/agentes/MEMORIA.md` el conocimiento de Bolt, Sentinel, Palette y Speedy: qué hace cada uno, qué decidió, qué quedó pendiente.
3. Retirar de cada repo las carpetas `.jules/` una vez portadas; dejar solo el puntero.
4. Verificar que `.env.example` documente cada variable y que ningún valor real esté en el repo.
5. Confirmar el gate de secretos: nada en `PUBLIC_*`, `public/` ni historial de git (ADR-006).
6. Cerrar el backlog de PRs abiertos: la regla es uno por agente, y hoy hay 30 en Kalpixk, 13 en MueveCancun y 8 en KYNYKOS_AI_Agent.
7. Etiquetar en cada repo el commit de corte de la migración para poder auditar después.

## 4. Bucle de entrenamiento KynicOS

El ciclo que se busca es cerrado y verificable, no conversacional:

1. **Ingesta.** KynicOS lee `AGENTS.md` y `docs/agentes/MEMORIA.md` (fuente única) y el `ROADMAP_AMD.md` de cada repo.
2. **Propuesta.** KynicOS redacta el cambio y lo abre como PR (rama descriptiva, sin merge).
3. **Contraste.** El agente Base44 (este agente) revisa el PR contra los ADR vigentes, los gates de CI y las reglas de estilo (`CODESTYLE-DIOGENES.md`).
4. **Prueba.** El cambio se valida en el repo más exigente primero (`Wasm-Kalpixk_IA_DevOps`: build + tests + humo) y luego se replica.
5. **Registro.** Lo aprendido se escribe en `MEMORIA.md`; el humano decide y mergea.
6. **Medición.** Cada 6 horas el monitor reporta commits, PRs abiertos, fallas de workflow y correos de claves o accesos, para detectar si el bucle produce ruido o avance real.

Señal de que el bucle funciona: PRs por agente ≤ 1, CI en verde, y `MEMORIA.md` creciendo con decisiones, no con transcripciones.

## 5. Riesgos conocidos

- **Ruido de PRs.** 51 PRs abiertos hoy entre tres repos contradicen la regla de uno por agente. Antes de añadir otra persona o agente al bucle hay que drenar el backlog.
- **CI inestable.** `KynicOS Tests` falló 6 veces consecutivas el 3-nov y MueveCancun tiene fallas en `CI / Security & Quality` y en `Guardián de memoria de agentes`. Sin CI verde el bucle no puede autocorregirse.
- **Hosting en transición.** Render y Vercel acumulan servicios suspendidos por facturación; mientras la migración a Pages no cierre, cualquier "ya quedó desplegado" es frágil.
- **Secretos.** Cualquier automatización que lea o escriba credenciales debe pasar por variables del proveedor, nunca por el repositorio.

## 6. Siguiente paso propuesto

Drenar primero el backlog de PRs de `Wasm-Kalpixk_IA_DevOps`, arreglar `KynicOS Tests`, y solo entonces abrir el bucle de entrenamiento con KynicOS como operador único.
