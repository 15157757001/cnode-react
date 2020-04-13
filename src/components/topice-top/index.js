import React from 'react';
import { setContent,setSpan } from '../../libs/util.js'
import './index.css'
import { Button } from 'antd'

class TopiceTop extends React.Component{
  constructor(){
    super()
  }

  componentWillMount(){

  }

  render(){
    const topice = this.props.topice
    const isRegister = this.props.isRegister

    return(
      <div className = "topice-top">
        <div className = "topice-top-right">
          {isRegister?<div>
            {
              this.props.isCollect?
              <Button onClick={()=>this.props.onDeClick()}>取消收藏</Button>:
              <Button onClick={()=>this.props.onClick()} type="primary">收藏</Button>
            }
          </div>:<div></div>}  
        </div>
        <div className = "topice-top-top">{setSpan(topice)}{topice.title}</div>
        <div className = "topice-top-bottom">
          <span>发布于{setContent(topice.create_at)}前</span>
          <span>作者&nbsp;{topice.author.loginname}</span> 
          <span>{topice.visit_count}&nbsp;次浏览</span>
          <span>来自&nbsp;{topice.tab}</span>
        </div> 
        
      </div>
    )
  }
}

export default TopiceTop