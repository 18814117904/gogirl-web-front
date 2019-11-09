<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>sku类型</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="add(1)">
                        <i class="fa fa-plus"></i>&nbsp;新建类型
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
                        :data="skuType"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="name"
                          label="类型名称"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="createTime"
                          label="新增时间"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.createTime}}
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="primary" @click="modify(scope.row.id, scope.row.name)">修改</el-button>
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
          <el-dialog title="修改类型" :visible.sync="modifyVisible" v-if='modifyVisible' style=" z-index: 10000; width: 100%; height: 90%" center>
            <skutype_modify :attr="nodetail" :attrname="typename" v-on:modifyChildClick="modifyChildClick" ></skutype_modify>
          </el-dialog>
        </div>

        <div>
          <el-dialog title="新建类型" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%">
            <skutype_new v-on:addChildClick="addChildClick" ></skutype_new>
          </el-dialog>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import skutype_new from '@/components/skutype/skutype_new'
  import skutype_modify from '@/components/skutype/skutype_modify'
  export default {
    components: {skutype_new, skutype_modify},
    name: 'skutype_index',
    data: function () {
      return {
        skuType: [],
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
        nodetail: '',
        typename: '',
        modifyVisible: false,
        addVisible: false
      }
    },
    filters:{

    },
    mounted: function () {
      this.getAllPurchasingPlan(this.pageInfo.pageNum)
    },
    methods: {
      handleSizeChange(val) {
        this.pageInfo.pageSize = val
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },


      getAllPurchasingPlan: function (pageNum) {
        var url = this.$BASE_PURCHASE_URL + 'skuType/select'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            this.skuType = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },

      modify(no, name) {
        this.nodetail = no
        this.typename = name
        this.modifyVisible = true
      },

      modifyChildClick() {
        this.modifyVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },

      add() {
        this.addVisible = true
      },

      addChildClick() {
        this.addVisible = false
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
