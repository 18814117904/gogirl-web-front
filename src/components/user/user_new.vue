<template>
  <div>
    <div>
      <el-form :model="user" :rules="rules" ref="user" label-width="100px">
      <div style="margin-bottom: 5px ">
        <div class="fixed-table-container bootstrap-table">
          <h3 style="margin-top:20px;">新增帐号</h3>
          <table class="table table-hover">
            <tbody>
            <tr>

              <td>
                <el-form-item label="姓名:" prop="name" >
                <span>
              <el-input placeholder="请输入 姓名" required v-model="user.name" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="密码:" prop="password" >
                <span>
              <el-input placeholder="请输入 密码" :type="passwordType" required v-model="user.password" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <!--<td>
              <el-form-item label="性别:" prop="sex">
                <span>
                  <el-select filterable placeholder="请选择 性别" v-model="user.sex" style="max-width:100%;">
                     <el-option label="男" value="男"/>
                    <el-option label="女" value="女"/>
                    </el-select>
                </span>
              </el-form-item>
              </td>-->

              <td>
                <el-form-item label="所属店铺:" prop="selectStore">
                  <span>
              <el-select filterable placeholder="请选择 所属店铺" v-model="user.selectStore" @change="reChooseStore" style="max-width:100%;">
                <el-option label="总后台" value="0"/>
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
                <el-form-item label="用户角色:" prop="selectCmsRole" v-if="cmsType">
                  <span>
              <el-select filterable placeholder="请选择 用户角色" v-model="user.selectCmsRole" style="max-width:100%;">
                <el-option label="运营" value="1"/>
                <el-option label="客服" value="2"/>
                <el-option label="采购" value="3"/>
                <el-option label="官网" value="6"/>
              </el-select>
                    </span>
                </el-form-item>

                <el-form-item label="用户角色:" prop="selectStoreRole" v-if="storeType">
                  <span>
              <el-select filterable placeholder="请选择 用户角色" v-model="user.selectStoreRole" style="max-width:100%;">
                <el-option label="老板" value="4"/>
                <el-option label="员工" value="5"/>
              </el-select>
                    </span>
                </el-form-item>
              </td>
            </tr>
            <tr>

              <td>
                <el-form-item label="电话:" prop="telphone" >
                <span>
              <el-input placeholder="请输入 电话" required v-model="user.telphone" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>
              <td></td>
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
  export default {
    name: "user_new",
    data: function(){
      return {
        stores: [],
        user: {
          name: '',
          password: '',
          telphone: '',
          sex: '',
          selectCmsRole: '',
          selectStoreRole: '',
          grade: '',
          selectStore: '',
          integral: 0
        },
        cmsType: true,
        storeType: false,
        rules: {
          name: [{required: true, message: '请输入帐号名称', trigger: 'blur'}],
          password: [{required: true, message: '请输入帐号密码', trigger: 'blur'}],
          selectStore: [{required: true, message: '请选择所属店铺', trigger: 'blur'}],
          selectCmsRole: [{required: true, message: '请选择用户角色', trigger: 'blur'}],
          selectStoreRole: [{required: true, message: '请选择用户角色', trigger: 'blur'}]
        },
        hadSave: false,
        passwordType: 'password'
      }
    },
    mounted: function () {
      this.reChooseStore()
    },
    methods: {
      save() {
        debugger
        let s = this.user.sex;
        this.$refs.user.validate(valid => {
          if (valid) {
        this.hadSave = true
        var url = this.$BASE_URL + 'user/addUser/'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
          name: this.user.name,
          departmentId: this.user.selectStore,
          password: this.user.password,
          telphone: this.user.telphone,
          userRole: this.user.selectCmsRole || this.user.selectStoreRole,
          sex: this.user.sex
        })
        saveAxios.post(url, postData)
          .then(function(req){
            this.$layer.msg(req.data.message)
            if(req.data.success == true){
              this.hadSave = true
              layer.close(layer.index);
             /* var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
              parent.layer.close(index);*/
            }
            // 父组件函数调用
            this.$emit('childClick')
          }.bind(this))
          }else {
            return false
          }
        })
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

        if(this.user.selectStore == 0) {
          this.cmsType = true
          this.storeType = false
          this.user.selectCmsRole = ''
          this.user.selectStoreRole = ''
        }else {
          this.cmsType = false
          this.storeType = true
          this.user.selectCmsRole = ''
          this.user.selectStoreRole = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
