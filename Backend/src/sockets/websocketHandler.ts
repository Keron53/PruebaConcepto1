import { Server } from 'socket.io';

const socketHandler = (io:Server) => {
  //MAnejo de mensajes
  io.on('connection', (socket) => {
    console.log('✅ Cliente conectado:', socket.id);

    socket.on('message', (messageData) => {
      console.log('📨 Mensaje recibido:', messageData);

      io.emit('message', {
        ...messageData,
        id: messageData.id || Date.now().toString(),
        timestamp: messageData.timestamp || new Date().toISOString()
      });
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ Cliente desconectado:', socket.id, 'Razón:', reason);
    });

    socket.on('error', (error) => {
      console.error('🔴 Error en el socket:', error);
    });
  });
};

export default socketHandler;
