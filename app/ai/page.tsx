import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import DotsPattern from "@/components/DotsPattern";
import HeroAI from "./HeroAI";
import AICapabilitiesSection from "./AICapabilitiesSection";

export const metadata: Metadata = {
  title: "AI",
};

export default function AIPage() {
  return (
    <main className="relative w-full bg-transparent text-white">
      <div className="relative z-0">
        <HeroAI />
      </div>
      <DotsPattern />
      <div className="relative z-20">
        <Navbar />
        <AICapabilitiesSection />
        <Footer />
      </div>
    </main>
  );
}
