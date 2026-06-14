export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-tag" id="scrambleTag">
        // AI BUILDER · STUDENT — HYDERABAD, INDIA
      </div>
      <div className="h3-3d" id="h13d">
        <h1>
          <span className="row"><span className="t3d-ink">I BUILD</span></span>
          <span className="row"><span className="t3d-red">AI AGENTS.</span></span>
          {/* <span className="row"><span className="t3d-blue">AND PROJECTS.</span></span> */}
        </h1>
      </div>
      <p className="hero-sub">
        Hey, I&apos;m <b>Sharath</b> — Student.I am a B.Tech Computer Science and Engineering student and an aspiring AI Engineer.
        My expertise lies in full-stack AI development, specifically building AI agents and multilingual RAG chatbots.
      </p>
      <div className="hero-actions">
        <a
          className="btn btn-primary hoverable magnetic"
          data-label="LET'S GO!"
          href="#contact"
        >
          <span className="dot" /> Work With Me
        </a>
        <a
          className="btn btn-ghost hoverable magnetic"
          data-label="DIVE IN!"
          href="#about"
        >
          Explore ↓
        </a>
      </div>
      <div className="hero-meta">
        <div>EST. 3+ YRS — CREATIVE × AI</div>
        <div className="scroll-hint">
          <div className="wheel" />
          SCROLL TO FIRE THE WEB
        </div>
        <div>BUILD · TEACH · SCALE</div>
      </div>
    </section>
  );
}
