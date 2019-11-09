<template>
  <div>
    <div id="updatePi">
      <el-form :model="purchaseSku" :rules="rules" ref="purchaseSku" label-width="100px" width="35%" style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
        <!--<el-form-item label="商品名称:" prop="attrName" >
          <el-input placeholder="请输入 商品名称" required v-model="purchaseSku.attrName" :disabled="true"></el-input>
        </el-form-item>-->
        <el-form-item label="采购数量:" prop="quantity" >
          <el-input placeholder="请输入 采购数量" required v-model="purchaseSku.quantity"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="save" style="margin-top: 18px" v-bind:disabled="hadSave">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    components:{},
    name: "purchase_modify",
    props: ["attr", "modifyQuantity"],
    data: function(){
      return {
        purchaseSku: {
          quantity: 0,
        },
        hadSave: false,
        addVisible: false,
        rules: {
          quantity: [{required: true, message: '请输入数量', trigger: 'blur'}]
        }
      }
    },
    computed: function() {

    },
    mounted: function () {
      this.purchaseSku.quantity = this.modifyQuantity
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
              quantity: this.purchaseSku.quantity
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'order/update', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('modifyChildClick')
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
