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
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

function App(props) {

      const hostName="http://localhost:6001";
      const configuration = { 
        transports: ["websocket"], 
        cors: {
          origin: hostName,
          methods: ["GET", "POST"],
          allowedHeaders: ["*"],
          credentials: true
        }
      };
      // const hostName="http://localhost:8000/broadcasting/auth";
      
  // const { io } = require("socket.io-client");

  const socket = io(hostName,configuration);

  socket.on("connect", () => {
    console.debug("sockent connect",socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("connect_error", (e) => {
    // console.debug("sockent connect_error",e); // x8WIv7-mJelg7on_ALbx
    console.debug("sockent connect_error message",e.message); // x8WIv7-mJelg7on_ALbx
    // socket.auth.token = "abcd";
    // socket.connect();
  });

  useEffect(()=>{
    // window.Echo = new Echo({

      // io.on("connection", (socket) => {
      //   console.log("sockent connect using IO",socket.id); // x8WIv7-mJelg7on_ALbx
      // });

      // socket.on("connect", () => {
      //   console.debug("sockent connect",socket.id); // x8WIv7-mJelg7on_ALbx
      // });

  //  let  s= new Echo({
  //     // broadcaster: 'pusher',
  //     // key: process.env.MIX_PUSHER_APP_KEY,
  //     // cluster: process.env.MIX_PUSHER_APP_CLUSTER,
  //     // forceTLS: true
  //     // broadcaster: 'socket.io',
  //     // broadcaster: Socket,
  //     broadcaster: io,
  //     // broadcaster: 'socket.io-client',
  //     // host: window.location.hostname + ":" + window.laravel_echo_port
  //     host: hostName,
  //   });

  //   // console.debug("UseEffect WinEco",Window.Echo);
  //   console.debug("UseEffect WinEco",s);
    // window.Echo.private('marvel')
//     window.Echo.private('marvel')
//       .listen('.UserEvent', (data) => {
//       // i++;
//       alert(data);
//         // $("#notification").append('<div class="alert alert-success"> '+data.title+'</div>');
//       // console.log(data);
// // alert("d");
//       });
  },[])

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