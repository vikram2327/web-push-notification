import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import axios from "axios";
import ReactDom from 'react-dom';
import CustomNotification  from '../src/components/Notification';
import Echo from 'laravel-echo';
//allow react dev tools work
// window.React = React;
// import {io} from Socket
// import { Socket } from 'socket.io-client';
// import { io } from 'socket.io-client';
import  io, { Socket } from 'socket.io-client';

function App(props) {

      const hostName="http://localhost:6001";
      const configuration = { 
        // transports: ["websocket"], 
        cors: {
          origin: hostName,
          methods: ["GET", "POST"],
          allowedHeaders: ["*"],
          credentials: true
        }
      };

      const conf={
        path: hostName+'/socket.io',
        // path: '/socket.io',
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        timeout: 20000,
        autoConnect: true,
        query: {},
        // options of the Engine.IO client
        upgrade: true,
        forceJSONP: false,
        jsonp: true,
        forceBase64: false,
        enablesXDR: false,
        timestampRequests: true,
        timestampParam: 't',
        policyPort: 843,
        transports: ['polling', 'websocket'],
        transportOptions: {},
        rememberUpgrade: false,
        onlyBinaryUpgrades: false,
        requestTimeout: 0,
        protocols: [],
        // options for Node.js
        agent: false,
        pfx: null,
        key: null,
        passphrase: null,
        cert: null,
        ca: null,
        ciphers: [],
        rejectUnauthorized: true,
        perMessageDeflate: true,
        forceNode: false,
        localAddress: null,
        // options for Node.js / React Native
        extraHeaders: {},
      };
      // const hostName="http://localhost:8000/broadcasting/auth";
      
  // const { io } = require("socket.io-client");
  const [socketState,setSocketState] = useState(io(hostName));
  
  useEffect(()=>{
    console.debug("Socket State",socketState);
    // socketState.on("connect", (socket) => {
    socketState.on("connection", (socket) => {
      // console.debug("socketState connect",socketState); // x8WIv7-mJelg7on_ALbx
      // console.debug("sockent connect",socket); // x8WIv7-mJelg7on_ALbx
      // let joinState=socketState.join("marvel");
      // console.debug("joinState",joinState)
      // let join=socket.join("marvel");
      // console.debug("join",join)

      console.debug("Connection Success",socket)
      socket.to("marvel").emit("some event");
     
      socketState.on("marvel", (d)=>{
        console.debug("dataaaaaaa",d)
      });

    });

    // socketState.to("marvel").emit("some event");

    socketState.on("connect_error", (e) => {
      // console.debug("sockent connect_error",e); // x8WIv7-mJelg7on_ALbx
      console.debug("sockent connect_error message",e.message); // x8WIv7-mJelg7on_ALbx
      // socket.auth.token = "abcd";
      // socket.connect();
    });


  },[socketState])


  // const onSubmitHandler = (e)=>{
  function onSubmitHandler(e){
    // e.preventdefault();
    console.debug('onSubmitHandler');
    const res = axios.post("http://localhost:8000/api/qwerty",{msg:"Hi Vk",}).then(r=>{
      console.debug("submit success",r);
    }).catch(e=>{
      console.debug("error success",e);
    });
  }
  return (
    <div>
      {/* <form onSubmit={onSubmitHandler}> */}
        <input type="text" name="message" 
        // value={message} 
        // onChange={onChangeHandler}
        />
        {/* <input type="submit"  name="message" value={"Submit H"} onChange={onChangeHandler}/> */}
        {/* <button  onClick={(e)=>onSubmitHandler(e)}>Send</button> */}
        <button type="submit" onClick={onSubmitHandler}>Send</button>
      {/* </form> */}

      
    </div>
  );
}

export default App;

// ReactDom.render(<App/>, document.getElementById('root'));