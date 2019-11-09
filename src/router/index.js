import Vue from 'vue'
import Router from 'vue-router'

import login from '@/Login'
import serv_new from '@/components/serve/serve_new'
import serve_modify from '@/components/serve/serve_modify'
import produce_new from '@/components/produce/produce_new'
import produce_modify from '@/components/produce/produce_modify'
import broadcast_new from '@/components/broadcast/broadcast_new'
import broadcast_modify from '@/components/broadcast/broadcast_modify'
import store_new from '@/components/store/store_new'
import store_modify from '@/components/store/store_modify'
import activityuser from '@/components/activity/activity_user_index'
import news_new from '@/components/website/news_new'
import news_modify from '@/components/website/news_modify'



Vue.use(Router)

export const asyncRouterMap = [
  /*{ path: '*', redirect: '/404', hidden: true }*/
];

export const constantRouterMap = [

  {
    path: '/',
    name: 'login',
    component: login,
    meta: {
      auth: false
    }
  },
  /*{
    path: '/',
    name: 'home',
    component: home,
    redirect: 'login',
    children: []
  },*/
  /*{
    path: '/activity/activity_summary',
    name: 'activity_summary',
    component: activity_summary
  },*/
  {
    path: '/serve/ueditor',
    name: 'serv_new',
    component: serv_new
  },
  {
    path: '/news/ueditor',
    name: 'news_new',
    component: news_new
  },
  {
    path: '/news/modify',
    name: 'news_modify',
    component: news_modify
  },
  {
    path: '/activity/activityuser',
    name: 'activityuser',
    component: activityuser
  },
  {
    path: '/serve/modify',
    name: 'serve_modify',
    component: serve_modify
  },
  {
    path: '/produce/add',
    name: 'produce_new',
    component: produce_new
  },
  {
    path: '/produce/modify',
    name: 'produce_modify',
    component: produce_modify
  },
  {
    path: '/broadcast/add',
    name: 'broadcast_new',
    component: broadcast_new
  },
  {
    path: '/broadcast/modify',
    name: 'broadcast_modify',
    component: broadcast_modify
  },
  {
    path: '/store/add',
    name: 'store_new',
    component: store_new
  },
  {
    path: '/store/modify',
    name: 'store_modify',
    component: store_modify
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
