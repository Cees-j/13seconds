
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  game_loop();
  console.log('Client connected');
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


