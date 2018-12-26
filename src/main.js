import Vue from 'vue';
import './styles/main.css'
import App from './app.vue'
//app.vue中引入
import $ from 'jquery'

window.onload = function () {
    new Vue({
        el: '#app',
        render: h => h(App)
    });
}