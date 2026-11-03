# Configuración de Jules — operación, credenciales y despacho

- **Fecha:** 2026-11-03 · **Estado:** vigente · **Marco:** ADR-019
- **Cuentas:** julianjuarezmx01@gmail.com (proyecto GCP 163092119641) · alexander24kx@gmail.com (proyecto GCP 132446181356)

## 1. Cómo se autentica (esto costó varias horas)

La API de Jules vive en `https://jules.googleapis.com/v1alpha` y se consume con el header `X-Goog-Api-Key`. Las llaves válidas son **API keys de Google**, no OAuth tokens, y **deben llevar el prefijo `AQ.`**.

> El sistema de secretos de Base44 redacta el prefijo al guardar: si la llave se captura como `AQ.Ab8...`, en la variable de entorno llega solo `Ab8...` y la API responde 401. La función `julesDispatch` reconstruye el prefijo automáticamente. Sin ese detalle, todo parece "llave inválida".

Verificado el 3-nov-2026: con prefijo, `GET /v1alpha/sessions` y `GET /v1alpha/sources` responden 200. Sin prefijo, 401 en todos los casos.

## 2. Límites reales (medidos, no supuestos)

| Límite | Valor | Cómo se comprueba |
| --- | --- | --- |
| Sesiones simultáneas | 3 | `GET /v1alpha/sessions` filtrando estados no terminales |
| Sesiones por repositorio | 1 | Misma consulta, agrupando por `sourceContext` |
| Límite diario | 15 por cuenta | Indicador de la interfaz |
| PR automático | `automationMode: AUTO_CREATE_PR` | Aceptado al crear sesión |
| Merge automático | imposible | No existe el parámetro |
| Sesión atorada | `AWAITING_USER_FEEDBACK` | Ocupa un tercio de la capacidad hasta que se responde o se cancela |

## 3. El despachador

Función backend `julesDispatch`. Tres acciones:

1. `estado` — devuelve cupo real, sesiones activas y las últimas cinco.
2. `sources` — lista los repos conectados (más de 20 hoy).
3. `despachar` — crea sesión si hay cupo y si el repo no tiene ya una sesión activa.

Parámetros: `repo`, `objective`, `persona` (sentinel, bolt, speedy, palette), `account` (julian o alexander), `branch`.

Toda sesión nace con el preámbulo del ADR-019: solo backend, un cambio pequeño y medible, pruebas ejecutadas, entrada obligatoria en `MEMORIA.md`, un solo PR y prohibición de tocar frontend.

## 4. Reglas de uso

- Nunca dos sesiones en el mismo repositorio.
- Nunca despachar sin leer antes el cupo: una sesión atorada bloquea capacidad.
- Cada sesión debe cerrar con medición o no se registra en la memoria.
- Al 31-dic-2026 la herramienta desaparece: nada de lo que importe puede vivir solo ahí.

## 5. Snapshot de migración

Función `julesMigrationSnapshot` + entidad `JulesMigrationSnapshot`. Mide, cada 6 horas junto al monitor DACC:

- archivos `.jules/*.md` que aún existen por repositorio,
- filas de aprendizaje registradas en `docs/agentes/MEMORIA.md`,
- días restantes hasta el 11-nov-2026,
- cupo de Jules (activas, libres, atoradas).

Estado al 3-nov-2026: 4 archivos `.jules` (todos en Kalpixk), 1 fila en `MEMORIA.md` en la rama principal (la versión consolidada espera merge en el PR #2), 7 días restantes y 2 sesiones activas de 3.

## 6. Si algo falla

| Síntoma | Causa | Acción |
| --- | --- | --- |
| 401 con llave que existe | Falta el prefijo `AQ.` | El despachador lo agrega; verificar longitud de la llave (53 caracteres) |
| 429 al despachar | 3 sesiones activas | Cerrar o cancelar una sesión |
| 409 al despachar | Ya hay sesión en ese repo | Esperar o cambiar de repositorio |
| Sesión detenida en `AWAITING_USER_FEEDBACK` | Jules espera respuesta humana | Responder en la interfaz o cancelar |
