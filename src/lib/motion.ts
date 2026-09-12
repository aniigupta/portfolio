import type { Transition, Variants } from "framer-motion";

/** Snappy, organic spring used for tactile press/hover micro-interactions. */
export const springSnappy: Transition = { type: "spring", stiffness: 400, damping: 28 };

/** Softer spring used for layout shifts, sliding pills and tab transitions. */
export const springSoft: Transition = { type: "spring", stiffness: 260, damping: 20 };

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

/**
 * The system-wide press micro-interaction from DESIGN.md: scale(0.95) on active.
 * Elevation and hover lift are deliberately absent - emphasis comes from surface
 * change, not chrome.
 */
export const pressable = {
  whileTap: { scale: 0.95 },
  transition: springSnappy,
} as const;
