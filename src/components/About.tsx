import { about, ledger, principles, stats } from "../data";
import { useCountUp, useInView } from "../lib/motion";

function Stat({ stat, delay }: { stat: (typeof stats)[number]; delay: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);
  const value = useCountUp(stat.v, seen);
  return (
    <div ref={ref} className="rv ledger-row" style={{ transitionDelay: `${delay}ms`, gridTemplateColumns: "auto minmax(0,1fr)" }}>
      <span
        className="display"
        style={{ fontSize: "clamp(34px,4.2vw,52px)", letterSpacing: "-0.05em", lineHeight: 1 }}
      >
        {value}
        {stat.suffix}
      </span>
      <span>
        <span className="mono-sm" style={{ display: "block" }}>
          {stat.k}
        </span>
        <span className="mono-sm dim" style={{ display: "block", marginTop: 5, letterSpacing: "0.1em" }}>
          {stat.d}
        </span>
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="mono">
            <span className="idx">01</span> &nbsp;/&nbsp; Profile
          </span>
          <span className="mono-sm dim">The person writing the code</span>
        </div>

        <div className="about-grid" style={{ marginTop: "clamp(30px,4vw,54px)" }}>
          <div className="about-side">
            <h2 className="display about-h">
              {about.heading.map((line, i) => (
                <span className="lm" key={line}>
                  <span style={{ transitionDelay: `${i * 90}ms` }}>
                    {i === 1 ? <em>{line}</em> : line}
                  </span>
                </span>
              ))}
            </h2>

            <div className="ledger" style={{ marginTop: 30 }}>
              {ledger.map((row, i) => (
                <div className="ledger-row rv" key={row.k} style={{ transitionDelay: `${i * 45}ms` }}>
                  <span className="mono-sm k">{row.k}</span>
                  <span className="v">{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="prose rv" style={{ fontSize: "clamp(19px,2vw,26px)", lineHeight: 1.5, fontStyle: "italic" }}>
              {about.lede}
            </p>

            <div style={{ marginTop: 26, display: "grid", gap: 16 }}>
              {about.body.map((paragraph, i) => (
                <p className="rv dim" key={paragraph.slice(0, 26)} style={{ transitionDelay: `${80 + i * 80}ms`, margin: 0, fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: 16, lineHeight: 1.72 }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <div className="sec-head">
                <span className="mono-sm dim">By the numbers</span>
                <span className="mono-sm dim">Counted, not claimed</span>
              </div>
              <div className="ledger" style={{ borderTop: 0 }}>
                {stats.map((stat, i) => (
                  <Stat key={stat.k} stat={stat} delay={i * 70} />
                ))}
              </div>
            </div>

            <div className="principles">
              <div className="sec-head" style={{ borderTop: 0, paddingTop: 0 }}>
                <span className="mono">How I judge my own work</span>
                <span className="mono-sm dim">Four non-negotiables</span>
              </div>
              {principles.map((principle, i) => (
                <article className="principle rv" key={principle.n} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="n">{principle.n}</span>
                  <div>
                    <h3>{principle.t}</h3>
                    <p>{principle.b}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
