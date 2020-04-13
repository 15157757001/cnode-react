
import './topic.css';
import React from 'react';
import { getTopicById,collectById,de_collectById } from '../api/data'
import { Card,Avatar } from 'antd';
import TopiceTop from '../components/topice-top/index'
import TopiceReplies from '../components/topice-replies/index'
import TopiceReply from '../components/topice-reply/index'
import { connect } from 'react-redux';
import { getCollect } from '../reducers/user-reducer.js'

class Topic extends React.Component{
  constructor(){
    super()
    this.state = {
      topice:{
        author:{
          avatar_url:'',
          loginname:''
        },
        replies:[
          {
            author:{
              avatar_url:'',
              loginname:''
            },
            content:'',
            create_at:'',
            id:'',
            is_uped:'',
            reply_id:'',
            ups:[]
          }
        ]
      },
      replyText:'',
      isCollect:false
    }
  }

  componentWillMount(){
    
    const id = this.props.match.params.id;
    const collectData = this.props.user.collect.filter((item)=>id==item.id)
    if(collectData.length == 0){
      this.setState({
        isCollect:false
      })
    }else{
      this.setState({
        isCollect:true
      })
    }
    const data ={}
    getTopicById(id,data).then(res=>{
      this.setState({
        topice:res.data.data
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  textChange(e){
    this.setState({
      replyText:e.target.value
    })
  }

  replyClick=()=>{
    console.log(this.state.replyText)
  }

  async clickCollect(){
    const data = {
      accesstoken:this.props.user.token,
      topic_id:this.props.match.params.id
    }
    let result = await collectById(data);
    if(result.data.success){
      this.setState({
        isCollect:true
      })
      this.props.getCollect(this.props.user.loginname)
    }
  }

  async clickDeCollect(){
    const data = {
      accesstoken:this.props.user.token,
      topic_id:this.props.match.params.id
    }
    let result = await de_collectById(data);
    if(result.data.success){
      this.setState({
        isCollect:false
      })
      this.props.getCollect(this.props.user.loginname)
    }
  }

  render(){
    const user = this.props.user
    const topice = this.state.topice

    return(
      <div>
        <div style={{padding:'24px',backgroundColor: '#fff'}}>
          <TopiceTop topice={topice} isRegister={user.isRegister} isCollect={this.state.isCollect}
            onClick={()=>this.clickCollect()} onDeClick={()=>this.clickDeCollect()}/>
        </div>
        
        <div className="topice_style">
          <div className="topice_right" style={{ float: 'right',width:'300px',paddingRight:'24px' }}>
            <Card title="作者" style={{ width: '100%' }}>
              <div className="topice_card_head">
                <Avatar shape="square" src={topice.author.avatar_url} />
                <span className="topice_author">&nbsp;&nbsp;{topice.author.loginname}</span>
              </div>
              <p>积分:{topice.visit_count}</p>
            </Card>
          </div>
          <div className="topice_left">
            <div dangerouslySetInnerHTML={{__html:topice.content}} className="topice_content"/>
            <div className="topice_replies">
              <TopiceReplies replies={topice.replies}/>
            </div>
            <div>
              <TopiceReply replyText={this.state.replyText} onTextChange={(e)=>this.textChange(e)}
                onClick={()=>this.replyClick()}/>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default connect(state =>({
  user : state.user
}),{
  getCollect
})(Topic);
