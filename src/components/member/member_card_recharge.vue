<template>
  <div>
    <div id="updatePi">
      <el-form :model="memberCard" :rules="rules" ref="memberCard" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <!--<h3 style="margin-top:20px;">新增员工</h3>-->
            <table class="table table-hover">
              <tbody>

              <tr>
                <td >
                  <el-form-item label="用户名:" prop="name" >
                <span>
              <el-input placeholder="请输入用户名" required v-model="memberCard.name" :disabled="true" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="电话号码:" prop="phone">
                <span>
                  <el-input placeholder="请输入 电话号码" v-model="memberCard.phone" :disabled="true" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="充值:" prop="orderAmount">
                <span>
                  <el-input placeholder="请输入 充值金额" v-model="memberCard.orderAmount" @blur="amountBalance" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="送:" prop="bestowAmount">
                <span>
                  <el-input placeholder="请输入 赠送金额" v-model="memberCard.bestowAmount" @blur="countBalance" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="推荐人:" prop="referee">
                <span>

                  <el-select filterable multiple placeholder="请选择 推荐人" v-model="memberCard.storeUserSelected" style="max-width:100%;">
                    <el-option
                      v-for="type in storeUser"
                      :key="type.id"
                      :label="type.name"
                      :value="type.id">
                    </el-option>
                    </el-select>
                </span>
                  </el-form-item>

                  <!--<el-form-item label="余额:" prop="amount">
                <span>
                  <el-input placeholder="请输入 余额" v-model="memberCard.amount" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>-->
                </td>

                <td>
                  <el-form-item label="充值方式:" prop="source">
                <span>

                  <el-select filterable placeholder="请选择 充值方式" v-model="memberCard.source" style="max-width:100%;">
                    <el-option label="pos机" value="5" />
                    <el-option label="大众点评"  value="7" />
                    <el-option label="现金" value="6" />
                    <el-option label="微信" value="8" />
                  </el-select>
                </span>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  <el-form-item label="备注:" prop="remark">
                <span>
                  <el-input placeholder="请输入 备注" v-model="memberCard.remark" style="max-width:100%;"></el-input>
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
  export default {
    name: "storeuser_new",
    props: ["attr"],
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
      return {
        stores: [],
        selectStore: '',
        memberCard: {
          customerId: '',
          name: '',
          phone: '',
          orderAmount: 0,
          bestowAmount: 0,
          source: '',
          referee: 0,
          amount: 0,
          remark: '',
          storeUserSelected: []
        },
        storeUser: [],
        hadSave: false,
        rules: {
          name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          orderAmount: [{validator: newReg1, trigger: 'blur'}],
          bestowAmount: [{validator: newReg1, trigger: 'blur'}],
          source: [{required: true, message: '请选择充值方式', trigger: 'blur'}],
          phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}]
        }
      }
    },
    mounted: function () {
      this.queryUserManageForAll()
      this.initMemberCard()
    },
    methods: {
      save() {
        this.$refs.memberCard.validate(valid => {
          if (valid) {
            this.hadSave = true
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              name: this.memberCard.name,
              phone: this.memberCard.phone,
              orderAmount: this.memberCard.orderAmount,
              bestowAmount: this.memberCard.bestowAmount,
              refereeId: this.memberCard.storeUserSelected.join(","),
              source: this.memberCard.source,
              customerId: this.memberCard.customerId,
              remark: this.memberCard.remark
            })
            searchAxios.post(this.$BASE_USER_URL + 'chargeBalance', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                if(response.data.success){
                  this.$emit('rechargeClick')
                }
              }.bind(this))
          }else {
            return false
          }
        })
      },

      queryUserManageForAll () {
        var getUserDetailAxios = this.$axios.create({})
        getUserDetailAxios.get(this.$BASE_STORE_URL + 'user/queryUserManageForAll', {
          params: {
          }
        }).then(function (response) {
          this.storeUser = response.data.data
        }.bind(this))
      },

      countBalance() {
        this.memberCard.amount = Number(this.memberCard.orderAmount) + Number(this.memberCard.bestowAmount)
      },

      amountBalance() {
        var url = this.$BASE_USER_URL + 'selectDiscount'
        let innerObj = this
        var getAllTypeAxios = this.$axios.create({})
        getAllTypeAxios.get(url, {
          params: {
            pageNum: 1,
            pageSize: 18
          }
        })
          .then(function (response) {
            if(response.data.success == false){
              return
            }
            let dataList = response.data.data.list
            let chargeAmounts = 0;
            let bestowAmount = 0;
            innerObj.memberCard.bestowAmount = 0;
            if(dataList.length > 0) {
              dataList.forEach(function(value,i){
                if(innerObj.memberCard.orderAmount < (value.chargeAmount/100)) {
                  return false;
                }
                innerObj.memberCard.bestowAmount = (value.bestowAmount/100)
              })
            }
            innerObj.memberCard.amount = Number(innerObj.memberCard.orderAmount) + Number(innerObj.memberCard.bestowAmount)
          }.bind(this))
          .catch(function (response) {
            alert('getAllTypeAxios ERROE ! ' + response)
          })

      },

      initMemberCard() {
        let n = this.attr.storeRecordRealName

        if(this.attr.storeRecordRealName != null && this.attr.storeRecordRealName != ''){
          this.memberCard.name = this.attr.storeRecordRealName
        }else if(this.attr.realName != null && this.attr.realName != '') {
          this.memberCard.name = this.attr.realName
        }else if(this.attr.nickname != null && this.attr.nickname != ''){
          this.memberCard.name = this.attr.nickname
        }else {
          this.memberCard.name = ''
        }
        this.memberCard.phone = this.attr["phone"]

        this.memberCard.customerId = this.attr["id"]
      }
    }
  }
</script>

<style scoped>

</style>
