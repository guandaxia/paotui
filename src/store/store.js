/*
 * @Author: guansixu
 * @Date: 2017-08-16 12:20:25
 * @Last Modified by: guansixu
 * @Last Modified time: 2018-03-19 17:45:19
 * @description:
 */

import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import utils from '../lib/utils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: {},
    token: null,
    title: '',
    userId: 0,
    mobile: '',
    school: '',
    indexPath: '',
    error: {
      'show': false,
      'info': ''
    },
    loading: {
      'show': false,
      'info': ''
    },
    header: {
      leftOptions: {
        showBack: true,
        backText: '', // 返回文字
        preventGoBack: false // 是否阻止返回
      },
      rightOptions: {
        showMore: false, // 是否显示更多图标
        link: '',
        icon: '',
        text: ''
      },
      title: '',
      show: true // 是否显示header
    },
    firstUrl: '', // 首次进入页面url
    orderInfo: {},
    orderButtonText: '',
    jobInfo: '',
    releaseOrderInfo: {},
    recommendInfo: {}
  },
  getters: {
    error: state => state.error,
    loading: state => state.loading,
    header: state => state.header
  },
  actions: {
    error ({
      commit
    }, res) {
      commit(types.ERROR, res)
    }
  },
  mutations: {
    [types.HEADER]: (state, data) => {
      state.header = data
    },
    [types.LOGIN]: (state, data) => {
      state.token = data
      window.localStorage.token = data
    },
    [types.LOGOUT]: (state) => {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user_info')
      state.token = null
      state.userInfo = null
      state.orderInfo = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    },
    [types.USERINFO]: (state, data) => {
      utils.setLocalStorage('user_info', data)
      state.userInfo = data
    },
    [types.MOBILE]: (state, data) => {
      state.mobile = data
    },
    [types.SCHOOL]: (state, data) => {
      state.school = data
    },
    [types.USERID]: (state, data) => {
      state.userId = data
    },
    [types.ERROR]: (state, data) => {
      state.error = data
    },
    [types.LOADING]: (state, data) => {
      state.loading = data
    },
    [types.ORDERINFO]: (state, data) => {
      state.orderInfo = data
    },
    [types.JOBINFO]: (state, data) => {
      state.jobInfo = data
    },
    [types.INDEXPATH]: (state, data) => {
      state.indexPath = data
    },
    [types.RELEASEORDERINFO]: (state, data) => {
      state.releaseOrderInfo = data
    },
    [types.RECOMMENDINFO]: (state, data) => {
      state.recommendInfo = data
    },
    [types.FIRSTURL]: (state, data) => {
      state.firstUrl = data
    }
  }
})
