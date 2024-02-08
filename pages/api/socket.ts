import { Server, Socket } from 'socket.io';

import {
  catchAndSendChatMessage,
  catchAndSendCreatedMsg,
  catchDisconnect,
  catchJoinRoom,
  catchReconnect,
  catchRoomMessageAndNotify,
} from '@/lib/utils/socket.utils';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/lib/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (res.socket?.server?.io) {
    console.log('Server already started!');
    res.end();
    return;
  }

  const io = new Server(res.socket?.server as any, {
    path: '/api/socket.io',
  });
  res.socket.server.io = io;

  const onConnection = (socket: Socket) => {
    console.log('New connection', socket.id);
    // catch message channel here.
    catchAndSendCreatedMsg(io, socket);
    catchJoinRoom(io, socket);
    catchRoomMessageAndNotify(io, socket);

    catchAndSendChatMessage(io, socket);

    catchReconnect(io, socket);
    catchDisconnect(io, socket);
  };

  io.on('connection', onConnection);

  console.log('Socket server started successfully!');
  res.end();
}
