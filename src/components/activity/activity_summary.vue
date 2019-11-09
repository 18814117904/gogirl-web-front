<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title" style="text-align: right">
         <!-- -->
          <h5 style="text-align: center; margin: 0px; line-height: 1.5; padding-left: 30px; color: red">活动名称：{{activitySummaryIndex.name}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <!--领取人数：{{activitySummaryIndex.recipientNumber}}--></h5>
          <!--<button type="button" class="btn btn-sm btn-success" style="text-align: right" @click="detailDate()">
            用户详情
          </button>-->
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

                      <el-table :data="tableList">
                        <el-table-column :label="head" v-for="(head, key) in header" :key="head">
                          <template slot-scope="scope">
                            {{tableList[scope.$index]['keyword'+(key+1)]}}
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
      components: {},
      data: function () {
        return {
          activitySummary: [],
          tableList: [],
          header: [],
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
          activitySummaryIndex: JSON.parse(this.$route.query.activitySummaryIndex)

        }
      },
      mounted: function () {
        console.log(this.$route.query.activitySummaryIndex)
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
          // alert();

          var url = this.$BASE_STORE_URL + 'activitySummary/queryDynamicDetailForPage'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              activityId: this.activitySummaryIndex.id,
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              if(response.data.data.list != null) {
                this.tableList = response.data.data.list
              }
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })

          var url = this.$BASE_STORE_URL + 'activitySummary/queryDynamicHead'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              activityId: this.activitySummaryIndex.id
            }
          })
            .then(function (response) {
              let headObj = response.data.data
              let lengthHead;
              if(headObj != null) {
                lengthHead = headObj["menuNumber"];
              }else if(headObj == null) {
                lengthHead = 0;
              }
              let headArray = [];
              for(var i = 0; i < lengthHead; i++) {
                headArray[i] = headObj["keyword"+(i+1)];
              }
              this.header = headArray
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        detailDate () {
          this.$emit('summaryClick')
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
