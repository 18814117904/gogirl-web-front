webpackJsonp([36],{"25p3":function(e,n,t){var a=t("WlLz");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("2e7b5a23",a,!1,{})},WlLz:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"supplier_new.vue",sourceRoot:""}])},a50Z:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={components:{uploader:t("ofQP").default},name:"storeuser_new",props:["attr"],data:function(){return{supplier:{id:"",supplierName:"",largeType:"",smallType:"",contactName:"",phone:"",address:"",status:"",remark:""},hadSave:!1,rules:{supplierName:[{required:!0,message:"请输入供应商称",trigger:"blur"}],contactName:[{required:!0,message:"请输入联系人"}],phone:[{required:!0,message:"请输入联系电话"}],address:[{required:!0,message:"请输入联系地址",trigger:"blur"}],largeType:[{required:!0,message:"请输入主营大类",trigger:"blur"}],smallType:[{required:!0,message:"请输入细分",trigger:"blur"}],status:[{required:!0,message:"请选择 状态",trigger:"blur"}]}}},mounted:function(){},methods:{save:function(){var e=this;this.$refs.supplier.validate(function(n){if(!n)return!1;e.hadSave=!0;var t=e.$axios.create({headers:{"content-type":"application/x-www-form-urlencoded"}}),a=e.$qs.stringify({supplierName:e.supplier.supplierName,contactName:e.supplier.contactName,phone:e.supplier.phone,address:e.supplier.address,largeType:e.supplier.largeType,smallType:e.supplier.smallType,status:e.supplier.status});t.post(e.$BASE_PURCHASE_URL+"supplier/insert",a).then(function(e){this.$layer.msg(e.data.message),this.$emit("addChildClick")}.bind(e))})}}},s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{attrs:{id:"updatePi"}},[t("el-form",{ref:"supplier",attrs:{model:e.supplier,rules:e.rules,"label-width":"100px"}},[t("div",{staticStyle:{"margin-bottom":"5px"}},[t("div",{staticClass:"fixed-table-container bootstrap-table"},[t("table",{staticClass:"table table-hover"},[t("tbody",[t("tr",[t("td",[t("el-form-item",{attrs:{label:"供应商名称:",prop:"supplierName"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入供应商名称",required:""},model:{value:e.supplier.supplierName,callback:function(n){e.$set(e.supplier,"supplierName",n)},expression:"supplier.supplierName"}})],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"联系人:",prop:"contactName"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 联系人"},model:{value:e.supplier.contactName,callback:function(n){e.$set(e.supplier,"contactName",n)},expression:"supplier.contactName"}})],1)])],1)]),e._v(" "),t("tr",[t("td",[t("el-form-item",{attrs:{label:"联系电话:",prop:"phone"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 联系电话"},model:{value:e.supplier.phone,callback:function(n){e.$set(e.supplier,"phone",n)},expression:"supplier.phone"}})],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"联系地址:",prop:"address"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 联系地址"},model:{value:e.supplier.address,callback:function(n){e.$set(e.supplier,"address",n)},expression:"supplier.address"}})],1)])],1)]),e._v(" "),t("tr",[t("td",[t("el-form-item",{attrs:{label:"主营大类:",prop:"largeType"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 主营大类"},model:{value:e.supplier.largeType,callback:function(n){e.$set(e.supplier,"largeType",n)},expression:"supplier.largeType"}})],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"细分:",prop:"smallType"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 细分"},model:{value:e.supplier.smallType,callback:function(n){e.$set(e.supplier,"smallType",n)},expression:"supplier.smallType"}})],1)])],1)]),e._v(" "),t("tr",[t("td",[t("el-form-item",{attrs:{label:"状态:",prop:"status"}},[t("span",[t("el-select",{staticStyle:{"max-width":"100%"},attrs:{filterable:"",placeholder:"请选择 状态"},model:{value:e.supplier.status,callback:function(n){e.$set(e.supplier,"status",n)},expression:"supplier.status"}},[t("el-option",{attrs:{label:"开启",value:"1"}}),e._v(" "),t("el-option",{attrs:{label:"关闭",value:"2"}})],1)],1)])],1),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td"),t("td"),t("td"),t("td")])])])])])])],1),e._v(" "),t("div",{staticStyle:{margin:"10px auto"}},[t("div",{staticStyle:{margin:"0 auto",width:"20%"}},[t("el-button",{attrs:{type:"primary",plain:"",disabled:e.hadSave},on:{click:e.save}},[e._v("保存")])],1)])])};s._withStripped=!0;var l={render:s,staticRenderFns:[]},r=l;var p=!1;var i=t("VU/8")(a,r,!1,function(e){p||t("25p3")},"data-v-639b947d",null);i.options.__file="src\\components\\supplier\\supplier_new.vue";n.default=i.exports}});
//# sourceMappingURL=36.6814b958398fbee419c1.1565145539402.js.map