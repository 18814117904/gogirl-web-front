<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>采购列表</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <label >产品类型</label>
                      <el-select filterable placeholder="请选择 类型" v-model="typeSelected" @change="reChooseSkuType" style="max-width:100%;">
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
                      <label >采购状态</label>
                      <el-select filterable placeholder="请选择 状态" v-model="statusSelected" style="max-width:100%;">
                        <el-option label="请选择 状态"  value="" />
                        <el-option label="待采购"  value="1" />
                        <el-option label="采购中"  value="2" />
                        <el-option label="待入库"  value="3" />
                        <el-option label="待出库"  value="4" />
                        <el-option label="待收货"  value="5" />
                        <el-option label="已完成"  value="6" />
                      </el-select>
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <label >店铺选择</label>
                      <el-select filterable placeholder="请选择 店铺" v-model="storeSelected" @change="reChooseStore" style="max-width:100%;">
                        <el-option label="请选择 店铺"  value="" />
                        <el-option label="仓库" value="0" />
                        <el-option
                          v-for="store in stores"
                          :key="store.id"
                          :label="store.name"
                          :value="store.id">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <label >产品名称</label>
                      <input class="form-control" placeholder="产品名称" type="text" v-model="orderNameForSearch">
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
                        :data="purchaseOrder"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="sku"
                          label="sku"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.sku}}
                            <br/> <span v-if="scope.row.purchaseSku != null && (scope.row.purchaseStock == null || scope.row.purchaseStock.num < scope.row.quantity)" style="background-color: #f57777">&nbsp&nbsp{{scope.row.purchaseStock == null ? "0" : scope.row.purchaseStock.num}} / {{scope.row.quantity}}&nbsp&nbsp</span>
                            <span v-if="scope.row.purchaseSku != null && scope.row.purchaseStock != null && scope.row.purchaseStock.num >= scope.row.quantity" style="background-color: #8fbfef">&nbsp&nbsp{{scope.row.purchaseStock == null ? "0" : scope.row.purchaseStock.num}} / {{scope.row.quantity}}&nbsp&nbsp</span>
                          </template>
                        </el-table-column>



                        <el-table-column
                          prop="picturePath"
                          label="图片">
                          <template slot-scope="scope" >
                              <div v-if="scope.row.purchaseSku != null">
                                <el-popover trigger="hover" placement="right" width="600">
                              <img :src="$BASE_PICTUREPATH_URL+scope.row.purchaseSku.picturePath" style="max-width: 100%; height: auto"/>
                              <img slot="reference" :src="$BASE_PICTUREPATH_URL+scope.row.purchaseSku.picturePath"  style="height: 80px; width: 80px;"/>
                            </el-popover>
                              </div>
                            <div v-else>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="orderName"
                          label="产品名称"
                          align="center"
                       >
                          <template slot-scope="scope" >
                              {{formatter(scope.row)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="skuTypeName"
                          label="型号"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{getSKUType(scope.row)}}
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
                        <el-table-column
                          prop="createTime"
                          label="申请时间"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.createTime}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="departmentName"
                          label="采购来源"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{getDepartment(scope.row.departmentName)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="采购状态"
                          align="center"
                          >
                          <template slot-scope="scope" >
                            {{getPurchaseStatus(scope.row.status)}}
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-link type="primary" @click="detail(scope.row.id)">详情</el-link>
                            <el-link v-if="scope.row.sku != null && scope.row.sku != '' && (scope.row.status == 1 || scope.row.status == 2)" type="success" @click="modify(scope.row.id, scope.row.quantity)">修改</el-link>
                            <el-button-group>
                            <el-button v-if="scope.row.status == 1 && (scope.row.sku == null || scope.row.sku == '')" type="warning" @click="relation(scope.row.id, scope.row.orderName)">关联sku</el-button>
                            <el-button v-if="scope.row.status == 1 && scope.row.sku != null && scope.row.sku != ''" type="danger" @click="confirm(scope.row)">确认采购</el-button>
                              <el-button v-if="scope.row.status == 2 && scope.row.sku != null" type="danger" @click="finish(scope.row.id, scope.row.quantity, scope.row.departmentName)">采购完成</el-button>
                              <el-button v-if="scope.row.status == 3" type="danger" @click="inStock(scope.row.id)">入库</el-button>
                              <el-button v-if="scope.row.status == 4" type="danger" @click="outStock(scope.row.id)">出库</el-button>
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
          <el-dialog title="采购完成" :visible.sync="finishVisible" v-if='finishVisible' >
            <purchase_finish :attr="nodetail" :depName="depName" :modifyQuantity="modifyQuantity" v-on:childClick="childClick" ></purchase_finish>
          </el-dialog>
        </div>

        <div>
          <el-dialog title="关联sku" :visible.sync="relationVisible" v-if='relationVisible' >
            <purchase_sku :attr="nodetail" :orderName="orderName" v-on:relationChildClick="relationChildClick" ></purchase_sku>
          </el-dialog>
        </div>

        <div>
          <el-dialog title="修改采购数量" :visible.sync="modifyVisible" v-if='modifyVisible' >
            <purchase_modify :attr="nodetail" :modifyQuantity="modifyQuantity" v-on:modifyChildClick="modifyChildClick" ></purchase_modify>
          </el-dialog>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import purchase_finish from '@/components/purchase/purchase_finish'
  import purchase_sku from '@/components/purchase/purchase_sku'
  import purchase_modify from '@/components/purchase/purchase_modify'
  export default {
    components: {purchase_finish, purchase_sku, purchase_modify},
    name: 'purchase_index',
    data: function () {
      return {
        stores: [],
        skuTypes: [],
        purchaseOrder: [],
      /*{
        id: '',
          sku: '',
        purchaseSku: {
        picture_path: '',
          skuName: '',
          skuTypeName: ''
      },
        orderName: '',
          creater: '',
        price: 0,
        quantity: 0,
        departmentName: '',
        status: '',
        createTime: '',
        waitPurchaseTime: '',
        purchaseTime: '',
        inStoreTime: '',
        outStoreTime: '',
        receiveTime: '',
        receiverName: '',
        createRemark: '',
        receiveRemark: ''
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
        statusSelected: '',
        storeSelected: '',
        orderNameForSearch: '',
        nodetail: '',
        orderName: '',
        depName: '',
        modifyQuantity: 0,
        isDoubleClick: false,
        finishVisible: false,
        relationVisible: false,
        modifyVisible: false
      }
    },
    filters:{

    },
    mounted: function () {
      this.getAllPurchasingPlan(this.pageInfo.pageNum)
      this.reChooseStore()
      this.reChooseSkuType()
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
      formatter: function(row){
        if(row.purchaseSku != null) {
          return row.purchaseSku.skuName
        }else{
          return row.orderName
        }
      },
      getSKUType: function(row) {
        if(row.purchaseSku != null) {
          return row.purchaseSku.skuModel
        }else{
          return ''
        }
      },
      getDepartment: function(val) {
        if(val == null || val == '') {
          return '仓库'
        }else{
          return val
        }
      },
      getPurchaseStatus: function(row) {
        if(row == 1) {
          return '待采购'
        }else if(row == 2) {
          return '采购中'
        }else if(row == 3) {
          return '待入库'
        }else if(row == 4) {
          return '待出库'
        }else if(row ==5) {
          return '待收货'
        }else if(row == 6) {
          return '已完成'
        }
      },
      // 采购详情
      detail: function (no) {
          this.$router.push({ name: 'purchasedetail',params: {nodetail: no } })
      },
      getAllPurchasingPlan: function (pageNum) {
        var url = this.$BASE_PURCHASE_URL + 'order/selectGogirlStock'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            if(response.data.data.list == null) {
              this.purchaseOrder = []
            }else {
              this.purchaseOrder = response.data.data.list
            }
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },
      // 搜索 ============================================================================================================
      search (pageNum) {
        this.orderNameForSearch = this.orderNameForSearch.replace(/(^\s*)|(\s*$)/g, '')
        if (this.orderNameForSearch === '' && this.typeSelected === '' && this.storeSelected === '' && this.statusSelected === '') {
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
          status: this.statusSelected,
          skuType: this.typeSelected,
          departmentId: this.storeSelected,
          orderName: this.orderNameForSearch,
          pageNum: pageNum,
          pageSize: this.pageInfo.pageSize
        })
        searchAxios.post(this.$BASE_PURCHASE_URL + 'order/selectGogirlStock', postData)
          .then(function (response) {
            if(response.data.data.list == null) {
              this.purchaseOrder = []
            }else {
              this.purchaseOrder = response.data.data.list
            }
            this.pageInfo = response.data.data
          }.bind(this))
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
      },

      reChooseSkuType () {
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

      confirm(no) {
        /*if(no.purchaseStock != null && no.purchaseStock.num >= no.quantity) {
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'order/orderOutStock',{
            params: {
              id: no.id
            }
          }).then(function (response) {
            this.$layer.msg(response.data.message)
            this.getAllPurchasingPlan(this.pageInfo.pageNum)
          }.bind(this))
        }else{*/
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'order/updatePurchasing',{
            params: {
              id: no.id
            }
          }).then(function (response) {
            this.$layer.msg(response.data.message)
            this.getAllPurchasingPlan(this.pageInfo.pageNum)
          }.bind(this))
       /* }*/
      },

      inStock(no) {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'order/orderInStock',{
          params: {
            id: no
          }
        }).then(function (response) {
          this.$layer.msg(response.data.message)
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        }.bind(this))
      },

      outStock(no) {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PURCHASE_URL + 'order/orderOutStock',{
          params: {
            id: no
          }
        }).then(function (response) {
          this.$layer.msg(response.data.message)
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        }.bind(this))
      },

      finish(no, val, depName) {
        this.nodetail = no
        this.modifyQuantity = val
        this.depName = depName
        this.finishVisible = true
      },

      childClick() {
        this.finishVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },

      relation(no, val) {
        this.nodetail = no
        this.orderName = val
        this.relationVisible = true
      },

      relationChildClick() {
        this.relationVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },

      modify(no, val) {
        this.nodetail = no
        this.modifyQuantity = val
        this.modifyVisible = true
      },

      modifyChildClick() {
        this.modifyVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
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

  element.style {
    margin-top: 0vh
  }

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
