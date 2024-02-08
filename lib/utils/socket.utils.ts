import { Server, Socket } from 'socket.io';

function catchAndSendCreatedMsg(io: Server, socket: Socket) {
  const createdMessage = (msg: string) => {
    console.log('New message', msg);
    socket.broadcast.emit('newIncomingMessage', msg);
  };

  socket.on('createdMessage', createdMessage);
}

function catchJoinRoom(io: Server, socket: Socket) {
  const joinRoom = (room: string) => {
    socket.join(room);

    socket.in(room).emit('room', { room, message: 'new member' });
  };

  socket.on('join', joinRoom);
}

function catchAndSendChatMessage(io: Server, socket: Socket) {
  const chatMessage = (msg: string) => {
    socket.broadcast.emit('newIncomingMessage', msg);
  };

  socket.on('chat', chatMessage);
}

function catchRoomMessageAndNotify(io: Server, socket: Socket) {
  const catchAndNotify = (msg: {
    room: string;
    message: number | boolean | string | object;
  }) => {
    socket.in(msg.room).emit('room', msg.message);
  };

  socket.on('room', catchAndNotify);
}

function catchReconnect(io: Server, socket: Socket) {
  const onReconnection = (socket: Socket) => {
    console.log('Reconnect', socket.id);
  };

  socket.on('chat', onReconnection);
}

function catchDisconnect(io: Server, socket: Socket) {
  const onDisconnection = () => {
    console.log('Disconnection');
  };

  socket.on('chat', onDisconnection);
}

export {
  catchAndSendChatMessage,
  catchJoinRoom,
  catchAndSendCreatedMsg,
  catchReconnect,
  catchDisconnect,
  catchRoomMessageAndNotify,
};
