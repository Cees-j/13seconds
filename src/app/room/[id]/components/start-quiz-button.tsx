import { socket } from "@/socket";

export const StartQuizButton = ({ roomId }: { roomId: string }) => {
  return (
    <button 
    className="bg-blue-500 text-white px-4 py-2 rounded-md" 
    onClick={() => {
      socket.emit("start_quiz", roomId);
      console.log(`Started quiz for room ${roomId}`);
    }}>Start Quiz</button>
  );
};