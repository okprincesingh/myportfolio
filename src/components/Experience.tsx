import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { education, experience, profile } from "../data";
import { clamp, onFrame } from "../lib/motion";

export default function Experience() {
  const list = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const measure = () => {
      const node = list.current;
      const fill = rail.current;
      if (!node || !fill) return;
      const rect = node.getBoundingClientRect();
      const ratio = clamp((window.innerHeight * 0.78 - rect.top) / Math.max(1, rect.height), 0, 1);
      fill.style.height = `${(ratio * 100).toFixed(2)}%`;
    };
    measure();
    const stop = onFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      stop();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section id="experience" className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="mono">
            <span className="idx">04</span> &nbsp;/&nbsp; Experience
          </span>
          <span className="mono-sm dim">Nov 2023 — present · Noida</span>
        </div>

        <div className="exp-grid" style={{ marginTop: "clamp(30px,4vw,54px)" }}>
          <div className="exp-side">
            <h2 className="display exp-h">
              <span className="lm">
                <span>A steady path</span>
              </span>
              <span className="lm" style={{ transitionDelay: "90ms" }}>
                <em>through the stack.</em>
              </span>
            </h2>
            <p className="prose dim rv" style={{ marginTop: 22, maxWidth: "34ch", transitionDelay: "140ms" }}>
              Three teams, one constant: ship considered work, then make it faster, safer and easier
              to maintain.
            </p>

            <div className="ledger rv" style={{ marginTop: 26, transitionDelay: "190ms" }}>
              {[
                ["Tenure", "2+ years"],
                ["Domains", "CMS · SaaS · commerce"],
                ["Ownership", "Code → deploy → maintain"],
              ].map(([k, v]) => (
                <div className="ledger-row" key={k}>
                  <span className="mono-sm k">{k}</span>
                  <span className="v" style={{ fontSize: 15 }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <a
              className="btn btn-line rv"
              style={{ marginTop: 24, transitionDelay: "230ms" }}
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Role opportunity")}`}
            >
              Discuss a role <ArrowUpRight size={15} />
            </a>
          </div>

          <div>
            <div className="timeline" ref={list}>
              <span className="rail" aria-hidden="true">
                <i ref={rail} />
              </span>

              {experience.map((job, i) => (
                <article className={`job rv${job.current ? " now" : ""}`} key={job.company} style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="job-meta">
                    <span className="mono-sm yr">{job.years}</span>
                    {job.current && <span className="now-tag">Current</span>}
                    <span className="mono-sm dim">{job.location}</span>
                  </div>
                  <h3>{job.role}</h3>
                  <div className="co">{job.company}</div>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {job.stack.map((item) => (
                      <span className="chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="edu rv">
              <div className="sec-head" style={{ borderTop: 0, paddingTop: 0 }}>
                <span className="mono">Education</span>
                <span className="mono-sm dim">2019 — 2023</span>
              </div>
              {education.map((item) => (
                <div className="edu-row" key={item.title}>
                  <span className="mono-sm yr">{item.years}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>
                      {item.school} — {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
