import { useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero     from '../components/Hero';
import Marquees from '../components/Marquees';
import Contact  from '../components/Contact';

gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CHARS = '!<>-_\\/[]{}—=+*^?#01';
function scrambleText(el) {
  const original = el.dataset.original || el.textContent;
  el.dataset.original = original;
  let frame = 0; const total = 40;
  const timer = setInterval(() => {
    frame++;
    el.textContent = original.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i < (frame / total) * original.length) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (frame >= total) { el.textContent = original; clearInterval(timer); }
  }, 30);
}

export default function Home({ loaded }) {

  // GSAP entrance + scroll fx — only after loaded
  useEffect(() => {
    if (!loaded) return;
    if (reduceMotion) return;

    requestAnimationFrame(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.hero h1 .row span', { y: 0, rotateX: 0, duration: 1.4, stagger: .15, ease: 'back.out(1.4)' }, .2)
        .to('.hero-tag',     { opacity: 1, duration: 1 }, .5)
        .to('.hero-sub',     { opacity: 1, duration: 1 }, 1)
        .to('.hero-actions', { opacity: 1, duration: 1 }, 1.2)
        .to('.hero-meta',    { opacity: 1, duration: 1 }, 1.4);

      const tag = document.getElementById('scrambleTag');
      if (tag) scrambleText(tag);

      gsap.utils.toArray('.reveal').forEach(el =>
        gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' } })
      );
      gsap.utils.toArray('.flip3d').forEach(el =>
        gsap.to(el, { opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' } })
      );

      const skewSet = gsap.quickSetter('.skew-wrap', 'skewY', 'deg');
      ScrollTrigger.create({
        onUpdate(self) {
          skewSet(Math.max(-4, Math.min(4, self.getVelocity() / -450)));
          gsap.to('.skew-wrap', { skewY: 0, duration: .7, ease: 'power3.out', overwrite: true });
        },
      });
    });
  }, [loaded]);

  // 3D hero tilt + magnetic buttons
  useEffect(() => {
    if (!loaded) return;
    const h13d = document.getElementById('h13d');
    if (!h13d) return;

    document.querySelectorAll('.hero h1 .row').forEach((r, i) => {
      r.style.transform = `translateZ(${i * 38}px)`;
    });

    function onMove(e) {
      if (reduceMotion) return;
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      gsap.to(h13d, { rotateY: x * 14, rotateX: -y * 10, duration: .8, ease: 'power2.out', transformPerspective: 1100 });
    }
    window.addEventListener('pointermove', onMove);
    const bob = gsap.to(h13d, { y: -8, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    document.querySelectorAll('.magnetic').forEach(btn => {
      function onBtnMove(e) {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .32, y: (e.clientY - r.top - r.height / 2) * .32, duration: .4 });
      }
      function onBtnLeave() { gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }); }
      btn.addEventListener('pointermove', onBtnMove);
      btn.addEventListener('pointerleave', onBtnLeave);
      btn._cleanMagnetic = () => {
        btn.removeEventListener('pointermove', onBtnMove);
        btn.removeEventListener('pointerleave', onBtnLeave);
      };
    });

    return () => {
      window.removeEventListener('pointermove', onMove);
      bob.kill();
      document.querySelectorAll('.magnetic').forEach(btn => btn._cleanMagnetic?.());
    };
  }, [loaded]);

  return (
    <>
      <main id="top">
        <div className="skew-wrap">
          <Hero />
          <Marquees />
          <Contact />
        </div>
      </main>

      <footer>
        <div>© 2026 SHARATH — AI BUILDER</div>
        <div>HYD, INDIA · BUILT WITH AI ⚡</div>
      </footer>
    </>
  );
}
