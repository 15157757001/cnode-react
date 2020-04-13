
import './messages.css';
import React from 'react';
import MessagesDiv from '../components/messages-div/index'

class Messages extends React.Component{
  render(){
    return(
    <div>
      <div className="messagesRead">
        <MessagesDiv title="新消息"/>
      </div>
      <div className="messagesRead">
        <MessagesDiv title="过往消息"/>
      </div>
    </div>
    );
  }
}

export default Messages;
