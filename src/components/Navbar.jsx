import React from 'react';
import { Menu, User, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

export const Navbar = ({ setView, user }) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div onClick={() => setView('landing')}>
          <Logo />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">{t.nav.features}</a>
          <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
          <button 
            onClick={() => setView('docs')}
            className="hover:text-white transition-colors"
          >
            {t.nav.docs}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <button 
              onClick={() => setView('chat')}
              className="hidden sm:block text-[13px] font-medium px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 transition-all"
            >
              {t.nav.chat}
            </button>
          ) : (
            <button 
              onClick={() => setView('login')}
              className="hidden sm:block text-[13px] font-medium px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 transition-all"
            >
              {t.nav.login}
            </button>
          )}
          {user ? (
            <button 
              onClick={() => setView('profile')}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
            >
              {user.profilePic ? (
                <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </button>
          ) : (
            <button 
              onClick={() => setView('signup')}
              className="bg-white text-black text-[13px] font-bold px-4 py-2 rounded-md hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              {t.nav.signup}
            </button>
          )}
          <button className="p-2 text-zinc-400 hover:text-white transition-colors md:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
