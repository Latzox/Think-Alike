const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const MAX_PLAYERS = 2;
const rooms = {};

app.use(express.static('public')); // Serve static files from the 'public' directory

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ roomId, playerName }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { players: [] };
    }

    const room = rooms[roomId];
    if (room.players.length < MAX_PLAYERS) {
      room.players.push({ id: socket.id, name: playerName });
      socket.join(roomId);

      // Store the roomId on the socket for later reference
      socket.roomId = roomId;

      console.log(`${playerName} joined room ${roomId}`);
      socket.emit('joinedRoom');

      io.to(roomId).emit('updateRoom', room);
    } else {
      socket.emit('roomFull');
    }
  });

  // Leaving a room
  socket.on('leaveRoom', ({ roomId, playerName }) => {
    const room = rooms[roomId];
    if (room) {
      // Remove the player from the room
      room.players = room.players.filter(player => player.id !== socket.id);

      // If the room is empty, you can choose to delete it
      if (room.players.length === 0) {
        delete rooms[roomId];
      } else {
        // Otherwise, update everyone in the room
        io.to(roomId).emit('updateRoom', room);
      }

      socket.leave(roomId);
      console.log(`${playerName} left room ${roomId}`);
      socket.emit('leftRoom');
    }
  });

  socket.on('disconnect', () => {
    const roomId = socket.roomId;
    if (roomId && rooms[roomId]) {
      console.log(`User ${socket.id} disconnected from room ${roomId}`);

      // Remove the player from the room
      const room = rooms[roomId];
      room.players = room.players.filter(player => player.id !== socket.id);

      // Notify the remaining players in the room
      io.to(roomId).emit('updateRoom', room);

      // If the room is empty after the player leaves, delete it
      if (room.players.length === 0) {
        delete rooms[roomId];
      }
    }
  });

  // Handle word submission
  socket.on('submitWord', ({ roomId, word }) => {
    const room = rooms[roomId];
    if (!room.words) {
      room.words = [];
    }
    const playerName = room.players.find(player => player.id === socket.id).name;
    room.words.push({ player: playerName, word: word });

    // Check if both players have submitted their words
    if (room.words.length === room.players.length) {
      // Broadcast words to both players
      io.to(roomId).emit('wordsRevealed', room.words);
      room.words = []; // Reset words for the next round
    }
  });

});