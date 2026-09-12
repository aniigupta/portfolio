"use client";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, type Variants } from "framer-motion";
import { easeEditorial } from "../../lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Dark tiles need a cooler, brighter wash to read against near-black. */
  tone?: "light" | "dark";
  variants?: Variants;
  /** Disable the hover lift where the card sits in a tight grid. */
  lift?: boolean;
};

const TONE_WASH = {
  light: "rgba(0, 102, 204, 0.07)",
  dark: "rgba(41, 151, 255, 0.13)",
} as const;

/**
 * A surface that lights up under the cursor. The wash is a single
 * pointer-tracked radial gradient driven by motion values, so it never triggers
 * a React render.
 *
 * `isolate` + a negative z-index put the glow above the card's own background
 * but beneath its content, which lets children stay direct descendants - the
 * card's own flex/grid classes keep governing layout exactly as they did
 * before the wrapper existed.
 */
export default function SpotlightCard({
  children,
  className = "",
  tone = "light",
  variants,
  lift = true,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(-400);
  const pointerY = useMotionValue(-400);
  const glow = useSpring(useMotionValue(0), { stiffness: 180, damping: 30 });

  const background = useMotionTemplate`radial-gradient(340px circle at ${pointerX}px ${pointerY}px, ${TONE_WASH[tone]}, transparent 72%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
    glow.set(1);
  };

  return (
    <motion.div
      variants={variants}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => glow.set(0)}
      whileHover={prefersReducedMotion || !lift ? undefined : { y: -4 }}
      transition={{ duration: 0.45, ease: easeEditorial }}
      className={`relative isolate overflow-hidden ${className}`}
    >
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background, opacity: glow }}
        />
      )}
      {children}
    </motion.div>
  );
}
