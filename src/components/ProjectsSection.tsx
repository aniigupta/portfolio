"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, LinkIcon, Terminal, Rocket, Layers, Globe } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "AtEats",
      desc: "Full Stack Food Ordering Platform",
      problem: "Traditional food ordering platforms suffer from high latency during peak hours and poor restaurant inventory syncing.",
      solution: "Built a modular MERN stack app utilizing Next.js for SSR, Zustand for rapid client state, and Stripe webhooks for guaranteed order confirmation. Developed a robust admin panel to handle CRUD operations dynamically.",
      metrics: "Reduced state synchronization issues by 100% and ensured secure checkout flows.",
      tags: ["Next.js", "TypeScript", "MERN Stack", "Redux", "Zustand", "Stripe", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "E-Commerce Platform",
      desc: "Modern Storefront",
      problem: "Heavy product images and disjointed state management caused slow load times and high bounce rates on product pages.",
      solution: "Implemented Cloudinary for aggressive image optimization and delivery. Structured a Redux store for seamless cart and user management.",
      metrics: "Achieved sub-2s load times for heavy media pages with a highly responsive Material UI architecture.",
      tags: ["React.js", "Redux", "Styled-Components", "Material UI", "Cloudinary"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop"
    }
  ];

  return (
    <section id="projects" className="mb-40 pt-20">
      <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-3 flex items-center gap-2">
          <LinkIcon className="w-3 h-3" /> Case Studies
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Featured Engineering</h2>
        <p className="text-muted-foreground max-w-xl">
          Deep dives into complex web applications, focusing on scalable architecture, state management, and real-world impact.
        </p>
      </motion.div>

      <div className="space-y-24 mb-32">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className="grid lg:grid-cols-2 gap-12 items-center group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={`relative h-[400px] md:h-[500px] w-full rounded-[2rem] overflow-hidden glass-card p-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image src={proj.image} alt={`${proj.title} Web Interface`} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex items-center justify-center">
                  <button aria-label={`View the ${proj.title} project case study`} className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white transform scale-90 group-hover:scale-100 transition-all border border-white/20 hover:bg-primary">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className={`flex flex-col ${i % 2 !== 0 ? 'lg:order-1 lg:items-end lg:text-right' : ''}`}>
              <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-2">{proj.desc}</span>
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-white">{proj.title}</h3>
              
              <div className="glass-card p-6 rounded-2xl border border-white/5 mb-6 relative hover:border-primary/20 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-full bg-primary/20 rounded-r-2xl"></div>
                <p className="text-sm text-gray-400 mb-3"><strong className="text-white">Problem:</strong> {proj.problem}</p>
                <p className="text-sm text-gray-400"><strong className="text-white">Solution:</strong> {proj.solution}</p>
              </div>

              <div className="flex items-center gap-2 mb-8 bg-primary/5 px-4 py-3 rounded-xl border border-primary/10">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-xs font-mono text-primary/80 font-semibold">{proj.metrics}</span>
              </div>

              <div className={`flex flex-wrap gap-2 mb-8 ${i % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                {proj.tags.map(tag => (
                  <span key={tag} className="px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-xl text-[10px] font-mono hover:bg-primary/20 hover:text-white transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Building in Public / SaaS Products */}
      <motion.div className="mb-16 pt-16 border-t border-white/5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-3 flex items-center gap-2">
          <Rocket className="w-3 h-3" /> Building in Public
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Upcoming Products</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: "Aura (AI Stylist)", icon: Layers, desc: "An intelligent fashion recommender engine leveraging multi-modal LLMs to analyze user wardrobes and output dynamic outfit pairings.", status: "In Development" },
          { name: "TripCraft", icon: Globe, desc: "A smart trip planner utilizing generative AI to assemble personalized itineraries, integrating mapping data and cost optimizations instantly.", status: "MVP" }
        ].map((prod, i) => (
          <motion.div
            key={i}
            className="glass-card p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-2 group shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-2xl group-hover:bg-primary/20 transition-colors">
                <prod.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                {prod.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{prod.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{prod.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
