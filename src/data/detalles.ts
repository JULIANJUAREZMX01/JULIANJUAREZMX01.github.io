// Detalle por proyecto — narrativa, métricas y evidencia.
export interface Detalle {
  nombre: string;
  kicker: string;
  resumen: string;
  problema: string;
  solucion: string[];
  metricas: { label: string; valor: string }[];
  stack: string[];
  evidencia: string[];
  enlaces: { label: string; href: string }[];
}

export const DETALLES: Record<string, Detalle> = {
  cantabria: {
    nombre: 'Hotel Cantabria · PMS + Web',
    kicker: 'Caso insignia · Sector hotelero',
    resumen: 'Un hotel de 1928 en Tulancingo digitalizado en cuatro días: web multiidioma, PMS operativo, ocho QRs físicos y un agente que publica y avisa.',
    problema: 'Ningún proceso digital: reservas por WhatsApp, habitaciones en papel y cero presencia medible en línea. La operación dependía de la memoria del personal.',
    solucion: [
      'Landing estática en CDN con cinco idiomas y funnel de reserva que escribe a la base real.',
      'PMS con permisos por rol (staff con PIN, dueño con visión de cadena) y cola offline.',
      'Cada operación publica los datos a git y despierta al agente para notificar al dueño.',
      'Ocho QRs de marca: fachada, contacto vCard, WhatsApp, WiFi por piso y concierge por habitación.',
    ],
    metricas: [
      { label: 'Días a producción', valor: '4' },
      { label: 'Commits', valor: '329+' },
      { label: 'Decisiones (ADR)', valor: '15' },
      { label: 'Pruebas', valor: '42' },
      { label: 'Servidores propios', valor: '0' },
      { label: 'Calificación vs mercado', valor: '8.7 / 10' },
    ],
    stack: ['Astro', 'TypeScript', 'GSAP + Lenis', 'Base44 (BaaS)', 'GitHub Actions', 'QR / vCard'],
    evidencia: [
      'Repositorio público con ADRs, calendario vivo y CI que bloquea regresiones.',
      'Deploy verificado: landing, /confirmacion/ y /equipo/ responden 200.',
      'Documento de arquitectura DACC con comparativa contra el estándar WordPress.',
    ],
    enlaces: [
      { label: 'Ver el sitio', href: 'https://julianjuarezmx01.github.io/cantabria-pms-demo/' },
      { label: 'Repositorio', href: 'https://github.com/JULIANJUAREZMX01/cantabria-pms-demo' },
    ],
  },
  kynicos: {
    nombre: 'KynicOS · Agente operador',
    kicker: 'Sistema · Operación asistida por IA',
    resumen: 'El estrato que hace que todo lo demás siga vivo: recibe eventos, publica datos, verifica, documenta y avisa.',
    problema: 'Un negocio pequeño no tiene equipo de guardia 24/7 para mantener su web, sus datos y su documentación al día.',
    solucion: [
      'Workflows disparados por cambios en las entidades publican el estado y notifican por Telegram.',
      'Turnos semanales de mantenimiento con calendario vivo y reporte de hallazgos.',
      'Ejecuta operaciones del PMS con permisos explícitos y deja rastro en commits y ADRs.',
    ],
    metricas: [
      { label: 'Canal', valor: 'Telegram' },
      { label: 'Turno semanal', valor: 'Lunes 09:00' },
      { label: 'Nivel de madurez', valor: 'E4 / 5' },
    ],
    stack: ['Base44', 'Workflows', 'Telegram', 'GitHub API', 'Python'],
    evidencia: ['Flujo documentado en ADRs del PMS Cantabria.', 'Notificaciones reales verificadas en producción.'],
    enlaces: [],
  },
  mueve: {
    nombre: 'MueveCancún · PWA de transporte',
    kicker: 'PWA · Movilidad urbana',
    resumen: 'Rutas de transporte público de Cancún con motor en Rust compilado a WASM, funcionando offline.',
    problema: 'La información de rutas vive en PDFs y en el conocimiento de los choferes; sin red no hay guía.',
    solucion: [
      'Motor de rutas en Rust/WASM que resuelve trayectos en el dispositivo.',
      'Catálogo con fetch y caché a nivel de módulo para entornos serverless.',
      'PWA instalable con funcionamiento offline.',
    ],
    metricas: [
      { label: 'Motor', valor: 'Rust + WASM' },
      { label: 'Modo offline', valor: 'Sí' },
      { label: 'Deploy', valor: 'Vercel' },
    ],
    stack: ['Astro', 'Rust', 'WASM', 'TypeScript', 'PWA'],
    evidencia: ['Endpoint /api/v1/journey operativo y validado.', 'Correcciones documentadas de WASM (find_route) y catálogo.'],
    enlaces: [{ label: 'Ver el demo', href: 'https://mueve-cancun-sigma.vercel.app/' }],
  },
  kalpixk: {
    nombre: 'Kalpixk · Blue Team SIEM',
    kicker: 'Seguridad · Hackathon',
    resumen: 'Detector de anomalías en el navegador con 32 features, sin backend y sin telemetría saliendo del equipo.',
    problema: 'La seguridad de una PyME no puede depender de un SIEM caro ni de enviar datos a la nube.',
    solucion: [
      'Motor de detección en WASM que corre local: nada sale del dispositivo.',
      'Interfaz de operador con alertas y contexto.',
      'CI/CD con auditoría de seguridad y despliegue estático.',
    ],
    metricas: [
      { label: 'Features de detección', valor: '32' },
      { label: 'Datos que salen', valor: '0' },
      { label: 'Deploy', valor: 'Pages' },
    ],
    stack: ['Rust', 'WASM', 'Python', 'GitHub Actions'],
    evidencia: ['Despliegue verificado en GitHub Pages.', 'Roadmap del hackathon documentado con criterios cumplidos.'],
    enlaces: [{ label: 'Ver el demo', href: 'https://julianjuarezmx01.github.io/Wasm-Kalpixk_IA_DevOps/' }],
  },
  pekes: {
    nombre: 'Mis Pekes · Estancia infantil',
    kicker: 'Educación · En migración',
    resumen: 'Sitio para estancia infantil en Cancún: confianza, horarios y servicios en una sola página clara.',
    problema: 'Familias que buscan dónde dejar a sus hijos necesitan respuestas inmediatas y un sitio que cargue rápido.',
    solucion: [
      'Landing con propuesta de valor, programas y datos de contacto visibles.',
      'Diseño cálido y responsivo, sin dependencias pesadas.',
    ],
    metricas: [
      { label: 'Estado', valor: 'Migración a Pages' },
      { label: 'Servidores', valor: '0 al terminar' },
    ],
    stack: ['Astro', 'Tailwind', 'Diseño responsivo'],
    evidencia: ['Archivos de diseño y guía de despliegue documentados.'],
    enlaces: [],
  },
  'nexus-concierge': {
    nombre: 'Nexus Concierge',
    kicker: 'Patrón · Guest journey',
    resumen: 'El patrón de automatización del huésped: del mensaje al servicio, sin intervención manual.',
    problema: 'Cada petición del huésped se pierde entre el chat, el papel y la memoria de quien está en turno.',
    solucion: [
      'Intents que traducen el mensaje en una acción operativa (agua, toallas, mantenimiento).',
      'Registro de la solicitud con dueño, estado y notificación.',
      'Diseñado para correr sobre WhatsApp o web con el mismo motor.',
    ],
    metricas: [
      { label: 'Canal', valor: 'WhatsApp / Web' },
      { label: 'Ahorro por petición', valor: '≈ 3 min' },
    ],
    stack: ['Python', 'Base44', 'WhatsApp Bridge'],
    evidencia: ['Caso de un día completo documentado con datos reales.'],
    enlaces: [],
  },
};
