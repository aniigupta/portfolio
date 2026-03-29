"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Github, Mail, Code2, Terminal, Cpu, Zap, ShieldCheck, Download } from "lucide-react";

export default function AboutSection() {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Anarish Innovations Pvt. Ltd.",
      period: "Feb 2026 - Present",
      tags: ["Next.js", "Angular", "React", "Tailwind CSS", "PostgreSQL", "Strapi CMS", "Docker", "Railway"],
      points: [
        "Built and shipped full-stack features using Next.js, Angular, React and Tailwind CSS with pixel-perfect, Figma-to-code implementation.",
        "Designed and managed PostgreSQL schemas and integrated Strapi CMS for dynamic content workflows, reducing content update time significantly.",
        "Containerized applications with Docker and deployed to Railway, streamlining CI/CD and reducing deployment friction.",
        "Configured Cloudinary for media management across multiple projects."
      ]
    },
    {
      title: "Full Stack Dev (React.js + FastAPI)",
      company: "Naarivo Creations",
      period: "Oct 2025 - Jan 2026",
      tags: ["React.js", "FastAPI", "Supabase", "Render", "LLMs"],
      points: [
        "Independently built a production-grade FOIA automation system covering all U.S. states/counties for large-scale article monitoring.",
        "Integrated GPT-based LLM APIs for automated structured insight extraction from unstructured data, achieving ~90% extraction accuracy.",
        "Used Supabase as the primary database and auth provider; deployed the full application on Render with zero-downtime workflows.",
        "Developed scalable Python pipelines for article fetching, parsing, and RESTful API design with FastAPI."
      ]
    }
  ];

  return (
    <section id="about" className="mb-40 pt-20">
      <motion.div className="mb-16" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-3">Behind the Code</span>
        <h2 className="text-4xl md:text-5xl font-black">How I Think & Build</h2>
      </motion.div>

      {/* HOW I THINK METRICS */}
      <div className="grid md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: Cpu, title: "Architecture First", desc: "I prioritize scalable schemas and modular Next.js/React code to ensure rapid feature delivery without technical debt." },
          { icon: Zap, title: "Performance Obsession", desc: "Obsessed with edge-caching, optimized asset delivery via Cloudinary, and minimizing database roundtrips." },
          { icon: ShieldCheck, title: "AI Integration Workflows", desc: "Seamlessly hooking up LLM APIs to unstructured data pipelines to extract 90%+ accurate insights dynamically." }
        ].map((item, i) => (
          <motion.div 
            key={i} 
            className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-2 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div className="mb-16" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="text-4xl md:text-5xl font-black">Experience & Milestones</h2>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-7 space-y-12 relative">
          <div className="timeline-line hidden md:block"></div>

          {experiences.map((job, i) => (
            <motion.div
              key={i}
              className="relative pl-12 md:pl-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 bg-[#030014] border-2 border-primary/40 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
              </div>
              <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/20 transition-colors"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-muted-foreground font-medium">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-mono font-bold text-primary whitespace-nowrap">
                    {job.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-6">
                  {job.points.map((p, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="text-primary mt-1">✔</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#030014]/50 border border-white/10 rounded-lg text-[10px] font-mono hover:text-primary transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-5 space-y-8">
          <motion.div
            className="glass-card p-8 rounded-[2rem] flex flex-col items-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.2),transparent_70%)] opacity-80 mix-blend-screen pointer-events-none"></div>
            <div className="relative w-32 h-32 rounded-full border-4 border-white/5 overflow-hidden z-10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(139,92,246,0.15)] group hover:border-primary/30 transition-all">
              <Image src="/profile.png" alt="Aniket Gupta - Software Engineer and AI Specialist Official Photo" fill className="object-cover object-top hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-black mb-1">Aniket Gupta</h3>
            <p className="text-primary font-bold text-sm tracking-widest uppercase mb-6">Full Stack Developer</p>
            <div className="flex gap-4">
              <a href="mailto:aniiigupta23@gmail.com" aria-label="Send an email to Aniket" className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all hover:scale-110 group">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a href="https://github.com/aniigupta" target="_blank" rel="noreferrer" aria-label="View Aniket's GitHub profile" className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/50 hover:bg-primary/10 transition-all hover:scale-110 group">
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </motion.div>

          <motion.div className="glass-card p-8 rounded-3xl" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <GraduationCap className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight text-white">B.Tech in IIoT</h3>
                <p className="text-xs text-muted-foreground">USAR, Delhi | 2021 - 2025</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-muted-foreground font-medium text-sm tracking-widest">CGPA</span>
                <span className="text-2xl font-black text-white">7.87</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all shadow-inner">
                <div className="flex items-center gap-3">
                  <Terminal className="text-primary/70 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">LeetCode</span>
                </div>
                <span className="text-lg font-bold text-white">200+</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all shadow-inner">
                <div className="flex items-center gap-3">
                  <Code2 className="text-primary/70 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">HackerRank</span>
                </div>
                <div className="flex gap-1 text-primary">
                  {"★★★★★".split("").map((s, i) => <span key={i} className="text-[10px] truncate">{s}</span>)}
                </div>
              </div>
              <a href="/Aniket_Gupta_FSD_.pdf" download="Aniket_Gupta_FSD_.pdf" className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-2xl font-bold transition-all mt-4 flex items-center justify-center gap-2 group hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Download Resume
                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
