// Grafo Nexus v2 — física propia en SVG, sin React ni librerías (ADR-002).
import { NEXUS_NODOS, NEXUS_HILOS, type NexusNode } from '@/data/nexus.ts';

interface Nodo {
  data: NexusNode;
  x: number; y: number; vx: number; vy: number;
  fijo: boolean;
  g?: SVGGElement;
  r: number;
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const svg = document.querySelector<SVGSVGElement>('#nexus-svg');
const raiz = svg?.querySelector<SVGGElement>('#nexus-lienzo');
const etiqueta = document.querySelector<HTMLElement>('#nexus-detalle');
if (svg && raiz) {
  const ANCHO = 900, ALTO = 520;
  const R: Record<string, number> = { hub: 20, proyecto: 11, tecnologia: 7.5, vertical: 7.5 };
  const nodos: Nodo[] = NEXUS_NODOS.map((d, i) => {
    const ang = (i / NEXUS_NODOS.length) * Math.PI * 2;
    const radio = d.kind === 'hub' ? 0 : 170 + (i % 3) * 55;
    return { data: d, x: ANCHO / 2 + Math.cos(ang) * radio, y: ALTO / 2 + Math.sin(ang) * radio, vx: 0, vy: 0, fijo: false, r: R[d.kind] ?? 8 };
  });
  const porId = new Map(nodos.map((n) => [n.data.id, n]));
  const hilos = NEXUS_HILOS.map((h) => ({ a: porId.get(h.a)!, b: porId.get(h.b)! })).filter((h) => h.a && h.b);

  const NS = 'http://www.w3.org/2000/svg';
  const nodoSvg = (t: string, attrs: Record<string, string | number>, clase?: string) => {
    const el = document.createElementNS(NS, t);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    if (clase) el.setAttribute('class', clase);
    return el;
  };

  // hilos
  const grupoHilos = nodoSvg('g', {});
  const lienzoHilos = hilos.map((h) => {
    const linea = nodoSvg('line', { x1: h.a.x, y1: h.a.y, x2: h.b.x, y2: h.b.y }, 'nexus-hilo');
    grupoHilos.appendChild(linea);
    return { h, linea };
  });
  raiz.appendChild(grupoHilos);

  // nodos
  const grupoNodos = nodoSvg('g', {});
  for (const n of nodos) {
    const g = nodoSvg('g', { class: `nexus-nodo kind-${n.data.kind}`, tabindex: n.data.href ? 0 : -1, role: n.data.href ? 'link' : 'img', 'aria-label': `${n.data.label}: ${n.data.nota}` }) as SVGGElement;
    const halo = nodoSvg('circle', { r: n.r + 8, class: 'nexus-halo' });
    const punto = nodoSvg('circle', { r: n.r, class: 'nexus-punto' });
    const texto = nodoSvg('text', { class: 'nexus-label', dy: n.r + 13, 'text-anchor': 'middle' });
    texto.textContent = n.data.label;
    g.append(halo, punto, texto);
    g.addEventListener('pointerenter', () => enfocar(n));
    g.addEventListener('pointerleave', () => soltar());
    g.addEventListener('pointerdown', (e) => {
      g.setPointerCapture(e.pointerId);
      n.fijo = true;
      const mover = (ev: PointerEvent) => {
        const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
        const c = svg.getScreenCTM()?.inverse();
        const p = c ? pt.matrixTransform(c) : pt;
        n.x = Math.max(24, Math.min(ANCHO - 24, p.x));
        n.y = Math.max(24, Math.min(ALTO - 24, p.y));
        simular(2); pintar();
      };
      const fin = () => {
        g.releasePointerCapture(e.pointerId);
        g.removeEventListener('pointermove', mover);
        g.removeEventListener('pointerup', fin);
        g.removeEventListener('pointercancel', fin);
        n.fijo = false;
        simular(40); pintar();
      };
      g.addEventListener('pointermove', mover);
      g.addEventListener('pointerup', fin);
      g.addEventListener('pointercancel', fin);
    });
    g.addEventListener('click', () => {
      if (n.data.href) window.open(n.data.href, '_blank', 'noopener');
      else enfocar(n);
    });
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (n.data.href) window.open(n.data.href, '_blank', 'noopener');
        else enfocar(n);
      }
    });
    n.g = g;
    grupoNodos.appendChild(g);
  }
  raiz.appendChild(grupoNodos);

  const vecinos = new Map<string, Set<string>>();
  for (const h of hilos) {
    if (!vecinos.has(h.a.data.id)) vecinos.set(h.a.data.id, new Set());
    if (!vecinos.has(h.b.data.id)) vecinos.set(h.b.data.id, new Set());
    vecinos.get(h.a.data.id)!.add(h.b.data.id);
    vecinos.get(h.b.data.id)!.add(h.a.data.id);
  }

  let enfocadoId: string | null = null;
  function enfocar(n: Nodo) {
    enfocadoId = n.data.id;
    const cerca = vecinos.get(n.data.id) ?? new Set<string>();
    for (const otro of nodos) {
      const conectado = otro.data.id === n.data.id || cerca.has(otro.data.id);
      otro.g?.classList.toggle('apagado', !conectado);
      otro.g?.classList.toggle('activo', conectado);
    }
    if (etiqueta) etiqueta.innerHTML = `<b>${n.data.label}</b> — ${n.data.nota}`;
  }
  function soltar() {
    enfocadoId = null;
    for (const otro of nodos) otro.g?.classList.remove('apagado', 'activo');
    if (etiqueta) etiqueta.textContent = 'Toca o pasa el cursor por un nodo: se resaltan sus conexiones. Los nodos con flecha abren el proyecto.';
  }

  // física: repulsión + resortes + centro
  function simular(pasos: number) {
    for (let s = 0; s < pasos; s++) {
      for (let i = 0; i < nodos.length; i++) {
        const a = nodos[i];
        if (a.fijo) continue;
        for (let j = i + 1; j < nodos.length; j++) {
          const b = nodos[j];
          let dx = b.x - a.x, dy = b.y - a.y;
          let dist = Math.hypot(dx, dy) || 0.01;
          const min = a.r + b.r + 26;
          if (dist < 1) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; dist = 1; }
          const fuerza = Math.min(9000 / (dist * dist), 3.2) * (dist < min ? 2.4 : 1);
          const fx = (dx / dist) * fuerza, fy = (dy / dist) * fuerza;
          if (!a.fijo) { a.vx -= fx; a.vy -= fy; }
          if (!b.fijo) { b.vx += fx; b.vy += fy; }
        }
        const dxc = ANCHO / 2 - a.x, dyc = ALTO / 2 - a.y;
        a.vx += dxc * 0.0016; a.vy += dyc * 0.0016;
      }
      for (const { a, b } of hilos) {
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const objetivo = a.r + b.r + 62;
        const f = (dist - objetivo) * 0.012;
        const fx = (dx / dist) * f, fy = (dy / dist) * f;
        if (!a.fijo) { a.vx += fx; a.vy += fy; }
        if (!b.fijo) { b.vx -= fx; b.vy -= fy; }
      }
      for (const n of nodos) {
        if (n.fijo) continue;
        n.vx *= 0.82; n.vy *= 0.82;
        n.x = Math.max(28, Math.min(ANCHO - 28, n.x + n.vx));
        n.y = Math.max(28, Math.min(ALTO - 28, n.y + n.vy));
      }
    }
  }

  function pintar() {
    for (const n of nodos) n.g?.setAttribute('transform', `translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`);
    for (const { h, linea } of lienzoHilos) {
      linea.setAttribute('x1', h.a.x.toFixed(1)); linea.setAttribute('y1', h.a.y.toFixed(1));
      linea.setAttribute('x2', h.b.x.toFixed(1)); linea.setAttribute('y2', h.b.y.toFixed(1));
    }
  }

  simular(reduce ? 600 : 420);
  pintar();
  if (!reduce) {
    raiz.style.opacity = '0';
    requestAnimationFrame(() => { raiz.style.transition = 'opacity .6s ease'; raiz.style.opacity = '1'; });
  }
  // recalcular al cambiar de ancho (móvil): re-siembra suave
  let anchoPrev = svg.clientWidth;
  new ResizeObserver(() => {
    if (Math.abs(svg.clientWidth - anchoPrev) < 40) return;
    anchoPrev = svg.clientWidth;
    simular(120);
    pintar();
  }).observe(svg);
}
