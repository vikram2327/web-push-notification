import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const hostName="http://localhost:6001";

const socket = io(hostName);

function App() {
  // const socket = io(hostName);

  console.debug("Socket Obj",socket)
  console.debug("Socket Obj COnnected Statuss",socket.connected)
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    console.debug("UseEffect status",socket)
    socket.on('connection', (s) => {
      console.debug("Socket connection Event",s)
    });
  
    socket.on('connect', (s) => {
      // io.on("connection", (s) => {
      // socket.on('connection', (s) => {
    console.log('sandippppp');

      // socket.on('connection', (s) => {
      console.debug("Socket Connect Event",s)
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('hemanth');
      setIsConnected(false);
    });
    socket.on('message', data => {
    alert('button is working');
      setLastMessage("data");
    });

    socket.on("connect_error", (e) => {
      console.error("sockent connect_error",e); // x8WIv7-mJelg7on_ALbx
      console.error("sockent connect_error message",e.message); // x8WIv7-mJelg7on_ALbx
      // socket.auth.token = "abcd";
      // socket.connect();
    });


    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  });

  const sendMessage = () => {
    // socket.emit('hello!');
    socket.emit('message');
    // socket.to("private-marvel").emit('hello!');
    console.debug("On Send Message",socket);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Connected: { '' + isConnected }</p>
        <p>Last message: { lastMessage || '-' }</p>
        <button onClick={ sendMessage }>Say hello!</button>
      </header>
    </div>
  );
}

export default App;
