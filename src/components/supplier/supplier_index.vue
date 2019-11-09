<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>供应商列表</h5>
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
                      <label >供应商名称</label>
                      <input class="form-control" placeholder="供应商名称" type="text" v-model="supplierNameForSearch">
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                      <button type="button" class="btn btn-sm btn-danger" @click="add(1)">
                        <i class="fa fa-plus"></i>&nbsp;新增供应商
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
                        :data="supplier"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="supplierName"
                          label="供应商名称"
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                            {{scope.row.supplierName}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="largeType"
                          label="主营大类"
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                            {{scope.row.largeType}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="smallType"
                          label="细类"
                          align="center"
                       >
                          <template slot-scope="scope" >
                              {{scope.row.smallType}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="contactName"
                          label="联系人"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.contactName}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="phone"
                          label="联系电话"
                          align="center"
                          >
                          <template slot-scope="scope" >
                            {{scope.row.phone}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="address"
                          label="联系地址"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.address}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="status"
                          label="状态"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{formatStatus(scope.row.status)}}
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                              <el-button type="danger" @click="modify(scope.row.id)">修改</el-button>
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
          <el-dialog title="新增供应商" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%" center>
            <supplier_new :attr="nodetail" v-on:addChildClick="addChildClick" ></supplier_new>
          </el-dialog>
        </div>

        <div>
          <el-dialog title="修改供应商" :visible.sync="modifyVisible" v-if='modifyVisible' style=" z-index: 10000; width: 100%; height: 90%" center>
            <supplier_modify :attr="nodetail" v-on:modifyChildClick="modifyChildClick" ></supplier_modify>
          </el-dialog>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import supplier_new from '@/components/supplier/supplier_new'
  import supplier_modify from '@/components/supplier/supplier_modify'
  export default {
    components: {supplier_new, supplier_modify},
    name: 'purchase_index',
    data: function () {
      return {
        skuTypes: [],
        supplier: [{
          id: '',
          supplierName: '',
          largeType: '',
          smallType: '',
          contactName: '',
          phone: '',
          address: '',
          status: '',
          remark: ''
        }],
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
        supplierNameForSearch: '',
        nodetail: '',
        isDoubleClick: false,
        addVisible: false,
        modifyVisible: false,
      }
    },
    filters:{

    },
    mounted: function () {
      this.getAllPurchasingPlan(this.pageInfo.pageNum)
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
      formatStatus: function(row){
        if(row == 1) {
          return '使用'
        }else if(row == 2) {
          return '停用'
        }else{
          return ''
        }
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
      getAllPurchasingPlan: function (pageNum) {
        var url = this.$BASE_PURCHASE_URL + 'supplier/select'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            this.supplier = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },
      // 搜索 ============================================================================================================
      search (pageNum) {
        alert("==========" + search(pageNum))
        this.supplierNameForSearch = this.supplierNameForSearch.replace(/(^\s*)|(\s*$)/g, '')
        if (this.supplierNameForSearch === '' && this.typeSelected === '') {
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
          name: this.serveNameForSearch,
          type: this.serveTypeSelected,
          pageNum: pageNum,
          pageSize: this.pageInfo.pageSize
        })
        searchAxios.post(this.$BASE_URL + 'serve/queryServeAllForPage/', postData)
          .then(function (response) {
            this.serves = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
      },

      add(no) {
        this.nodetail = no
        this.addVisible = true
      },

      addChildClick() {
        this.addVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },

      modify(no) {
        this.nodetail = no
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
