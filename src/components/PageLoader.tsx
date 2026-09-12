"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeEditorial } from "../lib/motion";

const SEEN_KEY = "portfolio_intro_seen";
const MIN_VISIBLE = 700;
const MAX_VISIBLE = 1600;

const neverChanges = () => () => {};

/** Read once on the client; the curtain must not re-evaluate mid-session. */
const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "true";
  } catch {
    return true;
  }
};

/**
 * First-paint intro curtain. The page renders underneath at its normal time -
 * this is a pure overlay, so it never delays the hero's paint - and it shows
 * once per session, skipping entirely for reduced-motion visitors.
 */
export default function PageLoader() {
  const prefersReducedMotion = useReducedMotion();
  const alreadySeen = useSyncExternalStore(neverChanges, readSeen, () => false);
  const [dismissed, setDismissed] = useState(false);

  const isVisible = !alreadySeen && !prefersReducedMotion && !dismissed;

  useEffect(() => {
    if (!isVisible) {
      document.documentElement.classList.remove("intro-locked");
      return;
    }

    document.documentElement.classList.add("intro-locked");

    const dismiss = () => {
      setDismissed(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "true");
      } catch {
        /* private mode - it will simply play again next session */
      }
    };

    const started = Date.now();
    let minTimer: ReturnType<typeof setTimeout>;

    const onReady = () => {
      minTimer = setTimeout(dismiss, Math.max(0, MIN_VISIBLE - (Date.now() - started)));
    };

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
    }

    const hardStop = setTimeout(dismiss, MAX_VISIBLE);

    return () => {
      window.removeEventListener("load", onReady);
      clearTimeout(minTimer);
      clearTimeout(hardStop);
      document.documentElement.classList.remove("intro-locked");
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: easeEditorial }}
          aria-hidden="true"
        >
          <span className="overflow-hidden pb-[0.14em]">
            <motion.span
              className="block text-[15px] font-semibold tracking-[-0.01em] text-[#1d1d1f]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.7, ease: easeEditorial }}
            >
              Aniket Kumar Gupta
            </motion.span>
          </span>

          <span className="mt-4 block h-px w-28 overflow-hidden bg-[#e0e0e0]">
            <motion.span
              className="block h-full w-full origin-left bg-[#0066cc]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: easeEditorial }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
