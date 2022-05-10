const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  for (let [id, socket] of io.of("/").sockets) {
    if(socket.username.toLowerCase() === username.toLowerCase()) {
      return next(new Error("username already taken"))
    }
  }
  next();
})

io.on('connection', (socket) => {
  socket.username = socket.handshake.auth.username;
  const users = [];
  let c = 0;
  for (let [id, socket] of io.of("/").sockets) {
    users.push(socket.username);
    c++;
  }
  io.emit("users", users);

  socket.on("pm", ({ message, toUsername, fromUsername }) => {
    let toId = "";
    for (let [id, socket] of io.of("/").sockets) {
      if(socket.username == toUsername) {
        toId = id;
      }
    }
    socket.to(toId).emit("pm", {
      message: message,
      toUsername: toUsername,
      fromUsername: socket.username
    });
  })

  socket.on("writing", (toUsername) => {
    let toId = "";
    for (let [id, socket] of io.of("/").sockets) {
      if(socket.username == toUsername) {
        toId = id;
      }
    }
    socket.to(toId).emit("writing", {
      fromUsername: socket.username
    })
  })
});

/*
// For production build
app.use(express.static(__dirname + '/client/build'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html');
})
*/

server.listen(5000, () => {
  console.log('listening on port 5000');
});