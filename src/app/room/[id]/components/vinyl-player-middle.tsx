import { motion } from "framer-motion";
import { Play, Volume2, Disc3 } from "lucide-react";
import { useState } from "react";

type VinylPlayerMiddleProps = {
  answers: string[];
  selected_answer: string | null;
  set_selected_answer: (answer: string) => void;
  song_sound: HTMLAudioElement;
  on_submit: () => void;
}

const VinylPlayerMiddle = ({ answers, selected_answer, set_selected_answer, song_sound, on_submit }: VinylPlayerMiddleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    song_sound.currentTime = 0;
    song_sound.play().catch((error) => {
      console.error("Error playing song:", error);
    });
    setTimeout(() => setIsPlaying(false), 2000);
  };
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4 flex flex-col min-h-[70vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Top progress bar */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{
              background: i < 5 ? "var(--quiz-gradient)" : "hsl(var(--muted))"
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Giant central audio visualization area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Vinyl record style player */}
        <motion.div
          className="relative w-48 h-48 mb-8"
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={isPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : {}}
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
          
          {/* Center label */}
          <motion.button
            onClick={handlePlay}
            className="absolute inset-12 rounded-full bg-card flex items-center justify-center shadow-inner cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Volume2 className="w-8 h-8 text-primary animate-pulse" />
            ) : (
              <Play className="w-8 h-8 text-primary ml-1" />
            )}
          </motion.button>

          {/* Spinning indicator */}
          {isPlaying && (
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
          )}
        </motion.div>

        {/* Question */}
        <motion.p
          className="text-2xl md:text-3xl font-bold text-center text-foreground max-w-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Name the song
        </motion.p>
      </div>

      {/* Bottom answers - horizontal scroll on mobile */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
        {answers.map((answer, index) => {
          const isSelected = selected_answer === answer;
          return (
            <motion.button
              key={answer}
              onClick={() => set_selected_answer(answer)}
              className={`p-5 rounded-2xl text-center font-bold text-lg transition-all ${
                isSelected
                  ? "text-white scale-[1.02]"
                  : "bg-card/80 backdrop-blur border border-border/50 text-card-foreground"
              }`}
              style={isSelected ? { 
                background: "linear-gradient(135deg, #00d4ff 0%, #ff00ff 0%, #00ffff 250%)",
                boxShadow: "0 0 40px rgba(0, 212, 255, 0.8), 0 0 80px rgba(255, 0, 255, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.3)"
              } : {}}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeInOut", delay: 0.01 }}
              whileTap={{ scale: 0.96 }}
            >
              {answer}
            </motion.button>
          );
        })}
      </div>

      {/* Submit button */}
      <motion.button
        onClick={on_submit}
        disabled={!selected_answer}
        className={`mt-6 p-4 rounded-2xl text-center font-bold text-xl transition-all ${
          selected_answer
            ? "text-white cursor-pointer"
            : "bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50"
        }`}
        style={selected_answer ? {
          background: "var(--quiz-gradient)",
          boxShadow: "0 4px 20px rgba(0, 212, 255, 0.4), 0 4px 20px rgba(255, 0, 255, 0.4)"
        } : {}}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        whileHover={selected_answer ? { scale: 1.02, y: -2 } : {}}
        whileTap={selected_answer ? { scale: 0.98 } : {}}
      >
        Submit
      </motion.button>
    </motion.div>
  );
};

export default VinylPlayerMiddle;