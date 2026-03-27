import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Cpu, ArrowRight, Check, Shield, Terminal, Layers, Lock, Code2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BentoCard } from '../components/BentoCard';
import { useLanguage } from '../contexts/LanguageContext';

export const LandingView = ({ setView, user }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install frontend-slm@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar setView={setView} user={user} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Layered Background System */}
        <div className="absolute inset-0 z-0">
          {/* 1. Base Grid (Dot) */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[32px_32px]" />
          
          {/* 2. Secondary Line Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" />

          {/* 3. Primary Glow (Central) */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full" 
          />

          {/* 4. Accent Glows (Moving) */}
          <motion.div 
            animate={{ 
              x: [-20, 20, -20],
              y: [-10, 10, -10]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-800/10 blur-[80px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              x: [20, -20, 20],
              y: [10, -10, 10]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/10 blur-[100px] rounded-full" 
          />

          {/* 5. Refined Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.05] rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full animate-[spin_90s_linear_infinite_reverse]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <h1 
              className="text-6xl lg:text-[120px] font-black tracking-[-0.04em] leading-[0.85] max-w-5xl mx-auto bg-[linear-gradient(to_bottom,#fff,#71717a)] bg-clip-text text-transparent"
              dangerouslySetInnerHTML={{ __html: t.hero.title }}
            />

            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed font-medium">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="max-w-md mx-auto pt-8">
              <div 
                onClick={handleCopy}
                className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-full py-3.5 px-6 flex items-center justify-between group/copy hover:border-white/20 transition-all cursor-pointer shadow-2xl active:scale-95 relative"
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1.5 bg-black border border-white/10 rounded-lg text-[10px] text-zinc-300 opacity-0 group-hover/copy:opacity-100 transition-all pointer-events-none z-50 shadow-2xl font-bold tracking-widest uppercase whitespace-nowrap">
                  Click to copy
                </div>
                <div className="flex items-center gap-3 font-mono text-[13px] tracking-tight">
                  <span className="text-zinc-600 font-medium">$</span>
                  <span className="text-zinc-200 font-medium">pip install frontend-slm@latest</span>
                </div>
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        transition={{ duration: 0.2, ease: "backOut" }}
                        className="flex items-center gap-2 absolute right-0"
                      >
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest whitespace-nowrap">Copied</span>
                        <Check className="w-4 h-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="w-4 h-4 text-zinc-500 group-hover/copy:text-white transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
              <button 
                onClick={() => setView('signup')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-tight hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                Start Building Free
              </button>
              <div className="relative group/tooltip">
                <button 
                  onClick={() => setView('download')}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/10 text-white rounded-full font-bold text-sm tracking-tight hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Download Local Weights</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* "What makes Frontend.slm special?" Section - Bento Grid Style */}
      <section className="max-w-7xl mx-auto px-6 py-40 space-y-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-linear-to-b from-white/20 to-transparent" />
        
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter">{t.features.title}</h2>
          <p className="text-zinc-500 text-lg hidden md:block max-w-2xl">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoCard 
            title={t.features.cards.optimizations.title}
            description={t.features.cards.optimizations.description}
            visual={
              <>
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[10px_10px]" />
                <div className="relative z-10 flex flex-col gap-2 w-3/4">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      className="h-full bg-white/40" 
                    />
                  </div>
                  <div className="h-2 w-2/3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      className="h-full bg-white/20" 
                    />
                  </div>
                </div>
              </>
            }
          />

          <BentoCard 
            title={t.features.cards.streaming.title}
            description={t.features.cards.streaming.description}
            visual={
              <div className="flex flex-col gap-1 w-1/2">
                {[1,2,3,4].map(i => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-1 bg-white/20 rounded-full" 
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            }
          />

          <BentoCard 
            title={t.features.cards.python.title}
            description={t.features.cards.python.description}
            visual={
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border border-white/20 rounded-full animate-pulse" />
                <div className="absolute inset-4 border border-white/10 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/Logo.png" className="w-8 h-8 object-contain opacity-40" alt="logo" referrerPolicy="no-referrer" />
                </div>
              </div>
            }
          />

          <BentoCard 
            title={t.features.cards.actions.title}
            description={t.features.cards.actions.description}
          />

          <BentoCard 
            title={t.features.cards.handlers.title}
            description={t.features.cards.handlers.description}
          />

          <div className="md:col-span-1 p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 flex flex-col justify-between group/card hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)] relative overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]" />
            <div className="relative z-10 space-y-4">
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Frontend v1.0</h3>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">{t.features.releaseNotes}</p>
            </div>
            <div className="relative z-10 flex justify-end mt-4">
              <div className="relative group/arrow">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover/card:bg-white group-hover/card:text-black group-hover/card:shadow-[0_0_20px_rgba(255,255,255,0.5)] group-hover/card:scale-110 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 -rotate-45 group-hover/card:rotate-0 transition-transform duration-300" />
                </div>
                <div className="absolute bottom-full right-0 mb-3 px-2.5 py-1.5 bg-black border border-white/10 rounded-lg text-[10px] text-zinc-300 opacity-0 group-hover/arrow:opacity-100 transition-all pointer-events-none z-50 shadow-2xl font-bold tracking-widest uppercase whitespace-nowrap">
                  Read Notes
                </div>
              </div>
            </div>
          </div>

          <BentoCard 
            title={t.features.cards.routing.title}
            description={t.features.cards.routing.description}
          />

          <BentoCard 
            title={t.features.cards.middleware.title}
            description={t.features.cards.middleware.description}
          />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-40 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-linear-to-b from-white/20 to-transparent" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 
              className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9]"
              dangerouslySetInnerHTML={{ __html: t.about.title }}
            />
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              {t.about.description}
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {['sarah.png', 'maria.png', 'james.png', 'benjamin.png'].map((img, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`/${img}`} 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="text-white font-bold">{t.about.stats.devs}</p>
                <p className="text-zinc-500">{t.about.stats.mission}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square lg:aspect-video rounded-3xl bg-zinc-900/20 border border-white/10 overflow-hidden group"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]" />
            
            <div className="absolute inset-0 p-8 flex flex-col gap-4">
              <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Left Skeleton Legend */}
                <div className="w-20 border border-white/10 bg-black/40 backdrop-blur-sm rounded-lg p-3 flex flex-col gap-2 shrink-0">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="h-1 flex-1 bg-white/5 rounded-full" />
                    </div>
                  ))}
                </div>

                {/* Main Chart Area */}
                <div className="flex-1 border border-white/10 bg-black/20 rounded-lg relative overflow-hidden flex items-end justify-around p-6 gap-2">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[10px_10px]" />
                  
                  {[45, 12, 38, 95, 56, 28, 82, 15, 48, 52, 38, 72, 72, 52, 95, 68].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex-1 rounded-t-sm border-t border-x border-white/10 relative group/bar ${
                        i % 2 === 0 ? 'bg-white/20' : 'bg-zinc-800/40'
                      }`}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white/5" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Skeleton Legend */}
              <div className="h-20 border border-white/10 bg-black/40 backdrop-blur-sm rounded-lg p-4 flex justify-around items-center gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1.5 w-full max-w-25">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="h-1 flex-1 bg-white/10 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="h-1 flex-1 bg-white/5 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="h-1 flex-1 bg-white/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deep-Dive Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-40 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.2),transparent)]" />
        
        <div className="text-center space-y-6 mb-24">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter"
          >
             Zero-Compromise <br/> <span className="bg-[linear-gradient(to_bottom,white,#71717a)] bg-clip-text text-transparent">Architecture.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Card 1 */}
           <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-[#050505] border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
           >
               <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-colors pointer-events-none -translate-y-1/2 translate-x-1/2" />
               <Terminal className="w-8 h-8 text-zinc-400 mb-8 group-hover:text-emerald-400 transition-colors" />
               <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Native CLI Integration</h3>
               <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">Instantly drop into your terminal. Frontend integrates flawlessly with Bash and Zsh out of the box, delivering intelligent command suggestions and shell script generation with native latency.</p>
           </motion.div>
           
           {/* Card 2 */}
           <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-[#050505] border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
           >
               <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-colors pointer-events-none -translate-y-1/2 translate-x-1/2" />
               <Layers className="w-8 h-8 text-zinc-400 mb-8 group-hover:text-blue-400 transition-colors" />
               <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Multi-Modal Memory</h3>
               <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">Built-in vector data structures ensure continuous state. Frontend remembers complex context streams across heavily fragmented workspace sessions and completely isolated development environments.</p>
           </motion.div>

           {/* Card 3 */}
           <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="bg-[#050505] border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
           >
               <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full group-hover:bg-amber-500/20 transition-colors pointer-events-none -translate-y-1/2 translate-x-1/2" />
               <Lock className="w-8 h-8 text-zinc-400 mb-8 group-hover:text-amber-400 transition-colors" />
               <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Zero-Telemetry Core</h3>
               <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">We stripped all remote tracking endpoints. Your proprietary codebase never leaves your local physical hardware, guaranteeing complete regulatory compliance right out of the box.</p>
           </motion.div>

           {/* Card 4 */}
           <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="md:col-span-3 bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-12"
           >
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(255,255,255,0.05),transparent_100%)] pointer-events-none" />
               
               <div className="flex-1 space-y-6 relative z-10 w-full">
                 <Code2 className="w-10 h-10 text-white" />
                 <div>
                   <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Extensible Plugin Ecosystem</h3>
                   <p className="text-zinc-400 text-base leading-relaxed max-w-2xl">
                     Frontend isn't just an interface; it's a platform. Build custom middleware, hook into native system APIs, and script automated workflows using our lightweight Typescript extension architecture. Deploy your custom logic directly onto the local edge.
                   </p>
                 </div>
               </div>
               
               <div className="w-full md:w-[450px] shrink-0 bg-black/80 border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10 font-mono text-xs text-zinc-300 leading-relaxed overflow-hidden">
                 <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                 </div>
                 <div className="opacity-70 group-hover:opacity-100 transition-opacity whitespace-pre overflow-x-auto no-scrollbar">
                   <span className="text-emerald-400">import</span> &#123; FrontendPlugin &#125; <span className="text-emerald-400">from</span> <span className="text-amber-300">'@frontend/core'</span>;<br/><br/>
                   <span className="text-blue-400">export</span> <span className="text-blue-400">default</span> <span className="text-purple-400">class</span> CustomAnalyzer <span className="text-purple-400">extends</span> FrontendPlugin &#123;<br/>
                   &nbsp;&nbsp;<span className="text-blue-400">async</span> <span className="text-yellow-200">onMessage</span>(ctx) &#123;<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;await ctx.<span className="text-yellow-200">parseAST</span>(ctx.codeBlock);<br/>
                   &nbsp;&nbsp;&nbsp;&nbsp;return ctx.<span className="text-yellow-200">generateRefactor</span>();<br/>
                   &nbsp;&nbsp;&#125;<br/>
                   &#125;
                 </div>
               </div>
           </motion.div>
        </div>
      </section>

      <Footer setView={setView} />
    </div>
  );
};
