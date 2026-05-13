"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Brain, Bug, Cpu, FileText, Layout, Search, Sparkles, Terminal, Workflow, Zap } from "lucide-react";

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

  return (
    <section id="ai-workflows" className="mb-40 pt-20">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-3 flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Efficiency & Velocity
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6">Augmented Engineering</h2>
        <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
          I leverage a sophisticated AI stack as a force multiplier to bridge the gap between complex requirements and production-ready code. By integrating agentic workflows (Antigravity, Cursor) and advanced RAG-based research into my daily SDLC, I focus on higher-level architectural decisions while maintaining a 3x velocity in implementation.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {coreCapabilities.map((cap, i) => (
          <motion.div
            key={i}
            className="glass-card p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all duration-500 group shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <cap.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">{cap.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{cap.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <motion.div
          className="lg:col-span-7 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Bot className="text-primary w-6 h-6" /> Applied Intelligence
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {usageItems.map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/20 transition-all hover:bg-white/[0.07] group">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm text-white">{item.label}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-[60px] rounded-full"></div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> The Intelligence Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {tools.map(tool => (
                <span key={tool} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-mono font-medium hover:bg-primary/20 hover:text-white transition-all cursor-default">
                  {tool}
                </span>
              ))}
            </div>

            <div className="p-6 bg-[#030014]/50 border border-primary/20 rounded-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5" /> AI Workflow Cycle
              </h4>
              <div className="space-y-4 relative">
                {[
                  "Context Injection (MCP/RAG)",
                  "Agentic Iteration & Drafting",
                  "Automated Edge-Case Testing",
                  "Human-in-the-loop Validation"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/30">
                      {i + 1}
                    </div>
                    <span className="text-xs font-semibold text-gray-300">{step}</span>
                    {i < 3 && <ArrowRight className="w-3 h-3 text-gray-600 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
