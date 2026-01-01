"use client";
import { socket } from "@/socket";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StartQuizButton } from "./components/start-quiz-button";
import VinylPlayerMiddle from "./components/vinyl-player-middle";
import Scoreboard from "./components/scoreboard";
import  HomeButton  from "./components/home-button";
import LoadingScreen from "./components/loading-screen";
import Link from "next/link";

export default function main_quiz_room() {

  const { id } = useParams();
  const [is_quiz_started, set_is_quiz_started] = useState(false);
  const [is_quiz_ended, set_is_quiz_ended] = useState(false);
  const [is_loading_between_questions, set_is_loading_between_questions] = useState(false);

  const [answer_options_with_urls, set_answer_options_with_urls] = useState<Array<{ answer_options: string[], audioUrl: string, correctAnswer: string }>>([]);
  const [quiz_length, set_quiz_length] = useState<number>(0);

  const sounds = useRef<HTMLAudioElement[]>([]);

  const [selected_answer, set_selected_answer] = useState<string | null>(null);
  const [answers_index, set_answers_index] = useState(0);

  const [all_scores, set_all_scores] = useState<Record<string, { score: number }>>({});

  // Processed questions array - set once when data arrives
  const [questions, set_questions] = useState<Array<{ answers: string[], audio_url: string }>>([]);

  // Process the questions when answer_options and audio_url change
  useEffect(() => {
    if (answer_options_with_urls.length > 0) {
      console.log("Answer options with urls:", answer_options_with_urls);
      const processed_questions = answer_options_with_urls.map((answer_options_with_url, index) => ({
        answers: answer_options_with_url.answer_options,
        audio_url: answer_options_with_url.audioUrl
      }));
      set_questions(processed_questions);
    }
  }, [answer_options_with_urls]);


  useEffect(() => {
    socket.connect();

    socket.emit("join_room", id as string); // as soon as navigate on create room this happens  

    // Preload all sounds at once
    //sounds.current = Object.values(answers).map(question => new Audio(question.song_url));

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
      console.log(message);
      set_answers_index(0);
      set_answer_options_with_urls(message.answer_options_with_urls);
      set_quiz_length(message.quiz_length);
      set_is_quiz_started(true);
    });

    socket.on("next_question", (message) => {
      console.log(message);
      set_all_scores(message.allScores);
      
      // Start loading screen
      set_is_loading_between_questions(true);
      
      // After 3 seconds, show next question
      setTimeout(() => {
        set_answers_index(prev => prev + 1);
        set_is_loading_between_questions(false);
      }, 1250);
    });

    socket.on("end_quiz", (message) => {
      console.log(message);
      set_all_scores(message.allScores);
      set_is_quiz_started(false);
      set_is_quiz_ended(true);
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
      <h1 className="text-5xl md:text-6xl font-bold text-center pt-8 pb-4">
        <span className="text-gold-light drop-shadow-[0_0_20px_hsl(48,95%,78%,0.5)]">13</span>
        <span className="text-foreground">seconds</span>
      </h1>

      {!is_quiz_started && !is_quiz_ended && <StartQuizButton roomId={id as string} />}
      {!answer_options_with_urls && <div>Loading...</div>}
      {answer_options_with_urls && (
        <div>
          {/* {answer_options.options.map((option: string, index: number) => (
            <div key={index}>{option}</div>
          ))} */}
        </div>
      )}
      {is_quiz_started && questions.length > 0 && (
        <div>
          {is_loading_between_questions ? (
            <LoadingScreen />
          ) : (
            <VinylPlayerMiddle
              answers={questions[answers_index].answers}
              selected_answer={selected_answer}
              set_selected_answer={set_selected_answer}
              song_sound={new Audio(questions[answers_index].audio_url)}
              on_submit={handle_submit_answer}
            />
          )}
        </div>
      )}

      {is_quiz_ended && 
        <div>
        <Scoreboard object_of_scores={all_scores} />
        <Link href="/">
          <HomeButton />
        </Link>
        </div>
        }


    </div>
  );
}