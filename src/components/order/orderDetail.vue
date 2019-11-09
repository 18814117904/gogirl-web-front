<template>
  <div class="orderDetail">
    <!--导航-->
    <div class="sx-nav">
      <base-nav :navData="navData"></base-nav>
    </div>
    <section>
      <header>
        <div class="delete" @click="cutOrder">删除订单</div>
        <h3>{{ORDER_TYPR_STATUS.find(o => o.id === orderInfo.status).name}}</h3>
        <div class="order-detail">
          <p><span>订单编号：</span><span>{{orderInfo.orderNo}}</span></p>
          <p><span>开单人员：</span><span>{{orderInfo.userManage && orderInfo.userManage.name}}</span></p>
          <p v-if="orderInfo.orderType==1"><span>订单来源：</span><span>线上订单</span></p>
          <p v-if="orderInfo.orderType==2"><span>订单来源：</span><span>线下订单</span></p>
          <p><span>开单时间：</span><span>{{orderInfo.createTime}}</span></p>
          <p><span>消费会员：</span><span>{{orderInfo.nickName==""?'大众点评':orderInfo.nickName}}</span></p>
          <p v-if="orderInfo.status === 3 || orderInfo.status === 4">
            <span>数据:</span>
            <span>{{orderInfo.dataIntegrity || 0}}%</span>
          </p>
        </div>
      </header>
      <main>
        <div class="sx-body">
          <el-table :data="listOrderServer" tooltip-effect="light">
            <el-table-column
              width="300"
              prop="serviceList"
              label="消费服务">
              <template slot-scope="scope">
                <div style="display: flex;">
                  <img style="width: 110px; height: 110px; margin-right: 10px;" :src="$BASE_PICTUREPATH_URL + scope.row.serviceList.pic.split(',')[0]">
                  <div style="display: flex; flex-direction: column; justify-content: center;">
                    <h6>{{scope.row.serviceList.type}}</h6>
                    <h6>{{scope.row.serviceList.name}}</h6>
                    <h6>{{scope.row.serviceList.produceName}}</h6>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="listTechnicianManage" label="手艺人">
              <template slot-scope="scope">
                <p v-for="ltm in scope.row.listTechnicianManage" :key="ltm.id">{{ltm.name}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="服务开始时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="endTime" label="服务结束时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="servePrice" label="单价" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.servePrice.toFixed(2) || scope.row.serve.price.toFixed(2)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="serveChangePrice" label="改价" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.serveChangePrice > 0 ? '+' + scope.row.serveChangePrice : scope.row.serveChangePrice}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="total">
          <span>订单金额：￥{{(orderInfo.totalPrice - 0).toFixed(2)}}</span>
          <span>优惠券：{{orderInfo.couponRelevancePrice > 0 ? '-￥' + orderInfo.couponRelevancePrice : '无'}}</span>
          <span>合计金额：{{(orderInfo.totalPrice - orderInfo.discountPrice).toFixed(2)}}</span>
          <!--<span class="doing" v-if="orderInfo.status==1" @click="getMoney">收款</span>
          <span class="done" v-if="orderInfo.status==2" @click="getMoneyoffline()">已收款</span>
          <span class="notdone" @click="notgetMoneyoffline()">撤回收款</span>-->
        </div>
      </main>
      <!--已收款的弹框-->
      <charge-money
        v-if="dialogVisible"
        v-on:cancel="cancel"
        v-on:sureGiveMoney="sureGiveMoney"
        :chargeItem="orderInfo"
        :isHasSource="isHasSource">
      </charge-money>
      <!--删除订单的确定的弹框-->
      <el-dialog title="提示" :visible.sync="DialogVisible" width="30%">
        <span>确认删除该订单吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureCutOrder">确认删除</el-button>
        </span>
      </el-dialog>

      <footer v-if="orderInfo.status !== 1">
        <p>发起收款时间：{{orderInfo.launchTime | changeDate}}</p>
        <div v-if="orderInfo.status === 3 || orderInfo.status === 4">
          <!--线上付款-->
          <p v-if="orderInfo.orderType === 1">线上付款时间：{{orderInfo.finishTime | changeDate}}</p>
          <!--线下服务-->
          <p v-if="orderInfo.orderType === 2">线下付款时间：{{orderInfo.finishTime | changeDate}}</p>
          <!--大众点评服务-->
          <p v-if="orderInfo.orderType === 3" >大众点评付款时间：{{orderInfo.finishTime | changeDate}}</p>
        </div>
        <p v-if="orderInfo.status==3 || orderInfo.status==4">支付方式：{{orderInfo.payTypeText}}</p>
        <p>订单备注：{{orderInfo.remark}}</p>
        <p>付款备注：{{orderInfo.message}}</p>
      </footer>
    </section>
    <!--款式切换的导航-->
    <div class="typeTab">
      <div class="Sx_tab_2">
        <el-button
          v-for="(type,index) in listOrderServer"
          :key="index"
          @click="getStatus(type.id,index)"
          :class="actIndex===index?'btn-blue':''"
        >{{type.serviceList.produceName}}</el-button>
      </div>
    </div>
    <!--记录表信息展示-->
    <div v-if="!isEdit">
      <div class="typeNode">
        <p class="title">记录表</p>
        <div class="record-content">
          <p><label>确定款式时间：</label><span>{{recordInfo.fixHour}}</span></p>
          <p>
            <label>服务是否超时：</label>
            <span v-if="recordInfo.isTimeOut === 1">是</span>
            <span v-if="recordInfo.isTimeOut === 2">否</span>
          </p>
          <p><label>超时原因：</label><span>{{recordInfo.linkCause}}</span></p>
          <p><label>用户反馈：</label><span>{{recordInfo.userFeedback}}</span></p>
          <p><label>美甲师反馈：</label><span>{{recordInfo.technicianFeedback}}</span></p>
          <p>
            <label>客照：</label>
            <span
              v-for="(img,index) in orderUpDatePic"
              :key="index"
              class="work-pic"
              :class="{border_yellow:index === 0}">
              <el-popover placement="top" trigger="hover" width="700">
                <img style="height: auto; max-width: 100%;" v-lazy="img.src">
                <img slot="reference" style="height: 100%; width: 100%;" v-lazy="img.src">
              </el-popover>
            </span>
          </p>
          <p><label>存在问题：</label><span>{{recordInfo.existingProblems}}</span></p>
          <p><label>解决方案：</label><span>{{recordInfo.solution}}</span></p>
          <p><label>售后反馈：</label><span>{{recordInfo.afterSaleFeedback}}</span></p>
        </div>
      </div>
      <!--确定修改款式记录-->
      <!--<div class="save">
        <el-button @click="modifyTypeNode()" class="btn-blue">修改</el-button>
      </div>-->
    </div>
    <!-- 记录表信息填写 -->
    <div class="typeNode">
      <order-edit-form
        v-if="isEdit"
        v-on:hideForm="hideForm"
        :recordForm="recordInfo"
        :orderServeId="orderServeId"
        :orderUpDatePic="orderUpDatePic"
        :actIndex="actIndex"></order-edit-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseNav from "../../components/common/BaseNav";
import ChargeMoney from "../../components/common/ChargeMoney";
import orderEditForm from './orderEditForm';
import config from "./../../config/config";
import { getDate } from "./../../config/date";
import { ORDER_TYPR_STATUS, PATMENT_TYPE_LIST } from "../../config/type.js";
export default {
  components: {
    BaseNav,
    ChargeMoney,
    orderEditForm
  },
  data() {
    return {
      // 设置头部样式
      navData: "订单详情",
      // 保存订单详情的信息
      orderInfo: {},
      // 获取到里面服务的数组
      listOrderServer: [],
      // 设置已收款弹框的初始状态
      dialogVisible: false,
      // 设置删除订单弹框的初始的状态
      DialogVisible: false,
      // 保存订单状态的获取当前的下标
      actIndex: 0,
      orderServeId: "",
      recordInfo: {},
      // 保存返回来的图片数据
      orderUpDatePic: [],
      id: '', // 订单id
      isHasSource: false, // 是否已经录入客户来源
      PATMENT_TYPE_LIST, // 支付方式
      ORDER_TYPR_STATUS, // 订单状态
      isEdit: false, // 是否为编辑状态
    };
  },
  filters: {
    changeDate(date) {
      return getDate(date, true);
    }
  },
  methods: {
    // 撤回收款
    notgetMoneyoffline() {
      this.$axios({
        url: config.order + "ordermanage/modifyOrderStatusCancel",
        method: "get",
        params: {
          id: this.id,
          status: 1
        }
      }).then(res => {
        if (res.data.success == true) {
          this.$router.push({
            path: "orderIndex"
          });
        }
      });
    },
    // 删除订单确认弹窗
    cutOrder() {
      this.DialogVisible = true;
    },
    //确定删除订单
    sureCutOrder() {
      this.$axios({
        url: config.order + "ordermanage/deleteOrderManageById",
        method: "get",
        params: {
          id: this.id
        }
      }).then(res => {
        if (res.data.success == true) {
          this.$router.push({
            path: "orderIndex"
          });
        }
      });
    },
    //获取订单详情页的信息
    getOrder() {
      this.$axios({
        url: config.order + "ordermanage/queryOrderForDetail",
        method: "get",
        params: {
          id: this.id
        }
      }).then(res => {
        let item = res.data.data;
        //创造个判断线上和线下个服务状态的对象
        if (item.customer === null) {
          item.customer = {};
        }

        // 记录是否已经录入过客户来源
        this.isHasSource = !!item.customer.customerSource;

        item.nickName =
          item.storeScheduleUsername ||
          item.customer.realName ||
          item.customer.nickname;

        // 收款方式
        if (item.multiplePaymentType) {
          let types = JSON.parse(item.multiplePaymentType);
          let text = '';
          for(let i = 0, len = types.length; i < len; i++) {
            let p = this.PATMENT_TYPE_LIST.find(p => p.id === types[i].type);
            if (i === len -1) {
              text += p.name + '￥' + types[i].price;
            } else {
              text += p.name + '￥' + types[i].price + '，';
            }
          }
          item.payTypeText = text;
        } else if (item.paymentType) {
          let p = this.PATMENT_TYPE_LIST.find(p => p.id === item.paymentType);
          item.payTypeText = p.name;
        }

        // 改价总额
        let priceList = item.listOrderServer.map(l => l.serveChangePrice);
        item.changePrice = priceList.reduce((pre, cur) => pre + cur);
        if (item.changePrice > 0) {
          item.changePrice = "￥ + " + item.changePrice;
        } else if (item.changePrice < 0) {
          item.changePrice = "￥" + item.changePrice;
        }

        this.orderInfo = item;
        res.data.data.listOrderServer.forEach(function(item, index) {
          item.serviceList = {
            pic: item.serve.picturePath,
            type: item.serve.type,
            name: item.serve.name,
            produceName: item.produceName
          };
        });
        this.listOrderServer = res.data.data.listOrderServer;
        console.log('listOrserServer: ', this.listOrderServer);
        // 把款式第一个id赋给默认值
        this.orderServeId = res.data.data.listOrderServer[0].id;
        // 然后再调用款式渲染接口
        this.getTypeNode();
      });
    },

    // 线上收款接口
    getMoney(val) {
      this.$axios({
        url: config.order + "ordermanage/modifyOrderManage",
        method: "get",
        params: {
          id: this.orderInfo.id,
          status: 2,
          orderUser: this.orderInfo.orderUser
        }
      }).then(res => {
        if (res.data.success == true) {
          this.$router.push({
            path: "orderIndex"
          });
        }
      });
    },

    // 收款弹框
    getMoneyoffline(val) {
      this.dialogVisible = true;
    },

    // 确认收款
    sureGiveMoney(payForm) {
      let params = this.$qs.stringify({
        id: this.orderInfo.id,
        message: payForm.say,
        status: 3,
        multiplePaymentType: JSON.stringify(payForm.paymentTypes),
        orderUser: this.orderInfo.orderUser
      })
      this.$axios({
        url: config.order + "ordermanage/modifyOrderStatusFinash",
        method: "post",
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: params
      }).then(res => {
        if (res.data && res.data.success) {
          this.dialogVisible = false;
          this.$router.push({
            path: "orderIndex"
          });
        } else {
          this.$message({
            type: 'error',
            message: res.data.message || '收款失败， 请稍后重试'
          })
        }
      });
    },
    // 已收款弹框关闭
    cancel() {
      this.dialogVisible = false;
    },
    // 点击令删除订单弹框消失
    Cancel() {
      this.DialogVisible = false;
    },
    // 获取订单款式名称的记录表
    getStatus(val, index) {
      this.actIndex = index;
      this.orderServeId = val;
      this.getTypeNode();
    },
    // 获取款式记录表
    getTypeNode() {
      let that = this;
      that.orderUpDatePic = [];
      that.$axios({
        url: config.order + "orderrecord/queryOrderDetail",
        method: "get",
        params: {
          orderServeId: that.orderServeId
        }
      }).then(res => {
        if (res.data && res.data.success) {
          that.recordInfo = res.data.data || {};
          let obj = {};
          that.recordInfo.picturePath && that.recordInfo.picturePath.split(",").forEach(function(item, index) {
            obj = {
              src: that.$BASE_PICTUREPATH_URL + item,
              file: that.$BASE_PICTUREPATH_URL + item
            };
            that.orderUpDatePic.push(obj);
          });
        }
      });
    },
    // 修改款式记录表
    modifyTypeNode() {
      this.isEdit = true;
    },

    // 隐藏修改记录表
    hideForm() {
      this.isEdit = false;
      this.getTypeNode();
    }
  },
  created() {
    this.id = this.$route.query.orderId;
    this.getOrder();
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.orderDetail {
  section {
    padding: 0 20px;
    header {
      padding: 20px;
      background: white;
      .order-detail {
        column-count: 3;
      }
      p {
        line-height: 35px;
      }
      .delete {
        float: right;
        margin-right: 20px;
        line-height: 40px;
        cursor: pointer;
        color: #c0c0c0;
      }
    }
    main {
      margin-top: 20px;
      padding: 20px;
      background: white;
      .total {
        padding-right: 20px;
        height: 60px;
        line-height: 60px;
        width: 100%;
        text-align: right;
        .doing {
          margin-left: 10px;
          padding: 8px 25px;
          background: red;
          color: white;
          cursor: pointer;
        }
        .done {
          margin-left: 10px;
          padding: 8px 25px;
          background: #4d82b0;
          color: #fff;
          cursor: pointer;
        }
        .done:hover {
          background: #5b96c9;
        }
        .notdone {
          margin-left: 10px;
          padding: 8px 25px;
          background: #ccc;
          color: white;
          cursor: pointer;
        }
        .notdone:hover {
          background: #ddd;
        }
        span {
          margin-right: 15px;
        }
        span:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
    footer {
      margin-top: 20px;
      padding: 20px;
      background: white;
      p {
        line-height: 35px;
      }
    }
  }
  .typeNode {
    width: 98%;
    height: auto;
    margin: 20px;
    background: white;
    .record-content {
      column-count: 3;
      padding: 20px;
    }
    .record-content p {
      break-inside: avoid;
      margin-bottom: 15px;
    }
  }
  .typeNode .title {
    font-size: 18px;
    font-weight: 500;
    height: 64px;
    line-height: 64px;
    text-align: left;
    text-indent: 33px;
  }
  .save {
    margin-top: 23px;
    margin-bottom: 23px;
    text-align: center;
  }
  .typeTab {
    width: 100%;
    height: 40px;
    margin-top:40px;
    margin-left: 16px;
    .Tab_2 {
      padding: 0 20px;
      background: #fff;
    }
  }
}
.border_yellow {
  border: 2px solid #ffda00;
}
.work-pic {
  box-sizing: content-box;
  margin-top: 10px;
  height: 110px;
  width: 110px;
  display: inline-block;
  position: relative;
  margin-right: 10px;
}
.check-icon {
  width: 28px;
  height: 28px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 50%;
}
</style>
<style lang="scss">
.orderDetail {
  .pop {
    .el-dialog {
      width: 226px;
      height: 126px;
      text-align: center;
      textarea {
        display: inline-block;
        width: 660px;
        height: 220px;
        border: 1px solid #ccc;
      }
    }
    .el-dialog__body {
      padding: 40px 20px;
      width: 226px;
      height: 126px;
    }
    .el-dialog__header {
      width: 226px;
      height: 126px;
      text-align: left;
    }
    p {
      position: absolute;
      bottom: 30px;
      left: 60px;
      button {
        padding: 8px 19px;
        background: gold;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
.orderDetail {
  .el-dialog__headerbtn {
    top: 19px;
    right: 10px;
  }
}
</style>
