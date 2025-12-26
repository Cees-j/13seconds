"use client";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StartQuizButton } from "./components/start-quiz-button";

export default function MainQuizRoom() {

  const { id } = useParams();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  
  useEffect(() => {
    socket.connect();
    socket.emit("join_room", id as string);
  }, []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on("connect", () => {
    console.log("Connected to server");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.on("connect_error", (error: any) => {
    console.log("connect_error", error);
  });
  socket.on("start_quiz_response", (message) => {
    setIsQuizStarted(true);
    console.log(message);
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <h1>Main Quiz Room Page</h1>
      {!isQuizStarted && <StartQuizButton roomId={id as string} />}
      {isQuizStarted && <div>Quiz started</div>}
    </div>
  );
}