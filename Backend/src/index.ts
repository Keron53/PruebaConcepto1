import http from 'http';
import app from './app';
import { Server } from 'socket.io';
import socketHandler from './sockets/websocketHandler';

const httpServer = http.createServer(app);

// WebSocket con configuración CORS
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Ejecutar lógica WebSocket
socketHandler(io);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket ejecutándose en http://localhost:${PORT}`);
});
