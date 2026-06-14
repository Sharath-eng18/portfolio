import { useEffect } from 'react';

export function useCursor(dotRef, ringRef, labelRef) {
  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let rx = 0, ry = 0;

    function onMove(e) {
      dot.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      label.style.left = e.clientX + 'px';
      label.style.top  = e.clientY + 'px';
      rx = e.clientX; ry = e.clientY;
    }
    window.addEventListener('pointermove', onMove);

    /* lazy ring follow */
    let rafId;
    function ringLoop() {
      const cur = ring.getBoundingClientRect();
      const cx = cur.left + cur.width / 2;
      const cy = cur.top  + cur.height / 2;
      ring.style.transform = `translate(${cx + (rx - cx) * .18}px,${cy + (ry - cy) * .18}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(ringLoop);
    }
    ringLoop();

    function onEnter(e) {
      ring.classList.add('hovering');
      const el = e.currentTarget;
      if (el.dataset.label) { label.textContent = el.dataset.label; label.style.opacity = '1'; }
    }
    function onLeave() { ring.classList.remove('hovering'); label.style.opacity = '0'; }

    const hoverEls = document.querySelectorAll('.hoverable, a, button');
    hoverEls.forEach(el => {
      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointerleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      hoverEls.forEach(el => {
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointerleave', onLeave);
      });
    };
  }, [dotRef, ringRef, labelRef]);
}
