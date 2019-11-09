<template>
  <div class="newOrders">
    <!--导航-->
    <div class="left">
      <base-nav :navData="navData" style="display: block; margin-bottom: 20px;"></base-nav>
      <el-tabs v-model="activeServe" type="border-card" 
        @tab-click="getStatus">
        <el-tab-pane v-for="arr in orderList" :key="arr.id" :label="arr.name" :name="arr.name">
          <section>
            <div class="smallpro">
              <div class="img-box"
                v-for="(arr,index) in option_area"
                :key="index"
                @click="getType(arr)">
                <div>
                  <img :src="$BASE_PICTUREPATH_URL + arr.picturePath.split(',')[0]">
                </div>
                <p>￥{{arr.price}}</p>
                <p>{{arr.name}}</p>
              </div>
            </div>
            <!--分页-->
            <el-pagination
              style="text-align: center; clear: both;"
              layout="prev, pager, next"
              v-if="pages>1"
              :pages="pages"
              @current-change="handleCurrentChange"
              :page-size="this.pageSize"
              :current-page.sync="currentPage"
            ></el-pagination>
          </section>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <header>
        <el-form>
          <el-form-item>
            <el-select
              v-model="openOrderUser"
              clearable
              placeholder="请选择开单人"
              @visible-change="getOperator"
              style="width: 100%"
            >
              <el-option
                v-for="operator in operatorList"
                :key="operator.id"
                :value="operator.id"
                :label="operator.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="phone">
            <el-autocomplete
              style="width: 80%"
              v-model="phone"
              :fetch-suggestions="querySearch"
              placeholder="输入会员手机号码"
            >
            </el-autocomplete>
            <span class="has-no-phone" @click="hasNoPhone">无号码</span>
          </el-form-item>
          <el-form-item>
            <el-input class="inline-input" v-model="storeScheduleUsername" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-form>
      </header>
      <main>
        <div class="typeList-box" 
          v-for="(arr,index) in listOrderServer" :key="index">
          <p>
            <span>{{arr.typeName}}</span>
            <span class="delete" @click="cut(arr)">
              <img src="../../assets/img/delete.svg" />
            </span>
          </p>
          <p>
            <span>{{arr.serviceName}}</span>
            <el-input v-model="arr.servePriceText"
              :ref="'arrPrice' + index "
              class="price" @blur="changePrice(index)"></el-input>
          </p>
          <p>
            <span>{{arr.produceName}}</span>
            <span>{{arr.serveChangePriceText}}</span>
          </p>
          <el-select
            style="width: 100%"
            v-model="arr.technicianId"
            placeholder="选择美甲师"
            multiple
            @change="changeTechnicianId(index)"
            @remove-tag="removeTechnicianId(index)">
            <el-option v-for="item in workerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </main>
      <div class="remark">
        <el-input type="textarea" v-model="remark" placeholder="输入备注"></el-input>
      </div>
      <footer>
        <div>总计: ￥{{totalPrice}}</div>
        <el-button class="submit btn-blue" @click="sureOrder" :loading="submitting">确定订单</el-button>
      </footer>
    </div>
    <choose-type
      :dialogVisible="dialogVisible"
      :typeList="typeList"
      v-on:cancelClick="cancelClick"
      v-on:giveType="giveType"
    ></choose-type>
  </div>
</template>

<script>
import config from "./../../config/config";
import { AddOrder, ModifyOrder } from "./../../apis/order.js";
import ChooseType from "../../components/common/ChooseType";
import { mapMutations, mapState } from "vuex";
import BaseNav from "../../components/common/BaseNav";
//引入cookies和删除cookie
import { getCookie, removeCookie } from "../../config/mUtils";

export default {
  components: {
    BaseNav,
    ChooseType,
  },

  data() {
    return {
      navData: "新建订单",
      activeServe: "美睫", // 选择服务类型
      orderList: [], // 服务类型列表
      option_area: [], // 样式列表
      dialogVisible: false,
      typeList: [],
      submitting: false,
      operatorList: [], // 开单人列表
      openOrderUser: "", // 选中的开单人
      openOrderUserId: '', // 修改时选中开单人的id
      phones: [], // 查询出来的手机号下拉选择,
      phone: "", // 手机号
      nameList: {}, // 手机号对应的会员名称
      storeScheduleUsername: '',
      listOrderServer: [], // 选中订单款式列表
      workerList: [], // 技师下拉列表
      orderType: 2, // 订单类型（2 线下订单）
      remark: '', // 备注
      totalPrice: 0, // 总价
      pageSize: 15,
      pageNum: 1,
      currentPage: 1,
      pages: 1, // 总页数
      tempOrder: {}, // 临时保存右边的一项订单，然后保存到数组
      id: '', // 订单id
      deleteOrder: [], // 删除单项的id列表
      tempname: '',
    };
  },
  watch: {
    async phone(curVal, oldVal) {
      if (curVal.length > 10) {
        this.storeScheduleUsername = this.nameList[curVal] || this.tempname;
      }
    }
  },
  created() {
    this.getOrderStyle();
    this.getWroker();
    // 如果有id则是修改
    if (this.$route.query.orderId) {
      this.id = this.$route.query.orderId;
      this.getDetails();
    }
  },
  methods: {
    //引入cookies里面的数据
    ...mapMutations({
      mutationsUserName: "userName",
      mutationsDepartmentId: "departmentId"
    }),

    // 获取服务类型
    getOrderStyle() {
      this.$ajax({
        url: config.service + "type/queryType",
        method: "get"
      }).then(res => {
        if (res.data && res.data.success) {
          this.orderList = res.data.data;
          this.activeServe = res.data.data[0].name;
          this.getData();
        }
      });
    },
    // 切换服务时，pageNum置为初始值
    getStatus(val, index) {
      this.activeServe = val.label;
      this.pageNum = 1;
      this.getData();
    },

    // 请求首页样式
    getData() {
      this.$ajax({
        url: config.service + "serve/queryServeByType",
        method: "get",
        params: {
          type: this.activeServe,
          pageNum: this.pageNum,
          pageSize: 15,
          departmentId: this.getDepartmentId
        }
      }).then(res => {
        this.pages = res.data.data.pages
        this.option_area = res.data.data.list;
      });
    },

    // 分页请求函数
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },

    // 选择款式弹窗
    getType(arr) {
      // 初始化款式单项对象
      this.tempOrder = {
        typeName: this.activeServe,
        serviceName: arr.name,
        servePrice: arr.price, // 原价
        servePriceText: arr.price, // 显示在输入框的价格
        serveChangePrice: 0,
        serveChangePriceText: '',
        serveId: arr.id,
        produceName: '',
        technicianId: []
      };
      this.dialogVisible = true;
      this.$ajax({
        url: config.service + "produce/queryProduceByServe",
        method: "get",
        params: {
          serveId: arr.id
        }
      }).then(res => {
        this.typeList = res.data.data;
      });
    },

    //关闭弹框
    cancelClick() {
      this.dialogVisible = false;
    },

    // 获取开单人
    getOperator(val) {
      if (!val) {
        return;
      }
      this.$ajax({
        url: config.store + "user/queryUserForAllNotQuit",
        method: "get",
        params: {
          departmentId: this.getDepartmentId
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.operatorList = res.data.data || [];
        }
      });
    },

    // 获取技师下拉列表
    getWroker() {
      this.$ajax({
        url: config.technician + "technician/queryTechnicianManageForAll",
        method: "get",
        params: {
          departmentId: this.getDepartmentId
        }
      }).then(res => {
        this.workerList = res.data && res.data.data || [];
      });
    },

    getUserByPhone() {
      let phones = [];
      this.$ajax({
        url: config.user + "getCustomerWithPhone",
        method: "get",
        params: {
          phone: this.phone
        }
      }).then(res => {
        if (res.data && res.data.success) {
          let users = res.data.data && res.data.data.users || [];
          if (users.length > 0) {
            users.forEach(u => {
              phones.push({value: u.phone});
              this.nameList[u.phone] = u.storeRecordRealName;
            });
          } else {
            phones.push({value: '无'});
          }
        }     
      });
      return phones;
    },

    // 查询会员号码
    async querySearch(queryString, cb) {
      cb([{ value: "继续输入4位以上号码" }]);
      if (queryString && queryString.length > 3) {
        let phones = await this.getUserByPhone();
        cb(phones);
      }
    },

    // 无号码
    hasNoPhone() {
      this.phone = '无';
    },

    // 获取选上样式的名字主要是用来渲染右侧栏数据
    giveType(val) {
      this.dialogVisible = false;
      const {
        tempOrder,
        listOrderServer
      } = this;
      this.totalPrice += + tempOrder.servePrice;
      if (this.id) {
        tempOrder.updateType = 1;
      }
      tempOrder.produceName = val;
      this.listOrderServer = [...listOrderServer, tempOrder];
    },

    // 删除订单的一项
    cut(item) {
      const index = this.listOrderServer.indexOf(item);
      if (index !== -1) {
        // 如果有id是表示修改，需要把删除的一项的id保存
        if (this.id) {
          this.deleteOrder = [...this.deleteOrder, item.id];
        }
        this.listOrderServer.splice(index, 1);
        this.counterTotalPrice(); 
      }
    },

    counterTotalPrice() {
      const listOrderServer = this.listOrderServer;
      let total = 0;
      listOrderServer.forEach(t => {
        // 总价 = 每一项原价 - 改价 相加的和
        total += (t.servePrice + t.serveChangePrice);
      });
      this.totalPrice = Number(total.toFixed(2));
    },

    // 改订单列表单项的价格
    changePrice(idx) {
      let value = + this.$refs['arrPrice' + idx][0].value;
      // 如果输入框失去焦距后的值还是原来的值，则不做操作
      if (this.listOrderServer[idx].servePriceText === value) {
        return;
      }
      let change = -Number((this.listOrderServer[idx].servePrice - value).toFixed(2));
      this.listOrderServer[idx].serveChangePriceText = '改价 ￥' + (change > 0 ? '+' + change : change);
      this.listOrderServer[idx].serveChangePrice = change;
      this.counterTotalPrice();
      // 如果是修改订单，并且是新增单项，updateType为1
      // 如果是修改订单，并且值是修改价格，updateType为0（删除和修改美甲师同理）
      if (this.id && this.listOrderServer[idx].updateType !== 1) {
        this.listOrderServer[idx].updateType = 0;
      }
    },

    // 删除美甲师
    removeTechnicianId(idx) {
      if (this.id && this.listOrderServer[idx].updateType !== 1) {
        this.listOrderServer[idx].updateType = 0;
      }
    },

    // 修改美甲师
    changeTechnicianId(idx) {
      if (this.id && this.listOrderServer[idx].updateType !== 1) {
        this.listOrderServer[idx].updateType = 0;
      }
    },

    // 确认订单
    async sureOrder() {
      const {
        openOrderUser,
        phone,
        storeScheduleUsername,
        listOrderServer,
        remark,
        totalPrice,
        id,
        openOrderUserId,
        deleteOrder,
      } = this;
      if (!openOrderUser) {
        this.$message({
          type: 'warning',
          message: '请选择开单人'
        });
        return;
      }
      if (!phone) {
        this.$message({
          type: 'warning',
          message: '输入会员手机号'
        });
        return;
      }
      if (!storeScheduleUsername) {
        this.$message({
          type: 'warning',
          message: '请输入会员姓名'
        });
        return;
      }
      if (listOrderServer.length < 1) {
        this.$message({
          type: 'warning',
          message: '请选择款式'
        });
      }
      for (let i = 0, len = listOrderServer.length; i < len; i++) {
        console.log('listOrderServer[i].technicianId: ', listOrderServer[i].technicianId);
        if (listOrderServer[i].technicianId.length < 1) {
          this.$message({
            type: 'warning',
            message: `请选择美甲师`
          });
          return;
        } else {
          listOrderServer[i].technicianId = listOrderServer[i].technicianId.join(',');
        }
      }
      let pack = JSON.stringify({
        openOrderUser: id ? openOrderUserId : openOrderUser,
        telephone: phone,
        storeScheduleUsername,
        remark,
        totalPrice,
        listOrderServer,
        deleteOrder: deleteOrder.join(','),
        departmentId: this.getDepartmentId,
        createUser: this.getUserName,
        id: this.id || '',
      });
      this.submitting = true;
      let res = null;
      let tips = ''
      if (this.id) {
        tips = '修改订单';
        res = await ModifyOrder(pack);
      } else {
        tips = '新增订单';
        res = await AddOrder(pack);
      }
      this.submitting = false;
      if (res.data && res.data.success) {
        this.$message({
          type: 'success',
          message: res.data.message || tips + '成功'
        });
        this.$router.push({
          path: 'orderIndex'
        });
      } else {
        this.$message({
          type: 'error',
          message: res.data.message || tips + '失败'
        })
      }
    },

    // 获取订单详情
    getDetails() {
      this.$ajax({
        url: config.order + "ordermanage/queryOrderForDetail",
        method: "get",
        params: {
          id: this.id
        }
      }).then(res => {
        if (res.data && res.data.data) {
          const details = res.data.data;
          this.openOrderUser = details.userManage && details.userManage.name;
          this.openOrderUserId = details.userManage && details.userManage.id;
          this.phone = details.customer && details.customer.phone || '无';
          this.storeScheduleUsername = details.storeScheduleUsername;
          this.tempname = details.storeScheduleUsername;
          this.remark = details.remark;
          this.totalPrice = details.totalPrice;
          let server = details.listOrderServer || [];
          for (let i = 0, len = server.length; i < len; i++) {
            let tempOrder = {
              typeName: server[i].serve.type,
              serviceName: server[i].serve.name,
              servePrice: server[i].serve.price, // 原价
              servePriceText: server[i].serve.price + server[i].serveChangePrice, // 改价后价格
              serveChangePrice: server[i].serveChangePrice, // 改价
              serveChangePriceText: server[i].serveChangePrice !== 0 ? '改价 ￥' + (server[i].serveChangePrice > 0 ? '+' + server[i].serveChangePrice : server[i].serveChangePrice) : '',
              serveId: server[i].serve.id,
              produceName: server[i].produceName,
              technicianId: server[i].listTechnicianManage.map(list => list.id),
              id: server[i].id
            };
            this.listOrderServer.push(tempOrder);
          }
        }
      })
    }
  },
  computed: {
    //把cookie信息转化成对象
    getUserName() {
      return getCookie("userName");
    },
    getDepartmentId() {
      return getCookie("departmentId");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.newOrders {
  /*弹框样式*/
  position: relative;
  overflow: hidden;
  width: 100%;
  .left {
    float: left;
    width: 76%;
    section {
      background: white;
      .smallpro {
        .img-box {
          box-sizing: border-box;
          height: 240px;
          border: 1px solid #f0f1f5;
          width: 19%;
          margin: .5%;
          float: left;
          border-radius: 6px;
          padding: .5%;
          &:hover {
            border: 1px solid #4d82b0;
            color: #4d82b0;
          }
          p:nth-of-type(1) {
            color: red;
            padding: 10px 10px 5px;
          }
          p:nth-of-type(2){
            padding: 0 10px 10px 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 15px;
          }
        }
        .img-box div:nth-of-type(1) {
          width: 100%;
          height: 73%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          img {
            width: 100%;
            height: auto;
          }
          
        }
      }
    }
  }
  .right {
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 22%;
    height: 100%;
    header {
      padding: 20px;
      .has-no-phone {
        color: #ccc;
        border-bottom: 1px solid #dcdfe6;
        padding: 10px;
        cursor: pointer;
      }
    }
    main {
      color: #606266;
      width: 100%;
      max-height: 620px;
      overflow-y: scroll;
      text-align: center;
      .typeList-box {
        padding: 0 20px 20px;
        .delete {
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
          }
        }
        p {
          display: flex;
          justify-content: space-between;
          span {
            height: 40px;
            display: flex;
            align-items: center;
          }
          .price {
            width: 25%;
          }
        }
      }
    }
    main::-webkit-scrollbar {
      display: none;
    }

    .remark {
      padding: 0 20px;
    }

    footer {
      border-top: 1px solid #dcdfe6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      background: white;
      z-index: 1000;
      bottom: 0;
      right: 0;
      width: 100%;
      overflow: hidden;
      .submit  {
        border-radius: 0;
        height: 48px;
        width: 120px;
        font-size: 16px;
      }
    }
    footer div:nth-of-type(1) {
      width: 50%;
      padding: 0 30px;
    }
  }
}
/*1600*/
@media (max-width: 1630px) {
  .newOrders .right main {
    max-height: 320px;
  }
  .newOrders .left {
    width: 70%;
  }
  .newOrders .right {
    width: 26%;
  }
  .newOrders .left section .smallpro .img-box {
    width: 23%;
    margin: 1%;
  }
}

@media (max-width: 1320px) {
  .newOrders .right main {
    max-height: 280px;
  }
  .newOrders .left {
    width: 67%;
  }
  .newOrders .right {
    width: 31%;
  }
}

@media (max-width: 1220px) {
  .newOrders .right main {
    max-height: 280px;
  }
  .newOrders .left {
    width: 65%;
  }
  .newOrders .right {
    width: 30%;
  }
}
</style>

<style lang="scss">
.el-tabs--border-card>.el-tabs__content {
  padding: .5%;
}
.right .el-input__inner {
  border-top: none;
  border-right: none;
  border-bottom: 1px solid #dcdfe6;
  border-left: none;
  border-radius: 0;
  padding: 0,
}
.price .el-input__inner {
  text-align: right;
  color: red;
}
</style>