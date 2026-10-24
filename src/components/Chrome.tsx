import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, profile } from "../data";
import { reducedMotion, useClock, useScrollFrame } from "../lib/motion";

const sectionIds = ["home", ...nav.map((item) => item.id)];

/** Layered technical ground: plotting grid, directional light, film grain. */
export function Ambient() {
  return (
    <>
      <div className="field" aria-hidden="true">
        <div className="field-grid" />
        <div className="field-wash" />
      </div>
      <div className="field-grain" aria-hidden="true" />
    </>
  );
}

export default function Chrome() {
  const [stuck, setStuck] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [active, setActive] = useState("home");
  const clock = useClock();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 34);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (!nodes.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.6] },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!sheet) return;
    const previous = document.body.style.overflow;
    const focused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      focused?.focus({ preventScroll: true });
    };
  }, [sheet]);

  useScrollFrame(({ progress }) => {
    if (bar.current) bar.current.style.transform = `scaleX(${progress.toFixed(4)})`;
  });

  return (
    <>
      <header className={`topbar${stuck || sheet ? " stuck" : ""}`}>
        <div className="wrap topbar-in">
          <a className="brand" href="#home" aria-label="Prince Singh — back to top">
            <span className="brand-mark" aria-hidden="true">PS</span>
            <span className="brand-txt">
              <b>Prince Singh</b>
              <span className="mono-sm">Full stack developer</span>
            </span>
          </a>

          <nav className="nav" aria-label="Sections">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar-right">
            <span className="clock mono-sm" aria-hidden="true">
              <i className="dot-live" style={{ width: 6, height: 6, borderRadius: 99, background: "#1b34e0" }} />
              {clock} IST
            </span>
            <a className="resume mono-sm ul" href={profile.resume} download>
              Resume
            </a>
            <a className="btn btn-solid" href="#contact" style={{ padding: "11px 17px" }}>
              Let&rsquo;s talk <ArrowUpRight size={14} />
            </a>
            <button
              className="burger"
              type="button"
              onClick={() => setSheet((open) => !open)}
              aria-label={sheet ? "Close menu" : "Open menu"}
              aria-expanded={sheet}
              aria-controls="sheet"
            >
              {sheet ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        <div className="progress" ref={bar} aria-hidden="true" />
      </header>

      <div id="sheet" className={`sheet${sheet ? " open" : ""}`} aria-hidden={!sheet}>
        {nav.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setSheet(false)} tabIndex={sheet ? 0 : -1}>
            {item.label}
            <span>0{i + 2}</span>
          </a>
        ))}
        <a href={profile.resume} download tabIndex={sheet ? 0 : -1}>
          Resume
          <span>PDF</span>
        </a>
        <button type="button" onClick={() => setSheet(false)} tabIndex={sheet ? 0 : -1}>
          Close
          <span>ESC</span>
        </button>
      </div>
    </>
  );
}

export { reducedMotion };
