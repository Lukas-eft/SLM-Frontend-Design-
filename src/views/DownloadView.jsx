import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Terminal, HardDrive, Cpu, Apple, Network, ArrowLeft, Monitor, LayoutGrid } from 'lucide-react';

export const DownloadView = ({ setView, user }) => {
  const [downloadingModel, setDownloadingModel] = useState(null);
  const [activeOS, setActiveOS] = useState('windows');

  const osOptions = [
    { id: 'windows', label: 'Windows', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'macos', label: 'macOS', icon: <Apple className="w-4 h-4" /> },
    { id: 'linux', label: 'Linux', icon: <Terminal className="w-4 h-4 text-zinc-400" /> }
  ];

  const getArchitectures = (osId) => {
    switch(osId) {
      case 'macos':
        return [
          { id: 'apple-silicon', label: 'Apple Silicon (M1/M2/M3)', file: 'frontend-8b-pro-arm64.gguf' },
          { id: 'intel', label: 'Intel Mac (x64)', file: 'frontend-8b-pro-x64.gguf' }
        ];
      case 'linux':
        return [
          { id: 'x64', label: 'Linux Server (x64)', file: 'frontend-8b-pro-linux-x64.gguf' },
          { id: 'arm64', label: 'Linux (ARM64)', file: 'frontend-8b-pro-linux-arm64.gguf' }
        ];
      case 'windows':
      default:
        return [
          { id: 'x64', label: 'Windows (x64)', file: 'frontend-8b-pro-windows-x64.gguf' },
          { id: 'arm64', label: 'Windows (ARM64)', file: 'frontend-8b-pro-windows-arm64.gguf' }
        ];
    }
  };

  const architectures = getArchitectures(activeOS);

  const handleDownload = (archId) => {
    setDownloadingModel(archId);
    setTimeout(() => {
        setDownloadingModel(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative selection:bg-white/20">
      
      {/* Premium Background Decor similar to LandingView */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff08_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-zinc-500/10 blur-[140px] rounded-full mix-blend-screen animate-pulse duration-[3000ms] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-zinc-600/10 blur-[140px] rounded-full mix-blend-screen animate-pulse duration-[3000ms] delay-500 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('landing')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-tight">Back</span>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-32 relative z-10 min-h-screen flex flex-col justify-center">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-tight"
          >
            Frontend-8B Pro
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Download the raw GGUF weights. Absolute privacy, zero data collection, and blazing fast local inference directly on your metal.
          </motion.p>
        </div>

        {/* Unified Model Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-[#050505] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:border-white/20 transition-all duration-700 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
           {/* Subtle metallic reflection */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.05),transparent_100%)] pointer-events-none" />
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           
           <div className="relative z-10 w-full">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 border-b border-white/5 pb-12 w-full">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    Latest Available Revisions
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white mb-4">Specs & Requirements</h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed max-w-lg mb-6">
                    The optimal balance of speed and reasoning. Perfect for local coding assistance, structured data parsing, and daily offline workflows.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                        <HardDrive className="w-4 h-4" /> 4.8 GB
                    </span>
                    <span className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> 8 GB VRAM
                    </span>
                  </div>
                </div>
                
                <div className="shrink-0 bg-[#000000] border border-white/10 rounded-3xl p-6 flex flex-col gap-4 md:max-w-[340px] shadow-2xl">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" /> Quick Start via CLI
                    </span>
                    <div 
                      onClick={() => navigator.clipboard.writeText('ollama run frontend-8b-pro')}
                      className="flex items-center justify-between gap-6 bg-white/5 rounded-xl p-4 cursor-pointer hover:bg-white/10 transition-colors group/cmd"
                    >
                      <code className="text-sm text-zinc-200 font-mono">ollama run frontend-8b-pro</code>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover/cmd:text-white transition-colors">Copy</span>
                    </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="space-y-6 w-full">
                <h4 className="text-xs font-bold tracking-widest uppercase text-white border-l-2 border-white pl-3 mt-8">Select Operating System</h4>
                
                <div className="flex flex-wrap gap-4">
                  {osOptions.map(os => (
                    <button
                      key={os.id}
                      onClick={() => setActiveOS(os.id)}
                      className={`flex items-center gap-3 px-8 py-5 rounded-2xl text-sm font-bold tracking-tight transition-all border ${
                        activeOS === os.id 
                          ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.15)] scale-[1.02]'
                          : 'bg-black/50 text-zinc-400 border-white/5 hover:bg-white/5 hover:border-white/10 hover:text-white'
                      }`}
                    >
                      {os.icon}
                      {os.label}
                    </button>
                  ))}
                </div>

                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {architectures.map(arch => (
                      <button 
                        key={arch.id}
                        onClick={() => handleDownload(`${activeOS}-${arch.id}`)}
                        disabled={downloadingModel !== null}
                        className={`w-full p-8 rounded-3xl flex flex-col justify-between items-start gap-6 transition-all border ${
                          downloadingModel === `${activeOS}-${arch.id}`
                            ? 'bg-zinc-900 border-zinc-700 cursor-wait'
                            : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/[0.03] group hover:-translate-y-1 hover:shadow-2xl'
                        }`}
                      >
                        <div className="w-full flex items-center justify-between">
                            <span className="text-xl font-bold text-white tracking-tight">{arch.label}</span>
                            {downloadingModel === `${activeOS}-${arch.id}` ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black hover:scale-110 transition-all duration-300">
                                    <Download className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-400 transition-colors">
                            {downloadingModel === `${activeOS}-${arch.id}` ? 'Downloading weights...' : `Download .gguf direct object`}
                        </span>
                      </button>
                  ))}
                </div>
              </div>

           </div>
        </motion.div>

      </main>
    </div>
  );
};
