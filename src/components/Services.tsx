import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../data";
import { ServiceItem } from "../types";
import { Check, ClipboardList, HelpCircle, PhoneCall, AlertCircle, Sparkles, ChevronRight, Calculator } from "lucide-react";

interface ServicesProps {
  openQuoteWithService: (serviceName: string) => void;
  openEmiModal: () => void;
  services?: ServiceItem[];
}

export default function Services({ openQuoteWithService, openEmiModal, services }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const activeServices = services || servicesData;

  return (
    <section className="py-20 bg-slate-50 text-slate-800 font-sans" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Bespoke Construction & Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Custom Engineering for <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Every Architectural Challenge.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            We offer specialized structural services. From building your primary villa to advanced moisture waterproofing systems, premium tile alignment overlays, and official Asian Paints contract executions.
          </p>
        </div>

        {/* Callouts */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12 text-xs font-semibold">
          <div className="bg-white border border-slate-200 shadow-sm px-4 py-2.5 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Asian Paints Authorized Application</span>
          </div>
          <div className="bg-white border border-slate-200 shadow-sm px-4 py-2.5 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Dam Sheath Leak-proof Guarantee</span>
          </div>
          <button
            onClick={openEmiModal}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-full flex items-center gap-2 shadow shadow-amber-500/20 transition-all cursor-pointer font-bold"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate EMI / Budget Loan</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(idx * 0.05, 0.3) }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col group text-left h-full"
            >
              {/* Service Image banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Float Estimation Label */}
                <div className="absolute bottom-3 left-4 bg-slate-950/80 backdrop-blur border border-slate-800 text-[11px] text-amber-400 font-bold px-3 py-1 rounded-full">
                  Approx: {service.priceEst}
                </div>
              </div>

              {/* Service Details Card Body */}
              <div className="p-6 flex flex-col flex-grow gap-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight line-clamp-1">
                  {service.title}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>

                {/* Key bullets */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Key Advantages:</span>
                  {service.benefits.slice(0, 2).map((b, i) => (
                    <div key={i} className="flex gap-2 items-start text-[11px] text-slate-600 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer controls */}
              <div className="p-6 pt-0 mt-auto grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedService(service)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                  id={`srv-details-${service.id}`}
                >
                  Read More
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => openQuoteWithService(service.title)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 rounded-lg shadow shadow-amber-500/10 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  id={`srv-quote-${service.id}`}
                >
                  Get Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Repair hotline banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 mt-16 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
          <div className="flex gap-4 items-start">
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-500 mt-1">
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-tight">Need Urgent Dampness Proofing or Plaster Repair?</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                NKP Builders operates a dedicated mobile repair team in Chengalpattu. We can reach your site within 2 hours to perform moisture analysis and provide quick crack repair estimates.
              </p>
            </div>
          </div>
          <a
            href="tel:+919677545615"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-amber-500/5 hover:scale-[1.02] cursor-pointer"
          >
            Emergency Call: +91 96775 45615
          </a>
        </div>
      </div>

      {/* Detail Slideover or Dialog Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col text-left"
            >
              {/* Image and Header */}
              <div className="relative h-56 shrink-0 bg-slate-900">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-white p-2 rounded-full border border-slate-800 hover:bg-slate-900 transition-all cursor-pointer"
                  id="close-service-modal-btn"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] bg-amber-500 text-slate-950 uppercase tracking-widest font-black px-2.5 py-1 rounded">
                    {selectedService.priceEst}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable details content */}
              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
                <div>
                  <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-amber-500" />
                    <span>In-depth Description</span>
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedService.details}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>Key Architectural Benefits</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex gap-3 items-start">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 font-semibold leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Local Area Warning */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Regional Availability</h5>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Our customized {selectedService.title} works are highly sought after in Chengalpattu, Thiruporur, and Kelambakkam. Site visits are 100% free with no obligation to purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50 flex justify-between gap-4 items-center">
                <span className="text-xs text-slate-500 font-medium">Free site planning is included.</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="border border-slate-200 text-slate-600 font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const title = selectedService.title;
                      setSelectedService(null);
                      openQuoteWithService(title);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 px-5 rounded-xl shadow shadow-amber-500/10 transition-all cursor-pointer"
                    id="modal-request-visit-btn"
                  >
                    Book Free Visit
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
