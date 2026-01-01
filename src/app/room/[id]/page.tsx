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
  const [answer_options, set_answer_options] = useState<Record<string, string[]>>({});
  const sounds = useRef<HTMLAudioElement[]>([]);

  const answers = {
    question_key_0: {
      answers: ['Style', 'Shake It Off', 'We Are Never Getting Back Together', '22'
      ], 
      correct_answer: '22', 
      song_url: '/t_swift_cuts/22_START.mp3'
    }, 
    question_key_1: {
      answers: ['Look What You Made Me Do', 'Getaway Car', 'Delicate', "Don't Blame Me"], 
      correct_answer: "Don't Blame Me", 
      song_url: '/t_swift_cuts/Dont_Blame_Me_START.mp3'
    },
    question_key_2: {
      answers: ['I Did Something Bad', 'End Game', 'Gorgeous', 'King of My Heart'], 
      correct_answer: 'I Did Something Bad', 
      song_url: '/t_swift_cuts/I_did_something_bad_START.mp3'
    },
    question_key_3: {
      answers: ['Cruel Summer', 'Miss Americana & The Heartbreak Prince', 'The Archer', 'Lover'], 
      correct_answer: 'Miss Americana & The Heartbreak Prince', 
      song_url: '/t_swift_cuts/Miss_Americana-START.mp3'
    },
    question_key_4: {
      answers: ['All Too Well', 'I Knew You Were Trouble', 'Red', 'State of Grace'], 
      correct_answer: 'Red', 
      song_url: '/t_swift_cuts/Red_TV_START.mp3'
    },
    question_key_5: {
      answers: ['ME!', 'The Man', 'You Need To Calm Down', 'Paper Rings'], 
      correct_answer: 'The Man', 
      song_url: '/t_swift_cuts/The_Man_START.mp3'
    }
  }

  const [selected_answer, set_selected_answer] = useState<string | null>(null);
  const [answers_index, set_answers_index] = useState(0);

  const [all_scores, set_all_scores] = useState<Record<string, { score: number }>>({});

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
      console.log(message);
      set_answers_index(0);
      set_answer_options(message.answer_options);
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
      {!answer_options && <div>Loading...</div>}
      {answer_options && (
        <div>
          {/* {answer_options.options.map((option: string, index: number) => (
            <div key={index}>{option}</div>
          ))} */}
        </div>
      )}
      {is_quiz_started && (
        <div>
          {is_loading_between_questions ? (
            <LoadingScreen />
          ) : (
            <VinylPlayerMiddle
              answers={answers[`question_key_${answers_index}` as keyof typeof answers].answers}
              selected_answer={selected_answer}
              set_selected_answer={set_selected_answer}
              song_sound={sounds.current[answers_index] as HTMLAudioElement}
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