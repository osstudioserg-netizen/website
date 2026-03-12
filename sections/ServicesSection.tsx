"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/app/data/servicesData";
import gsap from "gsap";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const mobileProgressRef = useRef(0);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  //
  // MAIN SCROLL HANDLER — НЕ ТРОГАЕМ
  //
  useEffect(() => {
    const handler = () => {
      const sec = sectionRef.current;
      if (!sec) return;

      const vh = window.innerHeight;
      const rect = sec.getBoundingClientRect();
      // Сколько пикселей секция уже «уехала» вверх (0 = верх секции у верха экрана)
      const scrollIntoSection = rect.top <= 0 ? -rect.top : 0;

      let idx = active;

      if (isMobile) {
        const sectionHeight = sec.offsetHeight;
        const total = sectionHeight - vh;
        if (total <= 0) return;
        const normalized = Math.max(0, Math.min(1, scrollIntoSection / total));
        const targetProgress = normalized * services.length;
        const SMOOTHING = 0.058;
        mobileProgressRef.current +=
          (targetProgress - mobileProgressRef.current) * SMOOTHING;
        idx = Math.floor(mobileProgressRef.current);
        if (idx >= services.length - 1) {
          idx = services.length - 1;
          mobileProgressRef.current = services.length - 1;
        }
      } else {
        // Каждый слайд ровно 1 экран: первый слайд целиком, потом следующий (по положению секции на экране)
        idx = Math.floor(scrollIntoSection / vh);
      }

      idx = Math.max(0, Math.min(services.length - 1, idx));

      if (idx !== active) {
        setActive(idx);
      }
    };

    window.addEventListener("scroll", handler);
    handler(); // сразу один раз
    return () => window.removeEventListener("scroll", handler);
  }, [active, isMobile]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-transparent text-white"
      style={{
        height: isMobile
          ? `${services.length * 100}vh`
          : `${services.length * 100}vh`,
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Картинки: порядок как в servicesData, сдвиг на один слайд за раз */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 flex flex-col transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateY(-${active * 100}vh)`,
            }}
          >
            {services.map((s, i) => (
              <div key={i} className="relative h-screen w-full flex-shrink-0">
                <img
                  src={
                    isMobile && i === 1
                      ? s.imgMobile.src
                      : isMobile && (i === 2 || i === 4 || i === 5)
                        ? s.img.src
                        : i === 0
                          ? s.img.src
                          : isMobile
                            ? (s.imgMobile || s.img).src
                            : s.img.src
                  }
                  alt={s.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/45 z-[12]" />
          {/* Mobile: заголовок по центру картинки, описание внизу */}
          {isMobile && (
            <>
              <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
                <h2
                  className="uppercase text-[#DBFE02] text-xl font-bold tracking-wide text-center"
                  style={{
                    textShadow: "0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)",
                  }}
                >
                  {services[active].title}
                </h2>
              </div>
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              {(() => {
                const sub = services[active].subtitle;
                const idx = sub.indexOf("\n");
                const firstLine = idx >= 0 ? sub.slice(0, idx) : sub;
                const rest = idx >= 0 ? sub.slice(idx + 1) : null;
                return (
                  <div className="text-white/95 text-base leading-relaxed">
                    <p className="font-medium text-white">{firstLine}</p>
                    {rest && (
                      <p className="mt-2 whitespace-pre-line text-white/90">
                        {rest}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
            </>
          )}
        </div>

        {/* ===== DESKTOP — НЕ ТРОГАЕМ ===== */}
        {!isMobile && (
          <>
            <div className="absolute bottom-12 left-12 z-20 flex flex-col gap-4">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  onClick={() => {
                    setActive(i);
                    const sec = sectionRef.current;
                    if (sec) {
                      const vh = window.innerHeight;
                      const sectionTop = sec.getBoundingClientRect().top + window.scrollY;
                      window.scrollTo({ top: sectionTop + vh * i, behavior: "smooth" });
                    }
                  }}
                  className={`
                    uppercase font-bold cursor-pointer transition-all
                    ${i === active 
                      ? "text-[#DBFE02] scale-105 text-5xl" 
                      : "text-white/30 text-4xl"
                    }
                  `}
                  style={i === active ? {
                    textShadow: "0 0 10px rgba(219, 254, 2, 0.5), 0 0 20px rgba(219, 254, 2, 0.3), 0 0 30px rgba(219, 254, 2, 0.2)",
                    filter: "drop-shadow(0 0 10px rgba(219, 254, 2, 0.3))",
                  } : {}}
                >
                  {s.title}
                </div>
              ))}
            </div>

            <div
              ref={subtitleRef}
              className="absolute right-16 top-[72%] -translate-y-0 w-[500px] text-white/80 z-20"
            >
              {(() => {
                const sub = services[active].subtitle;
                const idx = sub.indexOf("\n");
                const firstLine = idx >= 0 ? sub.slice(0, idx) : sub;
                const rest = idx >= 0 ? sub.slice(idx + 1) : null;
                return (
                  <>
                    <div className="text-2xl font-normal">{firstLine}</div>
                    {rest && (
                      <div className="text-xl mt-2 whitespace-pre-line text-white/80">
                        {rest}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </>
        )}

        {/* Мобильная навигация по слайдам: свайп/скролл меняет active */}
      </div>
    </section>
  );
}
