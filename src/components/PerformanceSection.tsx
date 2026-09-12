"use client";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, CheckCircle2, Code, Gauge, Image as ImageIcon, LineChart, Server } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeUp, springSnappy, staggerContainer, viewportOnce } from "../lib/motion";

const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const stepTime = Math.abs(Math.floor((duration * 1000) / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const LighthouseRing = () => {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="6" />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#0066cc"
          strokeWidth="6"
          strokeDasharray="282.74"
          initial={{ strokeDashoffset: 282.74 }}
          whileInView={{ strokeDashoffset: 5.65 }} // 98% of 282.74 is ~277.08 taken -> Leaves 5.65
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="hero-display text-[#1d1d1f]">
          <AnimatedCounter value={98} duration={2.2} />
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
            <h2 className="display-lg mb-5 text-[#1d1d1f]">
              I turn slow websites into lightning-fast experiences.
            </h2>
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
            <motion.div
              variants={fadeUp}
              className="surface-card flex flex-col items-center justify-center p-10 text-center lg:col-span-5"
            >
              <LighthouseRing />
              <p className="caption mt-7 max-w-[16rem] text-[#333333]">
                Consistently engineering Vercel/Next.js deployments to hit peak Core Web Vitals.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              <motion.div variants={fadeUp} className="surface-card flex flex-col justify-center p-8">
                <span className="hero-display mb-2 text-[#1d1d1f]">
                  <AnimatedCounter value={40} suffix="%" />
                </span>
                <span className="caption-strong text-[#1d1d1f]">Smaller JS payloads</span>
                <p className="caption mt-3 text-[#333333]">
                  Achieved via aggressive dynamic importing and strict bundle analysis.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="surface-card flex flex-col justify-center p-8">
                <span className="hero-display mb-2 text-[#1d1d1f]">1.2s</span>
                <span className="caption-strong text-[#1d1d1f]">Average LCP time</span>
                <p className="caption mt-3 text-[#333333]">
                  Prioritizing critical above-the-fold assets to paint near-instantly on mobile.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Unoptimized vs Engineered */}
      <div className="tile tile-parchment">
        <div className="tile-inner">
          <motion.h3
            className="display-md mb-10 text-center text-[#1d1d1f]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            The architectural difference.
          </motion.h3>

          <motion.div
            className="grid gap-5 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp} className="rounded-[18px] border border-[#e0cfcf] bg-[#fdf4f4] p-8 md:p-11">
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
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <AlertTriangle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#b3261e]" />
                    <span className="caption text-[#333333]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[18px] border border-[#c9dfd2] bg-[#f2faf5] p-8 md:p-11">
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
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#1a7f4b]" />
                    <span className="caption text-[#333333]">{item}</span>
                  </li>
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="surface-card p-8 md:p-11">
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
                    {rows.map((row) => (
                      <tr key={row.metric} className="border-b border-[#f0f0f0] transition-colors last:border-0 hover:bg-[#fafafc]">
                        <td className="caption px-4 py-4 text-[#1d1d1f]">{row.metric}</td>
                        <td className="caption px-4 py-4 text-center text-[#7a7a7a] line-through">{row.before}</td>
                        <td className="caption-strong px-4 py-4 text-center text-[#0066cc]">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.h3
            className="display-md mb-10 text-center text-[#1d1d1f]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            What I optimize.
          </motion.h3>

          <motion.div
            className="flex flex-wrap justify-center gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {vectors.map((vec) => (
              <motion.div key={vec.title} variants={fadeUp} className="surface-card min-w-[17rem] flex-1 p-6">
                <vec.icon className="mb-4 h-5 w-5 text-[#0066cc]" />
                <h4 className="caption-strong mb-2 text-[#1d1d1f]">{vec.title}</h4>
                <p className="caption text-[#333333]">{vec.desc}</p>
              </motion.div>
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
          <h3 className="display-lg mb-5 text-white">
            Is your web app bleeding users?
          </h3>
          <p className="lead mb-9 text-[#cccccc]">
            If your initial load exceeds 3 seconds, you&apos;re losing up to 50% of your traffic. Let&apos;s rewrite
            your bottlenecks.
          </p>
          <motion.a href="#contact" className="btn-primary" whileTap={{ scale: 0.95 }} transition={springSnappy}>
            Get a full performance audit
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
