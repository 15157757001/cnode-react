import React from 'react';
import './index.css';
import { List, Avatar } from 'antd';
import { setContent } from '../../libs/util'

class TopiceReplies extends React.Component{
  constructor(){
    super()
  }

  render(){
    const replies = this.props.replies

    return(
      <div className="topice-replies">
        <div className="topice-replies-top">
          <span>&nbsp;{replies.length}&nbsp;回复</span>
        </div>
        <List
          className="topice-replies-list"
          itemLayout="horizontal"
          dataSource={replies}
          renderItem={(item,index) => (
            <List.Item actions={[<a>edit</a>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} />}
                title={<a href="https://ant.design"></a>}
                description={
                  <div>
                    <div>
                      {item.author.loginname}&nbsp;
                      <span style={{fontSize:'11px',color:'#08c'}}>{index+1}楼•{setContent(item.create_at)}前</span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html:item.content}}></div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default TopiceReplies