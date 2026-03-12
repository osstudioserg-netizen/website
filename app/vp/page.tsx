import Navbar from "@/components/Navbar";
import HeroVP from "./HeroVP";
import LedWallSection from "./LedWallSection";
import InstagramWidget from "./InstagramWidget";
import Footer from "@/sections/Footer";
import DotsPattern from "@/components/DotsPattern";

export default function VPPage() {
  return (
    <main className="relative w-full bg-transparent text-white">
      <div className="relative z-0">
        <HeroVP />
      </div>
      <DotsPattern />
      <div className="relative z-20">
        <Navbar />
        <LedWallSection />
        <div className="mt-24">
          <InstagramWidget />
        </div>
        <Footer />
      </div>
    </main>
  );
}