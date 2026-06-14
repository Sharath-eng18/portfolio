function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 4 12 4 12 4s-4.6 0-7.7.2c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.4.8 11.3v1.7c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.6 1 1.9.2 7.5.2 7.5.2s4.6 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.7c0-1.9-.2-3.8-.2-3.8zM9.8 15.3V8.7l6.2 3.3-6.2 3.3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5.2.6.8 2 .9 2.2.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.8 2.2 1.2 1.1 2.2 1.4 2.6 1.6.3.2.5.1.7-.1l1-1.1c.2-.3.4-.2.7-.1.3.1 1.8.8 2.1 1 .3.2.5.2.6.4.1.1.1.7-.1 1.4z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="eyebrow reveal" style={{ justifyContent: 'center' }}>
        04 — Let&apos;s Build
      </div>
      <h2 className="h2 flip3d">
        READY TO GO <span className="accent">AI-FIRST?</span>
      </h2>
      <p
        className="hero-sub reveal"
        style={{ opacity: 1, margin: '26px auto 0', textAlign: 'center' }}
      >
        DM me, book a call, or send a message.{' '}
        <b>Your first AI agent starts right here.</b>
      </p>
      <div className="mega-cta reveal">
        <a
          className="btn btn-primary hoverable magnetic"
          data-label="DM NOW!"
          href="https://instagram.com/sharath_018"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="dot" /> DM on Instagram
        </a>
      </div>
      {/*     <div className="social-row reveal">
        <a
          className="social ig hoverable"
          href="https://instagram.com/sharath_018"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon /> @sharath_018
        </a>
        {/* Replace # with your YouTube channel URL */}
      {/* <a
          className="social yt hoverable"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon /> YouTube
        </a> */}
      {/* Replace # with https://wa.me/91XXXXXXXXXX */}
      {/* <a
          className="social wa hoverable"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> WhatsApp
        </a> */}
      {/* </div> */}
    </section>
  );
}
