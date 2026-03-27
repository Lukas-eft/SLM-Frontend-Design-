import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = ({ setView }) => {
  const { language, setLanguage, t } = useLanguage();

  const footerSections = [
    {
      title: t.footer.quicklinks,
      links: [
        { label: 'Home', action: () => setView('landing') },
        { label: 'Models', action: () => {} },
        { label: 'Documentation', action: () => setView('docs') },
        { label: 'Community', action: () => {} },
        { label: 'Research', action: () => {} },
        { label: 'Blog', action: () => {} },
        { label: 'Careers', action: () => {} }
      ]
    },
    {
      title: t.footer.ilu,
      links: [
        { label: 'About Frontend', action: () => {} },
        { label: 'Newsletter', action: () => {} },
        { label: 'Imprint', action: () => {} },
        { label: 'Privacy Policy', action: () => {} },
        { label: 'Legal Notice', action: () => {} },
        { label: 'Cookie Policy', action: () => {} },
        { label: 'Transparency Report', action: () => {} }
      ]
    },
    {
      title: t.footer.follow,
      links: [
        { label: 'Instagram', action: () => {} },
        { label: 'Facebook', action: () => {} },
        { label: 'TikTok', action: () => {} },
        { label: 'YouTube', action: () => {} },
        { label: 'X (Twitter)', action: () => {} },
        { label: 'Discord', action: () => {} },
        { label: 'GitHub', action: () => {} }
      ]
    }
  ];

  return (
    <footer className="bg-black text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Language Switcher */}
        <div className="flex justify-center gap-4 mb-12 text-sm font-bold">
          <button 
            onClick={() => setLanguage('de')}
            className={`${language === 'de' ? 'text-white' : 'text-zinc-500'} hover:text-white transition-colors`}
          >
            Deutsch
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`${language === 'en' ? 'text-white' : 'text-zinc-500'} hover:text-white transition-colors`}
          >
            English
          </button>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {footerSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-bold text-[15px] tracking-tight">{section.title}</h4>
                <div className="h-px w-full bg-white/10" />
              </div>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button 
                      onClick={link.action}
                      className="text-zinc-400 hover:text-white text-[13px] font-medium transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-6 text-[12px] font-medium text-zinc-500 uppercase tracking-wide">
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            </div>
            <p className="text-zinc-600 text-[12px] font-medium tracking-wide uppercase">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
