import React from 'react';

export const FeatureCard = ({ title, desc, visual }) => {
  return (
    <div className="p-6 rounded-3xl bg-white/3er border-white/10 flex flex-col gap-6 group hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] relative overflow-hidden">
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] bg-size-[16px_16px] opacity-40 group-hover:opacity-80 transition-opacity" />
      
      <div className="h-40 rounded-2xl bg-zinc-900/40 border border-white/5 flex items-center justify-center overflow-hidden relative z-10 backdrop-blur-sm">
        {visual}
      </div>
      
      <div className="space-y-2 relative z-10">
        <h4 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors tracking-tight">{title}</h4>
        <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{desc}</p>
      </div>
    </div>
  );
};
