import React,{useState,useEffect} from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from "axios";
import  io from 'socket.io-client';

function SendMessage(props) {
    const [message,setMessage]=useState("");
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
    const [socketState,setSocketState] = useState(io(hostName));

    // useEffect(()=>{
    //     console.debug("Socket State",socketState);
    //     socketState.on("connect", (socket) => {
    //         socketState.on("marvel", (d)=>{
    //         console.debug("dataaaaaaa",d)
    //         });
    //     });
        
    //     socketState.on("connect_error", (e) => {
    //             // console.debug("sockent connect_error",e); // x8WIv7-mJelg7on_ALbx
    //             console.debug("sockent connect_error message",e.message); // x8WIv7-mJelg7on_ALbx
    //             // socket.auth.token = "abcd";
    //             // socket.connect();
    //     });

    // },[])

const onChangeHandler=(e)=>{
    // e.preventDefault;
    e.preventDefault();
    console.debug(e)
    console.debug(e.target.value)
    if(e.target.name=="message"){
        // if(e.keyCode == 13) {
        // if(e.key == "Enter") {
            // alert("should get the innerHTML or text value here");
        // }else{
            setMessage(e.target.value);
        // }
        // if(e.target.value!=){
        // }
    }
}

useEffect(()=>{

    return ()=>{
        // setMessage("");
    }
},[message])
// const onSubmitHandler = (e)=>{
function onSubmitHandler(e){
  // e.preventdefault();
  console.debug('onSubmitHandler');
  const res = axios.post("http://localhost:8000/api/qwerty",{msg:message,}).then(r=>{
    console.debug("submit success",r);
  }).catch(e=>{
    console.debug("error success",e);
  });
}
    return (
    <div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className='pt-4 row'
        >
            <TextField id="outlined-basic" name="message" label="Outlined" 
                variant="outlined" autoFocus={true} fullWidth={true} 
                className='col-md-8'
                value={message} onChange={onChangeHandler}
            />
            <Button 
                variant="outlined"
                className='col-md-4'
                onClick={onSubmitHandler} 
            >
                Send
            </Button>
        </Box>
    </div>
    );
}

export default SendMessage;