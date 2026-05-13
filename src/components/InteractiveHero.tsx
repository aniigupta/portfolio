"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Download, Github, Linkedin, Mail } from "lucide-react";
import SplineScene from "./SplineScene";

export default function InteractiveHero() {
  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "Building high-performance web apps and AI-integrated systems. I don't just write code; I craft intelligent digital products that bridge the gap between design and scalable engineering.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 40);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center mb-32 pt-20 relative overflow-visible">
      {/* Spline 3D Scene Container - Now Full Screen Background */}
      <div className="hidden lg:block absolute inset-0 z-0 opacity-80 pointer-events-none">
        <SplineScene />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Available for Hire</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Building <span className="purple-gradient-text">Intelligent</span><br />Products
        </motion.h1>

        <motion.div
          className="bg-[#0d0d1a]/80 backdrop-blur-2xl mb-12 max-w-2xl w-full mx-auto p-6 rounded-2xl border border-white/20 text-left font-mono relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.1)] hover:border-primary/50 transition-all duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-xs text-white/70 ml-2 font-sans font-semibold tracking-wide">aniket@ai-portfolio: ~</span>
          </div>
          <div className="mt-10 text-sm md:text-lg text-white font-medium min-h-[80px] flex gap-3 relative">
            <span className="text-primary font-bold animate-pulse">&gt;</span>
            <div className="leading-relaxed">
              {/* SSR Sizing fallback keeps layout stable before hydration. */}
              <span className="opacity-0 pointer-events-none absolute inset-0" aria-hidden="true">
                {fullText}
              </span>
              <p className="relative drop-shadow-sm">
                {terminalText}
                {isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-5 bg-primary ml-1 align-middle shadow-[0_0_10px_rgba(139,92,246,0.8)]" />}
                {!isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-5 bg-primary/60 ml-1 align-middle shadow-[0_0_5px_rgba(139,92,246,0.4)]" />}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 mb-20 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a href="#projects" className="bg-violet-700 hover:bg-violet-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-violet-900/30 flex items-center gap-2 group hover:scale-105">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            View Case Studies
          </a>
          <a href="/Resume_Aniket_2025.pdf" download="Resume_Aniket_2025.pdf" className="glass-card px-8 py-3.5 rounded-xl font-bold hover:bg-white/5 transition-all flex items-center gap-2 border border-white/10 hover:scale-105">
            <Download className="w-5 h-5" />
            Resume
          </a>
          <a href="#contact" className="hidden sm:flex nav-link items-center gap-1 mt-0 ml-2 hover:text-primary transition-colors">
            Let&apos;s Build <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          className="flex items-center gap-10 bg-white/5 px-8 py-4 rounded-3xl border border-white/5 backdrop-blur-sm z-10 hover:border-primary/20 transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <a href="https://github.com/aniigupta" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="text-muted-foreground hover:text-white transition-all transform hover:scale-125 hover:-translate-y-1"><Github className="w-6 h-6" /></a>
          <a href="https://www.linkedin.com/in/aniket-gupta-564758226/" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="text-muted-foreground hover:text-white transition-all transform hover:scale-125 hover:-translate-y-1"><Linkedin className="w-6 h-6" /></a>
          <a href="mailto:aniiigupta23@gmail.com" aria-label="Email Me" className="text-muted-foreground hover:text-white transition-all transform hover:scale-125 hover:-translate-y-1"><Mail className="w-6 h-6" /></a>
        </motion.div>
      </div>
    </section>
  );
}
