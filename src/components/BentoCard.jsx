import { div } from 'motion/react-client';
import React from 'react';

export const BentoCard = ({ title, description, visual, className = "", children }) => {
  return (
    <div className={`p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 flex flex-col gap-6 group hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)] relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[20px_20px] opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {visual && (
        <div className="h-48 rounded-2xl bg-zinc-900/30 border border-white/5 relative overflow-hidden flex items-center justify-center z-10 backdrop-blur-sm">
          {visual}
        </div>
      )}
      
      <div className="space-y-2 relative z-10">
        <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">{title}</h3>
        <p className="text-sm font-medium text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{description}</p>
      </div>
      
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};
