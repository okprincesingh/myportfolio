import { ArrowUpRight } from "lucide-react";

function ShotBar({ url }: { url: string }) {
  return (
    <div className="shot-bar">
      <span className="dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="url">{url}</span>
      <span style={{ width: 28 }} aria-hidden="true" />
    </div>
  );
}

/** Admin dashboard for the care platform — the access-controlled product. */
export function CareShot() {
  return (
    <div className="shot" aria-hidden="true">
      <ShotBar url="care-platform / admin / overview" />
      <div className="care">
        <div className="care-side">
          <span className="lg">
            care<b>.</b>
          </span>
          <nav>
            {["Overview", "Residents", "Care plans", "Tasks", "Reports", "Access"].map((item, i) => (
              <div key={item} className={i === 0 ? "on" : undefined}>
                <i /> {item}
              </div>
            ))}
          </nav>
          <div className="who">
            <b>PS</b>
            <span>
              Admin
              <br />
              full access
            </span>
          </div>
        </div>

        <div className="care-main">
          <div className="care-top">
            <div>
              <h4>Care overview</h4>
              <p>Monday · 09:41 IST</p>
            </div>
            <span className="add">+ New plan</span>
          </div>

          <div className="kpis">
            {[
              ["Residents", "128", "+6.2%"],
              ["Care plans", "96", "+4.1%"],
              ["Open tasks", "14", "−2.4%"],
            ].map(([label, value, delta]) => (
              <div className="kpi" key={label}>
                <span>{label}</span>
                <b>{value}</b>
                <i>{delta}</i>
              </div>
            ))}
          </div>

          <div className="care-grid">
            <div className="card">
              <span>Weekly activity</span>
              <div className="bars">
                {[42, 62, 48, 76, 56, 92, 70, 80].map((height, i) => (
                  <i key={i} className={i === 5 ? "hi" : undefined} style={{ height: `${height}%`, animationDelay: `${i * 60}ms` }} />
                ))}
              </div>
            </div>
            <div className="card" style={{ textAlign: "center" }}>
              <span>Plans complete</span>
              <div className="donut">
                <b>92%</b>
              </div>
            </div>
          </div>

          <div className="rows">
            {[
              ["AS", "A. Sharma", "Morning care", "Active"],
              ["RP", "R. Patel", "Daily review", "Active"],
              ["MI", "M. Iyer", "Medication", "Review"],
            ].map(([initial, name, note, status]) => (
              <div className="r" key={name}>
                <b>{initial}</b>
                <span>{name}</span>
                <em>{note}</em>
                <i>{status}</i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Marketing site with a phone overlay — the mobile-first build. */
export function BizShot() {
  return (
    <div style={{ position: "relative" }} aria-hidden="true">
      <div className="shot">
        <ShotBar url="atelier-studio / home" />
        <div className="biz">
          <div className="biz-nav">
            <b>Atelier</b>
            <div>
              <span>Work</span>
              <span>Studio</span>
              <i>Enquire</i>
            </div>
          </div>

          <div className="biz-hero">
            <div>
              <span className="kick">Interior architecture</span>
              <h5>
                Space for
                <br />
                better work.
              </h5>
              <p>Considered interiors, made for everyday living and long deadlines.</p>
              <span className="cta">
                View projects <ArrowUpRight size={11} />
              </span>
            </div>
            <div className="biz-fig">
              <b>fig. 01 — studio</b>
            </div>
          </div>

          <div className="biz-cards">
            {[
              ["01", "Residential"],
              ["02", "Workspace"],
              ["03", "Hospitality"],
            ].map(([n, label]) => (
              <div key={n}>
                <span>{n}</span>
                <b>{label}</b>
                <i />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="phone">
        <span className="notch" />
        <div className="scr">
          <b>Atelier</b>
          <h6>
            Space for
            <br />
            better work.
          </h6>
          <div className="fig" />
          <div className="cta">Enquire now</div>
        </div>
      </div>

      <div className="float-tag">
        <i /> mobile-first build
      </div>
    </div>
  );
}

export function ProjectShot({ id }: { id: "care" | "biz" }) {
  return id === "care" ? <CareShot /> : <BizShot />;
}
