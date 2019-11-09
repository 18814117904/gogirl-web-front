<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>会员卡管理</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">

              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">

                    <div class="form-group" style="margin-left: 10px">
                      <label >名字</label>
                      <input class="form-control" placeholder="名字" type="text" v-model="realName">
                    </div>

                    <div class="form-group" style="margin-left: 10px">
                      <label >手机号码</label>
                      <input class="form-control" placeholder="手机号码" type="text" v-model="telphone">
                    </div>

                    <div class="form-group">
                      <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                      <button type="button" class="btn btn-sm btn-primary" @click="create()">
                        <i class="fa fa-plus"></i>&nbsp;新增会员卡
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
                        :data="memberuser"
                        style="width: 100%"
                        stripe
                      >
                        <el-table-column
                          prop="storeRecordRealName"
                          label="姓名"
                        >
                          <template slot-scope="scope" >
                              {{scope.row | formatName(scope.row)}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="phone"
                          label="手机号码"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.phone}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="firstChargeTime"
                          label="开卡时间"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.customerBalance.firstChargeTime}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="level"
                          label="会员卡"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.customerBalance | formatStatus(scope.row.customerBalance)}}
                          </template>
                        </el-table-column>

                        <el-table-column
                          prop="balance"
                          label="余额"
                        >
                          <template slot-scope="scope" >
                            ￥ {{scope.row.customerBalance == null? '0':scope.row.customerBalance.balance == null ? '':scope.row.customerBalance.balance/100}}
                          </template>
                        </el-table-column>

                        <!--<el-table-column
                          prop="currentDiscount"
                          label="推荐人"
                        >
                          <template slot-scope="scope" >
                            {{scope.row.customerBalance == null ? '': scope.row.customerBalance.referee == null ? '' : scope.row.customerBalance.referee.name}}
                          </template>
                        </el-table-column>-->

                        <!--<el-table-column
                          prop="registerTime"
                          label="注册时间"
                        >
                          <template slot-scope="scope" >
                              {{scope.row.registerTime}}
                          </template>
                        </el-table-column>-->

                        <el-table-column label="操作">
                          <template slot-scope="scope">
                            <el-button-group>
                              <el-button type="primary" plain @click="detailDate(scope.row)">详情</el-button>
                              <el-button type="danger" plain @click="recharge(scope.row)">充值</el-button>
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
          <el-dialog title="新增会员卡" :visible.sync="addVisible" v-if='addVisible' style=" z-index: 10000; width: 100%; height: 100%" center>  <!-- v-if='addVisible'   width="70%"-->
            <member_card_new v-on:childClick="childClick" ></member_card_new>
          </el-dialog>
        </div>

        <div class="tan" v-dialogDrag>
          <el-dialog title="会员卡充值" :visible.sync="rechargeVisible" v-if='rechargeVisible' style=" z-index: 10000; width: 100%; height: 100%" center>  <!-- v-if='addVisible'   width="70%"-->
            <member_card_recharge :attr="rechargeMemberCard" v-on:rechargeClick="rechargeClick" ></member_card_recharge>
          </el-dialog>
        </div>

        <div class="Tan" v-dialogDrag>
          <el-dialog title="会员卡消费记录" :visible.sync="UpDatePic" v-if='UpDatePic' style=" z-index: 10000; width: 100%; height: 98%; margin-top: 0vh;" center>
            <member_card_record :attr="memberCard" v-on:updateClick="updateClick" style="margin-top: 0px"></member_card_record>
          </el-dialog>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import member_card_record from '@/components/member/member_card_record'
  import member_card_new from '@/components/member/member_card_new'
  import member_card_recharge from '@/components/member/member_card_recharge'
    export default {
        name: "member_index",
      components: {member_card_record, member_card_new, member_card_recharge},
      data: function () {
        return {
          memberuser: [],
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
          memberCard: {},
          rechargeMemberCard: {},
          //新增
          addVisible: false,
          //充值
          rechargeVisible: false,
          //修改
          UpDatePic: false,
          nodetail: '',
          isDoubleClick: false,
          telphone: '',
          realName: ''
        }
      },
      mounted: function () {
        this.getAllPurchasingPlan(this.pageInfo.pageNum)
      },
      filters:{
        formatStatus: function(value){
          if(value == null){
            return '普通会员';
          }else {
            return value.level;
          }
        },
        formatName: function(value){
          if(value.storeRecordRealName != null && value.storeRecordRealName != ''){
            return value.storeRecordRealName
          }else if(value.realName != null && value.realName != '') {
            return value.realName
          }else if(value.nickname != null && value.nickname != ''){
            return value.nickname
          }else {
            return ''
          }
        }
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
          var url = this.$BASE_USER_URL + 'selectByCustomerCard'
          var getAllPurchasingPlanAxios = this.$axios.create({})
          getAllPurchasingPlanAxios.get(url, {
            params: {
              pageNum: pageNum,
              pageSize: this.pageInfo.pageSize
            }
          })
            .then(function (response) {
              response.data.data.list.forEach(function(item,index){
                if(item.storeRecordRealName==null){
                  if(item.realName == null){
                    item.storeRecordRealName = item.nickname
                  }else{
                    item.storeRecordRealName = item.realName
                  }
                }
              })
              this.memberuser = response.data.data.list
              this.pageInfo = response.data.data
            }.bind(this))
            .catch(function (response) {
              alert('getAllCompanyAxios ERROE ! ' + response)
            })
        },
        detailDate: function(value){
          this.memberCard = value;
          this.UpDatePic = true
        },

        recharge: function(value) {
          this.rechargeVisible = true
          this.rechargeMemberCard = value
        },

        rechargeClick: function() {
          this.rechargeVisible = false;
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },

        updateClick: function(){
          this.UpDatePic = false;
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        create: function() {
          this.addVisible = true
        },
        //点击令弹框消失
        childClick(data) {
          this.addVisible = false
          this.getAllPurchasingPlan(this.pageInfo.pageNum)
        },
        /*create: function () {
          this.$router.push({ path: '/storeuser/add' })
        },*/
        // 搜索 ============================================================================================================
        search (pageNum) {
          this.telphone = this.telphone.replace(/(^\s*)|(\s*$)/g, '')
          if (this.telphone === '' && this.realName === '') {
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
            phone: this.telphone,
            realName: this.realName,
            pageNum: pageNum,
            pageSize: 6
          })
          searchAxios.post(this.$BASE_USER_URL + 'selectByCustomerCard', postData)
            .then(function (response) {
              this.memberuser = response.data.data.list
              this.pageInfo = response.data.data
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
    width: 60%;
    height: 90%;
  }

  element.style {
    margin-top: 0vh
  }

  .Tan .el-dialog {
    margin-top: 0px;
    padding-top: 0px;
    width: 80%;
  }
</style>
