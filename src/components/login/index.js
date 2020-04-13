import { Avatar,Menu,Dropdown } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom'

class Login extends React.Component { 

  clickCollect(){
    this.props.history.push({
      pathname:`/collections/${this.props.loginname}`
    })
  }

  clickMessages(){
    this.props.history.push({
      pathname:'messages'
    })
  }

  render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={() =>this.clickCollect()}>主题收藏</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() =>this.clickMessages()}>未读消息</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={() =>this.props.onClick()}>退出登录</a>
        </Menu.Item>
        
      </Menu>
    );
    return(
      <div>
        <Avatar src={this.props.src} alt={this.props.alt}/>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" style={{color:'white'}}>
            &nbsp;&nbsp;
            {this.props.loginname}
          </a>
        </Dropdown>
      </div>
    )
  }
} 

export default withRouter(Login)