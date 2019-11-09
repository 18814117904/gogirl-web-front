<template>
  <el-form class="record">
    <el-form-item label="确定款式时间" :label-width="labelWidth">
      <el-input placeholder="请填写时间" v-model="recordForm.fixHour"></el-input>
    </el-form-item>
    <el-form-item label="服务是否超时" :label-width="labelWidth">
      <el-radio-group v-model="recordForm.isTimeOut">
        <el-radio name="sure" :label="1" :value="1">是</el-radio>
        <el-radio name="sure" :label="2" :value="2">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="超时原因" :label-width="labelWidth">
      <el-input placeholder="请填写超时原因" v-model="recordForm.linkCause"></el-input>
    </el-form-item>
    <el-form-item label="用户反馈" :label-width="labelWidth">
      <el-input placeholder="请填写用户反馈内容" v-model="recordForm.userFeedback"></el-input>
    </el-form-item>
    <el-form-item label="美甲师反馈" :label-width="labelWidth">
      <el-input placeholder="请填写美甲师反馈内容" v-model="recordForm.technicianFeedback"></el-input>
    </el-form-item>
    <el-form-item label="客照" :label-width="labelWidth">
      <orderUploader
        v-on:childByValue="childByValue"
        v-on:changePic="changePic"
        :index="actIndex"
        :picData="orderUpDatePic"
      ></orderUploader>
    </el-form-item>
    <el-form-item label="存在问题" :label-width="labelWidth">
      <el-input placeholder="请填写存在问题" v-model="recordForm.existingProblems"></el-input>
    </el-form-item>
    <el-form-item label="解决方案" :label-width="labelWidth">
      <el-input placeholder="请给出解决方案" v-model="recordForm.solution"></el-input>
    </el-form-item>
    <el-form-item label="售后反馈" :label-width="labelWidth">
      <el-input placeholder="请填写售后反馈" v-model="recordForm.afterSaleFeedback"></el-input>
    </el-form-item>
    <el-button class="btn-blue save" @click="SaveTypeNode()">保存</el-button>
  </el-form>
</template>

<script>
import config from "./../../config/config";
import { getBase64 } from "./../../config/mUtils";
import orderUploader from "../../components/common/orderUploader";
export default {
  props: {
    recordForm: Object,
    orderServeId: Number,
    actIndex: Number,
    orderUpDatePic: Array,
  },
  components: {
    orderUploader,
  },
  data() {
    return {
      labelWidth: '120px', // 表单label宽度
      picturePath: [],
      // 封面图index
      picIndex: 0,
      newPic: false,
    };
  },
  methods: {
    //获取子组件图片信息
    childByValue(val) {
      this.orderUpDatePic = [];
      this.picturePath = val;
    },
    // 保存设置为封面的图片的下标，并标志是否为修改
    changePic(val, newPic) {
      this.picIndex = val;
      this.newPic = newPic ? true : false;
    },
    // 保存款式记录表
    SaveTypeNode() {
      var that = this;
      const loading = this.$loading({
        lock: true,
        text: '上传中， 请耐心等待...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const formData = new FormData();
      if (this.picturePath.length > 0) {
        //有上传图片
        var temp = that.picturePath;
      } else {
        //没有上传图片
        var temp = that.orderUpDatePic;
      }
      temp.forEach(item => {
        if (item.hasOwnProperty("size")) {
          formData.append("formData", item.file);
        } else {
          formData.append("updatePic", item.file);
        }
      });
      formData.append( "fixHour", this.recordForm.fixHour || '');
      formData.append( "isTimeOut", this.recordForm.isTimeOut || '');
      formData.append( "linkCause", this.recordForm.linkCause || '');
      formData.append( "userFeedback", this.recordForm.userFeedback || '');
      formData.append( "technicianFeedback", this.recordForm.technicianFeedback || '');
      formData.append( "existingProblems", this.recordForm.existingProblems || '');
      formData.append( "solution", this.recordForm.solution || '');
      formData.append( "afterSaleFeedback", this.recordForm.afterSaleFeedback || '');
      formData.append(
        "pickNum",
        (this.newPic
          ? this.picIndex + this.orderUpDatePic.length
          : this.picIndex) + 1
      );
      // formData.append("serveType", this.listOrderServer[this.Index].serve.type);
      formData.append( "orderServeId", this.orderServeId );
      formData.append("orderId", this.$route.query.orderId);
      //步骤一:创建异步对象
      var ajax = new XMLHttpRequest();
      //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
      ajax.open(
        "post",
        config.order + "orderrecord/addOrUpdateOrderRecord",
        true
      );
      ajax.withCredentials = true;
      ajax.crossservice = true;
      //步骤三:发送请求
      ajax.send(formData);
      //步骤四:注册事件 onreadystatechange 状态改变就会调用
      ajax.onreadystatechange = function() {
        loading.close();
        if (ajax.readyState == 4 && ajax.status == 200) {
          var response = JSON.parse(ajax.responseText);
          if (response.success) {
            that.$emit('hideForm');
            that.$message({
              type: "success",
              message: "保存成功"
            });
          } else {
            that.$message({
              type: "error",
              message: "保存失败, 请重新上传"
            });
          }
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.record {
  margin: 0 auto; 
  width: 645px; 
  height: auto; 
  padding: 40px 0 80px;;
  .save {
    float: right;
  }
}
</style>
