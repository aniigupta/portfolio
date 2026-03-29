"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

type Message = { id: number; text: string; sender: "bot" | "user" };

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm Aniket's AI assistant. Want to know about his tech stack, experience, or latest projects?", sender: "bot" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    
    const userMsg: Message = { id: Date.now(), text: inputVal, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulated AI Processing Delay
    setTimeout(() => {
      let botResponse = "I'm currently running in static mode, but Aniket specializes in Next.js, FastAPI, and building scalable full-stack applications. Would you like to shoot him an email to chat directly?";
      
      const lower = userMsg.text.toLowerCase();
      if (lower.includes("experience") || lower.includes("work")) {
        botResponse = "Aniket works as a Full Stack Developer at Anarish Innovations, and previously built a production FOIA AI extraction pipeline at Naarivo Creations!";
      } else if (lower.includes("stack") || lower.includes("skills") || lower.includes("tech")) {
        botResponse = "His core stack includes React/Next.js and Angular on the frontend, heavily paired with Node.js, FastAPI, and PostgreSQL on the backend. He also integrates LLMs heavily in his workflows!";
      } else if (lower.includes("project") || lower.includes("build")) {
        botResponse = "Take a look at AtEats (a high-performance MERN food platform) or his upcoming SaaS Aura, an AI Stylist! Scroll to the Case Studies section for deep dives.";
      } else if (lower.includes("hire") || lower.includes("contract") || lower.includes("freelance")) {
         botResponse = "He's currently open for new opportunities! You can book a 15-minute call using the button in the Contact Section, or email directly at aniiigupta23@gmail.com.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: "bot" }]);
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
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(139,92,246,0.4)] z-50 hover:scale-110 active:scale-95 transition-transform"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ y: -5 }}
          >
            <MessageSquare className="text-white w-6 h-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#030014] animate-pulse" aria-hidden="true"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-80 sm:w-96 bg-[#0a0a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
            style={{ height: '500px', maxHeight: '80vh' }}
            role="dialog"
            aria-labelledby="ai-chat-title"
          >
            {/* Header */}
            <div className="bg-primary/10 border-b border-primary/20 p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center relative">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-[#0a0a1a]"></span>
                </div>
                <div>
                  <h3 id="ai-chat-title" className="font-bold text-sm text-white flex items-center gap-1">Ask AI <Sparkles className="w-3 h-3 text-yellow-400" /></h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Online</p>
                </div>
              </div>
              <button 
                type="button"
                aria-label="Close AI chat assistant"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroller">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.sender === "user" ? "bg-white/10" : "bg-primary/20"}`}>
                    {msg.sender === "user" ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-primary/20 text-white rounded-tr-sm border border-primary/10" 
                      : "bg-white/5 text-gray-300 rounded-tl-sm border border-white/5"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex shrink-0 items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1 items-center">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/5 shrink-0">
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
                  className="w-full bg-[#030014] border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                />
                <button 
                  type="button"
                  aria-label="Send message"
                  onClick={handleSend}
                  disabled={!inputVal.trim() || isTyping}
                  className="absolute right-2 w-8 h-8 rounded-full bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:bg-primary/20 disabled:hover:text-primary"
                >
                  <Send className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" />
                </button>
              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
