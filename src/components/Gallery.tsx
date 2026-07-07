import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Image as ImageIcon, MapPin, Film } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "living" | "kitchen" | "elevation" | "waterproofing" | "video";
  title: string;
  location: string;
  url: string;
  isVideo?: boolean;
}

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    category: "living",
    title: "Royale Stucco Accent Living Room",
    location: "Mahalakshmi Nagar, Chengalpattu",
    url: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    category: "kitchen",
    title: "Premium Modular Kitchen with Granite Overlay",
    location: "Thiruporur Main Road",
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    category: "elevation",
    title: "Modern 3-Story Glass elevation structure",
    location: "Chengalpattu",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g4",
    category: "waterproofing",
    title: "Dam Sheath Terrace membrane execution",
    location: "Kelambakkam, Chennai Suburbs",
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g5",
    category: "living",
    title: "Saint-Gobain Gyproc false ceiling stepped lighting",
    location: "Mahabalipuram",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g6",
    category: "elevation",
    title: "Vaastu Compliant Luxury Villa Front Entrance",
    location: "Mahalakshmi Nagar",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g7",
    category: "video",
    title: "Completed Duplex Key Handover walkthrough",
    location: "Chengalpattu - video walk",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    isVideo: true,
  },
];

export default function Gallery() {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const filterItems = activeCat === "all"
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCat);

  return (
    <section className="py-20 bg-slate-50 text-slate-800 font-sans" id="gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Image & Video Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            A Visual Journey of <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Impeccable Architectural Craft.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Examine our high-resolution project captures and walkthrough clips. We photograph our active and completed civil sites to showcase real, unedited details.
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12">
          {[
            { id: "all", label: "All Assets" },
            { id: "elevation", label: "Exterior Elevations" },
            { id: "living", label: "Living Rooms & Ceilings" },
            { id: "kitchen", label: "Modular Kitchens" },
            { id: "waterproofing", label: "Waterproofing Works" },
            { id: "video", label: "Walkthrough Videos" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCat === cat.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filterItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setPreviewItem(item)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group text-left relative"
              >
                {/* Visual wrapper */}
                <div className="relative h-60 bg-slate-900 overflow-hidden shrink-0">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  
                  {/* Category icon overlay */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-white p-2.5 rounded-xl border border-slate-800">
                    {item.isVideo ? <Film className="w-4 h-4 text-amber-500" /> : <ImageIcon className="w-4 h-4 text-amber-500" />}
                  </div>

                  {/* Glass review overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4" />
                      <span>Zoom Inspect</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-tight line-clamp-1 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 inline" />
                    {item.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Visualizer Dialog */}
        <AnimatePresence>
          {previewItem && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl w-full border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col"
              >
                <button
                  onClick={() => setPreviewItem(null)}
                  className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-white p-2 rounded-full border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer z-10"
                >
                  ✕
                </button>

                {previewItem.isVideo ? (
                  <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-8 border-b border-slate-900 text-slate-500">
                    <Film className="w-16 h-16 text-amber-500 animate-pulse mb-3" />
                    <h3 className="text-white font-bold text-lg">Loading Project Walkthrough Clip...</h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 text-center">
                      Our walkthrough videos stream secure high-definition structural files. In this live preview environment, this is a simulated walk-through.
                    </p>
                    <button
                      onClick={() => alert("Playing HD project walk-through. Real-time stream launched successfully.")}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg mt-6"
                    >
                      Play Walkthrough stream
                    </button>
                  </div>
                ) : (
                  <div className="relative h-[60vh] min-h-[400px] w-full bg-slate-900 shrink-0">
                    <img
                      src={previewItem.url}
                      alt={previewItem.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="p-6 bg-slate-950 text-left">
                  <h4 className="text-white text-base font-bold tracking-tight">{previewItem.title}</h4>
                  <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-semibold">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      {previewItem.location}
                    </span>
                    <span className="uppercase text-[9px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-amber-500 font-bold tracking-widest">
                      {previewItem.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
