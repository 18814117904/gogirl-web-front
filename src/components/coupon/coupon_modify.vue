<template>
  <div>
    <div id="updatePi">
      <el-form :model="coupon" :rules="rules" ref="coupon" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <!--<h3 style="margin-top:20px;">新增员工</h3>-->
            <table class="table table-hover">
              <tbody>

              <tr>
                <td >
                  <el-form-item label="券名称:" prop="name" >
                <span>
              <el-input placeholder="请输入券名称" required v-model="coupon.name" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="金额:" prop="discountAmount">
                <span>
                  <el-input placeholder="请输入 金额" v-model="coupon.discountAmount" disabled="disabled" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td >
                  <el-form-item label="限领:" prop="limitQuantity" >
                <span>
              <el-input placeholder="请输入限领" required v-model="coupon.limitQuantity" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td >
                  <el-form-item label="总放量:" prop="allQuantity" >
                <span>
              <el-input placeholder="请输入 总放量" required v-model="coupon.allQuantity" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td>
                  <el-form-item label="有效期类型:" ref="validTypeSelect" prop="validType">
                <span>
                  <el-select filterable placeholder="请选择 有效期类型" v-model="coupon.validType" @change="getCouponSelected" style="max-width:100%;">
                    <el-option label="开始和结束"  value="1"/>
                    <el-option label="有效天数" value="2" />
                    </el-select>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <div style="display: block;" ref="startAndEndTime">
                    <el-form-item label="开始时间:" prop="validStartTime">
                <span>
                  <el-date-picker
                    v-model="coupon.validStartTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择开始日期时间">
                  </el-date-picker>
                </span>
                    </el-form-item>
                    <el-form-item label="结束时间:" prop="validEndTime" >
                <span>
                  <el-date-picker
                    v-model="coupon.validEndTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束日期时间">
                  </el-date-picker>
                 </span>
                    </el-form-item>
                  </div>
                  <div style="display: none" ref="validDateSelect">
                    <el-form-item label="有效天数:" prop="validDate">
                <span>
              <el-input placeholder="请输入 有效天数" required v-model="coupon.validDate" style="max-width:100%;"></el-input>
            </span>
                    </el-form-item>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <el-form-item label="券作用:" prop="note">
                <span>
                  <el-input placeholder="请输入 券作用" required v-model="coupon.note" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="种类:" prop="type">
                <span>
                  <el-select filterable placeholder="请选择 种类" v-model="coupon.type" disabled="disabled" style="max-width:100%;">
                    <el-option label="现金抵用券"  value="1" />
                    <el-option label="免单券" value="2" />
                    <el-option label="减免券" value="3"/>
                    </el-select>
                </span>
                  </el-form-item>
                </td>

              </tr>

              <tr>
                <td>
                  <el-form-item label="满减金额:" prop="reachingAmount" v-if="reachingAmountShow">
                <span>
                  <el-input disabled="disabled" placeholder="请输入 满减金额" v-model="coupon.reachingAmount" style="max-width:100%;"></el-input>
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
  import uploader from "@/components/uploadpicture/uploader.vue"
  export default {
    components:{
      uploader
    },
    name: "storeuser_new",
    props: ["attr"],
    data: function(){
      return {
        coupon: {
          name: '',
          discountAmount: '',
          limitQuantity: '',
          allQuantity: '',
          validType: '1',
          validDate: '',
          validStartTime: '',
          validEndTime: '',
          condition: '',
          type: '',
          note: '',
          reachingAmount: ''
        },
        reachingAmountShow: false,
        hadSave: false,
        rules: {
          name: [{required: true, message: '请输入券名称', trigger: 'blur'}],
          discountAmount: [{required: true, message: '请输入 金额'}],
          limitQuantity: [{required: true, message: '请输入 限领数'}],
          allQuantity: [{required: true, message: '请输入 发放量'}],
      //    validStartTime: [{required: true, message: '请选择开始时间', trigger: 'blur'}],
      //    validEndTime: [{required: true, message: '请选择结束时间', trigger: 'blur'}],
          condition1: [{required: true, message: '请选择使用条件', trigger: 'blur'}],
          type: [{required: true, message: '请选择分类', trigger: 'blur'}],
          validType: [{required: true, message: '请选择有效期类型', trigger: 'blur'}]
        }
      }
    },
    mounted: function () {
      this.getCouponDetail()
    },
    methods: {

      getCouponDetail() {
        var getCouponDetailAxios = this.$axios.create({})
        getCouponDetailAxios.get(this.$BASE_USER_URL + 'selectCouponByPrimaryKey', {
          params: {
            id: this.attr
          }
        }).then(function (response) {
          this.coupon = response.data.data
          this.coupon.type = response.data.data.type.toString()
          this.coupon.validType = response.data.data.validType.toString()
          if(response.data.data.validType == 1) {
            this.$refs.startAndEndTime.style.display = 'block'
            this.$refs.validDateSelect.style.display = 'none'
          }else if(response.data.data.validType == 2) {
            this.$refs.startAndEndTime.style.display = 'none'
            this.$refs.validDateSelect.style.display = 'block'
          }
          this.reachingAmountShow = response.data.data.type == 3 ? true : false
        }.bind(this))
      },

      save() {
        this.$refs.coupon.validate(valid => {
          if (valid) {
            this.hadSave = true
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              id: this.attr,
              name: this.coupon.name,
              discountAmount: this.coupon.discountAmount,
              limitQuantity: this.coupon.limitQuantity,
              allQuantity: this.coupon.allQuantity,
              validStartTime: this.coupon.validStartTime,
              validEndTime: this.coupon.validEndTime,
              condition1: this.coupon.condition1,
              validDate: this.coupon.validDate,
              type: this.coupon.type,
              note: this.coupon.note
            })
            searchAxios.post(this.$BASE_USER_URL + 'updateCoupon', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('updateClick')
              }.bind(this))
          }else {
            return false
          }
        })
      },

      getCouponSelected() {
        if(this.coupon.validType == 1) {
          this.$refs.startAndEndTime.style.display = 'block'
          this.$refs.validDateSelect.style.display = 'none'
        }else if(this.coupon.validType == 2) {
          this.$refs.startAndEndTime.style.display = 'none'
          this.$refs.validDateSelect.style.display = 'block'
        }
      }
    }
  }
</script>

<style scoped>

</style>
