"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { springSnappy, springSoft } from "../lib/motion";

type NavItem = { label: string; href: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#about" },
  { label: "AI Workflows", href: "#ai-workflows" },
  { label: "Resume", href: "/Aniket_Kumar_Gupta_Resume.pdf", external: true },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSoft, delay: 0.1 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full transition-all duration-500 ${
          scrolled
            ? "mt-3 border border-black/[0.06] bg-[rgba(245,245,247,0.82)] px-3 py-2 backdrop-blur-xl backdrop-saturate-150"
            : "mt-5 border border-transparent bg-white/50 px-3 py-2.5 backdrop-blur-sm"
        }`}
      >
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex shrink-0 items-center gap-2.5 rounded-full bg-transparent p-1 pr-2 text-left"
          whileTap={{ scale: 0.95 }}
          transition={springSnappy}
        >
          <span className="relative block h-8 w-8 shrink-0">
            <span className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-black/10">
              <Image src="/profile.png" alt="Aniket Gupta" fill className="object-cover object-top" priority sizes="32px" />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-[#30d158]" aria-hidden="true" />
          </span>
          <span className="hidden text-[15px] font-semibold tracking-[-0.01em] text-[#1d1d1f] sm:block">Aniket Gupta</span>
        </motion.button>

        <div className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
          {NAV_ITEMS.map((item) => {
            const isPillTarget = pillTarget === item.href;
            const linkClass = `relative z-10 block px-3.5 py-2 text-[13px] tracking-[-0.01em] transition-colors duration-200 ${
              isPillTarget ? "text-[#1d1d1f]" : "text-[#1d1d1f]/60"
            }`;

            return (
              <div key={item.href} className="relative" onMouseEnter={() => setHovered(item.href)}>
                {isPillTarget && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-white"
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
          <motion.a
            href="#contact"
            className="rounded-full bg-[#0066cc] px-5 py-2 text-[14px] tracking-[-0.224px] text-white transition-opacity hover:opacity-90"
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
          >
            Hire Me
          </motion.a>

          <motion.button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1d1d1f] md:hidden"
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={springSoft}
            className="pointer-events-auto mx-auto mt-2 max-w-4xl overflow-hidden rounded-[18px] border border-black/[0.06] bg-[rgba(245,245,247,0.92)] p-2 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-[11px] px-4 py-3 text-[15px] text-[#1d1d1f] transition-colors hover:bg-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-[11px] px-4 py-3 text-[15px] text-[#1d1d1f] transition-colors hover:bg-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
