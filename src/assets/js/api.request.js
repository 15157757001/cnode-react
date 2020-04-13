import HttpRequest from './axios'
import config from '@/config'
//const baseUrl =  'https://cnodejs.org/api/v1/'

const baseUrl =  'http://localhost:7001/'
const axios = new HttpRequest(baseUrl)
export default axios
