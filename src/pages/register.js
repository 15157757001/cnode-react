
import './register.css';
import React from 'react';
import { Input,Button,message,Card } from 'antd';
import { getUserByToken } from '../api/data'
import { connect } from 'react-redux';
import { addToUser,getCollect } from '../reducers/user-reducer.js'

class Register extends React.Component{

  constructor(){
    super();
    this.state = {
      token:''
    }
  }

  

  componentDidMount() {

  } 

  change(e){
    this.setState({
      token:e.target.value
    })
  }

  register (){
    
    const data = {
      accesstoken: this.state.token.trim()
    }
    if(data.accesstoken === ''){
      message.error('未输入Access Token');
      return
    }
    getUserByToken(data).then(res =>{
      this.props.getCollect(res.data.loginname)
      this.props.addToUser({...res.data,token:data.accesstoken})
      this.setState({
        token:''
      })
      message.success('登录成功');
    }).catch(err => {
      message.error('Access Token验证错误');
    })
 
  }

  render(){
    return(
      <div>
        <div className= "register">
          <Card
            title="登录"
            style={{ width: 300 }}
          >
            <div className= "card">
              <Input placeholder="在个人中心获取Access Token" 
                value={this.state.token} 
                onChange={(e)=>{this.change(e)}} type="primary"
              />
              <Button onClick={()=>this.register()} className="registerBt">登录</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {
  addToUser,
  getCollect
})(Register);
