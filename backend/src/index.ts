import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import userRouter from './routes/user.routes'
import roomRouter from './routes/room.routes'
import messageRouter from './routes/message.routes'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const server = createServer(app)
const PORT =  3000 

const io = new Server(server,{
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
      }
})


let users:any = [];

const addUser = (userId:any, socketId:any) => {
  !users.some((user:any) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId:any) => {
  users = users.filter((user:any) => user.socketId !== socketId);
};

const getUser = (userId:any) => {
  return users.find((user:any) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use(bodyParser.json())
app.use(cors())

app.use('/v1/api/user',userRouter)
app.use('/v1/api/room',roomRouter)
app.use('/v1/api/message',messageRouter)



server.listen(PORT,()=>{
    console.log('server started at 3000');
})