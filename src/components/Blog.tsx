import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { blogData } from "../data";
import { BlogPost } from "../types";
import { Calendar, User, Clock, ChevronRight, BookOpen, AlertCircle, Sparkles } from "lucide-react";

interface BlogProps {
  blogs?: BlogPost[];
}

export default function Blog({ blogs }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const activeBlogs = blogs || blogData;

  return (
    <section className="py-20 bg-white text-slate-800 font-sans" id="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            Construction & Painting Insights
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-4">
            Bespoke Building Tips & <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Home Maintenance Guides.
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Stay educated about waterproofing compounds, Asian Paints weather shield application rules, structural wall repair guidelines, and regional Vaastu orientation secrets.
          </p>
        </div>

        {/* Blog Post list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeBlogs.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group text-left h-full"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                
                {/* Float tag */}
                <div className="absolute bottom-3 left-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="p-6 pt-0 mt-auto border-t border-slate-150 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  <span>{post.author}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-amber-600 hover:text-amber-700 font-black text-xs uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                  id={`read-blog-${post.id}`}
                >
                  Read Article
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar newsletter prompt */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mt-16 border border-slate-800 text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl" />
          
          <div className="md:col-span-8 flex flex-col gap-2">
            <span className="text-[10px] text-amber-400 font-black uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>Newsletter Subscription</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              Get Weekly structural advice & Color Schemes
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We send out architectural reviews, structural guides for Tamil Nadu construction, and premium Asian Paints palettes. No spam, absolute educational value.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
            />
            <button
              onClick={() => alert("Subscribed! Thank you for staying tuned with NKP Builders.")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow shadow-amber-500/10 cursor-pointer"
            >
              Join Our Newsletter
            </button>
          </div>
        </div>

      </div>

      {/* Blog Article details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col text-left"
            >
              <div className="relative h-56 shrink-0 bg-slate-900">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur text-white p-2 rounded-full border border-slate-800 hover:bg-slate-900 transition-all cursor-pointer"
                  id="close-blog-modal-btn"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] bg-amber-500 text-slate-950 uppercase tracking-widest font-black px-2.5 py-1 rounded">
                    {selectedPost.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-2 leading-tight">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-4">
                <div className="flex items-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" />{selectedPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" />{selectedPost.readTime}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-amber-500" />{selectedPost.author}</span>
                </div>

                <div className="flex flex-col gap-4 text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {selectedPost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex gap-3 items-center mt-4">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Have specific questions regarding this article? Launch our AI live chat consultant on the bottom-right corner!</span>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 shrink-0 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
