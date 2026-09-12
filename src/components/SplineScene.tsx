"use client";
import { Suspense, type ElementType } from "react";
import { motion } from "framer-motion";
import Script from "next/script";

export default function SplineScene() {
  // Custom element registered at runtime by the Spline viewer script
  const SplineViewer = 'spline-viewer' as unknown as ElementType;

  return (
    <div className="w-full h-full relative pointer-events-auto overflow-hidden">
      <Script 
        src="https://unpkg.com/@splinetool/viewer@1.12.86/build/spline-viewer.js" 
        type="module"
        strategy="afterInteractive"
      />
      <Suspense fallback={<SplineLoader />}>
        <SplineViewer 
          url="https://prod.spline.design/c1f5LCvI-LgdMzfQ/scene.splinecode"
          loading-anim-type="none"
          background="transparent"
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
}

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-32 h-32 rounded-full bg-primary/20 blur-2xl"
      />
    </div>
  );
}
