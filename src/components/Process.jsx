const steps = [
  { no: '01', title: 'Understand', desc: 'First I map your business or goal — where time is leaking, and where AI fits best.' },
  { no: '02', title: 'Build',      desc: 'Agent or automation designed + built — fast, tested, and plugged into your real workflow.' },
  { no: '03', title: 'Learn',      desc: "I don't just deliver — I teach you how to run and modify the system yourself, step by step." },
  { no: '04', title: 'Scale',      desc: 'Once the system runs, we scale it across more brands, more products, more income streams.' },
];

export default function Process() {
  return (
    <section id="process">
      <div className="eyebrow reveal">03 — How It Works</div>
      <h2 className="h2 flip3d">
        SIMPLE PROCESS, <span className="accent">SERIOUS</span> RESULTS
      </h2>
      <div className="steps">
        {steps.map(s => (
          <div className="step reveal" key={s.no}>
            <div className="no">{s.no}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
