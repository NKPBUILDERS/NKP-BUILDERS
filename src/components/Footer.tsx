import { Phone, Mail, MapPin, ArrowUp, Send, CheckCircle2, ShieldAlert } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
  openEmiModal: () => void;
  openBrochureModal: () => void;
  openPrivacyModal: () => void;
  openTermsModal: () => void;
  openSitemapModal: () => void;
  openAdminModal?: () => void;
}

export default function Footer({
  setActiveTab,
  openQuoteModal,
  openEmiModal,
  openBrochureModal,
  openPrivacyModal,
  openTermsModal,
  openSitemapModal,
  openAdminModal,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 p-2.5 rounded-lg font-black tracking-wider text-xl shadow-md shadow-amber-500/10">
                NKP
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">NKP BUILDERS</h3>
                <p className="text-[10px] text-amber-500 uppercase tracking-widest mt-0.5 font-bold">
                  Building Trust. Delivering Quality.
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium Civil Contractors, licensed builders, and authorized structural experts based in Chengalpattu, Tamil Nadu. Committed to delivering unmatched longevity.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-amber-500 font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Asian Paints Authorized</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-amber-500 font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dam Sheath Certified Partner</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[15px] uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Quick Portals
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button
                  onClick={() => { setActiveTab("about"); window.scrollTo(0, 0); }}
                  className="hover:text-amber-500 transition-colors cursor-pointer text-slate-400 font-medium"
                >
                  Our Profile & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab("services"); window.scrollTo(0, 0); }}
                  className="hover:text-amber-500 transition-colors cursor-pointer text-slate-400 font-medium"
                >
                  Bespoke Construction & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab("projects"); window.scrollTo(0, 0); }}
                  className="hover:text-amber-500 transition-colors cursor-pointer text-slate-400 font-medium"
                >
                  Filtered Portfolio Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab("warranty"); window.scrollTo(0, 0); }}
                  className="hover:text-amber-500 transition-colors cursor-pointer text-slate-400 font-medium"
                >
                  5-Year Warranty Details
                </button>
              </li>
              <li>
                <button
                  onClick={openEmiModal}
                  className="text-amber-500 hover:text-amber-400 transition-colors font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>EMI / Construction Loan Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openBrochureModal}
                  className="hover:text-amber-500 transition-colors cursor-pointer text-slate-400 font-medium text-left"
                >
                  Download Corporate Brochure
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Tamil Nadu Locations Served */}
          <div>
            <h4 className="text-white font-semibold text-[15px] uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">
              Regional Services (Tamil Nadu)
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Chengalpattu", "Thiruporur", "Kelambakkam", "Mahabalipuram", "Chennai City", "Guduvanchery", "Tambaram", "Vandalur", "Sembakkam", "Singaperumal Koil", "Maraimalai Nagar"].map((loc) => (
                <span
                  key={loc}
                  className="bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-full hover:border-amber-500/30 hover:text-amber-500 transition-all font-medium"
                >
                  {loc}
                </span>
              ))}
            </div>
            <div className="mt-5 text-xs text-slate-400 leading-relaxed italic flex gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Free site inspection is active within 40km radius of Chengalpattu headquarters.</span>
            </div>
          </div>

          {/* Address and Newsletter */}
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-white font-semibold text-[15px] uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                HQ Address
              </h4>
              <ul className="space-y-3.5 text-sm text-slate-400 font-medium">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>No.389, Gangai Street, Mahalakshmi Nagar, Chengalpattu – Thiruporur, TN, India.</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href="tel:+919677545615" className="hover:text-amber-500 transition-colors">+91 96775 45615</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <a href="mailto:admin@nkpbuilders.com" className="hover:text-amber-500 transition-colors">admin@nkpbuilders.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-white font-medium text-xs uppercase tracking-wider mb-3">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500 font-medium"
                />
                <button
                  onClick={() => alert("Thank you for subscribing to our weekly construction and home care tips!")}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2.5 rounded transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Sitemap, Copyright */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div>
            <p>Copyright © {currentYear} <span className="text-slate-400 font-bold">NKP BUILDERS</span>. All Rights Reserved.</p>
            <p className="mt-1 text-[10px] text-slate-600">Company Registration No: SL/CH-2016-TN-415</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={openPrivacyModal} className="hover:text-amber-500 transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={openTermsModal} className="hover:text-amber-500 transition-colors cursor-pointer">Terms & Conditions</button>
            <button onClick={openSitemapModal} className="hover:text-amber-500 transition-colors cursor-pointer">Sitemap</button>
            {openAdminModal && (
              <button onClick={openAdminModal} className="hover:text-amber-500 transition-colors cursor-pointer text-slate-400 font-bold flex items-center gap-1">
                <span>•</span> Admin Portal
              </button>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 p-2.5 rounded-full text-slate-400 transition-all shadow-lg cursor-pointer flex items-center justify-center"
            title="Scroll to Top"
            id="scroll-top-btn"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
