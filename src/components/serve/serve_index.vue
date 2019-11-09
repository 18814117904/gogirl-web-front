<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>服务列表</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >服务名称</label>
                      <input class="form-control" placeholder="服务名称" type="text" v-model="serveNameForSearch">
                    </div>

                    <div class="form-group" style="margin-left: 10px">
                      <label >服务分类</label>
                      <el-select filterable placeholder="请选择 分类" v-model="serveTypeSelected" @change="reChooseServeType" style="max-width:100%;">
                        <el-option
                          v-for="type in serveTypes"
                          :key="type.id"
                          :label="type.name"
                          :value="type.name">
                        </el-option>
                      </el-select>
                    </div>
                    <!--<div class="form-group" style="margin-left: 10px">
                      <label>服务标签</label>
                      <el-select filterable multiple placeholder="请选择 标签" v-model="serveLabelSelected" @change="reChooseServeLabel" style="max-width:100%;">
                        <el-option
                          v-for="serveLabel in serveLabels"
                          :key="serveLabel.id"
                          :label="serveLabel.name"
                          :value="serveLabel.name">
                        </el-option>
                      </el-select>
                    </div>-->

                    <!--<div class="form-group" style="margin-left: 10px">
                      <label>状态</label>
                      <el-select filterable placeholder="请选择 状态" v-model="serveStatusSelected" style="max-width:100%;">
                        <el-option label="上线"  value="1" />
                        <el-option label="下线" value="0" />
                      </el-select>
                    </div>-->

                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                      <button type="button" class="btn btn-sm btn-primary" @click="create">
                        <i class="fa fa-plus"></i>&nbsp;创建服务
                      </button>
                      <button type="button" class="btn btn-sm btn-info" @click="typemanage">
                        <i class="fa fa-paste"></i>&nbsp;分类管理
                      </button>
                      <!--<button type="button" class="btn btn-sm btn-warning" @click="labelmanage">
                        <i class="fa fa-paste"></i>&nbsp;标签管理
                      </button>-->
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
                        :data="serves"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="picturePath"
                          label="服务"
                          width="180">
                          <template slot-scope="scope" >
                            <!--<div v-for="picpath in scope.row.picturePath.split(',')" @click="detail(scope.row.id)">-->
                              <img v-for="picpath in scope.row.picturePath.split(',')" v-bind:src="$BASE_PICTUREPATH_URL+picpath" @click="detail(scope.row.id)" style="height: 35px;width: 35px"> </img>
                            <!--</div>-->
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="名称"
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                              {{scope.row.name}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="listProduce"
                          label="包含款式"
                          align="center"
                       >
                          <template slot-scope="scope" >
                              {{formatter(scope.row,scope.column)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="type"
                          label="分类"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.type}}
                          </template>
                        </el-table-column>
                        <!--<el-table-column
                          prop="label"
                          label="标签"
                          >
                          <template slot-scope="scope" >
                              {{scope.row.label}}
                          </template>
                        </el-table-column>-->
                        <!--<el-table-column
                          prop="shopSort"
                          label="排序"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.shopSort}}
                          </template>
                        </el-table-column>-->
                        <el-table-column
                          prop="price"
                          label="价格"
                          align="center"
                          >
                          <template slot-scope="scope" >
                            ￥{{scope.row.price}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="price"
                          label="时长"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.serviceDuration}} 分钟
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="remark"
                          label="描述"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.remark}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="上架"
                          align="center"
                          >
                          <template slot-scope="scope" >
                            <div @click="modifyStatus(scope.row.id, scope.row.status, scope.row.listProduce.length)">
                              <span v-if="scope.row.status == 0 || scope.row.listProduce.length == 0"> <i class="el-icon-close" style="color: red;"></i></span>
                              <span v-else> <i class="el-icon-check" style="color: #00b4aa"></i></span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="primary" plain @click="detail(scope.row.id)">修改</el-button>
                            <el-button type="danger" plain @click="deleteServe(scope.row.id)">删除</el-button>
                            </el-button-group>
                          </template>
                        </el-table-column>
                      </el-table>

                      <!--<table id="roletable" class="table table-hover table-striped" style="margin-top: 0px;">
                        <thead style="">
                        <tr>
                          <th style="" data-field="" tabindex="0">
                            <div class="th-inner">服务</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="name" tabindex="0">
                            <div class="th-inner">名称</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="produces" tabindex="0">
                            <div class="th-inner">产品</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="type" tabindex="0">
                            <div class="th-inner ">分类</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="label" tabindex="0">
                            <div class="th-inner ">标签</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="shop_sort" tabindex="0">
                            <div class="th-inner ">排序</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="price" tabindex="0">
                            <div class="th-inner">价格</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="remark" tabindex="0">
                            <div class="th-inner">描述</div>
                            <div class="fht-cell"></div>
                          </th>
                          <th style="" data-field="status" tabindex="0">
                            <div class="th-inner">状态</div>
                            <div class="fht-cell"></div>
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr data-index="0" v-for="serve in serves" v-bind:key="serve.id">
                          <td v-on:click="detail(serve.id)" v-for="picpath in serve.picturePath.split(',')" ><img style="width: 40px;height: 40px" :src="picpath"></td>
                          <td v-on:click="detail(serve.id)">{{serve.name}}</td>
                          <td v-on:click="detail(serve.id)">{{serve.listProduce | listProduceToSeparate}}</td>
                          <td v-on:click="detail(serve.id)">{{serve.type}}</td>
                          <td v-on:click="detail(serve.id)">{{serve.label}}</td>
                          &lt;!&ndash;<td v-on:click="detail(plan.no)">{{plan.auditstatusdto}}</td>&ndash;&gt;
                          <td v-on:click="detail(serve.id)">{{serve.shopSort}}</td>
                          <td v-on:click="detail(serve.id)">{{serve.price}}￥</td>
                          <td v-on:click="detail(serve.id)">{{serve.remark}}</td>
                          <td v-on:click="detail(serve.id)"><span v-if="serve.status == 0" style="color: red">{{serve.status | formatStatus}}</span>
                            <span v-else style="color: green">{{serve.status | formatStatus}}</span></td>
                        </tr>
                        </tbody>
                      </table>-->

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
      </div>
    </div>
  </div>
</template>

<script>
  // import qs from 'qs'
  import {getUserinfo} from '@/vuex/session-storage'
  import serve_modify from '@/components/serve/serve_modify'
  import type_index from '@/components/typelabel/type_index'
  import label_index from '@/components/typelabel/label_index'
  export default {
    name: 'serve_index',
    data: function () {
      return {
        serves: [],
        selectedPlan: [],
        serveTypes: [],
        serveTypeSelected: '',
        serveLabels: [],
        serveLabelSelected: '',
        serveStatusSelected: '',
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
        isDoubleClick: false,
        serveNameForSearch: ''
      }
    },
    filters:{
      /*formatStatus:function(value){
        if(value.status == 0 || value.listProduce.length == 0){
          return '下线';
        }else if(value.status == 1){
         return '上线';
        }
      },*/
      listProduceToSeparate:function(value){
        var proarr = []
        if(value.length == 0){
          return '';
        }else if(value.length > 0){
          for(var i = 0; i < value.length; i++){
            proarr.push(value[i].name)
          }
          return proarr.join(",");
        }
      }
    },
    mounted: function () {
      this.getAllPurchasingPlan(this.pageInfo.pageNum)
      this.reChooseServeType()
      this.reChooseServeLabel()
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
      modifyStatus: function(id, status, len){
        if(len == 0){
          this.$layer.msg("不能改变状态，本服务至少选择一个款式")
          return;
        }
        let serveStatus
        if(status == 0) {
          serveStatus = 1;
        }else if (status == 1) {
          serveStatus = 0;
        }
        var url = this.$BASE_URL + 'serve/modifyServe/'
        var saveAxios = this.$axios.create({})
        var postData = this.$qs.stringify({
          id: id,
          status: serveStatus
        })
        saveAxios.post(url, postData)
          .then(function (req) {
            this.$layer.msg(req.data.message)
            this.getAllPurchasingPlan(this.pageInfo.pageNum)
          }.bind(this))
      },
      formatter: function(row, column){
        var value = row.listProduce
        var proarr = []
        if(value.length == 0){
          return '';
        }else if(value.length > 0){
          for(var i = 0; i < value.length; i++){
            proarr.push(value[i].name)
          }
          return proarr.join(",");
        }
      },

      // 服务详情
      detail: function (no) {
      //  debugger
          this.$router.push({ name: 'serve_modify',params: {nodetail: no } })
        this.nodetail = no
      },
      getAllPurchasingPlan: function (pageNum) {
        var url = this.$BASE_URL + 'serve/queryServeAllForPage/'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            this.serves = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },
      create: function () {
        this.$router.push({ path: '/serve/ueditor' })
      },
      typemanage: function () {
        this.$layer.iframe({
          content: {
            content: type_index,
            parent: this,
            data: {}
          },
          area: ['800px', '600px'],
          title: '分类管理'
        })
      },
      /*labelmanage: function () {
        this.$layer.iframe({
          content: {
            content: label_index,
            parent: this,
            data: {}
          },
          area: ['800px', '600px'],
          title: '标签管理'
        })
      },*/
      // 搜索 ============================================================================================================
      search (pageNum) {
        this.serveNameForSearch = this.serveNameForSearch.replace(/(^\s*)|(\s*$)/g, '')
        if (this.serveNameForSearch === '' && this.serveTypeSelected === '') {
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
          /*label: this.serveLabelSelected.join(","),*/
          pageNum: pageNum,
          pageSize: this.pageInfo.pageSize
        })
        searchAxios.post(this.$BASE_URL + 'serve/queryServeAllForPage/', postData)
          .then(function (response) {
            this.serves = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
      },
      reChooseServeLabel () {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_URL + 'label/queryLabel',{
          params: {
          }
        })
          .then(function (response) {
            this.serveLabels = response.data.data
          }.bind(this))
      },
      reChooseServeType () {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_URL + 'type/queryType',{
          params: {
          }
        })
          .then(function (response) {
            this.serveTypes = response.data.data
          }.bind(this))
      },

      deleteServe (id) {
        this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_URL + 'serve/deleteServe',{
            params: {
              id : id
            }
          })
            .then(function (response) {
              this.getAllPurchasingPlan(this.pageInfo.pageNum)
              if(response.data.success == true){
                this.getAllType(this.pageInfo.prePage)
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
