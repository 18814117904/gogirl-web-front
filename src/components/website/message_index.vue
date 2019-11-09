<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>官网留言</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <!--<div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="add(1)">
                        <i class="fa fa-plus"></i>&nbsp;新建动态
                      </button>
                    </div>
                  </div>
                </form>
              </div>-->
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
                        :data="message"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="name"
                          label="姓名"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="phone"
                          label="电话号码"
                          align="center">
                          <template slot-scope="scope" >
                            {{scope.row.phone}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="address"
                          label="地址"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.address}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="message"
                          label="内容"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.message}}
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
  export default {
    components: {},
    name: 'message_index',
    data: function () {
      return {
        message: [],
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
        storeSelected: '',
        skuForSearch: '',
        skuNameForSearch: '',
        nodetail: '',
        attrName: '',
        isDoubleClick: false,
        modifyVisible: false,
        addVisible: false
      }
    },
    filters:{

    },
    mounted: function () {
      this.getAllPurchasingPlan(this.pageInfo.pageNum)
      this.changeStatus()
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
        var url = this.$BASE_PATH + 'websiteLeaveMessage/select'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            this.message = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },

      changeStatus() {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PATH + 'websiteLeaveMessage/setIsRead',{
          params: {
          }
        }).then(function (response) {
          if(response.data.data != 0) {
            this.message = true
          }else {
            this.message = false
          }
        }.bind(this))
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
