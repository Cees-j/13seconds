"use client";
import { motion } from "framer-motion";
import { Disc3 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spinning vinyl record */}
      <motion.div
        className="relative w-48 h-48 mb-8"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        {/* Outer ring */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--quiz-gradient)" }}
        />
        
        {/* Grooves */}
        <div className="absolute inset-3 rounded-full bg-background/20" />
        <div className="absolute inset-6 rounded-full bg-background/15" />
        <div className="absolute inset-9 rounded-full bg-background/10" />
        
        {/* Center */}
        <div className="absolute inset-12 rounded-full bg-card flex items-center justify-center shadow-inner">
          <Disc3 className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="text-2xl md:text-3xl font-bold text-center text-gold-light drop-shadow-[0_0_20px_hsl(48,95%,78%,0.5)]"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Next Question Loading...
      </motion.p>

      {/* Dots animation */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ y: [-10, 0, -10] }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

