export interface Proyecto {
  slug: string;
  nombre: string;
  tipo: string;
  resumen: string;
  stack: string[];
  estado: 'vivo' | 'repo' | 'roadmap';
  estadoDetalle: string;
  enlaces: { label: string; href: string }[];
  metrica?: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    slug: 'cantabria',
    nombre: 'Hotel Cantabria · PMS + Web',
    tipo: 'Caso insignia · Hotelero',
    resumen:
      'Hotel de 98 años en Tulancingo digitalizado en 4 días: landing en 5 idiomas, PMS operativo con permisos por rol, espejo de datos auditable en git y puente físico-digital con 8 códigos QR. Cada operación del hotel publica datos y notifica al operador.',
    stack: ['Astro', 'TypeScript', 'Base44', 'GSAP', 'GitHub Actions'],
    estado: 'vivo',
    estadoDetalle: 'Producción · Pages',
    enlaces: [
      { label: 'Ver sitio', href: 'https://julianjuarezmx01.github.io/cantabria-pms-demo/' },
      { label: 'Repositorio', href: 'https://github.com/JULIANJUAREZMX01/cantabria-pms-demo' },
    ],
    metrica: '329 commits · 15 ADRs · 42 pruebas · 8 QRs',
  },
  {
    slug: 'muevecancun',
    nombre: 'MueveCancún',
    tipo: 'Movilidad · PWA offline-first',
    resumen:
      'Asistente de transporte público para Cancún: PWA offline-first con motor de rutas en Rust compilado a WASM, catálogo de paradas y planificador de viajes. Arquitectura minimalista, pensada para redes móviles inestables.',
    stack: ['Astro 5', 'Rust/WASM', 'TypeScript', 'Vercel'],
    estado: 'vivo',
    estadoDetalle: 'Producción · Vercel',
    enlaces: [
      { label: 'Ver PWA', href: 'https://mueve-cancun-sigma.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/JULIANJUAREZMX01/MueveCancun' },
    ],
    metrica: 'Motor WASM de rutas · offline-first',
  },
  {
    slug: 'kalpixk',
    nombre: 'Kalpixk',
    tipo: 'Ciberseguridad · WASM',
    resumen:
      'SIEM nativo WASM para equipos defensivos (Blue Team): motor de detección de anomalías acelerado, API en Python y frontend estático. Construido para el hackathon con CI/CD auditado y despliegue en Pages.',
    stack: ['Rust/WASM', 'Python', 'GitHub Actions'],
    estado: 'vivo',
    estadoDetalle: 'Demo · Pages',
    enlaces: [
      { label: 'Ver demo', href: 'https://julianjuarezmx01.github.io/Wasm-Kalpixk_IA_DevOps/' },
      { label: 'Repositorio', href: 'https://github.com/JULIANJUAREZMX01/Wasm-Kalpixk_IA_DevOps' },
    ],
    metrica: '32 features de detección · CI verde',
  },
  {
    slug: 'nexus',
    nombre: 'Nexus Concierge',
    tipo: 'Automatización hotelera',
    resumen:
      'Flujo completo de atención al huésped: reserva, check-in, solicitudes de servicio y upselling de extras coordinados entre recepción, limpieza y concierge digital. Modelo replicable a cualquier propiedad.',
    stack: ['Automatización', 'WhatsApp', 'Eventos'],
    estado: 'repo',
    estadoDetalle: 'Patrón documentado',
    enlaces: [],
    metrica: 'Guest journey end-to-end',
  },
  {
    slug: 'mispekes',
    nombre: 'Mis Pekes',
    tipo: 'Educación infantil · Cancún',
    resumen:
      'Sitio profesional para estancia infantil con 10 años de experiencia: programas por edad, filosofía educativa, instalaciones y contacto. Diseño responsivo y contenido claro para padres.',
    stack: ['HTML/CSS', 'React', 'Responsive'],
    estado: 'repo',
    estadoDetalle: 'En migración a estático',
    enlaces: [],
    metrica: 'Landing multi-sección',
  },
  {
    slug: 'kynicos',
    nombre: 'KynicOS · el operador',
    tipo: 'Agente de IA · Meta-proyecto',
    resumen:
      'El agente que escribe, despliega, verifica y documenta: monitorea despliegues, ejecuta turnos de mantenimiento, arma paquetes de WhatsApp en el idioma del huésped y deja un ADR por decisión. Es el cuarto estrato del método DACC.',
    stack: ['Base44', 'Workflows', 'Telegram'],
    estado: 'vivo',
    estadoDetalle: 'Operando 24/7',
    enlaces: [],
    metrica: 'Nivel E4 de madurez agéntica',
  },
];

export const ESTRATOS = [
  { n: '01', t: 'Presentación estática', d: 'Astro sobre CDN. Cero servidor propio, cero plugins que parchar. Cinco idiomas y accesibilidad de fábrica.' },
  { n: '02', t: 'Datos como espejo', d: 'Cada operación del negocio se publica a git. Quién, qué y cuándo: auditables para siempre.' },
  { n: '03', t: 'Operaciones verificables', d: 'Funciones con permisos por rol y cola offline. Si la red falla, la operación no se pierde.' },
  { n: '04', t: 'Operador agéntico', d: 'Un agente que despliega, mide, documenta y mantiene. Las decisiones de negocio siguen siendo humanas.' },
];
