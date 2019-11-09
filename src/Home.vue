<template>
  <body id="home" class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
  <div id="wrapper">
    <!--左侧导航开始-->
    <nav class="navbar-default navbar-static-side" role="navigation" style="
    height:  100%;
    overflow-y:  scroll;
">
      <div class="nav-close"><i class="fa fa-times-circle"></i>
      </div>
      <div class="sidebar-collapse">
        <ul class="nav" id="side-menu">
          <!-- 用户信息 -->
          <li class="nav-header">
            <div class="dropdown profile-element">
              <div style="width: 60%;margin: 0 auto">
                <!-- TODO 用户信息 -->
                <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                  <img alt="image" class="img-circle userlogo animated rubberBand" src="./assets/headportrait.jpg" style="width: 64px; border-radius: 5px;">
                  <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold">{{user.name}}</strong></span>
                                <span class="text-muted text-xs block">系统退出<b class="caret"></b></span>
                                </span>
                </a>
                <ul class="dropdown-menu animated fadeInRight m-t-xs">
                  <li>
                    <a @click="changePassMes">修改密码</a>
                  </li>
                  <li>
                    <a :href="sys_url">安全退出</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="text-align: center;">
            <sidebar-item :routes='dymenu'></sidebar-item>
          </el-menu>
        </ul>
      </div>
    </nav>
    <!--左侧导航结束-->

    <!--右侧部分开始-->
    <div id="page-wrapper" class="gray-bg dashbard-1" style="height: 98%;">

      <!-- 定位栏 -->
      <!--<div class="row content-tabs">
        <button class="roll-nav roll-left navbar-minimalize" style="background: #fff;border-color: #eee;">
          <i class="fa fa-bars"></i>
        </button>
      </div>-->
      <!-- 右侧 main div -->
      <div class="row J_mainContent" id="content-main" style="height: 100%">
        <router-view class="J_iframe" style="height: 100%;overflow-y:auto;"></router-view>
      </div>
    </div>
    <div id="right-sidebar">
    </div>
    <!--右侧边栏结束-->
    
    
    <div class="tan" v-dialogDrag>
      <el-dialog title="修改密码" :visible.sync="changeVisible" v-if='changeVisible' style=" z-index: 10000; width: 100%; height: 100%" center>  <!-- v-if='addVisible'   width="70%"-->
        <changePassDiv  :attr="userId" v-on:closeChangeClick="closeChangeClick"></changePassDiv>
        <!--v-on:childClick="childClick"-->
      </el-dialog>
    </div>
  </div>
  </body>
</template>

<script>
  import {getUserinfo} from './vuex/session-storage'
  import {getIslogin} from "./vuex/session-storage";
  import changePassDiv from './changePassDiv'
  import SidebarItem from './SidebarItem'
  export default {
    components: {SidebarItem,changePassDiv},
    name: 'home',
    data: function () {
      return {
        dymenu: [],
        user: '',
        message: false,
        messageNum: 0,
        isLogin: false,
        sys_url:process.env.sys_url,
        changeVisible:false,
        userId:''
      }
    },
    mounted: function () {
      this.getLogin()
      this.getMessage()
      console.log(process)
      console.log(process.env)
      console.log(process.env.SYS_URL)
    },
    methods: {
      changePassMes () {
//    	console.log(this.userId)
//    	debugger;
      	this.changeVisible = true;
//      this.isLogin = getIslogin()
//      if(this.isLogin){
//        this.user = JSON.parse(getUserinfo())
//
//        var getServeTypeAxios = this.$axios.create({})
//        getServeTypeAxios.get(this.$BASE_URL + 'user/changePass',{
//          params: {
//            id: this.user.id
//          }
//        }).then(function (response) {
//          this.dymenu = response.data.data;
//        }.bind(this)).catch(error => {
//
//        })
//      }else {
//        this.$router.push({ path: '/' })
//      }
      },

      getLogin () {
        this.isLogin = getIslogin()
        if(this.isLogin){
          this.user = JSON.parse(getUserinfo())
					this.userId=this.user.id
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_URL + 'user/queryMenuByPermission',{
            params: {
              id: this.user.id
            }
          }).then(function (response) {
            this.dymenu = response.data.data;
          }.bind(this)).catch(error => {

          })
        }else {
          this.$router.push({ path: '/' })
        }
      },

      getMessage() {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PATH + 'websiteLeaveMessage/countNewMassage',{
          params: {
          }
        }).then(function (response) {
          if(response.data.data != 0) {
            this.messageNum = response.data.data
            this.message = true
          }else {
            this.message = false
          }
        }.bind(this))
      },

      handleOpen() {

      },

      handleClose() {

      },
      closeChangeClick(){
      	this.changeVisible = false
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0px;
  }

  .nav-second-level li a {
    padding: 4 12px 0 0
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .el-menu {
    background-color: #2f4050;
  }
</style>
