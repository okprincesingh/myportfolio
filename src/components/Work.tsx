import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { alsoBuilt, profile, projects, type Project } from "../data";
import { ProjectShot } from "./Mockups";

/** Native dialog gives focus containment and Escape handling for free. */
function useModalDialog(onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const focused = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const onCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previous;
      focused?.focus({ preventScroll: true });
    };
  }, [onClose]);
  return ref;
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useModalDialog(onClose);

  return (
    <dialog ref={ref} className="dlg" aria-label={`${project.title} case study`}>
      <div className="modal-in">
        <div className="dlg-bar">
          <span className="mono-sm">
            <span style={{ color: "var(--cobalt)" }}>{project.n}</span> &nbsp;/&nbsp; {project.category} &nbsp;/&nbsp;{" "}
            {project.year}
          </span>
          <button className="dlg-x" type="button" onClick={onClose} aria-label="Close case study">
            <X size={17} />
          </button>
        </div>

        <div className="dlg-body">
          <h2 className="display">{project.title}</h2>
          <p className="tag">{project.tag}</p>

          <div className="dlg-specs">
            {[
              ["My role", project.role],
              ["Category", project.category],
              ["Year", project.year],
            ].map(([k, v]) => (
              <div key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>

          <p className="body">{project.body}</p>

          <div className="dlg-shot">
            <ProjectShot id={project.id} />
            <p className="dlg-note">Interface study drawn for this portfolio — not a client screenshot.</p>
          </div>

          <h4>What it involved</h4>
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="dlg-chips">
            {project.stack.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="dlg-cta">
            <a
              className="btn btn-solid"
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Enquiry — ${project.title}`)}`}
            >
              <Mail size={15} /> Ask about this build
            </a>
            <button className="btn btn-line" type="button" onClick={onClose}>
              Back to work
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="mono">
            <span className="idx">02</span> &nbsp;/&nbsp; Selected work
          </span>
          <span className="mono-sm dim">2 case studies + client work</span>
        </div>

        <div style={{ marginTop: "clamp(28px,4vw,50px)" }}>
          <h2 className="display rv" style={{ fontSize: "clamp(34px,5.4vw,76px)", maxWidth: "20ch" }}>
            <span className="lm">
              <span>Chosen for the</span>
            </span>
            <span className="lm" style={{ transitionDelay: "90ms" }}>
              <span style={{ color: "var(--cobalt)" }}>thinking behind them.</span>
            </span>
          </h2>
          <p className="prose dim rv" style={{ transitionDelay: "150ms", maxWidth: "56ch", marginTop: 22 }}>
            Two documented projects, plus the recurring client work that runs alongside them. Open a
            case study for the role, the decisions and the stack.
          </p>
        </div>

        <div style={{ marginTop: "clamp(34px,4.5vw,60px)" }}>
          {projects.map((project, i) => (
            <article className={`work-row rv${i % 2 === 1 ? " flip" : ""}`} key={project.id}>
              <div className="work-copy">
                <span className="mono-sm n">
                  {project.n} &nbsp;/&nbsp; {project.category} &nbsp;/&nbsp; {project.year}
                </span>
                <h3>{project.title}</h3>
                <p className="tag">{project.tag}</p>
                <p>{project.body}</p>
                <div className="chips">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="open">
                  <button className="btn btn-line" type="button" onClick={() => setOpen(project)}>
                    Open case study <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>

              <div className="work-art">
                <div className="lift">
                  <ProjectShot id={project.id} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="also">
          {alsoBuilt.map((item, i) => (
            <article className="also-row rv" key={item.n} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="n">{item.n}</span>
              <div>
                <h4>{item.t}</h4>
                <p>{item.b}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="rv" style={{ marginTop: 34, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
          <p className="prose dim" style={{ margin: 0, maxWidth: "44ch" }}>
            Live links and deeper case notes are shared on request — some client work is under NDA.
          </p>
          <a className="btn btn-solid" href={`mailto:${profile.email}?subject=${encodeURIComponent("Portfolio request")}`}>
            <Mail size={15} /> Request full portfolio
          </a>
        </div>
      </div>

      {open && <CaseStudy project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
