<template>
  <div>
    <div>
      <el-form :model="cardrule" :rules="rules" ref="cardrule" label-width="100px">
      <div style="margin-bottom: 5px ">
        <div class="fixed-table-container bootstrap-table">
          <h3 style="margin-top:20px;">修改金额配置</h3>
          <table class="table table-hover">
            <tbody>
            <tr>
              <td>
              <el-form-item label="充值金额(元):" prop="chargeAmount" >
                <span>
              <el-input placeholder="请输入 充值金额" required  v-model="cardrule.chargeAmount" style="max-width:100%;"></el-input>
            </span>
              </el-form-item>
              </td>
              <td>
              <el-form-item label="赠送金额:" prop="bestowAmount" >
                <span>
              <el-input placeholder="请输入 赠送金额" required  v-model="cardrule.bestowAmount" style="max-width:100%;"></el-input>
            </span>
              </el-form-item>
              </td>
            </tr>
            <tr>
              <td>
              <el-form-item label="折扣:" prop="discount" >
                <span>
              <el-input placeholder="请输入 折扣" required  v-model="cardrule.discount" style="max-width:100%;"></el-input>
            </span>
              </el-form-item>
              </td>
              <td>
              <el-form-item label="会员等级:" prop="level" >
                <span>
              <el-input placeholder="请输入 会员等级" required  v-model="cardrule.level" style="max-width:100%;"></el-input>
            </span>
              </el-form-item>
              </td>
            </tr>
            <tr>
              <td colspan="2">
              <el-form-item label="备注:" prop="remark" >
                <span>
              <textarea id="remark" class="form-control" v-model="cardrule.remark" style="max-width: 100%;"></textarea>
            </span>
              </el-form-item>
              </td>
            </td><td></td><td></td>
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
        <el-button type="primary" plain @click="create" v-bind:disabled="hadSave">新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "card_rule_add",
    data: function(){
      var newReg1 = (rule, value, callback) => {
        if (value!=parseFloat(value)) {
          callback(new Error('只能是数字'));
        } else if(value < 0){
          callback(new Error('不能为负数'));
        }else{
          callback();
        }
      };
      var newReg2 = (rule, value, callback) => {
        if (value!=parseFloat(value)) {
          callback(new Error('只能是数字'));
        } else if(value <= 0 || value > 1){
          callback(new Error('输入大于0小于等于1'));
        }else{
          callback();
        }
      };
      return {
        cardrule: {
          chargeAmount: '',
          bestowAmount: '',
          discount: '',
          level: '',
          remark: ''
        },
        rules: {
          chargeAmount: [{validator: newReg1, trigger: 'blur'}],
          bestowAmount: [{validator: newReg1, trigger: 'blur'}],
          discount: [{validator: newReg2, trigger: 'blur'}],
          level: [{required: true, message: '请输入会员等级', trigger: 'blur'}]
        },
        hadSave: false
      }
    },
    mounted: function () {
    },
    methods: {
      create() {
        this.$refs.cardrule.validate(valid => {
          if(valid){
            this.hadSave = true
        var url = this.$BASE_USER_URL + 'insertSelective'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
          chargeAmount: this.cardrule.chargeAmount * 100,
          bestowAmount: this.cardrule.bestowAmount * 100,
          discount: this.cardrule.discount,
          level: this.cardrule.level,
          remark: this.cardrule.remark
        })
        saveAxios.post(url, postData)
          .then(function(req){
            this.$layer.msg(req.data.message)
            if(req.data.success == true){
              this.hadSave = true
            }
            // 父组件函数调用
            this.$emit('addClick')
          }.bind(this))
          }else {
            return false
          }
        })
      }

    }
  }
</script>

<!--<style scoped>

</style>-->
