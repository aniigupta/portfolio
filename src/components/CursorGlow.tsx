"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [hasHover, setHasHover] = useState(false);

  // High-performance Framer Motion values (bypasses React Render Cycle entirely to fix INP)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics-based spring interpolators
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Gentle delayed spring for the ambient background glow
  const bgSpringConfig = { damping: 30, stiffness: 50, mass: 1 };
  const bgX = useSpring(cursorX, bgSpringConfig);
  const bgY = useSpring(cursorY, bgSpringConfig);

  useEffect(() => {
    setMounted(true);

    // Detect if device supports a hover state (mouse/trackpad vs touch screen)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setHasHover(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mediaQuery.addEventListener("change", handler);

    const updateMousePosition = (e: MouseEvent) => {
      // Direct variable mutation! No React re-rendering triggered.
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    // Adding passive: true immediately improves scrolling performance further
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [cursorX, cursorY]);

  if (!mounted || !hasHover) return null;

  return (
    <>
      <motion.div
        className="fixed top-[-16px] left-[-16px] w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className="fixed top-[-4px] left-[-4px] w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)] pointer-events-none z-[100] mix-blend-screen hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Background ambient glow matching the cursor */}
      <motion.div
        className="fixed top-[-400px] left-[-400px] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none -z-10 blur-[100px] hidden md:block"
        style={{ x: bgX, y: bgY }}
      />
    </>
  );
}
