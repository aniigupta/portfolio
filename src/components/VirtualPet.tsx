"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, Pin, PinOff, EyeOff, Smile } from "lucide-react";
import { springSnappy, springSoft } from "../lib/motion";

const HOVER_QUERY = "(hover: hover)";

const subscribeToHover = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(HOVER_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const PET_AVATARS = ["🐱", "🤖", "🦊", "👾", "🐶"];

const DIALOG_RESPONSES = [
  "Hi! Looking for a dev? My human is top tier! 🚀",
  "Check out the Projects section below! 💻",
  "Aniket builds high-performance Next.js apps! ⚡",
  "Need AI data pipelines or LLM workflows? Ask him! 🧠",
  "Psst... check out the Ask AI bot on the bottom-right! 🤖",
  "Everything here runs at a silky smooth 60 FPS. ✨",
  "Feed me TypeScript & clean code! 🍪",
  "That tickles! 😂 Click me again for more tips!",
];

// Gentle Web Audio API chirp for tactile feedback
function playCuteChirp() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Ignore audio context autoplay restrictions
  }
}

const neverChanges = () => () => {};

export default function VirtualPet() {
  const mounted = useSyncExternalStore(neverChanges, () => true, () => false);
  const hasHover = useSyncExternalStore(
    subscribeToHover,
    () => (typeof window !== "undefined" ? window.matchMedia(HOVER_QUERY).matches : false),
    () => false
  );

  const [bubbleText, setBubbleText] = useState("Hi! Hire my human? 🐾");
  const [showBubble, setShowBubble] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isDocked, setIsDocked] = useState(true); // Default to docked in corner for clean, non-intrusive start
  const [isMinimized, setIsMinimized] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Motion values for lag-free cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for organic trailing behind cursor
  const springConfig = { damping: 26, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Initialize position offscreen or to safe area
    mouseX.set(80);
    mouseY.set(typeof window !== "undefined" ? window.innerHeight - 100 : 600);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset slightly to the bottom-right of cursor so it doesn't cover clicked elements
      mouseX.set(e.clientX + 16);
      mouseY.set(e.clientY + 16);
    };

    if (hasHover && !isDocked) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasHover, isDocked, mouseX, mouseY]);

  // Auto-hide bubble after duration
  useEffect(() => {
    if (showBubble) {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      bubbleTimerRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 5500);
    }
    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [showBubble, bubbleText]);

  if (!mounted) return null;

  const handlePetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCuteChirp();

    // Spawn floating particle
    const emojis = ["💖", "✨", "⭐", "🎉", "🔥"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 40,
      y: -20 - Math.random() * 20,
      emoji: randomEmoji,
    };
    setParticles((prev) => [...prev.slice(-4), newParticle]);

    // Pick a new dialog quote
    const nextText = DIALOG_RESPONSES[Math.floor(Math.random() * DIALOG_RESPONSES.length)];
    setBubbleText(nextText);
    setShowBubble(true);
  };

  const cycleAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarIndex((prev) => (prev + 1) % PET_AVATARS.length);
  };

  const toggleDock = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDocked((prev) => !prev);
    setShowBubble(true);
    setBubbleText(isDocked ? "I'm following you now! 🐾" : "Resting at the corner dock! 🛋️");
  };

  // If minimized, display a small floating pill at the bottom-left
  if (isMinimized) {
    return (
      <motion.button
        type="button"
        aria-label="Wake up companion"
        onClick={() => {
          setIsMinimized(false);
          setShowBubble(true);
          setBubbleText("I'm awake! 🎉");
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#1d1d1f] shadow-md backdrop-blur-md transition-all hover:bg-white lg:bottom-10 lg:left-10"
      >
        <span className="text-base">{PET_AVATARS[avatarIndex]}</span>
        <span>Wake Pet</span>
      </motion.button>
    );
  }

  // Position logic: If docked or mobile (touch), dock at bottom-left. If following cursor, follow mouse.
  const isFollowMode = !isDocked && hasHover;

  return (
    <div
      className={`pointer-events-none fixed z-40 select-none ${
        isFollowMode ? "left-0 top-0" : "bottom-6 left-6 lg:bottom-10 lg:left-10"
      }`}
      style={isFollowMode ? { transform: `translate3d(0,0,0)` } : undefined}
    >
      <motion.div
        style={isFollowMode ? { x: smoothX, y: smoothY } : undefined}
        className="flex flex-col items-center"
      >
        {/* Particle Pop Animations */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: p.y - 30, scale: 1.2, x: p.x }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pointer-events-none absolute text-sm"
              onAnimationComplete={() => {
                setParticles((prev) => prev.filter((item) => item.id !== p.id));
              }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={springSoft}
              className="pointer-events-auto relative mb-2 flex max-w-[210px] sm:max-w-[240px] items-start gap-2 rounded-2xl border border-black/[0.08] bg-white/95 px-3 py-2 text-[12px] font-medium leading-[1.35] text-[#1d1d1f] shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl"
            >
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0066cc]" />
              <span className="flex-1">{bubbleText}</span>
              <button
                type="button"
                aria-label="Dismiss speech bubble"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="ml-1 text-[#7a7a7a] hover:text-[#1d1d1f]"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character & Action Toolbar */}
        <div className="group relative flex items-center justify-center">
          {/* Pet Character with Idle Bouncing Motion */}
          <motion.button
            type="button"
            aria-label="Interact with companion pet"
            onClick={handlePetClick}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85, rotate: [0, -10, 10, 0] }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              scale: springSnappy,
            }}
            className="pointer-events-auto relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white/85 text-3xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] backdrop-blur-md transition-shadow hover:shadow-[0_6px_24px_rgba(0,102,204,0.2)] border border-black/[0.06]"
          >
            {PET_AVATARS[avatarIndex]}
          </motion.button>

          {/* Quick controls pill shown on hover or when docked */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="pointer-events-auto absolute -top-8 flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/90 px-2 py-1 shadow-sm backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {/* Cycle Avatar */}
            <button
              type="button"
              title="Change pet avatar"
              onClick={cycleAvatar}
              className="p-0.5 text-[#7a7a7a] hover:text-[#0066cc] transition-colors"
            >
              <Smile className="h-3 w-3" />
            </button>

            {/* Toggle Dock / Follow mode (only on hover-capable devices) */}
            {hasHover && (
              <button
                type="button"
                title={isDocked ? "Follow cursor" : "Dock to corner"}
                onClick={toggleDock}
                className="p-0.5 text-[#7a7a7a] hover:text-[#0066cc] transition-colors"
              >
                {isDocked ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
              </button>
            )}

            {/* Sleep / Minimize */}
            <button
              type="button"
              title="Sleep companion"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
              className="p-0.5 text-[#7a7a7a] hover:text-[#1d1d1f] transition-colors"
            >
              <EyeOff className="h-3 w-3" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
