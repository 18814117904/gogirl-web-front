<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>优惠券管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-danger" @click="create()">
                        <i class="fa fa-plus"></i>&nbsp;新建券
                      </button>

                      <button type="button" class="btn btn-sm btn-success" @click="grant()">
                        <i class="fa fa-upload"></i>&nbsp;发放券
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
                        :data="coupon"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="name"
                          label="券名称"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.name}}
                          </template>
                        </el-table-column>


                        <el-table-column
                          prop="effectiveDate"
                          label="有效日期"
                        >
                          <template slot-scope="scope" >
                            <span v-if="scope.row.validType == 1"> {{scope.row.validStartTime}} <span style="color: #00b4aa">到</span> {{scope.row.validEndTime}}</span>
                            <span v-if="scope.row.validType == 2"> {{scope.row.validDate}} <span style="color: #00b4aa">天</span> </span>
                          </template>
                        </el-table-column>


                        <!--<el-table-column
                          prop="validStartTime"
                          label="开始时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.validStartTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="validEndTime"
                          label="结束时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.validEndTime}}
                          </template>
                        </el-table-column>-->



                        <el-table-column
                          prop="receiveQuantity"
                          align="center"
                          label="发放数量"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.receiveQuantity}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="useQuantity"
                          align="center"
                          label="使用次数"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.useQuantity}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="stock"
                          align="center"
                          label="库存"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.allQuantity - scope.row.receiveQuantity}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="state"
                          align="center"
                          label="状态"
                        >
                          <template slot-scope="scope" >

                            <div @click="modifyStatus(scope.row.id, scope.row.state)">
                              <span v-if="scope.row.state == 1" style="color: green"> 开启</span>
                              <span v-else style="color: red"> 关闭</span>
                            </div>

                            <!--{{scope.row.state | getStatus(scope.row.state)}}-->
                          </template>
                        </el-table-column>

                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button-group>
                            <el-button type="danger" plain @click="updateDate(scope.row.id)">修改</el-button>
                            <el-button type="primary" plain @click="detailDate(scope.row)">详情</el-button>
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
          <el-dialog title="新建优惠券" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 90%" center>  <!-- v-if='addVisible'   width="70%"-->
            <coupon_new v-on:childClick="childClick" ></coupon_new>
          </el-dialog>
        </div>

        <div class="tan" v-dialogDrag>
          <el-dialog title="发放优惠券" :visible.sync="grantVisible" v-if='grantVisible' style=" z-index: 10000; width: 100%; " center>  <!-- v-if='addVisible'   width="70%"-->
            <coupon_grant v-on:grantClick="grantClick" ></coupon_grant>
          </el-dialog>
        </div>

        <div class="Tan" v-dialogDrag>
          <el-dialog title="修改优惠券" :visible.sync="UpDatePic" v-if='UpDatePic' style=" z-index: 10000; width: 100%; height: 90%" center>
            <coupon_modify :attr="nodetail" v-on:updateClick="updateClick"></coupon_modify>
          </el-dialog>
        </div>

        <div class="Summ" v-dialogDrag>
          <el-dialog title="优惠券详情" :visible.sync="summaryDate" v-if='summaryDate' style=" z-index: 10000; width: 100%; height: 90%" center>
            <coupon_detail :couponDetailIndex="couponDetailIndex" v-on:getMemberDetailBynicname="getMemberDetailBynicname" v-on:getMemberDetailByphone="getMemberDetailByphone"></coupon_detail>
          </el-dialog>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import coupon_modify from '@/components/coupon/coupon_modify'
  import coupon_new from '@/components/coupon/coupon_new'
  import coupon_grant from '@/components/coupon/coupon_grant'
  import coupon_detail from '@/components/coupon/coupon_detail'
    export default {
      name: "activety_index",
      components: {coupon_modify, coupon_new, coupon_detail, coupon_grant},
      data: function () {
        return {
          coupon: [],
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
          couponDetailIndex: {
            id: ''
          },
          //新增
          addVisible: false,
          grantVisible: false,
          //修改
          UpDatePic: false,
          summaryDate: false,
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
        },

        geteffectiveDate(value) {
          if(value.validType == 1) {
            return value.validStartTime + ' 到 ' + value.validEndTime
          }else if(value.validType == 2) {
            return value.validDate + ' 天'
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
          var url = this.$BASE_USER_URL + 'selectByCoupon'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              this.coupon = response.data.data.list
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
        grant() {
          this.grantVisible = true
        },
        grantClick() {
          this.grantVisible = false
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        grantClick() {
          this.grantVisible = false
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
          this.couponDetailIndex.id = date.id
          this.summaryDate = true
        },
        getMemberDetailByphone(date) {
          this.summaryDate = false
          this.$router.push({ name: 'member_index',params: {byPhone: date } })
        },
        getMemberDetailBynicname(date) {
          this.summaryDate = false
          this.$router.push({ name: 'member_index',params: {byNickname: date } })
        },
        modifyStatus (id, status) {
          var searchAxios = this.$axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          var postData = this.$qs.stringify({
            couponId: id
          })
          searchAxios.post(this.$BASE_USER_URL + 'enablingStoppingCoupon', postData)
            .then(function (response) {
              this.$layer.msg(response.data.message)
              this.getAllPurchasingPlan(this.pageInfo.pageNum)
            }.bind(this))
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
