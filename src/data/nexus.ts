// Nexus semántico — cada proyecto es un nodo; los hilos son tecnología o vertical compartida.
export type NexusKind = 'hub' | 'proyecto' | 'tecnologia' | 'vertical';

export interface NexusNode {
  id: string;
  label: string;
  kind: NexusKind;
  href?: string;
  nota: string;
}

export interface NexusLink {
  a: string;
  b: string;
}

export const NEXUS_NODOS: NexusNode[] = [
  { id: 'dacc', label: 'DACC', kind: 'hub', nota: 'El método: ciclo cerrado humano-agente.' },
  { id: 'cantabria', label: 'Cantabria PMS', kind: 'proyecto', href: 'https://julianjuarezmx01.github.io/cantabria-pms-demo/', nota: 'Hotel 1928: web 5 idiomas + PMS + 8 QRs. Vivo.' },
  { id: 'kynicos', label: 'KynicOS', kind: 'proyecto', nota: 'Agente operador: eventos, publicación y avisos.' },
  { id: 'mueve', label: 'MueveCancún', kind: 'proyecto', href: 'https://mueve-cancun-sigma.vercel.app/', nota: 'PWA de transporte offline-first con motor WASM.' },
  { id: 'kalpixk', label: 'Kalpixk', kind: 'proyecto', href: 'https://julianjuarezmx01.github.io/Wasm-Kalpixk_IA_DevOps/', nota: 'Blue Team SIEM en WASM: 32 features de detección.' },
  { id: 'nexus-c', label: 'Nexus Concierge', kind: 'proyecto', nota: 'Patrón de automatización del guest journey.' },
  { id: 'pekes', label: 'Mis Pekes', kind: 'proyecto', nota: 'Estancia infantil en Cancún. En migración.' },
  { id: 'astro', label: 'Astro / CDN', kind: 'tecnologia', nota: 'Sitio estático: sin servidores que parchar.' },
  { id: 'python', label: 'Python · FastAPI', kind: 'tecnologia', nota: 'Automatización y APIs. El oficio de origen.' },
  { id: 'rust', label: 'Rust · WASM', kind: 'tecnologia', nota: 'Cómputo en el navegador, sin backend.' },
  { id: 'ia', label: 'IA agéntica', kind: 'tecnologia', nota: 'Agentes que despliegan, miden y documentan.' },
  { id: 'cicd', label: 'CI/CD', kind: 'tecnologia', nota: 'Pruebas y despliegue en cada push.' },
  { id: 'qr', label: 'QR físico', kind: 'tecnologia', nota: 'Puente entre el mundo real y la web.' },
  { id: 'hoteleria', label: 'Hotelería', kind: 'vertical', nota: 'PMS, housekeeping y concierge.' },
  { id: 'transporte', label: 'Transporte', kind: 'vertical', nota: 'Rutas, paradas y movilidad urbana.' },
  { id: 'seguridad', label: 'Seguridad', kind: 'vertical', nota: 'Blue Team, detección y auditoría.' },
  { id: 'educacion', label: 'Educación', kind: 'vertical', nota: 'Estancias y operación escolar.' },
  { id: 'logistica', label: 'Logística', kind: 'vertical', nota: 'CEDIS, WMS y validación preventiva.' },
];

export const NEXUS_HILOS: NexusLink[] = [
  { a: 'dacc', b: 'cantabria' }, { a: 'dacc', b: 'kynicos' }, { a: 'dacc', b: 'mueve' },
  { a: 'dacc', b: 'kalpixk' }, { a: 'dacc', b: 'nexus-c' }, { a: 'dacc', b: 'pekes' },
  { a: 'cantabria', b: 'astro' }, { a: 'cantabria', b: 'qr' }, { a: 'cantabria', b: 'hoteleria' },
  { a: 'cantabria', b: 'ia' }, { a: 'cantabria', b: 'cicd' },
  { a: 'kynicos', b: 'ia' }, { a: 'kynicos', b: 'hoteleria' }, { a: 'kynicos', b: 'cicd' },
  { a: 'mueve', b: 'astro' }, { a: 'mueve', b: 'rust' }, { a: 'mueve', b: 'transporte' }, { a: 'mueve', b: 'cicd' },
  { a: 'kalpixk', b: 'rust' }, { a: 'kalpixk', b: 'seguridad' }, { a: 'kalpixk', b: 'python' },
  { a: 'nexus-c', b: 'hoteleria' }, { a: 'nexus-c', b: 'ia' },
  { a: 'pekes', b: 'educacion' }, { a: 'pekes', b: 'astro' },
  { a: 'python', b: 'logistica' }, { a: 'python', b: 'seguridad' },
  { a: 'cicd', b: 'astro' }, { a: 'qr', b: 'hoteleria' }, { a: 'qr', b: 'astro' },
];
