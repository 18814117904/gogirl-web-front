<template>
  <div>
    <div id="updatePi">
      <el-form :model="purchaseSku" :rules="rules" ref="purchaseSku" label-width="100px" width="35%" style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
        <el-form-item label="商品名称:" prop="attrName" >
          <el-input placeholder="请输入 商品名称" required v-model="purchaseSku.attrName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="关联sku:" prop="sku" >
          <el-input placeholder="请输入 sku" required v-model="purchaseSku.sku"></el-input>
        </el-form-item>
        <el-form-itam>
          <el-button type="primary" plain @click="save" style="margin-top: 18px" v-bind:disabled="hadSave">关联</el-button>
        </el-form-itam>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    name: "purchase_sku",
    props: ["attr", "orderName"],
    data: function(){
      return {
        purchaseSku: {
          attrName: '',
          sku: ''
        },
        hadSave: false,
        addVisible: false,
        rules: {
          attrName: [{required: true, message: '请输入类型', trigger: 'blur'}],
          sku: [{required: true, message: '请输入关联sku', trigger: 'blur'}]
        }
      }
    },
    computed: function() {

    },
    mounted: function () {
      this.purchaseSku.attrName = this.orderName
    },
    methods: {
      save() {
        this.$refs.purchaseSku.validate(valid => {
          if(valid){
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              id: this.attr,
              sku: this.purchaseSku.sku
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'order/linkSku', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('relationChildClick')
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
