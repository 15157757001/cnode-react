import axios from '../libs/api.request.js' 

export const getTopics = info => {
  return axios.request({
    url: 'topics',
    method: 'get',
    params: info
  })
} 

export const getUserByToken = token => {
  return axios.request({
    url: 'accesstoken',
    method: 'post',
    data: token
  })
}

export const getTopicById = (id,data) => {
  return axios.request({
    url: `topic/${id}`,
    method: 'get',
    params: data
  })
}

export const collectById = data => {
  return axios.request({
    url: 'topic_collect/collect',
    data,
    method: 'post'
  })
}

export const de_collectById = data=> {
  return axios.request({
    url: 'topic_collect/de_collect',
    data,
    method: 'post'
  })
}

export const getCollectByLoginname = id => {
  return axios.request({
    url: `topic_collect/${id}`,
    method: 'get'
  })
}

export const getCollectionsByName = id => {
  return axios.request({
    url: `topic_collect/${id}`,
    method: 'get'
  })
}
