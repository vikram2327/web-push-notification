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

    const onChangeHandler=(e)=>{
        // e.preventDefault;
        e.preventDefault();
        console.debug(e)
        console.debug(e.target.value)
        if(e.target.name=="message"){
            setMessage(e.target.value);
        }
}

useEffect(()=>{

    return ()=>{
        // setMessage("");
    }
},[message])

function onSubmitHandler(e){
    e.preventDefault();
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
                onSubmit={onSubmitHandler}
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