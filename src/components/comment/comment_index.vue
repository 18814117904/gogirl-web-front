<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>评价列表</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >店铺选择</label>
                      <el-select filterable placeholder="请选择 店铺" v-model="storeSelected" @change="reChooseStore" style="max-width:100%;">
                        <el-option label="请选择 店铺"  value="" />
                        <el-option
                          v-for="store in stores"
                          :key="store.id"
                          :label="store.name"
                          :value="store.id">
                        </el-option>
                      </el-select>
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
                        :data="comment"
                        style="width: 100%"
                        stripe
                      >

                        <el-table-column
                          prop="finishTime"
                          label="评价时间"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.finishTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="departmentName"
                          label="店铺"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.departmentName}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="orderNo"
                          label="评价订单"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.orderNo}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="customer"
                          label="评价会员"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{formatName(scope.row.customer)}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="address"
                          label="星级"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.level}}星
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="master"
                          label="选项"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{labformat(scope.row.listOrderCommentLabel)}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark"
                          label="内容"
                          align="center"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.remark}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="picturePath"
                          label="照片"
                        >
                          <template slot-scope="scope" >
                            <div v-if="scope.row.picturePath != null">
                              <img v-for="picpath in scope.row.picturePath.split(',')" v-bind:src="$BASE_PICTUREPATH_URL+picpath" style="height: 35px;width: 35px"> </img>
                            </div>
                            <div v-else>
                              <!--<img v-bind:src="$BASE_PICTUREPATH_URL+picpath" style="height: 35px;width: 35px"> </img>-->
                            </div>
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
        name: "comment_index",
      data: function () {
        return {
          comment: [],
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
          stores: [],
          storeSelected: ''
        }
      },
      mounted: function () {
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
        this.reChooseStore()
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
        formatName: function(value){
          if(value == null) {
            return ''
          }
          if(value.storeRecordRealName != null && value.storeRecordRealName != ''){
            return value.storeRecordRealName
          }else if(value.realName != null && value.realName != '') {
            return value.realName
          }else if(value.nickname != null && value.nickname != ''){
            return value.nickname
          }else {
            return ''
          }
        },
        labformat: function(value) {
          if(value == null){
            return ''
          }else {
            return value.map(function(elem, index){
              return elem.name;
            }).join(",")
          }
        },
        getAllPurchasingPlan: function (pageNum) {
          var url = this.$BASE_ORDER_URL + 'ordercomment/queryOrderCommentForCMS'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.comment = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        // 搜索 ============================================================================================================
        search (pageNum) {
          if (this.storeSelected === '') {
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
            departmentId: this.storeSelected,
            pageNum: pageNum,
            pageSize: 6
          })
          searchAxios.post(this.$BASE_ORDER_URL + 'ordercomment/queryOrderCommentForCMS', postData)
            .then(function (response) {
              this.comment = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
        },
        reChooseStore () {
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_STORE_URL + 'shop/queryShopForAll',{
            params: {
            }
          })
            .then(function (response) {
              this.stores = response.data.data
            }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
