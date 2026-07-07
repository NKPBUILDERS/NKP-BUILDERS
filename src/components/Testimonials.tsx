import { motion } from "motion/react";
import { testimonialsData } from "../data";
import { Testimonial } from "../types";
import { Star, MessageSquare, Quote, MapPin, BadgeCheck } from "lucide-react";

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const activeTestimonials = testimonials || testimonialsData;

  return (
    <section className="py-20 bg-white text-slate-800 font-sans" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Words of Appreciation from <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Highly Pleased Homeowners.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            We do not talk about quality; we let our structures and homeowners speak on our behalf. Read the real experiences of IT professionals, retired professors, doctors, and business owners in Chengalpattu.
          </p>
        </div>

        {/* Google Reviews rating grid */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-left mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center font-black text-2xl text-slate-900 font-mono">
              4.9
            </div>
            <div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <h4 className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">
                Average Google Reviews Score
              </h4>
              <p className="text-[10px] text-slate-500">Based on 130+ verified homeowners in Chengalpattu, TN.</p>
            </div>
          </div>

          <div className="h-px w-full md:w-px md:h-12 bg-slate-200" />

          <div className="flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <div>
              <h5 className="text-xs font-bold text-slate-900">100% On-Time Delivery</h5>
              <p className="text-[10px] text-slate-500">Every single milestone delivered on schedule.</p>
            </div>
          </div>

          <div className="h-px w-full md:w-px md:h-12 bg-slate-200" />

          <div className="flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <div>
              <h5 className="text-xs font-bold text-slate-900">Zero Leakage Reoccurrence</h5>
              <p className="text-[10px] text-slate-500">Waterproofing membranes completely fail-safe.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeTestimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-amber-500/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
            >
              {/* Decorative quotation icon */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-200/50 pointer-events-none" />

              <div className="flex flex-col gap-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic font-medium">
                  "{test.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-200/60 mt-6 relative z-10">
                <div className="flex gap-3 items-center">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md bg-slate-300"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-none">{test.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1">{test.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] bg-slate-200 text-slate-600 font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full block">
                    {test.project}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 flex items-center justify-end gap-1 font-bold">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    {test.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to submit review */}
        <div className="mt-16 text-center max-w-md mx-auto">
          <p className="text-xs text-slate-500 font-semibold">
            Are you an existing customer of NKP Builders?
          </p>
          <button
            onClick={() => {
              const review = prompt("We appreciate your support! Please enter your review rating out of 5 stars:");
              if (review) alert("Thank you! Your feedback will be reviewed by Er. Prabhakaran and published shortly.");
            }}
            className="text-amber-600 hover:text-amber-700 font-black text-xs uppercase tracking-wider mt-1 cursor-pointer underline flex items-center justify-center gap-1.5 mx-auto"
          >
            <MessageSquare className="w-4 h-4" />
            Write a Google Review
          </button>
        </div>

      </div>
    </section>
  );
}
