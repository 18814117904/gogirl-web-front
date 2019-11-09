import Vue from 'vue'
import App from './App'
import axios from 'axios'
import layer from 'vue-layer'
import qs from 'qs'
import ElementUI from 'element-ui'
import Global from './Global'
import 'element-ui/lib/theme-chalk/index.css'
import store from './utils/store'
import {getIslogin} from "./vuex/session-storage";
import dyvuex from './dynamic'
import router from './router'

Vue.config.productionTip = false
//const BASE_URL = 'http://192.168.2.102:8086/gogirl_web_store/gogirl-service/'  //跳转环境
//const BASE_STORE_URL = 'http://192.168.2.102:8086/gogirl_web_store/gogirl-store/'  //跳转环境

//const BASE_PICTUREPATH_URL = 'http://qn.begogirls.com/' //本地环境
//const BASE_PATH = 'http://192.168.0.103/gogirl_web_store/' //本地环境
//const BASE_USER_URL = BASE_PATH + 'gogirl_user/'  //本地环境
//const BASE_URL = BASE_PATH + 'gogirl-service/'  //本地环境
//const BASE_STORE_URL = 'http://192.168.0.104:8081/gogirl-store/'  //本地环境
//const BASE_ORDER_URL = BASE_PATH + 'gogirl-order/' //本地环境
//const BASE_PURCHASE_URL = BASE_PATH + 'gogirl_purchase/' //本地环境

/*const BASE_PICTUREPATH_URL = 'http://qn.begogirls.com/' //正式环境
const BASE_PATH = 'http://134.175.167.230:80/gogirl_web_store/' //正式环境
const BASE_USER_URL = BASE_PATH + 'gogirl_user/'  //正式环境
const BASE_URL = BASE_PATH + 'gogirl-service/'  // 正式环境
const BASE_STORE_URL = BASE_PATH + 'gogirl-store/'  // 正式环境
const BASE_ORDER_URL = BASE_PATH + 'gogirl-order/' //正式环境
const BASE_PURCHASE_URL = BASE_PATH + 'gogirl_purchase/' //正式环境*/

/*const BASE_PICTUREPATH_URL = 'http://qn.begogirls.com/' //测试环境
const BASE_PATH = 'http://94.191.67.240:80/gogirl_web_store/' //测试环境
const BASE_USER_URL = BASE_PATH + 'gogirl_user/'  //测试环境
const BASE_URL = BASE_PATH + 'gogirl-service/'  // 测试环境
const BASE_STORE_URL = BASE_PATH + 'gogirl-store/'  // 测试环境
const BASE_ORDER_URL = BASE_PATH + 'gogirl-order/' //测试环境
const BASE_PURCHASE_URL = BASE_PATH + 'gogirl_purchase/' //测试环境*/

//process.env.
const BASE_PICTUREPATH_URL = process.env.BASE_PICTUREPATH_URL
const BASE_PATH = process.env.BASE_PATH
const BASE_USER_URL = process.env.BASE_USER_URL
const BASE_URL = process.env.BASE_URL
const BASE_STORE_URL = process.env.BASE_STORE_URL
const BASE_ORDER_URL = process.env.BASE_ORDER_URL
const BASE_PURCHASE_URL =process.env.BASE_PURCHASE_URL

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
// 允许携带 cookie
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$Global = Global
Vue.prototype.$layer = layer(Vue)
Vue.prototype.$qs = qs
Vue.prototype.$store = store
Vue.prototype.$BASE_URL = BASE_URL
Vue.prototype.$BASE_PATH = BASE_PATH
Vue.prototype.$BASE_STORE_URL = BASE_STORE_URL
Vue.prototype.$BASE_USER_URL = BASE_USER_URL
Vue.prototype.$BASE_PICTUREPATH_URL = BASE_PICTUREPATH_URL
Vue.prototype.$BASE_ORDER_URL = BASE_ORDER_URL
Vue.prototype.$BASE_PURCHASE_URL = BASE_PURCHASE_URL
if(getIslogin()) {
  dyvuex.dispatch('GenerateRoutes').then(() => {
    console.log("addRouters", (dyvuex.getters.addRouters))
    router.options.routes = [...router.options.routes,...dyvuex.getters.addRouters];
    router.addRoutes(dyvuex.getters.addRouters)
    // router.addRoutes()
    // router.options.routes = [...router.options.routes,...dyvuex.getters.addRouters];
    console.log("==============", router.options.routes);
    //   this.$router.push({ name: 'index' })
  });
}
router.beforeEach((to, from, next) => {
  if(to.path == '/activity/activity_summary' || to.path == '/activity/activityuser') {
    next()
  }else if (getIslogin() == undefined && to.name !== 'login') {
    next({
      path: '/',
      name: 'login'
    });
  }else {
    next()
  }
});
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
