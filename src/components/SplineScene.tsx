"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";



export default function SplineScene() {
  const SplineViewer = 'spline-viewer' as any;

  return (
    <div className="w-full h-full relative pointer-events-auto overflow-hidden">
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
