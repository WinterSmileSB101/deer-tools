import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as IOServer } from 'socket.io';
import { Server } from 'socket.io';

// #unused
const port = 30000;

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}
export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket,
) {
  if (res.socket.server.io) {
    res.status(200).json({
      success: true,
      message: 'Socket is already running',
      socket: `:${port + 1}`,
    });
    return;
  }

  console.log('Starting Socket.IO server on port:', port + 1);
  const io = new Server({
    path: '/api/socket',
    addTrailingSlash: false,
    cors: { origin: '*' },
  }).listen(port + 1);

  io.on('connect', (socket) => {
    const _socket = socket;
    console.log('socket connect', socket.id);
    _socket.broadcast.emit('welcome', `Welcome ${_socket.id}`);
    socket.on('disconnect', async () => {
      console.log('socket disconnect');
    });
  });

  res.socket.server.io = io;
  res.status(201).json({
    success: true,
    message: 'Socket is started',
    socket: `:${port + 1}`,
  });
}

// Create a socket.io server
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting Socket.IO');
    const io = new Server(res.socket.server);

    // Listen for connection events
    io.on('connection', (socket) => {
      console.log(`Socket ${socket.id} connected.`);

      // Listen for incoming messages and broadcast to all clients
      socket.on('message', (message) => {
        io.emit('message', message);
      });

      // Clean up the socket on disconnect
      socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected.`);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};
