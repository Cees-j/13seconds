"use client";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const HomeButton = () => {
  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.button
        className="w-full p-4 rounded-2xl text-center font-bold text-xl text-white"
        style={{
          background: "var(--quiz-gradient)",
          boxShadow: "0 4px 20px rgba(0, 212, 255, 0.4), 0 4px 20px rgba(255, 0, 255, 0.4)"
        }}
        whileHover={{ 
          scale: 1.02, 
          y: -2,
          boxShadow: "0 8px 30px rgba(0, 212, 255, 0.5), 0 8px 30px rgba(255, 0, 255, 0.5)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center gap-3">
          <Home className="w-6 h-6" />
          Back to Home
          <ArrowLeft className="w-5 h-5" />
        </span>
      </motion.button>
    </motion.div>
  );
};

export default HomeButton;