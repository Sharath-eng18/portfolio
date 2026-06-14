import { useEffect, useRef } from 'react';

const stats = [
  { count: 4,   label: 'Brands Managed' },
  { count: 3,   label: 'Years Experience' },
  { count: 50,  label: 'AI Workflows Built' },
  { count: 100, label: '% Practical, 0% Jargon' },
];

function StatCounter({ count, label }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const p = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(ease * count);
        el.textContent = val + (count === 100 ? '%' : '+');
        if (p < 1) requestAnimationFrame(update);
        else el.textContent = count + (count === 100 ? '%' : '+');
      }
      requestAnimationFrame(update);
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [count]);

  return (
    <div className="stat">
      <div className="num" ref={numRef}>0</div>
      <div className="lbl">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="eyebrow reveal">01 — Who is Sarvesh</div>
      <h2 className="h2 flip3d">
        CREATIVE DIRECTOR TURNED <span className="accent">AI BUILDER</span>
      </h2>
      <div className="about-grid">
        <div className="about-text">
          <p className="reveal">
            For 3+ years I&apos;ve been building{' '}
            <b>content, design and marketing systems</b> for brands — running 4
            of them at the same time. Then AI showed up, and I realized{' '}
            <b>90% of that work could run itself.</b>
          </p>
          <p className="reveal">
            Today I build <b>AI agents, chat automations, and content engines</b>{' '}
            that operate inside real businesses — and I teach everything I know,{' '}
            <b>step by step</b>, so you can build them too.
          </p>
          <p className="quote reveal">
            &ldquo;Learning AI isn&apos;t hard — you just need a teacher who
            actually builds.&rdquo;
          </p>
        </div>
        <div className="stats reveal">
          {stats.map(s => (
            <StatCounter key={s.label} count={s.count} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
