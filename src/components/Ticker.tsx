import { useEffect, useRef } from "react";
import { tickerItems } from "../data";
import { clamp, onFrame, reducedMotion, scroll } from "../lib/motion";

/**
 * Marquee that reacts to scroll velocity: direction follows the scroll,
 * speed carries a little momentum, and the track skews while you move.
 */
export default function Ticker() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const offset = { value: 0 };
    const smooth = { value: 0 };
    const base = 42;

    return onFrame((delta) => {
      const node = track.current;
      if (!node) return;
      const half = node.scrollWidth / 2;
      if (half <= 0) return;

      smooth.value += (scroll.velocity - smooth.value) * 0.09;
      const direction = scroll.velocity < -0.6 ? -1 : 1;
      offset.value -= ((base * delta) / 1000) * direction;
      offset.value -= smooth.value * 0.6;

      if (offset.value <= -half) offset.value += half;
      if (offset.value > 0) offset.value -= half;

      const skew = clamp(smooth.value * -0.24, -12, 12);
      node.style.transform = `translate3d(${offset.value.toFixed(2)}px,0,0) skewX(${skew.toFixed(2)}deg)`;
    });
  }, []);

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track" ref={track}>
        {[0, 1].map((copy) => (
          <div className="ticker-copy" key={copy}>
            {tickerItems.map((item) => (
              <span key={item}>
                {item}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
