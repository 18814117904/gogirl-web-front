webpackJsonp([46],{bQv6:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={components:{uploader:t("Y69P").default},name:"sku_modify",props:["attr"],data:function(){return{skuTypes:[],purchasSku:{id:"",sku:"",picturePath:"",useType:"",skuType:"",skuName:"",skuTypeName:"",skuModel:"",shopPrice:0,purchasePrice:0,supplier:""},hadSave:!1,picArr:[],addVisible:!1,imageShow:!0,PIC:[],rules:{sku:[{required:!0,message:"请输入sku",trigger:"blur"}],skuModel:[{required:!0,message:"请输入型号",trigger:"blur"}],skuName:[{required:!0,message:"请输入产品名称",trigger:"blur"}],skuType:[{required:!0,message:"请输入类型",trigger:"blur"}],shopPrice:[{required:!0,message:"请输入门店单价",trigger:"blur"}],purchasePrice:[{required:!0,message:"请输入采购单价",trigger:"blur"}],supplier:[{required:!0,message:"请输入供应商",trigger:"blur"}],useType:[{required:!0,message:"请选择标签",trigger:"blur"}]}}},mounted:function(){this.reChooseType(),this.getSkuDetail()},methods:{childByValue:function(e){this.picArr=e,this.imageShow=!1},save:function(){var e=this;this.$refs.purchasSku.validate(function(n){if(!n)return!1;e.hadSave=!0;var t=new FormData;e.picArr.forEach(function(e){t.append("picData",e.file)}),t.append("id",e.attr),t.append("sku",e.purchasSku.sku),t.append("skuType",e.purchasSku.skuType),t.append("skuModel",e.purchasSku.skuModel),t.append("skuName",e.purchasSku.skuName),t.append("shopPrice",e.purchasSku.shopPrice),t.append("purchasePrice",e.purchasSku.purchasePrice),t.append("supplier",e.purchasSku.supplier),t.append("useType",e.purchasSku.useType);var a=new XMLHttpRequest,s=e;a.open("post",s.$BASE_PURCHASE_URL+"sku/update",!0),a.withCredentials=!0,a.crossDomain=!0,a.send(t),a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){var e=JSON.parse(a.responseText);1==e.success?(s.$layer.msg("提交成功！"),s.hadSave=!0,s.$emit("modifyChildClick")):(s.$layer.msg("提交失败！ "+e.message),s.hadSave=!1,s.$emit("modifyChildClick"))}}})},reChooseType:function(){this.$axios.create({}).get(this.$BASE_PURCHASE_URL+"skuType/select",{params:{pageNum:1,pageSize:10}}).then(function(e){this.skuTypes=e.data.data.list}.bind(this))},getSkuDetail:function(){this.$axios.create({}).get(this.$BASE_PURCHASE_URL+"sku/selectByPrimaryKey",{params:{id:this.attr}}).then(function(e){this.purchasSku=e.data.data,this.PIC=e.data.data.picturePath.split(",")}.bind(this))}}},s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{attrs:{id:"updatePi"}},[t("el-form",{ref:"purchasSku",attrs:{model:e.purchasSku,rules:e.rules,"label-width":"100px"}},[t("div",{staticStyle:{"margin-bottom":"5px"}},[t("div",{staticClass:"fixed-table-container bootstrap-table"},[t("table",{staticClass:"table table-hover"},[t("tbody",[t("tr",[t("td",[t("el-form-item",{attrs:{label:"sku:",prop:"sku"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 sku",required:""},model:{value:e.purchasSku.sku,callback:function(n){e.$set(e.purchasSku,"sku",n)},expression:"purchasSku.sku"}})],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"型号:",prop:"skuModel"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 型号"},model:{value:e.purchasSku.skuModel,callback:function(n){e.$set(e.purchasSku,"skuModel",n)},expression:"purchasSku.skuModel"}})],1)])],1)]),e._v(" "),t("tr",[t("td",[t("el-form-item",{attrs:{label:"门店单价:",prop:"shopPrice"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 门店单价",required:""},model:{value:e.purchasSku.shopPrice,callback:function(n){e.$set(e.purchasSku,"shopPrice",n)},expression:"purchasSku.shopPrice"}})],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"采购单价:",prop:"purchasePrice"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 采购单价"},model:{value:e.purchasSku.purchasePrice,callback:function(n){e.$set(e.purchasSku,"purchasePrice",n)},expression:"purchasSku.purchasePrice"}})],1)])],1)]),e._v(" "),t("tr",[t("td",[t("el-form-item",{attrs:{label:"标签:",prop:"useType"}},[t("span",[t("el-select",{staticStyle:{"max-width":"100%"},attrs:{filterable:"",placeholder:"请选择 标签"},model:{value:e.purchasSku.useType,callback:function(n){e.$set(e.purchasSku,"useType",n)},expression:"purchasSku.useType"}},[t("el-option",{attrs:{label:"店用产品",value:1}}),e._v(" "),t("el-option",{attrs:{label:"售卖商品",value:2}})],1)],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"类型:",prop:"skuType"}},[t("span",[t("el-select",{staticStyle:{"max-width":"100%"},attrs:{filterable:"",placeholder:"请选择 类型"},on:{change:e.reChooseType},model:{value:e.purchasSku.skuType,callback:function(n){e.$set(e.purchasSku,"skuType",n)},expression:"purchasSku.skuType"}},e._l(e.skuTypes,function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)])],1)]),e._v(" "),t("tr",[t("td",[t("el-form-item",{attrs:{label:"产品名称:",prop:"skuName"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 产品名称"},model:{value:e.purchasSku.skuName,callback:function(n){e.$set(e.purchasSku,"skuName",n)},expression:"purchasSku.skuName"}})],1)])],1),e._v(" "),t("td",[t("el-form-item",{attrs:{label:"供应商:",prop:"supplier"}},[t("span",[t("el-input",{staticStyle:{"max-width":"100%"},attrs:{type:"textarea",placeholder:"请输入 供应商",autosize:{minRows:2,maxRows:4},required:""},model:{value:e.purchasSku.supplier,callback:function(n){e.$set(e.purchasSku,"supplier",n)},expression:"purchasSku.supplier"}})],1)])],1)]),e._v(" "),t("tr",[t("td",{attrs:{colspan:"4"}},[t("span",{staticStyle:{color:"red"}},[e._v("图片：")])])]),e._v(" "),t("tr",[t("td",{attrs:{colspan:"4"}},[t("span",[t("div",{staticStyle:{float:"left"}},e._l(e.PIC,function(n){return""!=e.PIC&&1==e.imageShow?t("span",[t("el-popover",{attrs:{trigger:"hover",placement:"right",width:"600"}},[t("img",{staticStyle:{"max-width":"100%",height:"auto"},attrs:{src:e.$BASE_PICTUREPATH_URL+n}}),e._v(" "),t("img",{staticStyle:{height:"80px",width:"80px"},attrs:{slot:"reference",src:e.$BASE_PICTUREPATH_URL+n},slot:"reference"})])],1):e._e()})),e._v(" "),t("uploader",{on:{childByValue:e.childByValue}})],1)])]),e._v(" "),t("tr",[t("td"),t("td"),t("td"),t("td")])])])])])])],1),e._v(" "),t("div",{staticStyle:{margin:"10px auto"}},[t("div",{staticStyle:{margin:"0 auto",width:"20%"}},[t("el-button",{attrs:{type:"primary",plain:"",disabled:e.hadSave},on:{click:e.save}},[e._v("保存")])],1)])])};s._withStripped=!0;var r={render:s,staticRenderFns:[]},u=r;var i=!1;var p=t("VU/8")(a,u,!1,function(e){i||t("xVi/")},"data-v-43863eaa",null);p.options.__file="src\\components\\sku\\sku_modify.vue";n.default=p.exports},"xVi/":function(e,n,t){var a=t("xaQ3");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("ffffcfda",a,!1,{})},xaQ3:function(e,n,t){(e.exports=t("FZ+f")(!0)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"sku_modify.vue",sourceRoot:""}])}});
//# sourceMappingURL=46.54e82b0a95c87367d2fd.1565145539402.js.map