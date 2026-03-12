"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const text =
  "BY Movie — where cinema meets real-time technology.\nFor over a decade, \nwe've engineered immersive environments, LED productions, and digital worlds \nfor modern filmmaking.";

const lines = text.split("\n");

const YELLOW_GLOW = {
  color: "#ffffff",
  textShadow:
    "0 0 14px rgba(215, 240, 0, 0.95), 0 0 28px rgba(215, 240, 0, 0.7), 0 0 48px rgba(215, 240, 0, 0.5)",
};

export default function WeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const words = textEl.querySelectorAll<HTMLElement>(".word");
    if (!words.length) return;

    const stagger = isMobile ? 0.035 : 0.025;
    const scrollLen = isMobile ? 900 : 1200;

    const ctx = gsap.context(() => {
      gsap.set(words, {
        color: "rgba(255,255,255,0.18)",
        textShadow: "none",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller: window,
          start: "top top",
          end: `+=${scrollLen}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      words.forEach((word, i) => {
        tl.to(word, { ...YELLOW_GLOW, duration: 0.5, ease: "none" }, i * stagger);
      });
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, [isMobile]);

  return (
    <section
      id="weare"
      ref={sectionRef}
      data-scroll
      className="
        w-full min-h-screen
        flex items-center justify-center
        bg-transparent px-6
      "
    >
      <div
        ref={textRef}
        className="max-w-[980px] mx-auto text-center font-anybody tracking-tight text-[24px] md:text-[58px] weare-text"
        style={{
          filter: "drop-shadow(0 0 10px rgba(215, 240, 0, 0.3))",
          whiteSpace: "pre-line",
          lineHeight: 1.45,
          color: "rgba(255,255,255,0.18)",
        }}
      >
        {lines.map((line, lineIdx) => (
          <Fragment key={lineIdx}>
            {line.split(" ").map((w, i) => (
              <span
                key={`${lineIdx}-${i}`}
                className="word inline-block mr-[0.32em]"
              >
                {w}
              </span>
            ))}
            {lineIdx < lines.length - 1 ? "\n" : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
