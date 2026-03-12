"use client";

import { CSSProperties, memo, MouseEvent, useCallback, useEffect, useRef } from "react";

const stageFeatures = [
  {
    title: "Ultra-High Refresh Rate",
    subtitle: "7800 Hz LED Processing",
    description:
      "Engineered for cinema cameras. Our ultra-high 7800 Hz refresh rate eliminates flicker, scan lines, and banding - ensuring flawless performance at any shutter angle or frame rate.",
  },
  {
    title: "Enterprise-Level GPU Power",
    subtitle: "NVIDIA Quadro RTX A6000 Workstations",
    description:
      "Our real-time pipeline runs on professional-grade Quadro A6000 GPUs, delivering massive rendering power, stability, and precision for complex Unreal Engine environments.",
  },
  {
    title: "Proprietary Camera Tracking",
    subtitle: "Zero-Jitter Tracking System",
    description:
      "We've developed our own tracking technology with exceptional stability and accuracy. No drift. No jitter. Just precise camera-to-world synchronization in real time.",
  },
  {
    title: "Custom 2D Background Control",
    subtitle: "Advanced 2D Environment Management",
    description:
      "Our in-house 2D control system allows instant background adjustments, playback control, and seamless integration with lighting - all directly on set.",
  },
  {
    title: "Motorized Lighting Grid",
    subtitle: "Automated Overhead Rig with Custom Light Panels",
    description:
      "A motorized suspension system with proprietary light panels allows fast repositioning, programmable setups, and precise lighting control - fully synchronized with the LED volume.",
  },
] as const;

type StageFeature = (typeof stageFeatures)[number];

type GlowingEffectProps = {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  className?: string;
  disabled?: boolean;
};

type GlowCardProps = {
  feature: StageFeature;
  className?: string;
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    className,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const angleRef = useRef(0);

    const handleMove = useCallback(
      (e?: PointerEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;

          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

          const angleDiff = ((targetAngle - angleRef.current + 180) % 360) - 180;
          angleRef.current = angleRef.current + angleDiff * 0.25;
          element.style.setProperty("--start", String(angleRef.current));
        });
      },
      [inactiveZone, proximity]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (event: PointerEvent) => handleMove(event);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
          } as CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          className,
          disabled && "!hidden"
        )}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div
            className={cn(
              "absolute -inset-[120%] transition-opacity duration-300",
              blur > 0 && "blur-[var(--blur)]"
            )}
            style={
              {
                opacity: "var(--active)",
                background:
                  variant === "white"
                    ? `conic-gradient(
                        from calc(var(--start) * 1deg),
                        rgba(255,255,255,0) 0deg,
                        rgba(255,255,255,0.95) ${Math.max(10, spread * 0.75)}deg,
                        rgba(255,255,255,0) ${spread + 18}deg
                      )`
                    : `conic-gradient(
                        from calc(var(--start) * 1deg),
                        rgba(221,123,187,0) 0deg,
                        rgba(221,123,187,0.95) 8deg,
                        rgba(215,159,30,0.95) ${Math.max(14, spread * 0.35)}deg,
                        rgba(90,146,44,0.95) ${Math.max(22, spread * 0.65)}deg,
                        rgba(76,120,148,0.95) ${Math.max(30, spread)}deg,
                        rgba(221,123,187,0) ${spread + 18}deg
                      )`,
              } as CSSProperties
            }
          />
          <div className="absolute inset-[6px] rounded-[10px] bg-[#05060b]" />
          <div className="absolute inset-[7px] rounded-[9px] bg-[#05060b]" />
        </div>
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

function GlowCard({ feature, className = "" }: GlowCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#05060b]/90 p-6 ${className}`}
    >
      <GlowingEffect spread={48} proximity={72} inactiveZone={0.18} />
      <div className="pointer-events-none absolute inset-[6px] rounded-[10px] border border-white/10" />
      <div className="relative">
        <h3 className="text-[22px] font-semibold leading-tight text-white">{feature.title}</h3>
        <p className="mt-3 text-[16px] font-medium leading-snug text-[#DBFE02]">{feature.subtitle}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-white/80">{feature.description}</p>
      </div>
    </article>
  );
}

export default function AIProductionSection() {
  return (
    <section className="w-full py-20 px-0 md:px-20 bg-transparent text-white">
      <div className="mx-auto mt-32 w-[90%] md:max-w-[1600px]">
        <div className="grid gap-6 md:grid-cols-2 xl:hidden">
          <GlowCard feature={stageFeatures[0]} />
          <GlowCard feature={stageFeatures[1]} />
          <GlowCard feature={stageFeatures[2]} />
          <GlowCard feature={stageFeatures[3]} />
          <GlowCard feature={stageFeatures[4]} />
        </div>

        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-6 xl:items-stretch">
          <div className="flex flex-col gap-6">
            <GlowCard feature={stageFeatures[0]} />
            <GlowCard feature={stageFeatures[3]} />
          </div>

          <div className="flex items-center">
            <GlowCard feature={stageFeatures[2]} className="w-full" />
          </div>

          <div className="flex flex-col gap-6">
            <GlowCard feature={stageFeatures[1]} />
            <GlowCard feature={stageFeatures[4]} />
          </div>
        </div>
      </div>
    </section>
  );
}
