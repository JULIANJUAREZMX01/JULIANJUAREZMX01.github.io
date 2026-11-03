# ADR-018: Neon ya está provisionado; el bloqueo es de red, no de credenciales

- **Fecha:** 3 de noviembre de 2026
- **Estado:** Aceptado
- **Relacionado:** ADR-015 (elección de Neon)

## Contexto

Se venía reportando "Neon vacío, cero proyectos". Al consultar con la llave del entorno, la API respondía 404 en `/projects`. La captura de la consola de Jules mostró que la conexión MCP a Neon fallaba con "no tools discovered", lo que apuntaba a una credencial inválida.

## Hallazgo

Ambas conclusiones eran falsas. La llave `NEON_API_KEY` está **scoped a un solo proyecto** y por eso no puede listar ni consultar identidades:

- `GET /projects` → 404 `not allowed to perform actions outside the project this key is scoped to; subject_project_id: nameless-frog-96396077`
- `GET /users/me` → 404 `not allowed for organization API keys`

El proyecto **existe y está vivo**:

| Campo | Valor |
|---|---|
| Nombre | `muevecancun` |
| ID | `nameless-frog-96396077` |
| Creado | 29 de marzo de 2026 |
| PostgreSQL | 17 |
| Región | `aws-us-east-1` |
| Rama primaria | `production` (`br-snowy-glade-ami7llba`) |
| Endpoint | `ep-summer-unit-amctp3wj` |
| Host pooled | `ep-summer-unit-amctp3wj-pooler.c-5.us-east-1.aws.neon.tech` |
| Base / usuario | `neondb` / `neondb_owner` |

Ramas adicionales: cuatro `preview` ligadas a PRs antiguos de MueveCancun (#473, #476, #482 dom-xss, #483).

## El bloqueo real

La conexión directa desde el sandbox del agente termina en `ETIMEDOUT`. El DNS resuelve y la URI es válida: lo que no hay es salida al **puerto 5432**, porque el sandbox solo tiene HTTPS en el plan actual.

Consecuencia: **ninguna escritura a Neon puede hacerse desde bash**. Debe ir por una función de borde (backend function) o por el runtime de la aplicación. El mismo límite explica el fallo del MCP de Neon en Jules.

## Decisión

1. Neon queda confirmado como base del ecosistema, con el proyecto `muevecancun` como destino.
2. Se descarta Supabase y se retira su MCP: no hay razón para mantener dos candidatos.
3. Toda ruta de escritura a datos de personas pasa por función de borde. El acceso directo por SQL desde agentes queda prohibido por diseño, no por conveniencia.
4. Antes de montar el esquema de las siete entidades, hace falta definir si `production` se reutiliza (ya tiene ramas de preview de MueveCancun) o se crea una base separada para Cantabria.

## Consecuencias

- Se ahorra la creación de un proyecto que ya existía desde marzo.
- Queda un pendiente de decisión: separar o compartir el proyecto entre MueveCancun y Cantabria.
- El MCP de Neon solo servirá si se emite una llave con alcance de organización y el runtime tiene salida a 5432.
