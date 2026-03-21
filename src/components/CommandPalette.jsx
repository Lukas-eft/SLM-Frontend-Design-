import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Settings, Home, MessageSquare, MonitorPlay, Zap, X } from 'lucide-react';

export const CommandPalette = ({ isOpen, setIsOpen, setView }) => {
  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);

  const runCommand = (command) => {
    setIsOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full max-w-2xl relative z-10"
          >
            <Command className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
              <div className="flex items-center px-4 border-b border-white/5">
                <Search className="w-5 h-5 text-zinc-500 shrink-0" />
                <Command.Input 
                    placeholder="Search commands, navigate, or create..." 
                    className="flex-1 bg-transparent px-3 py-4 text-white placeholder:text-zinc-600 focus:outline-none text-[15px]"
                />
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 text-[10px] font-mono">ESC</span>
                </div>
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 no-scrollbar">
                <Command.Empty className="py-6 text-center text-sm text-zinc-500">No results found.</Command.Empty>

                <Command.Group heading={<span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2 pb-2 block pt-2">Navigation</span>}>
                  <Command.Item 
                    onSelect={() => runCommand(() => setView('landing'))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-zinc-300 hover:text-white hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                  >
                    <Home className="w-4 h-4 text-zinc-500" />
                    <span>Go to Home</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => setView('chat'))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-zinc-300 hover:text-white hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-zinc-500" />
                    <span>Go to Chat</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => setView('settings'))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-zinc-300 hover:text-white hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4 text-zinc-500" />
                    <span>Dashboard & Settings</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading={<span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2 pb-2 block pt-4">Actions</span>}>
                  <Command.Item 
                    onSelect={() => runCommand(() => { setView('chat'); /* trigger new */ })}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-zinc-300 hover:text-white hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                  >
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span>Start New Chat</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => console.log('Toggle model'))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-zinc-300 hover:text-white hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-white transition-colors"
                  >
                    <MonitorPlay className="w-4 h-4 text-zinc-500" />
                    <span>Switch Model Config</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
