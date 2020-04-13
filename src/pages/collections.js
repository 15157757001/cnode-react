
import './collections.css';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { getCollectionsByName } from '../api/data'
import { List, Avatar,Pagination } from 'antd'
import {setContent,setSpan} from '../libs/util.js'

class Collections extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:'',
      data :[
        {
          title: 'Ant Design Title 1',
          author:{
            avatar_url:'',
            loginname:''
          },
          top:true
        }
      ],
      page:1
    };
  }

  componentWillMount(){
    const loginname = this.props.match.params.loginname
    getCollectionsByName(loginname).then(res=>{
      this.setState({
        data:res.data.data
      })
    }).catch(err => {
      console.log(err)
    })
  }


  clickLink(id){
    this.props.history.push({
      pathname:`/topic/${id}`
    })
  }

  render(){
    return(
      <div className="collection-style">
        <div className="collection-top">
          <span>收藏的主题</span>
        </div>
        <div className="collection-list">
          <List
          itemLayout="horizontal"
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} alt={item.author.loginname}/>}
                title={<a onClick={()=>this.clickLink(item.id)}>{item.title}</a>}
                description={
                  <div>
                    {setSpan(item)}
                    <span className="count_of_replies">{item.reply_count}</span>
                    <span>/{item.visit_count}</span>
                  </div>
                }
              />
              <div><span>{setContent(item.last_reply_at)}前</span></div>
            </List.Item>
          )}
          />
          <div className="footer">
            <span>&nbsp;</span>
            <Pagination total={this.state.data.length} current={this.state.page}
              onChange={(page, pageSize)=>{this.onChange(page, pageSize)}} pageSize={40} defaultCurrent={1}/>
          </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Collections);
