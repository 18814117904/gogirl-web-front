<template>
  <div>
    <div id="updatePi">
      <el-form :model="coupon" :rules="rules" ref="coupon" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <table class="table table-hover">
              <tbody>

              <tr>
                <td>
                  <el-form-item label="发放类型:" ref="grantTypeSelect" prop="issueType">
                <span>
                  <el-select filterable placeholder="请选择 发放类型" v-model="coupon.issueType" @change="getCouponSelected" style="max-width:100%;">
                    <el-option label="单个用户"  value="1"/>
                    <el-option label="群发用户" value="2" />
                    </el-select>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <div v-if="phoneShow" ref="validPhoneSelect">
                    <el-form-item label="手机号码:" prop="phone" >
                <span>
              <el-input placeholder="请输入手机号码" required v-model="coupon.phone" style="max-width:100%;"></el-input>
            </span>
                    </el-form-item>
                  </div>

                  <div v-if="groupShow" ref="groupSending">
                    <el-form-item label="群发类型:" prop="groupType">
                <span>
                  <el-select filterable multiple placeholder="请选择 券类型" v-model="coupon.groupType" style="max-width:100%;">
                    <el-option label="注册用户"  value="1"/>
                    <el-option label="订单用户" value="2" />
                    <el-option label="次订单用户"  value="3"/>
                    <el-option label="会员卡用户" value="4" />
                    </el-select>
                </span>
                    </el-form-item>
                  </div>

                </td>

              </tr>

              <tr>
                <td >
                  <el-form-item label="券选择:"  prop="couponId">
                <span>
                  <el-select filterable placeholder="请选择 券类型" v-model="coupon.couponId" style="max-width:100%;">
                    <el-option
                      v-for="coupons in couponAll"
                      :key="coupons.id"
                      :label="coupons.name"
                      :value="coupons.id">
                </el-option>
                    </el-select>
                </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="数量:" prop="amount">
                <span>
                  <el-input placeholder="请输入 数量" v-model="coupon.amount" style="max-width:100%;"></el-input>
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
        <el-button type="primary" plain @click="save" v-bind:disabled="hadSave">发放</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    components:{},
    name: "storeuser_new",
    data: function(){
      return {
        couponAll: [],
        coupon: {
          phone: '',
          amount: '',
          issueType: '1',
          groupType: [],
          couponId: ''
        },
        hadSave: false,
        phoneShow: true,
        groupShow: false,
        rules: {
          phone: [{required: true, message: '请输入券名称', trigger: 'blur'}],
          amount: [{required: true, message: '请输入 数量'}],
          issueType: [{required: true, message: '请选择发放类型', trigger: 'blur'}],
          couponId: [{required: true, message: '请选择 券'}],
          groupType: [{required: true, message: '请至少选择一种类型'}]
        }
      }
    },
    mounted: function () {
      this.getAllcoupon()
    },
    methods: {
      getAllcoupon: function () {
        var url = this.$BASE_USER_URL + 'getAllCoupon'
        var getAllPurchasingPlanAxios = this.$axios.create({})
        getAllPurchasingPlanAxios.get(url, {
          params: {
          }
        })
          .then(function (response) {
            this.couponAll = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllCompanyAxios ERROE ! ' + response)
          })
      },

      save() {
        this.$refs.coupon.validate(valid => {
          if (valid) {
            this.hadSave = true
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              phone: this.coupon.phone,
              amount: this.coupon.amount,
              groupType: this.coupon.groupType.join(","),
              issueType: this.coupon.issueType,
              couponId: this.coupon.couponId
            })
            searchAxios.post(this.$BASE_USER_URL + 'sendCoupons', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('grantClick')
              }.bind(this))
          }else {
            return false
          }
        })
      },

      getCouponSelected() {
        if(this.coupon.issueType == 2) {
          this.groupShow = true
          this.phoneShow = false
        }else if(this.coupon.issueType == 1) {
          this.groupShow = false
          this.phoneShow = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
