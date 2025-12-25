"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Music, Timer, BarChart3, Share, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Competition",
    description: "Play simultaneously with friends anywhere in the world. Watch scores update live.",
    gradient: "from-primary via-lavender to-pink",
  },
  {
    icon: Music,
    title: "Era-Spanning Questions",
    description: "From Tim McGraw to latest releases. Every era, every album, every deep cut.",
    gradient: "from-lavender via-pink to-secondary",
  },
  {
    icon: Timer,
    title: "Lightning Round Format",
    description: "13 seconds per question — Taylor's lucky number adds the perfect pressure.",
    gradient: "from-pink via-secondary to-accent",
  },
  {
    icon: BarChart3,
    title: "Instant Results",
    description: "See who knows their Swift facts with detailed breakdowns after each round.",
    gradient: "from-secondary via-accent to-primary",
  },
  {
    icon: Share,
    title: "Share Your Wins",
    description: "Brag about your Swiftie superiority with shareable result cards.",
    gradient: "from-accent via-primary to-lavender",
  },
  {
    icon: Sparkles,
    title: "Easter Eggs Galore",
    description: "Hidden references and surprises throughout. True fans will spot them all.",
    gradient: "from-primary via-pink to-accent",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-500 overflow-hidden">
        {/* Gradient hover effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Icon with gradient border */}
        <div className="relative mb-5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center group-hover:bg-card/80 transition-colors">
              <Icon className="w-5 h-5 text-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-4" id="features">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full glass-card text-xs font-medium text-accent uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need for <span className="gradient-text">Trivia Night</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Designed by Swifties, for Swifties. Every feature is a love letter to the fandom.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};