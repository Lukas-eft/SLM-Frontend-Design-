import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Plus, 
  User, 
  LogOut, 
  History,
  Globe,
  Paperclip,
  ArrowUp,
  AtSign,
  ChevronDown,
  Check
} from 'lucide-react';

const AnimatedHamburger = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 focus:outline-none group"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        className="block w-6 h-0.5 bg-zinc-500 group-hover:bg-white transition-colors"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="block w-6 h-0.5 bg-zinc-500 group-hover:bg-white transition-colors"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        className="block w-6 h-0.5 bg-zinc-500 group-hover:bg-white transition-colors"
      />
    </button>
  );
};

export const ChatView = ({ 
  setView, 
  isSidebarCollapsed, 
  setIsSidebarCollapsed, 
  user, 
  handleLogout 
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  // Logic States
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Auto');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;
    
    const newMessage = { 
        role: 'user', 
        content: inputValue,
        files: attachedFiles,
        meta: { model: selectedModel, webSearch: isWebSearchEnabled }
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    setAttachedFiles([]);
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
    // Reset input so same file can be uploaded again
    e.target.value = null;
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-white/20">
      {/* Hidden File Input */}
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-zinc-950 border-r border-white/5 transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col h-full p-5 overflow-hidden">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} mb-10`}>
            {!isSidebarCollapsed && (
              <div className="font-bold tracking-tighter text-xl cursor-pointer" onClick={() => setView('landing')}>
                ILU<span className="text-zinc-500">.slm</span>
              </div>
            )}
            <AnimatedHamburger 
              isOpen={!isSidebarCollapsed} 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
            />
          </div>
          
          <button 
            onClick={() => setMessages([])}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-2 px-4'} w-full bg-white text-black rounded-md py-2 font-bold text-[11px] uppercase tracking-widest mb-8 hover:bg-zinc-200 transition-all`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            {!isSidebarCollapsed && <span className="whitespace-nowrap">New Chat</span>}
          </button>

          <div className="flex-1 overflow-y-auto">
            {!isSidebarCollapsed && (
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-6 px-2">History</p>
            )}
            <div className="space-y-1">
              <div className={`flex items-center gap-3 p-2 rounded-lg text-zinc-500 hover:bg-white/5 hover:text-zinc-300 cursor-pointer transition-all ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                <History className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span className="text-xs font-medium truncate">Optimization Logic...</span>}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            <button onClick={() => setView('profile')} className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} text-zinc-500 hover:text-white transition-colors w-full px-2`}>
              <User className="w-4 h-4" />
              {!isSidebarCollapsed && <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>}
            </button>
            <button onClick={handleLogout} className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} text-zinc-500 hover:text-red-500 transition-colors w-full px-2`}>
              <LogOut className="w-4 h-4" />
              {!isSidebarCollapsed && <span className="text-[10px] font-bold uppercase tracking-widest">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <header className="h-16 border-b border-white/5 flex items-center justify-end px-8 bg-black/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
              <button 
                onClick={() => setView('profile')}
                className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-900 flex items-center justify-center hover:border-white/30 transition-all"
              >
                {user?.profilePic ? <img src={user.profilePic} alt="P" className="w-full h-full object-cover" /> : <User className="w-4 h-4 text-zinc-500" />}
              </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-12 relative z-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto">
              <div className="w-full text-center mb-16">
                <h1 className="text-6xl font-bold text-white tracking-tighter mb-4">
                  ILU<span className="text-zinc-600">.slm</span>
                </h1>
                <p className="text-zinc-500 text-lg font-medium">Absolute precision and speed. Built for your privacy.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[
                  { title: "Built-in Optimizations", desc: "How do you handle token caching?" },
                  { title: "Python Server Components", desc: "Show me a sample route handler." },
                  { title: "Dynamic Streaming", desc: "Explain the generator integration." },
                  { title: "Privacy Protocol", desc: "Where is my data stored exactly?" }
                ].map((item, i) => (
                  <button 
                    key={i}
                    onClick={() => setInputValue(item.desc)}
                    className="p-6 rounded-xl bg-zinc-950 border border-white/5 text-left hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{item.title}</p>
                    </div>
                    <p className="text-white text-sm font-medium leading-relaxed group-hover:text-zinc-300">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-6 py-4 rounded-2xl text-[15px] leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-white text-black font-medium shadow-[0_4px_20px_rgba(255,255,255,0.1)]' 
                    : 'bg-zinc-950 border border-white/5 text-zinc-200'
                  }`}>
                    {msg.content}
                    {msg.files?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {msg.files.map((f, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-1 rounded bg-black/10 border border-black/5">📎 {f.name}</span>
                            ))}
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Container */}
        <div className="p-8 bg-transparent relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[24px] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-white/20 transition-all">
              
              {/* Context Pill */}
              <div className="flex items-center gap-2 mb-2 px-2">
                <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                  <AtSign className="w-3 h-3" />
                  Context
                </button>
                {attachedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-zinc-400">
                        <span className="truncate max-w-[100px]">{file.name}</span>
                        <button onClick={() => setAttachedFiles(f => f.filter((_, idx) => idx !== i))} className="hover:text-white text-xs ml-1">×</button>
                    </div>
                ))}
              </div>

              <textarea 
                ref={textareaRef}
                rows="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask, search, or build anything..."
                className="w-full bg-transparent resize-none text-white placeholder:text-zinc-700 focus:outline-none text-[16px] px-2 py-1 max-h-[200px] overflow-y-auto"
              />

              <div className="flex items-center justify-between mt-3 px-1">
                <div className="flex items-center gap-1 relative">
                  {/* Paperclip / File Upload */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-zinc-600 hover:text-white transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <div className="h-4 w-px bg-white/5 mx-1" />

                  {/* Model Selector Dropdown */}
                  <div className="relative">
                    <button 
                        onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-1 text-zinc-500 hover:text-white text-xs font-bold transition-colors"
                    >
                        {selectedModel} <ChevronDown className={`w-3 h-3 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {isModelDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-0" onClick={() => setIsModelDropdownOpen(false)} />
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute bottom-full mb-2 left-0 w-40 bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-10"
                                >
                                    {['Auto', 'ILU.slm Pro', 'ILU.slm Lite'].map((model) => (
                                        <button 
                                            key={model}
                                            onClick={() => {
                                                setSelectedModel(model);
                                                setIsModelDropdownOpen(false);
                                            }}
                                            className="flex items-center justify-between w-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                            {model}
                                            {selectedModel === model && <Check className="w-3 h-3 text-white" />}
                                        </button>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                  </div>

                  {/* Web Search Toggle */}
                  <button 
                    onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition-all rounded-md ${isWebSearchEnabled ? 'text-white bg-white/10' : 'text-zinc-500 hover:text-white'}`}
                  >
                    <Globe className={`w-3.5 h-3.5 ${isWebSearchEnabled ? 'text-emerald-500' : ''}`} />
                    Sources
                  </button>
                </div>

                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim() && attachedFiles.length === 0}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    (inputValue.trim() || attachedFiles.length > 0)
                    ? 'bg-white text-black scale-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-zinc-900 text-zinc-700 scale-95 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ArrowUp className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-4">
                 <p className="text-[9px] text-zinc-800 uppercase tracking-[0.2em] font-bold">AI can make mistakes.</p>
                 <p className="text-[9px] text-zinc-800 uppercase tracking-[0.2em] font-bold"> Verify every Information</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};