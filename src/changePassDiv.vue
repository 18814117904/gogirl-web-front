<template>
  <div>
    <div>
      <el-form :model="user" :rules="rules" ref="user" label-width="100px">
      <div style="margin-bottom: 5px ">
        <div class="fixed-table-container bootstrap-table">
          <table class="table table-hover">
            <tbody>
            <tr>
              <td>
                <el-form-item label="原密码:" prop="oldPass" >
                <span>
              <el-input placeholder="请输入 密码" :type="passwordType" required v-model="user.oldPass" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td>
                <el-form-item label="新密码:" prop="newPass" >
                <span>
              <el-input placeholder="请输入 新密码" :type="passwordType" required v-model="user.newPass" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td>
                <el-form-item label="新密码:" prop="newPass2" >
                <span>
              <el-input placeholder="请再次输入 新密码" :type="passwordType" required v-model="user.newPass2" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>
            </tr>
            



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
  export default {
  	props: ["attr"],
    name: "user_new",
    data: function(){
      return {
//      stores: [],
        user: {
          oldPass: '',
          newPass: '',
          newPass2: '',
        },
//      cmsType: true,
//      storeType: false,
        rules: {
          oldPass: [{required: true, message: '请输入原密码', trigger: 'blur'}],
          newPass: [{required: true, message: '请输入新密码', trigger: 'blur'}],
          newPass2: [{required: true, message: '请再次输入新密码', trigger: 'blur'}]
        },
        hadSave: false,
        passwordType: 'password'
      }
    },
    mounted: function () {
//    this.reChooseStore()
    },
    methods: {
      save() {
      	console.log(this.attr);
//      debugger
//      let s = this.user.sex;
        this.$refs.user.validate(valid => {
          if (valid) {
        this.hadSave = true
        var url = this.$BASE_URL + 'user/changePass/'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
        	id:this.attr,
          oldPass: this.user.oldPass,
          newPass: this.user.newPass,
          newPass2: this.user.newPass2
        })
        saveAxios.post(url, postData)
          .then(function(req){
//        	debugger
            this.$layer.msg(req.data.message)
            if(req.data.success == true){
              this.hadSave = true
              layer.close(layer.index);
             /* var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
              parent.layer.close(index);*/
            this.$emit('closeChangeClick')
            }else{
            	this.hadSave=false;
                  this.$message({
                    type: 'error',
                    message: req.data.message
                  });
            }
            // 父组件函数调用
          }.bind(this))
          }else {
            return false
          }
        })
      },
//    reChooseStore () {
//      var getServeTypeAxios = this.$axios.create({})
//      getServeTypeAxios.get(this.$BASE_STORE_URL + 'shop/queryShopForAll',{
//        params: {
//        }
//      })
//        .then(function (response) {
//          this.stores = response.data.data
//        }.bind(this))
//
//      if(this.user.selectStore == 0) {
//        this.cmsType = true
//        this.storeType = false
//        this.user.selectCmsRole = ''
//        this.user.selectStoreRole = ''
//      }else {
//        this.cmsType = false
//        this.storeType = true
//        this.user.selectCmsRole = ''
//        this.user.selectStoreRole = ''
//      }
//    }
    }
  }
</script>

<style scoped>

</style>
