import { useState } from "react";
import { ArrowUpRight, Cpu } from "lucide-react";
import { engagements, levelWidth, profile, skillGroups } from "../data";
import { useInView } from "../lib/motion";

function Skill({ name, detail, level, index }: { name: string; detail: string; level: keyof typeof levelWidth; index: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  return (
    <div className="skill" ref={ref}>
      <div>
        <div className="nm">{name}</div>
        <div className="dt">{detail}</div>
      </div>
      <div className="meter">
        <i style={{ width: seen ? levelWidth[level] : "0%", transitionDelay: `${index * 70}ms` }} />
      </div>
      <div className="lvl">{level}</div>
    </div>
  );
}

export default function Stack() {
  const [tab, setTab] = useState(skillGroups[0].id);
  const group = skillGroups.find((item) => item.id === tab) ?? skillGroups[0];

  return (
    <section id="stack" className="band on-ink">
      <div className="wrap">
        <div className="sec-head">
          <span className="mono">
            <span className="idx">03</span> &nbsp;/&nbsp; Capabilities
          </span>
          <span className="mono-sm dim">Frontend · backend · data · commerce · workflow</span>
        </div>

        <div className="stack-grid" style={{ marginTop: "clamp(30px,4vw,54px)" }}>
          <div>
            <h2 className="display stack-h">
              <span className="lm">
                <span>One stack,</span>
              </span>
              <span className="lm" style={{ transitionDelay: "90ms" }}>
                <em>five surfaces.</em>
              </span>
            </h2>
            <p className="prose rv" style={{ marginTop: 22, maxWidth: "38ch", transitionDelay: "140ms" }}>
              Levels are honest rather than decorative — core, advanced and practised describe real
              depth, not aspiration.
            </p>

            <div className="rv" style={{ marginTop: 26, display: "grid", gap: 11, transitionDelay: "200ms" }}>
              {(Object.keys(levelWidth) as (keyof typeof levelWidth)[]).map((level) => (
                <div key={level} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ position: "relative", width: 96, height: 4, background: "rgba(238,236,230,0.13)", borderRadius: 99, overflow: "hidden" }}>
                    <span style={{ position: "absolute", inset: 0, width: levelWidth[level], background: "linear-gradient(90deg,var(--cobalt-lt),var(--amber))", borderRadius: 99 }} />
                  </span>
                  <span className="mono-sm dim">{level}</span>
                </div>
              ))}
            </div>

            <div className="rv" style={{ marginTop: 28, display: "flex", gap: 13, alignItems: "flex-start", padding: 17, border: "1px solid var(--line-lt)", borderRadius: 3, transitionDelay: "240ms" }}>
              <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, flexShrink: 0, background: "rgba(255,176,32,0.14)", color: "var(--amber)", borderRadius: 2 }}>
                <Cpu size={17} />
              </span>
              <p style={{ margin: 0, fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: 14.5, lineHeight: 1.62, color: "rgba(238,236,230,0.72)" }}>
                Cursor AI, GitHub Copilot and Cline sit in my daily loop — for speed and exploration,
                never as a substitute for understanding the code I ship.
              </p>
            </div>
          </div>

          <div>
            <div className="tabs" role="tablist" aria-label="Capability groups">
              {skillGroups.map((item) => (
                <button
                  key={item.id}
                  className="tab"
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={item.id === tab}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="tab-note" key={`${group.id}-note`}>
              {group.note}
            </p>

            <div className="skills" role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`}>
              {group.items.map((item, i) => (
                <Skill key={item.name} name={item.name} detail={item.detail} level={item.level} index={i} />
              ))}
            </div>

            <div className="stack-foot">
              <span className="mono-sm dim">Engagements</span>
              {engagements.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
              <a
                className="mono-sm ul"
                style={{ color: "var(--amber)", marginLeft: "auto" }}
                href={`mailto:${profile.email}?subject=${encodeURIComponent("Capability question")}`}
              >
                Need something else? <ArrowUpRight size={12} style={{ verticalAlign: -2 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
