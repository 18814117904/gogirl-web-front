webpackJsonp([54],{DMqP:function(e,n,t){var a=t("a28J");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("2d474e34",a,!1,{})},a28J:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"sku_purchase.vue",sourceRoot:""}])},oZcA:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("FLOX"),r={components:{},name:"sku_purchase",props:["attr","attrName"],data:function(){return{skuPurchase:{attrName:"",quantity:0,createRemark:""},hadSave:!1,addVisible:!1,rules:{attrName:[{required:!0,message:"请输入类型",trigger:"blur"}],quantity:[{required:!0,message:"请输入采购数量",trigger:"blur"}]}}},computed:function(){},mounted:function(){this.skuPurchase.attrName=this.attrName},methods:{save:function(){var e=this;this.$refs.skuPurchase.validate(function(n){if(!n)return!1;var t=e.$axios.create({headers:{"content-type":"application/x-www-form-urlencoded"}}),r=e.$qs.stringify({sku:e.attr,quantity:e.skuPurchase.quantity,creater:JSON.parse(Object(a.b)()).id,createRemark:e.skuPurchase.createRemark,departmentId:JSON.parse(Object(a.b)()).departmentId});t.post(e.$BASE_PURCHASE_URL+"order/insert",r).then(function(e){this.$layer.msg(e.data.message),this.$emit("purchaseChildClick")}.bind(e))})}}},s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{attrs:{id:"updatePi"}},[t("el-form",{ref:"skuPurchase",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"},attrs:{model:e.skuPurchase,rules:e.rules,"label-width":"100px",width:"35%"}},[t("el-form-item",{attrs:{label:"商品名称:",prop:"attrName"}},[t("el-input",{attrs:{placeholder:"请输入 商品名称",required:"",disabled:!0},model:{value:e.skuPurchase.attrName,callback:function(n){e.$set(e.skuPurchase,"attrName",n)},expression:"skuPurchase.attrName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"采购数量:",prop:"quantity"}},[t("el-input",{attrs:{placeholder:"请输入 采购数量",required:""},model:{value:e.skuPurchase.quantity,callback:function(n){e.$set(e.skuPurchase,"quantity",n)},expression:"skuPurchase.quantity"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"采购备注:",prop:"createRemark"}},[t("el-input",{attrs:{placeholder:"请输入 采购备注",required:""},model:{value:e.skuPurchase.createRemark,callback:function(n){e.$set(e.skuPurchase,"createRemark",n)},expression:"skuPurchase.createRemark"}})],1),e._v(" "),t("el-form-item",[t("el-button",{staticStyle:{"margin-top":"18px"},attrs:{type:"primary",plain:"",disabled:e.hadSave},on:{click:e.save}},[e._v("采购")])],1)],1)],1)])};s._withStripped=!0;var u={render:s,staticRenderFns:[]},i=u;var c=!1;var l=t("VU/8")(r,i,!1,function(e){c||t("DMqP")},"data-v-083dbf32",null);l.options.__file="src\\components\\sku\\sku_purchase.vue";n.default=l.exports}});
//# sourceMappingURL=54.872111f39b55c3ae2d51.1565068078403.js.map