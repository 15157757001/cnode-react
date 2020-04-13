import React from 'react';
import './tab.css';
import {withRouter} from 'react-router-dom'
import { List, Avatar,Pagination } from 'antd';
import {getTopics} from '../api/data'
import {setContent,setSpan} from '../libs/util.js'

class Tab extends React.Component{
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

  getData(data){
    return new Promise((resolve,reject)=>{
      getTopics(data).then(res=>{
        resolve(res)
      }).catch(err=> reject(err))
    })
  }

  componentWillMount(){
    let query;
    if(typeof(this.props.location.query)==='undefined' ){
      query = 'all'
    }else query = this.props.location.query.name
    console.log(this.props.location.query)
    const data = {
      page:1,
      tab:query
    }

    // this.getData(data).then(res=>{
    //   console.log(res.data.data)
    //   this.setState({
    //     value:query,
    //     data:res.data.data,
    //     page:1
    //   })
    // })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location.query.name!== this.state.value){
      const data = {
        page:1,
        tab:nextProps.location.query.name,
      }
      this.getData(data).then(res=>{
        this.setState({
          value:nextProps.location.query.name,
          data:res.data.data,
          page:1
        })
      })
    }
    
  }
  
  onChange(page, pageSize){
    window.scrollTo(0,0);
    const data = {
      page,
      tab:this.props.location.query.name,
    }
    this.getData(data).then(res=>{
      this.setState({
        value:this.props.location.query.name,
        data:res.data.data,
        page
      })
    })
  }

  clickLink(id){
    this.props.history.push({
      pathname:`/topic/${id}`
    })
  }

  render(){
    
    return(
      <div className="tab">
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
          <Pagination total={2000} current={this.state.page}
            onChange={(page, pageSize)=>{this.onChange(page, pageSize)}} pageSize={40} defaultCurrent={1}/>
        </div>
      </div>
      
    )
    
  }
}

export default withRouter(Tab);
