import Chrome, { Ambient } from "./components/Chrome";
import Masthead from "./components/Masthead";
import Ticker from "./components/Ticker";
import About from "./components/About";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import Contact, { Footer } from "./components/Contact";
import { useRevealRoot } from "./lib/motion";

export default function App() {
  useRevealRoot();

  return (
    <>
      <Ambient />
      <a
        href="#about"
        className="mono-sm"
        style={{
          position: "fixed",
          top: -60,
          left: 16,
          zIndex: 90,
          padding: "11px 16px",
          background: "var(--ink)",
          color: "var(--paper)",
          borderRadius: 2,
          transition: "top .25s",
        }}
        onFocus={(event) => (event.currentTarget.style.top = "16px")}
        onBlur={(event) => (event.currentTarget.style.top = "-60px")}
      >
        Skip to content
      </a>

      <Chrome />

      <main className="shell">
        <Masthead />
        <Ticker />
        <About />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>

      <div className="shell">
        <Footer />
      </div>
    </>
  );
}
