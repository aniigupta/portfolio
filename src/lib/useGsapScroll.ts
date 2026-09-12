"use client";
import { useEffect, useRef } from "react";
import type { gsap as GsapType } from "gsap";

export type GsapContext = {
  gsap: typeof GsapType;
  // ScrollTrigger's own type lives behind the plugin entry point
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

type Options = {
  /**
   * Media query gating the effect. Defaults to motion-safe only; pass a
   * narrower query to keep expensive scrubbing off small screens.
   */
  query?: string;
  /** Skip entirely (e.g. the element is conditionally rendered). */
  enabled?: boolean;
};

/**
 * Loads GSAP + ScrollTrigger on demand - they stay out of the initial bundle -
 * and runs `setup` inside a gsap.matchMedia scope so every tween, trigger and
 * inline style is reverted automatically on cleanup or query change.
 */
export function useGsapScroll(
  setup: (context: GsapContext) => void,
  { query = "(prefers-reduced-motion: no-preference)", enabled = true }: Options = {}
) {
  const setupRef = useRef(setup);

  useEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    if (!enabled) return;

    let alive = true;
    let matchMedia: ReturnType<typeof GsapType.matchMedia> | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!alive) return;

      gsap.registerPlugin(ScrollTrigger);
      matchMedia = gsap.matchMedia();
      matchMedia.add(query, () => {
        setupRef.current({ gsap, ScrollTrigger });
      });
    })();

    return () => {
      alive = false;
      matchMedia?.revert();
    };
  }, [enabled, query]);
}
