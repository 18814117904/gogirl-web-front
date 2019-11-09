<template>
  <div>
    <div>
      <el-form :model="user" :rules="rules" ref="user" label-width="100px">
      <div style="margin-bottom: 5px ">
        <div class="fixed-table-container bootstrap-table">
          <h3 style="margin-top:20px;">修改密码</h3>
          <table class="table table-hover">
            <tbody>
            <tr>
              <td>
              <el-form-item label="姓名:" prop="name" >
                <span>
              <el-input placeholder="请输入 名称" v-model="user.name" style="max-width:100%;"></el-input>
            </span>
              </el-form-item>
              </td>

              <td>
                <el-form-item label="密码:" prop="password" >
                <span>
              <el-input placeholder="请输入 密码" v-model="user.password" style="max-width:100%;"></el-input>
            </span>
                </el-form-item>
              </td>

            </tr>
            <tr>
              <td>
                <el-form-item label="性别:" prop="sex" >
                <span>
              <el-select filterable placeholder="请选择 性别" v-model="user.sex" style="max-width: 100%;">
                    <el-option label="男" value="男"/>
                    <el-option label="女" value="女"/>
                  </el-select>
            </span>
                </el-form-item>
              </td>
              <td>
                <el-form-item label="电话:" prop="telphone" >
                <span>
                  <el-input placeholder="请输入 电话" v-model="user.telphone" style="max-width:100%;"></el-input>
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
        <el-button type="info" plain @click="save" v-bind:disabled="hadSave">注册</el-button>
      </div>
    </div>
  </div>
  <!--<body class="">
  <div class="wrapper wrapper-content">
    <div class="ibox-content m-b-sm  border-bottom">
      <h4>基础信息</h4>
      <table class="table table-bordered">
        <tbody>
        <tr>
          <td class="text-right">
            <label> 上传图片：</label>
          </td>
          <td>
            <input id="picture" name="picture" type="file" accept="image/png,image/gif"/>
            <input type="button" value="提交" @click="savePicture">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </body>-->

  <!--methods: {
  savePicture(){
  var pictureSaveAxios = this.$axios.create({
  headers: {'content-type': 'multipart/form-data'}
  })
  let file = document.getElementById('picture').files[0];
  let param = new FormData()
  param.append('addPicture', file, file.name)
  pictureSaveAxios.post(this.$BASE_URL + 'commodity/addPicture/', param)
  .then(function(response){
  alert("success");
  })
  }
  }-->
</template>

<script>
  export default {
    name: "produce_new",
    data: function(){
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      };
      const validateUsername = (rule, value, callback) => {
        this.errorMessage = false
        if (value.length < 1) {
          callback(new Error('请输入用户名'))
        } else {
          var searchAxios = this.$axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          var postData = this.$qs.stringify({
            name: this.user.name
          })
          searchAxios.post(this.$BASE_URL + 'user/queryUserForCheck/', postData)
            .then(function (response) {
              if(response.data != ''){
                callback(new Error('输入用户名已存在'))
              }else{
                callback()
              }
            }.bind(this))
        }
      };

      return {
        user: {
          name: '',
          password: '',
          telphone: '',
          sex: '男',
          grade: '低级',
          integral: 0
        },
        rules: {
          name: [{validator: validateUsername, trigger: 'blur'}],
          password: [{required: true, message: '请输入密码'},
            {min: 6, message: '长度大于6', trigger: 'blur'}],
          telphone: [{validator: checkPhone, trigger: 'blur'}]
        },
        hadSave: false,
        passwordType: 'password'
      }
    },
    mounted: function () {

    },
    methods: {
      save() {
        this.$refs.user.validate(valid => {
          if(valid){
          var url = this.$BASE_URL + 'user/addUser/'
          var saveAxios = this.$axios.create({})
          var postData = this.$qs.stringify({
            name: this.user.name,
            password: this.user.password,
            telphone: this.user.telphone,
            sex: this.user.sex
          })
          saveAxios.post(url, postData)
            .then(function (req) {
              this.$layer.msg(req.data.define)
              if (req.data.code == 1) {
                this.hadSave = true
              }
            }.bind(this))
          }else {
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
