"use client";
import { socket } from "@/socket";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export const StartQuizButton = ({ roomId }: { roomId: string }) => {
  return (
    <motion.div
      className="w-full flex items-center justify-center min-h-[50vh]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <button
        onClick={() => {
          socket.emit("start_quiz", roomId);
          console.log(`Started quiz for room ${roomId}`);
        }}
        className="group relative px-8 py-4 rounded-full glow-button text-lg font-semibold text-primary-foreground flex items-center gap-3 animate-pulse-glow hover:bg-primary-foreground hover:text-primary"
      >
        <Play className="w-5 h-5 fill-current" />
        Start Quiz
        <span className="absolute inset-0 rounded-full animate-shimmer" />
      </button>
    </motion.div>
  );
};