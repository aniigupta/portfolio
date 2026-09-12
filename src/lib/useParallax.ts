"use client";
import { useRef } from "react";
import { useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Transform-only parallax driven by the element's own progress through the
 * viewport. Returns `undefined` for `y` when the user prefers reduced motion so
 * the caller can spread it straight into `style` with no branching.
 */
export function useParallax(distance = 40) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shift = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(shift, { stiffness: 140, damping: 30, mass: 0.4 });

  return { ref, y: prefersReducedMotion ? undefined : y };
}
