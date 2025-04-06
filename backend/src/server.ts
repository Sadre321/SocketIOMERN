import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();

const activeUsers:string[]=[];

// JSON verileri kabul edebilmesi için middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware: React uygulamanızın çalıştığı port
app.use(
  cors({
    origin: 'http://localhost:5173', // React uygulamanızın portu
    methods: ['GET', 'POST'],
  })
);

// Farklı bir portta sunucuyu çalıştırıyoruz (3001 gibi)
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // React uygulamanızın origin'i
    methods: ['GET', 'POST'],
  },
});

// Socket.io bağlantısı kuruyoruz
io.on('connection', (socket) => {
  console.log('A new client has connected',socket.id);
  activeUsers.push(socket.id);

  io.emit("activeUsers",activeUsers);

  // İstemciden gelen mesajı dinliyoruz
  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Mesajı tüm bağlı istemcilere yayınlıyoruz
    io.emit('message', data);
  });

  // Bağlantı sona erdiğinde yapılacaklar
  socket.on('disconnect', () => {
    console.log('A client has disconnected :',socket.id);
    const index = activeUsers.indexOf(socket.id);
    if(index != -1){
      activeUsers.splice(index,1);
    }
  });
});

// Sunucu 3001 portunda çalışacak
const port = 3001;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
