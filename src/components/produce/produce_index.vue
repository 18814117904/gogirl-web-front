<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>款式列表</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block; margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >款式名称</label>
                      <input class="form-control" placeholder="款式名称" type="text" v-model="produceNameForSearch">
                    </div>

                    <!--<div class="form-group" style="margin-left: 10px">
                      <label >款式分类</label>
                      <el-select filterable placeholder="请选择 分类" v-model="produceTypeSelected" @change="reChooseServeType" style="max-width:100%;">
                        <el-option
                          v-for="produce in produceTypes"
                          :key="produce.id"
                          :label="produce.name"
                          :value="produce.name">
                        </el-option>
                      </el-select>
                    </div>-->
                    <!--<div class="form-group" style="margin-left: 10px">
                      <label>款式标签</label>
                      <el-select filterable multiple placeholder="请选择 标签" v-model="produceLabelSelected" @change="reChooseServeLabel" style="max-width:100%;">
                        <el-option
                          v-for="produceLabel in produceLabels"
                          :key="produceLabel.id"
                          :label="produceLabel.name"
                          :value="produceLabel.name">
                        </el-option>
                      </el-select>
                    </div>-->

                    <div class="form-group" style="margin-left: 10px">
                      <label>排序方式</label>
                      <el-select filterable placeholder="请选择" v-model="sortOrder" style="max-width:100%;">
                        <el-option label="时间"  value="1" />
                        <el-option label="置顶" value="2" />
                      </el-select>
                    </div>

                    <div class="form-group">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                      <button type="button" class="btn btn-sm btn-primary" @click="create">
                        <i class="fa fa-plus"></i>&nbsp;新增款式
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
                        :data="produces"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="picturePath"
                          label="图案"
                          width="180"
                         >
                          <template slot-scope="scope" >
                            <div v-for="picpath in scope.row.picturePath.split(',')" @click="detail(scope.row.id)">
                              <img v-bind:src="$BASE_PICTUREPATH_URL+picpath" style="height: 35px;width: 35px"> </img>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="名称"
                          width="180"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.name}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="serveName"
                          label="所属服务"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.serveName}}
                          </template>
                        </el-table-column>

                        <!--<el-table-column
                          prop="type"
                          label="分类"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.type}}
                          </template>
                        </el-table-column>
                        <el-table-column
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
                        </el-table-column>
                        <el-table-column
                          prop="reqGrade"
                          label="需要等级"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.reqGrade}}
                          </template>
                        </el-table-column>-->
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
                            <div @click="modifyStatus(scope.row.id, scope.row.status, scope.row.serveName)">
                              <span v-if="scope.row.status == 0 || scope.row.serveName == null"><i class="el-icon-close" style="color: red;"></i></span>
                              <span v-else><i class="el-icon-check" style="color: #00b4aa"></i></span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="primary" plain @click="top(scope.row.id)">置顶</el-button>
                            <el-button type="success" plain @click="detail(scope.row.id)">修改</el-button>
                            <el-button type="danger" plain @click="deleteProduce(scope.row.id)">删除</el-button>
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
      </div>
    </div>
  </div>
</template>

<script>
  import produce_detail from '@/components/produce/produce_detail'
  import produce_new from '@/components/produce/produce_new'
  import produce_modify from '@/components/produce/produce_modify'
  import type_index from '@/components/typelabel/type_index'
  import label_index from '@/components/typelabel/label_index'
    export default {
        name: "produce_index",
      data: function() {
        return {
          produces: [],
          selectedPlan: [],
          produceTypes: [],
          produceTypeSelected: '',
          produceLabels: [],
          produceLabelSelected: '',
          sortOrder: '',
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
          usercode: this.$parent.usercode,
          nodetail: '',
          isDoubleClick: false,
          produceNameForSearch: ''
        }
      },
      filters:{
        formatStatus:function(value){
          if(value.serveName == null || value.status == 0){
            return '下线';
          } else if(value.status == 1){
            return '上线';
          }
        }
      },
      mounted: function () {
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
        this.reChooseServeLabel()
        this.reChooseServeType()
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
        modifyStatus: function(id, status, serveName){
          if(serveName == null){
            this.$layer.msg("不能改变状态，本款式不属于任何服务")
            return;
          }
          let serveStatus
          if(status == 0) {
            serveStatus = 1;
          }else if (status == 1) {
            serveStatus = 0;
          }
          var url = this.$BASE_URL + 'produce/modifyProduce/'
          var saveAxios = this.$axios.create({})
          var postData = this.$qs.stringify({
            id: id,
            status: serveStatus
          })
          saveAxios.post(url, postData)
            .then(function (req) {
              this.$layer.msg(req.data.message)
              this.search(this.pageInfo.pageNum)
            }.bind(this))
        },
        detail: function (no) {
            this.$router.push({ name: 'produce_modify',params: {nodetail: no} })
          this.nodetail = no
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
        labelmanage: function () {
          this.$layer.iframe({
            content: {
              content: label_index,
              parent: this,
              data: {}
            },
            area: ['800px', '600px'],
            title: '标签管理'
          })
        },
        getAllPurchasingPlan: function (pageNum) {
          var url = this.$BASE_URL + 'produce/queryProduceForPage/'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.produces = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        top: function(id){
          var url = this.$BASE_URL + 'produce/topProduce/'
          var modifyAxios = this.$axios.create({})
          var postData = this.$qs.stringify({
            id: id
          })
          modifyAxios.post(url, postData)
            .then(function(req){
              this.$layer.msg(req.data.message)
             this.search(this.pageInfo.pageNum);
            }.bind(this))
        },
        create: function () {
          this.$router.push({ path: '/produce/add' })
         /* this.$layer.iframe({
            content: {
              content: produce_new,
              parent: this,
              data: {}
            },
            area: ['800px', '500px'],
            title: '新增款式'
          })*/
        },
        // 搜索 ============================================================================================================
        search(pageNum) {
          this.produceNameForSearch = this.produceNameForSearch.replace(/(^\s*)|(\s*$)/g, '')
          if (this.produceNameForSearch === '' && this.sortOrder === '') {
            this.getAllPurchasingPlan(pageNum)
          } else {
            this.doSearch(pageNum)
          }
        },
        doSearch(pageNum) {
          /*var url = this.$BASE_URL + 'produce/queryProduceForPage/'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              name: this.produceNameForSearch,
              type: this.produceTypeSelected,
              label: this.produceLabelSelected.join(","),
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.produces = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })*/


          var searchAxios = this.$axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          var postData = this.$qs.stringify({
            name: this.produceNameForSearch,
            sortOrder: this.sortOrder,
            /*type: this.produceTypeSelected,*/
            /*label: this.produceLabelSelected.join(","),*/
            pageNum: pageNum,
            pageSize: 6
          })
          searchAxios.post(this.$BASE_URL + 'produce/queryProduceForPage/', postData)
            .then(function (response) {
              this.produces = response.data.data.list
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
              this.produceLabels = response.data.data
            }.bind(this))
        },
        reChooseServeType () {
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_URL + 'type/queryType',{
            params: {
            }
          })
            .then(function (response) {
              this.produceTypes = response.data.data
            }.bind(this))
        },
        deleteProduce (id) {
          this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var getServeTypeAxios = this.$axios.create({})
            getServeTypeAxios.get(this.$BASE_URL + 'produce/deleteProdecu',{
              params: {
                id : id
              }
            })
              .then(function (response) {
                if(response.data.success == true){
                  this.search(this.pageInfo.pageNum)
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
