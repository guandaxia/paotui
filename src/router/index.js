import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'
import utils from '../lib/utils'

// import Index from '@/pages/Index'
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import SearchCity from '@/pages/SearchCity'
// import SearchSchool from '@/pages/SearchSchool'
// import CheckMobile from '@/pages/CheckMobile'
// import PerfectInfo from '@/pages/PerfectInfo'
// import ForgetPassword from '@/pages/ForgetPassword'

// import TaskList from '@/pages/TaskList'
// import OrderList from '@/pages/OrderList'

// import JobDetail from '@/pages/JobDetail'

// import OrderDetail from '@/pages/OrderDetail'
// import GrapOrderSuccess from '@/pages/GrapOrderSuccess'

// import Setting from '@/pages/Setting'
// import Certification from '@/pages/Certification'
// import UnderReview from '@/pages/UnderReview'
// import Aboutus from '@/pages/Aboutus'
// import PracticeIntroduction from '@/pages/PracticeIntroduction'
// import Feedback from '@/pages/Feedback'
// import ChangePassword from '@/pages/ChangePassword'
// import EditUserInfo from '@/pages/user/EditUserInfo'
// import EditUserName from '@/pages/user/EditUserName'
// import EditMobile from '@/pages/user/EditMobile'

// import Account from '@/pages/Account'
// import AccountDetails from '@/pages/AccountDetails'

// import ReleaseExpress from '@/pages/release/Express'
// import ReleaseGoods from '@/pages/release/Goods'
// import ReleaseBuy from '@/pages/release/Buy'
// import ReleaseJob from '@/pages/release/Job'

// import Punishment from '@/pages/Punishment'
// import Reward from '@/pages/Reward'
// import Coupon from '@/pages/Coupon'
// import BuyCoupon from '@/pages/BuyCoupon'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: (resolve) => {
      require(['@/pages/Index'], resolve)
    },
    children: [
      {
        path: 'buyOrder',
        component: (resolve) => {
          require(['@/pages/index/BuyOrder'], resolve)
        }
      },
      {
        path: 'goods',
        component: (resolve) => {
          require(['@/pages/index/Goods'], resolve)
        }
      },
      {
        path: 'jobs',
        component: (resolve) => {
          require(['@/pages/index/Jobs'], resolve)
        }
      },
      {
        path: 'pracitce',
        component: (resolve) => {
          require(['@/pages/index/Pracitce'], resolve)
        }
      }
    ],
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: (resolve) => {
      require(['@/pages/Home'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: (resolve) => {
      require(['@/pages/Auth'], resolve)
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: (resolve) => {
      require(['@/pages/Login'], resolve)
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/searchCity',
    name: 'SearchCity',
    component: (resolve) => {
      require(['@/pages/SearchCity'], resolve)
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/searchSchool',
    name: 'SearchSchool',
    component: (resolve) => {
      require(['@/pages/SearchSchool'], resolve)
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/checkMobile',
    name: 'CheckMobile',
    component: (resolve) => {
      require(['@/pages/CheckMobile'], resolve)
    },
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/perfectInfo',
    name: 'PerfectInfo',
    component: (resolve) => {
      require(['@/pages/PerfectInfo'], resolve)
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: (resolve) => {
      require(['@/pages/ForgetPassword'], resolve)
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: (resolve) => {
      require(['@/pages/Setting'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/aboutus',
    name: 'Aboutus',
    component: (resolve) => {
      require(['@/pages/Aboutus'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: (resolve) => {
      require(['@/pages/Feedback'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: (resolve) => {
      require(['@/pages/ChangePassword'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/editUserInfo',
    name: 'EditUserInfo',
    component: (resolve) => {
      require(['@/pages/user/EditUserInfo'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/editUserName',
    name: 'EditUserName',
    component: (resolve) => {
      require(['@/pages/user/EditUserName'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/editMobile',
    name: 'EditMobile',
    component: (resolve) => {
      require(['@/pages/user/EditMobile'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/uploadAvatar',
    name: 'UploadAvatar',
    component: (resolve) => {
      require(['@/pages/user/UploadAvatar'], resolve)
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: (resolve) => {
      require(['@/pages/Account'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/accountDetails',
    name: 'AccountDetails',
    component: (resolve) => {
      require(['@/pages/AccountDetails'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/extractMoney',
    name: 'ExtractMoney',
    component: (resolve) => {
      require(['@/pages/ExtractMoney'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/extractAccount',
    name: 'ExtractAccount',
    component: (resolve) => {
      require(['@/pages/ExtractAccount'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/extractMoneyDetails',
    name: 'ExtractMoneyDetails',
    component: (resolve) => {
      require(['@/pages/ExtractMoneyDetails'], resolve)
    }
  },
  {
    path: '/releaseExpress',
    name: 'ReleaseExpress',
    component: (resolve) => {
      require(['@/pages/release/Express'], resolve)
    },
    meta: {
      // requireAuth: true,
      keepAlive: false
    }
  },
  {
    path: '/releaseGoods',
    name: 'ReleaseGoods',
    component: (resolve) => {
      require(['@/pages/release/Goods'], resolve)
    },
    meta: {
      // requireAuth: true,
      keepAlive: false
    }
  },
  {
    path: '/releaseBuy',
    name: 'ReleaseBuy',
    component: (resolve) => {
      require(['@/pages/release/Buy'], resolve)
    },
    meta: {
      // requireAuth: true,
      keepAlive: false
    }
  },
  {
    path: '/releaseJob',
    name: 'ReleaseJob',
    component: (resolve) => {
      require(['@/pages/release/Job'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: false
    }
  },
  {
    path: '/certification',
    name: 'Certification',
    component: (resolve) => {
      require(['@/pages/Certification'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/underReview',
    name: 'UnderReview',
    component: (resolve) => {
      require(['@/pages/UnderReview'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/punishment',
    name: 'Punishment',
    component: (resolve) => {
      require(['@/pages/Punishment'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/reward',
    name: 'Reward',
    component: (resolve) => {
      require(['@/pages/Reward'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: (resolve) => {
      require(['@/pages/Coupon'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/buycoupon',
    name: 'BuyCoupon',
    component: (resolve) => {
      require(['@/pages/BuyCoupon'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/taskList',
    name: 'TaskList',
    component: (resolve) => {
      require(['@/pages/TaskList'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: (resolve) => {
      require(['@/pages/OrderList'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/practiceIntroduction',
    name: 'PracticeIntroduction',
    component: (resolve) => {
      require(['@/pages/PracticeIntroduction'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: (resolve) => {
      require(['@/pages/OrderDetail'], resolve)
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/jobDetail',
    name: 'JobDetail',
    component: (resolve) => {
      require(['@/pages/JobDetail'], resolve)
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/grapOrderSuccess',
    name: 'GrapOrderSuccess',
    component: (resolve) => {
      require(['@/pages/GrapOrderSuccess'], resolve)
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/payOrder',
    name: 'PayOrder',
    component: (resolve) => {
      require(['@/pages/PayOrder'], resolve)
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/selectCoupon',
    name: 'SelectCoupon',
    component: (resolve) => {
      require(['@/pages/SelectCoupon'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/selectExpress',
    name: 'SelectExpress',
    component: (resolve) => {
      require(['@/pages/Express'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/share',
    name: 'Share',
    component: (resolve) => {
      require(['@/pages/Share'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/shareIntroduction',
    name: 'ShareIntroduction',
    component: (resolve) => {
      require(['@/pages/ShareIntroduction'], resolve)
    },
    meta: {
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/buildingMasterShare',
    name: 'BuildingMasterShare',
    component: (resolve) => {
      require(['@/pages/BuildingMasterShare'], resolve)
    },
    meta: {
      requireAuth: true,
      keepAlive: true
    }
  }
]
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
  store.commit(types.USERINFO, utils.getLocalStorage('user_info'))
}

const router = new Router({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  // 判断vuex中是否存在url,如果不存在则为首次进入页面

  if (!store.state.firstUrl) {
    console.log(document.URL)
    store.commit(types.FIRSTURL, document.URL)
  }

  store.commit(types.LOADING, { 'show': true, 'info': '' })
  if (to.matched.some(r => r.meta.requireAuth)) {
    console.log('router check token:' + store.state.token)
    if (store.state.token) {
      next()
    } else {
      Vue.$vux.toast.show({
        text: '请先登录',
        type: 'warn'
      })
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (to.path === '/shareIntroduction' && to.query.source === '2') {
      // 合作院校推荐
      console.log(store.state.token)
      if (store.state.token) {
        console.log('info')
        next({
          path: '/'
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  store.commit(types.LOADING, { 'show': false, 'info': '' })
})

export default router
