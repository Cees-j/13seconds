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
  const sounds = useRef<HTMLAudioElement[]>([]);

  const answers = {
    question_key_0: {answers: ['France?', 'Germany?', 'Italy?', 'Spain?'], correct_answer: 'France?', song_url: '/minecraft-villager-289282.mp3'}, 
    question_key_1: {answers: ['Paris?', 'Berlin?', 'Rome?', 'Madrid?'], correct_answer: 'Paris?', song_url: '/f1_radio_sound-293747.mp3'}
  }

  const [selected_answer, set_selected_answer] = useState<string | null>(null);
  const [answers_index, set_answers_index] = useState(0);


  useEffect(() => {
    socket.connect();

    socket.emit("join_room", id as string);

    // Preload all sounds at once
    sounds.current = Object.values(answers).map(question => new Audio(question.song_url));

    // Register all socket listeners
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
      set_answers_index(0);
      set_is_quiz_started(true);
      console.log(message);
    });

    socket.on("next_question", (message) => {
      console.log(message);
      set_answers_index(prev => prev + 1);
    });

    // Cleanup: remove all listeners on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("connect_error");
      socket.off("start_quiz_response");
      socket.off("next_question");
      socket.disconnect();
    };
  }, []);

  const handle_submit_answer = () => {
    if (selected_answer) {
      console.log("Submitting answer:", selected_answer);
      // Emit to server
      socket.emit("submit_answer", {
        room_id: id,
        answer: selected_answer
      });
      // Reset selected answer for next question
      set_selected_answer(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <h1>Main Quiz Room Page</h1>

      {!is_quiz_started && <StartQuizButton roomId={id as string} />}

      {is_quiz_started && <div> Quiz started!
        <VinylPlayerMiddle
          answers={answers[`question_key_${answers_index}` as keyof typeof answers].answers}
          selected_answer={selected_answer}
          set_selected_answer={set_selected_answer}
          song_sound={sounds.current[answers_index] as HTMLAudioElement}
          on_submit={handle_submit_answer}
        />



      </div>}

      {is_loading_complete && <div>Loading complete!</div>}


    </div>
  );
}