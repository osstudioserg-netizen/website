"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Loader from "@/components/Loader";
import WeAre from "@/sections/WeAre";
import ServicesSection from "@/sections/ServicesSection";
import HowWeWork from "@/sections/HowWeWork";
import ProjectsSection from "@/sections/ProjectsSection";
import Footer from "@/sections/Footer";
import DotsPattern from "@/components/DotsPattern";

export default function Page() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // При каждом заходе на главную начинаем строго с верха (hero-видео)
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative w-full bg-transparent text-white">
      <Navbar />
      {showLoader && <Loader />}
      <div className="relative z-0">
        <Hero />
      </div>
      <div className="relative z-20">
        <WeAre />
      </div>
      <div className="relative z-0">
        <ServicesSection />
      </div>
      <DotsPattern />
      <div className="relative z-20">
        <HowWeWork />
        {/* Небольшой зазор между How We Work и Projects — как между заголовком и карточками выше */}
        <div className="min-h-[22vh] w-full shrink-0 bg-black" aria-hidden="true" />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  );
}
