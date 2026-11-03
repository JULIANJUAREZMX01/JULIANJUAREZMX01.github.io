# Estándar modular de repositorios — JAJA / AEI

- **Versión:** 1.0 · **Fecha:** 2026-11-03 · **Marco:** ADR-006 (AEI) y ADR de agentes
- **Naturaleza:** modular y revisable. Cada regla tiene identificador, verificación y fecha de revisión. Ninguna regla es eterna: para quitarla se propone un ADR y se marca como retirada, no se borra sin dejar rastro.

## 0. Cómo se cambia este estándar

1. Cualquier persona o agente propone el cambio en un ADR con el identificador de la regla afectada.
2. Si se acepta, se sube la versión menor (1.1, 1.2) y se anota en esta misma tabla el cambio y la fecha.
3. Una regla que deja de aplicar se marca **retirada** con su motivo. No se elimina la fila: el historial explica por qué el estándar cambió.
4. Cada regla se revisa cada trimestre. Si nadie la verificó en ese plazo, se marca **en revisión**, no se asume vigente.

## 1. Estructura de repositorio

| ID | Regla | Por qué | Cómo se verifica | Revisión |
| --- | --- | --- | --- | --- |
| MOD-01 | Todo repo tiene en la raíz: `README.md`, `AGENTS.md`, `.env.example`, `docs/` y `.github/workflows/` | Es la estructura que hoy comparten Kalpixk, KynicOS, MueveCancun, KYNYKOS_AI_Agent y el repo de estándares | `ls` en la raíz; faltante = hallazgo | 2027-02 |
| MOD-02 | `docs/` se divide en `adr/` para decisiones y `agentes/` para contexto de agentes | Las dos carpetas ya existen en el repo de estándares | listado de `docs/` | 2027-02 |
| MOD-03 | El nombre del repo describe el producto, no la herramienta | Nombres como `-DoctorCanc-nAgentNanoBot` cuestan tiempo en cada llamada de API | inspección | 2027-02 |
| MOD-04 | Un repo, un propósito. Los experimentos van a rama, no a repo nuevo | Hay más de 30 repos y varios solapan propósito | inventario trimestral | 2027-02 |

## 2. Agentes

| ID | Regla | Por qué | Cómo se verifica | Revisión |
| --- | --- | --- | --- | --- |
| AGT-01 | `AGENTS.md` usa las ocho secciones fijas: qué es y para quién, cómo está construido, método de trabajo, prohibiciones duras, verificación y terminado, glosario, dónde está el resto del contexto, cómo pedir ayuda | Kalpixk y KynicOS ya usan exactamente esas ocho; un agente que cambia de repo no re-aprende | diff de encabezados | 2027-02 |
| AGT-02 | `CLAUDE.md` y `GEMINI.md` son punteros de una línea a `AGENTS.md`, no copias | Copias divergen y producen instrucciones contradictorias | tamaño del archivo (< 5 líneas) | 2027-02 |
| AGT-03 | Un máximo de un PR abierto por agente por repo. Sin auto-merge | 102 sesiones produjeron 108 PRs con colisiones en `.jules/sentinel.md` y `src/lib/app-params.js` (ADR-019) | `GET /pulls?state=open` agrupado por autor | 2027-02 |
| AGT-04 | Lo aprendido se registra en `docs/agentes/MEMORIA.md` con medición antes/después. Sin medición, la fila se marca `sin_medicion` | La memoria hoy tiene 1 fila real frente a 4 archivos `.jules` sueltos | conteo de filas con formato válido | 2027-02 |
| AGT-05 | Las carpetas `.jules/` no son fuente de verdad: solo fichas por persona (`sentinel`, `bolt`, `speedy`, `palette`) alimentando la memoria | `.jules` desaparece con la herramienta el 31-dic-2026 | inventario de `.jules/*.md` | 2027-02 |

## 3. Secretos y llaves

| ID | Regla | Por qué | Cómo se verifica | Revisión |
| --- | --- | --- | --- | --- |
| SEC-01 | Ningún valor real en el repositorio, ni en `PUBLIC_*`, `public/` ni historial de git. `.env.example` documenta nombres, nunca valores | Regla ya vigente en ADR-006 | escaneo de secretos en CI | 2027-02 |
| SEC-02 | Las llaves de agente viven en GitHub Actions secrets con nombre estándar (`JULES_API_KEY`) y en el gestor de secretos del agente. Nunca en el código | Se aplicó el 2026-11-03 en cinco repos con respuesta 201 de GitHub | `GET /actions/secrets` por repo | 2027-02 |
| SEC-03 | Rotación trimestral y al cambiar de persona. Al rotar: nuevo valor en el gestor, propagar con `githubSetSecret`, revocar el anterior | Una llave filtrada sobrevive en el historial de git si no se rota | bitácora de rotación | 2027-02 |
| SEC-04 | Las llaves de Google conservan su prefijo completo; el gestor de secretos puede redactarlo al guardar y la API devuelve 401 | Costó varias horas el 3-nov-2026: 53 caracteres con prefijo, 50 sin él | longitud y prefijo al validar | 2027-02 |
| SEC-05 | Un secreto por cuenta y por propósito, no una llave compartida entre todos los agentes | Dos cuentas de Google ya operan en paralelo | inventario de secretos | 2027-02 |

## 4. Documentación

| ID | Regla | Por qué | Cómo se verifica | Revisión |
| --- | --- | --- | --- | --- |
| DOC-01 | El `README.md` abre con estado, fecha y riesgos conocidos, no con la visión | Los README actuales prometían cosas ya vencidas (Kalpixk y su hackathon) | primeras 10 líneas | 2027-02 |
| DOC-02 | Toda decisión de arquitectura entra como ADR numerado en `docs/adr/`, con estado y consecuencia | Ya hay nueve ADR; el número debe ser único y no reutilizarse | `ls docs/adr` | 2027-02 |
| DOC-03 | Los documentos de estado llevan fecha en el nombre o en la cabecera (`ESTADO-ACTUAL.md`) | Sin fecha no se sabe si el estado es real | cabecera | 2027-02 |
| DOC-04 | Enlaces relativos dentro del repo; URL absoluta cuando cruza de repositorio | Los enlaces relativos se rompen al mover carpetas | revisión de enlaces | 2027-02 |

## 5. CI y verificación

| ID | Regla | Por qué | Cómo se verifica | Revisión |
| --- | --- | --- | --- | --- |
| CI-01 | Cada repo tiene al menos un workflow que corre en cada PR y falla si las pruebas fallan | KynicOS acumuló 7 fallos seguidos y nadie lo frenó | `GET /actions/runs` | 2027-02 |
| CI-02 | El gate de humo 200 aplica a sitios estáticos en Pages; no sustituye a las pruebas | ADR-006 pide humo, pero un sitio puede responder 200 y estar roto | revisión del workflow | 2027-02 |
| CI-03 | Un workflow rojo por dos corridas seguidas se trata como incidente: se abre issue o se apaga el workflow, no se ignora | MueveCancun tiene tres workflows rojos abiertos | historial de corridas | 2027-02 |

## 6. Observabilidad

| ID | Regla | Por qué | Cómo se verifica | Revisión |
| --- | --- | --- | --- | --- |
| OBS-01 | Cada sistema crítico publica snapshot cada 6 horas con delta contra el anterior | Hoy corre para DACC, RC Caribe y migración de Jules | entidad de snapshot por sistema | 2027-02 |
| OBS-02 | Lo que no se puede verificar con credencial se reporta como limitación, nunca como dato | Sin API de Render, el estado de los bots es una suposición | campo `unverifiable` en el snapshot | 2027-02 |
| OBS-03 | Todo snapshot guarda el crudo en `digest_json` para poder auditar el reporte después | Un resumen sin crudo no es evidencia | revisión del registro | 2027-02 |

## 7. Estado de cumplimiento al 3-nov-2026

| Regla | Estado | Evidencia |
| --- | --- | --- |
| MOD-01 | Cumple en 5 de 7 repos revisados | `C2-PALLADIUM` y `SAC_OS` no responden en la API (renombrados o privados) |
| AGT-01 | Cumple en 2 repos | Kalpixk y KynicOS comparten las ocho secciones exactas |
| AGT-03 | **No cumple** | 30 PRs abiertos en Kalpixk, 13 en MueveCancun, 8 en KYNYKOS_AI_Agent |
| AGT-04 | **No cumple** | 1 fila en `MEMORIA.md` frente a 4 archivos `.jules` |
| SEC-01 | Cumple | El bundle público de Cantabria se verificó sin token ni PIN (ADR-006) |
| SEC-02 | Cumple desde hoy | `JULES_API_KEY` aplicado en Kalpixk, KynicOS, MueveCancun, KYNYKOS_AI_Agent y el repo de estándares |
| CI-01 | **No cumple** | `KynicOS Tests` falló 7 veces seguidas el 3-nov |
| CI-03 | **No cumple** | Tres workflows rojos en MueveCancun sin incidente abierto |

> Este documento es la referencia. Las fichas operativas viven en `docs/agentes/` (`JULES-SETUP.md`, `MIGRACION-JULES-Y-BUCLE-KYNICOS.md`, `MEMORIA.md`).
