<template>
  <div class="h100 sx orderIndex">
    <!--导航-->
    <div class="sx-nav">
      <base-nav :navData="navData"></base-nav>
    </div>
    <div class="newOrder">
      <el-date-picker
        v-model="form.birthdayName"
        type="month"
        @change="dateChangebirthday"
        format="yyyy-MM"
        value-format="yyyy-MM"
        placeholder="选择月份并导出对应订单"
        class="mr-10"
      ></el-date-picker>
      <el-select filterable placeholder="请选择 店铺" v-model="storeSelected" @change="reChooseStore" style="max-width:100%; float: left">
        <el-option label="请选择 店铺"  value="" />
        <el-option
          v-for="store in stores"
          :key="store.id"
          :label="store.name"
          :value="store.id">
        </el-option>
      </el-select>
      <div class="check" style="padding-left: 10px">
        <el-input class="mr-10" type="text" placeholder="请输入会员名称" v-model="storeScheduleUserName"></el-input>
        <el-input class="mr-10" type="text" placeholder="请输入手机号码" v-model="userPhone"></el-input>

        <button type="button" class="btn btn-sm btn-success" @click="soushuo()">
          <i class="fa fa-search"></i>&nbsp;搜索
        </button>

        <!--<el-button @click="soushuo()" class="btn-blue ml-10" size="medium">
          搜索
        </el-button>-->
        <!--<el-button class="btn-blue" style="margin-left: 30px">
          <router-link to="newOrders" target="_blank">+ 新建订单</router-link>
        </el-button>-->
      </div>
    </div>
    <el-row class="title center">
      <el-col :span="13" class="flex">
        <p style="width: 23%">服务款式</p>
        <p style="width: 13%">单价</p>
        <p style="width: 30%">手艺人</p>
        <p style="width: 20%">服务时间</p>
      </el-col>
      <el-col :span="3">会员</el-col>
      <el-col :span="2">合计金额</el-col>
      <el-col :span="2">状态</el-col>
      <el-col :span="4">操作</el-col>
    </el-row>
    <el-card class="box-card" v-for="item in option_area" :key="item.id" shadow="hover">
      <div slot="header" class="clearfix" style="text-align: left;">
        <span class="pr20">{{item.createTime}}</span>
        <!-- <span class="pr20">订单来源: {{ORDER_TYPE.find(type => type.id === item.orderType).name || '无'}}</span> -->
        <span style="padding-left: 15px">开单人： {{item.userManage && item.userManage.name}}</span>
        <span style="padding-left: 15px">所属店铺：{{item.departmentName}}</span>
      </div>
      <el-row>
        <el-col :span="13" class="serve" :style="item.listOrderServer.length < 1 ? 'height: 60px' : ''">
          <!-- 款式 -->
          <div v-for="list in item.listOrderServer" :key="list.id" class="serve-item">
            <div style="width: 25%">
              <p style="padding-bottom: 10px;">{{list.serve && list.serve.name || '无服务'}}</p>
              <p>{{list.produceName || '无款式'}}</p>
            </div>
            <!-- 单价 -->
            <p style="width: 15%">￥{{list.servePrice}}</p>
            <!-- 技师 -->
            <div style="width: 35%">
              <p v-if="list.listTechnicianManage.length && list.listTechnicianManage.length > 0">
                <span v-for="t in list.listTechnicianManage" :key="t.id" class="pr20">{{t.name|| '无技师'}}</span>
              </p>
              <p v-else class="text-pink">未选择</p>
            </div>
            <!-- 服务时间 -->
            <p style="width: 25%" v-if="list.executionStatus == 1" class="text-blue" @click="timeStart(list)">开始</p>
            <p style="width: 25%" v-if="list.executionStatus == 2" class="text-blue" @click="timeEnd(list)">结束</p>
            <p style="width: 25%" v-if="list.executionStatus == 3">{{list.startTime}} - {{list.endTime}}</p>
          </div>
        </el-col>
        <el-col :span="3" class="text-blue">
          <div >
            <p style="padding-bottom: 10px;">{{item.nickName}}</p>
            <p>{{item.customer && item.customer.phone || '无'}}</p>
          </div>
        </el-col>
        <el-col :span="2">￥{{(item.totalPrice - item.discountPrice).toFixed(2)}}</el-col>
        <el-col :span="2">
          <p>{{ORDER_TYPR_STATUS.find(s => s.id === item.status).name}}</p>
        </el-col>
        <el-col :span="4">
          <span class="pointer text-blue" @click="details(item)">详情</span>
          <!--<span style="padding: 0 20px;">|</span>
          <span class="pointer text-blue pr20" v-if="item.status === 1" @click="revise(item)">修改</span>-->
          <!--<el-button
            class="btn-pink"
            size="small"
            v-if="item.status === 1 && item.canCharge"
            @click="getMoney(item)">收款</el-button>
          <el-button class="btn-blue"
            size="small"
            v-if="item.status === 2"
            @click="getMoneyoffline(item)">已收款</el-button>-->
          <span
            class="pointer text-blue"
            v-if="item.status === 3 || item.status === 4"
            @click="details(item)">数据完整度{{item.dataIntegrity || 0}}%</span>
        </el-col>
      </el-row>
    </el-card>
    <!--收款弹框设置-->
    <charge-money
      v-if="dialogVisible"
      :isHasSource="isHasSource"
      :chargeItem="orderList"
      v-on:cancel="cancel"
      v-on:sureGiveMoney="sureGiveMoney"
    ></charge-money>
    <!--分页-->
    <div class="sx-footer">
      <div class="Block">
        <el-pagination
          layout="prev, pager, next"
          :total="this.total"
          @current-change="handleCurrentChange"
          :page-size="this.pageSize"
          :current-page.sync="pageNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import config from "./../../config/config";
import { mapMutations } from "vuex";
import BaseNav from "../../components/common/BaseNav";
import ChargeMoney from "../../components/common/ChargeMoney";
//引入cookies和删除cookie
import { getCookie, removeCookie } from "../../config/mUtils";
import { ORDER_TYPR_STATUS, ORDER_TYPE } from "../../config/type.js";

export default {
  components: {
    BaseNav,
    ChargeMoney
  },

  data() {
    return {
      ORDER_TYPR_STATUS,
      ORDER_TYPE,
      stores: [],
      storeSelected: '',
      form: {
        birthdayName: ""
      },
      //保存每个订单的集合
      orderList: {},
      //已收款留言
      say: "",
      //删除订单原因的留言
      Say: "",
      //获取表格数据
      option_area: [],
      //设置头部样式
      navData: "订单列表",
      //总页数
      total: null,
      //设置每页条数
      pageSize: 10,
      //设置弹框的初始状态
      dialogVisible: false,
      //页码
      pageNum: 1,
      //条数
      //保存全局变量来设置所有服务的状态
      executionStatus: [],
      userId: this.$route.query.userId,
      userPhone: this.$route.query.userPhone == null ? "" : this.userPhone,
      searchTelphone: "",
      storeScheduleUserName: "",
      submitting: false,
      isHasSource: false, // 是否已经记录客户来源
      reminder: this.$route.query.reminder || null,
      status: this.$route.query.status || null,
      dataInfo: this.$route.query.dataInfo || null
    };
  },
  computed: {
    //把cookie信息转化成对象
    getUserName() {
      return getCookie("userName");
    }/*,
    getDepartmentId() {
      return getCookie("departmentId");
    }*/
  },
  methods: {
    //会员姓名
    goPerson(userId, userName, userPhone) {
      // this.$router.push({
      //   path: "person",
      //   params: {
      //     userId: userId,
      //     userName: userName,
      //     userPhone: userPhone
      //   }
      // });
      let routeData = this.$router.resolve(
        { path: 'person',
          query: {
            userId: userId,
            userName: userName,
            userPhone: userPhone
          }
        });
      window.open(routeData.href, '_blank');
    },
    soushuo(telephone = this.userPhone) {
      let that = this;
      this.getOrders();
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
    },
    dateChangebirthday(createTime) {
      if (!createTime) return;
      var deID = this.storeSelected;
      window.location.href =
        config.order2 +
        "orderExport/listExportOrder?departmentId=" +
        deID +
        "&exportTime=" +
        createTime;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.$router.replace("/order/order_index?pageNum=" + val);
      this.getOrders();
    },
    //进入页面就渲染
    getOrders() {
      let that = this;
      this.$axios({
        url: config.order + "ordermanage/queryOrderManageForPage",
        method: "get",
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          departmentId: this.storeSelected,
          orderUser: this.userId,
          telephone: this.userPhone,
          storeScheduleUsername: this.storeScheduleUserName,
          reminder: this.reminder,
          status: this.status,
          dataInfo: this.dataInfo
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.total = res.data.data.total;
          res.data.data.list.forEach(function(item, index) {
            item.nickName =
              item.storeScheduleUsername ||
              (item.customer && item.customer.realName) ||
              (item.customer && item.customer.nickname);
            // 判断是否显示已收款按钮, 每个服务都必须有技师并且executionStatus === 3
            for (let i = 0, len = item.listOrderServer.length; i < len; i++) {
              item.canCharge = true;
              if (
                (item.listOrderServer[i].listTechnicianManage &&
                  item.listOrderServer[i].listTechnicianManage.length < 1) ||
                item.listOrderServer[i].executionStatus !== 3
              ) {
                item.canCharge = false;
                break;
              }
            }
          });
          this.option_area = res.data.data.list;
        }
      });
    },

    //点击修改按钮进入修改订单的页面跟每个的订单关联起来
    revise(row) {
      // this.$router.push({
      //   path: "newOrders",
      //   query: { orderId: row.id }
      // });
      let routeData = this.$router.resolve(
        { path: 'newOrders',
          query: {
            orderId: row.id
          }
        });
      window.open(routeData.href, '_blank');
    },

    //进入详情页
    details(row) {
      // this.$router.push({
      //   path: "orderDetail",
      //   query: { orderId: row.id }
      // });
      let routeData = this.$router.resolve(
        { path: 'orderDetail',
          query: {
            orderId: row.id
          }
        });
      window.open(routeData.href, '_blank');
    },
    //线上收款接口
    getMoney(val) {
      console.log('val: ', val);
      this.$axios({
        url: config.order + "ordermanage/modifyOrderManage",
        method: "get",
        params: {
          id: val.id,
          status: 2,
          orderUser: val.orderUser
        }
      }).then(res => {
        this.getOrders();
      });
    },
    // 确认收钱弹框
    getMoneyoffline(val) {
      this.orderList = val;
      this.isHasSource = Boolean(val.customer && val.customer.customerSource);
      this.dialogVisible = true;
    },
    // 隐藏收钱弹窗
    cancel() {
      this.dialogVisible = false;
    },
    // 确认收款
    sureGiveMoney(payForm) {
      let params = this.$qs.stringify({
        multiplePaymentType: JSON.stringify(payForm.paymentTypes),
        id: this.orderList.id,
        message: payForm.say,
        status: 3,
        orderUser: (this.orderList.customer && this.orderList.customer.id) || ""
      });
      this.$axios({
        url: config.order + "ordermanage/modifyOrderStatusFinash",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: params
      }).then(res => {
        if (res.data && res.data.success) {
          this.dialogVisible = false;
          this.getOrders();
        } else {
          this.$message({
            type: "error",
            message: res.data.message || "收款失败， 请稍后重试"
          });
        }
      });
    },
    //点击开始时间触发的函数
    timeStart(arr) {
      this.$axios({
        url: config.order + "orderserve/modifyOrderServe",
        method: "get",
        params: {
          id: arr.id,
          executionStatus:
            arr.executionStatus == null ? "1" : arr.executionStatus
        }
      }).then(res => {
        if (res.data.success == true) {
          this.getOrders();
        }
      });
    },
    //点击结束时间触发的函数
    timeEnd(arr) {
      this.$axios({
        url: config.order + "orderserve/modifyOrderServe",
        method: "get",
        params: {
          id: arr.id,
          executionStatus: arr.executionStatus
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.getOrders();
        }
      });
    }
  },
  created() {
    this.pageNum = parseInt(this.$route.query.pageNum) || 1;
    this.getOrders();
    this.reChooseStore()
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.check {
  display: flex;
}
.flex {
  display: flex;
  align-items: center;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.orderIndex {
  .newOrder {
    margin-bottom: 20px;
    .mr-10 {
      float: left;
      margin-right: 10px;
      width: 25%;
    }
    span {
      padding: 8px 0px 10px 3px;
      background: #4d82b0;
      a {
        color: #fff;
      }
    }
  }
}
.title {
  margin-bottom: 20px;
  margin-top: 30px;
  border: 1px solid #eee;
  padding: 15px 20px;
  background-color: #f8f8f8;
  border-radius: 6px;
}
.box-card {
  margin-bottom: 20px;
}
.center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.serve {
  margin: -20px 0;
}
.serve-item {
  display: flex;
  width: 90%;
  border-right: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  padding: 20px 0;
}
.serve-item:nth-of-type(1) {
  border-top: none;
}
.technicianManage {
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sx-footer {
  padding: 0px;
  background: #fff;
  text-align: center;

}
</style>
