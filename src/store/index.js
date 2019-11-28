import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shrinkage:false
  },
  mutations: {
    changeShrinkage(state){
      state.shrinkage = !state.shrinkage
    }
  },
  actions: {
  },
  modules: {
  }
})
