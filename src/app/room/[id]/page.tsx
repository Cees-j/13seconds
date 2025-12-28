"use client";
import { socket } from "@/socket";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StartQuizButton } from "./components/start-quiz-button";
import VinylPlayerMiddle from "./components/vinyl-player-middle";

export default function main_quiz_room() {

  const { id } = useParams();
  const [is_quiz_started, set_is_quiz_started] = useState(false);
  const [is_loading_complete, set_is_loading_complete] = useState(false);
  const sound = useRef<HTMLAudioElement | null>(null);

  const questions = ['France?', 'Germany?', 'Italy?', 'Spain?']
  const [selected_answer, set_selected_answer] = useState<string | null>(null);


  useEffect(() => {
    socket.connect();

    socket.emit("join_room", id as string);

    sound.current = new Audio("/f1_radio_sound-293747.mp3"); // temporary placement
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
    set_is_quiz_started(true);
    // so need a loading stage here


    //preloadAllSounds();
    console.log(message);
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <h1>Main Quiz Room Page</h1>

      {!is_quiz_started && <StartQuizButton roomId={id as string} />}

      {is_quiz_started && <div> Quiz started!
        <VinylPlayerMiddle
          questions={questions}
          selected_answer={selected_answer}
          set_selected_answer={set_selected_answer}
          song_sound={sound.current as HTMLAudioElement}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => {
            if (sound.current) {
              sound.current.play();
            } else {
              console.log("Sound not found");
            }
          }}>Play Audio</button>
      </div>}

      {is_loading_complete && <div>Loading complete!</div>}
    </div>
  );
}