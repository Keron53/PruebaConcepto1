# Backend del Chat con WebSocket

Este es el servidor WebSocket para la aplicación de chat en tiempo real.

## Requisitos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Para desarrollo, ejecuta:
```bash
npm run dev
```

3. Para producción, primero compila y luego ejecuta:
```bash
npm run build
npm start
```

## Características

- Servidor WebSocket usando Socket.io
- Soporte para mensajes en tiempo real
- Manejo de conexiones y desconexiones
- Reconexión automática
- CORS habilitado para desarrollo

## Endpoints

- `GET /`: Verifica que el servidor está funcionando
- WebSocket: `ws://localhost:3001`

## Eventos WebSocket

- `connection`: Cuando un cliente se conecta
- `message`: Para enviar y recibir mensajes
- `disconnect`: Cuando un cliente se desconecta

## Variables de Entorno

- `PORT`: Puerto del servidor (por defecto: 3001) 