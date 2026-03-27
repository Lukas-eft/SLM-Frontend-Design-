import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Cpu, Database, Blocks, Shield, Save, Key, Network, ArrowLeft, Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const SettingsView = ({ setView }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('api');
  
  // States for API Config
  const [apiEndpoint, setApiEndpoint] = useState(localStorage.getItem('frontend_api_endpoint') || 'http://localhost:11434');
  const [apiKey, setApiKey] = useState(localStorage.getItem('frontend_api_key') || '');
  const [selectedProvider, setSelectedProvider] = useState(localStorage.getItem('frontend_api_provider') || 'ollama');
  
  // State for System Prompt
  const [systemPrompt, setSystemPrompt] = useState(localStorage.getItem('frontend_system_prompt') || 'You are a highly capable AI assistant running via Frontend.slm interface...');
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    if (activeTab === 'api') {
      localStorage.setItem('frontend_api_endpoint', apiEndpoint);
      localStorage.setItem('frontend_api_key', apiKey);
      localStorage.setItem('frontend_api_provider', selectedProvider);
    } else if (activeTab === 'system') {
      localStorage.setItem('frontend_system_prompt', systemPrompt);
    }
    setTimeout(() => setIsSaving(false), 800);
  };

  const tabs = [
    { id: 'api', label: 'Connections & API', icon: Network },
    { id: 'system', label: 'System Behavior', icon: Terminal },
    { id: 'models', label: 'Model Library', icon: Blocks },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* Settings Navigation Sidebar */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full md:w-64 shrink-0 bg-[#050505] border-r border-white/5 flex flex-col p-6 z-20"
      >
        <button 
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all w-fit mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Return</span>
        </button>

        <h2 className="text-xl font-bold tracking-tight mb-6">Dashboard</h2>
        
        <nav className="flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white font-bold shadow-inner' 
                  : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300 font-medium'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : ''}`} />
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto p-8 lg:p-12 relative z-10 pt-16">
          <AnimatePresence mode="wait">
            
            {activeTab === 'api' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight mb-2">API Configuration</h1>
                  <p className="text-zinc-500 text-sm">Connect your local inference engine or cloud providers.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-6">
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Provider</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['ollama', 'openai', 'anthropic', 'custom'].map(provider => (
                            <button
                                key={provider}
                                onClick={() => setSelectedProvider(provider)}
                                className={`py-3 px-4 rounded-xl border flex items-center justify-center text-xs font-bold uppercase tracking-wider transition-all ${
                                    selectedProvider === provider ? 'bg-white text-black border-transparent shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/30'
                                }`}
                            >
                                {provider}
                            </button>
                        ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Inference Endpoint</label>
                    <div className="relative">
                        <Network className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input 
                            type="text" 
                            value={apiEndpoint}
                            onChange={(e) => setApiEndpoint(e.target.value)}
                            placeholder="http://localhost:11434"
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono placeholder:text-zinc-700"
                        />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">API Key (Optional for Local)</label>
                    <div className="relative">
                        <Key className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                        <input 
                            type="password" 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="sk-..."
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono placeholder:text-zinc-700"
                        />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm tracking-tight hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    {isSaving ? <Shield className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save Configuration'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div
                key="system"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight mb-2">System Instructions</h1>
                  <p className="text-zinc-500 text-sm">Define how your SLM interacts with you by altering the foundational prompt.</p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-6">
                  <div className="space-y-4 h-full">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Master Prompt</span>
                        <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[9px] border border-emerald-500/20">Active</span>
                    </label>
                    <textarea 
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="You are a helpful assistant..."
                        className="w-full h-64 bg-black border border-white/10 rounded-xl p-6 text-sm focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all font-mono placeholder:text-zinc-700 resize-none leading-relaxed text-zinc-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold text-sm tracking-tight hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    {isSaving ? <Shield className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Saving...' : 'Save Instructions'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'models' && (
              <motion.div
                key="models"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8 flex flex-col items-center justify-center h-[60vh] text-center"
              >
                 <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-6">
                    <Blocks className="w-8 h-8 text-zinc-500" />
                 </div>
                 <h2 className="text-2xl font-bold tracking-tight">Model Registry UI</h2>
                 <p className="text-zinc-500 max-w-sm">You can build out further UI here to download models directly from Ollama or HuggingFace within the app.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
