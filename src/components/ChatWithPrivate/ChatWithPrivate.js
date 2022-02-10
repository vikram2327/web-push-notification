import React, { useState, useEffect } from 'react';


import SendMessage from './SendMessage';
import RecieveMessage from './RecieveMessage';

function ChatWithPrivate() {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SendMessage/>
        </div>
        <div className="col-md-10">
          <RecieveMessage/>
        </div>
      </div>
    </div>
  );
}

export default ChatWithPrivate;
