// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable*/
import Vue from 'vue'
import router from './router'
import store from './store'
import vueGridLayout from 'vue-grid-layout';
import App from './APP'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueKanban from 'vue-kanban'
import VueAwesomeSwiper from 'vue-awesome-swiper';
// // 引入样式
// import 'vue-easytable/libs/themes-base/index.css'
// // 导入 table 和 分页组件
// import {VTable, VPagination} from 'vue-easytable'

// // 注册到全局
// Vue.component(VTable.name, VTable)
// Vue.component(VPagination.name, VPagination)
// const EventBus = new Vue();
Vue.use(ElementUI)
Vue.use(vueGridLayout)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper) 
Vue.use(vueKanban)
Vue.config.productionTip = true
Vue.config.devtools = true
// /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  // components: {App}
  render:h => h(App)
  
})
