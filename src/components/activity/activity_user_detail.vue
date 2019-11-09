<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title" style="align-self: right">
         <!-- <h5>活动名称：{{activityUserDetailIndex.name}}</h5>   领取人数：{{activityUserDetailIndex.recipientNumber}}-->
      <!--    <button type="button" class="btn btn-sm btn-success" style="align-self: right" @click="detailDate()">
            <i class="fa fa-search"></i>&nbsp;用户详情
          </button>-->
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content">
                <div class="bootstrap-table">
                  <div class="fixed-table-toolbar">
                    <div class="columns columns-right btn-group pull-right">
                      <!--<button class="btn btn-default" type="button" name="refresh" title="刷新" @click="getAllPurchasingPlan(pageInfo.pageNum)">
                        <i class="glyphicon glyphicon-refresh icon-refresh"></i>
                      </button>-->
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
                        :data="activityUserDetail"
                        style="width: 100%"
                        stripe
                      >

                        <el-table-column
                          prop="storeRecordRealName"
                          label="用户名字"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.customer.storeRecordRealName}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="participationTime"
                          label="参与时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.participationTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="collectTime"
                          label="领取时间"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.collectTime}}
                          </template>
                        </el-table-column>

                      </el-table>

                    </div>
                    <div class="fixed-table-footer" style="display: none;">
                      <table>
                        <tbody>
                        <tr></tr>
                        </tbody>
                      </table>
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
          <!-- /.page-content -->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "activety_summary",
      props: ["activityUserDetailIndex"],
      components: {},
      data: function () {
        return {
          activityUserDetail: [],
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
          nodetail: ''
        }
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
          var url = this.$BASE_STORE_URL + 'activityCustomer/queryActivityCustomerForPage'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              response.data.data.list.forEach(function(item,index){
                if(item.customer.storeRecordRealName==null || item.customer.storeRecordRealName == ''){
                  if(item.customer.realName == null || item.customer.realName == ""){
                    item.customer.storeRecordRealName = item.customer.nickname
                  }else{
                    item.customer.storeRecordRealName = item.customer.realName
                  }
                }
              })
              this.activityUserDetail = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        }
      }
    }
</script>

<style scoped>
</style>
<style>

  .Tan .el-dialog {
    margin-top: 0px;
    padding-top: 0px;
    width: 80%;
    height: 80%;
  }
</style>
