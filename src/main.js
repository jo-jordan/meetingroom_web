import Vue from 'vue';
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
Vue.locale('zh-cn', zhLocale)
Vue.locale('en', enLocale)

new Vue({
    el: '#app',
    render: h => h(App)
});