<template>
  <div>
    <div id="updatePi">
      <el-form :model="activity" :rules="rules" ref="activity" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <!--<h3 style="margin-top:20px;">新增员工</h3>-->
            <table class="table table-hover">
              <tbody>

              <tr>
                <td >
                  <el-form-item label="活动名称:" prop="name" >
                <span>
              <el-input placeholder="请输入活动名称" required v-model="activity.name" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="活动奖品:" prop="prize">
                <span>
                  <el-input placeholder="请输入 活动奖品" v-model="activity.prize" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="开始时间:" prop="startTime">
                <span>
                  <el-date-picker
                    v-model="activity.startTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择开始日期时间">
                  </el-date-picker>
                </span>
                  </el-form-item>
                </td>
                <td >
                  <el-form-item label="结束时间:" prop="endTime" >
                <span>
                  <el-date-picker
                    v-model="activity.endTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束日期时间">
                  </el-date-picker>
                 </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="活动对象:" prop="conditionUse">
                <span>
                  <el-select filterable multiple placeholder="请选择 活动对象" v-model="activity.conditionUse" @change="getUser(activity.conditionUse)" style="max-width:100%;">
                    <el-option label="所有用户"  value="5" />
                    <el-option label="客户" value="1" />
                    <el-option label="会员" value="2"/>
                    <el-option label="微信用户" value="3"/>
                    <el-option label="公众号粉丝" value="4"/>
                    </el-select>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="活动状态:" prop="status">
                    <span>
                  <el-select filterable placeholder="请选择 活动状态" v-model="activity.status" style="max-width:100%;">
                    <el-option label="开启"  value="1" />
                    <el-option label="关闭" value="2" />
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
    props: ["attr"],
    data: function(){
      return {
        stores: [],
        selectStore: '',
        activity: {
          name: '',
          startTime: '',
          endTime: '',
          prize: '',
          conditionUse: '',
          status: ''
        },
        hadSave: false,
        rules: {
          name: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
          startTime: [{required: true, message: '请选择 开始时间'}],
          endTime: [{required: true, message: '请选择 结束时间'}],
          prize: [{required: true, message: '请输入活动奖品', trigger: 'blur'}],
          conditionUse: [{required: true, message: '请输入使用条件', trigger: 'blur'}]
        }
      }
    },
    mounted: function () {
      this.getActitivyDetail()
    },
    methods: {
      save() {
        this.$refs.activity.validate(valid => {
          if (valid) {
            this.hadSave = true
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              id: this.attr,
              name: this.activity.name,
              startTime: this.activity.startTime,
              endTime: this.activity.endTime,
              prize: this.activity.prize,
              conditionUse: this.activity.conditionUse.join(","),
              status: this.activity.status
            })
            searchAxios.post(this.$BASE_STORE_URL + 'activity/modifyActivity', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
              }.bind(this))
            this.$emit('updateClick')
          }else {
            return false
          }
        })
      },

      getUser (value) {
        if(value == 5) {
          this.activity.conditionUse = ['1', '2', '3', '4'];
        }else{
          for(let i = 0; i < value.length; i++) {
            if(value[i] == 5){
              value.splice(i, 1);
              break;
            }
          }
        }
      },

      getActitivyDetail () {
        var getServeDetailAxios = this.$axios.create({})
        getServeDetailAxios.get(this.$BASE_STORE_URL + 'activity/queryActivityForDetail', {
          params: {
            id: this.attr
          }
        }).then(function (response) {
          this.activity.name = response.data.data.name
          this.activity.startTime = response.data.data.startTime
          this.activity.endTime = response.data.data.endTime
          this.activity.prize = response.data.data.prize
          this.activity.conditionUse = response.data.data.conditionUse.split(",")
          this.activity.status = response.data.data.status
        }.bind(this))
      }

    }
  }
</script>

<style scoped>

</style>
