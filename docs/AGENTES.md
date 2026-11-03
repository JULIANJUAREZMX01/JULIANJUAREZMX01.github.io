# Sistema de agentes JAJA.DEV — estándar multi-repositorio

> Documento canónico del sistema agéntico de Julián Juárez. Aplica a los 12 repositorios activos.
> Última revisión: 2026-11-03 · Autor de la operación: KynicOS · Decisión: ADR-017

## 1. Por qué existe este sistema

Jules (Google) entra en **solo lectura el 2026-11-11** y se apaga el **2026-12-31**. Cuatro workflows de
MueveCancún (`jules-delegation`, `jules-issue-handler`, `jules-pr-assistant`, `test.yml`) dependían de él
y dejarán de funcionar. Además, sus agentes dejaron **108 PRs abiertos** en `trs-cmu-c2-bares` que
colisionaban entre sí (13 tocaban el mismo `.jules/sentinel.md`, 10 el mismo `src/lib/app-params.js`):
el problema no era la calidad, era la **falta de memoria compartida y de límite de trabajo simultáneo**.

La respuesta no es reemplazar Jules por otra herramienta, sino cambiar la unidad de trabajo:
**un turno por semana, una mejora por turno, una persona por repositorio**.

## 2. Las cuatro personas

| Persona | Especialidad | Cuándo se usa |
|---|---|---|
| **sentinel** | Seguridad: inyección, secretos, validación de entrada, permisos | Repos con superficie de ataque (agentes, backend, PMS) |
| **bolt** | Rendimiento medible: O(n²)→O(1), re-renders, caché | Solo si hay métrica antes y después |
| **palette** | UX y accesibilidad: ARIA, foco, contraste, estados vacíos | Repos con interfaz de usuario |
| **speedy** | Refactor y limpieza: código muerto, imports, duplicación | Repos de mantenimiento y deuda técnica |

Regla dura: **una persona activa por repositorio**. Dos personas a la vez en el mismo repo generan
conflictos de merge, que es exactamente el desastre que dejó Jules.

## 3. Cobertura por repositorio

Cada repo activo lleva:

- `AGENTS.md` — reglas, comandos verificados, misión, persona asignada, prohibiciones
- `CLAUDE.md` y `GEMINI.md` — punteros cortos a `AGENTS.md` (evita duplicar y divergir)
- `docs/agentes/MEMORIA.md` — bitácora: qué se hizo, qué se aprendió, qué se midió
- `docs/adr/ADR-AGENTES-estandar-y-memoria.md` — la decisión y sus consecuencias
- `.github/workflows/agente-turno.yml` — prepara el turno y abre el issue
- `.github/workflows/memoria-guardian.yml` — verifica que la memoria no se quede huérfana

| Repositorio | Perfil | Persona | Estado |
|---|---|---|---|
| `JULIANJUAREZMX01.github.io` | Astro estático, portafolio + archivo | palette | ✓ completo |
| `sanaciones-cuanticas` | Astro estático, sitio de la Dra. Alvarado | palette | ✓ completo |
| `cantabria-pms-demo` | HTML/JS, PMS de producción | sentinel | ✓ completo |
| `MueveCancun` | Astro + Rust WASM, PWA en producción | sentinel | ✓ completo |
| `KYNYKOS_AI_Agent` | Python, agente que ejecuta comandos | sentinel | ✓ completo |
| `KynicOS` | Python, puente WhatsApp y conserjería | sentinel | ✓ completo |
| `Wasm-Kalpixk_IA_DevOps` | Python + Rust, SIEM defensivo | bolt | ✓ completo |
| `SAC` | Python, automatización | speedy | ✓ completo |
| `SAC_OS` | Python, sistema de conserjería | speedy | ✓ completo |
| `palladium-c2` | JS, aplicación interna | sentinel | ✓ completo (sin CI previo) |
| `trs-cmu-c2-bares` | JS, aplicación interna | sentinel | ✓ completo, **108 PRs por triaje** |
| `ja-vault` | Bóveda cifrada | — | excluido por diseño: sin código, sin agentes |

## 4. Cómo corre un turno

1. **Lunes 09:00 America/Cancun** (o a mano con `workflow_dispatch`): `agente-turno.yml` cuenta los PRs abiertos.
   Si hay **3 o más**, no abre nada y avisa. Es la guardia anti-avalancha.
2. Si hay espacio, abre **un issue** con instrucciones de la persona del turno.
3. El agente que Julián elija (Claude Code, Copilot coding agent, Gemini CLI, Antigravity, KynicOS) lee
   `AGENTS.md` + `MEMORIA.md`, hace **una sola** mejora, verifica con los comandos del repo y abre **un** PR.
4. **Nada se mergea solo.** Julián decide. Esa es la micro-decisión del sistema.
5. La memoria se actualiza en el mismo PR, no en un documento aparte.

## 5. Guardián de memoria

`memoria-guardian.yml` revisa los repos donde hubo commits en los últimos 30 días y falla el chequeo si
alguien tocó código sin dejar entrada en `MEMORIA.md`. Un agente sin bitácora repite errores; una bitácora
sin commits es teatro.

## 6. Variables de entorno y secretos

Cada repo puede llevar `.env.example.agentes` con las variables **nombradas, nunca con valores**.
Los valores viven en: GitHub Secrets del repo (producción), `ja-vault` cifrado con GPG AES-256
(credenciales maestras) y los ajustes de seguridad de Base44.

Reglas:
- Ninguna credencial en el cliente ni en un repo público. El modo `legacy` de Cantabria es el único
  caso donde un token viaja al navegador, y por eso tiene un gate en CI que avisa.
- Las llaves de Jules siguen en la bóveda pero **caducan el 31-dic-2026**; no construir nada nuevo sobre ellas.

## 7. Lo que este sistema no hace

- No mergea por su cuenta.
- No instala dependencias nuevas sin justificar en el ADR del repo.
- No cambia precios, textos legales ni promesas de curación (Sanaciones) sin revisión humana.
- No toca `ja-vault` ni datos personales de huéspedes y pacientes.
