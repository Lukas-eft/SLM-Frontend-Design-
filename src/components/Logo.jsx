import React from 'react';
import { Layers } from 'lucide-react';

export const Logo = ({ showText = true, className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className={`flex items-center gap-4 cursor-pointer group ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Logo Glow Effect */}
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Custom Logo Mark */}
        <div className={`relative ${sizeClasses[size]} flex items-center justify-center bg-black border border-white/10 rounded-xl overflow-hidden group-hover:border-white/30 transition-all duration-300`}>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[6px_6px]" />
          <Layers className={`${iconSizes[size]} text-white relative z-10 group-hover:scale-110 transition-transform duration-500`} />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/5 rounded-full blur-md" />
        </div>
        
        {showText && (
          <>
            <div className={`h-6 w-px bg-white/10 mx-4 hidden sm:block`} />
            <div className="flex flex-col -space-y-1 hidden sm:flex">
              <span className={`font-black tracking-tighter text-white ${size === 'lg' ? 'text-2xl' : 'text-xl'}`}>
                Frontend<span className="text-zinc-500 italic">.slm</span>
              </span>
              <span className={`text-[9px] font-bold text-zinc-600 tracking-[0.2em] uppercase`}>Intelligence</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
