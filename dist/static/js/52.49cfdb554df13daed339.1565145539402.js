webpackJsonp([52],{"h9/j":function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"serve_detail.vue",sourceRoot:""}])},j6mj:function(t,n,e){var s=e("h9/j");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("42c92324",s,!1,{})},to9Y:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("body",{},[e("div",{staticClass:"wrapper wrapper-content"},[e("div",{staticClass:"ibox-content m-b-sm  border-bottom"},[e("h4",[t._v("基础信息")]),t._v(" "),e("table",{staticClass:"table table-bordered"},[e("tbody",[e("tr",[t._m(0),t._v(" "),e("td",[e("span",[t._v(t._s(t.serve.id))])]),t._v(" "),t._m(1),t._v(" "),e("td",[e("span",[t._v(t._s(t.serve.type))])]),t._v(" "),t._m(2),t._v(" "),e("td",[e("span",[t._v(t._s(t.serve.label))])])]),t._v(" "),e("tr",[t._m(3),t._v(" "),e("td",[e("span",[t._v(t._s(t.serve.shopSort))])]),t._v(" "),t._m(4),t._v(" "),e("td",[e("span",{domProps:{innerHTML:t._s(t.serve.status)}})])])])])])])])};s._withStripped=!0;var r={render:s,staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("td",{staticClass:"text-right"},[n("label",[this._v(" 服务编号：")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("td",{staticClass:"text-right"},[n("label",[this._v("分类：")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("td",{staticClass:"text-right"},[n("label",[this._v("标签：")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("td",{staticClass:"text-right"},[n("label",[this._v(" 网店排序：")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("td",{staticClass:"text-right"},[n("label",[this._v("状态：")])])}]},a=r;var i=!1;var l=e("VU/8")({name:"serve_detail",data:function(){return{serveId:this.$parent.nodetail,serve:{id:0,type:"",label:"",shopSort:"",picturePath:"",status:""}}},mounted:function(){this.getServeDetail()},methods:{getServeDetail:function(){this.$axios.create({}).get(this.$BASE_URL+"serve/queryServeForDetail",{params:{id:this.serveId}}).then(function(t){this.serve=t.data,0==t.data.status?this.serve.status='<span style="color:red">关闭</span>':1==t.data.status&&(this.serve.status='<span style="color:green">开启</span>')}.bind(this))}}},a,!1,function(t){i||e("j6mj")},"data-v-218b701e",null);l.options.__file="src\\components\\serve\\serve_detail.vue";n.default=l.exports}});
//# sourceMappingURL=52.49cfdb554df13daed339.1565145539402.js.map