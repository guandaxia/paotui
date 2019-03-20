// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import store from './store/store'
import router from './router'
import App from './App'
import Icon from 'vue-svg-icon/Icon.vue'

import axios from './lib/http'

import ToastPlugin from 'vux/src/plugins/toast'
import AlertPlugin from 'vux/src/plugins/alert'
import ConfirmPlugin from 'vux/src/plugins/confirm'
import WechatPlugin from 'vux/src/plugins/wechat'

// import * as fundebug from 'fundebug-javascript'
// fundebug.apikey = 'f671227012f63ead2102beaa1f936782c1ddef6f88c13b85e44903c9b13fb1ff'

// function formatComponentName(vm) {
//   if (vm.$root === vm) return 'root'

//   var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name
//   return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '')
// }

// Vue.config.errorHandler = function (err, vm, info) {
//   var componentName = formatComponentName(vm)
//   var propsData = vm.$options && vm.$options.propsData

//   fundebug.notifyError(err,
//     {
//       metaData:
//       {
//         componentName: componentName,
//         propsData: propsData,
//         info: info
//       }
//     })
// }

Vue.component('icon', Icon)

Vue.use(VueRouter)

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)

FastClick.attach(document.body)

Vue.filter('moneyFormat', function (value, type = 0) {
  if (!value) value = 0
  value = (value / 100).toFixed(2)
  return type === 0 ? '￥' + value : value + '元'
})

Vue.filter('jobMoneyFormat', function (value) {
  if (!value) return ''
  return value / 100 + '元/天'
})

Vue.config.productionTip = false

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
