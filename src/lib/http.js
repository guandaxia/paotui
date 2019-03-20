/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router'
// import utils from './utils'

// axios 配置
axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://daike.com/api/'
// axios.defaults.baseURL = 'http://daike.guansixu.date/api/'
axios.defaults.baseURL = process.env.API_ROOT

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Content-Type'] = 'multipart/form-data'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log(process.env)
    let sign = ''
    let token = store.state.token
    // 判断请求的类型
    if (config.method === 'post') {
      // sign = utils.sign(config.data)

      let formData = new window.FormData()
      for (let key in config.data) {
        formData.append(key, config.data[key])
      }
      config.data = formData

      // let data = qs.parse(config.data)
      // config.data = qs.stringify({
      //   token,
      //   ...data
      // })
    } else if (config.method === 'get') {
      console.log(config.params)
      // sign = utils.sign(config.params)

      config.params = {
        token,
        ...config.params
      }
      // console.log(config.params)
    }
    // config.headers['sign'] = sign
    // config.headers['token'] = store.state.token
    console.log('token:' + store.state.token)
    // console.log('sign:' + sign)
    // 显示loading
    store.commit(types.LOADING, { 'show': true, 'info': '' })
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit(types.LOADING, { 'show': false, 'info': '' })
    // Vue.$vux.loading.hide()
    return response
  },
  error => {
    store.commit(types.LOADING, { 'show': false, 'info': '' })
    // Vue.$vux.loading.hide()
    console.log(JSON.stringify(error.response))
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('401')
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT)
          // store.commit(types.ERROR, { 'show': true, 'info': '登录信息过期' })
          // store.dispatch('ERROR', { 'show': true, 'info': '登录信息过期' })

          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        case 500:
          console.log('info')
          console.log(error.response.request.response)
          let errorInfo = error.response.request.response
          errorInfo = JSON.parse(errorInfo)
          console.log(errorInfo)
          store.commit(types.ERROR, { 'show': true, 'info': '系统错误,请稍候重试' + errorInfo.message })
          // store.dispatch('ERROR', { 'show': true, 'info': '系统错误,请稍候重试' + errorInfo.message })
          // Vue.$vux.toast.show({
          // text: errorInfo.message
          // })
          break
      }
    }
    // console.log(JSON.stringify(error))// console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
