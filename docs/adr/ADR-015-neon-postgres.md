# ADR-015: Neon Postgres como base transaccional

- **Estado:** Aceptado (3 nov 2026)
- **Contexto:** el estándar AEI exige un nivel transaccional fuera de GitHub Pages para datos de personas (reservas, huéspedes, escrituras con roles). Base44 cubre hoy ese rol como implementación `legacy` del gateway.
- **Decisión:** adoptar Neon Postgres, con RLS a nivel de tabla y migraciones SQL versionadas en el repo. El acceso ocurre solo por función de borde; nunca desde el navegador.
- **Consecuencias:** + salida real de la dependencia de Base44 · + ramas por entorno (production / preview) · + respaldo diario a CSV cifrado · − requiere migración del esquema actual (7 entidades) y reescritura del gateway.
- **Credencial:** NEON_API_KEY en el almacén de secretos del agente; DATABASE_URL nunca en el repositorio.
