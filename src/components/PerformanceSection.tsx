"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Code, Gauge, Image as ImageIcon, LineChart, Server } from "lucide-react";
import { useEffect, useRef } from "react";
import { fadeUp, riseIn, springSnappy, staggerContainer, viewportOnce } from "../lib/motion";
import Counter from "./ui/Counter";
import RevealHeading from "./ui/RevealHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Magnetic from "./ui/Magnetic";

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SCORE = 98;

/**
 * Lighthouse gauge. Anime.js runs the arc sweep and the score count-up on one
 * timeline, so the number and the ring land on 98 at exactly the same moment -
 * the reason this is worth a second animation library rather than two
 * independent tweens drifting apart.
 */
const LighthouseRing = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(wrapperRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    const arc = arcRef.current;
    const score = scoreRef.current;
    if (!arc || !score) return;

    const endOffset = CIRCUMFERENCE * (1 - SCORE / 100);

    if (prefersReducedMotion) {
      arc.style.strokeDashoffset = String(endOffset);
      score.textContent = String(SCORE);
      return;
    }

    let cancelled = false;
    const counter = { value: 0 };

    import("animejs").then(({ createTimeline, utils }) => {
      if (cancelled || !arcRef.current) return;

      createTimeline({ defaults: { duration: 2100, ease: "outExpo" } })
        .add(arcRef.current, { strokeDashoffset: [CIRCUMFERENCE, endOffset] }, 0)
        .add(
          counter,
          {
            value: SCORE,
            onUpdate: () => {
              if (scoreRef.current) scoreRef.current.textContent = String(utils.round(counter.value, 0));
            },
            onComplete: () => {
              if (scoreRef.current) scoreRef.current.textContent = String(SCORE);
            },
          },
          0
        );
    });

    return () => {
      cancelled = true;
    };
  }, [isInView, prefersReducedMotion]);

  return (
    <div ref={wrapperRef} className="relative flex h-44 w-44 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#f0f0f0" strokeWidth="6" />
        <circle
          ref={arcRef}
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="#0066cc"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="hero-display text-[#1d1d1f]" aria-label={`Lighthouse performance score ${SCORE}`}>
          <span ref={scoreRef}>0</span>
        </span>
        <span className="caption mt-1 text-[#7a7a7a]">Performance</span>
      </div>
    </div>
  );
};

export default function PerformanceSection() {
  const vectors = [
    { icon: Gauge, title: "Core Web Vitals", desc: "Optimizing LCP, CLS, and INP metrics to sub-second thresholds for flawless Lighthouse scores." },
    { icon: ImageIcon, title: "Image Optimization", desc: "Aggressive next/image sizing, priority loading, and format conversion (WebP/AVIF) via Cloudinary." },
    { icon: Code, title: "Dynamic Code Splitting", desc: "Drastically reducing First Load JS by dynamically importing off-screen components and libraries." },
    { icon: LineChart, title: "Technical SEO", desc: "Injecting rigid OG metadata tags, dynamic sitemaps, and strict JSON-LD structured schema." },
    { icon: Server, title: "Edge Caching & API", desc: "Implementing Redis caching layers, route handlers, and Incremental Static Regeneration (ISR)." }
  ];

  const rows = [
    { metric: "Interaction to Next Paint (INP)", before: "280ms", after: "80ms" },
    { metric: "Largest Contentful Paint (LCP)", before: "3.2s", after: "1.2s" },
    { metric: "Cumulative Layout Shift (CLS)", before: "0.18", after: "0.01" }
  ];

  return (
    <section id="performance">
      <div className="tile tile-light">
        <div className="tile-inner">
          <motion.div
            className="mx-auto mb-14 max-w-3xl text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow mb-3">Speed. SEO. Scale.</span>
            <RevealHeading
              text="I turn slow websites into lightning-fast experiences."
              className="display-lg mb-5 text-[#1d1d1f]"
            />
            <p className="lead text-[#333333]">
              Systems architected for real-world performance — plummeting bounce rates, rising search rankings.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 lg:grid-cols-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <SpotlightCard
              variants={riseIn}
              lift={false}
              className="surface-card flex flex-col items-center justify-center p-10 text-center lg:col-span-5"
            >
              <LighthouseRing />
              <p className="caption mt-7 max-w-[16rem] text-[#333333]">
                Consistently engineering Vercel/Next.js deployments to hit peak Core Web Vitals.
              </p>
            </SpotlightCard>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              <SpotlightCard variants={riseIn} className="surface-card flex flex-col justify-center p-8">
                <span className="hero-display mb-2 text-[#1d1d1f]">
                  <Counter value={40} suffix="%" />
                </span>
                <span className="caption-strong text-[#1d1d1f]">Smaller JS payloads</span>
                <p className="caption mt-3 text-[#333333]">
                  Achieved via aggressive dynamic importing and strict bundle analysis.
                </p>
              </SpotlightCard>

              <SpotlightCard variants={riseIn} className="surface-card flex flex-col justify-center p-8">
                <span className="hero-display mb-2 text-[#1d1d1f]">1.2s</span>
                <span className="caption-strong text-[#1d1d1f]">Average LCP time</span>
                <p className="caption mt-3 text-[#333333]">
                  Prioritizing critical above-the-fold assets to paint near-instantly on mobile.
                </p>
              </SpotlightCard>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Unoptimized vs Engineered */}
      <div className="tile tile-parchment">
        <div className="tile-inner">
          <RevealHeading
            text="The architectural difference."
            as="h3"
            className="display-md mb-10 text-center text-[#1d1d1f]"
          />

          <motion.div
            className="grid gap-5 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={riseIn} className="rounded-[18px] border border-[#e0cfcf] bg-[#fdf4f4] p-8 md:p-11">
              <h4 className="tagline mb-7 flex items-center gap-3 text-[#1d1d1f]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5dede] text-[13px] text-[#b3261e]">✗</span>
                Unoptimized
              </h4>
              <ul className="space-y-5">
                {[
                  "Massive 4MB initial synchronous JS bundle",
                  "Layout shifting (CLS) from unconstrained images",
                  "Empty index metadata (horrible SEO SERP presence)",
                  "Main thread blocked by heavy third-party tracking"
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3.5"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  >
                    <AlertTriangle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#b3261e]" />
                    <span className="caption text-[#333333]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={riseIn} className="rounded-[18px] border border-[#c9dfd2] bg-[#f2faf5] p-8 md:p-11">
              <h4 className="tagline mb-7 flex items-center gap-3 text-[#1d1d1f]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d9f0e3] text-[13px] text-[#1a7f4b]">✓</span>
                Engineered
              </h4>
              <ul className="space-y-5">
                {[
                  "Strict sub-100kb initial lazy-loaded Javascript",
                  "Pre-calculated image dimensions with next/image",
                  "Rigid JSON-LD Schema & OpenGraph meta-tags",
                  "Edge-cached route handlers & Off-thread workers"
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-3.5"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  >
                    <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#1a7f4b]" />
                    <span className="caption text-[#333333]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Live case study + optimization vectors */}
      <div className="tile tile-light">
        <div className="tile-inner">
          <motion.div
            className="mx-auto mb-20 max-w-4xl"
            variants={riseIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <SpotlightCard className="surface-card p-8 md:p-11" lift={false}>
              <h3 className="display-md text-[#1d1d1f]">Live case study: this portfolio.</h3>
              <p className="caption mb-8 mt-2 text-[#7a7a7a]">
                Refining Next.js architecture for optimal Google Lighthouse metrics.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#e0e0e0]">
                      <th className="caption-strong w-1/2 px-4 py-3.5 text-[#7a7a7a]">Metric (Google Web Vitals)</th>
                      <th className="caption-strong px-4 py-3.5 text-center text-[#7a7a7a]">Standard build</th>
                      <th className="caption-strong px-4 py-3.5 text-center text-[#0066cc]">Engineered result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <motion.tr
                        key={row.metric}
                        className="border-b border-[#f0f0f0] transition-colors last:border-0 hover:bg-[#fafafc]"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={{ delay: 0.12 + i * 0.09, duration: 0.5 }}
                      >
                        <td className="caption px-4 py-4 text-[#1d1d1f]">{row.metric}</td>
                        <td className="caption px-4 py-4 text-center text-[#7a7a7a] line-through">{row.before}</td>
                        <td className="caption-strong px-4 py-4 text-center text-[#0066cc]">{row.after}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SpotlightCard>
          </motion.div>

          <RevealHeading text="What I optimize." as="h3" className="display-md mb-10 text-center text-[#1d1d1f]" />

          <motion.div
            className="flex flex-wrap justify-center gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {vectors.map((vec) => (
              <SpotlightCard
                key={vec.title}
                variants={riseIn}
                className="surface-card group min-w-[17rem] flex-1 p-6"
              >
                <vec.icon className="mb-4 h-5 w-5 text-[#0066cc] transition-transform duration-500 ease-out group-hover:scale-110" />
                <h4 className="caption-strong mb-2 text-[#1d1d1f]">{vec.title}</h4>
                <p className="caption text-[#333333]">{vec.desc}</p>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="tile tile-dark">
        <motion.div
          className="tile-inner-narrow text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <RevealHeading text="Is your web app bleeding users?" as="h3" className="display-lg mb-5 text-white" />
          <p className="lead mb-9 text-[#cccccc]">
            If your initial load exceeds 3 seconds, you&apos;re losing up to 50% of your traffic. Let&apos;s rewrite
            your bottlenecks.
          </p>
          <Magnetic strength={0.4} max={13}>
            <motion.a href="#contact" className="btn-primary" whileTap={{ scale: 0.95 }} transition={springSnappy}>
              Get a full performance audit
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
