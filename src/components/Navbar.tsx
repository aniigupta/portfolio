"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { springSnappy, springSoft } from "../lib/motion";
import Magnetic from "./ui/Magnetic";

type NavItem = { label: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#about" },
  { label: "AI Workflows", href: "#ai-workflows" },
  { label: "Resume", href: "/Aniket_Kumar_Gupta_Resume.pdf", external: true },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Continuous scroll interpolation keeps the capsule settling smoothly instead
  // of snapping between two states at a threshold.
  const { scrollY } = useScroll();
  const progress = useSpring(useTransform(scrollY, [0, 90], [0, 1]), {
    stiffness: 200,
    damping: 34,
    mass: 0.4,
  });

  const surfaceAlpha = useTransform(progress, [0, 1], [0.4, 0.84]);
  const borderAlpha = useTransform(progress, [0, 1], [0, 0.07]);
  const marginTop = useTransform(progress, [0, 1], [20, 12]);
  const padY = useTransform(progress, [0, 1], [10, 8]);

  const background = useMotionTemplate`rgba(245, 245, 247, ${surfaceAlpha})`;
  const borderColor = useMotionTemplate`rgba(0, 0, 0, ${borderAlpha})`;

  // Track which section is in view so the pill rests on the current page region
  useEffect(() => {
    const ids = ["projects", "about", "ai-workflows", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const pillTarget = hovered ?? active;

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSoft, delay: prefersReducedMotion ? 0 : 0.85 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
    >
      <motion.nav
        aria-label="Primary"
        style={{
          background,
          borderColor,
          marginTop,
          paddingTop: padY,
          paddingBottom: padY,
        }}
        className="pointer-events-auto mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full border px-3 backdrop-blur-xl backdrop-saturate-150"
      >
        <Magnetic strength={0.22} max={6}>
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })}
            aria-label="Scroll to top"
            className="group flex shrink-0 items-center gap-2.5 rounded-full bg-transparent p-1 pr-2 text-left"
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
          >
            <span className="relative block h-8 w-8 shrink-0">
              <span className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-black/10">
                <Image
                  src="/profile.png"
                  alt="Aniket Gupta"
                  fill
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                  priority
                  sizes="32px"
                />
              </span>
              <span
                className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-[#30d158]"
                aria-hidden="true"
              />
            </span>
            <span className="hidden text-[15px] font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:block">
              Aniket Gupta
            </span>
          </motion.button>
        </Magnetic>

        <div className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {NAV_ITEMS.map((item) => {
            const isPillTarget = pillTarget === item.href;
            const linkClass = `relative z-10 block px-3.5 py-2 text-[13px] tracking-[-0.01em] transition-colors duration-300 ${
              isPillTarget ? "text-[#1d1d1f]" : "text-[#1d1d1f]/55"
            }`;

            return (
              <div key={item.href} className="relative" onMouseEnter={() => setHovered(item.href)}>
                {isPillTarget && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    transition={springSoft}
                    aria-hidden="true"
                  />
                )}
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <Magnetic strength={0.35} max={10}>
            <motion.a
              href="#contact"
              className="rounded-full bg-[#0066cc] px-5 py-2 text-[14px] tracking-[-0.224px] text-white transition-opacity hover:opacity-90"
              whileTap={{ scale: 0.95 }}
              transition={springSnappy}
            >
              Hire Me
            </motion.a>
          </Magnetic>

          <motion.button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1d1d1f] md:hidden"
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={springSoft}
            className="pointer-events-auto mx-auto mt-2 max-w-4xl origin-top overflow-hidden rounded-[18px] border border-black/[0.06] bg-[rgba(245,245,247,0.94)] p-2 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map((item, index) => {
              const shared = {
                onClick: () => setMenuOpen(false),
                className:
                  "block rounded-[11px] px-4 py-3 text-[15px] text-[#1d1d1f] transition-colors hover:bg-white",
              };

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.045, duration: 0.3 }}
                >
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" {...shared}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} {...shared}>
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
