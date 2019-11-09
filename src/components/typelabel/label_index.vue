<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>标签管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-sm-12">

                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="create()">
                        <i class="fa fa-plus"></i>&nbsp;新建标签
                      </button>
                    </div>
              <div class="ibox-content">
                <div class="bootstrap-table">
                  <div class="fixed-table-toolbar">
                    <div class="columns columns-right btn-group pull-right">
                      <button class="btn btn-default" type="button" name="refresh" title="刷新" @click="getAllType(pageInfo.pageNum)">
                        <i class="glyphicon glyphicon-refresh icon-refresh"></i>
                      </button>
                    </div>
                  </div>
                  <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="fixed-table-header" style="display: none;">
                      <table></table>
                    </div>
                    <div class="fixed-table-body" style="width: 100%;height: 250px;overflow: auto">
                      <div class="fixed-table-loading" style="top: 38px; display: none;">
                        <img src="/content/image/loading.gif">
                      </div>

                      <table id="roletable" class="table table-hover table-striped" style="margin-top: 0px;">
                        <thead style="">
                        <tr>
                          <th style="" data-field="name" tabindex="0">
                            <div class="th-inner">标签名称</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="produces" tabindex="0">
                            <div class="th-inner">创建人</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="type" tabindex="0">
                            <div class="th-inner ">创建时间</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="label" tabindex="0">
                            <div class="th-inner ">更新时间</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="" tabindex="0">
                            <div class="th-inner ">操作</div>
                            <div class="fht-cell"></div>
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr data-index="0" v-for="label in labels" v-bind:key="label.id">
                          <td>{{label.name}}</td>
                          <td>{{label.createUser}}</td>
                          <td>{{label.createTime}}</td>
                          <td>{{label.updateTime}}</td>
                          <td>
                            <el-button type="danger" plain @click="deleteType(label.id)">删除</el-button>
                            <el-button type="primary" plain @click="updateType(label.id)">修改</el-button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="fixed-table-pagination" style="">
                      <div class="pull-left pagination-detail"><span
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
  // import qs from 'qs'
  import {getUserinfo} from '@/vuex/session-storage'
  export default {
    name: 'serve_index',
    data: function () {
      return {
        loginuser: this.$parent.$parent.user,
        labels: [],
        typeno: '',
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
        }
      }
    },
    filters:{
    },
    mounted: function () {
      this.getAllType(this.pageInfo.pageNum)
    },
    methods: {
      // 第一页
      getFirstPage () {
        this.getAllType(this.pageInfo.firstPage)
      },
      // 获取最后一页
      getLastPage () {
        this.getAllType(this.pageInfo.lastPage)
      },
      // 下一页
      getNextPage () {
        if (this.pageInfo.hasNextPage) {
          this.getAllType(this.pageInfo.nextPage)
        }
      },
      // 上一页
      getPrePage () {
        if (this.pageInfo.hasPreviousPage) {
          this.getAllType(this.pageInfo.prePage)
        }
      },
      getAllType: function (pageNum) {
        var url = this.$BASE_URL + 'label/queryLabelForPage/'
        var getAllTypeAxios = this.$axios.create({})
        getAllTypeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            this.labels = response.data.data.list
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
          var url = this.$BASE_URL + 'label/deleteLabelById/'
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
        this.$prompt('新增标签名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if(value == null || value.trim().length == 0){
            this.$message({
              type: 'error',
              message: '输入数据为空!'
            });
            return;
          }
          var url = this.$BASE_URL + 'label/addLabel/'
          var addLabelAxios = this.$axios.create({})
          addLabelAxios.get(url, {
            params: {
              name: value,
              createUserName: this.loginuser.name
            }
          }).then(function (response) {
            console.log(response.data.message)
            if(response.data.success == true){
              this.getAllType(this.pageInfo.prePage)
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
            }
          }.bind(this))
            .catch(function (response) {
              alert('getAllServeAxios ERROE ! ' + response)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      updateType: function (no) {
        this.typeno = no
        this.$prompt('修改类型名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if(value == null || value.trim().length == 0){
            this.$message({
              type: 'error',
              message: '输入数据为空!'
            });
              return;
          }
          var url = this.$BASE_URL + 'label/modifyLabel/'
          var updateTypeAxios = this.$axios.create({})
          updateTypeAxios.get(url, {
            params: {
              id: no,
              name: value
            }
          }).then(function (response) {
            console.log(response.data.message)
            if(response.data.success == true){
              this.getAllType(this.pageInfo.prePage)
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }
          }.bind(this))
            .catch(function (response) {
              alert('getAllServeAxios ERROE ! ' + response)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style scoped>
</style>
