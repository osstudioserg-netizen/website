"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50 
        px-6 py-5 flex justify-between items-center
        bg-black/20 backdrop-blur-md
      "
    >
      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <Image
          src={logo}
          alt="BYMOVIE Logo"
          width={160}
          height={40}
          className="
            object-contain
            h-[28px] md:h-[40px]
            w-auto
          "

          priority
        />
      </Link>

      {/* DESKTOP MENU */}
      <nav className="hidden md:flex items-center gap-10 text-sm font-anybodyCondensed tracking-wider">
        <a href="#weare" className="hover:text-[#DFFF52] transition">
          WE ARE
        </a>
        <a href="#services" className="hover:text-[#DFFF52] transition">
          SERVICES
        </a>
        
        {/* VP Button - слева от центральной кнопки */}
        <Link
          href="/vp"
          className="
            rounded-full
            px-6 py-2 text-xs font-semibold uppercase tracking-[0.18em]
            text-black
            bg-gradient-to-r from-[#D7F000] via-[#F7FF65] to-[#D7F000]
            bg-[length:200%_200%]
            animate-[gradientMove_6s_ease_infinite]
            shadow-[0_0_12px_rgba(215,240,0,0.4)]
            transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_20px_rgba(215,240,0,0.8)]
            active:scale-95
          "
        >
          BY MOVIE VP PAVILION
        </Link>

        <a href="#howwework" className="hover:text-[#DFFF52] transition">
          HOW WE WORK
        </a>
        <a href="#projects" className="hover:text-[#DFFF52] transition">
          PROJECTS
        </a>
        <a href="#contacts" className="hover:text-[#DFFF52] transition">
          CONTACTS
        </a>
      </nav>

      {/* BURGER */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setOpen(true)}
      >
        ≡
      </button>

      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
}
