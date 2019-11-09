/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'development') {
  
    baseUrl = 'http://192.168.2.104:8084/gogirl-order/';
    
	routerMode = 'hash'
}else{
   // baseUrl = 'http://192.168.2.104:8084/gogirl-order/';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}
