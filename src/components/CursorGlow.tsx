"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Subscribe to the pointer capability directly - the server snapshot is `false`,
// so the cursor never renders during SSR and there is no hydration mismatch.
const HOVER_QUERY = "(hover: hover)";

const subscribeToHover = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(HOVER_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

export default function CursorGlow() {
  const hasHover = useSyncExternalStore(
    subscribeToHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false
  );
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // High-performance Framer Motion values (bypasses React Render Cycle entirely to fix INP)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics-based spring interpolator for the trailing ring
  const springConfig = { damping: 18, stiffness: 220, mass: 0.15 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Direct variable mutation! No React re-rendering triggered.
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Expand the ring over anything clickable
      const target = e.target as Element | null;
      setIsInteractive(Boolean(target?.closest?.("a, button, input, textarea, select, [role='option']")));
    };
    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    // Adding passive: true immediately improves scrolling performance further
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [cursorX, cursorY]);

  if (!hasHover) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-[-18px] top-[-18px] z-[100] hidden h-9 w-9 rounded-full border md:block"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isPressed ? 1.15 : isInteractive ? 1.5 : 1,
          opacity: isInteractive ? 1 : 0.55,
          borderColor: isInteractive ? "rgba(0, 102, 204, 0.55)" : "rgba(29, 29, 31, 0.28)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      <motion.div
        className="pointer-events-none fixed left-[-3px] top-[-3px] z-[100] hidden h-1.5 w-1.5 rounded-full bg-[#1d1d1f] md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isInteractive ? 0 : isPressed ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </>
  );
}
