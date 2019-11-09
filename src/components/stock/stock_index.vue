<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>库存列表</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <label >产品类型</label>
                      <el-select filterable placeholder="请选择 类型" v-model="typeSelected" @change="reChooseType" style="max-width:100%;">
                        <el-option label="请选择 类型"  value="" />
                        <el-option
                          v-for="skuType in skuTypes"
                          :key="skuType.id"
                          :label="skuType.name"
                          :value="skuType.id">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <label >sku</label>
                      <input class="form-control" placeholder="sku" type="text" v-model="skuForSearch">
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <label >产品名称</label>
                      <input class="form-control" placeholder="产品名称" type="text" v-model="skuNameForSearch">
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                            {{scope.row.sku}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuTypeName"
                          label="产品类型"
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                            {{scope.row.skuTypeName}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="picturePath"
                          label="图片"
                          width="180">
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
                          prop="num"
                          label="库存"
                          align="center"
                          >
                          <template slot-scope="scope" >
                            {{getNumFormat(scope.row)}}
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="primary" @click="detail(scope.row.sku)">详情</el-button>
                            <el-button type="success" @click="purchase(scope.row.sku, scope.row.skuName)">采购</el-button>
                              <el-button type="danger" @click="out(scope.row.sku, scope.row.skuName)">出库</el-button>
                            </el-button-group>
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

        <div>
          <el-dialog title="商品出库" :visible.sync="outVisible" v-if='outVisible'>
            <stock_out :attr="skudetail" :attrName="attrName" v-on:outChildClick="outChildClick" ></stock_out>
          </el-dialog>
        </div>

        <div>
          <el-dialog title="商品采购" :visible.sync="purchaseVisible" v-if='purchaseVisible'>
            <stock_purchase :attr="skudetail" :attrName="attrName" v-on:purchaseChildClick="purchaseChildClick" ></stock_purchase>
          </el-dialog>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import stock_out from '@/components/stock/stock_out'
  import stock_purchase from '@/components/stock/stock_purchase'
  import {getUserinfo} from '../../vuex/session-storage'
  export default {
    components: {stock_out, stock_purchase},
    name: 'purchase_index',
    data: function () {
      return {
        skuTypes: [],
        purchasStock: [],
      /*{
        id: '',
          sku: '',
        purchaseSku: {
        picture_path: '',
          skuName: '',
          skuTypeName: '',
          skuModel: ''
      },
        num: '',
          remark: ''
      }*/
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
        },
        typeSelected: '',
        skuForSearch: '',
        skuNameForSearch: '',
        nodetail: '',
        skudetail: '',
        attrName: '',
        isDoubleClick: false,
        outVisible: false,
        purchaseVisible: false,
      }
    },
    filters:{

    },
    mounted: function () {
      this.getAllPurchasingPlan(this.pageInfo.pageNum)
      this.reChooseType()
    },
    methods: {
      handleSizeChange(val) {
        this.pageInfo.pageSize = val
        this.search(this.pageInfo.pageNum)
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val
        this.search(this.pageInfo.pageNum)
      },
      // 库存详情
      detail: function (no) {
        this.$router.push({ name: 'stockdetail',params: {nodetail: no } })
      },
      getAllPurchasingPlan: function (pageNum) {
        var url = this.$BASE_PURCHASE_URL + 'sku/selectWithStock'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            departmentId: JSON.parse(getUserinfo()).departmentId,
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            if(response.data.data.list == null) {
              this.purchasStock = []
            }else {
              this.purchasStock = response.data.data.list
            }
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },
      // 搜索 ============================================================================================================
      search (pageNum) {
        this.skuNameForSearch = this.skuNameForSearch.replace(/(^\s*)|(\s*$)/g, '')
        if (this.skuNameForSearch === '' && this.typeSelected === '' && this.skuForSearch === '') {
          this.getAllPurchasingPlan(pageNum)
        } else {
          this.doSearch(pageNum)
        }
      },
      doSearch (pageNum) {
        var searchAxios = this.$axios.create({
          headers: {'content-type': 'application/x-www-form-urlencoded'}
        })
        var postData = this.$qs.stringify({
          skuName: this.skuNameForSearch,
          sku: this.skuForSearch,
          skuType: this.typeSelected,
          departmentId: JSON.parse(getUserinfo()).departmentId,
          pageNum: pageNum,
          pageSize: this.pageInfo.pageSize
        })
        searchAxios.post(this.$BASE_PURCHASE_URL + 'sku/selectWithStock', postData)
          .then(function (response) {
            if(response.data.data.list == null) {
              this.purchasStock = []
            }else {
              this.purchasStock = response.data.data.list
            }
            this.pageInfo = response.data.data
          }.bind(this))
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

      out(no, valName) {
        this.skudetail = no
        this.attrName = valName
        this.outVisible = true
      },

      outChildClick() {
        this.outVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },

      purchase(no, valName) {
        this.skudetail = no
        this.attrName = valName
        this.purchaseVisible = true
      },

      purchaseChildClick() {
        this.purchaseVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
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
