// Example using Node.js and Express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
// ... other middleware and routes

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Joined room: ${room}`);
  });
  
  socket.on('sendMessage', (message) => {
    io.to(message.room).emit('receiveMessage', message);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
