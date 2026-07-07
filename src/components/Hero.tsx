import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Calendar, ArrowRight, ShieldCheck, Award, Star, Compass } from "lucide-react";

interface HeroProps {
  openQuoteModal: () => void;
  setActiveTab: (tab: string) => void;
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    title: "Building Trust.",
    highlight: "Delivering Quality.",
    sub: "Turnkey residential villas, individual house constructions, and custom architectural layouts in Chengalpattu.",
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=80",
    title: "Asian Paints",
    highlight: "Authorized Painting.",
    sub: "Flawless interior wall finishing and 5-Year exterior weather-proofing layouts built for severe Tamil Nadu heat.",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
    title: "Leakproof",
    highlight: "Waterproofing Guard.",
    sub: "Signature Dam Sheath system with written 5-Year guarantees for terrace, kitchen slabs and basements.",
  },
];

export default function Hero({ openQuoteModal, setActiveTab }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      {/* Background Image Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95) 40%, rgba(15, 23, 42, 0.5) 100%), url(${slides[currentSlide].image})`,
            }}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Decorative Grid overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Slide Content */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-full text-xs text-amber-500 font-semibold uppercase tracking-widest shadow-lg shadow-amber-500/5"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Chengalpattu's #1 Construction Firm</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                {slides[currentSlide].title} <br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {slides[currentSlide].highlight}
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mt-4 leading-relaxed font-normal">
                {slides[currentSlide].sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-4 w-full sm:w-auto"
          >
            <button
              onClick={openQuoteModal}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-7 py-4 rounded-xl font-bold tracking-tight shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 group cursor-pointer text-sm w-full sm:w-auto justify-center"
              id="hero-site-visit-btn"
            >
              <Calendar className="w-4 h-4" />
              Get Free Site Visit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+919677545615"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-7 py-4 rounded-xl font-bold tracking-tight transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto shadow-lg"
            >
              <Phone className="w-4 h-4 text-amber-500 animate-pulse" />
              Call Now: +91 96775 45615
            </a>
          </motion.div>

          {/* Quick Credibility Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-slate-800/80 w-full"
          >
            <div className="flex items-start gap-2.5">
              <Compass className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">100% Vasthu</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Approved layouts</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Award className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">Licensed MD</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Er. Prabhakaran B.E.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h5 className="text-white text-xs sm:text-sm font-bold tracking-tight">5 Yrs Warranty</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Written guarantee</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Glassmorphism Cost Estimator Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-5 bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl text-slate-200 shadow-slate-950 flex flex-col gap-5 relative overflow-hidden"
        >
          {/* Decorative radial lighting */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />

          <div>
            <div className="flex items-center gap-1.5 mb-1 text-xs text-amber-500 font-bold tracking-widest uppercase">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>Instant Budget Planner</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Civil Estimation Tool
            </h3>
            <p className="text-xs text-slate-400 leading-snug mt-1">
              Calculate construction cost approximations instantly according to our TN standard package rates.
            </p>
          </div>

          <QuickCostEstimator setActiveTab={setActiveTab} />
        </motion.div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? "bg-amber-500 w-8" : "bg-slate-700 hover:bg-slate-600"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Nested Quick Estimator Component
function QuickCostEstimator({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [area, setArea] = useState<number>(1200);
  const [packageType, setPackageType] = useState<"standard" | "premium" | "luxury">("premium");

  const pricing = {
    standard: 2500,
    premium: 2800,
    luxury: 3000,
  };

  const calculatedCost = area * pricing[packageType];

  return (
    <div className="flex flex-col gap-4">
      {/* Slider */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
          <span>Built-up Area (Sq.Ft.)</span>
          <span className="text-amber-500 font-bold font-mono text-sm">{area} Sq.Ft.</span>
        </div>
        <input
          type="range"
          min="500"
          max="10000"
          step="50"
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full accent-amber-500 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>500 Sq.Ft.</span>
          <span>10,000 Sq.Ft.</span>
        </div>
      </div>

      {/* Material Package selection */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-slate-300">Material Package Select:</span>
        <div className="grid grid-cols-3 gap-2">
          {(["standard", "premium", "luxury"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setPackageType(type)}
              className={`py-2 px-1 text-[11px] font-bold rounded-lg uppercase border transition-all cursor-pointer ${
                packageType === type
                  ? "bg-amber-500 text-slate-950 border-amber-500 font-black shadow-lg shadow-amber-500/10"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 text-left mt-0.5 italic">
          {packageType === "standard" && "Standard steel, ISO bricks, standard vitrified flooring."}
          {packageType === "premium" && "JSW/TATA steel, UltraTech cement, Kajaria tile alignments."}
          {packageType === "luxury" && "Architectural custom floor heights, polished marbles, automation."}
        </p>
      </div>

      {/* Price results */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex justify-between items-center mt-2">
        <div className="text-left">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">Approximate Cost</span>
          <span className="text-2xl font-black text-white font-mono leading-none">
            ₹{calculatedCost.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="text-right text-[11px] text-slate-400 font-medium">
          Rate: <span className="text-amber-500 font-bold font-mono">₹{pricing[packageType]} / sqft</span>
        </div>
      </div>

      {/* Submit Quote */}
      <button
        onClick={() => {
          setActiveTab("contact");
          window.scrollTo(0, 0);
        }}
        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
      >
        Book consultation with Er. Prabhakaran
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
