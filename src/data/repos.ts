// Catálogo de repositorios — datos verificados vía API de GitHub (28-oct-2026).
export type Categoria = 'producto' | 'herramienta' | 'cliente' | 'plantilla' | 'experimento';

export interface Repo {
  slug: string;
  nombre: string;
  categoria: Categoria;
  resumen: string;
  stack: string[];
  estado: 'vivo' | 'repo' | 'privado';
  url: string;
  demo?: string;
  evidencia: string[];
  aporta: string;
}

const GH = 'https://github.com/JULIANJUAREZMX01';

export const REPOS: Repo[] = [
  {
    slug: 'portafolio', nombre: 'JULIANJUAREZMX01.github.io', categoria: 'producto',
    resumen: 'Este portafolio: sitio estático en CDN con grafo semántico, CV imprimible y catálogo vivo de repositorios.',
    stack: ['Astro 7', 'TypeScript', 'GSAP', 'GitHub Pages'],
    estado: 'vivo', url: `${GH}/JULIANJUAREZMX01.github.io`, demo: '/',
    evidencia: ['CI en cada push', 'ADR-001 a 003', 'workflow semanal de estado'],
    aporta: 'El molde DACC completo: cero servidores, gobernanza y automatización.',
  },
  {
    slug: 'cantabria', nombre: 'cantabria-pms-demo', categoria: 'producto',
    resumen: 'PMS multihotel para un hotel fundado en 1928: landing en 5 idiomas, operación por PIN, concierge y 8 QRs físicos.',
    stack: ['Astro', 'TypeScript', 'Base44', 'GSAP', 'GitHub Pages'],
    estado: 'vivo', url: `${GH}/cantabria-pms-demo`, demo: 'https://julianjuarezmx01.github.io/cantabria-pms-demo/',
    evidencia: ['329 commits', '15 ADRs', '42 pruebas', 'check-out real cerrrado en producción'],
    aporta: 'El caso insignia: un negocio de 98 años digitalizado sin romper su operación.',
  },
  {
    slug: 'muevecancun', nombre: 'MueveCancun', categoria: 'producto',
    resumen: 'PWA de transporte público para Cancún: rutas reales, offline-first y motor de rutas en Rust/WASM.',
    stack: ['Astro', 'Rust', 'WASM', 'TypeScript', 'Vercel'],
    estado: 'vivo', url: `${GH}/MueveCancun`, demo: 'https://mueve-cancun-sigma.vercel.app',
    evidencia: ['870+ commits', '156/156 pruebas', '1,187 líneas de Rust/WASM'],
    aporta: 'Rendimiento nativo en el navegador: el usuario no espera al servidor.',
  },
  {
    slug: 'kalpixk', nombre: 'Wasm-Kalpixk_IA_DevOps', categoria: 'producto',
    resumen: 'SIEM Blue Team nativo en WASM: detección de anomalías en el navegador, sin enviar tráfico a servidores ajenos.',
    stack: ['Rust', 'WASM', 'Python', 'GitHub Pages'],
    estado: 'vivo', url: `${GH}/Wasm-Kalpixk_IA_DevOps`, demo: 'https://julianjuarezmx01.github.io/Wasm-Kalpixk_IA_DevOps/',
    evidencia: ['32 features de detección', 'CI verde', 'despliegue estático'],
    aporta: 'Seguridad defensiva soberana: el análisis de red no sale del equipo del cliente.',
  },
  {
    slug: 'kynicos-repo', nombre: 'KynicOS (repositorio)', categoria: 'producto',
    resumen: 'Sistema operativo cognitivo para hospitalidad: contexto persistente, ruteo multi-LLM, canales de huésped y escalamiento.',
    stack: ['Python', 'FastAPI', 'LLM routing', 'Telegram'],
    estado: 'repo', url: `${GH}/KynicOS`,
    evidencia: ['README con arquitectura completa', 'skills operativos', 'observabilidad'],
    aporta: 'La capa de inteligencia que atiende huéspedes sin perder contexto entre turnos.',
  },
  {
    slug: 'muevereparto', nombre: 'MueveRepartoEnCancun-', categoria: 'producto',
    resumen: 'Nexus Prime v3.2: reparto y logística de última milla sobre la misma filosofía de calles reales.',
    stack: ['Astro', 'TypeScript'],
    estado: 'repo', url: `${GH}/MueveRepartoEnCancun-`,
    evidencia: ['README con el problema y el enfoque', 'base de MueveCancún'],
    aporta: 'Extiende el conocimiento de la ciudad del pasajero al paquete.',
  },
  {
    slug: 'muevecancun-pwa', nombre: 'muevecancun-pwa', categoria: 'producto',
    resumen: 'App Base44 de la PWA de MueveCancún: experimento de plataforma para acelerar el frontend.',
    stack: ['JavaScript', 'Base44'],
    estado: 'repo', url: `${GH}/muevecancun-pwa`,
    evidencia: ['repo público documentado'],
    aporta: 'Prueba de que el mismo producto se puede servir desde varias plataformas sin reescribir el dominio.',
  },
  {
    slug: 'orchestrator', nombre: 'python-orchestrator-node', categoria: 'herramienta',
    resumen: 'Orquestador modular de auditorías: formatos múltiples, social listening y análisis de migración a Rust/WASM.',
    stack: ['Python', 'REST', 'FastAPI'],
    estado: 'repo', url: `${GH}/python-orchestrator-node`,
    evidencia: ['README con diagrama de arquitectura', 'declarado como complemento, no reemplazo'],
    aporta: 'El patrón de registry + reporter que hoy usan los turnos de mantenimiento.',
  },
  {
    slug: 'nanobot', nombre: 'nanobot-cloud', categoria: 'herramienta',
    resumen: 'Asistente QUINTANA desplegado en la nube: Telegram, dashboard, servidor MCP y respaldos S3.',
    stack: ['Python', 'FastAPI', 'Telegram', 'S3', 'MCP'],
    estado: 'repo', url: `${GH}/nanobot-cloud`,
    evidencia: ['README con arquitectura y quick start', 'runbook de despliegue'],
    aporta: 'Antecedente directo de KynicOS: bot + LLM + persistencia.',
  },
  {
    slug: 'cocobongo', nombre: 'cocobongo-proposal', categoria: 'cliente',
    resumen: 'Propuesta técnica comercial para Coco Bongo Cancún: la plantilla de la propuesta formal del Proyecto Beta.',
    stack: ['HTML', 'CSS'],
    estado: 'repo', url: `${GH}/cocobongo-proposal`,
    evidencia: ['documento de propuesta'],
    aporta: 'El molde comercial: cómo se vende la arquitectura sin humo.',
  },
  {
    slug: 'mis-pekes', nombre: 'EstanciaInfantilMisPekesCanc-n', categoria: 'cliente',
    resumen: 'Sitio para estancia infantil en Cancún: diez años de trayectoria, calidez y confianza para papás que trabajan.',
    stack: ['HTML', 'CSS'],
    estado: 'repo', url: `${GH}/EstanciaInfantilMisPekesCanc-n`,
    evidencia: ['repo público', 'diseño responsivo'],
    aporta: 'Prueba del mismo método en otro vertical: cuidado infantil.',
  },
  {
    slug: 'idoctor', nombre: 'iDoctorByGoogleAIStudio', categoria: 'herramienta',
    resumen: 'Agente de orientación médica construido con AI Studio, con addendum de inteligencia competitiva y datos pre-poblados.',
    stack: ['Astro', 'Google AI Studio', 'LLM'],
    estado: 'repo', url: `${GH}/iDoctorByGoogleAIStudio`,
    evidencia: ['README con instrucciones de despliegue', 'app publicada en AI Studio'],
    aporta: 'Exploración de agentes verticales de salud con lenguaje natural.',
  },
  {
    slug: 'doctorcancun', nombre: '-DoctorCanc-nAgentNanoBot', categoria: 'herramienta',
    resumen: 'Fork de NanoBot especializado como asistente personal para Doctor Cancún.',
    stack: ['Python', 'Telegram'],
    estado: 'repo', url: `${GH}/-DoctorCanc-nAgentNanoBot`,
    evidencia: ['fork público con adaptaciones'],
    aporta: 'Reutilización de agentes base para clientes nuevos en días, no meses.',
  },
  {
    slug: 'kynykos', nombre: 'KYNYKOS_AI_Agent', categoria: 'experimento',
    resumen: 'Primer intento de agente propio antes de KynicOS: el laboratorio donde nació el nombre.',
    stack: ['Python'],
    estado: 'repo', url: `${GH}/KYNYKOS_AI_Agent`,
    evidencia: ['repo público'],
    aporta: 'La memoria de los intentos: aquí empezó todo.',
  },
  {
    slug: 'shop-temu', nombre: 'Shop-Temu-Latam', categoria: 'plantilla',
    resumen: 'Starter de Astro sobre Netlify para comercio: primitivas de edge, imágenes y almacenamiento.',
    stack: ['Astro', 'Tailwind', 'daisyUI', 'Netlify'],
    estado: 'repo', url: `${GH}/Shop-Temu-Latam`,
    evidencia: ['demo pública del starter'],
    aporta: 'Banco de pruebas para e-commerce rápido en LatAm.',
  },
  {
    slug: 'astro-starter', nombre: 'astro-platform-starter', categoria: 'plantilla',
    resumen: 'Starter base de Astro usado como referencia de despliegue.',
    stack: ['Astro', 'Netlify'],
    estado: 'repo', url: `${GH}/astro-platform-starter`,
    evidencia: ['repo público'],
    aporta: 'Referencia técnica de despliegue, no producto final.',
  },
  {
    slug: 'ammgg', nombre: 'AMMGG', categoria: 'experimento',
    resumen: 'Repositorio de experimentación HTML.',
    stack: ['HTML'],
    estado: 'repo', url: `${GH}/AMMGG`,
    evidencia: ['repo público'],
    aporta: 'Cuaderno de pruebas.',
  },
  {
    slug: 'vuelos', nombre: 'vuelos', categoria: 'experimento',
    resumen: 'Exploración de búsqueda de vuelos en HTML.',
    stack: ['HTML'],
    estado: 'repo', url: `${GH}/vuelos`,
    evidencia: ['repo público'],
    aporta: 'Prueba de concepto de dominio turístico.',
  },
  {
    slug: 'green16', nombre: 'GREEN16', categoria: 'experimento',
    resumen: 'Repositorio de trabajo en curso etiquetado 2.0.',
    stack: ['—'],
    estado: 'repo', url: `${GH}/GREEN16`,
    evidencia: ['repo público'],
    aporta: 'Sin descripción declarada: se documenta cuando madure.',
  },
  {
    slug: 'app', nombre: 'APP', categoria: 'experimento',
    resumen: 'Repositorio vacío de exploración.',
    stack: ['—'],
    estado: 'repo', url: `${GH}/APP`,
    evidencia: ['repo público'],
    aporta: 'Nada que presumir: cero bloat también es no inflar el catálogo.',
  },
  {
    slug: 'ameg', nombre: 'AMERICANGLOBALGORUP', categoria: 'experimento',
    resumen: 'Repositorio de exploración sin descripción.',
    stack: ['—'],
    estado: 'repo', url: `${GH}/AMERICANGLOBALGORUP`,
    evidencia: ['repo público'],
    aporta: 'Pendiente de clasificar o archivar.',
  },
];

export const CATEGORIAS: { id: Categoria; label: string }[] = [
  { id: 'producto', label: 'Productos' },
  { id: 'herramienta', label: 'Herramientas' },
  { id: 'cliente', label: 'Clientes' },
  { id: 'plantilla', label: 'Plantillas' },
  { id: 'experimento', label: 'Laboratorio' },
];

export const PRIVADOS = 6;
