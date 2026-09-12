import type { Transition, Variants } from "framer-motion";

/** Snappy, organic spring used for tactile press/hover micro-interactions. */
export const springSnappy: Transition = { type: "spring", stiffness: 400, damping: 28 };

/** Softer spring used for layout shifts, sliding pills and tab transitions. */
export const springSoft: Transition = { type: "spring", stiffness: 260, damping: 20 };

/** Long, weighted spring for magnetic pull and parallax drift. */
export const springGlide: Transition = { type: "spring", stiffness: 150, damping: 20, mass: 0.6 };

/** Editorial easing - fast out, long settle. Matches the Apple motion feel. */
export const easeEditorial = [0.22, 1, 0.36, 1] as const;

/** Shared viewport config so every section reveals at the same scroll threshold. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Standard staggered reveal: children fade up from 24px. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24, mass: 0.6 },
  },
};

/** Slightly richer card entrance - rises and settles from a hair of scale. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeEditorial },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Tighter stagger for dense grids of chips/tags. */
export const staggerChips: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035 },
  },
};

export const chipIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 26 },
  },
};

/** Word-level mask reveal: each word rides up from behind a clipped line box. */
export const maskWordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

export const maskWord: Variants = {
  hidden: { y: "108%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: easeEditorial },
  },
};

/**
 * The system-wide press micro-interaction from DESIGN.md: scale(0.95) on active.
 * Elevation and hover lift stay deliberately restrained - emphasis comes from
 * surface change, not chrome.
 */
export const pressable = {
  whileTap: { scale: 0.95 },
  transition: springSnappy,
} as const;
