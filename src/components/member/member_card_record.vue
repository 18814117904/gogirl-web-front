<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <!--<div class="ibox-title">
          <h5>会员卡消费记录</h5>
        </div>-->
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group">
                      <!--<label >姓名</label>-->
                      <el-input placeholder="姓名" v-model="memnerName" :disabled="true">
                        <template slot="prepend">&nbsp;&nbsp;&nbsp; 姓名：&nbsp;&nbsp;&nbsp;</template>
                      </el-input>
                    </div>

                    <div class="form-group">
                      <el-input placeholder="手机号码" v-model="attr.phone" :disabled="true">
                        <template slot="prepend">手机号码：</template>
                      </el-input>
                    </div>



                    <div class="form-group" style="margin-top: 6px;">
                      <el-input placeholder="当前余额" v-model="cardBalance" :disabled="true">
                        <template slot="prepend">当前余额：</template>
                      </el-input>
                    </div>

                    <div class="form-group" style="margin-top: 6px;">
                      <el-input placeholder="当前折扣" v-model="currentDiscount" :disabled="true">
                        <template slot="prepend">当前折扣：</template>
                      </el-input>
                    </div>

                    <div class="form-group" style="margin-top: 6px;">
                      <el-input placeholder="会员卡" v-model="customerBalance" :disabled="true">
                        <template slot="prepend">会员卡：&nbsp;&nbsp; &nbsp;</template>
                      </el-input>
                    </div>

                    <div class="form-group" style="margin-top: 6px;">
                      <el-input placeholder="折扣率" v-model="discountRate" :disabled="true">
                        <template slot="prepend">折扣率：&nbsp;&nbsp; &nbsp;</template>
                      </el-input>
                    </div>

                    <!--<div class="form-group">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                    </div>-->
                  </div>
                </form>
              </div>

              <div class="ibox-content">
                <div class="bootstrap-table">
                  <!--<div class="fixed-table-toolbar">
                    <div class="columns columns-right btn-group pull-right">
                      <button class="btn btn-default" type="button" name="refresh" title="刷新" @click="getAllPurchasingPlan(pageInfo.pageNum)">
                        <i class="glyphicon glyphicon-refresh icon-refresh"></i>
                      </button>
                    </div>
                  </div>-->
                  <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="fixed-table-header" style="display: none;">
                      <table></table>
                    </div>
                    <div class="fixed-table-body" style="width: 100%;height: 250px;overflow: auto">
                      <div class="fixed-table-loading" style="top: 38px; display: none;">
                        <img src="/content/image/loading.gif">
                      </div>


                      <el-table
                        :data="memberuser"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="type"
                          label="类型"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.type | formatStatus(scope.row.type)}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="orderAmount"
                          label="金额"
                        >
                          <template slot-scope="scope" >
                            ￥{{scope.row.orderAmount/100}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="bestowAmount"
                          label="送"
                        >
                          <template slot-scope="scope" >
                            ￥{{scope.row.bestowAmount/100}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="currentBalance"
                          label="余额"
                        >
                          <template slot-scope="scope" >
                            ￥{{scope.row.currentBalance/100}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="source"
                          label="收款方式"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.source | formatSource(scope.row.source)}}
                          </template>
                        </el-table-column>

                        <!--<el-table-column
                          prop="discount"
                          label="折扣"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.discount}}
                          </template>
                        </el-table-column>-->

                        <el-table-column
                          prop="refereeId"
                          label="推荐人"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.refereeId == null ? '' : scope.row.refereeId}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="refereeId"
                          label="店铺"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.departmentName == null ? '' : scope.row.departmentName}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="remark"
                          label="备注"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.remark}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="time"
                          label="记录时间"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.time}}
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
                            <el-button type="primary" plain @click="detailDate(scope.row.id)">详情</el-button>
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
    export default {
        name: "member_record",
      props: ["attr"],
      data: function () {
        return {
          memberuser:[],
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
          isDoubleClick: false,
          telphone: ''
        }
      },
      computed:{
        memnerName() {
          if(this.attr.storeRecordRealName != null && this.attr.storeRecordRealName != ''){
            return this.attr.storeRecordRealName
          }else if(this.attr.realName != null && this.attr.realName != '') {
            return this.attr.realName
          }else if(this.attr.nickname != null && this.attr.nickname != ''){
            return this.attr.nickname
          }else {
            return ''
          }
          },
        customerBalance(){
             return this.attr.customerBalance == null ? '普通会员' : this.attr.customerBalance.level
        },
        cardBalance () {
          return this.attr.customerBalance == null? '0':this.attr.customerBalance.balance == null ? '':this.attr.customerBalance.balance/100
        },
        currentDiscount () {
          return this.attr.customerBalance == null ? '1.0': this.attr.customerBalance.currentDiscount
        },

        discountRate() {
          return this.attr.customerBalance == null ? '0' : this.attr.customerBalance.discountRate
        }
      },
      mounted: function () {
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },
      // 过滤器
      filters:{
        formatStatus: function(value){
          if(value == 1){
            return '充值';
          }else if(value == -1){
            return '消费';
          }else if(value == 2){
            return '首冲'
          }else{
            return '';
          }
        },

        formatSource: function(value) {
          if(value == 1){
            return '用户端微信支付'
          }else if(value == 2){
            return '会员卡收款'
          }else if(value == 3){
            return '其他'
          }else if(value == 4) {
            return '用户端微信支付充值'
          }
          else if(value == 5){
            return 'pos收款';
          }else if(value == 6){
            return '现金收款';
          }else if(value == 7){
            return '大众点评收款'
          }else if(value == 8){
            return '微信扫码支付';
          }else if(value == 9){
            return '团购'
          }else if(value == 10) {
            return '免单'
          }else if(value == 11) {
            return '会员帮付'
          }
          else{
            return '';
          }
        }
        },
      methods: {
        // 第一页
        getFirstPage () {
          this.getAllPurchasingPlan(this.pageInfo.firstPage)
        },
        // 获取最后一页
        getLastPage () {
          this.getAllPurchasingPlan(this.pageInfo.lastPage)
        },
        // 下一页
        getNextPage () {
          if (this.pageInfo.hasNextPage) {
            this.getAllPurchasingPlan(this.pageInfo.nextPage)
          }
        },
        // 上一页
        getPrePage () {
          if (this.pageInfo.hasPreviousPage) {
            this.getAllPurchasingPlan(this.pageInfo.prePage)
          }
        },
        // 服务详情
        /*detail: function (no) {
          if (this.isDoubleClick && this.nodetail === no) {
            this.$router.push({ name: 'storeuser_modify',params: {nodetail: this.nodetail } })
          }
          this.isDoubleClick = true
          this.nodetail = no
          setTimeout(() => {
            this.isDoubleClick = false
          }, 500)
        },*/
        getAllPurchasingPlan: function (pageNum) {
          var url = this.$BASE_USER_URL + 'getBalanceRecord'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              customerId: this.attr.id,
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              /*response.data.data.list.forEach(function(item,index){
                if(item.storeRecordRealName==null){
                  if(item.realName == null){
                    item.storeRecordRealName = item.nickname
                  }else{
                    item.storeRecordRealName = item.realName
                  }
                }
              })*/
              if(response.data.data != null){
                this.memberuser = response.data.data.list
              }
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        }
        /*create: function () {
          this.$router.push({ path: '/storeuser/add' })
        },*/
        // 搜索 ============================================================================================================
      }
    }
</script>

<style scoped>
  @import "../../../static/css/selectImg.css";
  @import "../../../static/css/iconfont.css";

</style>
<style>
  @import "../../../static/css/selectImg.css";
  @import "../../../static/css/iconfont.css";
  .tan .el-dialog {
    width: 60%;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #606266
  }

  element.style {
    margin-top: 0vh
  }

  .Tan .el-dialog {
    width: 60%;
  }
</style>
