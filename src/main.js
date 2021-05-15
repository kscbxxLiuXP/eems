import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import store from './store'
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'CeL3HySvYbvK9OuoeSXGVqCLPAtxEXaQ'
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

