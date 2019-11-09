<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>库存详情</h5>
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
                    <div class="fixed-table-header" style="display: none;">
                      <table></table>
                    </div>
                    <div class="fixed-table-body" style="width: 100%;height: 100%;overflow: auto">
                      <div class="fixed-table-loading" style="top: 38px; display: none;">
                        <img src="/content/image/loading.gif">
                      </div>
                      <el-table
                        :data="purchasStock"
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
                            {{scope.row.skuTypeName}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="picturePath"
                          label="图片">
                          <template slot-scope="scope" >
                            <el-popover trigger="hover" placement="right" width="600">
                              <img :src="$BASE_PICTUREPATH_URL+scope.row.picturePath" style="max-width: 100%; height: auto"/>
                              <img slot="reference" :src="$BASE_PICTUREPATH_URL+scope.row.picturePath"  style="height: 80px; width: 80px;"/>
                            </el-popover>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuName"
                          label="产品名称"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.skuName}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuModel"
                          label="型号"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.skuModel}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="purchasePrice"
                          label="采购价"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.purchasePrice}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="num"
                          label="库存"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{getNumFormat(scope.row)}}
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="ibox-title">
          <h5>库存明细</h5>
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
                    <div class="fixed-table-header" style="display: none;">
                      <table></table>
                    </div>
                    <div class="fixed-table-body" style="width: 100%;height: 100%;overflow: auto">
                      <div class="fixed-table-loading" style="top: 38px; display: none;">
                        <img src="/content/image/loading.gif">
                      </div>
                      <el-table
                        :data="purchasStockRecord"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="type"
                          label="类型"
                          align="center">
                          <template slot-scope="scope" >
                            {{getTypeFormat(scope.row.type)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="quantity"
                          label="数量"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.quantity}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="departmentName"
                          label="门店"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.departmentName}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="time"
                          label="时间"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.time}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="stockQuantity"
                          label="库存"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.stockQuantity}}
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="fixed-table-pagination" style="padding-top: 10px" align="center">
                      <div class="block">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="pageInfo.pageNum"
                          :page-sizes="[6, 12, 18, 24]"
                          :page-size="pageInfo.pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="pageInfo.total">
                        </el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </div>




      </div>
    </div>
  </div>
</template>

<script>
  import {getUserinfo} from '../../vuex/session-storage'
  export default {
    name: 'stock_detail',
    data: function () {
      return {
        sku: this.$route.params.nodetail,
        purchasStock: [],
        purchasStockRecord: [],

        pageInfo: {
          pageNum: 1,
          pageSize: 6,
          startRow: 1,
          endRow: 1,
          total: 1,
          pages: 1,
          prePage: 0,
          nextPage: 2,
          isFirstPage: true,
          isLastPage: true,
          hasPreviousPage: false,
          hasNextPage: true,
          lastPage: 1,
          firstPage: 1
        }
      }
    },
    filters:{
    },
    mounted: function () {
      this.getStockDetail()
      this.getStockRecorDetail(this.pageInfo.pageNum)
    },
    methods: {
      handleSizeChange(val) {
        this.pageInfo.pageSize = val
        this.getStockRecorDetail(this.pageInfo.pageNum)
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val
        this.getStockRecorDetail(this.pageInfo.pageNum)
      },
      getStockDetail (pageNum) {
        var searchAxios = this.$axios.create({
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        })
        var postData = this.$qs.stringify({
          sku: this.sku,
          departmentId: JSON.parse(getUserinfo()).departmentId
        })
        searchAxios.post(this.$BASE_PURCHASE_URL + 'sku/selectBySkuStock', postData)
          .then(function (response) {
            const data = response.data.data;
           this.purchasStock = [data];
          }.bind(this))
      },

      getStockRecorDetail (pageNum) {
        var searchAxios = this.$axios.create({
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        })
        var postData = this.$qs.stringify({
          sku: this.sku,
          pageNum: pageNum,
          pageSize: this.pageInfo.pageSize
        })
        searchAxios.post(this.$BASE_PURCHASE_URL + 'stockRecord/select', postData)
          .then(function (response) {
            this.purchasStockRecord = response.data.data.list;
            this.pageInfo = response.data.data
          }.bind(this))
      },

      getTypeFormat(val) {
        if(val == 1) {
          return '入库'
        }else if(val == 2) {
          return '出库'
        }else {
          return ''
        }
      },

      getNumFormat(val) {
        if(val.purchaseStock == null) {
          return '0'
        }else {
          return val.purchaseStock.num
        }
      }

    }
  }
</script>

<style scoped>
  .tan .el-dialog {
    margin-top: 0px;
    padding-top: 0px;
    width: 80%;
    height: 80%;
  }

  /* element.style {
     margin-top: 0vh
   }*/

  .Tan .el-dialog {
    margin-top: 0px;
    padding-top: 0px;
    width: 80%;
    height: 80%;
  }

  .Summ .el-dialog {
    margin-top: 0px;
    padding-top: 0px;
    width: 80%;
    height: 95%;
  }
</style>
