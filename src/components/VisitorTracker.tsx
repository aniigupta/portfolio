"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    // Generate or retrieve unique Session ID from sessionStorage to maintain tracking across page reloads
    let sessId = sessionStorage.getItem("portfolio_sess_id");
    let startTimeStr = sessionStorage.getItem("portfolio_sess_start");
    
    if (!sessId || !startTimeStr) {
      sessId = "sess_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now().toString(36);
      startTimeStr = Date.now().toString();
      sessionStorage.setItem("portfolio_sess_id", sessId);
      sessionStorage.setItem("portfolio_sess_start", startTimeStr);
    }
    
    sessionIdRef.current = sessId;
    startTimeRef.current = parseInt(startTimeStr, 10);

    const sendTelemetry = (eventType: "start" | "heartbeat" | "end" | "stayed_5s", finalDuration?: number) => {
      const name = sessionStorage.getItem("visitor_name") || "";
      const hasSentEmail = sessionStorage.getItem("has_sent_email") || "false";
      const totalDuration = finalDuration !== undefined ? finalDuration : Math.round((Date.now() - startTimeRef.current) / 1000);
      
      const payload = {
        sessionId: sessionIdRef.current,
        eventType,
        duration: totalDuration,
        referrer: document.referrer || "Direct / Typed URL",
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        pathname: window.location.pathname,
        name,
        // Send email only when they land and stay at least 5s, triggered on stayed_5s (reliable) or end/visibility hiding, and once per session
        shouldEmail: (eventType === "end" || eventType === "stayed_5s") && totalDuration >= 5 && hasSentEmail === "false"
      };

      if (payload.shouldEmail) {
        sessionStorage.setItem("has_sent_email", "true");
      }

      const url = "/api/telemetry";
      const body = JSON.stringify(payload);

      if (eventType === "end") {
        // keepalive: true ensures request successfully is sent even during page close/exit
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true
        }).catch((err) => console.warn("Telemetry unload error:", err));
      } else {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body
        }).catch((err) => console.warn("Telemetry ping error:", err));
      }
    };

    // Defer start event slightly to let DOM stabilize
    const startTimeout = setTimeout(() => {
      sendTelemetry("start");
    }, 1000);

    // Send email telemetry stayed_5s event after 5.5 seconds to reliably send email on both mobile and desktop while in the foreground
    const emailTimeout = setTimeout(() => {
      sendTelemetry("stayed_5s");
    }, 5500);

    // Heartbeat every 30 seconds to track active state
    const interval = setInterval(() => {
      sendTelemetry("heartbeat");
    }, 30000);

    // Send final exit payload
    const handleUnload = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      sendTelemetry("end", duration);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handleUnload();
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(emailTimeout);
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Track interior SPA routing changes
  useEffect(() => {
    if (sessionIdRef.current) {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          eventType: "navigate",
          duration,
          pathname,
          referrer: document.referrer || "Direct / Typed URL",
          name: sessionStorage.getItem("visitor_name") || "",
          shouldEmail: false
        })
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
