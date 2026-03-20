import React from 'react';
import { motion } from 'motion/react';
import { Skeleton } from '../components/Skeleton';

export const LoadingView = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans selection:bg-white/30 overflow-hidden">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton width={32} height={32} />
            <Skeleton width={100} height={20} className="hidden sm:block" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Skeleton width={60} height={12} />
            <Skeleton width={60} height={12} />
            <Skeleton width={60} height={12} />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton width={80} height={36} />
            <Skeleton width={36} height={36} circle />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12 w-full">
          <div className="space-y-6 flex flex-col items-center">
            <Skeleton width="70%" height={100} className="max-w-4xl" />
            <Skeleton width="50%" height={100} className="max-w-3xl" />
          </div>

          <div className="max-w-2xl mx-auto space-y-4 flex flex-col items-center">
            <Skeleton width="90%" height={20} />
            <Skeleton width="80%" height={20} />
          </div>

          {/* Command Box Skeleton */}
          <div className="max-w-md mx-auto pt-8 w-full">
            <Skeleton width="100%" height={52} className="rounded-full" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
            <Skeleton width={180} height={48} />
            <Skeleton width={180} height={48} />
          </div>
        </div>
      </section>

      {/* Bento Grid Skeleton */}
      <section className="max-w-7xl mx-auto px-6 py-40 space-y-16 w-full">
        <div className="flex flex-col items-center gap-4">
          <Skeleton width={400} height={48} className="max-w-full" />
          <Skeleton width={300} height={20} className="max-w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 h-64 space-y-4">
              <Skeleton width="40%" height={24} />
              <Skeleton width="90%" height={16} />
              <Skeleton width="80%" height={16} />
              <div className="mt-auto pt-4">
                <Skeleton width="100%" height={80} className="rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t border-white/10 py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-4">
            <Skeleton width={120} height={24} />
            <Skeleton width={200} height={16} />
          </div>
          <div className="flex gap-12">
            <div className="space-y-3">
              <Skeleton width={80} height={16} />
              <Skeleton width={60} height={12} />
              <Skeleton width={60} height={12} />
            </div>
            <div className="space-y-3">
              <Skeleton width={80} height={16} />
              <Skeleton width={60} height={12} />
              <Skeleton width={60} height={12} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
