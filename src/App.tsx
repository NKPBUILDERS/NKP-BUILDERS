import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Warranty from "./components/Warranty";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import LiveChat from "./components/LiveChat";
import AdminPanel from "./components/AdminPanel";
import { servicesData, projectsData, blogData, testimonialsData, faqData } from "./data";
import { MessageSquare, Calendar, Phone, Calculator, X, Sparkles, Send, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("");
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Content Database State
  const [dbContent, setDbContent] = useState({
    services: servicesData,
    projects: projectsData,
    blogs: blogData,
    testimonials: testimonialsData,
    faqs: faqData,
  });

  // Load from dynamic backend store on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        if (data && data.services) {
          setDbContent({
            services: data.services || servicesData,
            projects: data.projects || projectsData,
            blogs: data.blogs || blogData,
            testimonials: data.testimonials || testimonialsData,
            faqs: data.faqs || faqData,
          });
        }
      } catch (err) {
        console.error("Failed to load dynamic contents from server API. Fallback to bundled defaults active.", err);
      }
    };
    fetchContent();
  }, []);

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    location: "Chengalpattu",
    sqft: "1200",
    service: "",
    details: "",
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState("");
  const [quoteTicket, setQuoteTicket] = useState("");

  // EMI form state
  const [emiAmount, setEmiAmount] = useState<number>(1500000); // 15 Lakhs default
  const [emiTenure, setEmiTenure] = useState<number>(10); // 10 years default
  const [emiRate, setEmiRate] = useState<number>(8.5); // 8.5% p.a. default
  const [calculatedEmi, setCalculatedEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  // Handle active section on scroll
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "services",
      "projects",
      "warranty",
      "testimonials",
      "gallery",
      "blog",
      "faq",
      "contact",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Open Quote with pre-selected service
  const openQuoteWithService = (serviceName: string) => {
    setQuoteService(serviceName);
    setQuoteForm((prev) => ({ ...prev, service: serviceName || "Turnkey Civil Construction" }));
    setIsQuoteModalOpen(true);
    setQuoteSuccessMsg("");
    setQuoteTicket("");
  };

  // Submit quote handler
  const handleQuoteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.phone) {
      alert("Name and Phone are mandatory to secure a slot.");
      return;
    }

    setQuoteSubmitting(true);
    setQuoteSuccessMsg("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteForm),
      });

      const data = await response.json();
      if (data.success) {
        setQuoteSuccessMsg(data.message);
        setQuoteTicket(data.ticketID);
        setQuoteForm({
          name: "",
          phone: "",
          location: "Chengalpattu",
          sqft: "1200",
          service: "",
          details: "",
        });
      } else {
        setQuoteSuccessMsg("Submission failed. Please call Er. Prabhakaran at +91 96775 45615.");
      }
    } catch (err) {
      console.error(err);
      setQuoteSuccessMsg("Network connection error. Real-time estimate registered locally.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  // Calculate EMI dynamically
  useEffect(() => {
    const P = emiAmount;
    const r = emiRate / 12 / 100; // Monthly rate
    const n = emiTenure * 12; // Total months

    if (r === 0) {
      setCalculatedEmi(P / n);
      setTotalInterest(0);
      setTotalPayment(P);
      return;
    }

    const emiVal = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiVal * n;
    const totalInt = totalPay - P;

    setCalculatedEmi(Math.round(emiVal));
    setTotalInterest(Math.round(totalInt));
    setTotalPayment(Math.round(totalPay));
  }, [emiAmount, emiTenure, emiRate]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950 scroll-smooth">
      {/* Sticky Top Header */}
      <Header
        activeTab={activeSection}
        setActiveTab={(tab) => {
          setActiveSection(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        openQuoteModal={() => openQuoteWithService("")}
      />

      {/* Main Structural Page Sections */}
      <main className="flex-grow">
        <section id="home" className="scroll-mt-24">
          <Hero
            openQuoteModal={() => openQuoteWithService("")}
            setActiveTab={(tab) => {
              setActiveSection(tab);
              const el = document.getElementById(tab);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </section>

        <section id="about" className="scroll-mt-20">
          <About />
        </section>

        <section id="services" className="scroll-mt-20">
          <Services
            openQuoteWithService={openQuoteWithService}
            openEmiModal={() => setIsEmiModalOpen(true)}
            services={dbContent.services}
          />
        </section>

        <section id="projects" className="scroll-mt-20">
          <Projects projects={dbContent.projects} />
        </section>

        <section id="warranty" className="scroll-mt-20">
          <Warranty />
        </section>

        <section id="testimonials" className="scroll-mt-20">
          <Testimonials testimonials={dbContent.testimonials} />
        </section>

        <section id="gallery" className="scroll-mt-20">
          <Gallery />
        </section>

        <section id="blog" className="scroll-mt-20">
          <Blog blogs={dbContent.blogs} />
        </section>

        <section id="faq" className="scroll-mt-20">
          <FAQ faqs={dbContent.faqs} />
        </section>

        <section id="contact" className="scroll-mt-20">
          <ContactForm />
        </section>
      </main>

      {/* Corporate Comprehensive Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveSection(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        openQuoteModal={() => openQuoteWithService("")}
        openEmiModal={() => setIsEmiModalOpen(true)}
        openBrochureModal={() => {
          alert("Official NKP Builders Brochure requested!\n\nStandard Engineering Portfolio with catalog of completed structures in Chengalpattu and South Chennai suburbs will download shortly.");
        }}
        openPrivacyModal={() => {
          alert("NKP Builders Privacy Policy:\n\nWe prioritize customer privacy. All phone numbers, site addresses, and blueprints submitted for estimations are strictly secure and never sold to third-party marketing networks.");
        }}
        openTermsModal={() => {
          alert("NKP Builders Terms of Service:\n\n1. Free site visits are applicable within 40km of Chengalpattu headquarters.\n2. Written warranties require authorized application by our certified site supervisors.");
        }}
        openSitemapModal={() => {
          alert("NKP Builders Sitemap:\n\n- Home: Front slider, core metrics, licensed civil overview.\n- About Us: Journey, Values, Founder's personal note.\n- Services: 14 structural services list.\n- Projects: Before & After interactive slider, Completed works.\n- Warranty: Written guarantees, Certificate generator.\n- Testimonials: Client stars, Google scores.\n- Gallery: Custom images, walkthrough streams.\n- Blog: Educational guidelines.\n- FAQ: Structural doubts resolved.\n- Contact: Map, QR lines, visit scheduler.");
        }}
        openAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Admin Panel Controls */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            currentData={dbContent}
            onSaveSuccess={(updatedData) => setDbContent(updatedData)}
          />
        )}
      </AnimatePresence>

      {/* Live Chat Gemini Integration */}
      <LiveChat />

      {/* Floating Action Button (FAB) WhatsApp */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
        {/* Call FAB */}
        <a
          href="tel:+919677545615"
          className="bg-slate-900 text-white p-3.5 rounded-full shadow-2xl hover:bg-slate-800 border border-slate-700 transition-transform duration-300 hover:scale-110 cursor-pointer flex items-center justify-center"
          title="Call Now Support"
          id="fab-call"
        >
          <Phone className="w-5 h-5 text-amber-500" />
        </a>
        
        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/919677545615?text=Hello%20NKP%20Builders,%20I%20would%20like%20to%20request%20a%20free%20site%20visit."
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-transform duration-300 hover:scale-110 cursor-pointer flex items-center justify-center animate-bounce border-2 border-white"
          title="WhatsApp Support"
          id="fab-whatsapp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.282 3.507 8.484-.006 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.01 14.069.99 11.5.99c-5.438 0-9.863 4.374-9.868 9.804-.002 1.83.487 3.62 1.417 5.191L2.01 22.005l6.181-1.613c1.554.848 3.162 1.295 4.756 1.296zM17.476 14.41c-.3-.149-1.77-.874-2.043-.974-.274-.1-.474-.149-.674.15-.2.3-.77.974-.944 1.174-.173.2-.347.224-.647.075-.3-.15-1.264-.465-2.408-1.485-.89-.792-1.49-1.77-1.664-2.07-.173-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.5.1-.2.05-.375-.025-.524-.075-.15-.674-1.62-.924-2.22-.244-.589-.493-.51-.674-.519-.172-.01-.37-.012-.57-.012-.2 0-.523.075-.797.373-.273.3-1.045 1.02-1.045 2.487 0 1.468 1.07 2.885 1.22 3.085.15.2 2.106 3.22 5.1 4.506.713.306 1.269.49 1.703.63.716.227 1.368.195 1.884.118.575-.085 1.77-.724 2.02-1.419.25-.694.25-1.289.173-1.418-.074-.129-.274-.21-.574-.36z" />
          </svg>
        </a>
      </div>

      {/* 1. Modal Dialog: Free Site Visit / Request a Quote */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden relative text-left"
            >
              <div className="bg-slate-900 p-6 text-white relative">
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="absolute top-4 right-4 bg-slate-950/50 text-white p-1.5 rounded-full hover:bg-slate-950 transition-all cursor-pointer"
                  id="close-quote-modal-btn"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Secure Free Blueprint Service</span>
                </span>
                <h3 className="text-xl font-black tracking-tight mt-1">
                  Request a Free Site Visit & Quote
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your construction site details below. Our technical supervisor will visit within 24 hours.
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="p-6 flex flex-col gap-4 text-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 93639 XXXXX"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Proposed Location</label>
                    <input
                      type="text"
                      value={quoteForm.location}
                      onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Estimated Area (Sqft)</label>
                    <input
                      type="number"
                      value={quoteForm.sqft}
                      onChange={(e) => setQuoteForm({ ...quoteForm, sqft: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Service Category</label>
                  <select
                    value={quoteForm.service}
                    onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                  >
                    <option value="Turnkey Civil Construction">Turnkey Civil Construction</option>
                    <option value="Waterproofing Membrane Treatment">Dam Sheath Waterproofing</option>
                    <option value="Asian Paints Exterior Coats">Asian Paints Weather protection</option>
                    <option value="Luxury Interior Renovation">Luxury Interior fit-outs</option>
                    <option value="Building Concrete Maintenance">Building Structural Repair</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Specific Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Provide additional info, preferred slot timings, or critical dampness issues..."
                    value={quoteForm.details}
                    onChange={(e) => setQuoteForm({ ...quoteForm, details: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={quoteSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/15 cursor-pointer disabled:opacity-50 mt-2"
                  id="quote-modal-submit-btn"
                >
                  {quoteSubmitting ? "Registering..." : "Secure Free Site Visit Slot"}
                  <Send className="w-4 h-4" />
                </button>

                {quoteSuccessMsg && (
                  <div className="bg-emerald-500/5 border border-emerald-500/15 text-slate-900 rounded-xl p-4 mt-2 flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-emerald-950 block">Registered Successfully!</span>
                      <p className="mt-1 text-slate-600 font-semibold leading-relaxed">{quoteSuccessMsg}</p>
                      {quoteTicket && (
                        <span className="mt-2 inline-block bg-slate-950 text-white font-mono font-bold px-2.5 py-0.5 rounded text-[10px]">
                          Reference Ticket: {quoteTicket}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Modal Dialog: EMI / Budget Loan Calculator */}
      <AnimatePresence>
        {isEmiModalOpen && (
          <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden relative text-left"
            >
              <div className="bg-slate-900 p-6 text-white relative">
                <button
                  onClick={() => setIsEmiModalOpen(false)}
                  className="absolute top-4 right-4 bg-slate-950/50 text-white p-1.5 rounded-full hover:bg-slate-950 transition-all cursor-pointer"
                  id="close-emi-modal-btn"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Calculator className="w-4 h-4" />
                  <span>Joint Bank Loan Support</span>
                </span>
                <h3 className="text-xl font-black tracking-tight mt-1">
                  Construction Loan EMI Estimator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  NKP Builders acts as an official consulting partner with major commercial banks in Chengalpattu to secure structural loans up to 85% of values.
                </p>
              </div>

              <div className="p-6 flex flex-col gap-6 text-slate-700">
                {/* Inputs */}
                <div className="flex flex-col gap-4">
                  {/* Loan Slider */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>Loan Amount (INR)</span>
                      <span className="text-amber-600 text-sm">₹{(emiAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={emiAmount}
                      onChange={(e) => setEmiAmount(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>₹1 Lakh</span>
                      <span>₹50 Lakhs</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  {/* Tenure and Rate split */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tenure (Years)</label>
                      <select
                        value={emiTenure}
                        onChange={(e) => setEmiTenure(Number(e.target.value))}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                      >
                        <option value={3}>3 Years</option>
                        <option value={5}>5 Years</option>
                        <option value={10}>10 Years</option>
                        <option value={15}>15 Years</option>
                        <option value={20}>20 Years</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Interest Rate (% p.a.)</label>
                      <select
                        value={emiRate}
                        onChange={(e) => setEmiRate(Number(e.target.value))}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                      >
                        <option value={7.5}>7.5% (Elite Star)</option>
                        <option value={8.5}>8.5% (Standard Home)</option>
                        <option value={9.5}>9.5% (Commercial Plot)</option>
                        <option value={11.0}>11.0% (Personal/Renovate)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculation Results Block */}
                <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Monthly EMI</span>
                    <span className="text-xl font-black text-amber-500 font-mono">₹{calculatedEmi.toLocaleString("en-IN")}</span>
                    <span className="text-[9px] text-slate-500 font-medium">per month</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Total Interest</span>
                    <span className="text-sm font-bold text-slate-200 font-mono">₹{totalInterest.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Total Repayment</span>
                    <span className="text-sm font-bold text-slate-200 font-mono">₹{totalPayment.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Bank Loan support disclaimer */}
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex gap-3 items-center text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-slate-700 leading-snug">
                    We coordinate structural documents, approved corporation blueprints, estimation bills, and valuation maps required to secure loans. Zero processing hassle.
                  </span>
                </div>

                <div className="flex justify-end gap-3 mt-2 shrink-0">
                  <button
                    onClick={() => setIsEmiModalOpen(false)}
                    className="border border-slate-200 text-slate-600 font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Close Calculator
                  </button>
                  <button
                    onClick={() => {
                      setIsEmiModalOpen(false);
                      openQuoteWithService("Loan Estimation Consultation");
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-2.5 px-5 rounded-xl shadow shadow-amber-500/15 transition-all cursor-pointer"
                  >
                    Apply for Joint Loan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
