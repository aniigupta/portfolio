"use client";
import { motion } from "framer-motion";
import { Check, Globe, Zap } from "lucide-react";
import { fadeUp, springSnappy, staggerContainer, viewportOnce } from "../lib/motion";

export default function ProjectsSection() {
  // Products built end to end and owned outright. Client work shipped at
  // Anarish Innovations lives in the experience timeline instead.
  const builds: {
    name: string;
    subtitle: string;
    status: string;
    desc: string;
    highlights: string[];
    tags: string[];
    link?: string;
  }[] = [
    {
      name: "AuraHRMS",
      subtitle: "Human Resource Management System",
      status: "Beta",
      desc: "A multi-module HRMS platform streamlining employee management, attendance, leave, and organizational workflows through a centralized dashboard - in beta testing, with an active pilot conversation underway for real-world deployment.",
      highlights: [
        "Role-based access control with secure authentication across 5+ distinct permission roles.",
        "40+ responsive, reusable React/Next.js components backed by scalable Node.js REST APIs.",
        "PostgreSQL schemas for employees, departments, attendance and leave - 30% faster query response.",
        "RAG-based HR chatbot answering policy questions in natural language, with an admin document uploader that expands its knowledge base."
      ],
      tags: ["Next.js", "React.js", "Node.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "REST APIs", "RBAC"],
      link: "https://aura-hr-three.vercel.app/"
    },
    {
      name: "AtEats",
      subtitle: "Full Stack Food Ordering Platform",
      status: "Live",
      desc: "A full-stack food ordering app with JWT auth, email verification, and role-based admin/user access, wired to Stripe payments with webhook confirmation.",
      highlights: [
        "200+ test transactions processed at 100% confirmation reliability.",
        "Admin panel with full CRUD for restaurants, menus and orders.",
        "Zustand for global state and Zod for end-to-end schema validation across 30+ API endpoints.",
        "Mobile-first Tailwind UI on a reusable component architecture, scoring 90+ on Lighthouse."
      ],
      tags: ["MERN Stack", "TypeScript", "Next.js", "Redux", "Zustand", "Zod", "Stripe", "JWT"]
    }
  ];

  return (
    <section id="projects">
      <div className="tile tile-light">
        <div className="tile-inner">
          <motion.div
            className="mx-auto mb-12 max-w-2xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow mb-3">Selected work</span>
            <h2 className="display-lg mb-4 text-[#1d1d1f]">Products I built end to end.</h2>
            <p className="lead text-[#333333]">
              Full platforms taken from schema design to production - architecture, APIs, interface and deployment.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {builds.map((build) => (
              <motion.div key={build.name} variants={fadeUp} className="surface-card flex flex-col p-8">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="tagline text-[#1d1d1f]">{build.name}</h3>
                    <p className="caption mt-1 text-[#7a7a7a]">{build.subtitle}</p>
                  </div>
                  <span className="chip shrink-0 cursor-default py-1.5 text-[12px]">{build.status}</span>
                </div>

                <p className="caption mb-6 text-[#333333]">{build.desc}</p>

                <ul className="mb-7 space-y-3">
                  {build.highlights.map((point) => (
                    <li key={point} className="caption flex gap-3 text-[#333333]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0066cc]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2">
                  {build.tags.map((tag) => (
                    <span key={tag} className="chip cursor-default py-1.5 text-[12px]">
                      {tag}
                    </span>
                  ))}
                </div>

                {build.link && (
                  <motion.a
                    href={build.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View the live ${build.name} demo`}
                    className="btn-primary mt-7 w-fit"
                    whileTap={{ scale: 0.95 }}
                    transition={springSnappy}
                  >
                    Live demo
                  </motion.a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Building in public */}
      <div className="tile tile-parchment">
        <div className="tile-inner">
          <motion.div
            className="mb-10 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow mb-3">Building in public</span>
            <h2 className="display-lg text-[#1d1d1f]">Upcoming products.</h2>
          </motion.div>

          <motion.div
            className="grid gap-5 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              { name: "AI UI/UX Auditor", icon: Zap, desc: "A sophisticated analysis tool currently being built for Anarish.com that allows users to audit their website UI/UX by simply pasting a URL.", status: "In Progress" },
              { name: "TripCraft", icon: Globe, desc: "A smart trip planner utilizing generative AI to assemble personalized itineraries, integrating mapping data and cost optimizations instantly.", status: "MVP" }
            ].map((prod) => (
              <motion.div key={prod.name} variants={fadeUp} className="surface-card p-8">
                <div className="mb-7 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                    <prod.icon className="h-5 w-5" />
                  </div>
                  <span className="chip cursor-default py-1.5 text-[12px]">{prod.status}</span>
                </div>
                <h3 className="tagline mb-2 text-[#1d1d1f]">{prod.name}</h3>
                <p className="caption text-[#333333]">{prod.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
