"use client";
import { useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { springSnappy, springSoft } from "../lib/motion";
import { useParallax } from "../lib/useParallax";
import Magnetic from "./ui/Magnetic";

/** Lets the hero reveal ride the intro curtain up rather than play behind it. */
const INTRO = 0.3;

type Token = { text: string; tone?: "keyword" | "string" | "fn" | "comment" | "punct" | "prop" };

type Capability = {
  id: string;
  label: string;
  caption: string;
  file: string;
  lines: Token[][];
};

const TONE_CLASS: Record<NonNullable<Token["tone"]>, string> = {
  keyword: "text-[#0066cc]",
  string: "text-[#008a3e]",
  fn: "text-[#1d1d1f] font-semibold",
  comment: "text-[#7a7a7a]",
  punct: "text-[#7a7a7a]",
  prop: "text-[#333333]",
};

const CAPABILITIES: Capability[] = [
  {
    id: "architecture",
    label: "Architecture",
    caption: "Modular route handlers, typed boundaries, zero technical debt.",
    file: "app/api/orders/route.ts",
    lines: [
      [{ text: "// Typed edge handler, cached at the boundary", tone: "comment" }],
      [
        { text: "export const ", tone: "keyword" },
        { text: "runtime " },
        { text: "= ", tone: "punct" },
        { text: "\"edge\"", tone: "string" },
      ],
      [],
      [
        { text: "export async function ", tone: "keyword" },
        { text: "GET", tone: "fn" },
        { text: "(req: Request) {", tone: "punct" },
      ],
      [
        { text: "  const ", tone: "keyword" },
        { text: "orders " },
        { text: "= await ", tone: "keyword" },
        { text: "db.orders.", tone: "punct" },
        { text: "findMany", tone: "fn" },
        { text: "({", tone: "punct" },
      ],
      [
        { text: "    where", tone: "prop" },
        { text: ": { tenantId ", tone: "punct" },
        { text: "},", tone: "punct" },
      ],
      [
        { text: "    take", tone: "prop" },
        { text: ": ", tone: "punct" },
        { text: "50", tone: "keyword" },
        { text: ",", tone: "punct" },
      ],
      [{ text: "  })", tone: "punct" }],
      [
        { text: "  return ", tone: "keyword" },
        { text: "Response." },
        { text: "json", tone: "fn" },
        { text: "(orders)", tone: "punct" },
      ],
      [{ text: "}", tone: "punct" }],
    ],
  },
  {
    id: "ai",
    label: "AI Pipelines",
    caption: "LLM extraction over unstructured data at ~90% accuracy.",
    file: "lib/extract.py",
    lines: [
      [{ text: "# Structured insight extraction from raw articles", tone: "comment" }],
      [
        { text: "async def ", tone: "keyword" },
        { text: "extract", tone: "fn" },
        { text: "(doc: ", tone: "punct" },
        { text: "str", tone: "prop" },
        { text: ") -> Insight:", tone: "punct" },
      ],
      [
        { text: "    schema " },
        { text: "= ", tone: "punct" },
        { text: "Insight." },
        { text: "model_json_schema", tone: "fn" },
        { text: "()", tone: "punct" },
      ],
      [],
      [
        { text: "    result " },
        { text: "= await ", tone: "keyword" },
        { text: "llm." },
        { text: "complete", tone: "fn" },
        { text: "(", tone: "punct" },
      ],
      [
        { text: "        prompt", tone: "prop" },
        { text: "=", tone: "punct" },
        { text: "CONTEXT_TEMPLATE." },
        { text: "format", tone: "fn" },
        { text: "(doc=doc),", tone: "punct" },
      ],
      [
        { text: "        response_format", tone: "prop" },
        { text: "=schema,", tone: "punct" },
      ],
      [{ text: "    )", tone: "punct" }],
      [
        { text: "    return ", tone: "keyword" },
        { text: "Insight." },
        { text: "validate", tone: "fn" },
        { text: "(result)", tone: "punct" },
      ],
    ],
  },
  {
    id: "performance",
    label: "Performance",
    caption: "Sub-second LCP through ruthless payload discipline.",
    file: "app/page.tsx",
    lines: [
      [{ text: "// Ship only what the first paint actually needs", tone: "comment" }],
      [
        { text: "const ", tone: "keyword" },
        { text: "Projects " },
        { text: "= ", tone: "punct" },
        { text: "dynamic", tone: "fn" },
        { text: "(() => ", tone: "punct" },
        { text: "import", tone: "keyword" },
        { text: "(", tone: "punct" },
        { text: "\"./Projects\"", tone: "string" },
        { text: "))", tone: "punct" },
      ],
      [],
      [
        { text: "<", tone: "punct" },
        { text: "Image", tone: "fn" },
      ],
      [
        { text: "  src", tone: "prop" },
        { text: "=", tone: "punct" },
        { text: "\"/hero.png\"", tone: "string" },
      ],
      [
        { text: "  sizes", tone: "prop" },
        { text: "=", tone: "punct" },
        { text: "\"(max-width: 1024px) 100vw, 50vw\"", tone: "string" },
      ],
      [{ text: "  priority", tone: "prop" }],
      [{ text: "/>", tone: "punct" }],
      [],
      [{ text: "// LCP 1.2s · INP 80ms · CLS 0.01", tone: "comment" }],
    ],
  },
];

const HEADLINE = ["Building", "intelligent", "digital", "products."];

export default function InteractiveHero() {
  const [activeTab, setActiveTab] = useState(CAPABILITIES[0].id);
  const active = CAPABILITIES.find((cap) => cap.id === activeTab) ?? CAPABILITIES[0];

  const prefersReducedMotion = useReducedMotion();
  const { ref: parallaxRef, y: parallaxY } = useParallax(34);

  // Feather-light pointer tilt on the showcase card - 5 degrees at the corners.
  const tiltX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotateX = useTransform(tiltX, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(tiltY, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleCardTilt = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltX.set((event.clientY - rect.top) / rect.height - 0.5);
    tiltY.set((event.clientX - rect.left) / rect.width - 0.5);
  };

  const resetCardTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section className="tile tile-light flex min-h-[92vh] flex-col items-center justify-center pt-32 md:pt-36">
      <div className="tile-inner flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springSoft, delay: INTRO + 0.05 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-[#f5f5f7] py-1.5 pl-3 pr-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30d158] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]"></span>
          </span>
          <span className="caption text-[#333333]">Open to full-time roles and freelance projects</span>
        </motion.div>

        <h1 className="hero-display mb-6 max-w-4xl text-[#1d1d1f]">
          {HEADLINE.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: INTRO + 0.08 + i * 0.075 }}
              >
                {word}
              </motion.span>
              {i < HEADLINE.length - 1 && <span className="inline-block w-[0.25em]" />}
            </span>
          ))}
        </h1>

        <motion.p
          className="lead mb-9 max-w-2xl text-balance text-[#1d1d1f]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: INTRO + 0.42 }}
        >
          Full stack engineering for high-performance web applications and AI-integrated systems.
        </motion.p>

        <motion.div
          className="mb-16 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: INTRO + 0.52 }}
        >
          <Magnetic strength={0.4} max={12}>
            <motion.a href="#projects" className="btn-primary" whileTap={{ scale: 0.95 }} transition={springSnappy}>
              View case studies
            </motion.a>
          </Magnetic>
          <Magnetic strength={0.4} max={12}>
            <motion.a
              href="/Aniket_Kumar_Gupta_Resume.pdf"
              download="Aniket_Kumar_Gupta_Resume.pdf"
              className="btn-secondary group"
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
            >
              <Download className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
              Resume
            </motion.a>
          </Magnetic>
        </motion.div>

        {/* Interactive capability showcase - the artifact this tile is built around.
            Entrance, scroll parallax and pointer tilt each own their own layer so
            the transforms never fight over the same motion value. */}
        <motion.div
          ref={parallaxRef}
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: INTRO + 0.6 }}
        >
        <motion.div style={{ y: parallaxY }}>
        <motion.div
          onPointerMove={handleCardTilt}
          onPointerLeave={resetCardTilt}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="w-full overflow-hidden rounded-[18px] border border-black/[0.08] bg-white text-left will-change-transform"
        >
          <div className="flex items-center gap-1 border-b border-[#f0f0f0] p-2">
            {CAPABILITIES.map((cap) => (
              <motion.button
                key={cap.id}
                type="button"
                onClick={() => setActiveTab(cap.id)}
                aria-pressed={activeTab === cap.id}
                whileTap={{ scale: 0.95 }}
                transition={springSnappy}
                className={`relative rounded-full px-4 py-2 text-[14px] tracking-[-0.224px] transition-colors duration-200 ${
                  activeTab === cap.id ? "text-[#1d1d1f]" : "text-[#7a7a7a]"
                }`}
              >
                {activeTab === cap.id && (
                  <motion.span
                    layoutId="heroTabPill"
                    className="absolute inset-0 rounded-full bg-[#f5f5f7]"
                    transition={springSoft}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{cap.label}</span>
              </motion.button>
            ))}
            <span className="ml-auto hidden pr-3 font-mono text-[12px] text-[#7a7a7a] sm:block">{active.file}</span>
          </div>

          <div className="relative min-h-[268px] bg-[#fafafc] px-5 py-5 sm:px-7 sm:py-6">
            <AnimatePresence mode="wait">
              <motion.pre
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-x-auto font-mono text-[12px] leading-[1.85] tracking-normal sm:text-[13px]"
              >
                <code>
                  {active.lines.map((line, i) => (
                    <span key={i} className="flex gap-4">
                      <span className="w-4 shrink-0 select-none text-right text-[#c7c7cc]">{i + 1}</span>
                      <span className="whitespace-pre text-[#1d1d1f]">
                        {line.length === 0
                          ? " "
                          : line.map((token, j) => (
                              <span key={j} className={token.tone ? TONE_CLASS[token.tone] : undefined}>
                                {token.text}
                              </span>
                            ))}
                      </span>
                    </span>
                  ))}
                </code>
              </motion.pre>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2.5 border-t border-[#f0f0f0] bg-white px-5 py-4 sm:px-7">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066cc]" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.18 }}
                className="caption text-[#333333]"
              >
                {active.caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
        </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springSoft, delay: INTRO + 0.7 }}
        >
          {[
            { Icon: Github, href: "https://github.com/aniigupta", label: "GitHub Profile", external: true },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/aniket-gupta-564758226/", label: "LinkedIn Profile", external: true },
            { Icon: Mail, href: "mailto:aniiigupta23@gmail.com", label: "Email Me", external: false },
          ].map(({ Icon, href, label, external }) => (
            <Magnetic key={label} strength={0.45} max={9}>
              <motion.a
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-colors hover:bg-[#eaeaee] hover:text-[#0066cc]"
                whileTap={{ scale: 0.95 }}
                transition={springSnappy}
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
