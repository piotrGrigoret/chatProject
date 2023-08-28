
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const { Server } = require('socket.io');
const http = require('http');

const chatRouter = require('./chatRouter');
const chatAuth  = require('./authRouter');
// const   = require('./authRouter');

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", chatAuth);
app.use("/chat", chatRouter);


const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:[
            'http://localhost:3000',
            'https://chatappserver-bwn9.onrender.com',
            'https://chatapp-vn5z.onrender.com',
        ],
        methods: ["GET", "POST"],
        
    }
})

io.on("connection", (socket) => {
    // console.log("user connected :" + socket.id);

    // socket.on("join_room", (data) => {
    //     socket.join(data);
    //     console.log("User with ID:" + socket.id + " - joined room:" + data); 
    // });
    socket.on("send_message", (data) => {
        console.log("IO SEND MESSAGE: " + data);
        // socket.to(data.room).emit("receive_message", data);
        io.emit("receive_message", data);

    })
    socket.on("dissconnect", () => {
        console.log("User Dissconected", socket.id);
    });
});




const start = async() =>{

    try {
        await mongoose.connect("mongodb+srv://myLocalEnvironment:qeJu0Y16qXr3W1hU@cluster0.wnvgx3j.mongodb.net/chat-project?retryWrites=true&w=majority")

        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
                
    } catch (error) {
        console.log(error);
    }

}

start(); 
