<template>
  <div>
    <div id="updatePi">
      <el-form :model="purchasSku" :rules="rules" ref="purchasSku" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <!--<h3 style="margin-top:20px;">新增员工</h3>-->
            <table class="table table-hover">
              <tbody>
              <tr>
                <td >
                  <el-form-item label="sku:" prop="sku" >
                <span>
              <el-input placeholder="请输入 sku" required v-model="purchasSku.sku" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="型号:" prop="skuModel">
                <span>
                 <el-input placeholder="请输入 型号" v-model="purchasSku.skuModel" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td >
                  <el-form-item label="门店单价:" prop="shopPrice" >
                <span>
              <el-input placeholder="请输入 门店单价" required v-model="purchasSku.shopPrice" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="采购单价:" prop="purchasePrice">
                <span>
                 <el-input placeholder="请输入 采购单价" v-model="purchasSku.purchasePrice" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td>
                  <el-form-item label="标签:" prop="useType">
                <span>
                 <el-select filterable placeholder="请选择 标签" v-model="purchasSku.useType" style="max-width:100%;">
                <el-option label="店用产品" :value="1"/>
                   <el-option label="售卖商品" :value="2"/>
              </el-select>
                </span>
                  </el-form-item>
                </td>

                <td >
                  <el-form-item label="类型:" prop="skuType" >
                <span>
              <el-select filterable placeholder="请选择 类型" v-model="purchasSku.skuType" @change="reChooseType" style="max-width:100%;">
                <el-option
                  v-for="skuType in skuTypes"
                  :key="skuType.id"
                  :label="skuType.name"
                  :value="skuType.id">
                </el-option>
              </el-select>
            </span>
                  </el-form-item>
                </td>
              </tr>



              <tr>
                <td>
                  <el-form-item label="产品名称:" prop="skuName">
                <span>
                 <el-input placeholder="请输入 产品名称" v-model="purchasSku.skuName" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="供应商:" prop="supplier" >
                <span>
              <el-input type="textarea" placeholder="请输入 供应商" :autosize="{ minRows: 2, maxRows: 4}" required v-model="purchasSku.supplier" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <!--<td>
                </td>-->
              </tr>

              <tr>
                <td colspan="4">
                  <span style="color: red">图片：</span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span>
                    <div style="float: left">
                    <span v-if="PIC != '' && imageShow == true" v-for="pic in PIC">
                      <el-popover trigger="hover" placement="right" width="600">
                              <img :src="$BASE_PICTUREPATH_URL+pic" style="max-width: 100%; height: auto"/>
                              <img slot="reference" :src="$BASE_PICTUREPATH_URL+pic"  style="height: 80px; width: 80px;"/>
                            </el-popover>
                      <!--<img style="height: 80px; width: 80px;" :src="$BASE_PICTUREPATH_URL+pic" />-->
                    </span>
                  </div>
                      <uploader v-on:childByValue="childByValue"></uploader>
                    </span>
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
  import uploader from "@/components/uploadpicture/uploaderone.vue"
  export default {
    components:{
      uploader
    },
    name: "sku_modify",
    props: ["attr"],
    data: function(){
      return {
        skuTypes: [],
        purchasSku: {
          id: '',
          sku: '',
          picturePath: '',
          useType: '',
          skuType: '',
          skuName: '',
          skuTypeName: '',
          skuModel: '',
          shopPrice: 0,
          purchasePrice: 0,
          supplier: ''
        },
        hadSave: false,
        //获取图片数组
        picArr:[],
        //筛选图片
        addVisible: false,
        imageShow: true,
        PIC: [],
        rules: {
          sku: [{required: true, message: '请输入sku', trigger: 'blur'}],
          skuModel: [{required: true, message: '请输入型号', trigger: 'blur'}],
          skuName: [{required: true, message: '请输入产品名称', trigger: 'blur'}],
          skuType: [{required: true, message: '请输入类型', trigger: 'blur'}],
          shopPrice: [{required: true, message: '请输入门店单价', trigger: 'blur'}],
          purchasePrice: [{required: true, message: '请输入采购单价', trigger: 'blur'}],
          supplier: [{required: true, message: '请输入供应商', trigger: 'blur'}],
          useType: [{required: true, message: '请选择标签', trigger: 'blur'}]
        }
      }
    },
    mounted: function () {
      this.reChooseType()
      this.getSkuDetail()
    },
    methods: {
      childByValue(val){
        this.picArr = val
        this.imageShow = false
      },
      save() {
        this.$refs.purchasSku.validate(valid => {
          if (valid) {
        this.hadSave = true
        const formData = new FormData()
        var temp = this.picArr;
        temp.forEach((item) => {
          formData.append("picData", item.file)
        })
            formData.append("id", this.attr)
            formData.append("sku", this.purchasSku.sku)
            formData.append("skuType", this.purchasSku.skuType)
            formData.append("skuModel", this.purchasSku.skuModel)
            formData.append("skuName", this.purchasSku.skuName)
            formData.append("shopPrice", this.purchasSku.shopPrice)
            formData.append("purchasePrice", this.purchasSku.purchasePrice)
            formData.append("supplier", this.purchasSku.supplier)
            formData.append("useType", this.purchasSku.useType)
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        var that = this;
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
        ajax.open('post',that.$BASE_PURCHASE_URL + 'sku/update',true);
        ajax.withCredentials = true;
        ajax.crossDomain = true;
        //步骤三:发送请求
        ajax.send(formData);
        //步骤四:注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
          if (ajax.readyState==4 &&ajax.status==200) {
            var response = JSON.parse(ajax.responseText);
            if(response.success==true){
              that.$layer.msg("提交成功！")
                that.hadSave = true
              that.$emit('modifyChildClick')
            }else{
              that.$layer.msg("提交失败！ "+ response.message)
              that.hadSave = false
              that.$emit('modifyChildClick')
            }
          }
        }

          }else {
            return false
          }
        })
      },
      reChooseType () {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'skuType/select',{
          params: {
            pageNum: 1,
            pageSize: 10
          }
        }).then(function (response) {
          this.skuTypes = response.data.data.list
        }.bind(this))
      },
      getSkuDetail () {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'sku/selectByPrimaryKey',{
          params: {
            id: this.attr
          }
        }).then(function (response) {
          this.purchasSku = response.data.data
          this.PIC = response.data.data.picturePath.split(",")
        }.bind(this))
      }
    }
  }
</script>

<style scoped>

</style>
