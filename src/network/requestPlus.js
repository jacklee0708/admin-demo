/*
 * request加强版!哈哈哈
 * 我加入了elementUI的loading动画和message提示
 * 我写的很烂，所以如果你不需要这些东西
 * 那么我建议你使用request.js
 */

import axios from 'axios'
import {Message, Loading} from 'element-ui'

//创建axios实例并配置基础数据，如baseURL，timeout，headers等等
const instance = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/237790/',
  timeout: 5000
})

//请求拦截
instance.interceptors.request.use(config => {
  config.headers.Authorization = sessionStorage.getItem('token')

  // 发送请求时，显示loading动画
  startLoading()
  return config
}, err => {
  // Do something
  return err
})

//响应拦截
instance.interceptors.response.use(res => {
  // 拿到响应结果后，关闭loading动画
  endLoading()
  return res.data
}, err => {
  // 根据状态码做具体提示
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        showMessage('400,请求错误')
        break
      case 401:
        showMessage('401,未授权')
        break
      case 404:
        showMessage('404,未找到')
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

function showMessage(tips) {
  Message({
    showClose: true,
    message: tips,
    type: 'error'
  })
}

let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(255,255,255,0)',
  })
}

function endLoading() {
  loading.close()
}

export default request