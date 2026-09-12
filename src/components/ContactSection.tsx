"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users, Mail, MapPin, Phone, Github, Linkedin, CalendarCheck, Code, ChevronDown, Check, X, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { fadeUp, springSnappy, springSoft, viewportOnce } from "../lib/motion";

export default function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Full-Time Opportunity");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState<{ show: boolean; type: "success" | "error"; message: string } | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjects = [
    { id: "project", label: "SaaS MVP Concept" },
    { id: "job", label: "Full-Time Opportunity" },
    { id: "general", label: "General Networking" }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (toast && toast.show) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const optionEl = document.getElementById(`subject-option-${focusedIndex}`);
      optionEl?.focus();
    }
  }, [focusedIndex, isOpen]);

  // Opening the listbox always resets the roving focus index
  const openDropdown = () => {
    setFocusedIndex(-1);
    setIsOpen(true);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      const btn = document.getElementById("subject-button");
      btn?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % subjects.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prevItem) => (prevItem - 1 + subjects.length) % subjects.length);
    } else if (e.key === "Enter" || e.key === " ") {
      if (focusedIndex >= 0 && focusedIndex < subjects.length) {
        e.preventDefault();
        setSelectedSubject(subjects[focusedIndex].label);
        setIsOpen(false);
        const btn = document.getElementById("subject-button");
        btn?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    let sessionDuration = 0;
    if (typeof window !== "undefined") {
      const startTimeStr = sessionStorage.getItem("portfolio_sess_start");
      if (startTimeStr) {
        const startTime = parseInt(startTimeStr, 10);
        sessionDuration = Math.round((Date.now() - startTime) / 1000);
      }
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      workType: formData.get("workType"),
      message: formData.get("message"),
      referrer: typeof document !== "undefined" ? document.referrer || "Direct / Typed URL" : "Direct / Typed URL",
      screenSize: typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "unknown",
      timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "unknown",
      language: typeof navigator !== "undefined" ? navigator.language : "unknown",
      duration: sessionDuration,
    };

    if (data.name) {
      sessionStorage.setItem("visitor_name", String(data.name));
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setSelectedSubject("Full-Time Opportunity");
        setToast({
          show: true,
          type: "success",
          message: "Thank you! Your message has been sent successfully."
        });
      } else {
        const errorData = await response.json();
        const msg = errorData.error || "Something went wrong.";
        setErrorMessage(msg);
        setStatus("error");
        setToast({
          show: true,
          type: "error",
          message: msg
        });
      }
    } catch (err) {
      console.error(err);
      const msg = "Connection error. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
      setToast({
        show: true,
        type: "error",
        message: msg
      });
    }
  };

  return (
    <section id="contact" className="tile tile-light">
      <div className="tile-inner">
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="eyebrow mb-3">Get in touch</span>
          <h2 className="display-lg mb-4 text-[#1d1d1f]">Let&apos;s connect.</h2>
          <p className="lead mx-auto max-w-2xl text-[#333333]">
            Have a project in mind, need a full-stack architect, or just want to talk shop?
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <motion.div
              className="space-y-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <a
                href="mailto:aniiigupta23@gmail.com?subject=Booking a Call"
                className="surface-card group flex items-center justify-between p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="caption-strong text-[#1d1d1f]">Book a call</h3>
                    <p className="caption mt-1 text-[#7a7a7a]">Schedule a 15-min discovery call</p>
                  </div>
                </div>
                <span className="text-link caption-strong">→</span>
              </a>

              <a
                href="mailto:aniiigupta23@gmail.com?subject=Hire Me Inquiry"
                className="surface-card group flex items-center justify-between p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="caption-strong text-[#1d1d1f]">Hire me</h3>
                    <p className="caption mt-1 text-[#7a7a7a]">Full-time / contract opportunities</p>
                  </div>
                </div>
                <span className="text-link caption-strong">→</span>
              </a>

              <div className="surface-card flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="caption block text-[#7a7a7a]">Direct email</span>
                  <span className="caption-strong text-[#1d1d1f]">aniiigupta23@gmail.com</span>
                </div>
              </div>

              <a href="tel:+918076206264" className="surface-card flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="caption block text-[#7a7a7a]">Phone</span>
                  <span className="caption-strong text-[#1d1d1f]">+91 80762 06264</span>
                </div>
              </a>

              <div className="surface-card flex items-center gap-4 p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-[#1d1d1f]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="caption block text-[#7a7a7a]">Location</span>
                  <span className="caption-strong text-[#1d1d1f]">Delhi / NCR, India</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {[
                  { Icon: Github, href: "https://github.com/aniigupta", label: "GitHub Profile" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/aniket-gupta-564758226/", label: "LinkedIn Profile" },
                  { Icon: Mail, href: "mailto:aniiigupta23@gmail.com", label: "Send Email" }
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-colors hover:text-[#0066cc]"
                    whileTap={{ scale: 0.95 }}
                    transition={springSnappy}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              className="surface-card space-y-7 p-8 md:p-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="caption-strong ml-1 block text-[#1d1d1f]">Name</label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a7a7a]" />
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Aarav Patel"
                      className="field-input py-3.5 pl-11 pr-4"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="caption-strong ml-1 block text-[#1d1d1f]">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7a7a7a]" />
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="aarav@example.com"
                      className="field-input py-3.5 pl-11 pr-4"
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-30 space-y-2" ref={dropdownRef}>
                <label id="subject-label" className="caption-strong ml-1 block text-[#1d1d1f]">Subject</label>
                <div className="relative" onKeyDown={handleDropdownKeyDown}>
                  <button
                    id="subject-button"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby="subject-label"
                    aria-controls="subject-listbox"
                    onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
                    className={`field-input flex items-center justify-between px-5 py-3.5 text-left ${
                      isOpen ? "border-[#0071e3] shadow-[0_0_0_3px_rgba(0,113,227,0.18)]" : ""
                    }`}
                  >
                    <span className={selectedSubject ? "text-[#1d1d1f]" : "text-[#7a7a7a]"}>
                      {selectedSubject || "Select a subject"}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-[#7a7a7a] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0066cc]" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id="subject-listbox"
                        role="listbox"
                        aria-labelledby="subject-label"
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 8, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={springSoft}
                        className="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-[11px] border border-black/[0.08] bg-white"
                      >
                        {subjects.map((subject, index) => (
                          <button
                            key={subject.id}
                            id={`subject-option-${index}`}
                            type="button"
                            role="option"
                            aria-selected={selectedSubject === subject.label}
                            tabIndex={-1}
                            onClick={() => {
                              setSelectedSubject(subject.label);
                              setIsOpen(false);
                              const btn = document.getElementById("subject-button");
                              btn?.focus();
                            }}
                            className="flex w-full items-center justify-between px-5 py-3.5 text-left outline-none transition-colors hover:bg-[#f5f5f7] focus:bg-[#f5f5f7]"
                          >
                            <span className={selectedSubject === subject.label ? "text-[#0066cc]" : "text-[#1d1d1f]"}>
                              {subject.label}
                            </span>
                            {selectedSubject === subject.label && <Check className="h-4 w-4 text-[#0066cc]" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <input type="hidden" name="workType" value={selectedSubject} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="caption-strong ml-1 block text-[#1d1d1f]">Message</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Let me know how I can help..."
                  className="field-input resize-none px-5 py-4"
                ></textarea>
              </div>

              <div className="min-h-[20px]">
                {status === "success" && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="caption text-center text-[#1a7f4b]">
                    Message sent! I&apos;ll get back to you shortly.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="caption text-center text-[#b3261e]">
                    {errorMessage}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
                whileTap={{ scale: 0.95 }}
                transition={springSnappy}
              >
                {status === "loading" ? "Sending..." : "Send message"}
                <Send className={`h-4 w-4 ${status === "loading" ? "animate-pulse" : ""}`} />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            transition={springSoft}
            className="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-4 rounded-[18px] border border-black/[0.08] bg-[rgba(255,255,255,0.92)] p-4 backdrop-blur-xl"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success" ? "bg-[#d9f0e3] text-[#1a7f4b]" : "bg-[#f5dede] text-[#b3261e]"
              }`}
            >
              {toast.type === "success" ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="caption-strong text-[#1d1d1f]">
                {toast.type === "success" ? "Message sent" : "Error sending message"}
              </h4>
              <p className="fine-print mt-0.5 leading-relaxed text-[#7a7a7a]">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss notification"
              className="rounded-full p-1 text-[#7a7a7a] transition-colors hover:text-[#1d1d1f]"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
