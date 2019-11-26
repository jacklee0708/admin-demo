import axios from 'axios'

//创建axios实例并配置基础数据，如baseURL，timeout，headers等等
const instance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/237790/',
  timeout: 5000
})

//请求拦截
instance.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
}, err => {
  // Do something
  return err
})

//响应拦截
instance.interceptors.response.use(res => {
  // Do something
  return res.data
}, err => {
  // Do something
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '400,请求错误'
        break
      case 401:
        err.message = '401,未授权'
        break
      case 404:
        err.message = '404,未找到'
        break
    }
  }
  return err
})

const request = {

  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get(url, params) {
    return new Promise((resolve, reject) => {
      instance({
        method: 'get',
        url,
        params,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求参数} data
   */
  post(url, data) {
    return new Promise((resolve, reject) => {
      instance({
        method: 'post',
        url,
        data,
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
export default request