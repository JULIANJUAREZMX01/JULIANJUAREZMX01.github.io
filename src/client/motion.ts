import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-badge', { y: 14, opacity: 0, duration: 0.6 }, 0.1)
    .from('.hero h1', { y: 34, opacity: 0, duration: 0.9 }, '-=0.3')
    .from('.hero .rol', { y: 20, opacity: 0, duration: 0.7 }, '-=0.6')
    .from('.hero .claim', { y: 18, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero .cta > *', { y: 14, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
    .from('.hero .datos', { y: 16, opacity: 0, stagger: 0.06, duration: 0.5 }, '-=0.3');

  gsap.utils.toArray<HTMLElement>('section.bloque').forEach((s) => {
    gsap.from(s, { y: 44, opacity: 0, duration: 0.9, scrollTrigger: { trigger: s, start: 'top 82%' } });
  });

  gsap.utils.toArray<HTMLElement>('.proyecto, .estrato, .evidencia li').forEach((el, i) => {
    gsap.from(el, {
      y: 30, opacity: 0, duration: 0.65, delay: (i % 3) * 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-contador]').forEach((el) => {
    const fin = Number(el.dataset.contador ?? '0');
    const obj = { v: 0 };
    gsap.to(obj, {
      v: fin, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 92%' },
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
