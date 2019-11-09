<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>官网活动</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="add(1)">
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
                        :data="news"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="picturePath"
                          label="图片"
                          width="180">
                          <template slot-scope="scope" >
                            <img v-bind:src="$BASE_PICTUREPATH_URL+scope.row.picturePath" style="height: 35px;width: 35px"> </img>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="title"
                          label="标题"
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                            {{scope.row.title}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="synopsis"
                          label="简介"
                          align="center"
                          width="180">
                          <template slot-scope="scope" >
                            {{scope.row.synopsis}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="time"
                          label="时间"
                          align="center"
                       >
                          <template slot-scope="scope" >
                              {{scope.row.time}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="url"
                          label="url"
                          align="center"
                         >
                          <template slot-scope="scope" >
                              {{scope.row.url}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="type"
                          label="类型"
                          align="center"
                        >
                          <template slot-scope="scope" >
                            {{typeFormat(scope.row.type)}}
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
                            <el-button type="primary" @click="modify(scope.row.id)">修改</el-button>
                            </el-button-group>
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
        <div class="tan" v-dialogDrag>
          <el-dialog title="修改活动" :visible.sync="modifyVisible" v-if='modifyVisible' style=" z-index: 10000; width: 100%; height: 90%" center>
            <news_modify :attr="nodetail" v-on:modifyChildClick="modifyChildClick" ></news_modify>
          </el-dialog>
        </div>
        <div class="tan" v-dialogDrag>
          <el-dialog title="新增活动" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%" center>
            <news_new :attr="nodetail" v-on:addChildClick="addChildClick" ></news_new>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import news_modify from '@/components/website/news_modify'
  import news_new from '@/components/website/news_new'
  export default {
    components: {news_modify, news_new},
    name: 'sku_index',
    data: function () {
      return {
        news: [],
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
        var url = this.$BASE_PATH + 'websiteNews/select'
        var getAllServeAxios = this.$axios.create({})
        getAllServeAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize
          }
        })
          .then(function (response) {
            this.news = response.data.data.list
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllServeAxios ERROE ! ' + response)
          })
      },
      typeFormat(val) {
        if(val == 1) {
          return '活动'
        }else if(val == 2) {
          return '资讯'
        }else if(val == 3) {
          return '款式'
        }else {
          return ''
        }
      },
      modify(no) {
        this.$router.push({ name: 'news_modify',params: {nodetail: no } })
     //   this.nodetail = no
     //   this.modifyVisible = true
      },
      modifyChildClick() {
        this.modifyVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },
      add() {
        this.$router.push({ path: '/news/ueditor' })
     //   this.addVisible = true
      },
      addChildClick() {
        this.addVisible = false
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
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
