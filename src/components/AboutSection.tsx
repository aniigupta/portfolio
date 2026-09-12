"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Github, Mail, Code2, Terminal, Cpu, Zap, ShieldCheck, Download, Check, ArrowUpRight } from "lucide-react";
import { easeEditorial, fadeUp, riseIn, springSnappy, staggerContainer, viewportOnce } from "../lib/motion";
import { useGsapScroll } from "../lib/useGsapScroll";
import RevealHeading from "./ui/RevealHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Magnetic from "./ui/Magnetic";

type Experience = {
  title: string;
  company: string;
  period: string;
  tags: string[];
  points: string[];
  shipped?: { name: string; summary: string; link: string }[];
};

export default function AboutSection() {
  const experiences: Experience[] = [
    {
      title: "Full Stack Developer",
      company: "Anarish Innovations Pvt. Ltd.",
      period: "Feb 2026 - Present",
      tags: ["Next.js", "Angular", "React.js", "Node.js", "PostgreSQL", "Strapi CMS", "Docker", "Railway", "Cloudinary", "Tailwind CSS"],
      points: [
        "Engineered and deployed 6+ scalable full-stack web applications using Next.js, Angular, React.js, Node.js, and Tailwind CSS, delivering pixel-perfect UI from Figma designs with 30% fewer design-QA revision cycles.",
        "Built a comprehensive IMS SaaS platform covering inventory tracking, RBAC, analytics dashboards, order workflows, billing, and reporting - cutting manual stock-tracking effort by 40% for 50+ end users.",
        "Developing the backend for a Project Management System (PMS) with Node.js and PostgreSQL, designing REST APIs for task tracking, team collaboration, project timelines, and role-based permissions.",
        "Architected and optimized PostgreSQL schemas and integrated Strapi CMS for dynamic content management, reducing content-update turnaround by 35% and improving query performance by 25%.",
        "Containerized applications with Docker and managed Railway deployments, cutting deploy time from 45 to 10 minutes; integrated Cloudinary for secure media handling and CDN delivery, cutting asset load time by 40%.",
        "Collaborated in Agile sprints, independently owning 15+ features end-to-end while maintaining 95% sprint on-time delivery and zero critical production bugs."
      ],
      shipped: [
        {
          name: "IMS SaaS Platform",
          summary: "Inventory tracking, RBAC, analytics dashboards, order workflows and billing, on Next.js and PostgreSQL - built for high-concurrency order management.",
          link: "https://ims-azure-psi.vercel.app/"
        },
        {
          name: "Servitium CRM",
          summary: "Enterprise service CRM in Angular and Node.js for complex customer lifecycles and field operations, implemented pixel-perfect from Figma.",
          link: "https://servitiumcrm.com/"
        },
        {
          name: "Ops Suite Global",
          summary: "Scalable operations suite on Next.js and Docker, built around modular micro-frontends with reliable Railway deployments.",
          link: "https://opssuite.global/"
        }
      ]
    },
    {
      title: "Full Stack Developer (React.js + FastAPI)",
      company: "Naarivo Creations",
      period: "Oct 2025 - Jan 2026",
      tags: ["React.js", "FastAPI", "Python", "Supabase", "Render", "LLMs"],
      points: [
        "Independently built a production-grade FOIA automation system covering all 50 U.S. states and 3,000+ counties, monitoring 10,000+ articles for large-scale compliance tracking.",
        "Integrated GPT-based LLM APIs for automated structured insight extraction from unstructured data, achieving ~90% extraction accuracy and cutting manual review time by 60%.",
        "Used Supabase as the primary database and auth provider; deployed on Render with zero-downtime workflows and 99.9% uptime.",
        "Developed scalable Python pipelines for article fetching and parsing, processing 500+ articles/day via RESTful APIs built with FastAPI."
      ]
    }
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // The rail fills in step with the scroll position - GSAP's scrub is what makes
  // this feel tied to the reader rather than triggered at them.
  useGsapScroll(
    ({ gsap }) => {
      if (!railRef.current || !timelineRef.current) return;
      gsap.to(railRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 72%",
          end: "bottom 68%",
          scrub: 0.6,
        },
      });
    },
    { query: "(prefers-reduced-motion: no-preference) and (min-width: 768px)" }
  );

  const principles = [
    { icon: Cpu, title: "Architecture First", desc: "I prioritize scalable schemas and modular Next.js/React code to ensure rapid feature delivery without technical debt." },
    { icon: Zap, title: "Performance Obsession", desc: "Obsessed with edge-caching, optimized asset delivery via Cloudinary, and minimizing database roundtrips." },
    { icon: ShieldCheck, title: "AI Integration Workflows", desc: "Seamlessly hooking up LLM APIs to unstructured data pipelines to extract 90%+ accurate insights dynamically." }
  ];

  return (
    <section id="about" className="tile tile-parchment">
      <div className="tile-inner">
        <motion.div className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow mb-3">Behind the code</span>
        </motion.div>
        <RevealHeading text="How I think and build." className="display-lg mb-12 text-[#1d1d1f]" />

        <motion.div
          className="mb-24 grid gap-5 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {principles.map((item) => (
            <SpotlightCard key={item.title} variants={riseIn} className="surface-card p-6">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f] transition-colors duration-300 group-hover:bg-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="tagline mb-2 text-[#1d1d1f]">{item.title}</h3>
              <p className="caption text-[#333333]">{item.desc}</p>
            </SpotlightCard>
          ))}
        </motion.div>

        <motion.div className="mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <span className="eyebrow mb-3">Track record</span>
        </motion.div>
        <RevealHeading text="Experience and milestones." className="display-lg mb-12 text-[#1d1d1f]" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div ref={timelineRef} className="relative space-y-5 lg:col-span-7">
            {/* Hairline rail - the timeline reads as structure, not decoration.
                A second line rides on top, filling as the reader scrolls. */}
            <div className="absolute bottom-6 left-[19px] top-6 hidden w-px bg-[#e0e0e0] md:block" aria-hidden="true">
              <div ref={railRef} className="h-full w-full origin-top scale-y-0 bg-[#0066cc]"></div>
            </div>

            {experiences.map((job, i) => (
              <motion.div
                key={job.company}
                className="relative md:pl-16"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <div className="absolute left-0 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white md:flex">
                  <span className="relative flex h-2.5 w-2.5">
                    {i === 0 && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066cc] opacity-50"></span>
                    )}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#0066cc]" : "bg-[#c7c7cc]"}`}></span>
                  </span>
                </div>

                <SpotlightCard className="surface-card p-6 md:p-8" lift={false}>
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="display-md text-[#1d1d1f]">{job.title}</h3>
                      <p className="body-copy mt-1 text-[#333333]">{job.company}</p>
                    </div>
                    <span className="chip whitespace-nowrap font-mono text-[12px]">{job.period}</span>
                  </div>

                  <ul className="mb-7 space-y-3.5">
                    {job.points.map((p) => (
                      <li key={p} className="caption flex gap-3 text-[#333333]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0066cc]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {job.shipped && (
                    <div className="mb-7 rounded-[11px] bg-[#f5f5f7] p-5">
                      <h4 className="caption-strong mb-4 text-[#1d1d1f]">Platforms shipped in this role</h4>
                      <ul className="space-y-4">
                        {job.shipped.map((product) => (
                          <li key={product.name}>
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`View the live ${product.name} project`}
                              className="caption-strong inline-flex items-center gap-1 text-[#0066cc] transition-opacity hover:opacity-75"
                            >
                              {product.name}
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            <p className="caption mt-1 text-[#333333]">{product.summary}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="chip cursor-default py-1.5 font-mono text-[12px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="space-y-5 lg:col-span-5">
            <motion.div
              variants={riseIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <SpotlightCard className="surface-card flex flex-col items-center p-8">
                <div className="group relative mb-5 h-28 w-28 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.24 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 1.1, ease: easeEditorial }}
                  >
                    <Image
                      src="/profile.png"
                      alt="Aniket Gupta - Software Engineer and AI Specialist Official Photo"
                      fill
                      sizes="112px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </motion.div>
                </div>
                <h3 className="tagline text-[#1d1d1f]">Aniket Gupta</h3>
                <p className="caption mb-6 mt-1 text-[#7a7a7a]">Full Stack Developer</p>
                <div className="flex gap-2.5">
                  <Magnetic strength={0.45} max={9}>
                    <motion.a
                      href="mailto:aniiigupta23@gmail.com"
                      aria-label="Send an email to Aniket"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-colors hover:bg-[#eaeaee] hover:text-[#0066cc]"
                      whileTap={{ scale: 0.95 }}
                      transition={springSnappy}
                    >
                      <Mail className="h-[18px] w-[18px]" />
                    </motion.a>
                  </Magnetic>
                  <Magnetic strength={0.45} max={9}>
                    <motion.a
                      href="https://github.com/aniigupta"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View Aniket's GitHub profile"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-colors hover:bg-[#eaeaee] hover:text-[#0066cc]"
                      whileTap={{ scale: 0.95 }}
                      transition={springSnappy}
                    >
                      <Github className="h-[18px] w-[18px]" />
                    </motion.a>
                  </Magnetic>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              variants={riseIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
            <SpotlightCard className="surface-card p-8" lift={false}>
              <div className="mb-7 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="caption-strong text-[#1d1d1f]">B.Tech in IIoT</h3>
                  <p className="caption mt-1 text-[#7a7a7a]">USAR, Delhi · 2021 - 2025</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-end justify-between border-b border-[#f0f0f0] pb-4">
                  <span className="caption text-[#7a7a7a]">CGPA</span>
                  <span className="display-md text-[#1d1d1f]">7.87</span>
                </div>

                <a
                  href="https://leetcode.com/u/aniigupta/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-[11px] bg-[#f5f5f7] px-4 py-3.5 transition-colors hover:bg-[#ececef]"
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="h-[18px] w-[18px] text-[#7a7a7a]" />
                    <span className="caption text-[#1d1d1f]">LeetCode</span>
                  </div>
                  <span className="caption-strong text-[#1d1d1f]">200+ solved</span>
                </a>

                <div className="flex items-center justify-between rounded-[11px] bg-[#f5f5f7] px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <Code2 className="h-[18px] w-[18px] text-[#7a7a7a]" />
                    <span className="caption text-[#1d1d1f]">HackerRank 5-star</span>
                  </div>
                  <div className="flex gap-0.5 text-[#0066cc]">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <span key={s} className="text-[12px]">★</span>
                    ))}
                  </div>
                </div>

                <motion.a
                  href="/Aniket_Kumar_Gupta_Resume.pdf"
                  download="Aniket_Kumar_Gupta_Resume.pdf"
                  className="btn-primary group mt-2 w-full"
                  whileTap={{ scale: 0.95 }}
                  transition={springSnappy}
                >
                  Download Resume
                  <Download className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
                </motion.a>
              </div>
            </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
