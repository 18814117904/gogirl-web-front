<template>
  <div>
    <div id="updatePi">
      <el-form :model="storeusers" :rules="rules" ref="storeusers" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <!--<h3 style="margin-top:20px;">新增员工</h3>-->
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
                      <uploader v-on:childByValue="childByValue"></uploader>
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
                  <el-form-item label="所属店铺:" prop="departmentId" >
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
                  <el-form-item label="职位:" prop="selectJobs">
                <span>
                  <el-select filterable multiple placeholder="请选择 职位" v-model="storeusers.selectJobs" style="max-width:100%;">
                    <el-option label="美甲师"  value="美甲师" />
                    <el-option label="美睫师" value="美睫师" />
                    <el-option label="前台" value="前台"/>
                    <el-option label="店长" value="店长"/>
                    </el-select>
                </span>
                  </el-form-item>
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
  import uploader from "@/components/uploadpicture/uploader.vue"
  export default {
    components:{
      uploader
    },
    name: "storeuser_new",
    data: function(){
      return {
        stores: [],
        selectStore: '',
        storeusers: {
         name: '',
          mobile: '',
          departmentId: '',
          selectJobs: [],
          jobs: '',
          createTime: ''
        },
        hadSave: false,
        //获取图片数组
        picArr:[],
        storeId: this.$parent.nodetail,
        //筛选图片
        addVisible: false,
        rules: {
         name: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
          departmentId: [{required: true, message: '请选择 所属店铺'}],
          selectJobs: [{required: true, message: '请选择 职位'}]
        }
      }
    },
    mounted: function () {
      this.reChooseStore()
    },
    methods: {
      childByValue(val){
        this.picArr = val
      },
      save() {
        this.$refs.storeusers.validate(valid => {
          if (valid) {
        this.hadSave = true
        const formData = new FormData()
        var temp = this.picArr;
        temp.forEach((item) => {
          formData.append("formData", item.file)
        })
        formData.append("name", this.storeusers.name)
        formData.append("departmentId", this.storeusers.departmentId)
        formData.append("jobs", this.storeusers.selectJobs.join(","))
        formData.append("mobile", this.storeusers.mobile)
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        var that = this;
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
        ajax.open('post',that.$BASE_STORE_URL + 'user/addUserManage/',true);
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
                that.hadSave = true
              that.$emit('childClick')
            }else{
              that.$layer.msg("提交失败！")
              that.hadSave = false
              that.$emit('childClick')
            }
          }
        }

          }else {
            return false
          }
        })
        /*this.$refs.storeusers.validate(valid => {
          if(valid){
        var url = this.$BASE_STORE_URL + 'user/addUserManage/'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
          name: this.storeusers.name,
          departmentId: this.storeusers.departmentId,
          jobs: this.selectJobs.join(","),
          mobile: this.storeusers.mobile
        })
        saveAxios.post(url, postData)
          .then(function (req) {
            this.$layer.msg(req.data.message)
            if (req.data.success == true) {
              this.hadSave = true
            }
            // 父组件函数调用
            this.$emit('childClick')
          }.bind(this))
      }else {
        return false
      }
    })*/
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
