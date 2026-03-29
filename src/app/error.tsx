"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-500/10 p-4 rounded-full mb-6 relative">
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse"></div>
        <AlertCircle className="w-12 h-12 text-red-500 relative z-10" />
      </div>
      <h2 className="text-3xl font-black mb-4">Architecture Runtime Error</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We encountered a critical failure fetching static dependencies or processing the requested component tree.
      </p>
      
      <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left font-mono text-sm text-red-400 mb-8 max-w-lg w-full overflow-hidden">
        {error.message || "Unknown rendering exception."}
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
      >
        <RefreshCcw className="w-5 h-5" />
        Force Re-render
      </button>
    </div>
  );
}
