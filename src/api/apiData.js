import axios from '../libs/api.request.js' 


import { setCookie } from '../libs/commom' 



export const getUserInfo = id => {
  return axios.request({
    url: '/user/info/get',
    method: 'post'
  })
} 

export const creatUser = data => {
  return axios.request({
    url: '/user/creat',
    method: 'POST',
    data
  })
} 



export const updateUser = data => {
  return axios.request({
    url: '/user/update',
    method: 'POST',
    data
  })
} 

export const getToken = () => {
  return axios.request({
    url: '/user/token/get',
    method: 'POST',
    data: {
      username:'jiang',
      password:999
    }
  })
} 

export const destroyToken = () => {
  return axios.request({
    url: '/user/destroy',
    method: 'POST',
  })
} 


export const createTopic = (data) => {
  return axios.request({
    url: '/topic/create',
    method: 'POST',
    data
  })
} 


export const destroyTopic = (data) => {
  return axios.request({
    url: '/topic/destroy',
    method: 'POST',
    data
  })
} 

export const getTopic = (data) => {
  return axios.request({
    url: '/topic/topic',
    method: 'POST',
    data
  })
} 

export const getList = (data) => {
  return axios.request({
    url: '/topic/list',
    method: 'POST',
    data
  })
} 


export const replyCreate = ({ topic_id,at_id,context }) => {
  const data = {
    topic_id,
    at_id,
    context
  }
  return axios.request({
    url: '/reply/create',
    method: 'POST',
    data
  })
} 

export const getReplyList = ({id,size,page}) => {
  const data = {
    id,
    size,
    page
  }
  return axios.request({
    url: '/reply/list',
    method: 'POST',
    data
  })
} 
export const destroyReply = ({id}) => {
  const data = {
    id
  }
  return axios.request({
    url: '/reply/destroy',
    method: 'POST',
    data
  })
} 
export const fn = async ()=>{
  // const data = {
  
  // }
  // updateUser(data).then(res=>{

  // })
  getToken().then(res=>{
    setCookie('token',res.data.data.token,24 * 60 * 60 * 1000)
  //   destroyToken().then(res=>{
  //     getUserInfo().then(res=>{
      
  //     })
  //   })

  const data = {
    topic_id:1,
    at_id:1,
    context:'12'
  }
  destroyReply({id:3}).then(res=>{})
  //replyCreate(data).then(res=>{})
  //getReplyList({id:1,size:2,page:1}).then(res=>{})
  //   getUserInfo().then(res=>{

  //   })
    // createTopic(data).then(res=>{

    // })

    // const data = {
    //   info:{
    //     type:'goods',
        
    //   },
    //   size:20,
    //   page:3
    // }
    // getList(data).then(res=>{

    // })
    // createTopic({title:123,type:'ask',content:'321'}).then(res=>{

    // })
    //destroyTopic({id:1}).then(res=>{})
  })
}