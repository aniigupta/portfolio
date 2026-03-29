"use client";
import { motion } from "framer-motion";
import { Brain, Database, Globe, Layout, Terminal, Wrench } from "lucide-react";

export default function SkillsSection() {
  const categories = [
    { label: "Frontend", icon: Layout, skills: ["React.js", "Next.js", "Angular", "Tailwind", "Redux", "Zustand"] },
    { label: "Backend", icon: Terminal, skills: ["Node.js", "Express", "FastAPI", "Strapi CMS"] },
    { label: "Languages", icon: Globe, skills: ["JavaScript (ES6+)", "TypeScript", "Python", "C++"] },
    { label: "Databases", icon: Database, skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Firebase"] },
    { label: "AI / ML", icon: Brain, skills: ["OpenAI API", "Prompt Engineering", "LLM Pipelines"] },
    { label: "Tools & DevOps", icon: Wrench, skills: ["Docker", "Railway", "Render", "Cloudinary", "CI/CD"] }
  ];

  return (
    <div className="pt-20 pt-10">
      <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-3 flex items-center gap-2">
          <Brain className="w-3 h-3" /> Expertise
        </span>
        <h2 className="text-4xl md:text-5xl font-black">Technical Arsenal</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Animated background glow for the whole section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="glass-card p-8 rounded-3xl border border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/20 transition-colors duration-500"></div>
            
            <div className="bg-primary/10 w-fit p-3 rounded-2xl mb-8 group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.1)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <cat.icon className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold mb-6">{cat.label}</h3>
            <div className="flex flex-wrap gap-2 relative z-10">
              {cat.skills.map((s, idx) => (
                <motion.span 
                  key={s} 
                  className="px-3.5 py-1.5 bg-[#030014]/50 border border-white/10 rounded-xl text-xs font-mono font-medium hover:border-primary/50 hover:text-white transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                  viewport={{ once: true }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
