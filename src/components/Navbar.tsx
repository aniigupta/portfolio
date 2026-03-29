"use client";
import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 border-b ${
      scrolled ? "bg-[#030014]/80 backdrop-blur-lg border-white/10 shadow-lg" : "bg-transparent border-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} role="button" tabIndex={0} aria-label="Scroll to top">
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.8)] transition-all duration-300 group-hover:scale-110">
            <Image src="/profile.png" alt="Aniket Gupta" fill className="object-cover object-top" priority sizes="40px" />
          </div>
          <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-purple-300 transition-colors">Aniket Gupta</span>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2.5 rounded-full border border-white/5 backdrop-blur-md shadow-inner">
          <Link href="#projects" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#about" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/Aniket_Gupta_FSD_.pdf" target="_blank" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
            Resume
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="#contact" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary/50 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transform hover:scale-105 active:scale-95">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
