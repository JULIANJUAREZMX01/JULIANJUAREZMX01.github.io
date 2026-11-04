# Cobertura de migración documental de agentes

> Matriz de verificación del conocimiento operativo migrado desde consolas y herramientas de agente (`.jules/`, prompts, configuración interna) hacia el repositorio de estándares.
> Marco: ADR-006, ADR-019 y ADR-AGENTES-estandar-y-memoria.md.
> Persona responsable: sentinel.

| # | Pieza de conocimiento | Estado | Archivo donde queda documentada | Archivo donde falta / Notas |
|---|---|---|---|---|
| 1 | Persona `sentinel` (definición, sesgo de seguridad, alcance) | Documentada | `docs/AGENTES.md`, `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 2 | Persona `bolt` (definición, optimización de rendimiento, métrica antes/después) | Documentada | `docs/AGENTES.md`, `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 3 | Persona `palette` (definición, accesibilidad, ARIA/contraste) | Documentada | `AGENTS.md`, `docs/AGENTES.md`, `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 4 | Persona `speedy` (definición, refactorización, limpieza de código muerto) | Documentada | `docs/AGENTES.md`, `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 5 | Regla de una sola persona activa por repositorio | Documentada | `docs/AGENTES.md`, `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 6 | Reglas de PR (máximo 1 abierto por agente, no auto-merge, decisión humana) | Documentada | `AGENTS.md`, `docs/AGENTES.md`, `docs/adr/ADR-AGENTES-estandar-y-memoria.md` | Ninguno |
| 7 | Tamaño y radio de explosión de PR (máx 8 archivos, 300 líneas, un propósito) | Documentada | `AGENTS.md`, `docs/AGENTES.md` | Ninguno |
| 8 | Límite de concurrencia y sesiones de agente (techo de 3, límite 15/día) | Documentada | `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md`, `scripts/jules_cola.py` | Ninguno |
| 9 | Gates de CI (workflow de build, check de tipos, humo 200) | Documentada | `.github/workflows/ci.yml`, `docs/ARQUITECTURA.md`, `docs/adr/ADR-006-estandar-arquitectura-aei.md` | Ninguno |
| 10 | Guardián de memoria en CI (`memoria-guardian.yml`) | Documentada | `.github/workflows/memoria-guardian.yml`, `docs/AGENTES.md` | Ninguno |
| 11 | Despacho de turno semanal por workflow (`agente-turno.yml`) | Documentada | `.github/workflows/agente-turno.yml`, `docs/AGENTES.md` | Ninguno |
| 12 | Política de secretos (prohibición de credenciales en repo, bundle o historial) | Documentada | `AGENTS.md`, `docs/AGENTES.md`, `docs/adr/ADR-006-estandar-arquitectura-aei.md` | Ninguno |
| 13 | Almacenamiento de credenciales maestras (`ja-vault` cifrado con GPG AES-256) | Documentada | `docs/AGENTES.md` | Ninguno |
| 14 | Especificación de variables de entorno por repositorio (`.env.example`) | Documentada | `AGENTS.md`, `docs/AGENTES.md`, `docs/adr/ADR-AGENTES-estandar-y-memoria.md` | `.env.example` en raíz (PENDIENTE) |
| 15 | Decisiones de hosting: adopción de GitHub Pages estático | Documentada | `AGENTS.md`, `docs/ARQUITECTURA.md`, `docs/adr/ADR-001-portafolio-estatico.md`, `docs/adr/ADR-006-estandar-arquitectura-aei.md` | Ninguno |
| 16 | Decisiones de hosting: suspensión y retiro de Vercel y Render por facturación | Documentada | `docs/ARQUITECTURA.md`, `docs/adr/ADR-006-estandar-arquitectura-aei.md` | Ninguno |
| 17 | Decisiones de base de datos: descarte de Supabase y adopción de Neon | Documentada | `docs/adr/ADR-015-neon-postgres.md`, `docs/adr/ADR-018-neon-proyecto-existente-y-limite-de-red.md`, `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 18 | Cola multi-repositorio y algoritmo de rotación de tareas | Documentada | `docs/COLA.md`, `docs/adr/ADR-016-cola-multirepo.md`, `scripts/cola.py` | Ninguno |
| 19 | Integración formal de KynicOS como operador sucesor | Documentada | `docs/agentes/MIGRACION-JULES-Y-BUCLE-KYNICOS.md` (rama dedicada) | docs/agentes/ en rama main (PENDIENTE de merge) |
| 20 | Auditoría y retiro progresivo de carpetas `.jules/` por repositorio | Documentada | `docs/adr/ADR-AGENTES-estandar-y-memoria.md` | Checklists específicos por repo (PENDIENTE) |
| 21 | Política de desconexión de servicios externos no backend (v0, Stitch, Linear, Tinybird) | Documentada | `docs/adr/ADR-019-operacion-jules-limites-y-cola-por-pilares.md` | Ninguno |
| 22 | Formato y disciplina de bitácora compartida (`MEMORIA.md`) | Documentada | `AGENTS.md`, `docs/AGENTES.md`, `docs/adr/ADR-AGENTES-estandar-y-memoria.md`, `docs/agentes/MEMORIA.md` | Ninguno |
