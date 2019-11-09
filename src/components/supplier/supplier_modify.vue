<template>
  <div>
    <div id="updatePi">
      <el-form :model="supplier" :rules="rules" ref="supplier" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <table class="table table-hover">
              <tbody>
              <tr>
                <td >
                  <el-form-item label="供应商名称:" prop="supplierName" >
                <span>
              <el-input placeholder="请输入供应商名称" required v-model="supplier.supplierName" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系人:" prop="contactName">
                <span>
                  <el-input placeholder="请输入 联系人" v-model="supplier.contactName" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="联系电话:" prop="phone">
                <span>
                  <el-input placeholder="请输入 联系电话" v-model="supplier.phone" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系地址:" prop="address">
                <span>
                  <el-input placeholder="请输入 联系地址" v-model="supplier.address" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="主营大类:" prop="largeType">
                <span>
                  <el-input placeholder="请输入 主营大类" v-model="supplier.largeType" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="细分:" prop="smallType">
                <span>
                  <el-input placeholder="请输入 细分" v-model="supplier.smallType" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="状态:" prop="status">
                    <span>
                  <el-select filterable placeholder="请选择 状态" v-model="supplier.status" style="max-width:100%;">
                    <el-option label="使用"  :value="1" />
                    <el-option label="停用" :value="2" />
                    </el-select>
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
        supplier: {
          id: '',
          supplierName: '',
          largeType: '',
          smallType: '',
          contactName: '',
          phone: '',
          address: '',
          status: '1',
          remark: ''
        },
        hadSave: false,
        rules: {
          supplierName: [{required: true, message: '请输入供应商称', trigger: 'blur'}],
          contactName: [{required: true, message: '请输入联系人'}],
          phone: [{required: true, message: '请输入联系电话'}],
          address: [{required: true, message: '请输入联系地址', trigger: 'blur'}],
          largeType: [{required: true, message: '请输入主营大类', trigger: 'blur'}],
          smallType: [{required: true, message: '请输入细分', trigger: 'blur'}],
          status: [{required: true, message: '请选择 状态', trigger: 'blur'}]
        }
      }
    },
    mounted () {
      this.getSupplierDetail()
    },
    methods: {
      save() {
        this.$refs.supplier.validate(valid => {
          if (valid) {
            this.hadSave = true
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              id: this.attr,
              supplierName: this.supplier.supplierName,
              contactName: this.supplier.contactName,
              phone: this.supplier.phone,
              address: this.supplier.address,
              largeType: this.supplier.largeType,
              smallType: this.supplier.smallType,
              status: this.supplier.status
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'supplier/update', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('modifyChildClick')
              }.bind(this))
          }else {
            return false
          }
        })
      },

      getSupplierDetail() {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'supplier/selectByPrimaryKey',{
          params: {
           id: this.attr
          }
        }).then(function (response) {
          this.supplier = response.data.data
        }.bind(this))
      }

    }
  }
</script>

<style scoped>

</style>
