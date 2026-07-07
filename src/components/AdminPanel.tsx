import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Lock, Unlock, Plus, Trash2, Edit3, Save, RefreshCw, 
  AlertCircle, CheckCircle2, Layers, Briefcase, FileText, 
  MessageSquare, HelpCircle, Eye, Image as ImageIcon, Sparkles, LogOut
} from "lucide-react";
import { ServiceItem, ProjectItem, BlogPost, Testimonial, FAQItem } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    services: ServiceItem[];
    projects: ProjectItem[];
    blogs: BlogPost[];
    testimonials: Testimonial[];
    faqs: FAQItem[];
  };
  onSaveSuccess: (updatedData: any) => void;
}

export default function AdminPanel({ isOpen, onClose, currentData, onSaveSuccess }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"services" | "projects" | "blogs" | "testimonials" | "faqs">("services");
  
  // Local copies of the data arrays for editing
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState("");

  // Edit/Add Form Modals
  const [editingItem, setEditingItem] = useState<{
    type: "services" | "projects" | "blogs" | "testimonials" | "faqs";
    index: number; // -1 for new item
    data: any;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Sync data when currentData changes or modal opens
  useEffect(() => {
    if (currentData) {
      setServices([...currentData.services]);
      setProjects([...currentData.projects]);
      setBlogs([...currentData.blogs]);
      setTestimonials([...currentData.testimonials]);
      setFaqs([...currentData.faqs]);
    }
  }, [currentData, isOpen]);

  // Session storage check for auth persistent within tab
  useEffect(() => {
    const authState = sessionStorage.getItem("nkp_admin_auth");
    if (authState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "nkpadmin2026") {
      setIsAuthenticated(true);
      setLoginError("");
      sessionStorage.setItem("nkp_admin_auth", "true");
    } else {
      setLoginError("Invalid Admin Password. Access Denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("nkp_admin_auth");
  };

  // Generic Save to Backend (sync entire database structure)
  const saveAllToBackend = async (
    updatedServices = services,
    updatedProjects = projects,
    updatedBlogs = blogs,
    updatedTestimonials = testimonials,
    updatedFaqs = faqs
  ) => {
    setIsSubmitting(true);
    setActionFeedback(null);
    try {
      const payload = {
        password: password || "nkpadmin2026", // Use typed or stored session password
        services: updatedServices,
        projects: updatedProjects,
        blogs: updatedBlogs,
        testimonials: updatedTestimonials,
        faqs: updatedFaqs,
      };

      const res = await fetch("/api/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (resData.success) {
        setActionFeedback({ success: true, message: "Database updated successfully! Site content live changed." });
        onSaveSuccess({
          services: updatedServices,
          projects: updatedProjects,
          blogs: updatedBlogs,
          testimonials: updatedTestimonials,
          faqs: updatedFaqs,
        });
      } else {
        setActionFeedback({ success: false, message: resData.error || "Failed to update dynamic database." });
      }
    } catch (err) {
      console.error(err);
      setActionFeedback({ success: false, message: "Network connection failure. Unable to update server JSON." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Action Handlers
  const handleDeleteItem = (index: number) => {
    if (!window.confirm("Are you absolutely sure you want to delete this item? This will instantly remove it from the live website upon saving.")) {
      return;
    }

    if (activeTab === "services") {
      const next = services.filter((_, i) => i !== index);
      setServices(next);
      saveAllToBackend(next, projects, blogs, testimonials, faqs);
    } else if (activeTab === "projects") {
      const next = projects.filter((_, i) => i !== index);
      setProjects(next);
      saveAllToBackend(services, next, blogs, testimonials, faqs);
    } else if (activeTab === "blogs") {
      const next = blogs.filter((_, i) => i !== index);
      setBlogs(next);
      saveAllToBackend(services, projects, next, testimonials, faqs);
    } else if (activeTab === "testimonials") {
      const next = testimonials.filter((_, i) => i !== index);
      setTestimonials(next);
      saveAllToBackend(services, projects, blogs, next, faqs);
    } else if (activeTab === "faqs") {
      const next = faqs.filter((_, i) => i !== index);
      setFaqs(next);
      saveAllToBackend(services, projects, blogs, testimonials, next);
    }
  };

  // Open Edit or Add form
  const openForm = (index: number, existingData: any = null) => {
    let initialFormData: any = {};
    
    if (existingData) {
      initialFormData = { ...existingData };
    } else {
      // Default configurations for new entries
      if (activeTab === "services") {
        initialFormData = {
          id: "service-" + Date.now(),
          title: "",
          shortDesc: "",
          priceEst: "₹",
          details: "",
          image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
          benefits: ["", "", ""]
        };
      } else if (activeTab === "projects") {
        initialFormData = {
          id: "project-" + Date.now(),
          title: "",
          category: "residential",
          status: "completed",
          location: "Chengalpattu",
          year: new Date().getFullYear().toString(),
          imageAfter: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
          description: "",
          area: "1,500 Sq.Ft.",
          client: ""
        };
      } else if (activeTab === "blogs") {
        initialFormData = {
          id: "blog-" + Date.now(),
          title: "",
          category: "construction",
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          readTime: "5 mins read",
          summary: "",
          content: [""],
          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
          author: "Er. N. K. Prabhakaran"
        };
      } else if (activeTab === "testimonials") {
        initialFormData = {
          id: "test-" + Date.now(),
          name: "",
          role: "Homeowner",
          rating: 5,
          text: "",
          project: "Civil Construction",
          location: "Chengalpattu",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
        };
      } else if (activeTab === "faqs") {
        initialFormData = {
          category: "general",
          question: "",
          answer: ""
        };
      }
    }

    setEditingItem({
      type: activeTab,
      index,
      data: initialFormData
    });
  };

  // Submit form handler (Local mutation + save)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const { index, data } = editingItem;

    if (activeTab === "services") {
      let next: ServiceItem[];
      if (index === -1) {
        next = [...services, data];
      } else {
        next = services.map((item, idx) => (idx === index ? data : item));
      }
      setServices(next);
      saveAllToBackend(next, projects, blogs, testimonials, faqs);
    } else if (activeTab === "projects") {
      let next: ProjectItem[];
      if (index === -1) {
        next = [...projects, data];
      } else {
        next = projects.map((item, idx) => (idx === index ? data : item));
      }
      setProjects(next);
      saveAllToBackend(services, next, blogs, testimonials, faqs);
    } else if (activeTab === "blogs") {
      let next: BlogPost[];
      if (index === -1) {
        next = [...blogs, data];
      } else {
        next = blogs.map((item, idx) => (idx === index ? data : item));
      }
      setBlogs(next);
      saveAllToBackend(services, projects, next, testimonials, faqs);
    } else if (activeTab === "testimonials") {
      let next: Testimonial[];
      if (index === -1) {
        next = [...testimonials, data];
      } else {
        next = testimonials.map((item, idx) => (idx === index ? data : item));
      }
      setTestimonials(next);
      saveAllToBackend(services, projects, blogs, next, faqs);
    } else if (activeTab === "faqs") {
      let next: FAQItem[];
      if (index === -1) {
        next = [...faqs, data];
      } else {
        next = faqs.map((item, idx) => (idx === index ? data : item));
      }
      setFaqs(next);
      saveAllToBackend(services, projects, blogs, testimonials, next);
    }

    setEditingItem(null);
  };

  // Helper for multi-line inputs (benefits or blog content paragraphs)
  const handleArrayFieldChange = (field: "benefits" | "content", lineIndex: number, val: string) => {
    if (!editingItem) return;
    const currentList = [...editingItem.data[field]];
    currentList[lineIndex] = val;
    setEditingItem({
      ...editingItem,
      data: {
        ...editingItem.data,
        [field]: currentList
      }
    });
  };

  const addArrayFieldLine = (field: "benefits" | "content") => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      data: {
        ...editingItem.data,
        [field]: [...editingItem.data[field], ""]
      }
    });
  };

  const removeArrayFieldLine = (field: "benefits" | "content", lineIndex: number) => {
    if (!editingItem) return;
    const currentList = editingItem.data[field].filter((_: any, i: number) => i !== lineIndex);
    setEditingItem({
      ...editingItem,
      data: {
        ...editingItem.data,
        [field]: currentList.length === 0 ? [""] : currentList
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-0 md:p-6 text-slate-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        className="bg-white w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Admin Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-slate-950 p-2 rounded-lg font-black tracking-widest text-sm">
              NKP
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <span>NKP Builders Portal</span>
                {isAuthenticated ? (
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Unlock className="w-2.5 h-2.5" /> SECURE ROOT
                  </span>
                ) : (
                  <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> RESTRICTED
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Full dynamic database controller. Real-time updates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-full transition-all cursor-pointer flex items-center justify-center"
              title="Close Portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Outer authentication wall */}
        {!isAuthenticated ? (
          <div className="flex-grow flex items-center justify-center p-6 bg-slate-50">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl shadow-xl text-center"
            >
              <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Admin Authentication Required</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Please provide the authorized NKP Builders credentials to modify service rate cards, project sliders, and articles.
              </p>

              <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Security Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800 tracking-widest"
                  />
                </div>

                {loginError && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-600 rounded-lg p-3 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-amber-500 font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Verify Credentials</span>
                </button>
              </form>
              <div className="mt-6 text-[10px] text-slate-400 font-bold">
                Default Developer Lock: <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">nkpadmin2026</span>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col md:flex-row overflow-hidden bg-slate-50">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-white border-r border-slate-200 flex md:flex-col p-3 shrink-0 gap-1 overflow-x-auto md:overflow-y-auto">
              <span className="hidden md:block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-2">
                Dynamic Modules
              </span>
              
              <button
                onClick={() => { setActiveTab("services"); setSearchTerm(""); }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  activeTab === "services" 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("projects"); setSearchTerm(""); }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  activeTab === "projects" 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("blogs"); setSearchTerm(""); }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  activeTab === "blogs" 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Blogs ({blogs.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("testimonials"); setSearchTerm(""); }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  activeTab === "testimonials" 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Testimonials ({testimonials.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("faqs"); setSearchTerm(""); }}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                  activeTab === "faqs" 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>FAQ List ({faqs.length})</span>
              </button>

              <div className="hidden md:block mt-auto border-t border-slate-100 pt-4 p-3 text-[10px] text-slate-400 font-semibold leading-relaxed">
                <Sparkles className="w-4 h-4 text-amber-500 mb-1.5" />
                To refresh the frontend view instantly, any modification is pushed directly to the central database store file on the hosting environment.
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col overflow-hidden p-6 text-left">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
                <div>
                  <h4 className="text-xl font-black text-slate-900 capitalize tracking-tight">
                    Manage {activeTab}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Modify layout content, add new records, or permanently wipe items.
                  </p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800 flex-grow sm:flex-grow-0 sm:w-48"
                  />
                  <button
                    onClick={() => openForm(-1)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all cursor-pointer shadow shadow-amber-500/10 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                  </button>
                </div>
              </div>

              {/* Action Feedback alerts */}
              {actionFeedback && (
                <div className={`mb-6 p-4 rounded-xl text-xs font-bold border flex items-start gap-3 shrink-0 ${
                  actionFeedback.success 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                    : "bg-rose-50 border-rose-100 text-rose-800"
                }`}>
                  {actionFeedback.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                  <div>
                    <span className="block font-black">{actionFeedback.success ? "Database Synchronized" : "Sync Failed"}</span>
                    <p className="mt-1 font-semibold text-[11px] leading-relaxed opacity-90">{actionFeedback.message}</p>
                  </div>
                </div>
              )}

              {/* Data Lists */}
              <div className="flex-grow overflow-y-auto bg-white rounded-xl border border-slate-200">
                
                {/* 1. SERVICES TAB LIST */}
                {activeTab === "services" && (
                  <div className="divide-y divide-slate-100">
                    {services
                      .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((service, idx) => (
                        <div key={service.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex gap-4 items-start">
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-100" 
                              onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80" }}
                            />
                            <div>
                              <h5 className="font-bold text-sm text-slate-900">{service.title}</h5>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{service.shortDesc}</p>
                              <div className="flex gap-2 items-center mt-2 flex-wrap">
                                <span className="bg-amber-500/10 text-amber-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-500/10">
                                  {service.priceEst}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">
                                  {service.benefits.length} Benefits configured
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => openForm(idx, service)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-slate-200"
                              title="Edit Record"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(idx)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-rose-100"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400 font-bold">No services found match search filters.</div>
                    )}
                  </div>
                )}

                {/* 2. PROJECTS TAB LIST */}
                {activeTab === "projects" && (
                  <div className="divide-y divide-slate-100">
                    {projects
                      .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((proj, idx) => (
                        <div key={proj.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex gap-4 items-start">
                            <img 
                              src={proj.imageAfter} 
                              alt={proj.title} 
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-100" 
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-sm text-slate-900">{proj.title}</h5>
                                <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                                  proj.status === "completed" 
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/10" 
                                    : "bg-blue-500/10 text-blue-600 border-blue-500/10"
                                }`}>
                                  {proj.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{proj.description}</p>
                              <div className="flex gap-3 items-center mt-2 flex-wrap text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                <span>{proj.category}</span>
                                <span>•</span>
                                <span>{proj.location}</span>
                                <span>•</span>
                                <span>{proj.area}</span>
                                <span>•</span>
                                <span className="text-slate-600">{proj.client}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => openForm(idx, proj)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-slate-200"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(idx)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-rose-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400 font-bold">No projects registered.</div>
                    )}
                  </div>
                )}

                {/* 3. BLOGS TAB LIST */}
                {activeTab === "blogs" && (
                  <div className="divide-y divide-slate-100">
                    {blogs
                      .filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.summary.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((post, idx) => (
                        <div key={post.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex gap-4 items-start">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-100" 
                            />
                            <div>
                              <h5 className="font-bold text-sm text-slate-900">{post.title}</h5>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.summary}</p>
                              <div className="flex gap-3 items-center mt-2 flex-wrap text-[10px] text-slate-400 font-bold">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">{post.category}</span>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                                <span>•</span>
                                <span className="text-slate-500">By {post.author}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => openForm(idx, post)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-slate-200"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(idx)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-rose-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400 font-bold">No blog posts found.</div>
                    )}
                  </div>
                )}

                {/* 4. TESTIMONIALS TAB LIST */}
                {activeTab === "testimonials" && (
                  <div className="divide-y divide-slate-100">
                    {testimonials
                      .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.text.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((test, idx) => (
                        <div key={test.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex gap-4 items-start">
                            <img 
                              src={test.image} 
                              alt={test.name} 
                              className="w-10 h-10 object-cover rounded-full border border-slate-200 shrink-0 bg-slate-100" 
                            />
                            <div>
                              <h5 className="font-bold text-sm text-slate-900">{test.name}</h5>
                              <span className="text-[10px] text-slate-400 font-bold block">{test.role} at {test.location}</span>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-semibold italic">"{test.text}"</p>
                              <div className="flex gap-2 items-center mt-2 flex-wrap text-[10px] text-slate-400 font-bold">
                                <span className="text-amber-500 font-black">★ {test.rating}/5 Rating</span>
                                <span>•</span>
                                <span className="text-slate-500">Project: {test.project}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => openForm(idx, test)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-slate-200"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(idx)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-rose-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400 font-bold">No client testimonials saved.</div>
                    )}
                  </div>
                )}

                {/* 5. FAQS TAB LIST */}
                {activeTab === "faqs" && (
                  <div className="divide-y divide-slate-100">
                    {faqs
                      .filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.answer.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((faq, idx) => (
                        <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex gap-3 items-start text-left">
                            <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-bold text-sm text-slate-900">{faq.question}</h5>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{faq.answer}</p>
                              <span className="inline-block bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase mt-2">
                                Category: {faq.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => openForm(idx, faq)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-slate-200"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(idx)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center border border-rose-100"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                    ))}
                    {faqs.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400 font-bold">No FAQs defined in system database.</div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </motion.div>

      {/* INNER FORM EDITOR SUB-MODAL */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-[250] overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative text-left"
            >
              <div className="bg-slate-900 p-5 text-white relative flex justify-between items-center shrink-0">
                <div>
                  <h4 className="text-base font-extrabold tracking-tight">
                    {editingItem.index === -1 ? "Add New Record" : "Edit Existing Record"}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                    Dynamic Module: {editingItem.type.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-slate-300 hover:text-white transition-all cursor-pointer bg-slate-800 p-1.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-4 text-slate-700 max-h-[75vh] overflow-y-auto">
                
                {/* 1. SERVICES FIELDS */}
                {editingItem.type === "services" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Service Unique ID *</label>
                        <input
                          type="text"
                          required
                          disabled={editingItem.index !== -1}
                          placeholder="e.g. tile-work"
                          value={editingItem.data.id}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, id: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800 disabled:opacity-50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Service Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tile Layout & Works"
                          value={editingItem.data.title}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Brief Short Description *</label>
                      <input
                        type="text"
                        required
                        placeholder="Provide a high-impact overview"
                        value={editingItem.data.shortDesc}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, shortDesc: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Price Estimate *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹45 - ₹85 per sqft"
                          value={editingItem.data.priceEst}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, priceEst: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Cover Image URL *</label>
                        <input
                          type="text"
                          required
                          placeholder="Image link URL"
                          value={editingItem.data.image}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, image: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Service Details / Narrative *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Explain concrete specifications, raw material brands used, or regional application process details..."
                        value={editingItem.data.details}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, details: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Benefits list (Bullet points)
                        </label>
                        <button
                          type="button"
                          onClick={() => addArrayFieldLine("benefits")}
                          className="text-amber-600 hover:text-amber-700 font-extrabold text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Point
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {editingItem.data.benefits.map((benefit: string, bIdx: number) => (
                          <div key={bIdx} className="flex gap-2 items-center">
                            <span className="text-xs font-bold text-slate-400">#{bIdx+1}</span>
                            <input
                              type="text"
                              required
                              placeholder="e.g. UltraTech Grade-53 cement"
                              value={benefit}
                              onChange={(e) => handleArrayFieldChange("benefits", bIdx, e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800 flex-grow"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayFieldLine("benefits", bIdx)}
                              className="text-rose-500 hover:text-rose-700 cursor-pointer p-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PROJECTS FIELDS */}
                {editingItem.type === "projects" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Unique ID *</label>
                        <input
                          type="text"
                          required
                          disabled={editingItem.index !== -1}
                          placeholder="e.g. mahalakshmi-villa"
                          value={editingItem.data.id}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, id: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800 disabled:opacity-50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mahalakshmi Luxury Villa"
                          value={editingItem.data.title}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category *</label>
                        <select
                          value={editingItem.data.category}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="painting">Painting</option>
                          <option value="waterproofing">Waterproofing</option>
                          <option value="interior">Interior Fitout</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Status *</label>
                        <select
                          value={editingItem.data.status}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, status: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                        >
                          <option value="completed">Completed</option>
                          <option value="ongoing">Ongoing</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Execution Year *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2026"
                          value={editingItem.data.year}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, year: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mahalakshmi Nagar, Chengalpattu"
                          value={editingItem.data.location}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, location: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Client Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mr. R. Karthikeyan"
                          value={editingItem.data.client}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, client: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Before Image URL (Optional)</label>
                        <input
                          type="text"
                          placeholder="Image showing ruins/cracks before treatment"
                          value={editingItem.data.imageBefore || ""}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, imageBefore: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">After/Active Image URL *</label>
                        <input
                          type="text"
                          required
                          placeholder="Completed structural display photo"
                          value={editingItem.data.imageAfter}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, imageAfter: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Built-up Area *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2,400 Sq.Ft."
                          value={editingItem.data.area}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, area: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Narrative Description *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detail the materials, engineering steps, Vaastu setups..."
                        value={editingItem.data.description}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                )}

                {/* 3. BLOGS FIELDS */}
                {editingItem.type === "blogs" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Blog Unique ID *</label>
                        <input
                          type="text"
                          required
                          disabled={editingItem.index !== -1}
                          placeholder="e.g. waterproofing-guide"
                          value={editingItem.data.id}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, id: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800 disabled:opacity-50"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Blog Post Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Protect Your Home From Monsoons"
                          value={editingItem.data.title}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, title: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category *</label>
                        <select
                          value={editingItem.data.category}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                        >
                          <option value="construction">Construction</option>
                          <option value="painting">Painting</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="interior">Interior</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Post Date *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.date}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, date: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Read Time *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5 mins read"
                          value={editingItem.data.readTime}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, readTime: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Author Name *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.author}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, author: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Featured Image URL *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.image}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, image: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Brief Summary Text *</label>
                      <input
                        type="text"
                        required
                        placeholder="A concise description shown in grid lists"
                        value={editingItem.data.summary}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, summary: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Main Content (Paragraphs)
                        </label>
                        <button
                          type="button"
                          onClick={() => addArrayFieldLine("content")}
                          className="text-amber-600 hover:text-amber-700 font-extrabold text-[10px] flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Paragraph
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        {editingItem.data.content.map((paragraph: string, pIdx: number) => (
                          <div key={pIdx} className="flex gap-2 items-start">
                            <span className="text-xs font-bold text-slate-400 mt-2">#{pIdx+1}</span>
                            <textarea
                              rows={2}
                              required
                              placeholder="Write a paragraph describing detail parameters..."
                              value={paragraph}
                              onChange={(e) => handleArrayFieldChange("content", pIdx, e.target.value)}
                              className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800 flex-grow"
                            />
                            <button
                              type="button"
                              onClick={() => removeArrayFieldLine("content", pIdx)}
                              className="text-rose-500 hover:text-rose-700 cursor-pointer p-1.5 mt-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. TESTIMONIALS FIELDS */}
                {editingItem.type === "testimonials" && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Customer Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mr. R. Karthikeyan"
                          value={editingItem.data.name}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, name: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Profession / Role *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. IT Director"
                          value={editingItem.data.role}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, role: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Rating (1 to 5) *</label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={5}
                          value={editingItem.data.rating}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, rating: parseInt(e.target.value) || 5 }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chengalpattu"
                          value={editingItem.data.location}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, location: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Customer Avatar Image *</label>
                        <input
                          type="text"
                          required
                          value={editingItem.data.image}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, image: e.target.value }
                          })}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Undertaken *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Turnkey Duplex Construction"
                        value={editingItem.data.project}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, project: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Appreciation Statement *</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Customer review wording..."
                        value={editingItem.data.text}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, text: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                )}

                {/* 5. FAQS FIELDS */}
                {editingItem.type === "faqs" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">FAQ Group Category *</label>
                      <select
                        value={editingItem.data.category}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, category: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-bold text-slate-800"
                      >
                        <option value="general">General & Site Visits</option>
                        <option value="construction">Structural Civil</option>
                        <option value="painting">Painting & Finishes</option>
                        <option value="warranty">Written Warranties</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Question Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Do you offer free site inspection?"
                        value={editingItem.data.question}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, question: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Explanatory Answer *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Provide deep architectural, structural, or legal planning clarifications..."
                        value={editingItem.data.answer}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, answer: e.target.value }
                        })}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-amber-500 font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                )}

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="border border-slate-200 text-slate-600 font-bold text-xs py-2.5 px-4 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-900 hover:bg-slate-800 text-amber-500 font-black text-xs uppercase tracking-widest py-2.5 px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSubmitting ? "Syncing..." : "Apply Changes"}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
