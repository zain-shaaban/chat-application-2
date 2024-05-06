const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit("message",msg)
    });
    socket.on("typing",()=>{
      socket.broadcast.emit("typing_now")
    })
    socket.on("stop_typing",()=>{
      io.emit("typing_stop")
    })
  });

server.listen(3000, () => {
  console.log('listening on port:3000');
});