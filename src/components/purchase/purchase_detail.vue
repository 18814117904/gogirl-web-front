<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>采购详情</h5>
          <h3 style="float: right; color: rgb(96, 98, 102); padding-right: 15px; cursor: pointer"><div @click="deletePurchase()">删除采购</div></h3>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content">
                <div class="bootstrap-table">
                  <div class="fixed-table-toolbar">
                    <div class="columns columns-right btn-group pull-right">
                    </div>
                  </div>
                  <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="ibox float-e-margins" style="height: 100%;line-height: 35px">

                    <div class="fixed-table-header">

                      采购创建时间:  {{purchasSkuObj.createTime}} <br/>
                      采购来源:  {{getDepName(purchasSkuObj.departmentName)}} <br/>
                      采购发起人: {{purchasSkuObj.createrName}} <br/>
                      采购备注:  {{purchasSkuObj.createRemark}} <br/>

                    </div>
                    </div>
                    <div class="ibox float-e-margins" style="height: 100%;">
                    <div class="fixed-table-body" style="width: 100%;height: 100%;overflow: auto">
                      <div class="fixed-table-loading" style="top: 38px; display: none;">
                        <img src="/content/image/loading.gif">
                      </div>
                      <el-table
                        :data="purchasSku"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="sku"
                          label="sku"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.sku}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuTypeName"
                          label="产品类型"
                          align="center">
                          <template slot-scope="scope" >
                            {{getTypeFormat(scope.row)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="picturePath"
                          label="图片">
                          <template slot-scope="scope" >
                            <span v-if="scope.row.purchaseSku != null">
                              <el-popover trigger="hover" placement="right" width="600">
                              <img :src="$BASE_PICTUREPATH_URL+scope.row.purchaseSku.picturePath" style="max-width: 100%; height: auto"/>
                              <img slot="reference" :src="$BASE_PICTUREPATH_URL+scope.row.purchaseSku.picturePath"  style="height: 80px; width: 80px;"/>
                            </el-popover>
                            </span>
                            <span v-else></span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuName"
                          label="产品名称"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.orderName || scope.row.purchaseSku.skuName}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuModel"
                          label="型号"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.purchaseSku.skuModel}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="quantity"
                          label="采购数量"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.quantity}}
                          </template>
                        </el-table-column>

                        <div v-if="showInQuantity">
                          <el-table-column
                            prop="quantity"
                            label="入库数量"
                            align="center"
                          >
                            <template slot-scope="scope" >
                              {{scope.row.stockNum}}
                            </template>
                          </el-table-column>
                        </div>

                      </el-table>
                    </div>
                  </div>
                  </div>
                </div>
                  <div class="ibox float-e-margins" style="height: 100%;line-height: 35px">

                  <div class="clearfix">

                    采购时间：{{purchasSkuObj.waitPurchaseTime}} <br/>
                    入库时间：{{purchasSkuObj.inStoreTime}} <br/>
                    出库时间：{{purchasSkuObj.outStoreTime}} <br/>
                    收货时间：{{purchasSkuObj.receiveTime}} <br/>
                    收货人：{{purchasSkuObj.receiverName}} <br/>


                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'purchase_detail',
    data: function () {
      return {
        id: this.$route.params.nodetail,
        purchasSku: [],
        purchasSkuObj: {},
        showInQuantity: false
      }
    },
    filters:{
    },
    mounted: function () {
      this.getStockDetail()
    },
    methods: {
      getStockDetail (pageNum) {
        var searchAxios = this.$axios.create({
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        })
        var postData = this.$qs.stringify({
         id : this.id
        })
        searchAxios.post(this.$BASE_PURCHASE_URL + 'order/selectByPrimaryKey', postData)
          .then(function (response) {
            const data = response.data.data;
            this.purchasSkuObj = data
            if(data.departmentName != null && data.departmentName != ''){
              this.showInQuantity = true
            }
            this.purchasSku = [data];
          }.bind(this))
      },

      getTypeFormat(val) {
        if(val.purchaseSku != null) {
          return val.purchaseSku.skuTypeName
        }else {
          return ''
        }
      },

      deletePurchase() {
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: this.$BASE_PURCHASE_URL + "order/delete",
            method: "get",
            params: {
              id: this.id
            }
          }).then(res => {
            if (res.data.success == true) {
              this.$router.push({
                path: "purchase_index"
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })

      },

      getDepName(val) {
        if(val == null || val == '') {
          return '仓库'
        }else {
          return val
        }
      }

    }
  }
</script>

<style scoped>

</style>
