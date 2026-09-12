"use client";
import { createElement, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { maskWord, maskWordContainer, viewportOnce } from "../../lib/motion";

type Props = {
  /** Plain heading text - split into words and revealed behind a clip mask. */
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  /** Rendered after the text inside the same heading (e.g. a trailing period). */
  children?: ReactNode;
  delay?: number;
};

/**
 * Masked word-by-word heading reveal. The visible string is untouched; each
 * word simply rides up from behind its own clipped line box. The full text is
 * exposed to assistive tech via aria-label so the split spans never fragment
 * the accessible name.
 */
export default function RevealHeading({ text, as = "h2", className, children, delay = 0 }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return createElement(as, { className }, text, children);
  }

  return createElement(
    motion[as],
    {
      className,
      "aria-label": text,
      variants: maskWordContainer,
      initial: "hidden",
      whileInView: "visible",
      viewport: viewportOnce,
      transition: { delayChildren: delay },
    },
    <>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-flex overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className="inline-block will-change-transform" variants={maskWord}>
              {word}
            </motion.span>
            {index < words.length - 1 && <span className="inline-block w-[0.26em]" />}
          </span>
        ))}
      </span>
      {children}
    </>
  );
}
