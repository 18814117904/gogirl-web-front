webpackJsonp([22],{OQ8z:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{attrs:{id:"updatePi"}},[t("el-form",{ref:"purchaseSku",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"},attrs:{model:e.purchaseSku,rules:e.rules,"label-width":"100px",width:"35%"}},[t("el-form-item",{attrs:{label:"商品名称:",prop:"attrName"}},[t("el-input",{attrs:{placeholder:"请输入 商品名称",required:"",disabled:!0},model:{value:e.purchaseSku.attrName,callback:function(n){e.$set(e.purchaseSku,"attrName",n)},expression:"purchaseSku.attrName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"关联sku:",prop:"sku"}},[t("el-input",{attrs:{placeholder:"请输入 sku",required:""},model:{value:e.purchaseSku.sku,callback:function(n){e.$set(e.purchaseSku,"sku",n)},expression:"purchaseSku.sku"}})],1),e._v(" "),t("el-form-itam",[t("el-button",{staticStyle:{"margin-top":"18px"},attrs:{type:"primary",plain:"",disabled:e.hadSave},on:{click:e.save}},[e._v("关联")])],1)],1)],1)])};r._withStripped=!0;var a={render:r,staticRenderFns:[]},s=a;var u=!1;var i=t("VU/8")({components:{},name:"purchase_sku",props:["attr","orderName"],data:function(){return{purchaseSku:{attrName:"",sku:""},hadSave:!1,addVisible:!1,rules:{attrName:[{required:!0,message:"请输入类型",trigger:"blur"}],sku:[{required:!0,message:"请输入关联sku",trigger:"blur"}]}}},computed:function(){},mounted:function(){this.purchaseSku.attrName=this.orderName},methods:{save:function(){var e=this;this.$refs.purchaseSku.validate(function(n){if(!n)return!1;var t=e.$axios.create({headers:{"content-type":"application/x-www-form-urlencoded"}}),r=e.$qs.stringify({id:e.attr,sku:e.purchaseSku.sku});t.post(e.$BASE_PURCHASE_URL+"order/linkSku",r).then(function(e){this.$layer.msg(e.data.message),this.$emit("relationChildClick")}.bind(e))})}}},s,!1,function(e){u||t("rh6m")},"data-v-e29265cc",null);i.options.__file="src\\components\\purchase\\purchase_sku.vue";n.default=i.exports},S6md:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"purchase_sku.vue",sourceRoot:""}])},rh6m:function(e,n,t){var r=t("S6md");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("f5b4d576",r,!1,{})}});
//# sourceMappingURL=22.d8f304ae9b22a72caa63.1565145539402.js.map