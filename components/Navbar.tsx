"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= DESKTOP NAV (НЕ ТРОГАЕМ) ================= */}
      <nav className="fixed -top-5 left-0 w-full z-[999] hidden md:flex items-center justify-between px-16 py-8 text-white text-base tracking-[0.18em] bg-black/95 backdrop-blur-sm">
        <div className="flex items-center" style={{ gap: 'clamp(2rem, 6vw, 15rem)' }}>
          <Link href="/#weare" className="uppercase hover:text-[#D7F000] transition">
            We Are
          </Link>
          <Link href="/#services" className="uppercase hover:text-[#D7F000] transition">
            Services
          </Link>
          
          {/* VP Button - между Services и логотипом */}
          <Link
            href="/vp"
            className="uppercase text-white transition text-lg font-semibold tracking-[0.18em] hover:text-[#D7F000] flex flex-col items-center leading-tight"
            style={{
              textShadow: "0 0 10px rgba(215, 240, 0, 0.5), 0 0 20px rgba(215, 240, 0, 0.3), 0 0 30px rgba(215, 240, 0, 0.2)",
              filter: "drop-shadow(0 0 10px rgba(215, 240, 0, 0.3))",
            }}
          >
            <span>BY MOVIE</span>
            <span>VP PAVILION</span>
          </Link>
        </div>

        <Link href="/" className="flex items-center justify-center">
          <Image
            src={logo}
            alt="BYMOVIE Logo"
            width={160}
            height={40}
            className="object-contain w-[160px] h-auto"
            priority
          />
        </Link>

        <div className="flex items-center" style={{ gap: 'clamp(2rem, 6vw, 15rem)' }}>
          {/* AI Production Button - справа от логотипа */}
          <Link
            href="/ai"
            className="uppercase text-white transition text-lg font-semibold tracking-[0.18em] hover:text-[#D7F000] flex flex-col items-center leading-tight"
            style={{
              textShadow: "0 0 10px rgba(215, 240, 0, 0.5), 0 0 20px rgba(215, 240, 0, 0.3), 0 0 30px rgba(215, 240, 0, 0.2)",
              filter: "drop-shadow(0 0 10px rgba(215, 240, 0, 0.3))",
            }}
          >
            <span>BY MOVIE</span>
            <span>AI PRODUCTION</span>
          </Link>
          
          <Link href="/#projects" className="uppercase hover:text-[#D7F000] transition">
            Projects
          </Link>
          <Link href="/#contacts" className="uppercase hover:text-[#D7F000] transition">
            Contacts
          </Link>
        </div>
      </nav>

      {/* ================= MOBILE TOP BAR (ЖЁСТКО ФИКСИМ) ================= */}
      <div className="fixed top-0 left-0 w-full z-[999] flex md:hidden items-center justify-between px-6 py-3 text-white bg-black/95 backdrop-blur-sm">
        {/* ❗ Обычный img — 100% контроль размера */}
        <Link href="/" className="flex items-center">
          <img
            src={logo.src}
            alt="BYMOVIE Logo"
            className="h-[40px] w-auto object-contain"
          />
        </Link>

        <button onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      {open && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white text-3xl gap-10 uppercase tracking-[0.2em]">
          <button
            className="absolute top-5 right-5"
            onClick={() => setOpen(false)}
          >
            <FiX size={28} />
          </button>

          {/* логотип в меню — тоже обычный img */}
          <Link href="/" onClick={() => setOpen(false)} className="mb-8">
            <img
              src={logo.src}
              alt="BYMOVIE Logo"
              className="h-[24px] w-auto object-contain"
            />
          </Link>

          <Link href="/#weare" onClick={() => setOpen(false)}>We Are</Link>
          <Link href="/#services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/vp" onClick={() => setOpen(false)}>VP Pavilion</Link>
          <Link href="/ai" onClick={() => setOpen(false)}>AI Production</Link>
          <Link href="/#projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link href="/#contacts" onClick={() => setOpen(false)}>Contacts</Link>
        </div>
      )}
    </>
  );
}
