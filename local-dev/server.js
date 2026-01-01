// ============================================================================
// IMPORTS & SERVER SETUP
// ============================================================================

import { createServer } from "http";
import { Server } from "socket.io";
import { get_random_songs_from_server } from "./get_random_songs_from_server.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


// ============================================================================
// DATA STRUCTURES
// ============================================================================

let server_side_rooms = {};
// Structure:
// {
//   [roomId]: {
//     players: { [socketId]: { score: number } },
//     answers_options_with_urls: [...],
//     currentQuestionIndex: number,
//     timerId: number | null,
//     timeRemaining: number
//   }
// }


// ============================================================================
// ROOM MANAGEMENT
// ============================================================================

const handle_join_room = async (socket, roomId) => {
  // Create room if it doesn't exist
  if (!server_side_rooms[roomId]) {
    const answers_options_with_urls = await get_random_songs_from_server();
    console.log("Answers options with urls:", answers_options_with_urls);
    
    server_side_rooms[roomId] = {
      players: {},
      answers_options_with_urls: answers_options_with_urls, 
      currentQuestionIndex: 0,
      timerId: null,
      timeRemaining: 13
    };
  }

  // Add player to room
  server_side_rooms[roomId].players[socket.id] = { score: 0, has_answered: false };
  socket.join(roomId);
  console.log(`Player ${socket.id} joined room ${roomId}`);
};


// ============================================================================
// GAME LOGIC - TIMER
// ============================================================================

const start_question_timer = (roomId) => {
  const room = server_side_rooms[roomId];
  
  // Clear any existing timer
  if (room.timerId) {
    clearInterval(room.timerId);
  }
  
  // Reset time
  room.timeRemaining = 13;
  
  // Start countdown
  room.timerId = setInterval(() => {
    room.timeRemaining--;
    console.log(`Room ${roomId} - Time remaining: ${room.timeRemaining}s`);
    
    // Emit to clients for UI countdown
    io.to(roomId).emit("timer_tick", { timeRemaining: room.timeRemaining });
    
    if (room.timeRemaining <= 0) {
      clearInterval(room.timerId);
      console.log(`Room ${roomId} - TIME'S UP!`);
      advance_to_next_question(roomId);
    }
  }, 1000);
};


// ============================================================================
// GAME LOGIC - QUESTION FLOW
// ============================================================================

const advance_to_next_question = (roomId) => {
  const room = server_side_rooms[roomId];

  Object.values(room.players).forEach(player => {
    player.has_answered = false;
  });
  
  // Clear the timer
  if (room.timerId) {
    clearInterval(room.timerId);
    room.timerId = null;
  }
  
  console.log(`Room ${roomId} - Current question index: ${room.currentQuestionIndex}`);
  
  // Check if quiz should end
  if (room.currentQuestionIndex >= 5) {
    io.to(roomId).emit("end_quiz", {
      message: "Quiz ended",
      allScores: room.players,
      currentQuestionIndex: room.currentQuestionIndex
    });
    console.log(`Room ${roomId} - Quiz ended`);
  } else {
    // Move to next question
    io.to(roomId).emit("next_question", {
      message: "Next question...",
      allScores: room.players
    });
    room.currentQuestionIndex++;
    
    // Start timer for next question
    start_question_timer(roomId);
  }
};


// ============================================================================
// EVENT HANDLERS
// ============================================================================

const handle_start_quiz = (roomId) => {
  console.log(`Starting quiz for room ${roomId}`);
  
  io.to(roomId).emit("start_quiz_response", {
    message: "Starting quiz...",
    answer_options_with_urls: server_side_rooms[roomId].answers_options_with_urls,
    quiz_length: 13
  });
  
  // Start the timer for the first question
  start_question_timer(roomId);
};

const handle_submit_answer = (socket, roomId, answer) => {
  const socket_id = socket.id;
  const room = server_side_rooms[roomId];

  const current_question_set = room.answers_options_with_urls[room.currentQuestionIndex];
  console.log(`Room ${roomId} - Player ${socket_id} submitted answer:`, answer);

  // Check if answer is correct
  if (current_question_set.correctAnswer === answer) {
    console.log(`✓ Correct answer from ${socket_id}`);
    room.players[socket_id].score++;
  } else {
    console.log(`✗ Incorrect answer from ${socket_id}`);
  }
  if (room.players[socket_id].has_answered) {
    console.log(`Player ${socket_id} has already answered`);
    return;
  }
  room.players[socket_id].has_answered = true;

  if (Object.values(room.players).every(player => player.has_answered)) {
    console.log(`All players have answered`);
    advance_to_next_question(roomId);
  }

  // // Reset timer - give full 13 seconds for next question
  // start_question_timer(roomId);
};

const handle_disconnect = (socket) => {
  console.log(`Client ${socket.id} disconnected`);
  
  // Find and clean up the room this player was in
  for (const roomId in server_side_rooms) {
    const room = server_side_rooms[roomId];
    
    if (room.players[socket.id]) {
      delete room.players[socket.id];
      console.log(`Removed player ${socket.id} from room ${roomId}`);
      
      // If room is empty, delete it
      if (Object.keys(room.players).length === 0) {
        if (room.timerId) {
          clearInterval(room.timerId);
        }
        delete server_side_rooms[roomId];
        console.log(`Deleted empty room ${roomId}`);
      }
    }
  }
};


// ============================================================================
// SOCKET CONNECTION
// ============================================================================

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("join_room", (roomId) => {
    handle_join_room(socket, roomId);
  });

  socket.on("start_quiz", (roomId) => {
    handle_start_quiz(roomId);
  });

  socket.on("submit_answer", (data) => {
    handle_submit_answer(socket, data.room_id, data.answer);
  });

  socket.on("disconnect", () => {
    handle_disconnect(socket);
  });
});


// ============================================================================
// START SERVER
// ============================================================================

httpServer.listen(8080, () => {
  console.log('🎵 13seconds server is running on port 8080');
});
