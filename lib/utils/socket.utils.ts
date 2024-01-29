import { Server, Socket } from 'socket.io';

function catchAndSendCreatedMsg(io: Server, socket: Socket) {
  const createdMessage = (msg: string) => {
    console.log('New message', msg);
    socket.broadcast.emit('newIncomingMessage', msg);
  };

  socket.on('createdMessage', createdMessage);
}

function catchAndSendChatMessage(io: Server, socket: Socket) {
  const chatMessage = (msg: string) => {
    console.log('chatMessage: ' + msg);

    socket.broadcast.emit('newIncomingMessage', msg);
  };

  socket.on('chat', chatMessage);
}

export { catchAndSendChatMessage, catchAndSendCreatedMsg };
