
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let server_side_rooms = {};

const createServerSideRoomSchema = () => {
  return {
  players: {},
  questions: {question_set_0: {answers: ['France','Paris',3,4,5,6,7,8,9,10]}, question_set_1: {answers: [11,12,13,14,15,16,17,18,19,20]}},
    currentQuestion: 0,
    currentQuestionIndex: 0,
    currentQuestionTime: 13
  };
};

const handle_join_room = (socket, roomId) => {
  /* sets up the server side room but also joins the socket.join roomId */
  console.log(`Client joined room ${roomId}`);
  console.log('\n', 'server_side_rooms', server_side_rooms, '\n');

  if (!server_side_rooms[roomId]) {
    server_side_rooms[roomId] = createServerSideRoomSchema();
  }
  server_side_rooms[roomId].players[socket.id] = { score: 0 };

  console.log('\n', 'server_side_rooms', server_side_rooms, '\n');
  socket.join(roomId);
  console.log(`Client joined room ${roomId}`);
  console.log (server_side_rooms[roomId].players)
};

const handle_submit_answer = (socket, roomId, answer) => {
  let socket_id = socket.id;
  console.log (server_side_rooms[roomId].players)
  console.log ('ssd', server_side_rooms[roomId].players[socket_id].score)

  


  const current_question_set = server_side_rooms[roomId].questions.question_set_0.answers
  console.log ('current_question_set', current_question_set)
   
  if (current_question_set[server_side_rooms[roomId].currentQuestionIndex] === answer) {
    console.log(`Client socket id ${socket.id} answered correctly for room ${roomId}`);
    server_side_rooms[roomId].players[socket_id].score++;
  }
  else {
    console.log(`Client socket id ${socket.id} answered incorrectly for room ${roomId}`);
  }

  console.log ('currentQuestionIndex', server_side_rooms[roomId].currentQuestionIndex)
  if (server_side_rooms[roomId].currentQuestionIndex === 1) {
    io.to(roomId).emit("end_quiz", {
      message: "Quiz ended",
      playerScore: server_side_rooms[roomId].players[socket_id].score,
      allScores: server_side_rooms[roomId].players
    });
  } else {
    io.to(roomId).emit("next_question", {
      message: "Next question...",
      playerScore: server_side_rooms[roomId].players[socket_id].score,
      allScores: server_side_rooms[roomId].players
    });
    server_side_rooms[roomId].currentQuestionIndex++;
  }
}




io.on("connection", (socket) => {
  // All socket listeners in one place
  
  socket.on("join_room", (roomId) => {
    handle_join_room(socket, roomId);
  });

  socket.on("start_quiz", (roomId) => {
    console.log(`Starting quiz for room ${roomId}`);
    console.log('\n', 'server_side_rooms', server_side_rooms, '\n');
    io.to(roomId).emit("start_quiz_response", "Starting quiz...");
  });

  socket.on("submit_answer", (data) => {
    handle_submit_answer(socket, data.room_id, data.answer);
  });
});

io.on("disconnect", (socket) => {
  console.log(`Client disconnected from room ${socket.room}`);
  if (server_side_rooms[roomId]) {
    delete server_side_rooms[roomId].players[socket.id];
  }
  if (server_side_rooms[roomId] && Object.keys(server_side_rooms[roomId].players).length === 0) {
    delete server_side_rooms[roomId];
  }
  socket.leave(roomId);
  console.log(`Client left room ${roomId}`);
});




httpServer.listen(8080, () => {
    console.log('Server is running on port 8080');
});

const game_loop = () => {
    const gameName = "13seconds";
    let timeLeft = 13;

    console.log(`Starting ${gameName} match...`);

    const timer = setInterval(() => {
    timeLeft--;
    console.log(`Time remaining: ${timeLeft}s`);
    if (timeLeft === 0) {
        console.log("TIME IS UP! 🎤");
        clearInterval(timer);
    }
    }, 1000);
}

// so ok what does this need to do
// for each question in the questions array 
// // display the question
// // wait for the user to answer the question
// // check if the answer is correct
// // if it is correct, add 1 to the score
// // if it is incorrect, subtract 1 from the score
// // disply the score
// // end of round display the current total scores


