webpackJsonp([21],{"+iLZ":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{attrs:{id:"updatePi"}},[t("el-form",{ref:"skuPurchase",staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"},attrs:{model:e.skuPurchase,rules:e.rules,"label-width":"100px",width:"35%"}},[null!=e.depName&&""!=e.depName?t("el-form-item",{attrs:{label:"选择:",prop:"type"}},[t("el-radio",{attrs:{label:1},nativeOn:{click:function(n){n.preventDefault(),e.change(1)}},model:{value:e.skuPurchase.type,callback:function(n){e.$set(e.skuPurchase,"type",n)},expression:"skuPurchase.type"}},[e._v("入库")]),e._v(" "),t("el-radio",{attrs:{label:2},nativeOn:{click:function(n){n.preventDefault(),e.change(2)}},model:{value:e.skuPurchase.type,callback:function(n){e.$set(e.skuPurchase,"type",n)},expression:"skuPurchase.type"}},[e._v("出库")])],1):e._e(),e._v(" "),t("div",{ref:"quantityRef",staticStyle:{display:"block"}},[t("el-form-item",{attrs:{label:"入库数量:",prop:"quantity"}},[t("el-input",{attrs:{placeholder:"请输入 入库数量",required:""},model:{value:e.skuPurchase.quantity,callback:function(n){e.$set(e.skuPurchase,"quantity",n)},expression:"skuPurchase.quantity"}})],1)],1),e._v(" "),t("el-form-item",[t("el-button",{staticStyle:{"margin-top":"18px"},attrs:{type:"primary",plain:"",disabled:e.hadSave},on:{click:e.save}},[e._v("提交")])],1)],1)],1)])};s._withStripped=!0;var a={render:s,staticRenderFns:[]},i=a;var r=!1;var u=t("VU/8")({components:{},name:"purchase_finish",props:["attr","modifyQuantity","depName"],data:function(){return{skuPurchase:{type:1,quantity:0},hadSave:!1,addVisible:!1,rules:{type:[{required:!0,message:"请输入类型",trigger:"blur"}],quantity:[{required:!0,message:"请输入采购数量",trigger:"blur"}]}}},mounted:function(){this.skuPurchase.quantity=this.modifyQuantity},methods:{save:function(){var e=this;this.$refs.skuPurchase.validate(function(n){if(!n)return!1;var t=e.$axios.create({headers:{"content-type":"application/x-www-form-urlencoded"}}),s=e.$qs.stringify({id:e.attr,stockNum:e.skuPurchase.quantity,stockType:e.skuPurchase.type});t.post(e.$BASE_PURCHASE_URL+"order/updatePurchaseSuccess",s).then(function(e){this.$layer.msg(e.data.message),this.$emit("childClick")}.bind(e))})},change:function(e){this.skuPurchase.type=e,1==this.skuPurchase.type?this.$refs.quantityRef.style.display="block":2==this.skuPurchase.type&&(this.$refs.quantityRef.style.display="none")}}},i,!1,function(e){r||t("p2lg")},"data-v-e30678b4",null);u.options.__file="src\\components\\purchase\\purchase_finish.vue";n.default=u.exports},"09FQ":function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"purchase_finish.vue",sourceRoot:""}])},p2lg:function(e,n,t){var s=t("09FQ");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);t("rjj0")("aaf7fb8a",s,!1,{})}});
//# sourceMappingURL=21.a7824a01bfad234bd145.1565145539402.js.map