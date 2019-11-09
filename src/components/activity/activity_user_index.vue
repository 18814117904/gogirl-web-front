<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>活动用户管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >手机号码</label>
                      <input class="form-control" placeholder="手机号码" type="text" v-model="telphone">
                    </div>

                    <div class="form-group">
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
                        :data="activityuser"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="updateTime"
                          label="提交时间"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.updateTime}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="nickname"
                          label="微信名"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.nickname}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="realName"
                          label="真实姓名"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.realName}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="phone"
                          label="手机号码"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.phone}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark"
                          label="收货地址"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.remark}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark2"
                          align="center"
                          label="微信好友"
                        >
                          <template slot-scope="scope" >
                            <div @click="modifyWechatFriends(scope.row.id, scope.row.remark2)">
                              <span v-if="scope.row.remark2 == 1"> <i class="el-icon-check" style="color: #00b4aa"></i> </span>
                              <span v-else>  <i class="el-icon-close" style="color: red;"></i></span>
                            </div>
                            <!--<span v-if="scope.row.status == 0 || scope.row.listProduce.length == 0"> <i class="el-icon-close" style="color: red;"></i></span>
                            <span v-else> <i class="el-icon-check" style="color: #00b4aa"></i></span>
                            {{scope.row.phone}}-->
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark3"
                          align="center"
                          label="群"
                        >
                          <template slot-scope="scope" >
                            <div @click="modifyGroup(scope.row.id, scope.row.remark3)">
                              <span v-if="scope.row.remark3 == 1"> <i class="el-icon-check" style="color: #00b4aa"></i></span>
                              <span v-else> <i class="el-icon-close" style="color: red;"></i> </span>
                            </div>
                            <!--{{scope.row.phone}}-->
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark4"
                          width="180px"
                          label="备注"
                        >
                          <template slot-scope="scope" >
                            <div @click="changeToInput(scope.row.id)">
                              <input class="edit-cell" v-if="showEdit[scope.row.id]" @blur="changeToSpan(scope.row.id, scope.row.remark4)"   v-model="scope.row.remark4">
                              <span v-if="!showEdit[scope.row.id] && scope.row.remark4 != '' && scope.row.remark4 != null">{{scope.row.remark4}}</span>
                              <span v-if="!showEdit[scope.row.id] && (scope.row.remark4 == '' || scope.row.remark4 == null)">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                          </template>
                        </el-table-column>

                        <!--<el-table-column
                          prop="registerTime"
                          label="注册时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.registerTime}}
                          </template>
                        </el-table-column>-->

                        <!--<el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button type="primary" plain @click="detailDate(scope.row)">详情</el-button>
                          </template>
                        </el-table-column>-->
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
      name: "activety_index",
      data: function () {
        return {
          activityuser: [],
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
          telphone: '',
          isDoubleClick: false,
          showEdit: [],
          textEdit: []
        }
      },
      mounted: function () {
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
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
        getAllPurchasingPlan: function (pageNum) {
          var url = this.$BASE_USER_URL + 'getJoinActiveCustomer'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.activityuser = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        // 搜索 ============================================================================================================
        search (pageNum) {
          this.telphone = this.telphone.replace(/(^\s*)|(\s*$)/g, '')
          if (this.telphone === '') {
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
            phone: this.telphone,
            pageNum: pageNum,
            pageSize: 6
          })
          searchAxios.post(this.$BASE_USER_URL + 'getJoinActiveCustomer', postData)
            .then(function (response) {
              this.activityuser = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
        },
        changeToInput (id) {
          if(this.isDoubleClick) {
           this.showEdit[id] = true
            this.search(this.pageInfo.pageNum)
          }
          this.isDoubleClick = true
          setTimeout(() => {
            this.isDoubleClick = false
          }, 500)
        },
        changeToSpan (id, value) {
          this.showEdit[id] = false
          var searchAxios = this.$axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          var postData = this.$qs.stringify({
            customerId: id,
            remark4: value
          })
          searchAxios.post(this.$BASE_USER_URL + 'updateRemark', postData)
            .then(function (response) {
              this.$layer.msg(response.data.message)
              this.search(this.pageInfo.pageNum)
            }.bind(this))
        },
        modifyWechatFriends (id, status) {
          if(this.isDoubleClick) {
            let friendsStatus
            if (status == 0 || status == null || status == '') {
              friendsStatus = 1
            } else if (status == 1) {
              friendsStatus = 0
            }
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              customerId: id,
              remark2: friendsStatus
            })
            searchAxios.post(this.$BASE_USER_URL + 'updateRemark', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.search(this.pageInfo.pageNum)
              }.bind(this))
          }
          this.isDoubleClick = true
          setTimeout(() => {
            this.isDoubleClick = false
          }, 500)
        },
        modifyGroup (id, status) {
          if(this.isDoubleClick) {
            let groupStatus
            if (status == 0 || status == null || status == '') {
              groupStatus = 1
            } else if (status == 1) {
              groupStatus = 0
            }
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              customerId: id,
              remark3: groupStatus
            })
            searchAxios.post(this.$BASE_USER_URL + 'updateRemark', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.search(this.pageInfo.pageNum)
              }.bind(this))
          }
          this.isDoubleClick = true
          setTimeout(() => {
            this.isDoubleClick = false
          }, 500)
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
    width: 60%;
    height: 80%;
  }

  element.style {
    margin-top: 0vh
  }

  .Tan .el-dialog {
    margin-top: 0px;
    padding-top: 0px;
    width: 80%;
  }
</style>
