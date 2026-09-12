"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMagnetic } from "../../lib/useMagnetic";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
};

/**
 * Wraps an interactive element so it drifts toward the cursor. Renders an
 * inline-flex span, which is layout-neutral around the pill buttons and icon
 * links it is used on.
 */
export default function Magnetic({ children, className = "", strength, max }: Props) {
  const { style, onPointerMove, onPointerLeave } = useMagnetic({ strength, max });

  return (
    <motion.span
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  );
}
