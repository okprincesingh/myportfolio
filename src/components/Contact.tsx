import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { nav, profile, projectTypes } from "../data";
import { useClock } from "../lib/motion";

export function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.4 3a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8ZM3.4 9h4v12h-4V9Zm6.4 0h3.8v1.7h.1c.5-1 1.9-2 3.9-2 4.1 0 4.8 2.5 4.8 5.8V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4V9Z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [drafted, setDrafted] = useState(false);
  const [failed, setFailed] = useState(false);
  const clock = useClock();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setFailed(true);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry — ${data.get("type") ?? "new work"}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name") ?? ""}\nEmail: ${data.get("email") ?? ""}\nNeed: ${data.get("type") ?? ""}\n\n${data.get("message") ?? ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setDrafted(true);
  };

  return (
    <section id="contact" className="band contact">
      <div className="wrap contact-grid">
        <div>
          <div className="sec-head" style={{ borderTopColor: "rgba(255,255,255,0.3)" }}>
            <span className="mono" style={{ color: "rgba(255,255,255,0.72)" }}>
              <span style={{ color: "var(--amber)" }}>05</span> &nbsp;/&nbsp; Contact
            </span>
            <span className="mono-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Usually replies within 24 hours
            </span>
          </div>

          <h2 className="display contact-h rv" style={{ marginTop: 26 }}>
            <span className="lm">
              <span>Let&rsquo;s build</span>
            </span>
            <span className="lm" style={{ transitionDelay: "90ms" }}>
              <span>something</span>
            </span>
            <span className="lm" style={{ transitionDelay: "180ms" }}>
              <em>worth keeping.</em>
            </span>
          </h2>

          <p className="contact-lede rv" style={{ transitionDelay: "220ms" }}>
            Open to full-time roles and focused freelance engagements — new builds, WordPress and
            WooCommerce work, React front ends, or rescuing a site that has gotten slow and messy.
          </p>

          <div className="lines rv" style={{ transitionDelay: "260ms" }}>
            <button className="line-row" type="button" onClick={copyEmail}>
              <span>
                <span className="k">Email</span>
                <span className="v">{profile.email}</span>
              </span>
              <span className="act">
                {copied ? "Copied" : "Copy"} {copied ? <Check size={13} /> : <Copy size={13} />}
              </span>
            </button>

            <a className="line-row" href={profile.phoneHref}>
              <span>
                <span className="k">Phone</span>
                <span className="v">{profile.phone}</span>
              </span>
              <span className="act">
                Call <ArrowUpRight size={13} />
              </span>
            </a>

            <a className="line-row" href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>
                <span className="k">LinkedIn</span>
                <span className="v">{profile.linkedinShort}</span>
              </span>
              <span className="act">
                <LinkedInIcon size={13} /> Connect
              </span>
            </a>

            <div className="line-row" style={{ cursor: "default" }}>
              <span>
                <span className="k">
                  <MapPin size={10} style={{ verticalAlign: -1, marginRight: 6 }} />
                  Based in
                </span>
                <span className="v">
                  {profile.city}, {profile.region}
                </span>
              </span>
              <span className="act" style={{ textAlign: "right" }}>
                {clock} IST
                <br />
                <span style={{ color: "var(--amber)" }}>Remote friendly</span>
              </span>
            </div>
          </div>

          {failed && (
            <p className="mono-sm" style={{ marginTop: 14, color: "#fff" }} role="status">
              Clipboard blocked — email {profile.email} directly.
            </p>
          )}
        </div>

        <form className="form rv" onSubmit={submit} style={{ transitionDelay: "180ms" }}>
          <span className="sweep" aria-hidden="true" />
          <h3>Start a conversation</h3>
          <p className="hint">A project, a role, or a slightly ambitious idea.</p>

          <div className="fields two" style={{ marginTop: 24 }}>
            <div className="field">
              <label htmlFor="name">Your name *</label>
              <input id="name" name="name" required autoComplete="name" maxLength={100} placeholder="Jane Doe" />
            </div>
            <div className="field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" required autoComplete="email" maxLength={200} placeholder="you@company.com" />
            </div>
          </div>

          <div className="fields" style={{ marginTop: 20 }}>
            <div className="field">
              <label htmlFor="type">What do you need?</label>
              <select id="type" name="type" defaultValue={projectTypes[0]}>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">A little about it *</label>
              <textarea id="message" name="message" rows={3} required maxLength={5000} placeholder="Scope, timeline, links — anything useful." />
            </div>
          </div>

          <button className="btn" type="submit">
            {drafted ? (
              <>
                Draft ready <Check size={15} />
              </>
            ) : (
              <>
                Open email draft <Send size={15} />
              </>
            )}
          </button>
          <p className="note" role="status">
            {drafted
              ? `Your draft is open in your mail app. If nothing happened, write to ${profile.email}.`
              : "No data is stored or sent by this site — it composes an email in your own mail app."}
          </p>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="brand" href="#home" aria-label="Prince Singh — back to top">
              <span className="brand-mark" style={{ background: "var(--amber)", color: "var(--ink)" }} aria-hidden="true">
                PS
              </span>
              <span className="brand-txt">
                <b style={{ color: "var(--paper)" }}>Prince Singh</b>
                <span className="mono-sm" style={{ color: "rgba(238,236,230,0.5)" }}>
                  Full stack developer
                </span>
              </span>
            </a>
            <p className="foot-lede">
              Building web applications, CMS platforms and commerce from {profile.city}, India —
              including the hosting and maintenance that keep them online.
            </p>
          </div>

          <nav aria-label="Footer">
            <h4>Navigate</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a className="ul" href={`#${item.id}`}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="ul" href={profile.resume} download>
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h4>Direct</h4>
            <ul>
              <li>
                <a className="ul" href={`mailto:${profile.email}`}>
                  <Mail size={11} style={{ verticalAlign: -1, marginRight: 7 }} />
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="ul" href={profile.phoneHref}>
                  <Phone size={11} style={{ verticalAlign: -1, marginRight: 7 }} />
                  {profile.phone}
                </a>
              </li>
              <li>
                <a className="ul" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInIcon size={11} /> <span style={{ marginLeft: 7 }}>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-name" aria-hidden="true">
          Prince Singh
        </div>

        <div className="foot-bot">
          <span>© {new Date().getFullYear()} Prince Singh</span>
          <span>Designed &amp; built in {profile.city}, India</span>
          <a className="to-top" href="#home">
            Back to top <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
