import { useEffect, useRef, useState } from "react";

export function reducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/* ── one shared rAF loop ──────────────────────────────────────────
   Every continuous effect subscribes here so the page runs a single
   animation frame callback and the loop stops when nothing needs it. */
type FrameFn = (delta: number) => void;
const frames = new Set<FrameFn>();
let raf = 0;
let last = 0;

function tick(now: number) {
  const delta = last ? Math.min(64, now - last) : 16.7;
  last = now;
  Array.from(frames).forEach((fn) => fn(delta));
  raf = frames.size ? requestAnimationFrame(tick) : 0;
  if (!frames.size) last = 0;
}

export function onFrame(fn: FrameFn) {
  frames.add(fn);
  if (!raf) {
    last = 0;
    raf = requestAnimationFrame(tick);
  }
  return () => {
    frames.delete(fn);
    if (!frames.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/* shared scroll reading, refreshed by one subscribed frame */
export const scroll = { y: 0, velocity: 0, max: 1 };
let tracking = false;

function track() {
  if (tracking) return;
  tracking = true;
  let prev = window.scrollY;
  onFrame(() => {
    const y = window.scrollY;
    scroll.velocity = y - prev;
    prev = y;
    scroll.y = y;
    scroll.max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  });
}

export function useScrollFrame(fn: (info: { y: number; velocity: number; progress: number; delta: number }) => void) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    track();
    if (reducedMotion()) return;
    return onFrame((delta) =>
      ref.current({ y: scroll.y, velocity: scroll.velocity, progress: scroll.y / scroll.max, delta }),
    );
  }, []);
}

/* ── reveal on enter ────────────────────────────────────────────── */
export function useInView<T extends HTMLElement>(threshold = 0.16, once = true) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true);
            if (once) io.disconnect();
          } else if (!once) setSeen(false);
        });
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, once]);

  return [ref, seen] as const;
}

/** Adds `.in` to descendants marked rv / rv-x / wipe / lm as they enter. */
export function useRevealRoot() {
  useEffect(() => {
    const sel = ".rv, .rv-x, .wipe, .lm";
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      document.querySelectorAll(sel).forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    const observe = () =>
      document.querySelectorAll(sel).forEach((el) => {
        if (!el.classList.contains("in")) io.observe(el);
      });
    observe();
    // pick up nodes mounted later (tab switches, dialogs)
    const id = window.setInterval(observe, 800);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, []);
}

/* ── count up ───────────────────────────────────────────────────── */
export function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

/* ── live IST clock ─────────────────────────────────────────────── */
export function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const read = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    read();
    const id = window.setInterval(read, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/* ── fill an element as it travels through the viewport ─────────── */
export function useFillRatio<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const ratio = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      ratio.current = clamp((window.innerHeight * 0.8 - rect.top) / Math.max(1, rect.height), 0, 1);
    };
    measure();
    const stop = onFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      stop();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return [ref, ratio] as const;
}
