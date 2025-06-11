import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  userId: string;
}

export interface UseSocketReturn {
  socket: Socket | null;
  connected: boolean;
  connecting: boolean;
  messages: Message[];
  sendMessage: (content: string) => void;
  connectionError: string | null;
  userId: string;
}

// Configura aquí la URL de tu servidor WebSocket
const SOCKET_SERVER_URL = 'http://localhost:3001';

export function useSocket(): UseSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generar ID único para este usuario
    const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
    setUserId(newUserId);

    // Crear conexión socket
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Eventos de conexión
    newSocket.on('connect', () => {
      console.log('✅ Conectado al servidor WebSocket');
      setConnected(true);
      setConnecting(false);
      setConnectionError(null);
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Desconectado del servidor:', reason);
      setConnected(false);
      setConnecting(false);
      setConnectionError(`Desconectado: ${reason}`);
    });

    newSocket.on('connect_error', (error) => {
      console.log('🔴 Error de conexión:', error.message);
      setConnected(false);
      setConnecting(false);
      setConnectionError(`Error de conexión: ${error.message}`);

      // Reintentar conexión después de 3 segundos
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          setConnecting(true);
          setConnectionError(null);
          newSocket.connect();
        }, 3000);
      }
    });

    // Escuchar mensajes del servidor
    newSocket.on('message', (messageData: any) => {
      console.log('📨 Mensaje recibido:', messageData);
      
      const newMessage: Message = {
        id: messageData.id || Date.now().toString(),
        author: messageData.author || 'Usuario',
        content: messageData.content || messageData.message || messageData,
        timestamp: new Date(messageData.timestamp || Date.now()),
        userId: messageData.userId || 'unknown',
      };

      setMessages(prev => [...prev, newMessage]);
    });

    // Eventos de reconexión
    newSocket.on('reconnecting', (attemptNumber) => {
      console.log(`🔄 Reintentando conexión... (intento ${attemptNumber})`);
      setConnecting(true);
      setConnectionError(null);
    });

    newSocket.on('reconnect', () => {
      console.log('✅ Reconectado exitosamente');
      setConnected(true);
      setConnecting(false);
      setConnectionError(null);
    });

    newSocket.on('reconnect_failed', () => {
      console.log('🔴 Falló la reconexión');
      setConnected(false);
      setConnecting(false);
      setConnectionError('No se pudo reconectar al servidor');
    });

    setSocket(newSocket);

    // Cleanup
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      newSocket.close();
    };
  }, []);

  const sendMessage = (content: string) => {
    if (socket && connected && content.trim()) {
      const messageData = {
        content: content.trim(),
        author: 'Usuario',
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
        userId: userId,
      };

      console.log('📤 Enviando mensaje:', messageData);
      socket.emit('message', messageData);
    }
  };

  return {
    socket,
    connected,
    connecting,
    messages,
    sendMessage,
    connectionError,
    userId,
  };
}