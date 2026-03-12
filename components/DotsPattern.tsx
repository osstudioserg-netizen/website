"use client";

/** Паттерн точек поверх hero-видео. Центр невидим (~20% радиуса), по краям 48% видимости. */
export default function DotsPattern() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, rgba(0,0,0,0.48) 100%)`,
        maskImage: `radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, rgba(0,0,0,0.48) 100%)`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
      aria-hidden
    />
  );
}
