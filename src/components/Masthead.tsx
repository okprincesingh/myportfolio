import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { index, profile, snippet } from "../data";
import { reducedMotion, useClock } from "../lib/motion";

function CodePanel() {
  const still = reducedMotion();
  return (
    <div className="panel rv" style={{ transitionDelay: "180ms" }}>
      <div className="panel-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="file">ship.js — prince-singh</span>
        <span className="live">
          <i aria-hidden="true" /> live
        </span>
      </div>

      <div className="code">
        <div className="ln" aria-hidden="true">
          {snippet.map((_, i) => (
            <div key={i} style={{ animationDelay: still ? "0ms" : `${320 + i * 55}ms` }}>
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="src">
          {snippet.map((line, i) => (
            <div key={i} style={{ animationDelay: still ? "0ms" : `${320 + i * 55}ms` }}>
              {line.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                line.map((token, j) => (
                  <span key={j} className={token.c}>
                    {token.t}
                  </span>
                ))
              )}
              {i === snippet.length - 1 && !still && (
                <span className="caret" style={{ color: "#ffb020" }}>
                  ▍
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="panel-foot">
        <span>
          status <b>open to work</b>
        </span>
        <span>{profile.city}, IN</span>
      </div>
    </div>
  );
}

export default function Masthead() {
  const clock = useClock();

  return (
    <section id="home" className="masthead">
      <div className="wrap">
        <div className="mast-grid">
          <div>
            <div className="mast-status mono-sm">
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <i className="dot-live" aria-hidden="true" /> available for work
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <MapPin size={12} aria-hidden="true" /> {profile.city}, {profile.region}
              </span>
              <span>{clock} IST</span>
            </div>

            <h1 className="display mast-name">
              <span className="lm">
                <span>Prince</span>
              </span>
              <span className="lm" style={{ transitionDelay: "110ms" }}>
                <span>
                  <span className="thin">Singh</span>
                  <span className="dot">.</span>
                </span>
              </span>
            </h1>

            <p className="prose mast-lede rv" style={{ transitionDelay: "220ms" }}>
              Full stack developer building <em>scalable web applications</em> and CMS platforms —
              React and Next.js up front, PHP, Node and WordPress behind it, with clean code,
              performance and security treated as requirements rather than aspirations.
            </p>

            <div className="mast-cta rv" style={{ transitionDelay: "300ms" }}>
              <a className="btn btn-solid" href="#work">
                Selected work <ArrowDownRight size={15} />
              </a>
              <a className="btn btn-line" href={`mailto:${profile.email}`}>
                {profile.email} <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <CodePanel />
        </div>

        <nav className="index-strip rv" aria-label="Page contents">
          {index.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="n">{item.n}</span>
              <span className="t">{item.t}</span>
              <span className="mono-sm dim">{item.meta}</span>
              <ArrowUpRight className="arrow" size={17} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
