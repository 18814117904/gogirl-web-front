<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title" style="align-self: right; min-height: 0px">
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >唯一码</label>
                      <input class="form-control" placeholder="请输入 唯一码" type="text" v-model="codeForSearch">
                    </div>

                    <div class="form-group" style="margin-left: 10px">
                      <label >手机号码</label>
                      <input class="form-control" placeholder="请输入 手机号码" type="text" v-model="phoneForSearch">
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <label>状态</label>
                      <el-select filterable placeholder="请选择 状态" v-model="stateSelected" style="max-width:100%;">
                        <el-option label="请选择状态" value=""/>
                        <el-option label="未使用" value="1" />
                        <el-option label="已使用" value="2" />
                        <el-option label="已过期" value="3" />
                      </el-select>
                    </div>

                    <div class="form-group" style="margin-left: 10px">
                      <label >用户名</label>
                      <input class="form-control" placeholder="请输入 用户名" type="text" v-model="usernameSearch">
                    </div>

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
                        :data="couponDetail"
                        style="width: 100%"
                        stripe
                      >

                        <el-table-column
                          prop="code"
                          label="唯一码"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.code}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="nickname"
                          label="微信昵称"
                        >
                          <template slot-scope="scope" >

                            <div @click="getMemberDetailBynicname(scope.row)">
                              <span style="color: #00b4aa">{{scope.row | getNickname(scope.row)}}</span>
                            </div>
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="phone"
                          label="手机号码"
                        >
                          <template slot-scope="scope" >
                            <div @click="getMemberDetailByphone(scope.row)">
                             <span style="color: #00b4aa">{{scope.row | getPhone(scope.row)}}</span>
                            </div>
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="collectTime"
                          label="领取时间"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.receiveTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="useDate"
                          label="使用时间"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.useDate}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="state"
                          label="状态"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.state | getStatus(scope.row.state)}}
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
    name: "coupon_detail",
    props: ["couponDetailIndex"],
    components: {},
    data: function () {
      return {
        couponDetail: [],
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
        codeForSearch: '',
        phoneForSearch: '',
        stateSelected: '',
        usernameSearch: '',
        nodetail: ''
      }
    },
    filters: {
      getStatus: function (value) {
        if(value == 1) {
          return "正常"
        }else if(value == 2) {
          return "已使用"
        }else if(value == 3) {
          return "已过期"
        }
      },
      getNickname: function (value) {
        if(value.customer == null){
          return "";
        }else {
          return value.customer.nickname;
        }
      },
      getPhone: function(value){
        if(value.customer == null){
          return "";
        }else {
          return value.customer.phone;
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
      search (pageNum) {
        if (this.codeForSearch === '' && this.phoneForSearch === '' && this.stateSelected === ''&& this.usernameSearch === '') {
          this.getAllPurchasingPlan(pageNum)
        } else {
          this.doSearch(pageNum)
        }
      },
      getAllPurchasingPlan: function (pageNum) {
        var url = this.$BASE_USER_URL + 'selectByCouponCustomerRelevance'
        var getAllPurchasingPlanAxios = this.$axios.create({})
        getAllPurchasingPlanAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize,
            couponId: this.couponDetailIndex["id"]
          }
        })
          .then(function (response) {
            if(response.data.data.list != null) {
              if(response.data.data.list != null) {
                this.couponDetail = response.data.data.list
              }
            }
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllCompanyAxios ERROE ! ' + response)
          })
      },

      doSearch: function (pageNum) {
        var url = this.$BASE_USER_URL + 'selectByCouponCustomerRelevance'
        var getAllPurchasingPlanAxios = this.$axios.create({})
        getAllPurchasingPlanAxios.get(url, {
          params: {
            pageNum: pageNum,
            pageSize: this.pageInfo.pageSize,
            code: this.codeForSearch,
            phone: this.phoneForSearch,
            state: this.stateSelected,
            couponId: this.couponDetailIndex["id"],
            username: this.usernameSearch
          }
        })
          .then(function (response) {
            if(response.data.data.list != null) {
              if(response.data.data.list != null) {
                this.couponDetail = response.data.data.list
              }
            }
            this.pageInfo = response.data.data
          }.bind(this))
          .catch(function (response) {
            alert('getAllCompanyAxios ERROE ! ' + response)
          })
      },

      getMemberDetailByphone: function(value) {
        if(value.customer == null){
          this.$emit('getMemberDetailByphone', "")
        }else {
          this.$emit('getMemberDetailByphone', value.customer.phone)
        }
      },

      getMemberDetailBynicname: function(value) {
        if(value.customer == null){
          this.$emit('getMemberDetailBynicname', "")
        }else {
          this.$emit('getMemberDetailBynicname', value.customer.nickname)
        }

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
