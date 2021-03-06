import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Echo from 'laravel-echo';

const hostName="http://localhost:6001";

const echo = new Echo({
  host: hostName,
  broadcaster: 'socket.io',
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
 


function RecieveMessage() {
 
  const [isConnected, setIsConnected] = useState();
  const [lastMessage, setLastMessage] = useState(null);
  const [messageArray, setMessageArray] = useState([]);

  echo
  // .channel('marvel')
  .private('marvel')
  .listen('.message', ev => {
    console.debug(ev)
    console.debug(ev.title)
    setLastMessage(ev.title);
    // setMessageArray.push(`<li className="pt-4">${ev.title}</li>`);
    setMessageArray([...messageArray,ev.title]);
  });

  const [count,setCount]=useState(0);
  

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-6">
                <header className="App-header">
                    <p>Connected: { '' + isConnected }</p>
                    <p>Last message: { lastMessage? <u>{lastMessage}</u>: '_________' }</p>
                    {/* <button onClick={ sendMessage }>Say hello!</button> */}
                </header>
            </div>
            <div className="col-md-6">
                <ul>
                    {/* {messageArray.map(d=>messageArray)} */}
                    {messageArray.map((d,i)=>{
                        return <li key={i} className='pt-4'>{d}</li>
                    })}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default RecieveMessage;
