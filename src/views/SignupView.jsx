import React from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, ChevronLeft, Zap, Shield } from 'lucide-react';
import { Logo } from '../components/Logo';
import { FeatureCard } from '../components/FeatureCard';
import { useLanguage } from '../contexts/LanguageContext';

export const SignupView = ({ setView, handleSignup, showPassword, setShowPassword }) => {
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
                {t.signup.welcome}
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                {t.signup.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <FeatureCard 
                title={t.signup.features.speed.title}
                desc={t.signup.features.speed.desc}
                visual={
                  <div className="relative flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white/20" />
                    <motion.div 
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-white/10 blur-md rounded-full"
                    />
                  </div>
                }
              />
              <FeatureCard 
                title={t.signup.features.secure.title}
                desc={t.signup.features.secure.desc}
                visual={
                  <div className="flex flex-col gap-2 w-20">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        className="h-full bg-white/30" 
                      />
                    </div>
                    <div className="h-1.5 w-2/3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ delay: 0.2 }}
                        className="h-full bg-white/20" 
                      />
                    </div>
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

      {/* Right Side - Signup Form */}
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
            <span className="text-sm font-medium">{t.signup.backHome}</span>
          </button>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">{t.signup.title}</h1>
            <p className="text-zinc-500 mt-2">{t.signup.desc}</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { 
            e.preventDefault(); 
            const firstName = e.target[0].value;
            const lastName = e.target[1].value;
            const email = e.target[2].value;
            const password = e.target[3].value;
            if (!handleSignup({ firstName, lastName, email, password })) {
              alert('User already exists');
            }
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t.signup.firstName}</label>
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t.signup.lastName}</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t.signup.email}</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{t.signup.password}</label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/10 transition-all"
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
              <p className="text-[10px] text-zinc-600 ml-1">{t.signup.passwordHint}</p>
            </div>

            <div className="flex items-start gap-3 py-2">
              <div className="pt-0.5">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-black checked:bg-white transition-all cursor-pointer accent-white" required id="terms" />
              </div>
              <label htmlFor="terms" className="text-[11px] text-zinc-500 leading-relaxed cursor-pointer select-none">
                {t.signup.terms}
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] mt-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {t.signup.submit}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-center text-sm text-zinc-500">
              {t.signup.hasAccount} {' '}
              <button onClick={() => setView('login')} className="text-white hover:underline underline-offset-4 font-bold transition-colors">
                {t.signup.login}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
