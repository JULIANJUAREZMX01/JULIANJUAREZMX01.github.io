# Agenda de automatización y presupuesto · JAJA.DEV

Última revisión: 3 de noviembre de 2026 · @JAJA01

Este documento responde a una pregunta concreta: con los créditos y mensajes que quedan,
¿qué se puede automatizar, qué se debe apagar y en qué orden? Todo lo que aquí aparece
está medido contra las herramientas reales, no estimado.

## 1. Presupuesto disponible

| Recurso | Límite | Usado | Queda | Nota |
|---|---|---|---|---|
| Mensajes del mes | 25 | 2 | 23 | Cada turno de agente consume uno |
| Mensajes diarios | 5 | 0 | 5 | Se reinicia a medianoche |
| Créditos de integración | 100 | 12.9 | 87.1 | Herramientas externas |

Regla de gasto: si un turno automático no produce una decisión o un cambio, se apaga.
Un reporte idéntico repetido cada 12 horas no es vigilancia, es ruido pagado.

## 2. Qué corre hoy, y por qué

### Automatizaciones de Base44

| Nombre | Cuándo | Coste | Estado |
|---|---|---|---|
| Cantabria Optimización Semanal | lunes 09:00 | 1 turno/semana | Activo, con calendario vivo |
| Cantabria Sync Servicio | al crear o cambiar ServiceRequest | 1 turno/evento | Activo |
| Cantabria Sync Extras | al crear o cambiar ExtraOrder | 1 turno/evento | Activo |
| Cantabria Sync Habitaciones | al crear o cambiar RoomStatus | 1 turno/evento | Activo |
| Cantabria Sync Estancias | al crear o cambiar Stay | 1 turno/evento | Activo |
| Cola Multi-Repositorio DACC | lunes a viernes 09:00 | 1 turno/día laborable | Activo (ajustado hoy) |
| MueveCancún Deploy Monitor | cada 12 horas | 2 turnos/día | **Apagado hoy**: el servicio lleva suspendido por facturación desde abril y solo repetía el mismo 503 |

### Automatizaciones de GitHub (no consumen créditos de mensajes)

| Workflow | Cuándo | Qué hace |
|---|---|---|
| agente-turno.yml | lunes 09:00 y manual | Guardia anti-avalancha y apertura del issue de turno |
| memoria-guardian.yml | en cada push | Falla si hubo commits sin entrada en MEMORIA.md |
| Estado de sitios | lunes 15:00 UTC | Sondea los sitios vivos y publica status.json |
| CI y Deploy | en cada push | Verificación y despliegue de Pages |

## 3. Integraciones pendientes

| # | Integración | Bloqueo | Quién lo desbloquea |
|---|---|---|---|
| 1 | GitHub Secrets de cantabria-pms-demo | La API devuelve 403 al token del sandbox (falta permiso de administración) | Julián: pegar token y PIN en Settings → Secrets |
| 2 | cantabriaWrite con token nuevo | No existe el código fuente de la función en el repo ni acceso de lectura al deploy | Julián: copiar el código desde el editor de Base44 |
| 3 | Proyecto Neon cantabria-core | La llave autentica pero devuelve cero proyectos | Julián: crear el proyecto o autorizar su creación |
| 4 | Esquema de 7 entidades en Postgres | Depende de la anterior | Yo, en cuanto exista la cadena de conexión |
| 5 | Proxy de escritura (Fase 2) | Depende de 1, 2 y 3 | Yo, con las anteriores resueltas |
| 6 | Turno agéntico con herramienta real | No hay agente conectado a los issues todavía | Decisión: Claude Code, Copilot, Antigravity o KynicOS local |

## 4. Calendario de seguimiento hasta el corte de Jules

Jules pasa a solo lectura el 11 de noviembre y se apaga el 31 de diciembre. La ventana útil
son ocho días, así que el calendario se ordena por riesgo, no por comodidad.

| Día | Trabajo | Salida esperada |
|---|---|---|
| 3 nov (hoy) | Despacho del PR #12 de inyección de comandos; #13 cerrado por obsoleto | Sesión de seguridad en curso |
| 4 nov | Revisar el PR de #12 y aprobar o rechazar | Un PR pequeño y auditable |
| 5 nov | Triaje de los 108 PRs de trs-cmu-c2-bares: cerrar duplicados, conservar uno por tema | Bajar de 108 a menos de 20 |
| 6 nov | Cerrar los 3 PRs de seguridad restantes de KYNYKOS (#16, #19, #43) | Superficie de ataque reducida |
| 9 nov | Turno semanal: Cantabria + cola + revisión de memorias | Reporte y siguiente turno agendado |
| 10 nov | Última ventana para despachos automáticos en Jules | Nada pendiente del lado de Jules |
| 11 nov | Jules queda en solo lectura | Migrar cualquier resto a la cola propia |
| 16 nov | Revisión del estándar agéntico y de los 42 repos | Ajuste de personas por repo |

## 5. Criterio de apagado

Una automatización se apaga si cumple las tres condiciones: repite el mismo mensaje, no tiene
un destinatario que actúe sobre él, y su causa raíz está fuera del alcance del agente. El monitor
de MueveCancún cumplía las tres desde abril. Se apaga hoy y se vuelve a encender cuando la
facturación de Render esté resuelta, no antes.

## 6. Lo que este tablero no resuelve

Ninguna automatización sustituye las cuatro decisiones que dependen del dueño: los secretos de
GitHub, el código de cantabriaWrite, el proyecto de Neon y la rotación de las llaves que viajaron
por el chat. Todo lo demás ya está agendado y corriendo.
