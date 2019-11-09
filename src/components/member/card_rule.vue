<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>会员卡规则管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="create()">
                        <i class="fa fa-plus"></i>&nbsp;新增规则
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="ibox-content">
                <div class="bootstrap-table">
                  <div class="fixed-table-toolbar">
                    <div class="columns columns-right btn-group pull-right">
                      <!--<button class="btn btn-default" type="button" name="refresh" title="刷新" @click="getAllType(pageInfo.pageNum)">
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
                        :data="members"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="chargeAmount"
                          label="充值金额"
                          align="center"
                        >
                          <template slot-scope="scope" >
                           ￥ {{scope.row.chargeAmount/100}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="bestowAmount"
                          label="赠送金额"
                          align="center"
                        >
                          <template slot-scope="scope" >
                           ￥ {{scope.row.bestowAmount/100}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="discount"
                          label="折扣"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.discount}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="level"
                          label="会员等级"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.level}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark"
                          label="备注"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.remark}}
                          </template>
                        </el-table-column>

                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                              <el-button type="primary" plain @click="updateRule(scope.row.id)">修改</el-button>
                              <el-button type="danger" plain @click="deleteType(scope.row.id)">删除</el-button>
                            </el-button-group>
                          </template>
                        </el-table-column>
                      </el-table>
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
          <el-dialog title="新增金额配置" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%" center>  <!-- v-if='addVisible'   width="70%"-->
            <card_rule_add v-on:create="create" v-on:addClick="addClick" ></card_rule_add>
          </el-dialog>
        </div>

        <div class="Tan" v-dialogDrag>
          <el-dialog title="修改金额配置" :visible.sync="UpDatePic" v-if='UpDatePic' style=" z-index: 10000; width: 100%; height: 98%" center>
            <card_rule_modify :attr="nodetail" v-on:updateClick="updateClick" v-on:updateRule="updateRule"></card_rule_modify>
          </el-dialog>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  // import qs from 'qs'
  import card_rule_modify from '@/components/member/card_rule_modify'
  import card_rule_add from '@/components/member/card_rule_add'
  export default {
    name: 'serve_index',
    components: {card_rule_modify, card_rule_add},
    data: function () {
      return {
        members: [],
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
        nodetail: ''
      }
    },
    mounted: function () {
      this.getAllType(this.pageInfo.pageNum)
    },
    methods: {
      handleSizeChange(val) {
        this.pageInfo.pageSize = val
        this.getAllType(this.pageInfo.pageNum)
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val
        this.getAllType(this.pageInfo.pageNum)
      },
      getAllType: function (pageNum) {
        var url = this.$BASE_USER_URL + 'selectDiscount'
        var getAllTypeAxios = this.$axios.create({})
        getAllTypeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            if(response.data.success == false){
              this.$layer.msg(response.data.message)
              return
            }
            this.members = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllTypeAxios ERROE ! ' + response)
          })
      },
      deleteType: function (value) {
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url = this.$BASE_USER_URL + 'deleteByPrimaryKey'
          var deleteTypeAxios = this.$axios.create({})
          deleteTypeAxios.get(url, {
            params: {
              id: value
            }
          }).then(function (response) {
            console.log(response.data.message)
            if(response.data.success == true){
              this.getAllType(this.pageInfo.prePage)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }.bind(this))
            .catch(function (response) {
              alert('getAllServeAxios ERROE ! ' + response)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      create: function () {
        this.addVisible = true
      },
      addClick: function () {
        this.addVisible = false
        this.getAllType(this.pageInfo.pageNum)
      },
      //修改规则配置
      updateRule: function (no) {
        this.nodetail = no;
        this.UpDatePic = true
      },
      updateClick: function () {
        this.UpDatePic = false
        this.getAllType(this.pageInfo.pageNum)
      }
    }
  }
</script>

<!--<style scoped>
</style>-->

