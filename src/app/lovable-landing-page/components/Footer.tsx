"use client";

import { motion } from "framer-motion";
import { Heart, Twitter, Instagram, Music } from "lucide-react";


const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Music, href: "#", label: "TikTok" },
];

export const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <span className="font-display text-2xl font-bold">
              <span className="gradient-text">13</span>
              <span className="text-foreground">seconds</span>
            </span>
            <p className="text-muted-foreground text-sm mt-2 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 fill-secondary text-secondary" /> by Swifties, for Swifties
            </p>
          </motion.div>


          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 13seconds. All rights reserved. Not affiliated with Taylor Swift or her management.
          </p>
        </div>
      </div>
    </footer>
  );
};
