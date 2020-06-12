import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home.vue'
// import City from '@/pages/city/City.vue'
// import Detail from '@/pages/detail/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/city',
      name: 'City',
      component: () => import('@/pages/city/City.vue') // 异步路由
    }, {
      path: '/detail/:id', // 动态路由
      name: 'Detail',
      component: () => import('@/pages/detail/Detail.vue')
    }
  ],
  // 规定路由滚动位置 x y坐标
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
