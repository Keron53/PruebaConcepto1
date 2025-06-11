import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);


// ------------ORIGENES----------------------
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});


// -------------MIDDLEWARES --------------------
app.use(cors());
app.use(express.json());


// -------------RUTA DE PRUEBAS-----------------
app.get('/', (req, res) => {
  res.json({ message: 'Servidor WebSocket funcionando' });
});


// -------------MANEJO WEBSOCKET-------------------------
io.on('connection', (socket) => {
  console.log('✅ Cliente conectado:', socket.id);

  // Manejo de mensajes
  socket.on('message', (messageData) => {
    console.log('📨 Mensaje recibido:', messageData);
    
    // Reenviar el mensaje a todos los clientes
    io.emit('message', {
      ...messageData,
      id: messageData.id || Date.now().toString(),
      timestamp: messageData.timestamp || new Date().toISOString()
    });
  });

  // Manejo de desconexión
  socket.on('disconnect', (reason) => {
    console.log('❌ Cliente desconectado:', socket.id, 'Razón:', reason);
  });

  // Manejo de errores
  socket.on('error', (error) => {
    console.error('🔴 Error en el socket:', error);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket ejecutándose en http://localhost:${PORT}`);
}); 