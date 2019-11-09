import { asyncRouterMap, constantRouterMap } from '../../router/index';
import Vue from 'vue'
import axios from 'axios'
import {getUserinfo} from '../../vuex/session-storage'
import home from '../../Home'
import purchasedetail from '../../components/purchase/purchase_detail'
import stockdetail from '../../components/stock/stock_detail'
import bespeakDetail from '../../components/schedule/bespeak_detail'
import orderDetail from '../../components/order/orderDetail'
import config from '../../config/config'
// 菜单相关
//const _import = require('../../router/_import_development');

/**
 * 根据远程获取的用户菜单，递归生成路由
 */
function filterAsyncRouter(routerMap = []) {
    var accessedRouters = [];
    var accessedChildren = [];
    var accessdSecond = [];

    routerMap.forEach(function(route) {
        if (route.children && route.children.length) {
          route.children.forEach(function(childrenRoute) {
            var currentChildrenComponent;
            //菜单加载异常的时候，不影响整体使用，尤其是开发环境会遇到
            try {
              currentChildrenComponent = () => import('./../../components/' + childrenRoute.url + '.vue');
            } catch (error) {
              console.log('菜单加载异常====: ' + error)
            }
            accessdSecond.push({
              path:  '' + childrenRoute.url,
              component: currentChildrenComponent,  //() => import('@/components/' + route.url + '.vue')
              name: '' + childrenRoute.keyword,
              //icon: route.icon || 'zujian',
              children: childrenRoute.children,
            });
          }, this)
        //    route.children = filterAsyncRouter(route.children);
        }
        var currentComponent;
            //菜单加载异常的时候，不影响整体使用，尤其是开发环境会遇到
              try {
                currentComponent = () => import('./../../components/' + route.url + '.vue');
              } catch (error) {
                console.log('菜单加载异常====: ' + error)
              }
                accessedChildren.push({
                path:  '' + route.url,
                component: currentComponent,  //() => import('@/components/' + route.url + '.vue')
                name: '' + route.keyword,
                //icon: route.icon || 'zujian',
                children: [],
              });


    }, this);
  accessedChildren = [...accessedChildren,...accessdSecond]
  accessedChildren.push({
    path:  '/purchase/purchasedetail',
    component: purchasedetail,
    name: 'purchasedetail'
  },{
    path: '/stock/stockdetail',
    name: 'stockdetail',
    component: stockdetail
  },{
    path: '/schedule/bespeakDetail',
    name: 'bespeakDetail',
    component: bespeakDetail
  },{
    path: '/order/orderDetail',
    name: 'orderDetail',
    component: orderDetail
  })
    accessedRouters.push({
      path: '/',
      name: 'home',
      component: home,
      redirect: 'login',
      children: accessedChildren
      })
    return accessedRouters;
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }) {
            return new Promise((resolve, reject) => {
              //JSON.stringify()
              const userInfo =  JSON.parse(getUserinfo())
              var getServeTypeAxios = axios.create({})
              getServeTypeAxios.get(config.service+'user/queryMenuByPermission',{
                params: {
                  id: userInfo.id
                }
              }).then(function (response) {
                var accessedRouters = response.data.data;
                accessedRouters = filterAsyncRouter(accessedRouters).concat(asyncRouterMap);
                commit('SET_ROUTERS', accessedRouters);
                resolve()
              }.bind(this)).catch(error => {
                reject(error)
              })




                /*SystemApi.system.basic.userMenu({}).then(response => {
                    // 如果用户未登陆，直接返回不生成路由表
                    if (response.data.code == 101003) {
                        resolve();
                    }
                    var accessedRouters = response.data.data;
                    accessedRouters = filterAsyncRouter(accessedRouters).concat(asyncRouterMap);
                    commit('SET_ROUTERS', accessedRouters);
                    resolve();
                }).catch(error => {
                    reject(error);
                });*/
            });
        }
    }
};

export default permission;
