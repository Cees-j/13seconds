"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Sparkles } from "lucide-react";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center border-primary/30">
          {/* Decorative sparkles */}
          <motion.div
            className="absolute top-4 left-8 text-accent"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-8 text-accent"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>

          {/* Content */}
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Prove You're a <span className="gradient-text">True Swiftie?</span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Free to play. No signup required. Just pure trivia fun with your favorite people.
          </p>

          <button className="group relative px-10 py-5 rounded-full glow-button text-lg font-semibold text-primary-foreground flex items-center gap-3 mx-auto animate-pulse-glow">
            <Play className="w-5 h-5 fill-current" />
            Create Your First Quiz
            <span className="absolute inset-0 rounded-full animate-shimmer" />
          </button>

          <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            1,247 players online right now
          </p>
        </div>
      </motion.div>
    </section>
  );
};