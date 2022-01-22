import logo from './logo.svg';
import './App.css';

import axios from "axios";
import React,{useState,useEffect} from 'react';
import ReactDom from 'react-dom';
import CustomNotification  from '../src/components/Notification';
//allow react dev tools work
window.React = React;

function App(props) {
   const [ignore,setIgnore] = useState(true);
   const [title,setTitle] = useState('');
   const [options,setOptions] = useState('');
   const [notification,setNotification] = useState('');

  useEffect(()=>{
    setNotification("Vikram");
    // try {
      const ws = new WebSocket("ws://localhost:3000/");
      ws.onmessage = ({data}) => {
        this.message =  data;
        //this.showAlert();
      }
    // } catch(err) {
    //   console.log(err);
    // }
  },[]);

   const handlePermissionGranted =(e)=>{
    console.log('Permission Granted');
    setIgnore(false);
   }

   const handlePermissionDenied =(e)=>{
    console.log('Permission Denied');
    setIgnore(true);
   }

   const handleNotSupported =(e)=>{
    console.log('Web Notification not Supported');
    setIgnore(true);
   }
   const handleNotificationOnClick =(e,tag)=>{
    console.log(e, 'Notification clicked tag:' + tag);
   }

   const handleNotificationOnError =(e,tag)=>{
    console.log(e, 'Notification error tag:' + tag);
   }

   const handleNotificationOnClose =(e,tag)=>{
    console.log(e, 'Notification closed tag:' + tag);
   }
   
   const handleNotificationOnShow =(e,tag)=>{
    playSound();
    console.log(e, 'Notification shown tag:' + tag);
   }


   const playSound =(filename)=>{
    document.getElementById('sound').play();
   }


   const handleButtonClick =()=>{
    console.debug("handleButtonClick2 clicked");
    if(ignore)
      return;

      const now = Date.now();

      // const title = 'React-Web-Notification ' + now;
      const title = 'Web-Notification ';
  
      // const body = 'Hello ' + new Date();
      const body = 'Hello this is test notification';
      const tag = now;
      const icon = 'http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png';
      // const icon = 'http://localhost:3000/Notifications_button_24.png';
  
      // Available options
      // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
      const options = {
        tag: tag,
        body: body,
        icon: icon,
        lang: 'en',
        dir: 'ltr',
        sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
      }
      setTitle(title);
      setOptions(options);
 

      // askPermission().then(() => {
      //   const options = {
      //     userVisibleOnly: true,
      //     applicationServerKey: "urlBase64ToUint8Array"
      //     // applicationServerKey: urlBase64ToUint8Array(APP_SERVER_KEY)
      //   }
      //   return props.registration.pushManager.subscribe(options)
      // }).then((pushSubscription) => {
      //   console.debug("Push Subscribption called")
      //   // we got the pushSubscription object
      // });

      

      var n = new Notification('Title', {
        body: 'I am the body text!',
        icon: '/path/to/icon.png' // optional
      })

    // const options2 = {
    //   userVisibleOnly: true,
    //   // applicationServerKey: urlBase64ToUint8Array(APP_SERVER_KEY)
    //   applicationServerKey: "urlBase64ToUint8Array"
    // }
    // console.debug("options ",options2)
    // console.debug("options ",options2)
    // console.debug("options ",options2)
    // props.registration.pushManager.subscribe(options2)



   }



  const handleButtonClick2=()=>{

    props.swRegistration.getNotifications({}).then(function(notifications) {
      console.debug(notifications);
    });

  }

  // const askPermission = () => {
  //   return new Promise((resolve, reject) => {
  //     const permissionResult = Notification.requestPermission((result) => {
  //       resolve(result)
  //     })
  //     if (permissionResult) {
  //       permissionResult.then(resolve, reject)
  //     }
  //   })
  //   .then((permissionResult) => {
  //     if (permissionResult !== 'granted') {
  //       throw new Error('Permission denied')
  //     }
  //   })
  // }

  
  const [message,setMessage] = useState("");
  
  const onChangeHandler = (e)=>{
    if(e.target.name=="message"){
      setMessage(e.target.value);
    }
  }


  // const onSubmitHandler = (e)=>{
  function onSubmitHandler(e){
    e.prevent.default();
    console.debug('onSubmitHandler');
    // const res = axios.post("http://localhost:8000/qwerty",{msg:"Hi Vk",}).then(r=>{
    //   console.debug("submit success",r);
    // }).catch(e=>{
    //   console.debug("error success",e);
    // });
  }
  return (
    <div>
      <h1>
        Chat Start
      </h1>
      <h1>
        Chat End
      </h1>
      <form>
        <input type="text" name="message" value={message} onChange={onChangeHandler}/>
        {/* <input type="submit"  name="message" value={"Submit H"} onChange={onChangeHandler}/> */}
        {/* <button  onClick={(e)=>onSubmitHandler(e)}>Send</button> */}
        <button  onClick={onSubmitHandler}>Send</button>
      </form>
      
      <button onClick={handleButtonClick}>Show Notification</button>
      {/* {document.title === 'swExample' && <button onClick={handleButtonClick2}>swRegistration.getNotifications</button>} */}
      {/* <CustomNotification
        ignore={ignore && title !== ''}
        notSupported={handleNotSupported}
        onPermissionGranted={handlePermissionGranted}
        onPermissionDenied={handlePermissionDenied}
        onShow= {handleNotificationOnShow }
        onClick={handleNotificationOnClick}
        onClose={handleNotificationOnClose}
        onError={handleNotificationOnError}
        timeout={5000}
        title=  {title}
        options={options}
        swRegistration={props.swRegistration}
      />
      <audio id='sound' preload='auto'>
        <source src='./sound.mp3' type='audio/mpeg' />
        <source src='./sound.ogg' type='audio/ogg' />
        <embed hidden={true} autostart='false' loop={false} src='/home/dhruva/notification_react/webclient/example/sound.mp3' />
      </audio> */}
    </div>
  );
}

export default App;


if (document.title === 'swExample') {
  navigator.serviceWorker.register('sw.js')
  .then(function(registration) {
    ReactDom.render(<App swRegistration={registration}/>, document.getElementById('root'));
  });
} else {
  ReactDom.render(<App/>, document.getElementById('root'));
}