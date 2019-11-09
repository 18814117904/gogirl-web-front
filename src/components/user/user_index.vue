<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>帐号管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >帐号名称</label>
                      <input class="form-control" placeholder="帐号名称" type="text" v-model="userNameForSearch">
                    </div>

                    <div class="form-group">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                      <button type="button" class="btn btn-sm btn-primary" @click="addDate">
                        <i class="fa fa-plus"></i>&nbsp;新增帐号
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
                        :data="users"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="name"
                          label="姓名"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="telphone"
                          label="电话"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.telphone}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="departmentName"
                          label="所属店铺"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.departmentName}}
                          </template>
                        </el-table-column>

                        <!--<el-table-column
                          prop="sex"
                          label="性别"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.sex}}
                          </template>
                        </el-table-column>-->

                        <el-table-column
                          prop="lastLoginTime"
                          label="最近登录时间"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.lastLoginTime}}
                          </template>
                        </el-table-column>

                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="primary" plain @click="updateDate(scope.row.id)">修改</el-button>
                            <el-button type="danger" plain @click="deleteStore(scope.row.id)">删除</el-button>
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
                      <!--<div class="pull-left pagination-detail"><span
                        class="pagination-info">总共 {{pageInfo.total}} 条记录</span>
                        <span class="page-list">
                          每页显示
                          <select v-model="pageInfo.pageSize">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                          条记录,显示 {{pageInfo.startRow}} 到 {{pageInfo.endRow}} 条
                        </span>
                      </div>
                      <div class="pull-right pagination" style="display: block;">
                        <ul class="pagination">
                          <li class="page-first "><a @click="getFirstPage">第一页</a></li>
                          <li class="page-pre "><a @click="getPrePage">上一页</a></li>
                          <li class="page-number "><a >{{this.pageInfo.pageNum}}</a></li>
                          <li class="page-next "><a @click="getNextPage">下一页</a></li>
                          <li class="page-last "><a @click="getLastPage">最后页</a></li>
                        </ul>
                      </div>-->

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
          <el-dialog title="新增帐号" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%" center>  <!-- v-if='addVisible'   width="70%"-->
            <user_new v-on:childClick="childClick" ></user_new>
          </el-dialog>
        </div>

        <div class="Tan" v-dialogDrag>
          <el-dialog title="修改帐号" :visible.sync="UpDatePic" v-if='UpDatePic' style=" z-index: 10000; width: 100%; height: 90%" center>
            <user_modify :attr="nodetail" v-on:updateClick="updateClick"></user_modify>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import user_detail from '@/components/user/user_detail'
  import user_new from '@/components/user/user_new'
  import user_modify from '@/components/user/user_modify'
    export default {
        name: "user_index",
      components: {user_modify, user_new},
      data: function () {
        return {
          users: [],
          selectedPlan: [],
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
          //新增
          addVisible: false,
          //修改
          UpDatePic: false,
          usercode: this.$parent.usercode,
          nodetail: '',
          isDoubleClick: false,
          userNameForSearch: ''
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
        //点击令弹框消失
        childClick(data) {
          this.addVisible = false
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        addDate() {
          this.addVisible = true
        },
        updateDate (date) {
          this.nodetail = date ;
          this.UpDatePic = true
        },
        updateClick(){
          this.UpDatePic = false
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        // 服务详情
        detail: function (no) {
          //  debugger
          if (this.isDoubleClick && this.nodetail === no) {
            this.$router.push({ name: 'user_modify',params: {nodetail: this.nodetail } })
          }
          this.isDoubleClick = true
          this.nodetail = no
          setTimeout(() => {
            this.isDoubleClick = false
          }, 500)
        },
        getAllPurchasingPlan: function (pageNum) {
          var url = this.$BASE_URL + 'user/queryUserForPage/'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.users = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        create: function () {
          this.$layer.iframe({
            content: {
              content: user_new,
              parent: this,
              data: {}
            },
            area: ['800px', '600px'],
            title: '新增用户'
          })
        },
        // 搜索 ============================================================================================================
        search (pageNum) {
          this.userNameForSearch = this.userNameForSearch.replace(/(^\s*)|(\s*$)/g, '')
          if (this.userNameForSearch === '') {
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
            name: this.userNameForSearch,
            pageNum: pageNum,
            pageSize: 6
          })
          searchAxios.post(this.$BASE_URL + 'user/queryUserForPage/', postData)
            .then(function (response) {
              this.users = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
        },
        deleteStore (id) {
          this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var getServeTypeAxios = this.$axios.create({})
            getServeTypeAxios.get(this.$BASE_URL + 'user/deleteUser',{
              params: {
                id : id
              }
            })
              .then(function (response) {
                if(response.data.success == true){
                  this.getAllPurchasingPlan(this.pageInfo.pageNum)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              }.bind(this))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
    }
</script>

<style scoped>

</style>
