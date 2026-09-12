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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center text-[#1d1d1f]">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f7]">
        <AlertCircle className="h-7 w-7 text-[#b3261e]" />
      </div>
      <h2 className="display-md mb-4">Something went wrong.</h2>
      <p className="body-copy mb-8 max-w-md text-[#333333]">
        We encountered a failure fetching static dependencies or processing the requested component tree.
      </p>

      <div className="mb-8 w-full max-w-lg overflow-hidden rounded-[11px] border border-black/[0.08] bg-[#fafafc] p-4 text-left font-mono text-[13px] text-[#b3261e]">
        {error.message || "Unknown rendering exception."}
      </div>

      <button type="button" onClick={() => reset()} className="btn-primary active:scale-95">
        <RefreshCcw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
