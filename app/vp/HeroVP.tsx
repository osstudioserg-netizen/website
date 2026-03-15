'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const vpVideoSrc = "/videos/VP.webm";

export default function HeroVP() {
  const topMask = useRef<HTMLDivElement | null>(null);
  const bottomMask = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!topMask.current || !bottomMask.current) return;

    gsap.set(topMask.current, { yPercent: 30 });
    gsap.set(bottomMask.current, { yPercent: -30 });

    gsap.timeline()
      .to(
        topMask.current,
        {
          yPercent: -50,
          duration: 1.4,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        bottomMask.current,
        {
          yPercent: 50,
          duration: 1.4,
          ease: "power3.inOut",
        },
        0
      );
  }, []);

  const videoBlockStyle = {
    top: "var(--nav-height, 72px)",
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-transparent">
      {/* Весь контент героя под навбаром — сверху полоса с паттерном */}
      <div className="absolute overflow-hidden" style={videoBlockStyle}>
        <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={vpVideoSrc}
        >
          <source src={vpVideoSrc} type="video/webm" />
        </video>
        <video
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src={vpVideoSrc}
        >
          <source src={vpVideoSrc} type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-20 flex h-full items-center justify-center">
          <h1
            className="font-anybody text-center font-extrabold uppercase leading-[0.9] text-white text-[40px] sm:text-[64px] md:text-[88px] lg:text-[110px] xl:text-[130px] max-w-[1600px] mx-auto"
            style={{
              textShadow: "0 0 10px rgba(215, 240, 0, 0.5), 0 0 20px rgba(215, 240, 0, 0.3), 0 0 30px rgba(215, 240, 0, 0.2)",
              filter: "drop-shadow(0 0 10px rgba(215, 240, 0, 0.3))",
            }}
          >
            <span className="block">Virtual</span>
            <span className="block">Production</span>
            <span className="block">LED Wall</span>
          </h1>
        </div>
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          <div
            ref={topMask}
            className="absolute left-1/2 -translate-x-1/2 top-[-30vh] w-[220vw] h-[80vh] bg-black rounded-b-[40%]"
          />
          <div
            ref={bottomMask}
            className="absolute left-1/2 -translate-x-1/2 bottom-[-30vh] w-[220vw] h-[80vh] bg-black rounded-t-[40%]"
          />
        </div>
      </div>
    </section>
  );
}
