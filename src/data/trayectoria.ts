// Trayectoria profesional — fuente: RESUMEN_EJECUTIVO del portafolio original (2025-11-21).
export const LOGROS = [
  {
    nombre: 'SAC · Sistema de Automatización Completa',
    contexto: 'Chedraui CEDIS Cancún 427',
    metricas: [['ROI', '3,411%'], ['Ahorro anual', '$5.1M MXN'], ['Payback', '10 días']],
    detalle:
      'Ecosistema de 5 módulos para automatizar validaciones de punta a punta: monitoreo en tiempo real, alertas inteligentes y reportes automáticos. Escalable a 5 CEDIS regionales (potencial $25M+).',
  },
  {
    nombre: 'Validador v5.0',
    contexto: 'Dashboard React + Python, en producción',
    metricas: [['Menos tiempo', '85-90%'], ['Precisión', '99%+'], ['Ahorro', '600 h/año']],
    detalle:
      'De 2-3 horas de validación manual a 15-20 minutos. Alertas por criticidad, reportes Excel con formato corporativo y una adopción del 100% del equipo.',
  },
  {
    nombre: 'Validación preventiva',
    contexto: 'De reactivo a preventivo',
    metricas: [['Anticipación', '5 días'], ['Prevención', '100%'], ['Costo de error', '$0']],
    detalle:
      'Análisis de citas de Planning para detectar problemas antes del recibo físico. Monitoreo automático 24/7 que elimina el retrabajo operativo.',
  },
  {
    nombre: 'Repositorio SQL maestro',
    contexto: 'Estandarización multi-CEDIS',
    metricas: [['Archivos', '-90%'], ['Queries', '+24%'], ['Mantenimiento', '-80%']],
    detalle:
      '29 queries consolidadas en 22 optimizadas, documentadas a nivel enterprise y versionadas. La base que permite replicar el modelo en toda la cadena.',
  },
] as const;

export const PRINCIPIOS = [
  {
    titulo: 'Offline-first',
    texto: 'La operación no puede depender de la red. Cola local, reintentos y datos espejo: si se cae la conexión, el trabajo del turno no se pierde.',
  },
  {
    titulo: 'Performance como requisito',
    texto: 'Sitios estáticos en CDN, cero servidores que parchar. Si la página tarda, la conversión ya se perdió; el desempeño se mide, no se supone.',
  },
  {
    titulo: 'Seguridad proactiva',
    texto: 'Auditoría antes que incidente: mínima superficie de ataque, permisos por rol y evidencia de cada escritura. Sin PIN ni token, no hay operación.',
  },
] as const;

export const STACK = [
  ['Lenguajes & core', ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash']],
  ['Backend & datos', ['FastAPI', 'Pandas', 'SQLAlchemy', 'Neon Postgres', 'IBM DB2', 'SQLite']],
  ['Frontend', ['React 18', 'Astro 5', 'Tailwind', 'Recharts', 'GSAP']],
  ['Empresarial', ['Manhattan WMS', 'AS/400 · IBM i', 'Office 365', 'Excel/VBA']],
  ['DevOps & calidad', ['Git · GitHub Actions', 'CI/CD', 'Astro check · Vitest', 'GitHub Pages', 'Render · Vercel']],
] as const;

export const FRASE = 'Máquinas y sistemas al servicio de los analistas, no analistas al servicio de las máquinas.';
