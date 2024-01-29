'use client';

import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export default function WhoIsSpy() {
  // State to store the messages
  const [messages, setMessages] = useState([]);
  // State to store the current message
  const [currentMessage, setCurrentMessage] = useState('');

  // Create a socket connection
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  useEffect(() => {
    socketInitializer();

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const socketInitializer = async () => {
    // We call this just to make sure we turn on the websocket server
    await fetch('/api/socket');

    socketRef.current = io({
      path: '/api/socket.io',
      transports: ['polling', 'websocket', 'webtransport'],
    });

    socketRef.current.on('connect', () => {
      console.log('connected');
    });

    // catch server message
    socketRef.current.on('newIncomingMessage', (msg) => {
      console.log('New message in client', msg);
      setMessages((pre) => [...pre, msg]);
    });
  };

  const sendMessage = () => {
    console.log('message from client', currentMessage);
    // Send the message to the server
    // socketRef.current?.emit('createdMessage', currentMessage);
    socketRef.current?.emit('chat', currentMessage);
    // Clear the currentMessage state
    setCurrentMessage('');
  };

  return (
    <div>
      {/* Display the messages */}
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}

      {/* Input field for sending new messages */}
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />

      {/* Button to submit the new message */}
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
