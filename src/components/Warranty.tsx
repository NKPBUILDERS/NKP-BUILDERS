import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Award, FileText, Check, Download, BadgeCheck, Phone, HelpCircle } from "lucide-react";

export default function Warranty() {
  const [clientName, setClientName] = useState("");
  const [propertyLoc, setPropertyLoc] = useState("Chengalpattu");
  const [warrantyType, setWarrantyType] = useState("Dam Sheath Waterproofing");
  const [generatedCert, setGeneratedCert] = useState(false);

  const handleDownload = () => {
    if (!clientName.trim()) {
      alert("Please enter your name to authorize the certificate.");
      return;
    }
    setGeneratedCert(true);
  };

  const terms = [
    "The warranty is active exclusively on paint coatings or waterproofing installations applied completely by NKP Builders specialized supervisors.",
    "The warranty covers paint peeling, bubbling, and water seepage occurrences from concrete roofs in designated treated zones.",
    "Physical or mechanical damages to the membrane caused by subsequent plumbing or electrical chisel works will void the warranty.",
    "Annual inspection checks are free of charge. In case of localized dampness leaks, NKP Builders will patch and repair the coat immediately at zero service charges."
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-800 font-sans" id="warranty-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Official Warranty Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Written Assurances. <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Decades of Mental Peace.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Many builders make spoken promises that wash away in the first South India rain. At NKP Builders, we believe in structural accountability. We supply official written, stamped warranty certificates for our painting and waterproofing projects.
          </p>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Asian Paints Warranty Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm text-left flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 hover:shadow-xl transition-all duration-300">
            {/* Background seal glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 text-amber-500 p-3 rounded-xl border border-amber-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">5 Years Asian Paints Warranty</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Exterior Weather Shield System</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                Applies to Apex Ultima Protek and weatherproofing outer emulsion paint schemes. We verify plaster moisture thresholds with digital gauges before laying paint primers, ensuring zero thermal peeling and maximum anti-algae preservation.
              </p>

              <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Resists fading under intense Tamil Nadu UV sun</span>
                </div>
                <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Bridges micro-plaster cracks up to 1.5mm wide</span>
                </div>
                <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Backed directly by paint manufacturer certification</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-500">Protection Level</span>
              <span className="text-emerald-600 font-black uppercase">Elite Shield</span>
            </div>
          </div>

          {/* Dam Sheath Waterproofing Warranty Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm text-left flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 hover:shadow-xl transition-all duration-300">
            {/* Background seal glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-500 p-3 rounded-xl border border-blue-100">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">Dam Sheath Waterproofing Guarantee</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Terrace, Kitchen & Bathroom Slabs</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                Our proprietary waterproofing solution integrates highly elastic crystalline polymers and water-barrier micro-fibers. Tested under extreme 48-hour continuous flood ponding, we guarantee 100% moisture blockage and zero efflorescence peeling.
              </p>

              <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>5-Year written, stamped legal warranty card</span>
                </div>
                <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Protects ceiling concrete reinforcements from rusting</span>
                </div>
                <div className="flex gap-2 items-center text-xs text-slate-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free annual inspection visits by Mr.N.K.Praveen Kumar</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-500">Protection Level</span>
              <span className="text-blue-600 font-black uppercase">100% Leakproof</span>
            </div>
          </div>
        </div>

        {/* Dynamic Warranty Card Generator Widget */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 relative overflow-hidden">
          {/* Radial light */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />

          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <BadgeCheck className="w-4 h-4" />
              <span>Interactive Digital Service</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Review Your Warranty Card Layout
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your details to generate a customized visual preview of your official NKP Builders Warranty Certificate, designed according to engineering standard sheets.
            </p>

            <div className="flex flex-col gap-3 mt-2 text-slate-300">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. R. Karthikeyan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Property Location</label>
                  <input
                    type="text"
                    value={propertyLoc}
                    onChange={(e) => setPropertyLoc(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Warranty Type</label>
                  <select
                    value={warrantyType}
                    onChange={(e) => setWarrantyType(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="Dam Sheath Waterproofing">Waterproofing</option>
                    <option value="Asian Paints Weatherproofing">Asian Paints Exterior</option>
                    <option value="Standard Structural Civil">Civil Structural</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 mt-2 cursor-pointer shadow-lg shadow-amber-500/10"
                id="generate-warranty-btn"
              >
                <FileText className="w-4 h-4" />
                Generate Warranty Certificate
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {generatedCert ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-stone-50 text-slate-900 border-4 border-double border-amber-600 p-6 sm:p-8 rounded-2xl relative shadow-2xl text-center"
                >
                  <div className="absolute top-4 left-4 text-[9px] uppercase tracking-wider font-extrabold text-amber-700">
                    ID: NKP-W{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-xl sm:text-2xl font-serif text-amber-800 font-black uppercase tracking-wider border-b-2 border-amber-600/30 pb-1.5">
                      Certificate of Warranty
                    </div>
                    
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      Officially Issued By NKP Builders
                    </p>

                    <div className="my-2 flex flex-col gap-1">
                      <p className="text-[11px] text-slate-500 italic">This document certifies that the property owned by</p>
                      <p className="text-base font-black text-slate-900 tracking-tight font-serif uppercase underline decoration-amber-500 decoration-wavy mt-1">
                        {clientName}
                      </p>
                      <p className="text-[11px] text-slate-500 italic mt-1">located in <span className="font-bold text-slate-800">{propertyLoc}</span> is fully covered under the</p>
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mt-1.5 inline-block mx-auto">
                        {warrantyType} System
                      </p>
                    </div>

                    <p className="text-[10px] text-slate-500 max-w-sm leading-relaxed">
                      NKP Builders guarantees leak-proof and weather protection longevity for a full period of <span className="font-bold text-slate-800">5 Years</span>. Any moisture recurrence in treated areas will be resolved immediately at zero material and service costs.
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-200 mt-2 text-left">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Authorized Signatory</span>
                        <span className="text-[11px] font-bold text-slate-800 font-serif block mt-1">Mr.N.K.Praveen Kumar</span>
                        <span className="text-[9px] text-slate-500">Diploma (Civil), MD</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Active Date</span>
                        <span className="text-[11px] font-bold text-slate-800 block mt-1">July 5, 2026</span>
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">● ACTIVE COVERAGE</span>
                      </div>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] uppercase tracking-wider py-2 px-4 rounded-lg flex items-center gap-1 transition-all cursor-pointer mt-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Print / Download Certificate
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-72 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                  <ShieldCheck className="w-12 h-12 text-slate-700 mb-2 animate-pulse" />
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Waiting for Certificate inputs</p>
                  <p className="text-[11px] text-slate-600 max-w-xs mt-1">
                    Fill in your name and select the coverage type on the left to review the official digital security seal.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Terms Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-left shadow-sm">
          <h4 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Warranty Terms & General Guidelines</span>
          </h4>
          <ul className="space-y-3.5 text-xs text-slate-600">
            {terms.map((term, idx) => (
              <li key={idx} className="flex gap-3 items-start font-medium leading-relaxed">
                <span className="bg-slate-100 text-slate-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
