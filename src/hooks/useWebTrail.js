import { useEffect } from 'react';

export function useWebTrail(canvasRef, reduceMotion) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const tx = c.getContext('2d');

    function sizeTrail() { c.width = innerWidth; c.height = innerHeight; }
    sizeTrail();
    window.addEventListener('resize', sizeTrail);

    const trail = [];
    function onMove(e) {
      trail.unshift({ x: e.clientX, y: e.clientY });
      if (trail.length > 26) trail.pop();
    }
    window.addEventListener('pointermove', onMove);

    let rafId;
    function trailLoop() {
      tx.clearRect(0, 0, c.width, c.height);
      if (trail.length > 2 && !reduceMotion) {
        for (let i = 1; i < trail.length; i++) {
          const f = 1 - i / trail.length;
          tx.strokeStyle = `rgba(255,61,78,${f * .6})`;
          tx.lineWidth = f * 3;
          tx.beginPath();
          tx.moveTo(trail[i - 1].x, trail[i - 1].y);
          tx.lineTo(trail[i].x, trail[i].y);
          tx.stroke();
          if (i % 5 === 0) {
            tx.strokeStyle = `rgba(232,230,240,${f * .2})`;
            tx.lineWidth = 1;
            const dx = trail[i].x - trail[i - 1].x;
            const dy = trail[i].y - trail[i - 1].y;
            const L = Math.hypot(dx, dy) || 1;
            const nx = -dy / L * 7 * f, ny = dx / L * 7 * f;
            tx.beginPath();
            tx.moveTo(trail[i].x - nx, trail[i].y - ny);
            tx.lineTo(trail[i].x + nx, trail[i].y + ny);
            tx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(trailLoop);
    }
    trailLoop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', sizeTrail);
      window.removeEventListener('pointermove', onMove);
    };
  }, [canvasRef, reduceMotion]);
}
