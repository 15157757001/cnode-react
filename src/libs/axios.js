import Qs from 'qs'
import axios from 'axios'

import { getCookie } from './commom' 

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      transformRequest: [function(data) {
        data = Qs.stringify(data);
        return data;
      }],
    }
    return config
  }
  interceptors (instance) {
    // 请求拦截
    instance.interceptors.request.use(config => {
    let token = getCookie('token');
    
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token;
    }

      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {

      const { data, status } = res
      return { data, status }
    }, error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 返回 401 清除token信息并跳转到登录页面
            // router.replace({
            //   path: '/login'
            // });
            console.log(error.response)
        }
      }

      

      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance.request(options)
  }
}
export default HttpRequest
