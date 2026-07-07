import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, ShieldCheck, CornerDownLeft } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! Welcome to NKP BUILDERS. I am your AI Construction and Renovation Consultant. Er. N. K. Prabhakaran B.E. (Civil) trained me. Ask me about building estimates, Asian Paints warranties, Vaastu, or Dam Sheath waterproofing systems!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || isLoading) return;

    const userMessage: Message = {
      sender: "user",
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const promptToSend = inputMsg;
    setInputMsg("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptToSend }),
      });

      const data = await response.json();
      const botResponse: Message = {
        sender: "bot",
        text: data.text || "I apologize. I'm having trouble calculating this estimate right now. Please call Er. Prabhakaran B.E. directly at +91 96775 45615 for a precise structural quotation.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error(error);
      const errorResponse: Message = {
        sender: "bot",
        text: "It seems we are in offline mode. Don't worry! NKP Builders provides 100% Free Site Visits. Would you like to directly dial +91 96775 45615?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-4.5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white group relative"
            id="chat-toggle-btn"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            {/* Quick tooltip */}
            <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-slate-800 whitespace-nowrap shadow-xl hidden group-hover:inline-block">
              Consult NKP AI Advisor
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="bg-slate-950 border border-slate-800 shadow-2xl rounded-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden relative"
          >
            {/* Chat header */}
            <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 p-2.5 rounded-xl">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-none flex items-center gap-1">
                    NKP Civil Advisor
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Gemini 3.5 AI Enabled</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 cursor-pointer"
                id="chat-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Body lists */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg, index) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] text-xs text-left ${
                      isBot ? "self-start items-start" : "self-end items-end"
                    }`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl font-medium leading-relaxed ${
                        isBot
                          ? "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800"
                          : "bg-amber-500 text-slate-950 font-bold rounded-tr-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="self-start flex gap-1 items-center bg-slate-900 border border-slate-850 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat footer input */}
            <form
              onSubmit={handleSendMessage}
              className="bg-slate-900 border-t border-slate-800 p-3 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder="Ask about construction sqft rates..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="bg-slate-950 text-slate-200 border border-slate-800 text-xs rounded-xl px-4.5 py-3 w-full focus:outline-none focus:border-amber-500 font-semibold"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-3 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
                title="Send Inquiry"
                id="chat-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
