import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, QrCode, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Free Site Visit Inquiry",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseTicket, setResponseTicket] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert("Please fill in all mandatory fields (Name, Phone, Message).");
      return;
    }

    setIsLoading(true);
    setResponseMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setResponseMsg(data.message);
        setResponseTicket(data.ticketID);
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "Free Site Visit Inquiry",
          message: "",
        });
      } else {
        setResponseMsg("Submission failed. Please try again or call us.");
      }
    } catch (error) {
      console.error(error);
      setResponseMsg("Connection error. Message could not be sent to server. Please try calling Er. Prabhakaran at +91 96775 45615.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white text-slate-800 font-sans" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Schedule a Free Site Visit <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              With Our Lead Engineer.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Have a land plot in Chengalpattu or a leaking roof in Kelambakkam? Send our team an inquiry. Mr.N.K.Praveen Kumar Diploma (Civil) will personally visit your premises, inspect with structural equipment, and provide detailed blueprints absolutely free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contacts Block - 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            
            {/* Quick trust metrics */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                NKP Builders Office
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-4 items-start text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-0.5">Office Address</span>
                    <span>No.389, Gangai Street, Mahalakshmi Nagar, Chengalpattu – Thiruporur Road, Tamil Nadu, India.</span>
                  </div>
                </li>

                <li className="flex gap-4 items-center text-xs sm:text-sm text-slate-600 font-semibold">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-0.5">Phone Support</span>
                    <a href="tel:+919677545615" className="hover:text-blue-900 text-slate-950 font-bold block">+91 96775 45615</a>
                    <a href="tel:+919363938677" className="hover:text-blue-900 text-slate-950 font-bold block mt-0.5">+91 93639 38677</a>
                  </div>
                </li>

                <li className="flex gap-4 items-center text-xs sm:text-sm text-slate-600 font-semibold">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-0.5">Corporate Email</span>
                    <a href="mailto:admin@nkpbuilders.com" className="hover:text-blue-900 text-slate-950 font-bold block">admin@nkpbuilders.com</a>
                  </div>
                </li>

                <li className="flex gap-4 items-start text-xs sm:text-sm text-slate-600 font-semibold">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold mb-0.5">Office Hours</span>
                    <span className="block text-slate-800 font-bold">9:00 AM – 7:00 PM</span>
                    <span className="text-[11px] text-slate-500 block">Monday to Saturday (Sunday Closed)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* WhatsApp QR Code */}
            <div className="bg-gradient-to-br from-emerald-950 to-teal-950 text-white rounded-2xl p-6 border border-emerald-900 flex flex-col sm:flex-row gap-6 items-center shadow-lg">
              <div className="bg-white p-3 rounded-xl shrink-0 shadow-lg border-2 border-emerald-500/20">
                {/* SVG mock represent QR */}
                <svg className="w-24 h-24 text-slate-950" viewBox="0 0 100 100">
                  <rect x="0" y="0" width="100" height="100" fill="white" />
                  <rect x="5" y="5" width="25" height="25" fill="black" />
                  <rect x="10" y="10" width="15" height="15" fill="white" />
                  <rect x="5" y="70" width="25" height="25" fill="black" />
                  <rect x="10" y="75" width="15" height="15" fill="white" />
                  <rect x="70" y="5" width="25" height="25" fill="black" />
                  <rect x="75" y="10" width="15" height="15" fill="white" />
                  {/* Random pixels for QR simulation */}
                  <rect x="40" y="20" width="10" height="10" fill="black" />
                  <rect x="55" y="35" width="15" height="10" fill="black" />
                  <rect x="40" y="50" width="20" height="15" fill="black" />
                  <rect x="75" y="55" width="10" height="20" fill="black" />
                  <rect x="15" y="45" width="10" height="15" fill="black" />
                  <circle cx="50" cy="50" r="8" fill="emerald" />
                </svg>
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block self-center sm:self-start">
                  WhatsApp Scan
                </span>
                <h4 className="text-base font-bold text-white tracking-tight mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  Instant WhatsApp Chat
                </h4>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Scan this QR code with your mobile camera to chat immediately with Mr.N.K.Praveen Kumar. Or click below to redirect.
                </p>
                <a
                  href="https://wa.me/919677545615?text=Hello%20NKP%20Builders,%20I%20would%20like%20to%20request%20a%20free%20site%20visit."
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-bold text-xs uppercase tracking-wider mt-2 flex items-center justify-center sm:justify-start gap-1"
                >
                  Click to Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>

          {/* Form Block - 7 columns */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm text-left relative">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-500" />
              <span>Contact & Visit Request Form</span>
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karthik R."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 96775 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. karthik@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Subject of Consultation</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="Free Site Visit Inquiry">Free Site Visit Request</option>
                    <option value="Residential Construction Estimate">New Building Construction</option>
                    <option value="Asian Paints Painting Plan">Painting & Weather shielding</option>
                    <option value="Waterproofing Dampness Cure">Dam Sheath Waterproofing</option>
                    <option value="Wall Crack polymer sealing">Structural Plaster Sealing</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Details of Your Project / Requirements *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your plot size, location (Chengalpattu, Thiruporur, etc.), or specific waterproofing leakage problems..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50 mt-2"
                id="contact-submit-btn"
              >
                {isLoading ? "Submitting..." : "Book Free Inspection Visit"}
                <Send className="w-4 h-4" />
              </button>

              {/* Response Messages */}
              {responseMsg && (
                <div className="bg-emerald-500/5 border border-emerald-500/15 text-slate-900 rounded-xl p-4 mt-4 flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-emerald-950 block">Form Filed successfully!</span>
                    <p className="mt-1 font-semibold leading-relaxed text-slate-600">{responseMsg}</p>
                    {responseTicket && (
                      <span className="mt-2 inline-block bg-slate-900 text-white font-mono font-bold px-2.5 py-0.5 rounded text-[10px]">
                        Reference Ticket: {responseTicket}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Real Google Map Integration */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-96 relative bg-slate-100">
          <iframe
            title="NKP Builders Office Location in Chengalpattu"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.02324393666!2d80.00394747513076!3d12.680324838641957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fbd1e7798363%3A0xc3cf93fcdcdfeaa9!2sMahalakshmi%20Nagar%2C%20Chengalpattu%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}export { QrCode };
