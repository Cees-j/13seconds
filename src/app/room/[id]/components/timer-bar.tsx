"use client";
import { socket } from "@/socket";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TimerBar = () => {
  const [timeRemaining, setTimeRemaining] = useState(13);

  useEffect(() => {
    socket.on("timer_tick", (data) => {
      setTimeRemaining(data.timeRemaining);
    });
    return () => {
      socket.off("timer_tick");
    };
  }, []);

  const percentage = (timeRemaining / 13) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-8 mt-4">
      {/* Container with background track */}
      <div 
        className="relative h-5 rounded-full overflow-hidden shadow-inner"
        style={{ background: "linear-gradient(90deg, rgb(39, 39, 42) 0%, rgb(24, 24, 27) 100%)" }}
      >
        {/* Animated gold progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: "linear-gradient(90deg, hsl(48, 95%, 85%) 0%, hsl(45, 95%, 75%) 50%, hsl(48, 95%, 85%) 100%)",
            boxShadow: "0 0 25px hsl(48, 95%, 85%), 0 0 45px hsl(48, 95%, 70%), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          }}
          animate={{
            opacity: timeRemaining <= 3 ? [1, 0.7, 1] : 1,
          }}
          transition={{
            opacity: {
              duration: 0.5,
              repeat: timeRemaining <= 3 ? Infinity : 0,
            },
          }}
        >
          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{
              backgroundPosition: ["200% 0%", "-200% 0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Sparkle particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                left: `${20 + i * 30}%`,
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 0 4px white, 0 0 8px hsl(48, 95%, 78%)",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Time remaining text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xs font-bold z-10"
            style={{
              color: percentage > 30 ? "hsl(48, 95%, 95%)" : "hsl(0, 80%, 70%)",
              textShadow: "0 0 8px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.5)",
            }}
            animate={{
              scale: timeRemaining <= 3 ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: timeRemaining <= 3 ? Infinity : 0,
            }}
          >
            {timeRemaining}s
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default TimerBar;