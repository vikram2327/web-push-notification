import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.css';


import Echo from 'laravel-echo';
import ChatWithPrivate from './components/ChatWithPrivate/ChatWithPrivate';
// import socketio from 'socket.io-client';

const hostName="http://localhost:6001";

// window.Echo.private('marvel')

const echo = new Echo({
  host: 'http://127.0.0.1:6001',
  broadcaster: 'socket.io',
  // client: socketio,
  client: io,
  auth: {
    headers: {
        // Authorization: 'Bearer ' + YourTokenLogin
        Authorization: 'Bearer 1234560' ,
        // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZDRlY2E0Y2IyMzYzYzIyYzRiZDE1ZTZiMjkxOTliNjQwMDBkNzRhZWRkNGJlMTVjNjkzYjJlODVjYjg0MmYyNjU3OGFmZjM5YjEwNzIwZDgiLCJpYXQiOjE2NDAwODkxNDMuMjYwNTY2LCJuYmYiOjE2NDAwODkxNDMuMjYwNTY4LCJleHAiOjE2NzE2MjUxNDMuMjU3MzE0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VtA7pP5ZzuxHwlANZWGFN5wAgTaDUqgH_Y0pw8ozJU65XJ54bCqvPjxoyAm-lETO1y2dnwJiNdm8qTPTrtg7q4gGTtryAH0E7_gc-Mw56Nro0J_MX0TljhyqiXm8BZm3JchOxAWIXy45_L106MsmSg1EkAdoyTnoWkt3bckPIA35pBJeeR0f-4bGEvV0cOJ9kYwQZD_WXy9hiv8SIZfXNg7jRoaND6IhUTkSY3V9RrvXwpepj6HQl60KRSIq4IoaQV4YBYNKH5SIhuRiiuI6LNunZB5F-F_svM1UukBHnWKFvEwHTlwm5h9G5KXo6D0HVW7D0ccpAX_Wc-P-veobvJch-BNnIC8lih2kVJMBKnT6Amos7o1NATPZ83vekSxNzEAIIlShH4BRJeCpF9MNwzjpNGcxywniDYd4lVPyXGriy6sYDuDTVLPnvF6vD-PeaBCoZhTb52u-U2aJ4oNwfF9eUVZ4FBoISfWRq1HZ5CrQPo1rp4Bbtu67ojoPM6xhQ-qWCABDWmaQcUv7MEEqdH0cO39o7wJxoWjbx4A4zarXRBzJwjGf_u3fON0UNx-Wiow6VpvmR7w_5ICjmvTgaJOEC8AaAlcDHDPzbDwcFNviM1HV7S4kC85M4I9-ehxCQn52C7MblPNdSvU_DWQdsaloqSZv4oNwWBxj3dZ_Xqw'
    },
    
},
formData:{
  app:'1234560'
}
});

echo
  // .channel('marvel')
  .private('marvel')
  .listen('.message', ev => {
    console.debug(ev)
    console.debug(ev.title)
  });

  

const socket = io(hostName);

function App() {
  // const socket = io(hostName);

  // console.debug("Socket Obj",echo)
  // console.debug("Socket Obj COnnected Statuss",socket.connected)
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [isConnected, setIsConnected] = useState();
  const [lastMessage, setLastMessage] = useState(null);

//   echo
//   // .channel('marvel')
//   .private('marvel')
// // .channel('private-marvel')
//   .listen('.message', ev => {
//     console.debug(ev)
//     console.debug(ev.message.text)
//   });

  const [count,setCount]=useState(0);
  
  
  useEffect(() => {
    setTimeout(()=>{
setCount(count+1)

// echo
// .channel('marvel')
// .listen('.message', ev => {
//   console.debug(ev)
//   console.debug(ev.message.text)
// });
// console.debug("hi",echo)
    }, 1000);
    // setTimeout((count+1));
  });

  const sendMessage = () => {
    // socket.emit('hello!');
    // socket.emit('message');
    // socket.to("private-marvel").emit('hello!');
    // console.debug("On Send Message",socket);
  }

  return (
    <div className="Container-fluid">
      <ChatWithPrivate/>
    </div>
  );
}

export default App;
