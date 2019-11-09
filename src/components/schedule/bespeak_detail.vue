<template>
  <div class="h100 sx rose">
    <!--导航-->
    <div class="sx-nav">
      <base-nav :navData="navData"></base-nav>
      <h2
        @click="cutOrder"
        style="float:right;margin:5px 30px 0 0;color:#606266;cursor: pointer;"
      >删除预约</h2>
    </div>
    <div class="content">
      <div class="pop" v-dialogDrag>
        <el-dialog title="请备注删除预约的理由" :visible.sync="DialogVisible" @close="Cancel()">
          <h3 style="height:80px">确定要删除此次预约么</h3>
          <p>
            <button @click="sureCutOrder">确认删除</button>
          </p>
        </el-dialog>
      </div>
      <div class="change" v-if="status">
        <header>
          <span>店铺修改日志</span>
          <span>最新修改时间:&nbsp;&nbsp;{{Service.lastUpdateTime==null?'无':Service.lastUpdateTime}}</span>
        </header>
        <section>
          <div class="news">
            <label>预约号:</label>
            <span>{{Service.scheduledNo==null?'无':Service.scheduledNo}}</span>
          </div>
          <div class="news">
            <label>提交时间:</label>
            <span>{{Service.lastUpdateTime==null?'无':Service.lastUpdateTime}}</span>
          </div>
          <div class="news">
            <label>预约用户:</label>
            <span>{{Service.customer==null?'无':Service.customer.nickname}}</span>
          </div>
          <div class="news">
            <label>手机号码:</label>
            <span>{{Service.customer==null?'无':Service.customer.phone}}</span>
          </div>

          <div class="lists" v-for="(Date,index) in changeServiceList">
            <div class="pic">
              <label>预约服务:</label>
              <div>
                <p>
                  <img
                    :src="Date.serve==null?'':$BASE_PICTUREPATH_URL + Date.serve.picturePath.split(',')[0]"
                  >
                </p>
                <div>
                  <h6>{{Date.serve==null?'无':Date.serve.type}}</h6>
                  <h6>{{Date.serve==null?'无':Date.serve.name}}</h6>
                  <h6>{{Date.produceName==null?'无':Date.produceName}}</h6>
                </div>
              </div>
            </div>
            <div>
              <label>手艺人:</label>
              <span>{{Date.technicianManage==null?'无':Date.technicianManage.name}}</span>
            </div>
            <div>
              <label>预约时间:</label>
              <span>{{Date.startTime==null?'无':Date.startTime}}</span>
            </div>
            <div>
              <label>服务时间:</label>
              <span>{{Date.startTime==null?'':Date.startTime}}&nbsp; - &nbsp;{{Date.endTime==null?'':Date.endTime}}</span>
            </div>
            <div>
              <label>服务时长:</label>
              <span>{{Date.serve==null?'无':Date.serve.serviceDuration +'分钟'}}</span>
            </div>
          </div>

          <div class="notes">
            <label>备注:</label>
            <span>{{Service.remark}}</span>
          </div>
        </section>
      </div>
      <div class="bespeak">
        <header>
          <span>用户预约信息</span>
        </header>
        <section>
          <div class="news">
            <label>预约号:</label>
            <span>{{Service.scheduledNo==null?'无':Service.scheduledNo}}</span>
          </div>
          <div class="news">
            <label>提交时间:</label>
            <span>{{Service.lastUpdateTime==null?'无':Service.lastUpdateTime}}</span>
          </div>
          <div class="news">
            <label>预约用户:</label>
            <span>{{Service.customer==null?'无':Service.customer.nickname}}</span>
          </div>
          <div class="news">
            <label>手机号码:</label>
            <span>{{Service.customer==null?'无':Service.customer.phone}}</span>
          </div>
          <div class="lists">
            <div class="pic">
              <label>预约服务:</label>
              <div>
                <p>
                  <img
                    :src="serviceList.serve==null?'':$BASE_PICTUREPATH_URL + serviceList.serve.picturePath.split(',')[0]"
                  >
                </p>
                <div>
                  <h6>{{serviceList.serve==null?'无':serviceList.serve.type}}</h6>
                  <h6>{{serviceList.serve==null?'无':serviceList.serve.name}}</h6>
                  <h6>{{serviceList.produceName==null?'无':serviceList.produceName}}</h6>
                </div>
              </div>
            </div>
            <div>
              <label>手艺人:</label>
              <span>{{serviceList.technicianManage==null?'无':serviceList.technicianManage.name}}</span>
            </div>
            <div>
              <label>预约时间:</label>
              <span>{{serviceList.startTime==null?'无':serviceList.startTime}}</span>
            </div>
            <div>
              <label>服务时间:</label>
              <span>{{serviceList.startTime==null?'':serviceList.startTime}}&nbsp; - &nbsp;{{serviceList.endTime==null?'':serviceList.endTime}}</span>
            </div>
            <div>
              <label>服务时长:</label>
              <span>{{serviceList.serve==null?'无':serviceList.serve.serviceDuration +'分钟'}}</span>
            </div>
          </div>
          <div class="notes">
            <label style=" width: 70px; display: inline-block;">备注:</label>
            <span style="padding-left: 10px;">{{Service.remark}}</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import config from "./../../config/config";
import BaseNav from "../../components/common/BaseNav";
import { mapMutations, mapState } from "vuex";
export default {
  components: { BaseNav },
  computed: {
    //查询列表带过来的数据
    ...mapState("total", ["BESPEAKINDEX"])
  },
  data() {
    return {
      id: this.$route.query.id,
      navData: "预约详情",
      Say: "",
      DialogVisible: false,
      Service: {},
      serviceList: [],
      changeServiceList: [],
      //设置状态是否有修改的页面出现
      status: false
    };
  },
  created() {
    this.getService();
  },
  watch: {},
  methods: {
    //确认删除订单
    sureCutOrder() {
      this.$axios({
        url: config.order + "schedule/deleteScheduleAndServe",
        method: "get",
        params: {
          serveId: this.id
        }
      }).then(res => {
        if (res.data.success == true) {
          this.$router.push({
            path: "bespeak_index"
          });
        }
      });
    },
    cutOrder() {
      this.DialogVisible = true;
    },
    Cancel() {
      this.DialogVisible = false;
      this.Say = "";
    },
    getService() {
      this.$axios({
        url: config.order + "schedule/queryDetailAndRecord",
        method: "get",
        params: {
          id: this.id
        }
      }).then(res => {
        //console.log(res)
        //通过长度来判断是原始数据还是修改保存数据
        this.Service = res.data.data;
        console.log(this.Service);
        //做用户端和手机号码的数据处理
        let DaTe = res.data.data;
        if (DaTe.customer == null) {
          DaTe.customer = {};
        }
        if (DaTe.storeScheduleUsername != null) {
          DaTe.customer["nickname"] = DaTe.storeScheduleUsername;
        }
        if (DaTe.telephone != null) {
          DaTe.customer["phone"] = DaTe.telephone;
        }
        if (res.data.data.listScheduleUpdateRecord.length > 1) {
          this.status = true;
          //渲染原始数据
          this.serviceList = res.data.data.listScheduleUpdateRecord.slice(
            0,
            1
          )[0];
          //渲染修改的数据
          this.changeServiceList = res.data.data.listScheduleUpdateRecord.slice(
            1
          );
        } else {
          this.status = false;
          this.serviceList = res.data.data.listScheduleUpdateRecord[0];
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.pop {
  .el-dialog {
    width: 826px;
    height: 500px;
    text-align: center;
    margin-top: 80px;
    textarea {
      display: inline-block;
      width: 600px;
      height: 220px;
      border: 1px solid #ccc;
    }
  }
  .el-dialog__body {
    width: 400px;
    padding: 120px 20px;
  }
  .el-dialog__header {
    text-align: left;
    /*line-height:56px;*/
  }
  p {
    position: absolute;
    bottom: 10px;
    left: 20px;
    button {
      padding: 8px 19px;
      background: gold;
      cursor: pointer;
    }
  }
}
.rose {
  position: relative;
  .content {
    .change {
      background: white;
      header {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        @include fj border-bottom: 1px solid #ccc;
      }
      section {
        padding: 20px 15px;
        .news {
          line-height: 40px;
          label {
            width: 70px;
            display: inline-block;
          }
          span {
            padding-left: 10px;
          }
        }
        .lists {
          line-height: 40px;
          label {
            width: 70px;
            display: inline-block;
          }
          span {
            padding-left: 10px;
          }
          .pic {
            height: 100px;
            line-height: 15px;
            display: flex;
            div {
              div {
                float: left;
                h6 {
                  line-height: 28px;
                  text-indent: 20px;
                }
              }
            }
            p {
              padding-left: 10px;
              float: left;
              height: 90px;
              width: 90px;
              img {
                height: 90px;
                width: 90px;
              }
            }
          }
        }
        .notes {
          label {
            width: 70px;
            display: inline-block;
          }
          span {
            padding-left: 10px;
          }
        }
      }
    }
    .bespeak {
      margin-top: 20px;
      background: white;
      header {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        @include fj border-bottom: 1px solid #ccc;
      }
      section {
        padding: 15px 15px;
        .news {
          line-height: 40px;
          label {
            width: 70px;
            display: inline-block;
          }
          span {
            padding-left: 10px;
          }
        }

        .lists {
          line-height: 40px;
          label {
            width: 70px;
            display: inline-block;
          }
          span {
            padding-left: 10px;
          }
          .pic {
            height: 100px;
            line-height: 15px;
            display: flex;
            div {
              div {
                float: left;
                h6 {
                  line-height: 28px;
                  text-indent: 20px;
                }
              }
            }
            p {
              padding-left: 10px;
              float: left;
              height: 90px;
              width: 90px;
              img {
                height: 90px;
                width: 90px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.rose {
  position: relative;
}
</style>
<style lang="scss">
/*1920*/
@media (min-width: 1900px) and (max-width: 1950px) {
  .rose {
  }
}

/*1600*/
@media (min-width: 850px) and (max-width: 1650px) {
  .rose {
  }
}
/*1366*/
@media (min-width: 800px) and (max-width: 1400px) {
  .rose {
  }
}
</style>
