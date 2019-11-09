<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>活动管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="create()">
                        <i class="fa fa-plus"></i>&nbsp;新建活动
                      </button>
                    </div>
                  </div>
                </form>
              </div>

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
                        :data="activity"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="name"
                          label="活动名称"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="startTime"
                          label="开始时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.startTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="endTime"
                          label="结束时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.endTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="participantsNumber"
                          align="center"
                          label="参与人数"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.participantsNumber}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="status"
                          align="center"
                          label="状态"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.status | getStatus(scope.row.status)}}
                          </template>
                        </el-table-column>

                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="danger" plain @click="updateDate(scope.row.id)">修改</el-button>
                            <el-button type="primary" plain >
                              <span v-if="scope.row.id == 6">
                                <router-link tag="a" target="_blank" to="/activity/activityuser">详情</router-link>
                              </span>
                              <span v-else>
                                <router-link tag="a" target="_blank" :to="{name:'activity_summary',query:{activitySummaryIndex:JSON.stringify({id:scope.row.id, name:scope.row.name, recipientNumber: scope.row.recipientNumber})}}">详情</router-link>
                              </span>
                            </el-button>
                            </el-button-group>
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

        <div class="tan" v-dialogDrag>
          <el-dialog title="新增活动" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%" center>  <!-- v-if='addVisible'   width="70%"-->
            <activity_new v-on:childClick="childClick" ></activity_new>
          </el-dialog>
        </div>

        <div class="Tan" v-dialogDrag>
          <el-dialog title="修改活动" :visible.sync="UpDatePic" v-if='UpDatePic' style=" z-index: 10000; width: 100%; height: 90%" center>
            <activity_modify :attr="nodetail" v-on:updateClick="updateClick"></activity_modify>
          </el-dialog>
        </div>

        <div class="Summ" v-dialogDrag>
          <el-dialog title="活动详情" :visible.sync="summaryDate" v-if='summaryDate' style=" z-index: 10000; width: 100%; height: 90%" center>
            <activity_summary :activitySummaryIndex="activitySummaryIndex" v-on:summaryClick="summaryClick"></activity_summary>
          </el-dialog>
        </div>

        <div class="Summ" v-dialogDrag>
          <el-dialog title="活动用户详情" :visible.sync="summaryUserDate" v-if='summaryUserDate' style=" z-index: 10000; width: 100%; height: 90%" center>
            <activity_user_detail :activityUserDetail="activityUserDetail"></activity_user_detail>
          </el-dialog>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import activity_modify from '@/components/activity/activity_modify'
  import activity_new from '@/components/activity/activity_new'
  import activity_summary from '@/components/activity/activity_summary'
  import activity_user_detail from '@/components/activity/activity_user_detail'
    export default {
      name: "activety_index",
      components: {activity_modify, activity_new, activity_summary, activity_user_detail},
      data: function () {
        return {
          activity: [],
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
          activitySummaryIndex: {
            id: '',
            name: '',
            recipientNumber: ''
          },
          activityUserDetail: {

          },
          //新增
          addVisible: false,
          //修改
          UpDatePic: false,
          summaryDate: false,
          summaryUserDate: false,
          isDoubleClick: false,
          nodetail: ''
        }
      },
      filters: {
        getStatus(value) {
          if(value == 1) {
            return "开启"
          }else if(value == 2) {
            return "关闭"
          }
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
          var url = this.$BASE_STORE_URL + 'activity/queryActivityForPage'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.activity = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        create () {
          this.addVisible = true
        },
        //点击令弹框消失
        childClick(data) {
          this.addVisible = false
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        updateDate (date) {
          this.nodetail = date ;
          this.UpDatePic = true
        },
        updateClick(){
          this.UpDatePic = false
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        detailDate (date) {
          this.activitySummaryIndex.id = date.id
          this.activitySummaryIndex.name = date.name
          this.activitySummaryIndex.recipientNumber = date.recipientNumber
          this.summaryDate = true
        },
        summaryClick(date) {
          this.summaryDate = false
          this.summaryUserDate = true
        }
      }
    }
</script>

<style scoped>
</style>
<style>
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
