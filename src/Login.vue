<template>
  <body id="login" class="fixed-sidebar full-height-layout gray-bg signin" style="height: 100%;">
  <div class="signinpanel">
    <div class="middle-box text-center loginscreen  animated fadeInDown">
      <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <!--<svg-icon icon-class="user" />-->
          <span v-show="errorMessage" style="color: #f56c6c;font-size: 12px">用户名或密码错误</span>
        </span>
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
        <span class="svg-container">
          <!--<svg-icon icon-class="password" />-->
        </span>
            <el-input
              :type="passwordType"
              v-model="loginForm.password"
              placeholder="密码"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
          <!--<svg-icon icon-class="eye" />-->
        </span>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

          <!--<p class="text-muted text-center"> <a href="#" @click="forget"><small>忘记密码了？</small></a> | <a href="#" @click="create">注册一个新账号</a>
          </p>-->
        </el-form>
      </div>
    </div>
    <div class="signup-footer" style="position:fixed; bottom:0;">
    <div class="pull-left" >
      &copy; 2018 All Rights Reserved.
    </div>
  </div>
  </div>
  </body>
</template>

<script>
  import {setUserinfo} from './vuex/session-storage'
  import {setIslogin} from './vuex/session-storage'
  import registers from './register'
  import dyvuex from './dynamic'
  import router from './router'
  export default {
  name: "produce_new",
    data: function(){
      const validateUsername = (rule, value, callback) => {
        this.errorMessage = false
        if (value.length < 1) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        this.errorMessage = false
        if (value.length < 6) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
    return {
      loading: false,
      errorMessage: false,
      passwordType: 'password',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  mounted: function () {
  },
  methods: {
    create: function () {
      this.$layer.iframe({
        content: {
          content: registers,
          parent: this,
          data: {}
        },
        area: ['800px', '400px'],
        title: '注册用户'
      })
    },
    forget () {
      this.$layer.msg("请联系管理人员！")
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          var searchAxios = this.$axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          var postData = this.$qs.stringify({
            name: this.loginForm.username,
            password: this.loginForm.password,
          })
          searchAxios.post(this.$BASE_URL + 'user/queryUserForCheck/', postData)
            .then(function (response) {
            //  window.location.reload()
              if(response.data.success == false){
                this.loading = false
                this.errorMessage = true
              }else{
                if((response.data.data.departmentId) == 0){
                  this.loading = false
                  this.$Global.user = response.data.data
                  setUserinfo(JSON.stringify(this.$Global.user))
                  setIslogin(true)

                  /*<!--  加载动态路由开始  -->*/



                  // 远程获取用户菜单生成路由
                  dyvuex.dispatch('GenerateRoutes').then(() => {

                    console.log("addRouters", (dyvuex.getters.addRouters))
                    router.options.routes = [...router.options.routes,...dyvuex.getters.addRouters];
                    router.addRoutes(dyvuex.getters.addRouters)
                    // router.addRoutes()
                    // router.options.routes = [...router.options.routes,...dyvuex.getters.addRouters];
                    console.log("==============", router.options.routes);

                    this.$notify({
                      type: 'success',
                      message: '欢迎你,' + this.loginForm.username + '!',
                      duration: 3000,
                    });

                    if(response.data.data.userRole == '3') {
                      this.$router.push({ path: '/purchase/purchase_index' })
                    }else if(response.data.data.userRole == '2') {
                      this.$router.push({ path: '/serve/serve_index' })
                    }else{
                      this.$router.push({ path: '/working/working_data' })
                    }

                    //   this.$router.push({ name: 'index' })
                  });

                  /*<!--   加载动态路由结束  -->*/


                }else{
                  this.loading = false
                  this.errorMessage = true
                }
              }
            }.bind(this))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
  }
</script>

<style scoped>
  @import "../static/css/login/animate.css";
  @import "../static/css/login/login.css";
  @import "../static/css/login/style.css";
  @import "../static/css/login/font-awesome.css";
  @import "../static/css/bootstrap.min.css";

</style>
