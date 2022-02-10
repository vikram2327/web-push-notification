import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import ChatWithPrivate from './components/ChatWithPrivate/ChatWithPrivate';



function App() {

  return (
    <div className="Container-fluid">
      <ChatWithPrivate/>
    </div>
  );
}

export default App;
