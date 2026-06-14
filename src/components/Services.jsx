import { useEffect } from 'react';

const services = [
  {
    badge: 'ISSUE #01',
    glyph: '🤖',
    title: 'AI Agents',
    desc: 'Custom AI agents that do the work themselves — handling leads, talking to customers, managing data. Running 24×7, no days off.',
    chips: ['Claude API', 'n8n', 'Custom Logic'],
  },
  {
    badge: 'ISSUE #02',
    glyph: '⚡',
    title: 'Automation Systems',
    desc: 'Chat bots, lead capture, CRM sync, content pipelines — hand the repetitive work to machines and focus on growth. Real systems, real ROI.',
    chips: ['WhatsApp API', 'Google Sheets', 'Workflows'],
  },
  {
    badge: 'ISSUE #03',
    glyph: '🎓',
    title: 'AI Coaching',
    descJsx: (
      <>
        The most practical AI education you&apos;ll find. I don&apos;t teach
        tools — I teach <b style={{ color: 'var(--ink)' }}>building</b>, so you
        earn with AI instead of just using it.
      </>
    ),
    chips: ['Step By Step', 'Zero Coding Needed', 'Live Builds'],
  },
];

function Card({ badge, glyph, title, desc, descJsx, chips }) {
  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    e.currentTarget.style.setProperty('--mx', px * 100 + '%');
    e.currentTarget.style.setProperty('--my', py * 100 + '%');
    e.currentTarget.style.transform = `rotateY(${(px - .5) * 16}deg) rotateX(${(.5 - py) * 16}deg)`;
  }
  function onMouseLeave(e) {
    e.currentTarget.style.transform = '';
  }

  return (
    <div
      className="card hoverable reveal"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="badge">{badge}</div>
      <div className="glyph">{glyph}</div>
      <h3>{title}</h3>
      <p>{descJsx ?? desc}</p>
      <div className="chip-row">
        {chips.map(c => <span className="chip" key={c}>{c}</span>)}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="work">
      <div className="eyebrow reveal">02 — What I Build &amp; Teach</div>
      <h2 className="h2 flip3d">
        FROM IDEA TO <span className="accent-b">AUTOMATED</span> BUSINESS
      </h2>
      <div className="cards">
        {services.map(s => <Card key={s.badge} {...s} />)}
      </div>
    </section>
  );
}
