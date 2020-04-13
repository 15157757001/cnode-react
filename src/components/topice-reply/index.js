import React from 'react';
import './index.css';
import { Form,Button,Input } from 'antd'

const { TextArea } = Input;

class TopiceReply extends React.Component{
  constructor(){
    super()
  }


  onSubmit = ()=>{

  }

  render(){ 
    return(
      <div className="topice-reply">
        <div className="topice-reply-top">
          <span>添加回复</span>
        </div>
        <div className="topice-reply-edit">
          <Form.Item>
            <TextArea rows={4} onChange={(e)=>this.props.onTextChange(e)} value={this.props.replyText}/>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick={()=>this.props.onClick()}
              type="primary"
            >
              发送
            </Button>
          </Form.Item>
        </div>
      </div>
    )
  }
}

export default TopiceReply