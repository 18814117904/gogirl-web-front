<template>
  <div>
    <div id="updatePi">
      <el-form :model="storeusers" :rules="rules" ref="storeusers" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <h3 style="margin-top:20px;">修改员工</h3>
            <table class="table table-hover">
              <tbody>
              <tr>
                <td colspan="4">
                  <span style="color: red">头像：</span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span>
                    <div style="float: left">
                    <span v-if="PIC != '' && imageShow == true" v-for="pic in PIC"><img style="height: 80px; width: 80px;" :src="$BASE_PICTUREPATH_URL+pic" /></span>
                  </div>
                      <uploader v-on:childByValue="childByValue" :attr="picArr"></uploader>
                    </span>
                </td>
              </tr>
              <tr>
                <td >
                  <el-form-item label="员工名字:" prop="name" >
                <span>
              <el-input placeholder="请输入员工名字" required v-model="storeusers.name" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="手机号码:" prop="mobile">
                <span>
                 <el-input placeholder="请输入 手机号码" v-model="storeusers.mobile" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td >
                  <el-form-item label="所属店铺:" prop="longitude" >
                <span>
              <el-select filterable placeholder="请选择 所属店铺" v-model="storeusers.departmentId" @change="reChooseStore" style="max-width:100%;">
                <el-option
                  v-for="store in stores"
                  :key="store.id"
                  :label="store.name"
                  :value="store.id">
                </el-option>
              </el-select>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="职位:" prop="jobs">
                <span>
                  <el-select filterable multiple placeholder="请选择 职位" v-model="storeusers.jobs" style="max-width:100%;">
                    <el-option label="美甲师"  value="美甲师" />
                    <el-option label="美睫师" value="美睫师" />
                    <el-option label="前台" value="前台"/>
                    <el-option label="店长" value="店长"/>
                    </el-select>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="状态:" prop="status">
                <span>
                  <el-select filterable placeholder="请选择 状态" v-model="storeusers.status" style="max-width:100%;">
                    <el-option label="在职"  value="1" />
                    <el-option label="离职" value="2" />
                    </el-select>
                </span>
                  </el-form-item>
                </td>
                <td>

                </td>
              </tr>
              <tr><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-form>

    </div>
    <div style="margin: 10px auto">
      <div style="margin: 0 auto;width: 20%">
        <el-button type="primary" plain @click="save" v-bind:disabled="hadSave">保存</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import "@/components/imageutils/dialogDrag";
  import uploader from "@/components/uploadpicture/uploader.vue"
  export default {
    components:{
      uploader
    },
    name: "broadcast",
    props: ["attr"],
    data: function(){
      return {
        stores: [],
        storeusers: {
          name: '',
          mobile: '',
          departmentId: '',
          jobs: [],
          createTime: '',
          status: '1'
        },
        PIC: [],
        imageShow: true,
        //获取图片数组
        picArr:[],
        storeId: this.$route.params.nodetail,
        rules: {
          name: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
          departmentId: [{required: true, message: '请选择 所属店铺'}],
          jobs: [{required: true, message: '请选择 职位'}],
          status: [{required: true, message: '请选择 状态'}]
        },
        hadSave: false
      }
    },
    mounted: function () {
      this.getStoreDetail();
      this.reChooseStore();
    },
    methods: {
      childByValue(val){
        this.picArr = val
        this.imageShow = false
      },
      getStoreDetail: function(){
          var getBroadDetailAxios = this.$axios.create({})
          getBroadDetailAxios.get(this.$BASE_STORE_URL + 'user/queryUserDetail', {
            params: {
              id: this.attr
            }
          }).then(function (response) {
          //  this.picArr = "http://192.168.2.100:8082/gogirl-service/upload/grouppic/李倩雯1雯 w 20180922.jpeg".split(",")
            this.storeusers.name = response.data.data.name
            this.storeusers.mobile = response.data.data.mobile
            this.storeusers.departmentId = response.data.data.departmentId
            this.storeusers.jobs = response.data.data.jobs.split(",")
            if(response.data.data.status != null) {
              this.storeusers.status = response.data.data.status+""
            }
            this.PIC = response.data.data.picturePath.split(",")
          }.bind(this))
      },
      save() {
        this.$refs.storeusers.validate(valid => {
          if (valid) {

        const formData = new FormData()
        var temp = this.picArr;
        temp.forEach((item) => {
          formData.append("formData", item.file)
        })
        formData.append("id", this.attr)
        formData.append("name", this.storeusers.name)
        formData.append("departmentId", this.storeusers.departmentId)
        formData.append("jobs", this.storeusers.jobs.join(","))
        formData.append("status", this.storeusers.status)
        formData.append("mobile", this.storeusers.mobile)
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        var that = this;
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
        ajax.open('post',that.$BASE_STORE_URL + 'user/modifyUserManage/',true);
        ajax.withCredentials = true;
        ajax.crossDomain = true;
        //步骤三:发送请求
        ajax.send(formData);
        //步骤四:注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
          if (ajax.readyState==4 &&ajax.status==200) {
            var response = JSON.parse(ajax.responseText);
            if(response.success==true){
              that.$layer.msg("提交成功！")
              if (response.success == true) {
                that.hadSave = true
              }
              that.$emit('updateClick')
            }else{
              that.$layer.msg("提交失败！")
              if (response.success == true) {
                that.hadSave = false
              }
              that.$emit('updateClick')
            }
          }
        }
          }else {
            return false
          }
        })
        /*var url = this.$BASE_STORE_URL + 'user/modifyUserManage/'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
          id: this.attr,
        name: this.storeusers.name,
          mobile: this.storeusers.mobile,
          departmentId: this.storeusers.departmentId,
          jobs: this.storeusers.jobs.join(",")
        })
        saveAxios.post(url, postData)
          .then(function (req) {
            this.$layer.msg(req.data.message)
            if (req.data.success == true) {
              this.hadSave = true
            }
            // 父组件函数调用
            this.$emit('updateClick')
          }.bind(this))*/
      },
      reChooseStore () {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_STORE_URL + 'shop/queryShopForAll',{
          params: {
          }
        })
          .then(function (response) {
            this.stores = response.data.data
          }.bind(this))
      }
    }
  }
</script>

<style scoped>

</style>
