import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqData } from "../data";
import { FAQItem } from "../types";
import { ChevronDown, HelpCircle, MessagesSquare, Phone } from "lucide-react";

interface FAQProps {
  faqs?: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General & Visits" },
    { id: "construction", label: "Structural Civil" },
    { id: "painting", label: "Painting & Finishes" },
    { id: "warranty", label: "Written Warranties" },
  ];

  const activeFaqs = faqs || faqData;

  const filteredFaqs = activeFaqs.filter((faq) => {
    return activeTab === "all" || faq.category === activeTab;
  });

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-800 font-sans" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Answers to Your Structural <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              and Estimation Doubts.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            We operate with absolute transparency. Review our categorized answers regarding municipal planning approvals, timelines, warranty terms, and free structural inspections.
          </p>
        </div>

        {/* Tab category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setOpenIdx(null);
              }}
              className={`px-4 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === cat.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  id={`faq-btn-${idx}`}
                >
                  <div className="flex gap-3 items-start">
                    <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100"
                    >
                      <div className="p-5 sm:p-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions block */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 mt-12 border border-slate-800 text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-3 items-start">
            <MessagesSquare className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-white text-sm">Still have questions regarding budget loans or Vaastu layouts?</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Our AI Assistant is available 24/7 on the bottom-right corner to calculate precise structures!
              </p>
            </div>
          </div>
          <a
            href="tel:+919677545615"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            Talk to our engineer
          </a>
        </div>

      </div>
    </section>
  );
}
