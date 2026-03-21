import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  User, 
  Globe,
  Paperclip,
  ArrowUp,
  AtSign,
  ChevronDown,
  Check,
  Command,
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);

const ActionTooltip = ({ text, children, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full mb-3 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-3 left-1/2 -translate-x-1/2',
    'bottom-right': 'top-full mt-3 right-0',
    'top-right': 'bottom-full mb-3 right-0',
    'bottom-left': 'top-full mt-3 left-0',
  };
  
  return (
    <div className="group/tooltip relative flex items-center justify-center">
      {children}
      <div className={`absolute ${positionClasses[position]} px-2.5 py-1.5 bg-black border border-white/10 rounded-lg text-[10px] text-zinc-300 opacity-0 group-hover/tooltip:opacity-100 transition-all pointer-events-none z-50 shadow-2xl font-bold tracking-widest uppercase whitespace-nowrap`}>
        {text}
      </div>
    </div>
  );
};

export const ChatView = ({ 
  setView, 
  isSidebarCollapsed, 
  setIsSidebarCollapsed, 
  user, 
  handleLogout,
  messages: initialMessages = [],
  chatHistory: initialHistory = []
}) => {
  useLanguage();
  
  // Chat State
  const [history, setHistory] = useState(initialHistory.length > 0 ? initialHistory : [
    { id: '1', title: 'Token Caching', messages: initialMessages }
  ]);
  const [currentChatId, setCurrentChatId] = useState(history[0]?.id || '1');
  
  const currentChat = history.find(c => c.id === currentChatId);
  const messages = currentChat?.messages || [];

  const [inputValue, setInputValue] = useState('');
  
  // Logic States
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Auto');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Handlers for History
  const handleSelectChat = (id) => setCurrentChatId(id);
  
  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newChat = { id: newId, title: 'New Chat', messages: [] };
    setHistory([newChat, ...history]);
    setCurrentChatId(newId);
  };

  const handleDeleteChat = (id) => {
    const newHistory = history.filter(c => c.id !== id);
    setHistory(newHistory);
    if (currentChatId === id) {
      setCurrentChatId(newHistory[0]?.id || null);
    }
  };

  const handleRenameChat = (id, newTitle) => {
    setHistory(history.map(c => c.id === id ? { ...c, title: newTitle } : c));
  };

  // Helper to set messages for the current chat
  const setMessages = (newMessages) => {
    setHistory(prev => prev.map(c => c.id === currentChatId ? { ...c, messages: typeof newMessages === 'function' ? newMessages(c.messages) : newMessages } : c));
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;
    
    const newMessage = { 
        role: 'user', 
        content: inputValue,
        files: attachedFiles,
        meta: { model: selectedModel, webSearch: isWebSearchEnabled }
    };
    
    // Update history item title if it's the first message
    if (messages.length === 0) {
      const generatedTitle = inputValue.slice(0, 30) + (inputValue.length > 30 ? '...' : '');
      setHistory(prev => prev.map(c => c.id === currentChatId ? { ...c, title: generatedTitle, messages: [newMessage] } : c));
      setMessages([newMessage]);
    } else {
      setMessages([...messages, newMessage]);
    }

    setInputValue('');
    setAttachedFiles([]);
    
    // Simulated Backend Response
    setTimeout(() => {
       const aiMsg = {
         role: 'assistant',
         content: "Here is an example demonstrating Markdown and Syntax Highlighting:\n\n### Python FastAPI Snippet\n\n```python\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get('/')\ndef read_root():\n    return {'status': 'success', 'model': 'ILU.slm'}\n```\n\nYou can run this locally using `uvicorn main:app --reload`.\n\nLet me know if you want to connect this to our dashboard API!"
       };
       setMessages(prev => [...prev, aiMsg]);
    }, 1000);
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

      {/* Sidebar Component */}
      <Sidebar 
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setView={setView}
        handleLogout={handleLogout}
        handleNewChat={handleNewChat}
        handleSelectChat={handleSelectChat}
        handleDeleteChat={handleDeleteChat}
        handleRenameChat={handleRenameChat}
        currentChatId={currentChatId}
        user={user}
        chatHistory={history}
      />

      {/* Main Chat Area */}
      <motion.main 
        animate={{ 
          marginLeft: isSidebarCollapsed ? 64 : 260,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-w-0 relative"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <header className="h-16 border-b border-white/5 flex items-center justify-end px-8 bg-black/50 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
              <ActionTooltip text="Profile Settings" position="bottom-right">
                <button 
                  onClick={() => setView('profile')}
                  className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-900 flex items-center justify-center hover:border-white/30 transition-all"
                >
                  {user?.profilePic ? <img src={user.profilePic} alt="P" className="w-full h-full object-cover" /> : <User className="w-4 h-4 text-zinc-500" />}
                </button>
              </ActionTooltip>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-12 relative z-10 no-scrollbar">
          {messages.length === 0 ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}} className="w-full text-center mb-16">
                <h1 className="text-6xl font-black tracking-tighter mb-4 bg-[linear-gradient(to_right,#fff,#71717a)] bg-clip-text text-transparent">
                  ILU<span className="text-zinc-500 font-bold">.slm</span>
                </h1>
                <p className="text-zinc-400 text-lg font-medium">Absolute precision and speed. Built for your privacy.</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {[
                  { title: "Built-in Optimizations", desc: "How do you handle token caching?" },
                  { title: "Python Server Components", desc: "Show me a sample route handler." },
                  { title: "Dynamic Streaming", desc: "Explain the generator integration." },
                  { title: "Privacy Protocol", desc: "Where is my data stored exactly?" }
                ].map((item, i) => (
                  <motion.button 
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 }}}
                    key={i}
                    onClick={() => setInputValue(item.desc)}
                    className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 text-left hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all group active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.15em] group-hover:text-zinc-300 transition-colors">{item.title}</p>
                    </div>
                    <p className="text-white text-sm font-semibold leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center shrink-0 shadow-lg mt-1">
                      <Command className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-xl ${
                    msg.role === 'user' 
                    ? 'bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 text-white rounded-tr-sm' 
                    : 'bg-transparent text-zinc-300 rounded-tl-sm w-full'
                  }`}>
                    {msg.role === 'user' ? (
                        msg.content
                    ) : (
                        <div className="space-y-4 font-medium">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold tracking-tight mt-6 mb-2 text-white" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-xl font-bold tracking-tight mt-6 mb-2 text-white" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-lg font-bold tracking-tight mt-4 mb-2 text-white" {...props} />,
                                    code(props) {
                                        const {children, className, node, inline, ...rest} = props
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <div className="rounded-xl overflow-hidden border border-white/10 my-4 shadow-2xl">
                                                <div className="flex items-center justify-between px-4 py-2 bg-[#0d0d0d] border-b border-white/5">
                                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{match[1]}</span>
                                                </div>
                                                <SyntaxHighlighter
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={vscDarkPlus || {}}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    customStyle={{ margin: 0, background: '#050505', fontSize: '13px', padding: '16px' }}
                                                />
                                            </div>
                                        ) : (
                                            <code {...rest} className={`${className || ''} bg-white/10 px-1.5 py-0.5 rounded-md text-emerald-400 font-mono text-[13px]`}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    )}
                    {msg.files?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {msg.files.map((f, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                  <Paperclip className="w-3 h-3 text-zinc-400" />
                                  <span className="font-medium text-zinc-300">{f.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                     <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-800 flex items-center justify-center shrink-0 shadow-lg mt-1">
                      {user?.profilePic ? <img src={user.profilePic} alt="P" className="w-full h-full object-cover" /> : <User className="w-4 h-4 text-zinc-400" />}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Container */}
        <div className="px-8 pt-4 pb-6 bg-gradient-to-t from-black via-black/90 to-transparent relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:ring-1 focus-within:ring-white/20 focus-within:border-white/20 transition-all duration-300">
              
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

              <TextareaAutosize 
                ref={textareaRef}
                minRows={1}
                maxRows={8}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask, search, or build anything..."
                className="w-full bg-transparent resize-none text-white placeholder:text-zinc-600 focus:outline-none text-[16px] px-3 py-2 no-scrollbar font-medium leading-relaxed"
              />

              <div className="flex items-center justify-between mt-3 px-1">
                <div className="flex items-center gap-1 relative">
                  {/* Paperclip / File Upload */}
                  <ActionTooltip text="Attach File" position="top">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-zinc-600 hover:text-white transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </ActionTooltip>

                  <div className="h-4 w-px bg-white/5 mx-1" />

                  {/* Model Selector Dropdown */}
                  <ActionTooltip text="Select SLM Model" position="top">
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
                  </ActionTooltip>

                  {/* Web Search Toggle */}
                  <ActionTooltip text="Toggle Web Sources" position="top">
                    <button 
                      onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition-all rounded-md ${isWebSearchEnabled ? 'text-white bg-white/10' : 'text-zinc-500 hover:text-white'}`}
                    >
                      <Globe className={`w-3.5 h-3.5 ${isWebSearchEnabled ? 'text-emerald-500' : ''}`} />
                      Sources
                    </button>
                  </ActionTooltip>
                </div>

                <ActionTooltip text="Send Message" position="top-right">
                  <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() && attachedFiles.length === 0}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      (inputValue.trim() || attachedFiles.length > 0)
                      ? 'bg-white text-black scale-100 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95' 
                      : 'bg-zinc-900 text-zinc-600 scale-95 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4 stroke-[3]" />
                  </button>
                </ActionTooltip>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-3">
                 <p className="text-[9px] text-zinc-800 uppercase tracking-[0.2em] font-bold">AI can make mistakes.</p>
                 <p className="text-[9px] text-zinc-800 uppercase tracking-[0.2em] font-bold"> Verify every Information</p>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};