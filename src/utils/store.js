import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    user: undefined,
    isLogin: "",
  },
  mutations: {
    login(state,msg){
      state.user = msg;
      localStorage.setItem("user",JSON.stringify(msg));
      //JSON.parse(localStorage.getItem("user")) 解析成对象
      //JSON.parse(localStorage.getItem("user")).username 用户名
    },
    isLogin(state,msg){
      state.isLogin = msg;
      localStorage.setItem("isLogin",msg);
    }
  },
  actions: {
    login (context, payload){
      context.commit('login', payload)
    }
  }
})

export default store
