

const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const io = require('socket.io')();

const chatRouter = require('./chatRouter');


const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: [
          'http://localhost:3000',
      ],
      
      }),    
);

app.use("/chat", chatRouter);

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('message', (message) => {
//       console.log('message:', message);
//       io.emit('message', message);
//     });
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

const start = async() =>{

    try {
        await mongoose.connect("mongodb+srv://myLocalEnvironment:qeJu0Y16qXr3W1hU@cluster0.wnvgx3j.mongodb.net/chat-project?retryWrites=true&w=majority")

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        
    } catch (error) {
        console.log(error);
    }

}

start(); 
