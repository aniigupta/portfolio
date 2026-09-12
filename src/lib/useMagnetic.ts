"use client";
import { useCallback } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { springGlide } from "./motion";

type MagneticOptions = {
  /** How far the element follows the pointer, as a fraction of the offset. */
  strength?: number;
  /** Clamp so the element never drifts further than this many pixels. */
  max?: number;
};

/**
 * Pulls an element gently toward the cursor while it is hovered, then springs
 * it home. The element is read from the event's currentTarget, so the hook
 * needs no ref at all. Mouse pointers only - touch and reduced-motion users get
 * a static element with no work being done.
 */
export function useMagnetic({ strength = 0.3, max = 14 }: MagneticOptions = {}) {
  const prefersReducedMotion = useReducedMotion();

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, springGlide);
  const y = useSpring(offsetY, springGlide);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;

      const rect = event.currentTarget.getBoundingClientRect();
      const deltaX = event.clientX - (rect.left + rect.width / 2);
      const deltaY = event.clientY - (rect.top + rect.height / 2);

      offsetX.set(Math.max(-max, Math.min(max, deltaX * strength)));
      offsetY.set(Math.max(-max, Math.min(max, deltaY * strength)));
    },
    [max, offsetX, offsetY, prefersReducedMotion, strength]
  );

  const onPointerLeave = useCallback(() => {
    offsetX.set(0);
    offsetY.set(0);
  }, [offsetX, offsetY]);

  return { style: { x, y }, onPointerMove, onPointerLeave };
}
