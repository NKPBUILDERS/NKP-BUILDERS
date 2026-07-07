import { motion } from "motion/react";
import { Award, Eye, Rocket, CheckCircle2, ShieldCheck, Heart, User } from "lucide-react";

export default function About() {
  const coreValues = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "Unyielding Quality",
      desc: "We verify concrete slump rates, structural steel indices, and authorized paint dry thickness. No shortcuts.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "Written Warranties",
      desc: "Every contract includes structural, waterproofing, and paint weather-protection written guarantees.",
    },
    {
      icon: <Heart className="w-6 h-6 text-amber-500" />,
      title: "Absolute Integrity",
      desc: "Transparent material ledgers, no hidden estimations, and absolute Vasthu shastra compliant blueprints.",
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            About NKP Builders
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Building Trust. <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Delivering Engineering Quality.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            NKP Builders is a premier construction, licensed contracting, and building maintenance consultancy based in Mahalakshmi Nagar, Chengalpattu, Tamil Nadu. Since our inception, we have engineered iconic living spaces, resilient roofs, and outstanding interior/exterior architectural makeovers.
          </p>
        </div>

        {/* Story & Experience Markers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 relative">
            {/* Visual Block representing experience */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80"
                alt="NKP Builders Engineering"
                className="w-full object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent" />
            </div>

            {/* Experience overlay */}
            <div className="absolute -bottom-6 -right-6 bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl max-w-[220px]">
              <span className="text-4xl font-black text-amber-500 font-mono">15+</span>
              <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">
                Years of Structural Mastery
              </p>
              <p className="text-[10px] text-slate-500 mt-2">
                Established 2010 in Chengalpattu.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-left lg:pl-6">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Our Journey of Civil Excellence
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded by Mr.N.K.Praveen Kumar, a graduate in Civil Engineering, NKP Builders was born with a single mission: to eliminate low-grade contracting practices in South Chennai and Chengalpattu. We noticed that many local builders skipped crucial structural steps, causing water seepages and paint peeling within two seasons.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We took a firm stand. NKP Builders became an official authorized application partner with elite waterproofing agencies and paint manufacturers (including Asian Paints Apex Ultima systems). We invest in high-caliber equipment, automated sanders, and ultrasonic moisture analyzers to ensure that our structural work is technically sound and visually immaculate.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex gap-2.5 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-slate-800">180+ Completed Projects</span>
              </div>
              <div className="flex gap-2.5 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-slate-800">100% Happy Families</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-2xl flex flex-col items-start gap-4 text-left shadow-sm">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-3.5 rounded-xl shadow-md">
              <Rocket className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">Our Mission</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              To construct durable, highly functional, and beautiful residential and commercial buildings utilizing pristine raw materials, cutting-edge engineering safety protocols, and authorized craftsmanship, while prioritizing transparent scheduling and customer budget boundaries.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 sm:p-10 rounded-2xl flex flex-col items-start gap-4 text-left shadow-sm">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-3.5 rounded-xl shadow-md">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">Our Vision</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              To become Tamil Nadu’s most respected civil contracting enterprise, famous for raising the standards of architectural beauty, dampness prevention, and durable external painting protections, creating landmarks of safety for generations to come.
            </p>
          </div>
        </div>

        {/* Founder message block */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl text-left flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          {/* Decorative gold sphere */}
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />

          <div className="flex flex-col items-center gap-3 md:w-1/4">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-amber-500 flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <div className="text-center">
              <h5 className="font-bold text-white text-sm">Mr.N.K.Praveen Kumar</h5>
              <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">
                Diploma (Civil)
              </p>
              <p className="text-[9px] text-slate-500">Managing Director</p>
            </div>
          </div>

          <div className="md:w-3/4 flex flex-col gap-4">
            <h4 className="text-lg sm:text-xl font-bold text-amber-500 flex items-center gap-2">
              <span>Message from our Founder</span>
            </h4>
            <p className="text-slate-300 text-sm italic leading-relaxed">
              "At NKP Builders, we do not merely build walls; we build trust. We understand that your home is the fruit of your life's earnings. That is why we treat every structure with absolute engineering reverence. From selecting premium Grade-A materials to laying precise, level vitrified tiling and authorized paint weatherproofing, my team ensures zero compromises. We stand by our work with written warranties, and I personally inspect our active sites around Chengalpattu to assure that everything conforms to elite structural standards."
            </p>
            <p className="text-slate-400 text-xs font-semibold">
              — Mr.N.K.Praveen Kumar (Civil), NKP BUILDERS.
            </p>
          </div>
        </div>

        {/* Core Values grid */}
        <div className="mt-20">
          <h4 className="text-center text-slate-900 font-bold text-lg uppercase tracking-wider mb-10">Our Core Principles</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex gap-4 items-start text-left">
                <div className="bg-white p-2.5 rounded-lg shadow-sm border border-slate-100 shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">{val.title}</h5>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
