# Chat en Tiempo Real con WebSocket

Este proyecto demuestra la implementación de un chat en tiempo real utilizando WebSocket entre una aplicación móvil React Native y un servidor Node.js.

## Estructura del Proyecto

```
.
├── frontend/                 # Aplicación React Native
│   ├── app/                 # Rutas y páginas principales
│   ├── components/          # Componentes reutilizables
│   ├── hooks/              # Hooks personalizados
│   └── assets/             # Recursos estáticos
│
└── Backend/                 # Servidor Node.js
    ├── src/                # Código fuente
    │   └── index.ts        # Punto de entrada del servidor
    └── package.json        # Dependencias del backend
```

## Características Implementadas

- ✅ Conexión automática al servidor WebSocket al iniciar la app
- ✅ Envío de mensajes en tiempo real
- ✅ Recepción y distribución de mensajes a todos los clientes
- ✅ Lista de mensajes actualizada en vivo
- ✅ Reconexión automática
- ✅ Interfaz de usuario moderna y responsiva
- ✅ Identificación única de usuarios
- ✅ Indicadores de estado de conexión

## Tecnologías Utilizadas

### Frontend
- React Native con Expo
- TypeScript
- Socket.io-client
- Expo Router para la navegación
- Componentes personalizados para la UI

### Backend
- Node.js
- Express
- Socket.io
- TypeScript
- CORS para desarrollo

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI
- Un dispositivo móvil con Expo Go o un emulador

## Instalación y Ejecución

### Backend

1. Navega al directorio del backend:
```bash
cd Backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### Frontend

1. Navega al directorio del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia la aplicación:
```bash
npm run dev
# o
npx expo start
```

4. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o presiona:
   - `a` para abrir en un emulador Android
   - `i` para abrir en un simulador iOS
   - `w` para abrir en el navegador web

## Implementación Técnica

### Conexión WebSocket

El frontend utiliza un hook personalizado `useSocket` que maneja:
- Conexión automática al servidor
- Reconexión en caso de pérdida de conexión
- Manejo de eventos de conexión/desconexión
- Envío y recepción de mensajes

```typescript
// Ejemplo de uso del hook
const { connected, messages, sendMessage } = useSocket();
```

### Servidor WebSocket

El backend implementa:
- Servidor Express con Socket.io
- Manejo de conexiones de clientes
- Distribución de mensajes en tiempo real
- Manejo de errores y desconexiones

```typescript
// Ejemplo de manejo de mensajes en el servidor
io.on('connection', (socket) => {
  socket.on('message', (messageData) => {
    io.emit('message', messageData);
  });
});
```

### Interfaz de Usuario

La aplicación incluye:
- Lista de mensajes con auto-scroll
- Input para enviar mensajes
- Indicador de estado de conexión
- Diseño responsivo para diferentes dispositivos

## Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 