"use client";
import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { springSnappy, springSoft } from "../lib/motion";

type Message = { id: number; text: string; sender: "bot" | "user" };

const neverChanges = () => () => {};

// The greeting depends on sessionStorage, which only exists on the client.
// Reading it through a cached snapshot keeps the first bubble stable across
// re-renders (it must not rewrite itself once the visitor gives their name).
let greetingSnapshot: Message[] | null = null;

const getClientGreeting = (): Message[] => {
  if (!greetingSnapshot) {
    const savedName = sessionStorage.getItem("visitor_name");
    greetingSnapshot = [
      {
        id: 1,
        text: savedName
          ? `Hi ${savedName}! I'm Aniket's AI assistant. Want to know about his tech stack, experience, or latest projects?`
          : "Hi! I'm Aniket's AI assistant. What is your name?",
        sender: "bot",
      },
    ];
  }
  return greetingSnapshot;
};

const NO_GREETING: Message[] = [];

export default function AIChatBot() {
  const greeting = useSyncExternalStore(neverChanges, getClientGreeting, () => NO_GREETING);
  const mounted = greeting.length > 0;

  const [isOpen, setIsOpen] = useState(false);
  const [thread, setThread] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = [...greeting, ...thread];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (mounted) {
      scrollToBottom();
    }
  }, [thread, isTyping, mounted]);

  if (!mounted) return null;

  const handleSend = async () => {
    if (!inputVal.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputVal, sender: "user" };
    setThread(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    const savedName = sessionStorage.getItem("visitor_name");

    // Simulated AI Processing Delay
    setTimeout(() => {
      if (!savedName) {
        // Save user input as their name
        const nameInput = userMsg.text.trim();
        sessionStorage.setItem("visitor_name", nameInput);

        // Instantly notify telemetry endpoint of the name update
        fetch("/api/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionStorage.getItem("portfolio_sess_id") || "unknown",
            eventType: "name_update",
            name: nameInput,
            shouldEmail: false
          })
        }).catch(() => {});

        const botResponse = `Nice to meet you, ${nameInput}! 😊 I can help you learn about Aniket's experience, tech stack, or projects. What would you like to know?`;
        setThread(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
        setIsTyping(false);
        return;
      }

      let botResponse = "I'm currently running in static mode, but Aniket specializes in Next.js, FastAPI, and building scalable full-stack applications. Would you like to shoot him an email to chat directly?";

      const lower = userMsg.text.toLowerCase();
      if (lower.includes("experience") || lower.includes("work")) {
        botResponse = "Aniket works as a Full Stack Developer at Anarish Innovations, and previously built a production FOIA AI extraction pipeline at Naarivo Creations!";
      } else if (lower.includes("stack") || lower.includes("skills") || lower.includes("tech")) {
        botResponse = "His core stack includes React/Next.js and Angular on the frontend, heavily paired with Node.js, Express, FastAPI, and PostgreSQL on the backend. He also builds LLM automation pipelines and RAG chatbots, and ships with Docker, Railway and Render.";
      } else if (lower.includes("project") || lower.includes("build")) {
        botResponse = "He built AuraHRMS (a multi-module HRMS with RBAC and a RAG-based HR chatbot) and AtEats (a MERN food ordering platform with Stripe payments) end to end - see the Selected Work section. At Anarish he also shipped the IMS SaaS platform, Servitium CRM and Ops Suite Global, listed under Experience.";
      } else if (lower.includes("hire") || lower.includes("contract") || lower.includes("freelance")) {
         botResponse = "He's currently open for new opportunities! You can book a 15-minute call using the button in the Contact Section, email aniiigupta23@gmail.com, or call +91 80762 06264.";
      }

      setThread(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            aria-label="Open AI chat assistant"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0066cc] text-white lg:bottom-10 lg:right-10"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.95 }}
            transition={springSnappy}
          >
            <MessageSquare className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#30d158]" aria-hidden="true"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-[18px] border border-black/[0.08] bg-white sm:w-96 lg:bottom-10 lg:right-10"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.2 } }}
            transition={springSoft}
            style={{ height: '500px', maxHeight: '80vh' }}
            role="dialog"
            aria-labelledby="ai-chat-title"
          >
            {/* Header - frosted parchment, matching the sub-nav grammar */}
            <div className="flex shrink-0 items-center justify-between border-b border-[#f0f0f0] bg-[rgba(245,245,247,0.85)] p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1d1d1f]">
                  <Bot className="h-4 w-4" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#30d158]"></span>
                </div>
                <div>
                  <h3 id="ai-chat-title" className="caption-strong text-[#1d1d1f]">Ask AI</h3>
                  <p className="fine-print text-[#7a7a7a]">Online</p>
                </div>
              </div>
              <motion.button
                type="button"
                aria-label="Close AI chat assistant"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#7a7a7a] transition-colors hover:text-[#1d1d1f]"
                whileTap={{ scale: 0.95 }}
                transition={springSnappy}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="scroller flex-1 space-y-3 overflow-y-auto bg-white p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] rounded-[18px] px-4 py-2.5 text-[15px] leading-[1.4] tracking-[-0.01em] ${
                      msg.sender === "user"
                        ? "bg-[#0066cc] text-white"
                        : "bg-[#f5f5f7] text-[#1d1d1f]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-[18px] bg-[#f5f5f7] px-4 py-3.5">
                    {[0, 0.2, 0.4].map((delay) => (
                      <motion.span
                        key={delay}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay }}
                        className="h-1.5 w-1.5 rounded-full bg-[#7a7a7a]"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t border-[#f0f0f0] bg-white p-3">
              <div className="relative flex items-center">
                <label htmlFor="chat-message" className="sr-only">Type your message</label>
                <input
                  id="chat-message"
                  name="chat-message"
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="field-input rounded-full py-2.5 pl-4 pr-12 text-[15px]"
                />
                <motion.button
                  type="button"
                  aria-label="Send message"
                  onClick={handleSend}
                  disabled={!inputVal.trim() || isTyping}
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#0066cc] text-white transition-opacity disabled:opacity-40"
                  whileTap={{ scale: 0.95 }}
                  transition={springSnappy}
                >
                  <Send className="h-3.5 w-3.5 translate-x-[-1px]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
