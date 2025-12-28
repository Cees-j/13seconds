
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
  players: [],
  questions: [],
    currentQuestion: 0,
    currentQuestionIndex: 0,
    currentQuestionTime: 13
  };
};

const initial_connection_and_room_setup = (socket) => {
  /* sets up the server side room but also joins the socket.join roomId */

  socket.on("join_room", (roomId) => {
    console.log(`Client joined room ${roomId}`);
    console.log('\n', 'server_side_rooms', server_side_rooms, '\n');

    if (!server_side_rooms[roomId]) {
      server_side_rooms[roomId] = createServerSideRoomSchema();
    }
    server_side_rooms[roomId].players.push(socket.id);

    console.log('\n', 'server_side_rooms', server_side_rooms, '\n');
    socket.join(roomId);
    console.log(`Client joined room ${roomId}`);
  });
};

io.on("connection", (socket) => {
  initial_connection_and_room_setup(socket);

 // game_loop();

  socket.on("start_quiz", (roomId) => {
    console.log(`Starting quiz for room ${roomId}`);
    console.log('\n', 'server_side_rooms', server_side_rooms, '\n');
    io.to(roomId).emit("start_quiz_response", "Starting quiz...");
    
  });
});

  io.on("disconnect", (socket) => {
    console.log(`Client disconnected from room ${socket.room}`);
    if (server_side_rooms[roomId]) {
      server_side_rooms[roomId].players = server_side_rooms[roomId].players.filter((id) => id !== socket.id);
    }
    if (server_side_rooms[roomId].players.length === 0) {
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


