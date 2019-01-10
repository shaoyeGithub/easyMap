import Vue from 'vue'
import Vuex from 'vuex'
import dashBoardCall from './dashBoardCall/'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashBoardCall
  }
})
