# Diógenes.dev — codestyle oficial

Verificación en sitio: https://julianjuarezmx01.github.io/diogenes/

## Ocho principios

1. **Cero bloat** — una función sin propósito claro es basura: se borra, no se comenta.
2. **La verdad primero** — los límites se declaran; los estados se dicen tal cual.
3. **Evidencia sobre promesas** — sin commit, ADR, prueba o captura, un claim es publicidad.
4. **Reproducible o no existe** — un comando construye, un comando despliega.
5. **Git como memoria** — un commit, una idea; mensajes en imperativo.
6. **Documentación como código** — ADR por cada decisión de arquitectura.
7. **Aburrido por fuera** — estático, CDN, cero servidores que parchar.
8. **Soberanía del dueño** — datos exportables en CSV, sin lock-in.

## Reglas de estilo

- Nombres en inglés, copy en español.
- Tipos estrictos; nunca `any` por comodidad.
- Funciones puras en el dominio (sin DOM ni red).
- Cero estado global en la UI: se deriva o se localiza.
- Dependencia nueva sin ADR = deuda.
- Pruebas por regla de negocio, no por cobertura.
