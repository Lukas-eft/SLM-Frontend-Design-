import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Github, Cpu, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { FeatureCard } from '../components/FeatureCard';
import { useLanguage } from '../contexts/LanguageContext';

export const LoginView = ({ setView, handleLogin, showPassword, setShowPassword }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black flex font-sans selection:bg-white/30">
      {/* Left Side - Branding & Features (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-[#050505] relative overflow-hidden flex-col justify-between p-12 border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-size-[32px_32px]" />
        
        <div className="relative z-10">
          <div onClick={() => setView('landing')}>
            <Logo />
          </div>
          
          <div className="space-y-12 max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold tracking-tight leading-[1.1] bg-linear-to-br from-white to-zinc-500 bg-clip-text text-transparent">
                {t.login.welcome}
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                {t.login.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <FeatureCard 
                title={t.login.features.management.title}
                desc={t.login.features.management.desc}
                visual={
                    <Logo showText={false} size="md" />
                }
              />
              <FeatureCard 
                title={t.login.features.insights.title}
                desc={t.login.features.insights.desc}
                visual={
                  <div className="flex flex-col gap-2 w-20">
                    {[1,2,3].map(i => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-1.5 bg-white/20 rounded-full" 
                        style={{ width: `${30 + Math.random() * 70}%` }}
                      />
                    ))}
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-xs text-zinc-600 font-medium">
          <span>© 2026 Frontend SLM</span>
          <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <div onClick={() => setView('landing')}>
            <Logo size="sm" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-105"
        >
          <button 
            onClick={() => setView('landing')}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">{t.login.backHome}</span>
          </button>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">{t.login.title}</h1>
            <p className="text-zinc-500 mt-2">{t.login.desc}</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { 
            e.preventDefault(); 
            const email = e.target[0].value;
            const password = e.target[1].value;
            if (!handleLogin(email, password)) {
              alert('Invalid credentials');
            }
          }}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t.login.email}</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t.login.password}</label>
                <button type="button" className="text-[11px] text-zinc-500 hover:text-white transition-colors">{t.login.forgot}</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {t.login.submit}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
                <span className="bg-black px-4 text-zinc-600">{t.login.or}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-all group">
                <Github className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-xs font-medium text-zinc-400 group-hover:text-white">GitHub</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-all group">
                <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                <span className="text-xs font-medium text-zinc-400 group-hover:text-white">Google</span>
              </button>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-center text-sm text-zinc-500">
              {t.login.noAccount} {' '}
              <button onClick={() => setView('signup')} className="text-white hover:underline underline-offset-4 font-bold transition-colors">
                {t.login.signup}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
