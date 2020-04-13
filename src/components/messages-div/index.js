import React from 'react';
import './index.css'

class MessagesDiv extends React.Component{
  render(){
    return(
      <div className="messagesDiv-style">
        <div className="messagesDiv-top">
          <span>{this.props.title}</span>
        </div>
        <div className="messagesDiv-bottom"></div>
      </div>
    )
  }
}

export default MessagesDiv