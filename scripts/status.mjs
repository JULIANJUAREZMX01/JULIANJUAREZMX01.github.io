// Sonda semanal: cada sitio del portafolio se verifica en vivo.
// El resultado se publica como archivo estático (sin servidores).
import { writeFile } from 'node:fs/promises';

const SITIOS = {
  cantabria: 'https://julianjuarezmx01.github.io/cantabria-pms-demo/',
  kalpixk: 'https://julianjuarezmx01.github.io/Wasm-Kalpixk_IA_DevOps/',
  muevecancun: 'https://mueve-cancun-sigma.vercel.app/',
  portafolio: 'https://julianjuarezmx01.github.io/',
};

const out = { checked_at: new Date().toISOString(), sitios: {} };
for (const [k, url] of Object.entries(SITIOS)) {
  try {
    const ctrl = AbortSignal.timeout(15000);
    const r = await fetch(url, { signal: ctrl, redirect: 'follow' });
    out.sitios[k] = { url, http: r.status, vivo: r.status < 400 };
  } catch {
    out.sitios[k] = { url, http: 0, vivo: false };
  }
}
await writeFile('public/status.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
