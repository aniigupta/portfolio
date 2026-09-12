"use client";
import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Eased number count-up powered by Anime.js. The tween writes straight to the
 * DOM node instead of React state, so a 2-second count costs zero re-renders
 * and leaves INP untouched. Anime.js is imported on demand, only once the
 * counter scrolls into view.
 */
export default function Counter({ value, suffix = "", duration = 1900, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !isInView) return;

    if (prefersReducedMotion) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    let cancelled = false;
    const counter = { current: 0 };

    import("animejs").then(({ animate, utils }) => {
      if (cancelled || !ref.current) return;
      animate(counter, {
        current: value,
        duration,
        ease: "outExpo",
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${utils.round(counter.current, 0)}${suffix}`;
        },
        onComplete: () => {
          if (ref.current) ref.current.textContent = `${value}${suffix}`;
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isInView, value, suffix, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      0{suffix}
    </span>
  );
}
