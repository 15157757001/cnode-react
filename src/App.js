import React from 'react';
import { BrowserRouter, Route, Switch, Redirect,Link} from 'react-router-dom';
import { Layout, Menu,BackTop } from 'antd';
import src from './assets/cnodejs_light.svg'
import './App.css';
import tab from './pages/tab';
import topic from './pages/topic';
import messages from './pages/messages';
import collections from './pages/collections';
import Login from './components/login/index.js';
import register from './pages/register';
import {quitOutUser} from './reducers/user-reducer'
import { connect } from 'react-redux';
import { fn } from './api/apiData';

const { Header, Content, Footer } = Layout;


class App extends React.Component {
  constructor(){
    super();
    this.state ={
      isRegister:false
    }
  }

  componentWillMount(){
    fn()
    this.setState({
      isRegister:this.props.user.isRegister
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isRegister:nextProps.user.isRegister
    })
  }

  clickQuit(){
    this.props.quit()
  }

  render(){
    
    return (
      <Layout className="layout">
        <BrowserRouter>
          <Header>
            <Link to={{pathname:'/tab',query:{name:'all'}}}>
              <img src={src} alt="logo" className="logo"/>
            </Link>

            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
              className="left"
              defaultSelectedKeys={['all']}
            >
              <Menu.Item key="all">
                <Link to={{pathname:'/tab',query:{name:'all'}}}>全部</Link>
              </Menu.Item>
              <Menu.Item key="good">
                <Link to={{pathname:'/tab',query:{name:'good'}}}>精华</Link>
              </Menu.Item>
              <Menu.Item key="share">
                <Link to={{pathname:'/tab',query:{name:'share'}}}>分享</Link>
              </Menu.Item>
              <Menu.Item key="ask">
                <Link to={{pathname:'/tab',query:{name:'ask'}}}>问答</Link>
              </Menu.Item>
              <Menu.Item key="job">
                <Link to={{pathname:'/tab',query:{name:'job'}}}>招聘</Link>
              </Menu.Item>
              <Menu.Item key="dev">
                <Link to={{pathname:'/tab',query:{name:'dev'}}}>客户端测试</Link>
              </Menu.Item>
            </Menu>
            <div className="right">
              {this.state.isRegister?
                <Login 
                  onClick={()=>this.clickQuit()}
                  src ={this.props.user.avatar_url} 
                  alt={this.props.user.loginname} 
                  loginname={this.props.user.loginname}
                ></Login>:
                <Link to={'/register'} className="login">登录</Link>}
            </div>
          </Header>
          <Content style={{ padding: '20px 50px' }}>
          
            <div style={{  minHeight: 500 }}>
              <Switch>
                <Redirect from='/' to={{pathname:'/tab',query:{name:'all'}}} exact ></Redirect>       
                <Route path="/tab" component={tab} />
                <Route path="/register" component={register} />
                <Route path="/topic/:id" component={topic} />
                <Route path="/collections/:loginname" component={collections} />
                <Route path="/messages" component={messages} />
              </Switch>
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。<br></br>
            该网站服务器赞助商为github ，存储赞助商为CNode 社区 ，由云烟成雨提供应用性能服务。
          </Footer>
          <div>
            <BackTop />
          </div>
        </BrowserRouter>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    quit:() =>dispatch(quitOutUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);