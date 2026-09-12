"use client";
import { motion } from "framer-motion";
import { Brain, Database, Globe, Layout, Terminal, Wrench } from "lucide-react";
import { chipIn, fadeUp, staggerChips, staggerContainer, viewportOnce } from "../lib/motion";

export default function SkillsSection() {
  const categories = [
    { label: "Frontend", icon: Layout, skills: ["React.js", "Next.js", "Angular", "Tailwind CSS", "Redux", "Zustand", "Zod", "Styled-Components", "Figma"] },
    { label: "Backend", icon: Terminal, skills: ["Node.js", "Express.js", "FastAPI", "Strapi CMS", "REST APIs"] },
    { label: "Languages", icon: Globe, skills: ["JavaScript", "TypeScript", "Python", "SQL", "C++"] },
    { label: "Databases", icon: Database, skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase", "Firebase"] },
    { label: "AI / LLM", icon: Brain, skills: ["AI API Integration", "Prompt Engineering", "LLM Automation Pipelines", "RAG Chatbots"] },
    { label: "DevOps & Cloud", icon: Wrench, skills: ["Docker", "Contabo VPS", "Railway", "Render", "Git / GitHub", "Cloudinary", "CI/CD"] }
  ];

  return (
    <section className="tile tile-parchment">
      <div className="tile-inner">
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow mb-3">Expertise</span>
          <h2 className="display-lg text-[#1d1d1f]">Technical arsenal.</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {categories.map((cat) => (
            <motion.div key={cat.label} variants={fadeUp} className="surface-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#f5f5f7] text-[#1d1d1f]">
                  <cat.icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="caption-strong text-[#1d1d1f]">{cat.label}</h3>
              </div>

              <motion.div
                className="flex flex-wrap gap-2"
                variants={staggerChips}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {cat.skills.map((skill) => (
                  <motion.span key={skill} variants={chipIn} className="chip cursor-default py-1.5 font-mono text-[12px]">
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
