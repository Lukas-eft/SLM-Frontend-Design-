import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Cpu, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BentoCard } from '../components/BentoCard';
import { useLanguage } from '../contexts/LanguageContext';

export const LandingView = ({ setView, user }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install ilu-slm@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <Navbar setView={setView} user={user} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-dashed border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-dashed border-white/10 rounded-full translate-x-1/2 translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <h1 
              className="text-6xl lg:text-[120px] font-extrabold tracking-tighter leading-[0.85] max-w-5xl mx-auto bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent"
              dangerouslySetInnerHTML={{ __html: t.hero.title }}
            />

            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed font-medium">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Command Box */}
            <div className="max-w-md mx-auto pt-8">
              <div 
                onClick={handleCopy}
                className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-full py-3.5 px-6 flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer shadow-2xl active:scale-95"
              >
                <div className="flex items-center gap-3 font-mono text-[13px] tracking-tight">
                  <span className="text-zinc-600 font-medium">$</span>
                  <span className="text-zinc-200 font-medium">pip install ilu-slm@latest</span>
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
                        <Copy className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
              <button 
                onClick={() => setView('signup')}
                className="w-full sm:w-auto bg-white text-black font-bold px-12 py-3.5 rounded-md hover:bg-zinc-200 transition-all active:scale-95 text-sm shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                {t.hero.ctaPrimary}
              </button>
              <button 
                onClick={() => setView('login')}
                className="w-full sm:w-auto bg-black text-white border border-white/10 font-bold px-12 py-3.5 rounded-md hover:bg-zinc-900 transition-all active:scale-95 text-sm"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* "What makes ILU.slm special?" Section - Bento Grid Style */}
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

          <div className="md:col-span-1 p-8 rounded-3xl bg-zinc-900/20 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[20px_20px]" />
            <div className="relative z-10 space-y-4">
              <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/20" />)}
              </div>
              <h3 className="text-2xl font-bold">ILU v1.0</h3>
              <p className="text-sm text-zinc-500">{t.features.releaseNotes}</p>
            </div>
            <div className="relative z-10 flex justify-end mt-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-4 h-4" />
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

      <Footer setView={setView} />
    </div>
  );
};
