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
        <el-form-item label="店铺选择:" prop="attrName" >
          <el-select filterable placeholder="请选择 店铺" v-model="skuPurchase.storeSelected" @change="reChooseStore" style="max-width:100%;">
            <el-option
              v-for="store in stores"
              :key="store.id"
              :label="store.name"
              :value="store.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出库数量:" prop="quantity" >
          <el-input placeholder="请输入 出库数量" required v-model="skuPurchase.quantity"></el-input>
        </el-form-item>
        <el-form-item label="出库备注:" prop="createRemark" >
          <el-input placeholder="请输入 出库备注" required v-model="skuPurchase.createRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="save" style="margin-top: 18px" v-bind:disabled="hadSave">出库</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getUserinfo} from '../../vuex/session-storage'
  export default {
    components:{},
    name: "stock_out",
    props: ["attr", "attrName"],
    data: function(){
      return {
        stores: [],
        skuPurchase: {
          storeSelected: '',
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
      this.reChooseStore()
    },
    methods: {
      save() {
        this.$refs.skuPurchase.validate(valid => {
          if(valid){
            this.hadSave = true
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              sku: this.attr,
              departmentId: this.skuPurchase.storeSelected,
              quantity: this.skuPurchase.quantity,
              createRemark: this.skuPurchase.createRemark,
              creater: JSON.parse(getUserinfo()).id
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'order/insertOutStockOrder', postData)
              .then(function (response) {
                if(response.data.success) {
                  this.$layer.msg(response.data.message)
                  this.$emit('outChildClick')
                }else {
                  this.$message(response.data.message);
                  this.hadSave = false
                }
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
      }
    }
  }
</script>

<style scoped>

</style>
