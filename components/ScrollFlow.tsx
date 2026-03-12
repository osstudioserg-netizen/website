"use client";

import { useEffect, useRef } from "react";

export default function ScrollFlow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const current = useRef(0);
  const total = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("section[data-screen]")
    );

    total.current = sections.length;

    // глобальный массив флагов «секции готовы»
    interface WindowWithScreenReady extends Window {
      __SCREEN_READY__?: boolean[];
    }
    (window as WindowWithScreenReady).__SCREEN_READY__ = new Array(total.current).fill(false);

    const scrollToScreen = (index: number) => {
      if (index < 0 || index >= total.current) return;

      isAnimating.current = true;
      sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        isAnimating.current = false;
      }, 800);
    };

    let touchStart = 0;

    const wheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating.current) return;

      interface WindowWithScreenReady extends Window {
        __SCREEN_READY__?: boolean[];
      }
      const ready = (window as WindowWithScreenReady).__SCREEN_READY__;
      if (!ready) return;

      if (e.deltaY > 0) {
        // вниз
        if (ready[current.current]) {
          current.current++;
          scrollToScreen(current.current);
        }
      } else {
        // вверх
        if (current.current > 0) {
          current.current--;
          scrollToScreen(current.current);
        }
      }
    };

    const touchstart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const touchend = (e: TouchEvent) => {
      const diff = touchStart - e.changedTouches[0].clientY;

      if (Math.abs(diff) < 40) return;
      if (isAnimating.current) return;

      interface WindowWithScreenReady extends Window {
        __SCREEN_READY__?: boolean[];
      }
      const ready = (window as WindowWithScreenReady).__SCREEN_READY__;
      if (!ready) return;

      if (diff > 0) {
        // свайп вверх
        if (ready[current.current]) {
          current.current++;
          scrollToScreen(current.current);
        }
      } else {
        // свайп вниз
        if (current.current > 0) {
          current.current--;
          scrollToScreen(current.current);
        }
      }
    };

    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("touchstart", touchstart, { passive: false });
    window.addEventListener("touchend", touchend, { passive: false });

    return () => {
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchstart);
      window.removeEventListener("touchend", touchend);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
