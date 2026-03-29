"use client";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2, Code, Gauge, Image as ImageIcon, LineChart, Server, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const LighthouseRing = () => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#00e676"
          strokeWidth="8"
          strokeDasharray="282.74"
          initial={{ strokeDashoffset: 282.74 }}
          whileInView={{ strokeDashoffset: 5.65 }} // 98% of 282.74 is ~277.08 taken -> Leaves 5.65
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          strokeLinecap="round"
          className="drop-shadow-[0_0_15px_rgba(0,230,118,0.8)]"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-[#00e676] tracking-tighter shadow-green-500/50 drop-shadow-md">
          <AnimatedCounter value={98} duration={2.5} />
        </span>
        <span className="text-[10px] font-bold tracking-widest text-[#00e676] uppercase">Performance</span>
      </div>
    </div>
  );
};

export default function PerformanceSection() {
  const vectors = [
    { icon: Gauge, title: "Core Web Vitals", desc: "Optimizing LCP, CLS, and INP metrics to sub-second thresholds for flawless Lighthouse scores." },
    { icon: ImageIcon, title: "Image Optimization", desc: "Aggressive next/image sizing, priority loading, and format conversion (WebP/AVIF) via Cloudinary." },
    { icon: Code, title: "Dynamic Code Splitting", desc: "Drastically reducing First Load JS by dynamically importing off-screen components and libraries." },
    { icon: LineChart, title: "Technical SEO", desc: "Injecting rigid OG metadata tags, dynamic sitemaps, and strict JSON-LD structured schema." },
    { icon: Server, title: "Edge Caching & API", desc: "Implementing Redis caching layers, route handlers, and Incremental Static Regeneration (ISR)." }
  ];

  return (
    <section id="performance" className="mb-40 pt-20">
      <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <Zap className="w-4 h-4 fill-primary" /> Speed. SEO. Scale.
        </span>
        <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
          I Turn Slow Websites<br/>Into <span className="bg-clip-text text-transparent bg-linear-to-r from-green-400 to-[#00e676]">Lightning-Fast</span> Experiences.
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          I don&apos;t just write code; I architect systems optimized for real-world performance, plummeting bounce rates and skyrocketing search rankings.
        </p>
      </motion.div>

      {/* THE WOW FACTOR - LIGHTHOUSE STATS + METRICS */}
      <div className="grid lg:grid-cols-12 gap-8 mb-24">
        <motion.div className="lg:col-span-5 glass-card p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center relative overflow-hidden" 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="absolute inset-0 bg-[#00e676]/5 blur-[100px] pointer-events-none"></div>
          <LighthouseRing />
          <p className="text-muted-foreground mt-8 text-sm max-w-62.5">Consistently engineering Vercel/Next.js deployments to hit peak Core Web Vitals.</p>
        </motion.div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
          <motion.div className="glass-card p-8 rounded-3xl border border-white/5 border-t-green-500/30 flex flex-col justify-center" 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <span className="text-5xl font-black text-white mb-2"><AnimatedCounter value={40} suffix="%" />⬇</span>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Smaller JS Payloads</span>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">Achieved via aggressive dynamic importing and strict bundle analysis.</p>
          </motion.div>
          <motion.div className="glass-card p-8 rounded-3xl border border-white/5 border-t-primary/30 flex flex-col justify-center" 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <span className="text-5xl font-black text-white mb-2 flex items-baseline gap-1">1.2<span className="text-2xl">s</span></span>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Average LCP Time</span>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">Prioritizing critical above-the-fold assets to paint near-instantly on mobile.</p>
          </motion.div>
        </div>
      </div>

      {/* BEFORE VS AFTER COMP CARD */}
      <motion.div className="mb-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h3 className="text-3xl font-black text-center mb-10">The Architectural Difference</h3>
        <div className="grid md:grid-cols-2 gap-0 rounded-4xl overflow-hidden border border-white/10 shadow-2xl relative">
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-white/10 items-center justify-center z-10 hidden md:flex">
            <span className="text-xs font-black text-muted-foreground">VS</span>
          </div>

          <div className="bg-[#0f0a0a] p-10 md:p-14 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
            <h4 className="flex items-center gap-3 text-2xl font-black text-white mb-8">
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 text-sm">✗</span>
              Unoptimized
            </h4>
            <ul className="space-y-6">
              {[
                "Massive 4MB initial synchronous JS bundle",
                "Layout shifting (CLS) from unconstrained images",
                "Empty index metadata (horrible SEO SERP presence)",
                "Main thread blocked by heavy third-party tracking"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-gray-400">
                  <AlertTriangle className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#05110a] p-10 md:p-14 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00e676]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00e676]/5 blur-[80px] rounded-full pointer-events-none"></div>
            <h4 className="flex items-center gap-3 text-2xl font-black text-white mb-8">
              <span className="w-8 h-8 rounded-full bg-[#00e676]/20 flex items-center justify-center text-[#00e676] text-sm shadow-[0_0_15px_rgba(0,230,118,0.5)]">✔</span>
              Engineered
            </h4>
            <ul className="space-y-6">
              {[
                "Strict sub-100kb initial lazy-loaded Javascript",
                "Pre-calculated image dimensions with next/image",
                "Rigid JSON-LD Schema & OpenGraph meta-tags",
                "Edge-cached route handlers & Off-thread workers"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#00e676] shrink-0 mt-0.5 shadow-sm" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* LIVE PORTFOLIO METRICS STUDY */}
      <motion.div className="mb-24 flex justify-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="glass-card p-8 md:p-12 rounded-4xl border border-white/5 w-full max-w-4xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e676]/5 blur-[80px] rounded-full pointer-events-none z-0"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-2 text-white">Live Case Study: This Portfolio</h3>
            <p className="text-muted-foreground text-sm mb-8">Refining Next.js Architecture for optimal Google Lighthouse metrics.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-gray-500">
                    <th className="py-4 px-6 font-bold w-1/2">Metric (Google Web Vitals)</th>
                    <th className="py-4 px-6 font-bold text-center">Standard Build</th>
                    <th className="py-4 px-6 font-bold text-[#00e676] text-center">Engineered Result</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300">Interaction to Next Paint (INP)</td>
                    <td className="py-4 px-6 text-center text-red-500/80">280ms ✗</td>
                    <td className="py-4 px-6 text-center text-[#00e676] bg-[#00e676]/5 font-bold">80ms ✔</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300">Largest Contentful Paint (LCP)</td>
                    <td className="py-4 px-6 text-center text-red-500/80">3.2s ✗</td>
                    <td className="py-4 px-6 text-center text-[#00e676] bg-[#00e676]/5 font-bold">1.2s ✔</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-gray-300">Cumulative Layout Shift (CLS)</td>
                    <td className="py-4 px-6 text-center text-red-500/80">0.18 ✗</td>
                    <td className="py-4 px-6 text-center text-[#00e676] bg-[#00e676]/5 font-bold">0.01 ✔</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      {/* VECTORS OF OPTIMIZATION */}
      <div className="mb-24">
        <h3 className="text-3xl font-black text-center mb-10">What I Optimize</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {vectors.map((vec, i) => (
            <motion.div key={i} className="glass-card flex-1 min-w-70 p-6 rounded-2xl border border-white/5 hover:border-[#00e676]/40 transition-colors group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <vec.icon className="w-6 h-6 text-[#00e676] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold mb-2">{vec.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{vec.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <motion.div className="glass-card p-12 text-center rounded-[3rem] border border-primary/20 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-[#00e676]/10 opacity-50 blur-xl"></div>
        <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Is your web app bleeding users?<br />Let&apos;s fix that natively.</h3>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto relative z-10">If your initial load exceeds 3 seconds, you&apos;re losing up to 50% of your traffic. Let&apos;s rewrite your bottlenecks.</p>
        <a href="#contact" className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold text-lg transition-transform active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] relative z-10 group">
          Get a Full Performance Audit
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}
