"use client";

import { motion } from "framer-motion";
import { Sparkles, FloatingNotes } from "./Sparkles";
import { Play } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Sparkles overlay */}
      <Sparkles count={60} />
      <FloatingNotes />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            The Ultimate Swiftie Trivia
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-gold-light drop-shadow-[0_0_20px_hsl(48,95%,78%,0.5)]">13</span>
          <span className="text-foreground">seconds</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-2xl md:text-3xl text-lavender mb-4"
        >
          Think You Know Taylor Swift?
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Challenge your friends to the ultimate Taylor Swift trivia showdown. 
          Answer fast, score big, crown the biggest Swiftie.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/create-room" className="group relative px-8 py-4 rounded-full glow-button text-lg font-semibold text-primary-foreground flex items-center gap-3 animate-pulse-glow hover:bg-primary-foreground hover:text-primary">
            <Play className="w-5 h-5 fill-current" />

            Create Room
            <span className="absolute inset-0 rounded-full animate-shimmer" />
          </Link>
        </motion.div>

        {/* Stats or social proof hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">💜</span>
            <span>10K+ Swifties playing</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border" />
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span>4.9 star rating</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
