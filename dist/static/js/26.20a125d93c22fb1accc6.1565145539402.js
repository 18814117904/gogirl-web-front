webpackJsonp([26],{"/G6R":function(e,t,n){var a=n("lKvp");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("c1f7fa96",a,!1,{})},lKvp:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"stock_purchase.vue",sourceRoot:""}])},pLS8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("FLOX"),r={components:{},name:"stock_purchase",props:["attr","attrName"],data:function(){return{skuPurchase:{attrName:"",quantity:0,createRemark:""},hadSave:!1,addVisible:!1,rules:{attrName:[{required:!0,message:"请输入类型",trigger:"blur"}],quantity:[{required:!0,message:"请输入采购数量",trigger:"blur"}]}}},mounted:function(){this.skuPurchase.attrName=this.attrName},methods:{save:function(){var e=this;this.$refs.skuPurchase.validate(function(t){if(!t)return!1;var n=e.$axios.create({headers:{"content-type":"application/x-www-form-urlencoded"}}),r=e.$qs.stringify({sku:e.attr,quantity:e.skuPurchase.quantity,createRemark:e.skuPurchase.createRemark,departmentId:JSON.parse(Object(a.b)()).departmentId,creater:JSON.parse(Object(a.b)()).id});n.post(e.$BASE_PURCHASE_URL+"order/insert",r).then(function(e){this.$layer.msg(e.data.message),this.$emit("purchaseChildClick")}.bind(e))})}}},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{attrs:{id:"updatePi"}},[n("el-form",{ref:"skuPurchase",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"},attrs:{model:e.skuPurchase,rules:e.rules,"label-width":"100px",width:"35%"}},[n("el-form-item",{attrs:{label:"商品名称:",prop:"attrName"}},[n("el-input",{attrs:{placeholder:"请输入 商品名称",required:"",disabled:!0},model:{value:e.skuPurchase.attrName,callback:function(t){e.$set(e.skuPurchase,"attrName",t)},expression:"skuPurchase.attrName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"采购数量:",prop:"quantity"}},[n("el-input",{attrs:{placeholder:"请输入 采购数量",required:""},model:{value:e.skuPurchase.quantity,callback:function(t){e.$set(e.skuPurchase,"quantity",t)},expression:"skuPurchase.quantity"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"采购备注:",prop:"createRemark"}},[n("el-input",{attrs:{placeholder:"请输入 采购备注",required:""},model:{value:e.skuPurchase.createRemark,callback:function(t){e.$set(e.skuPurchase,"createRemark",t)},expression:"skuPurchase.createRemark"}})],1),e._v(" "),n("el-form-itam",[n("el-button",{staticStyle:{"margin-top":"18px"},attrs:{type:"primary",plain:"",disabled:e.hadSave},on:{click:e.save}},[e._v("采购")])],1)],1)],1)])};s._withStripped=!0;var i={render:s,staticRenderFns:[]},u=i;var c=!1;var l=n("VU/8")(r,u,!1,function(e){c||n("/G6R")},"data-v-d2447900",null);l.options.__file="src\\components\\stock\\stock_purchase.vue";t.default=l.exports}});
//# sourceMappingURL=26.20a125d93c22fb1accc6.1565145539402.js.map