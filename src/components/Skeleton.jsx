import React from 'react';
import { motion } from 'motion/react';

export const Skeleton = ({ className, width, height, circle }) => {
  return (
    <div 
      className={`relative overflow-hidden bg-white/5 ${circle ? 'rounded-full' : 'rounded-lg'} ${className}`}
      style={{ width, height }}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
      />
    </div>
  );
};
