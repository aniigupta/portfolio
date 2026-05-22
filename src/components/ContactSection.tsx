"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users, Mail, MapPin, Github, Linkedin, CalendarCheck, Code, ChevronDown, Check, X, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
    if (isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const optionEl = document.getElementById(`subject-option-${focusedIndex}`);
      optionEl?.focus();
    }
  }, [focusedIndex, isOpen]);

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
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

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      workType: formData.get("workType"),
      message: formData.get("message"),
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
    <section id="contact" className="mb-40 pt-20">
      <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">Let&apos;s Connect</h2>
        <p className="text-gray-300 text-lg max-w-xl">Have a sophisticated project in mind, need a full-stack architect, or just want to chat about the latest in AI and tech?</p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          {/* Smart Contact Options */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
            <a href="mailto:aniiigupta23@gmail.com?subject=Booking a Call" className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all flex items-center justify-between group shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 group-hover:bg-primary/40 transition-colors">
                  <CalendarCheck className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-primary transition-colors">Book a Call</h3>
                  <p className="text-sm text-gray-300 mt-1">Schedule a 15-min discovery call</p>
                </div>
              </div>
              <span className="text-primary font-bold">-&gt;</span>
            </a>

            <a href="mailto:aniiigupta23@gmail.com?subject=Hire Me Inquiry" className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary/50 hover:-translate-y-1 transition-all flex items-center justify-between group shadow-lg">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-xl border border-primary/30 group-hover:bg-primary/40 transition-colors">
                  <Code className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-primary transition-colors">Hire Me</h3>
                  <p className="text-sm text-gray-300 mt-1">Full-Time / Contract opportunities</p>
                </div>
              </div>
              <span className="text-primary font-bold">-&gt;</span>
            </a>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-center gap-6 p-6 glass-card rounded-2xl border border-white/5 shadow-inner hover:border-primary/20 transition-all">
              <div className="bg-primary/20 p-3 rounded-xl"><Mail className="text-primary w-5 h-5" /></div>
              <div>
                <span className="text-xs uppercase font-bold text-gray-300 block mb-1">Direct Email</span>
                <span className="font-bold text-sm">aniiigupta23@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 glass-card rounded-2xl border border-white/5 shadow-inner hover:border-primary/20 transition-all">
              <div className="bg-primary/20 p-3 rounded-xl"><MapPin className="text-primary w-5 h-5" /></div>
              <div>
                <span className="text-xs uppercase font-bold text-gray-300 block mb-1">Location</span>
                <span className="font-bold text-sm">Delhi / NCR, India</span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/aniigupta", label: "GitHub Profile" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/aniket-gupta-564758226/", label: "LinkedIn Profile" },
              { Icon: Mail, href: "mailto:aniiigupta23@gmail.com", label: "Send Email" }
            ].map(({ Icon, href, label }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={label} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:border-primary/50 cursor-pointer transition-all hover:scale-110 hover:-translate-y-2 group shadow-lg">
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card p-10 md:p-12 rounded-[2.5rem] space-y-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3 relative z-10">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-300 ml-1">Name</label>
                <div className="relative group hover:-translate-y-1 transition-transform duration-300">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                  <input required id="name" name="name" type="text" autoComplete="name" placeholder="Aarav Patel" className="w-full bg-[#0a0a1a]/80 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/60 focus:bg-[#030014]/50 hover:border-primary/30 transition-all font-medium placeholder:text-gray-600 shadow-inner" />
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-300 ml-1">Email</label>
                <div className="relative group hover:-translate-y-1 transition-transform duration-300">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                  <input required id="email" name="email" type="email" autoComplete="email" placeholder="aarav@example.com" className="w-full bg-[#0a0a1a]/80 backdrop-blur-sm border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/60 focus:bg-[#030014]/50 hover:border-primary/30 transition-all font-medium placeholder:text-gray-600 shadow-inner" />
                </div>
              </div>
            </div>

            <div className="space-y-3 relative z-30" ref={dropdownRef}>
              <label id="subject-label" className="text-sm font-bold uppercase tracking-widest text-gray-300 ml-1">Subject</label>
              <div className="relative" onKeyDown={handleDropdownKeyDown}>
                <button
                  id="subject-button"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isOpen}
                  aria-labelledby="subject-label"
                  aria-controls="subject-listbox"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full bg-[#0a0a1a]/80 backdrop-blur-sm border border-white/10 rounded-2xl py-4 px-6 flex items-center justify-between transition-all hover:border-primary/30 shadow-inner hover:-translate-y-1 duration-300 ${isOpen ? 'border-primary/50 ring-2 ring-primary/20' : ''}`}
                >
                  <span className={`font-medium ${selectedSubject ? 'text-white' : 'text-gray-500'}`}>
                    {selectedSubject || "Select a subject"}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id="subject-listbox"
                      role="listbox"
                      aria-labelledby="subject-label"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 z-50 mt-2 bg-[#0d0d1a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
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
                          className="w-full px-6 py-4 text-left hover:bg-primary/10 flex items-center justify-between transition-colors group outline-none focus:bg-primary/15"
                        >
                          <span className={`font-medium transition-colors ${selectedSubject === subject.label ? 'text-primary' : 'text-gray-300 group-hover:text-white'}`}>
                            {subject.label}
                          </span>
                          {selectedSubject === subject.label && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input type="hidden" name="workType" value={selectedSubject} />
            </div>

            <div className="space-y-3 relative z-10">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-300 ml-1">Message</label>
              <textarea required id="message" name="message" rows={5} placeholder="Let me know how I can help..." className="w-full bg-[#0a0a1a]/80 backdrop-blur-sm border border-white/10 rounded-2xl py-6 px-6 outline-none focus:border-primary/60 focus:bg-[#030014]/50 hover:border-primary/30 transition-all resize-none font-medium placeholder:text-gray-600 shadow-inner hover:-translate-y-1 duration-300"></textarea>
            </div>

            <div className="min-h-[20px]">
              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 font-bold text-sm text-center">
                  Message sent! I&apos;ll get back to you shortly.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 font-bold text-sm text-center">
                  {errorMessage}
                </motion.p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={status === "loading"}
              className={`w-full bg-violet-700 hover:bg-violet-600 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-[0_15px_40px_rgba(76,29,149,0.35)] flex items-center justify-center gap-3 active:scale-[0.98] group hover:scale-[1.02] relative z-10 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {status === "loading" ? "Deploying..." : "Deploy Your Idea"}
              <Send className={`w-5 h-5 transition-transform duration-300 ${status === "loading" ? 'animate-pulse' : 'group-hover:translate-x-2 group-hover:-translate-y-2'}`} />
            </button>
          </motion.form>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#0d0d1a]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(139,92,246,0.15)] max-w-sm"
          >
            <div className={`p-2.5 rounded-xl border flex items-center justify-center ${
              toast.type === "success" 
                ? "bg-green-500/10 border-green-500/30 text-green-400" 
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {toast.type === "success" ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white text-sm">
                {toast.type === "success" ? "Message Sent!" : "Error Sending Message"}
              </h4>
              <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button 
              type="button"
              onClick={() => setToast(null)} 
              className="p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
