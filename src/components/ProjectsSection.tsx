"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, LinkIcon, Terminal, Rocket, Layers, Globe, Zap } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "IMS SaaS Platform",
      desc: "Inventory Management System",
      problem: "Enterprises struggled with fragmented inventory tracking, lack of role-based access, and disconnected billing workflows.",
      solution: "Developed a comprehensive SaaS platform with real-time tracking, RBAC, and integrated analytics using Next.js and PostgreSQL. Optimized for high-concurrency order management.",
      metrics: "Live at ims-azure-psi.vercel.app - Managing full lifecycle order workflows.",
      tags: ["Next.js", "PostgreSQL", "Tailwind CSS", "RBAC", "Node.js"],
      image: "/images/ims_saas.png",
      link: "https://ims-azure-psi.vercel.app/"
    },
    {
      title: "Servitium CRM",
      desc: "Enterprise Service CRM",
      problem: "Service providers needed a pixel-perfect, responsive interface to manage complex customer lifecycles and field operations.",
      solution: "Engineered a high-performance CRM using Angular and Node.js, delivering a streamlined UI/UX tailored for operational efficiency and data consistency.",
      metrics: "Production-ready at servitiumcrm.com - Pixel-perfect Figma implementation.",
      tags: ["Angular", "Node.js", "Tailwind CSS", "Enterprise Architecture"],
      image: "/images/servitium_crm.png",
      link: "https://servitiumcrm.com/"
    },
    {
      title: "Ops Suite Global",
      desc: "Operational Excellence Tool",
      problem: "Legacy operational suites lacked modern scalability and real-time synchronization across hybrid teams.",
      solution: "Architected a scalable Ops Suite with Next.js and Docker, focusing on modular micro-frontends and robust deployment reliability on Railway.",
      metrics: "Ongoing deployment at opssuite.global - ~90% feature completion.",
      tags: ["Next.js", "Docker", "Railway", "Scalable Systems"],
      image: "/images/opssuite_global.png",
      link: "https://opssuite.global/"
    }
  ];

  return (
    <section id="projects" className="mb-40 pt-20">
      <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-3 flex items-center gap-2">
          <LinkIcon className="w-3 h-3" /> Case Studies
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Featured Engineering</h2>
        <p className="text-gray-300 max-w-xl">
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
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label={`View the live ${proj.title} project`} 
                    className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white transform scale-90 group-hover:scale-100 transition-all border border-white/20 hover:bg-primary z-20"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className={`flex flex-col ${i % 2 !== 0 ? 'lg:order-1 lg:items-end lg:text-right' : ''}`}>
              <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-2">{proj.desc}</span>
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-white">{proj.title}</h3>
              
              <div className="glass-card p-6 rounded-2xl border border-white/5 mb-6 relative hover:border-primary/20 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-full bg-primary/20 rounded-r-2xl"></div>
                <p className="text-sm text-gray-300 mb-3"><strong className="text-white">Problem:</strong> {proj.problem}</p>
                <p className="text-sm text-gray-300"><strong className="text-white">Solution:</strong> {proj.solution}</p>
              </div>

              <div className="flex items-center gap-2 mb-8 bg-primary/5 px-4 py-3 rounded-xl border border-primary/10">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-violet-200 font-semibold">{proj.metrics}</span>
              </div>

              <div className={`flex flex-wrap gap-2 mb-8 ${i % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                {proj.tags.map(tag => (
                  <span key={tag} className="px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-xl text-xs font-mono hover:bg-primary/20 hover:text-white transition-colors cursor-default">
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
        <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-3 flex items-center gap-2">
          <Rocket className="w-3 h-3" /> Building in Public
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Upcoming Products</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: "AI UI/UX Auditor", icon: Zap, desc: "A sophisticated analysis tool currently being built for Anarish.com that allows users to audit their website UI/UX by simply pasting a URL.", status: "Building" },
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
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono uppercase tracking-widest text-primary font-bold">
                {prod.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{prod.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{prod.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
