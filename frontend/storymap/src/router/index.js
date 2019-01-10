import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import NewContact from '@/components/NewContact'
import dashBoard from '@/views/dash/dashBoard'
import test from '@/components/test'
// import {dash} from 'views/'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      hidden: true,
      // redirect (to) {
      //   return '/views/dash/dashBoard'
      // }
      component: HelloWorld
    },
    {
      path: '/views/dash/dashBoard',
      name: '看板',
      hidden: true,
      component: dashBoard
    },
    {
      path: '/components/test',
      name: 'test',
      hidden: true,
      component: test
    }
  ]
})
