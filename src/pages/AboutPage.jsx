import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../hooks/useCursor';

gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── data ─────────────────────────────────────────── */
const skills = [
  { category: 'Languages', items: ['Python', 'C++', 'Java', 'JavaScript (ES6+)', 'HTML5 / CSS3'] },
  { category: 'AI & Automation', items: ['LangChain', 'OpenAI API', 'Claude API', 'Vector DBs', 'n8n Automation'] },
  { category: 'Web Development', items: ['ReactJS', 'Flask', 'Node.js', 'Express', 'Vite'] },
  { category: 'Databases & Tools', items: ['MongoDB', 'SQL', 'Git & GitHub', 'Postman', 'Zapier / Make'] },
];

const timeline = [
  { year: '2021', title: 'Started Creative Journey', desc: 'Began building content and marketing systems for brands. Managed 4 brands simultaneously.' },
  { year: '2022', title: 'Scaled to Multiple Brands', desc: 'Grew operations across design, content, and marketing verticals. Started noticing automation gaps.' },
  { year: '2023', title: 'Discovered AI Building', desc: 'Deep-dived into AI tools and automation. Built first AI workflows that replaced 90% of manual work.' },
  { year: '2024', title: 'AI Agents & Coaching', desc: 'Started building custom AI agents for businesses. Launched coaching to teach others to do the same.' },
  { year: '2025+', title: 'Scaling AI Systems', desc: 'Building and deploying AI agents across industries. Teaching step-by-step, zero jargon.' },
];

const stats = [
  { count: '4+', label: 'Brands Managed' },
  { count: '3+', label: 'Years Experience' },
  { count: '50+', label: 'AI Workflows Built' },
  { count: '100%', label: 'Practical Teaching' },
];

/* ─── components ────────────────────────────────────── */
function SkillGroup({ category, items }) {
  return (
    <div className="skill-group reveal">
      <div className="skill-category">{category}</div>
      <div className="skill-chips">
        {items.map(item => <span className="skill-chip" key={item}>{item}</span>)}
      </div>
    </div>
  );
}

function TimelineItem({ year, title, desc, index }) {
  return (
    <div className={`tl-item reveal ${index % 2 === 0 ? 'tl-left' : 'tl-right'}`}>
      <div className="tl-year">{year}</div>
      <div className="tl-dot" />
      <div className="tl-content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  useCursor(dotRef, ringRef, labelRef);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach(el =>
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      );
      gsap.utils.toArray('.flip3d').forEach(el =>
        gsap.to(el, {
          opacity: 1, rotateX: 0, y: 0, duration: 1.2, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      );
      // page entrance
      gsap.from('.about-hero-text', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out', delay: .2 });
      gsap.from('.about-avatar', { opacity: 0, scale: .8, duration: 1, ease: 'back.out(1.4)', delay: .3 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-label" id="cursorLabel" ref={labelRef} />

      <main className="about-page">

        {/* ── HERO BIO ── */}
        <section className="about-hero-section">
          <div className="about-hero-inner">
            <div className="about-hero-text">
              <div className="eyebrow">01 — Who I Am</div>
              <h1 className="h2 flip3d">
                HEY, I&apos;M <span className="accent">SHARATH CHANDRA GANNAMANENI</span>
              </h1>
              <p className="about-lead">
                I am Sharath, a dedicated B.Tech student at Joginpally B.R. Engineering College with a strong passion for Artificial Intelligence. My academic journey is focused on building a solid foundation in computer science and machine learning, with the ultimate goal of becoming an AI Engineer who develops innovative and impactful solutions to real-world problems. I am actively honing my skills in Python, data analysis, and deep learning frameworks and am eager to apply this knowledge to challenging projects.
              </p>

              <div className="about-badges">
                <span className="about-badge">📍 Hyderabad, India</span>
                <span className="about-badge">🎓 Student</span>
                <span className="about-badge">🤖 AI Builder</span>
                <span className="about-badge">🏫 OPEN TO WORK</span>
              </div>
            </div>
            <div className="about-avatar">
              <div className="avatar-frame">
                <div className="avatar-inner">
                  <span className="avatar-initials">SC</span>
                </div>
                <div className="avatar-ring" />
                <div className="avatar-badge">AI Builder</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ──
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map(s => (
              <div className="stat reveal" key={s.label}>
                <div className="num">{s.count}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </section> */}

        {/* ── EDUCATION ── */}
        <section className="edu-section">
          <div className="eyebrow reveal">02 — Education</div>
          <h2 className="h2 flip3d">WHERE I <span className="accent-b">STUDIED</span></h2>
          <div className="edu-cards reveal">
            <div className="edu-card">
              <div className="edu-year">2024 – Present</div>
              <div className="edu-degree">B.Tech / Engineering</div>
              <div className="edu-school">Joginpally B.R. Engineering College — Hyd, India</div>
              <p className="edu-note">
                Pursuing my degree while building AI projects and running real client work on the side.
                Learning by doing has been the biggest part of my education.
              </p>
              <div className="edu-tags">
                <span className="chip">Computer Science and Engineering</span>
                <span className="chip">AI/ML Electives</span>
              </div>
            </div>
            <div className="edu-card edu-card-alt">
              <div className="edu-year">Self-Taught</div>
              <div className="edu-degree">AI & Automation</div>
              <div className="edu-school">Online · Real Projects · Client Work</div>
              <p className="edu-note">
                APIs, agents, workflows — all built by shipping real things.
                No course certifications, just results.
              </p>
              <div className="edu-tags">
                <span className="chip">Claude API</span>
                <span className="chip">n8n</span>
                <span className="chip">LangChain</span>
                <span className="chip">Real Projects</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="skills-section">
          <div className="eyebrow reveal">03 — Technical Skills</div>
          <h2 className="h2 flip3d">WHAT I <span className="accent">BUILD WITH</span></h2>
          <div className="skills-grid">
            {skills.map(s => <SkillGroup key={s.category} {...s} />)}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        {/* <section className="timeline-section">
          <div className="eyebrow reveal">04 — My Journey</div>
          <h2 className="h2 flip3d">HOW I <span className="accent-b">GOT HERE</span></h2>
          <div className="timeline">
            <div className="tl-line" />
            {timeline.map((t, i) => <TimelineItem key={t.year} {...t} index={i} />)}
          </div>
        </section>  */}

        {/* ── QUOTE ── */}
        <section className="quote-section reveal">
          <blockquote className="big-quote">
            &ldquo;Learning AI isn&apos;t hard — you just need a teacher who actually builds.&rdquo;
          </blockquote>
        </section>

      </main>

      <footer>
        <div>© 2026 SHARATH — AI BUILDER</div>
        <div>HYD, INDIA · BUILT WITH AI ⚡</div>
      </footer>
    </>
  );
}
