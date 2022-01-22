import React,{useState,useEffect} from 'react';
import { bool, func, number, object, string } from 'prop-types';

const PERMISSION_GRANTED = 'granted';
const PERMISSION_DENIED = 'denied';

const seqGen = () => {
  let i = 0;
  return () => {
    return i++;
  };
};
const seq = seqGen();

function Notification(props){

    let supported1 = false;
    let granted1 = false;
    
    if (('Notification' in window) && window.Notification) {
      supported1 = true;
      if (window.Notification.permission === PERMISSION_GRANTED) {
        granted1 = true;
      }
    }

    const [supported,setSupported] = useState(supported1);
    const [granted  ,setGranted] = useState(granted1);
    


  
    // Do not save Notification instance in state
    const [notifications,setNotifications]  = useState({});
    const [windowFocus  ,setWindowFocus]    = useState(true);

    const _onWindowFocus=()=>{
      setWindowFocus(true);
    }
  
    const _onWindowBlur=()=>{
      setWindowFocus(false);
    }

    const [onWindowFocus,setOnWindowFocus ]  = useState(_onWindowFocus);
    const [onWindowBlur ,setOnWindowBlur  ]  = useState(_onWindowBlur );


  const _askPermission=()=>{
    window.Notification.requestPermission((permission) => {
      let result = permission === PERMISSION_GRANTED;

      setGranted(result);
      if(result){
        props.onPermissionGranted();
      }else{
        props.onPermissionDenied();
      }

    });
  }

  useEffect(()=>{

    if (props.disableActiveWindow) {
      window.addEventListener('focus',  onWindowFocus);
      window.addEventListener('blur',   onWindowBlur);
    }

    if (!supported) {
      props.notSupported();
    } else if (granted) {
      props.onPermissionGranted();
    } else {
      if (window.Notification.permission === PERMISSION_DENIED){
        if (props.askAgain){
          _askPermission();
        } else {
          props.onPermissionDenied();
        }
      } else {
        _askPermission();
      }
    }

    return () => {
      if (props.disableActiveWindow) {
        window.removeEventListener('focus', onWindowFocus);
        window.removeEventListener('blur',  onWindowBlur);
      }
    }

  },[]);



  const close=(n)=>{
    if (n && typeof n.close === 'function') {
      n.close();
    }
  }

  const doNotification=()=>{
    let opt = props.options;
    if (typeof opt.tag !== 'string') {
      opt.tag = 'web-notification-' + seq();
    }
    if (notifications[opt.tag]) {
      return;
    }

    if (props.swRegistration && props.swRegistration.showNotification) {
      props.swRegistration.showNotification(props.title, opt)
      notifications[opt.tag] = {};
    } else {
      const n = new window.Notification(props.title, opt);
      n.onshow = e => {
        props.onShow(e, opt.tag);
        if (props.timeout > 0) {
          setTimeout(() => {
             close(n);
          }, props.timeout);
        }
      };
      n.onclick = e => { props.onClick(e, opt.tag); };
      n.onclose = e => { props.onClose(e, opt.tag); };
      n.onerror = e => { props.onError(e, opt.tag); };

      notifications[opt.tag] = n;
    }
  }


  // render() {
    let doNotShowOnActiveWindow = props.disableActiveWindow && windowFocus;
    if (!props.ignore && props.title && supported && granted && !doNotShowOnActiveWindow) {
      doNotification();
    }

    // return null cause
    // Error: Invariant Violation: Notification.render(): A valid ReactComponent must be returned. You may have returned undefined, an array or some other invalid object.
    return (
      <input type='hidden' name='dummy-for-react-web-notification' style={{display: 'none'}} />
    );
  // }

  // // for debug
  // _getNotificationInstance(tag) {
  //   return this.notifications[tag];
  // }

}


export default Notification;
