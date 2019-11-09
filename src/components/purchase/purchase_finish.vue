<template>
  <div>
    <div id="updatePi">
      <el-form :model="skuPurchase" :rules="rules" ref="skuPurchase" label-width="100px" width="35%" style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
        <el-form-item label="选择:" prop="type" v-if="depName != null && depName != ''">
          <el-radio v-model="skuPurchase.type" @click.native.prevent="change(1)" :label="1">入库</el-radio> <el-radio v-model="skuPurchase.type" @click.native.prevent="change(2)" :label="2">出库</el-radio>
        </el-form-item>
        <div style="display: block;" ref="quantityRef">
          <el-form-item label="入库数量:" prop="quantity" >
            <el-input placeholder="请输入 入库数量" required v-model="skuPurchase.quantity"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" plain @click="save" style="margin-top: 18px" v-bind:disabled="hadSave">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    name: "purchase_finish",
    props: ["attr", "modifyQuantity", "depName"],
    data: function(){
      return {
        skuPurchase: {
          type: 1,
          quantity: 0
        },
        hadSave: false,
        addVisible: false,
        rules: {
          type: [{required: true, message: '请输入类型', trigger: 'blur'}],
          quantity: [{required: true, message: '请输入采购数量', trigger: 'blur'}]
        }
      }
    },
    mounted: function () {
      this.skuPurchase.quantity = this.modifyQuantity
    },
    methods: {
      save() {
        this.$refs.skuPurchase.validate(valid => {
          if(valid){
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              id: this.attr,
              stockNum: this.skuPurchase.quantity,
              stockType: this.skuPurchase.type
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'order/updatePurchaseSuccess', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('childClick')
              }.bind(this))
          }else {
            return false
          }
        })
      },

      change(val) {
        this.skuPurchase.type = val
        if(this.skuPurchase.type == 1) {
          this.$refs.quantityRef.style.display = 'block'
        }else if(this.skuPurchase.type == 2) {
          this.$refs.quantityRef.style.display = 'none'
        }
      }
    }
  }
</script>

<style scoped>

</style>
