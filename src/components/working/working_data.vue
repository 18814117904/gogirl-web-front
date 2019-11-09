<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins" style="height: 100%;">
        <div class="ibox-title">
          <h5>工作台</h5>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0px">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content m-b-sm" style="display: block;margin-bottom:10px">
                <form id="toolbar" novalidate="novalidate">
                  <div class="form-inline search-form">
                    <div class="form-group" style="margin-left: 10px">
                      <label >所选店铺</label>
                      <el-select filterable placeholder="请选择 店铺" v-model="storeSelected" @change="reChooseStore" style="max-width:100%;">
                        <el-option label="所有门店" value=""></el-option>
                        <el-option
                          v-for="type in storeList"
                          :key="type.id"
                          :label="type.name"
                          :value="type.id">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="form-group" style="margin-left: 20px">
                      <el-radio-group v-model="radio2">
                        <el-radio :label="3">今日</el-radio>
                        <el-radio :label="6">自定义</el-radio>
                      </el-radio-group>
                      <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                      </el-date-picker>
                    </div>
                    <div class="form-group" style="margin-left: 10px">
                      <button type="button" class="btn btn-sm btn-primary" @click="search(1)">
                        <i class="fa fa-search"></i>&nbsp;搜索
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="wrapper wrapper-content">
                <div class="row">
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{scheduleNumber}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>预约(个)</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{orderSumNumber}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>订单(个)</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{orderTotelPrice}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>订单金额(元)</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{customerBalanceNum}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>会员卡(个)</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{sumCharge}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>充卡金额(元)</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{sumBalance}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>开卡余额(元)</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{consumeCustomerNum}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>新增客户(个)</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{customerNum}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>新增用户(个)</small>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{unitPrice}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>客单价(元/个)</small>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-3">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{purchaseRate}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>复购率</small>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-3" style="width: 50%">
                    <div class="ibox float-e-margins">
                      <div class="ibox-title" style="text-align: center">
                        <p style="font-size:14px"><b>{{salesRatio}}</b></p>
                      </div>
                      <div class="ibox-content" style="text-align: center">
                        <h1 class="no-margins"></h1>
                        <small>类别销售比例</small>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserinfo} from '@/vuex/session-storage'
  export default {
    name: 'working_data',
    data: function () {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: [],
        radio2: 3,
        scheduleNumber: 0,
        orderSumNumber: 0,
        orderTotelPrice: 0,
        consumeCustomerNum: 0,
        customerBalanceNum: 0,
        customerNum: 0,
        sumBalance: 0,
        sumCharge: 0,
        storeList: [],
        storeSelected: '',
        reChooseStore: '',
        salesRatio: '',
        purchaseRate: '',
        unitPrice: 0
      }
    },
    filters:{
    },
    mounted: function () {
      this.initStoreManage();
      this.initStatisticsData();
    },
    methods: {
      search: function() {
        this.initStatisticsData();
      },
      initStoreManage: function() {
        this.$axios({
          url: this.$BASE_STORE_URL +  "shop/queryShopForAll",
          method: "get",
        }).then(res => {
          console.log(res)
          this.storeList = res.data.data
        })
      },
      initStatisticsData: function() {
        var startDate, endDate
        if(this.radio2 == 3) {
          const nowDate = new Date()
          const Y = nowDate.getFullYear()
          var M = nowDate.getMonth() + 1
          var D = nowDate.getDate()
          if(M < 10){
            M = '0' + M
          }
          if(D < 10) {
            D = '0' + D
          }
            startDate = endDate = Y + '-' + M + '-' + D
        }else if(this.radio2 == 6) {
          startDate = this.value7 == null ? "" : this.value7[0]
            endDate = this.value7 == null ? "" : this.value7[1]
        }

        this.$axios({
          url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
          method: "get",
          params:{
            departmentId: this.storeSelected,
            startTime:startDate ,
            endTime:endDate
          }
        }).then(res => {
          console.log(res)
          this.scheduleNumber = res.data.data

        })
        this.$axios({
          url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
          method:"get",
          params:{
            departmentId:this.storeSelected,
            startTime:startDate ,
            endTime:endDate
          }
        }).then(res => {
          console.log(res)
          this.orderSumNumber = res.data.data.sumNumber
          this.orderTotelPrice = res.data.data.totelPrice
        })
        this.$axios({
          url: this.$BASE_USER_URL +  "countCustomerInfo",
          method: "get",
          params:{
            departmentId:this.storeSelected,
            startTime:startDate ,
            endTime:endDate
          }
        }).then(res => {
          this.consumeCustomerNum = res.data.data.consumeCustomerNum
          this.customerBalanceNum = res.data.data.customerBalanceNum
          this.customerNum = res.data.data.customerNum
          this.sumBalance = res.data.data.sumBalance
          this.sumCharge = res.data.data.sumCharge
        })

        this.$axios({
          url: this.$BASE_USER_URL + "countCategorySalesRatio",
          method:"get",
          params:{
            departmentId:this.storeSelected,
            startTime:startDate ,
            endTime:endDate
          }
        }).then(res => {
          console.log(res)
          var de = res.data.data
          var strMessage = '';
          for(var i = 0; i < de.length; i++) {
            strMessage += de[i].type +': '+  de[i].ratio + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
          }
          this.salesRatio = strMessage
        })

        this.$axios({
          url: this.$BASE_USER_URL + "countRepeatPurchaseRate",
          method:"get",
          params:{
            departmentId:this.storeSelected,
            startTime:startDate ,
            endTime:endDate
          }
        }).then(res => {
          console.log(res)
          this.purchaseRate = res.data.data
        })

        this.$axios({
          url: this.$BASE_USER_URL + "countCustomerUnitPrice",
          method:"get",
          params:{
            departmentId:this.storeSelected,
            startTime:startDate ,
            endTime:endDate
          }
        }).then(res => {
          console.log(res)
          this.unitPrice = res.data.data
        })
      }
    }
  }
</script>
<style scoped>
</style>
