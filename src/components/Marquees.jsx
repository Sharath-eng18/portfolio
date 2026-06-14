export default function Marquees() {
  return (
    <>
      <div className="marquee m-fwd">
        <div className="marquee-track">
          <span>AI Agents</span><span className="hl">★</span>
          <span>Automation</span><span className="hl">★</span>
          <span className="hl">★</span>
          <span>Chat Bots</span><span className="hl">★</span>
          <span>Content Systems</span><span className="hl">★</span>
          {/* duplicate for seamless loop */}
          <span>AI Agents</span><span className="hl">★</span>
          <span>Automation</span><span className="hl">★</span>
          <span className="hl">★</span>
          <span>Chat Bots</span><span className="hl">★</span>
          <span>Content Systems</span><span className="hl">★</span>
        </div>
      </div>
      <div className="marquee m-rev m2">
        <div className="marquee-track">
          <span>Build</span><span>·</span><span>·</span>
          <span>Automate</span><span>·</span>
          <span>Scale</span><span>·</span>
          <span>Repeat</span><span>·</span>
          <span>Build</span><span>·</span><span>·</span>
          <span>Automate</span><span>·</span>
          <span>Scale</span><span>·</span>
          <span>Repeat</span><span>·</span>
          {/* duplicate */}
          <span>Build</span><span>·</span><span>·</span>
          <span>Automate</span><span>·</span>
          <span>Scale</span><span>·</span>
          <span>Repeat</span><span>·</span>
          <span>Build</span><span>·</span><span>·</span>
          <span>Automate</span><span>·</span>
          <span>Scale</span><span>·</span>
          <span>Repeat</span><span>·</span>
        </div>
      </div>
    </>
  );
}
