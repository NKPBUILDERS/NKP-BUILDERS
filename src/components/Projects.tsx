import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "../data";
import { ProjectItem } from "../types";
import { MapPin, Calendar, CheckCircle2, Sliders, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";

interface ProjectsProps {
  projects?: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "painting", label: "Painting" },
    { id: "waterproofing", label: "Waterproofing" },
    { id: "interior", label: "Interior Fitouts" },
  ];

  const activeProjects = projects || projectsData;

  const filteredProjects = activeProjects.filter((proj) => {
    const matchesCat = filter === "all" || proj.category === filter;
    const matchesStatus = statusFilter === "all" || proj.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  return (
    <section className="py-20 bg-white text-slate-800 font-sans" id="projects-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Featured Projects Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            A Testament of Civil & <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Structural Grandeur.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Filter our recent assignments to examine the concrete finishes, paint texture alignments, and waterproofing executions. Slide our Before & After interactive cards below to see absolute transformations.
          </p>
        </div>

        {/* Before & After Interactive Spotlight Slider Section */}
        <div className="mb-20 max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Interactive Spotlight</span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Before & After Transformations
              </h3>
              <p className="text-xs text-slate-400">
                Drag the divider handle horizontally to view the technical renovations achieved by NKP Builders.
              </p>
            </div>
            <div className="flex gap-2 text-xs font-bold shrink-0">
              <span className="bg-slate-950 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg">Before: Crack Seepage</span>
              <span className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg">After: Dam Sheath Protection</span>
            </div>
          </div>

          <BeforeAfterSlider
            before="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80"
            after="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
          />
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col gap-4 mb-12">
          {/* Main category tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  filter === cat.id
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
                id={`cat-filter-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status secondary filter */}
          <div className="flex justify-center items-center gap-4 text-xs font-bold text-slate-500 mt-2">
            <span>Status:</span>
            <button
              onClick={() => setStatusFilter("all")}
              className={`pb-1 border-b-2 cursor-pointer ${
                statusFilter === "all" ? "border-amber-500 text-slate-900 font-extrabold" : "border-transparent"
              }`}
            >
              All Progress
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`pb-1 border-b-2 cursor-pointer ${
                statusFilter === "completed" ? "border-amber-500 text-slate-900 font-extrabold" : "border-transparent"
              }`}
            >
              Completed Projects
            </button>
            <button
              onClick={() => setStatusFilter("ongoing")}
              className={`pb-1 border-b-2 cursor-pointer ${
                statusFilter === "ongoing" ? "border-amber-500 text-slate-900 font-extrabold" : "border-transparent"
              }`}
            >
              Ongoing Structures
            </button>
          </div>
        </div>

        {/* Projects Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col text-left h-full"
              >
                <div className="relative h-52 overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={proj.imageAfter}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  
                  {/* Status badge float */}
                  <div className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    proj.status === "completed" ? "bg-emerald-500 text-white" : "bg-amber-500 text-slate-950"
                  }`}>
                    {proj.status}
                  </div>

                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow gap-3">
                  <span className="text-[9px] bg-slate-200 text-slate-600 font-black tracking-widest uppercase px-2 py-0.5 rounded-full inline-block self-start">
                    {proj.category}
                  </span>
                  
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight line-clamp-1">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="p-6 pt-0 mt-auto border-t border-slate-100/50 flex justify-between items-center bg-slate-50">
                  <div className="text-left">
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-semibold">Scale</span>
                    <span className="text-xs font-bold text-slate-800">{proj.area}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-3.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty status check */}
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-slate-400 font-medium">
            No projects found matching the selected filters. Please try another category!
          </div>
        )}

      </div>

      {/* Projects Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col text-left"
            >
              <div className="relative h-64 sm:h-72 shrink-0 bg-slate-900">
                <img
                  src={selectedProject.imageAfter}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-white p-2 rounded-full border border-slate-800 hover:bg-slate-900 transition-all cursor-pointer"
                  id="close-project-modal-btn"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-500 text-slate-950 uppercase tracking-widest font-black px-2 py-0.5 rounded">
                      {selectedProject.category}
                    </span>
                    <span className="text-[10px] bg-blue-900 text-white uppercase tracking-widest font-black px-2 py-0.5 rounded">
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
                <div>
                  <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Project Overview</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-slate-100 py-5">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Client</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1">{selectedProject.client}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Built Scale</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1">{selectedProject.area}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Location</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 inline" />
                      {selectedProject.location}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Year Completed</span>
                    <span className="text-xs font-bold text-slate-800 block mt-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 inline" />
                      {selectedProject.year}
                    </span>
                  </div>
                </div>

                {/* Conditional Before/After inside details */}
                {selectedProject.imageBefore && (
                  <div>
                    <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Renovation Progress Comparison</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative rounded-xl overflow-hidden border border-slate-200">
                        <img src={selectedProject.imageBefore} alt="Before renovation" className="w-full h-36 object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute bottom-2 left-2 bg-slate-950/80 text-[9px] uppercase tracking-widest text-white px-2 py-0.5 rounded">Before structural repair</span>
                      </div>
                      <div className="relative rounded-xl overflow-hidden border border-slate-200">
                        <img src={selectedProject.imageAfter} alt="After completion" className="w-full h-36 object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute bottom-2 left-2 bg-emerald-500 text-[9px] uppercase tracking-widest text-white px-2 py-0.5 rounded">Completed Handover</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-3 items-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-700">Backed by the NKP Builders structural and waterproofing leakage guarantee warranty.</span>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                >
                  Close Portfolio view
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Custom Horizontal Before-After Slider Component with Mouse/Touch Events
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative h-96 w-full overflow-hidden rounded-2xl select-none cursor-ew-resize border border-slate-800"
    >
      {/* After Image (Full width background) */}
      <img
        src={after}
        alt="After Renovation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <span className="absolute bottom-4 right-4 bg-amber-500 text-slate-950 font-bold uppercase tracking-widest text-[9px] px-2.5 py-1 rounded shadow-md z-10">
        AFTER NKP
      </span>

      {/* Before Image (Clippath width overlays based on sliderPosition) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt="Before Renovation"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
          style={{ width: containerRef.current?.offsetWidth || "100%" }}
        />
        <span className="absolute bottom-4 left-4 bg-slate-950/85 text-white font-bold uppercase tracking-widest text-[9px] px-2.5 py-1 rounded shadow-md z-10">
          BEFORE EXPOSURE
        </span>
      </div>

      {/* Vertical Slider Bar */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-500 cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
          <Sliders className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
