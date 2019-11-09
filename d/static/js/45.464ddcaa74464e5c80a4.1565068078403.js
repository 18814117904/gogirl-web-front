webpackJsonp([45],{"0+1f":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={components:{uploader:e("ofQP").default},name:"storeuser_new",data:function(){return{stores:[],selectStore:"",activity:{name:"",startTime:"",endTime:"",prize:"",conditionUse:"",status:""},hadSave:!1,rules:{name:[{required:!0,message:"请输入用户名称",trigger:"blur"}],startTime:[{required:!0,message:"请选择 开始时间"}],endTime:[{required:!0,message:"请选择 结束时间"}],status:[{required:!0,message:"请选择 状态"}],prize:[{required:!0,message:"请输入活动奖品",trigger:"blur"}],conditionUse:[{required:!0,message:"请输入使用条件",trigger:"blur"}]}}},mounted:function(){},methods:{getUser:function(t){if(5==t)this.activity.conditionUse=["1","2","3","4"];else for(var n=0;n<t.length;n++)if(5==t[n]){t.splice(n,1);break}},save:function(){var t=this;this.activity.startTime;this.$refs.activity.validate(function(n){if(!n)return!1;t.hadSave=!0;var e=t.$axios.create({headers:{"content-type":"application/x-www-form-urlencoded"}}),i=t.$qs.stringify({name:t.activity.name,startTime:t.activity.startTime,endTime:t.activity.endTime,prize:t.activity.prize,conditionUse:t.activity.conditionUse.join(","),status:t.activity.status});e.post(t.$BASE_STORE_URL+"activity/addActivity",i).then(function(t){this.$layer.msg(t.data.message),this.$emit("childClick")}.bind(t))})}}},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{attrs:{id:"updatePi"}},[e("el-form",{ref:"activity",attrs:{model:t.activity,rules:t.rules,"label-width":"100px"}},[e("div",{staticStyle:{"margin-bottom":"5px"}},[e("div",{staticClass:"fixed-table-container bootstrap-table"},[e("table",{staticClass:"table table-hover"},[e("tbody",[e("tr",[e("td",[e("el-form-item",{attrs:{label:"活动名称:",prop:"name"}},[e("span",[e("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入活动名称",required:""},model:{value:t.activity.name,callback:function(n){t.$set(t.activity,"name",n)},expression:"activity.name"}})],1)])],1),t._v(" "),e("td",[e("el-form-item",{attrs:{label:"活动奖品:",prop:"prize"}},[e("span",[e("el-input",{staticStyle:{"max-width":"100%"},attrs:{placeholder:"请输入 活动奖品"},model:{value:t.activity.prize,callback:function(n){t.$set(t.activity,"prize",n)},expression:"activity.prize"}})],1)])],1)]),t._v(" "),e("tr",[e("td",[e("el-form-item",{attrs:{label:"开始时间:",prop:"startTime"}},[e("span",[e("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择开始日期时间"},model:{value:t.activity.startTime,callback:function(n){t.$set(t.activity,"startTime",n)},expression:"activity.startTime"}})],1)])],1),t._v(" "),e("td",[e("el-form-item",{attrs:{label:"结束时间:",prop:"endTime"}},[e("span",[e("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择结束日期时间"},model:{value:t.activity.endTime,callback:function(n){t.$set(t.activity,"endTime",n)},expression:"activity.endTime"}})],1)])],1)]),t._v(" "),e("tr",[e("td",[e("el-form-item",{attrs:{label:"活动对象:",prop:"conditionUse"}},[e("span",[e("el-select",{staticStyle:{"max-width":"100%"},attrs:{filterable:"",multiple:"",placeholder:"请选择 活动对象"},on:{change:function(n){t.getUser(t.activity.conditionUse)}},model:{value:t.activity.conditionUse,callback:function(n){t.$set(t.activity,"conditionUse",n)},expression:"activity.conditionUse"}},[e("el-option",{attrs:{label:"所有用户",value:"5"}}),t._v(" "),e("el-option",{attrs:{label:"客户",value:"1"}}),t._v(" "),e("el-option",{attrs:{label:"会员",value:"2"}}),t._v(" "),e("el-option",{attrs:{label:"微信用户",value:"3"}}),t._v(" "),e("el-option",{attrs:{label:"公众号粉丝",value:"4"}})],1)],1)])],1),t._v(" "),e("td",[e("el-form-item",{attrs:{label:"活动状态:",prop:"status"}},[e("span",[e("el-select",{staticStyle:{"max-width":"100%"},attrs:{filterable:"",placeholder:"请选择 活动状态"},model:{value:t.activity.status,callback:function(n){t.$set(t.activity,"status",n)},expression:"activity.status"}},[e("el-option",{attrs:{label:"开启",value:"1"}}),t._v(" "),e("el-option",{attrs:{label:"关闭",value:"2"}})],1)],1)])],1)]),t._v(" "),e("tr",[e("td"),e("td"),e("td"),e("td")])])])])])])],1),t._v(" "),e("div",{staticStyle:{margin:"10px auto"}},[e("div",{staticStyle:{margin:"0 auto",width:"20%"}},[e("el-button",{attrs:{type:"primary",plain:"",disabled:t.hadSave},on:{click:t.save}},[t._v("保存")])],1)])])};a._withStripped=!0;var s={render:a,staticRenderFns:[]},r=s;var l=!1;var o=e("VU/8")(i,r,!1,function(t){l||e("EinV")},"data-v-457aefdd",null);o.options.__file="src\\components\\activity\\activity_new.vue";n.default=o.exports},EinV:function(t,n,e){var i=e("xAzh");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("3b5b4144",i,!1,{})},xAzh:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"activity_new.vue",sourceRoot:""}])}});
//# sourceMappingURL=45.464ddcaa74464e5c80a4.1565068078403.js.map