"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const steps = [
  {
    title: "CONCEPT",
    desc:
      "We define objectives, align creative direction, and evaluate technical feasibility.\n" +
      "Every project begins with a clear visual strategy built for real-time execution.",
  },
  {
    title: "PREVISUALIZATION",
    desc:
      "We create real-time previews in Unreal Engine to test framing, lighting, scale, and camera movement.\n" +
      "This stage eliminates guesswork and ensures production clarity before stepping onto the stage.",
  },
  {
    title: "PRODUCTION SETUP",
    desc:
      "LED volume configuration, camera tracking calibration, environment optimization, and lighting integration.\n" +
      "Everything is engineered to perform flawlessly under cinema conditions.",
  },
  {
    title: "REAL-TIME SHOOTING",
    desc:
      "Final pixels captured in-camera.\n" +
      "Dynamic environments, interactive lighting, seamless parallax, and full creative control — live on set.",
  },
  {
    title: "WRAP & READY",
    desc:
      "Shoot complete.\n" +
      "Every frame captured exactly as intended — polished, cinematic, and ready for festivals, premieres, or global release.",
  },
];

const HEADER_HEIGHT_FALLBACK = 72;

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Десктоп: анимация при скролле (мобильную не трогаем)
  useLayoutEffect(() => {
    if (!mounted || isMobile) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const sticky = stickyRef.current;
    const track = desktopTrackRef.current;
    if (!section || !sticky || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const n = cards.length;
    const overlapBoost = 1.75;

    let lastProgress = 0;
    let lastTime = performance.now();
    // Фиксируем sectionRect.top в момент, когда заголовок доехал до хедера — от него считаем прогресс 0..1
    let startSectionTopWhenHeadingAtHeader: number | null = null;

    const gapPx = 32;

    const getHeaderHeight = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim();
      if (v) {
        const num = parseFloat(v);
        if (!Number.isNaN(num)) return num;
      }
      return HEADER_HEIGHT_FALLBACK;
    };

    const onResize = () => {
      const vh = window.innerHeight;
      const headerH = getHeaderHeight();
      // Секция: контент 22vh + 128vh; скролл от прилипания до progress=2 даёт section top от (headerH-22vh) до -vh
      const scrollForAnimation = headerH - 0.22 * vh + vh;
      section.style.height = `${0.22 * vh + 1.28 * vh + scrollForAnimation}px`;
    };

    const onScroll = () => {
      const sectionRect = section.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const vh = window.innerHeight;
      const headerBottom = getHeaderHeight();

      // Блок (заголовок + карточки) остановился под хедером — sticky прилип
      const blockStuckUnderHeader = stickyRect.top <= headerBottom;

      if (!blockStuckUnderHeader) {
        startSectionTopWhenHeadingAtHeader = null;
      } else if (startSectionTopWhenHeadingAtHeader === null) {
        startSectionTopWhenHeadingAtHeader = sectionRect.top;
      }

      let progress = 0;
      if (!blockStuckUnderHeader || startSectionTopWhenHeadingAtHeader === null) {
        progress = 0;
      } else {
        const startTop = startSectionTopWhenHeadingAtHeader;
        const minPhase1ScrollVh = 0.6;
        const minRange = minPhase1ScrollVh * vh;
        const phase1StartTop = startTop;
        const phase1EndTop = Math.min(0, startTop - minRange);

        if (sectionRect.top >= phase1StartTop) {
          progress = 0;
        } else if (sectionRect.top >= phase1EndTop) {
          progress = (sectionRect.top - phase1StartTop) / (phase1EndTop - phase1StartTop);
        } else if (sectionRect.top >= 0) {
          progress = 1;
        } else if (sectionRect.top >= -vh) {
          progress = 1 + (-sectionRect.top) / vh;
        } else {
          progress = 2;
        }
      }
      progress = Math.max(0, Math.min(2, progress));

      const cardW = cards[0].offsetWidth;
      const viewportW = sticky.clientWidth;
      const baseOverlap = (viewportW - cardW) / (n - 1);
      const overlap = baseOverlap * overlapBoost;

      const phase1 = Math.min(progress, 1);
      const phase2 = progress > 1 ? Math.min(progress - 1, 1) : 0;

      const currentTime = performance.now();
      const deltaTime = Math.max(currentTime - lastTime, 1);
      const progressSpeed = (Math.abs(phase1 - lastProgress) / deltaTime) * 1000;
      lastProgress = phase1;
      lastTime = currentTime;

      gsap.set(cards[0], { x: 0, filter: "blur(0px)" });

      for (let i = 1; i < n; i++) {
        const startX = i * (cardW + 200);
        const finalX = -i * overlap;
        const local = Math.min(Math.max(phase1 * (n - 1) - (i - 1), 0), 1);
        const currentX = startX + (finalX - startX) * local;
        const blurBase = progressSpeed * 0.02;
        const blurMultiplier = 1 + i * 0.3;
        const blurAmount = Math.min(blurBase * blurMultiplier, 6);
        gsap.set(cards[i], { x: currentX, filter: `blur(${blurAmount.toFixed(2)}px)` });
      }

      const stackedRight = (n - 1) * (cardW + gapPx) + cardW - (n - 1) * overlap;
      const exitDistance = Math.max(0, stackedRight - viewportW);
      const trackX = -phase2 * exitDistance;
      gsap.set(track, { x: trackX });
    };

    onResize();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, isMobile]);

  return (
    <section
      id="howwework"
      ref={sectionRef}
      className="relative w-full bg-transparent text-white"
    >
      {/* МОБИЛЬНАЯ: заголовок + статичные карточки — не менять */}
      <div className="md:hidden">
        <div className="min-h-[28vh] flex flex-col items-center justify-end px-4 pt-8 pb-4">
          <h2 className="text-center text-3xl font-bold tracking-[0.2em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            HOW WE WORK
          </h2>
        </div>
        <div className="px-4 pb-12 overflow-x-auto">
          <div className="flex flex-col gap-[5px] items-center">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[90vw] max-w-[440px] bg-[#D7F000] px-6 py-8 shadow-[0_18px_36px_rgba(0,0,0,0.22)]"
              >
                <div className="text-[#101010] text-center">
                  <div className="opacity-50 mb-3">[{i + 1}]</div>
                  <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                  <p className="whitespace-pre-line text-center">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ДЕСКТОП: отступ, затем sticky-блок (заголовок + карточки) — останавливается под хедером */}
      {!isMobile && mounted && (
        <>
          <div className="hidden md:block min-h-[22vh] shrink-0" aria-hidden="true" />
          <div
            ref={stickyRef}
            className="hidden md:flex md:flex-col md:min-h-[128vh] overflow-hidden"
            style={{ position: "sticky", top: "var(--nav-height, 72px)" }}
          >
            <div className="min-h-[14vh] flex flex-col items-center justify-end px-4 pt-4 pb-2 md:pb-[5vh]">
              <h2
                ref={headingRef}
                className="text-center text-3xl md:text-5xl font-bold tracking-[0.2em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                HOW WE WORK
              </h2>
            </div>
            <div className="flex-1 min-h-[100vh] flex flex-col px-4 pt-0 overflow-hidden">
              <div className="flex-1 flex items-center">
                <div ref={desktopTrackRef} className="flex gap-8 pl-6 pr-6">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className="w-[40vw] min-w-[40vw] h-[340px] bg-[#DBFE02] px-12 py-12 shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                      style={{ willChange: "transform, filter", transform: "translateZ(0)" }}
                    >
                      <div className="text-[#101010] h-full flex flex-col items-center justify-center text-center">
                        <div className="opacity-50 mb-3">[{i + 1}]</div>
                        <h3 className="text-4xl font-bold mb-6">{s.title}</h3>
                        <p className="whitespace-pre-line text-lg max-w-[80%]">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
