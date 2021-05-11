import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import store from './store'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
