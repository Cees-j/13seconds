import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

type ScoreboardProps = {
  object_of_scores: Record<string, { score: number }>;
};

const Scoreboard = ({ object_of_scores }: ScoreboardProps) => {
  // Convert object to array and sort by score (descending)
  const sortedPlayers = Object.entries(object_of_scores)
    .map(([playerId, data]) => ({
      playerId,
      score: data.score,
    }))
    .sort((a, b) => b.score - a.score);

  // Get medal icon for top 3 players
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  // Get special styling for top 3
  const getPositionStyle = (position: number) => {
    switch (position) {
      case 0:
        return {
          background: "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(250, 204, 21, 0.1) 100%)",
          borderColor: "rgba(234, 179, 8, 0.5)",
        };
      case 1:
        return {
          background: "linear-gradient(135deg, rgba(156, 163, 175, 0.2) 0%, rgba(209, 213, 219, 0.1) 100%)",
          borderColor: "rgba(156, 163, 175, 0.5)",
        };
      case 2:
        return {
          background: "linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(251, 146, 60, 0.1) 100%)",
          borderColor: "rgba(217, 119, 6, 0.5)",
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold gradient-text flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-primary" />
          Leaderboard
        </h2>
      </motion.div>

      {/* Scoreboard list */}
      <div className="space-y-3">
        {sortedPlayers.length === 0 ? (
          <motion.div
            className="glass-card p-6 rounded-2xl text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No players yet...
          </motion.div>
        ) : (
          sortedPlayers.map((player, index) => (
            <motion.div
              key={player.playerId}
              className="glass-card p-4 rounded-2xl border transition-all hover:scale-[1.02]"
              style={getPositionStyle(index)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{
                boxShadow: "0 8px 30px rgba(138, 43, 226, 0.3)",
              }}
            >
              <div className="flex items-center justify-between">
                {/* Left side: Position and Medal */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 font-bold text-primary">
                    {index + 1}
                  </div>
                  {getMedalIcon(index)}
                  <div>
                    <p className="font-semibold text-foreground truncate max-w-[150px]">
                      Player {player.playerId.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {player.score === 1 ? "1 point" : `${player.score} points`}
                    </p>
                  </div>
                </div>

                {/* Right side: Score */}
                <motion.div
                  className="text-3xl font-bold"
                  style={{
                    background: "var(--gradient-text)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  {player.score}
                </motion.div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Scoreboard;