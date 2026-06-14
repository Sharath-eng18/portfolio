import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../hooks/useCursor';

gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────────────
   PROJECT DATA
   Replace placeholder values with your real data:
   - title, description, tags, link, github
   - image: put screenshots in /public/projects/ and
     set image: '/projects/my-screenshot.png'
   ───────────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title: 'PR-Shield AI',
    description:
      'An intelligent automated code review assistant that analyzes PR diffs using Qwen-2.5-Coder-32B via Hugging Face, posting inline comments and rendering summaries on a glassmorphic dashboard.',
    tags: ['AI Agents', 'Node.js', 'GitHub Actions', 'Hugging Face', 'Automation'],
    link: null,
    github: 'https://github.com/Sharath-eng18/AI-Powered-Code-Review-Assistant',
    status: 'Live',
    statusColor: 'green',
  },
  {
    id: 2,
    title: 'STOC.AI',
    description:
      'A multi-agent AI stock analysis advisor combining news sentiment analysis, quantitative indicators, and a rule-based advisor into a unified LangGraph pipeline for Buy/Hold/Sell advice.',
    tags: ['AI Agents', 'LangGraph', 'React', 'Finance API'],
    link: 'https://multi-agent-ai-stock-advisor.vercel.app',
    github: 'https://github.com/Sharath-eng18/Multi-Agent-AI-Stock-Advisor',
    status: 'Live',
    statusColor: 'green',
  },
  {
    id: 3,
    title: 'ConverseBOT',
    description:
      'A language-agnostic RAG chatbot designed to automate college enquiries. Supports multilingual voice inputs and integrates seamlessly as a floating web widget.',
    tags: ['AI Agents', 'RAG', 'React', 'Speech Recognition'],
    link: null,
    github: 'https://github.com/Sharath-eng18/Language-Agnostic-ChatBOT',
    status: 'Live',
    statusColor: 'green',
  },
  {
    id: 4,
    title: 'Multilingual Hotel Concierge Bot',
    description:
      'A full-stack AI virtual concierge enabling guests to get instant answers about hotel bookings, services, and local recommendations in their native language.',
    tags: ['AI Agents', 'Node.js', 'Automation', 'Speech Translation'],
    link: null,
    github: 'https://github.com/Sharath-eng18/Multilingual-Hotel-Concierge-Bot',
    status: 'Live',
    statusColor: 'green',
  },
  {
    id: 5,
    title: 'EchoGPT',
    description:
      'A full-stack conversational AI application with a responsive React interface, real-time chat streaming, and a lightweight Python Flask backend utilizing LangChain.',
    tags: ['React', 'Python', 'Flask', 'LangChain'],
    link: 'https://echo-gpt-lang-chain-frontend.vercel.app',
    github: 'https://github.com/Sharath-eng18/EchoGPT-LangChain-Frontend',
    status: 'Live',
    statusColor: 'green',
  },
  {
    id: 6,
    title: 'Paatalu React Player',
    description:
      'A sleek, responsive browser-based music player built using React.js. Offers smooth audio playback, song queuing, and modern aesthetic integration.',
    tags: ['React', 'Vercel', 'Audio Player'],
    link: 'https://paatalu-react.vercel.app',
    github: 'https://github.com/Sharath-eng18/Paatalu_React',
    status: 'Live',
    statusColor: 'green',
  },
  {
    id: 7,
    title: 'This Portfolio',
    description:
      'A comic-book themed 3D portfolio built with React + Vite + Three.js. Features an interactive 3D web trail, custom cursor, GSAP animations, and glassmorphic HUD styling.',
    tags: ['React', 'Three.js', 'GSAP', 'Vite'],
    link: 'https://my-portfolio-rouge-rho-48.vercel.app',
    github: 'https://github.com/Sharath-eng18/my-portfolio',
    status: 'Live',
    statusColor: 'green',
  },
];

const STATUS_COLORS = {
  green: { bg: 'rgba(37,211,102,.12)', border: 'rgba(37,211,102,.3)', text: '#25D366' },
  blue: { bg: 'rgba(77,111,255,.12)', border: 'rgba(77,111,255,.3)', text: '#7B9BFF' },
  yellow: { bg: 'rgba(255,210,52,.10)', border: 'rgba(255,210,52,.3)', text: '#FFD234' },
};

function ProjectCard({ project, index }) {
  const { title, description, tags, link, github, status, statusColor } = project;
  const col = STATUS_COLORS[statusColor] || STATUS_COLORS.blue;

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  }

  return (
    <article
      className="project-card reveal"
      style={{ '--delay': `${index * 0.08}s` }}
      onMouseMove={onMouseMove}
    >
      {/* spotlight glow */}
      <div className="project-card-spotlight" />

      {/* body */}
      <div className="project-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <div className="project-issue" style={{ marginBottom: 0 }}>PROJECT // {String(index + 1).padStart(2, '0')}</div>
          <div
            className="project-status"
            style={{ background: col.bg, borderColor: col.border, color: col.text, position: 'static' }}
          >
            <span className="project-status-dot" style={{ background: col.text }} />
            {status}
          </div>
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <div className="project-tags">
          {tags.map(t => <span className="chip" key={t}>{t}</span>)}
        </div>
      </div>

      {/* links */}
      <div className="project-links">
        {link && link !== '#' && (
          <a className="project-link project-link-primary hoverable" href={link} target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
        )}
        {link === '#' && (
          <a className="project-link project-link-primary hoverable" href={link}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Project
          </a>
        )}
        {github && (
          <a className="project-link project-link-ghost hoverable" href={github} target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        )}
        {!link && !github && (
          <span className="project-link project-link-disabled">Under NDA</span>
        )}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  useCursor(dotRef, ringRef, labelRef);

  const [filter, setFilter] = useState('All');
  const allTags = ['All', 'AI Agents', 'Automation', 'React', 'WhatsApp API', 'Client Project'];

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(filter) || p.status === filter);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.projects-hero-text', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', delay: .15 });
      gsap.utils.toArray('.reveal').forEach(el =>
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        })
      );
      gsap.utils.toArray('.flip3d').forEach(el =>
        gsap.to(el, {
          opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      );
    });
    return () => ctx.revert();
  }, [filter]);

  return (
    <>
      {/* cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-label" id="cursorLabel" ref={labelRef} />

      <main className="projects-page">

        {/* ── PAGE HERO ── */}
        <section className="projects-hero-section">
          <div className="projects-hero-text">
            <div className="eyebrow">PORTFOLIO — REAL BUILDS</div>
            <h1 className="h2 flip3d">
              THINGS I&apos;VE <span className="accent">SHIPPED</span>
            </h1>
            <p className="projects-lead reveal">
              AI agents, automation pipelines, and tools built for real businesses.
              Every project here is something that actually runs, earns, or saves time.
            </p>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <section className="filter-section">
          <div className="filter-bar reveal">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`filter-btn hoverable ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="projects-grid-section">
          <div className="projects-grid">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="projects-cta-section reveal">
          <div className="projects-cta-inner">
            <h2 className="h2 flip3d">GOT A <span className="accent">PROJECT</span> IN MIND?</h2>
            <p className="projects-cta-sub">
              I build custom AI agents and automation systems for real businesses.
              Let&apos;s talk about what we can automate for you.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '36px', opacity: 1 }}>
              <a
                className="btn btn-primary hoverable magnetic"
                data-label="LET'S GO!"
                href="https://instagram.com/sarveshh.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="dot" /> DM on Instagram
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <div>© 2026 SHARATH — AI BUILDER</div>
        <div>HYD, INDIA · BUILT WITH AI ⚡</div>
      </footer>
    </>
  );
}
