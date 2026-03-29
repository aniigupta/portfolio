"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function InteractiveHero() {
  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const fullText = "Hi, I'm Aniket... I engineer scalable web apps and AI-integrated systems. I don't just build websites; I build intelligent digital products.";

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
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center mb-32 pt-20 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Available for Hire & Freelance</span>
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
        className="glass-card mb-12 max-w-2xl w-full mx-auto p-6 rounded-2xl border border-white/10 text-left font-mono relative overflow-hidden group shadow-[0_10px_40px_rgba(139,92,246,0.1)] hover:border-primary/30 transition-colors"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="text-[10px] text-muted-foreground ml-2 font-sans font-medium">aniket@ai-portfolio: ~</span>
        </div>
        <div className="mt-8 text-sm md:text-base text-gray-300 min-h-[60px] flex gap-2 relative">
          <span className="text-primary font-bold">❯</span>
          <div className="leading-relaxed">
            {/* SSR Sizing Fallback: Forces browser to calculate layout before JS hydration to fix LCP */}
            <span className="opacity-0 pointer-events-none absolute inset-0" aria-hidden="true">
              {fullText}
            </span>
            <p className="relative">
              {terminalText}
              {isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-primary ml-1 align-middle" />}
              {!isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-primary/50 ml-1 align-middle" />}
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
        <a href="#projects" className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 group hover:scale-105">
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          View Case Studies
        </a>
        <a href="/Aniket_Gupta_FSD_.pdf" download="Aniket_Gupta_FSD_.pdf" className="glass-card px-8 py-3.5 rounded-xl font-bold hover:bg-white/5 transition-all flex items-center gap-2 border border-white/10 hover:scale-105">
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
    </section>
  );
}
