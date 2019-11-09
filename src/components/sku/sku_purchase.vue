<template>
  <div>
    <div id="updatePi">
      <el-form :model="skuPurchase" :rules="rules" ref="skuPurchase" label-width="100px" width="35%" style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
                  <el-form-item label="商品名称:" prop="attrName" >
              <el-input placeholder="请输入 商品名称" required v-model="skuPurchase.attrName" :disabled="true"></el-input>
                  </el-form-item>
        <el-form-item label="采购数量:" prop="quantity" >
          <el-input placeholder="请输入 采购数量" required v-model="skuPurchase.quantity"></el-input>
        </el-form-item>
        <el-form-item label="采购备注:" prop="createRemark" >
          <el-input placeholder="请输入 采购备注" required v-model="skuPurchase.createRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="save" style="margin-top: 18px" v-bind:disabled="hadSave">采购</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getUserinfo} from '../../vuex/session-storage'
  export default {
    components:{},
    name: "sku_purchase",
    props: ["attr", "attrName"],
    data: function(){
      return {
        skuPurchase: {
          attrName: '',
          quantity: 0,
          createRemark: ''
        },
        hadSave: false,
        addVisible: false,
        rules: {
          attrName: [{required: true, message: '请输入类型', trigger: 'blur'}],
      quantity: [{required: true, message: '请输入采购数量', trigger: 'blur'}]
        }
      }
    },
    computed: function() {

    },
    mounted: function () {
      this.skuPurchase.attrName = this.attrName
    },
    methods: {
      save() {
        this.$refs.skuPurchase.validate(valid => {
          if(valid){
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              sku: this.attr,
              quantity: this.skuPurchase.quantity,
              creater: JSON.parse(getUserinfo()).id,
              createRemark: this.skuPurchase.createRemark,
              departmentId: JSON.parse(getUserinfo()).departmentId
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'order/insert', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('purchaseChildClick')
              }.bind(this))
          }else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
