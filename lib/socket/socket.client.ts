import { Socket, io } from 'socket.io-client';

// #unused
export default function socketClient(port: number) {
  const socket = io(`:${port + 1}`, {
    path: '/api/socket',
    addTrailingSlash: false,
  });

  socket.on('connect', () => {
    console.log('Connected');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });

  socket.on('connect_error', async (err) => {
    console.log(`connect_error due to ${err.message}`);
    await fetch('/api/socket');
  });

  return socket;
}
