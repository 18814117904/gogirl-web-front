<template>
  <div>
    <div id="updatePi">
      <el-form :model="stores" :rules="rules" ref="stores" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <h3 style="margin-top:20px;">新增店铺</h3>
            <table class="table table-hover">
              <tbody>
              <tr>
                <td colspan="2" >
                  <span style="color: rgb(255, 0, 0);">选择logo:</span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div>
                    已选择logo: <span v-for="pic in PIC"><img style="height: 30px; width: 30px;" :src="$BASE_PICTUREPATH_URL+pic" /></span><i class="el-icon-plus avatar-uploader-icon"  style="font-size: 25px;margin-left: 5px;margin-top: 5px;"  @click="UpDate"></i>
                  </div>
                </td>
              </tr>

              <tr>
                <td >
                  <el-form-item label="店铺地址:" prop="address" >
                <span>
              <el-input placeholder="请输入店铺地址" @change="handleChange" required v-model="stores.address" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td >
                  <el-form-item label="客服电话:" prop="customerServiceTelphone" >
                <span>
              <el-input placeholder="请输入客服电话" required v-model="stores.customerServiceTelphone" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td >
                  <el-form-item label="店铺经度:" prop="longitude" >
                <span>
              <el-input placeholder="请输入店铺经度" required v-model.number="stores.longitude" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="店铺纬度:" prop="latitude">
                <span>
                 <el-input placeholder="请输入 店铺纬度" v-model.number="stores.latitude" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td >
                  <el-form-item label="店铺名称:" prop="name" >
                <span>
              <el-input placeholder="请输入店铺名称" required v-model="stores.name" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="店铺店长:" prop="master">
                <span>
                 <el-input placeholder="请输入 店铺店长" v-model="stores.master" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <!--<tr>
                <td >
                  <el-form-item label="客服电话:" prop="customerServiceTelphone" >
                <span>
              <el-input placeholder="请输入客服电话" required v-model="stores.customerServiceTelphone" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td></td>
                <td>
                  <el-form-item label="营业天数:" prop="businessDay">
                <span>
                 <el-input placeholder="请输入 营业天数" v-model="stores.businessDay" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>-->

              <!--<tr>
                <td >
                  <el-form-item label="联系电话:" prop="contactTelphone" >
                <span>
              <el-input placeholder="请输入联系电话" required v-model="stores.contactTelphone" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系人:" prop="contactName">
                <span>
                 <el-input placeholder="请输入 联系人" v-model="stores.contactName" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>-->

              <!--<tr>
                <td >
                  <el-form-item label="开始时间:" prop="businessStartTime" >
                <span>
                  <el-time-picker v-model="stores.businessStartTime" type="time" placeholder="请输入 营业开始时间" value-format="HH:mm:ss" format="HH:mm:ss" style="width:100%"></el-time-picker>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="结束时间:" prop="businessEndTime">
                <span>
                  <el-time-picker v-model="stores.businessEndTime" type="time" placeholder="请输入 营业结束时间" format="HH:mm:ss" value-format="HH:mm:ss" style="width:100%"></el-time-picker>
                </span>
                  </el-form-item>
                </td>
              </tr>-->

              <tr>
                <td colspan="2">
                  <el-form-item label="备注:" prop="remark" >
                    <textarea id="serveRemark" class="form-control" v-model="stores.remark" style="max-width: 100%;"></textarea>
                  </el-form-item>
                </td>
              </tr>
              <tr><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-form>

      <!--弹框选择图片筛选图片弹框-->
      <div class="tan" v-dialogDrag>
        <el-dialog title="添加图片" :visible.sync="addVisible" width="90%" style=" z-index: 10000;" center>
          <selectimage v-on:childByValue="childByValue" v-on:childClick="childClick"></selectimage>
        </el-dialog>
      </div>

      <div class="Tan" v-dialogDrag>
        <el-dialog title="分组上传图片" :visible.sync="UpDatePic" style=" z-index: 10000; width: 100%; height: 90%" center>
          <updatapic></updatapic>
        </el-dialog>
      </div>

    </div>
    <div style="margin: 10px auto">
      <div style="margin: 0 auto;width: 20%">
        <el-button type="primary" plain @click="cancel">返回</el-button>
        <el-button type="primary" plain @click="save" v-bind:disabled="hadSave">保存</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import selectimage from "@/components/imageutils/selectimage";
  import updatapic from "@/components/imageutils/updatapic";
  import "@/components/imageutils/dialogDrag";
  export default {
    name: "broadcast",
    components: {selectimage, updatapic},
    data: function(){
      return {
        stores: {
          storeNo: '',
          name: '',
          longitude: 0,
          latitude: 0,
          address: '',
          master: '',
          employeeNumber: 0,
          customerServiceTelphone: '',
          contactName: '',
          contactTelphone: '',
          remark: '',
          businessDay: 0,
          businessStartTime: '',
          businessEndTime: ''
        },
        storeId: this.$parent.nodetail,
        //筛选图片
        addVisible: false,
        //上传图片
        UpDatePic: false,
        //图片选择显示
        PIC: [],
        rules: {
          name: [{required: true, message: '请输入店铺名称', trigger: 'blur'},
            {min: 3, message: '长度大于3', trigger: 'blur'}],
          address: [{required: true, message: '请输入 店铺地址'},
            {min: 3, message: '长度大于3', trigger: 'blur'}],
          longitude: [{required: true, message: '请输入 经度'},
            {type: 'number', message: '经度必须为数字'}],
          latitude: [{required: true, message: '请输入 纬度'},
            {type: 'number', message: '纬度必须为数字'}],
          /*businessStartTime: [{required: true, message: '请选择开始时间', trigger: 'blur'}],
          businessEndTime: [{required: true, message: '请选择结束时间', trigger: 'blur'}]*/
        },
        hadSave: false
      }
    },
    mounted: function () {
    },
    methods: {
      UpDate() {
        this.addVisible = true
      },
      childByValue(url) {
        // childValue就是子组件传过来的值
        console.log(url)
        if(url.length == 0) {
          this.$message.error('你还没有添加图片');
        } else {
          this.addVisible = false
          this.PIC = url
          this.$message({
            message: '恭喜你，添加图片成功',
            type: 'success'
          });
        }
      },
      //点击令弹框消失
      childClick(data) {
        this.addVisible = false;
        this.UpDatePic = true;
      },
      cancel () {
        this.$router.push({ path: '/store/store_index' })
      },
      handleChange() {
        var getBroadDetailAxios = this.$axios.create({})
        getBroadDetailAxios.get(this.$BASE_STORE_URL + 'shop/getAddress/', {
          params: {
            address: this.stores.address,
          }
        }).then(function (response) {
          if(JSON.parse(response.data.data).status == 0){
            this.stores.longitude = parseFloat(JSON.parse(response.data.data).result.location.lng.toFixed(7));
            this.stores.latitude = parseFloat(JSON.parse(response.data.data).result.location.lat.toFixed(7));
          }else{
            this.stores.longitude = 0;
            this.stores.latitude = 0;
            this.$message.error('输入地址错误！不能获取经纬度');
          }
        }.bind(this))
      },
      save() {
        this.$refs.stores.validate(valid => {
          if(valid){
            if(this.PIC == "" || this.PIC == null){
              this.$message.error('请选择店铺logo !');
              return false;
            }
            this.hadSave = true
        var url = this.$BASE_STORE_URL + 'shop/addShopManage/'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
          logo: this.PIC.join(","),
          storeNo: this.stores.storeNo,
          name: this.stores.name,
          longitude: this.stores.longitude,
          latitude: this.stores.latitude,
          address: this.stores.address,
          master: this.stores.master,
          customerServiceTelphone: this.stores.customerServiceTelphone,
          contactName: this.stores.contactName,
          contactTelphone: this.stores.contactTelphone,
          remark: this.stores.remark,
          businessDay: this.stores.businessDay
        })
        saveAxios.post(url, postData)
          .then(function (req) {
            this.$layer.msg(req.data.message)
            if (req.data.success == true) {
              this.hadSave = true
            }
            this.$router.push({ path: '/store/store_index' })
          }.bind(this))
      }else {
        return false
      }
    })
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/css/selectImg.css";
  @import "../../../static/css/iconfont.css";
  #updatePi .tan .el-dialog {
    width: 100%;

  }

  #updatePi .Tan .el-dialog {
    width: 100%;
    height: 80%;
  }
</style>
