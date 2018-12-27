import Vue from 'vue'

import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'

import i18n from './lang'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueRouter)

Vue.config.productionTip = false

const app = new Vue({
  el:'#app',
  router,
  i18n,
  render: h => h(App)
})