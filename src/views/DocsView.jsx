import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, Book, Code, Shield, Cpu, Zap, Menu, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navbar } from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';

export const DocsView = ({ setView, user }) => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('introduction');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = t.docs.sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.docs.content[item.id]?.body || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const allItems = t.docs.sections.flatMap(s => s.items);
  const currentIndex = allItems.findIndex(item => item.id === activeSection);
  const prevItem = allItems[currentIndex - 1];
  const nextItem = allItems[currentIndex + 1];
  const currentContent = t.docs.content[activeSection] || t.docs.content['introduction'];

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-white/30">
      <Navbar setView={setView} user={user} />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col lg:flex-row gap-12">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <aside className={`
          fixed inset-0 z-40 bg-black lg:relative lg:inset-auto lg:z-0 lg:block
          w-full lg:w-64 shrink-0 border-r border-white/5 pt-20 lg:pt-0
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="sticky top-24 space-y-8 px-6 lg:px-0">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder={t.docs.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-10 text-sm focus:outline-none focus:border-white/20 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="space-y-8">
              {filteredSections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            setActiveSection(item.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`
                            w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all
                            ${activeSection === item.id 
                              ? 'bg-white/10 text-white' 
                              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}
                          `}
                        >
                          {item.label}
                          {activeSection === item.id && <ChevronRight className="w-3 h-3" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filteredSections.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-zinc-500 italic">No results found for "{searchQuery}"</p>
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-12">
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium mb-4 uppercase tracking-widest">
                <Book className="w-3 h-3" />
                <span>Documentation</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white">{currentContent.title}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                {currentContent.title}
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                {t.docs.subtitle}
              </p>
            </div>

            <div className="prose prose-invert prose-zinc max-w-none">
              <div className="text-zinc-300 leading-relaxed space-y-6">
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-12 mb-6" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-8 mb-4" {...props} />,
                    p: ({node, ...props}) => <p className="mb-6" {...props} />,
                    code: ({node, inline, ...props}) => 
                      inline 
                        ? <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono text-sm" {...props} />
                        : <pre className="bg-zinc-900 border border-white/5 p-6 rounded-xl overflow-x-auto my-8"><code className="text-zinc-300 font-mono text-sm" {...props} /></pre>,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-6" {...props} />,
                    li: ({node, ...props}) => <li className="text-zinc-400" {...props} />
                  }}
                >
                  {currentContent.body}
                </ReactMarkdown>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
              {prevItem ? (
                <button 
                  onClick={() => setActiveSection(prevItem.id)}
                  className="text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600">{t.docs.previous}</span>
                    <span>{prevItem.label}</span>
                  </div>
                </button>
              ) : <div />}

              {nextItem ? (
                <button 
                  onClick={() => setActiveSection(nextItem.id)}
                  className="text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group text-right"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600">{t.docs.next}</span>
                    <span>{nextItem.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : <div />}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};
