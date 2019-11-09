'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
BASE_PICTUREPATH_URL :  '"http://qn.begogirls.com/"', //本地环境
BASE_PATH :       '"http://192.168.1.2:8092/gogirl_xcx/"', //本地环境
BASE_USER_URL :   '"http://192.168.1.2:8092/gogirl_xcx/"',  //本地环境gogirl_user
BASE_URL :        '"http://192.168.1.2:8092/gogirl_xcx/"',  //本地环境service
BASE_STORE_URL :  '"http://192.168.1.2:8092/gogirl_xcx/"',  //本地环境store
BASE_ORDER_URL :  '"http://192.168.1.2:8092/gogirl_xcx/"', //本地环境order
BASE_PURCHASE_URL: '"http://192.168.1.2:8092/gogirl_xcx/"', //本地环境gogirl_purchase
 domaIn:'"http://192.168.1.2:8092/gogirl_xcx/"',
//84
 order:'"http://192.168.1.2:8092/gogirl_xcx/"',
//82
 service:'"http://192.168.1.2:8092/gogirl_xcx/"',
//83
 technician:'"http://192.168.1.2:8092/gogirl_xcx/"',
//81
 store:'"http://192.168.1.2:8092/gogirl_xcx/"',
//志辉
 user:'"http://192.168.1.2:8092/gogirl_xcx/"',
//导出订单专用链接
 order2:'"http://192.168.1.2:8092/gogirl_xcx/"',
// websocket链接，尹勇本地
ws_url:'"ws://192.168.1.2:8092/gogirl_xcx/"',
//采购系统地址(开发环境)
 purchase:'"http://192.168.1.2:8092/gogirl_xcx/"',
sys_url:'"/"'
})
