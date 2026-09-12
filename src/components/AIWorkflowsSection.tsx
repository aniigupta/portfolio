"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Brain, Bug, Cpu, FileText, Layout, Search, Terminal, Workflow, Zap } from "lucide-react";
import { chipIn, fadeUp, staggerChips, staggerContainer, viewportOnce } from "../lib/motion";

export default function AIWorkflowsSection() {
  const coreCapabilities = [
    {
      icon: Terminal,
      title: "Prompt Engineering",
      desc: "Designing high-fidelity context injection and multi-shot prompts to generate production-grade logic."
    },
    {
      icon: Workflow,
      title: "Agentic Workflows",
      desc: "Orchestrating AI agents (Cursor, Antigravity) for automated debugging and rapid implementation cycles."
    },
    {
      icon: Cpu,
      title: "MCP & RAG",
      desc: "Leveraging Model Context Protocol and RAG to bridge LLMs with local repos and deep documentation."
    }
  ];

  const usageItems = [
    { icon: Zap, label: "Rapid Prototyping", detail: "Shipping MVPs 3x faster using v0 and AI-assisted drafting." },
    { icon: Bug, label: "Agentic Debugging", detail: "Self-healing code patterns and deep trace analysis with AI." },
    { icon: Search, label: "Deep Research", detail: "Synthesizing complex library updates and trade-offs instantly." },
    { icon: Layout, label: "UI Inspiration", detail: "Generating modern component structures and aesthetic patterns." },
    { icon: FileText, label: "Auto-Docs", detail: "Production-ready READMEs and API docs generated from structure." },
    { icon: Brain, label: "Design Validation", detail: "LLM-based schema audits and architectural brainstorming." }
  ];

  const tools = [
    "Antigravity", "Gemini 1.5 Pro", "GPT-4o", "Grok-1", "CodeX", "MCP", "Stitch", "GitHub Copilot"
  ];

  const cycle = [
    "Context Injection (MCP/RAG)",
    "Agentic Iteration & Drafting",
    "Automated Edge-Case Testing",
    "Human-in-the-loop Validation"
  ];

  return (
    <section id="ai-workflows" className="tile tile-dark">
      <div className="tile-inner">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow mb-3">Efficiency and velocity</span>
          <h2 className="display-lg mb-5 text-white">Augmented engineering.</h2>
          <p className="body-copy text-[#cccccc]">
            I leverage a sophisticated AI stack as a force multiplier to bridge the gap between complex requirements
            and production-ready code. By integrating agentic workflows (Antigravity, Cursor) and advanced RAG-based
            research into my daily SDLC, I focus on higher-level architectural decisions while maintaining a 3x
            velocity in implementation.
          </p>
        </motion.div>

        <motion.div
          className="mb-16 grid gap-5 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {coreCapabilities.map((cap) => (
            <motion.div key={cap.title} variants={fadeUp} className="surface-card p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[11px] bg-white/[0.08] text-white">
                <cap.icon className="h-5 w-5" />
              </div>
              <h3 className="tagline mb-3 text-white">{cap.title}</h3>
              <p className="caption text-[#cccccc]">{cap.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h3 className="tagline mb-6 flex items-center gap-2.5 text-white">
              <Bot className="h-5 w-5 text-[#2997ff]" /> Applied intelligence
            </h3>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {usageItems.map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="surface-card p-6">
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <item.icon className="h-4 w-4 text-[#2997ff]" />
                    <span className="caption-strong text-white">{item.label}</span>
                  </div>
                  <p className="fine-print leading-relaxed text-[#cccccc]">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="surface-card p-8">
              <h3 className="tagline mb-5 flex items-center gap-2.5 text-white">
                <Zap className="h-5 w-5 text-[#2997ff]" /> The intelligence stack
              </h3>

              <motion.div
                className="mb-8 flex flex-wrap gap-2"
                variants={staggerChips}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {tools.map((tool) => (
                  <motion.span key={tool} variants={chipIn} className="chip cursor-default py-1.5 text-[12px]">
                    {tool}
                  </motion.span>
                ))}
              </motion.div>

              <div className="rounded-[11px] bg-white/[0.04] p-6">
                <h4 className="caption-strong mb-5 flex items-center gap-2 text-[#cccccc]">
                  <Workflow className="h-3.5 w-3.5" /> AI workflow cycle
                </h4>

                <motion.ol
                  className="space-y-1"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {cycle.map((step, i) => (
                    <motion.li
                      key={step}
                      variants={fadeUp}
                      className="group flex items-center gap-3 rounded-[8px] px-2 py-2 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="fine-print flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
                        {i + 1}
                      </span>
                      <span className="caption text-[#cccccc]">{step}</span>
                      {i < cycle.length - 1 && (
                        <ArrowRight className="ml-auto h-3 w-3 shrink-0 text-white/30 transition-transform duration-300 group-hover:translate-x-0.5" />
                      )}
                    </motion.li>
                  ))}
                </motion.ol>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
