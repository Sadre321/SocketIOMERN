import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const activeUsers: string[] = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Yeni bağlantı:', socket.id);

  activeUsers.push(socket.id);
  io.emit("activeUsers", activeUsers);
  socket.emit("user", socket.id);

  socket.on("sendPrivateMessage", (targetId, message) => {
    const timestamp = new Date().toISOString();

    const msgPayload = {
      from: socket.id,
      message,
      timestamp,
    };

    io.to(targetId).emit("message", msgPayload);
    socket.emit("message", msgPayload);
  });

  socket.on("typing", (targetId) => {
    socket.to(targetId).emit("typing", socket.id);
  });

  socket.on("stopTyping", (targetId) => {
    socket.to(targetId).emit("stopTyping", socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Bağlantı koptu:', socket.id);
    const index = activeUsers.indexOf(socket.id);
    if (index !== -1) {
      activeUsers.splice(index, 1);
    }
    io.emit("activeUsers", activeUsers);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
