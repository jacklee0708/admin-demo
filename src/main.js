import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import request from './network/request'

Vue.prototype.$request = request //把封装好的axios添加到vue的原型，以便全局使用

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
