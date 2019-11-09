<template>
  <div class="h100 sx bespeakIndex">
    <div class="sx-nav">
      <base-nav :navData="navData"></base-nav>
    </div>
    <div class="container-top">
      <el-dropdown @command="getStatus" class="dropbuttonBox">
        <el-button class="btn-blue mr-10">
          {{statusesText[status]}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">全部</el-dropdown-item>
          <el-dropdown-item command="1">已预约</el-dropdown-item>
          <el-dropdown-item command="2">守约</el-dropdown-item>
          <el-dropdown-item command="3">失约</el-dropdown-item>
          <el-dropdown-item command="4">已取消</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-select filterable placeholder="请选择 店铺" v-model="storeSelected" @change="reChooseStore" style="max-width:100%;">
        <el-option label="请选择 店铺"  value="" />
        <el-option
          v-for="store in stores"
          :key="store.id"
          :label="store.name"
          :value="store.id">
        </el-option>
      </el-select>

      <div class="check" style="padding-left: 10px">
        <el-input class="check__input" type="text" placeholder="输入用户名称" v-model="storeScheduleUserName"></el-input>
        <el-input class="check__input"  type="text" placeholder="请出入手机号" v-model="userPhone"></el-input>

        <button type="button" class="btn btn-sm btn-success" @click="getData()">
          <i class="fa fa-search"></i>&nbsp;搜索
        </button>
      </div>

      <button type="button" class="btn btn-sm btn-danger" @click="showDialog">
        <i class="fa fa-plus"></i>&nbsp;创建服务
      </button>

      <button type="button" class="btn btn-sm btn-primary" @click="getData('timing')">
        提交时间排序
      </button>

      <button type="button" class="btn btn-sm btn-warning" @click="getData('asc')">
        预约时间排序
      </button>

      <!--<el-button class="btn-blue" @click="showDialog" style="margin-left: 30px;">+ 新建预约</el-button>
      <el-button
        class="btn-blue"
        @click="getData('timing')"
      >提交时间排序</el-button>
      <el-button
        class="btn-blue"
        @click="getData('asc')"
      >预约时间排序</el-button>-->
    </div>
    <!-- 预约列表 -->
    <div class="sx-body" ref="tableBox">
      <el-row>
        <el-col :span="24">
          <el-table :data="option_area" :row-style="tableRowStyle"
            tooltip-effect="light">
            <el-table-column
              style="font-size: 12px;"
              prop="scheduledNo"
              label="预约号"
              width="180"
            ></el-table-column>
            <!--scheduledTime-->
            <el-table-column prop="scheduledTime" label="提交时间"></el-table-column>
            <el-table-column
              prop="name"
              label="预约用户"
              width="90"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="customer"
              label="手机号码"
              width="130"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <p class="text-blue">{{scope.row.customer && scope.row.customer.phone}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="listScheduleServer"
              label="预约服务"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-for="(arr,id) in scope.row.listScheduleServer" :key="id">
                  <div v-if="scope.row.listScheduleServer.length==1">
                    <p>{{arr.serve==null?'无服务':arr.serve.name}}</p>
                    <p>{{arr.produceName==""||arr.produceName==null?'无款式':arr.produceName}}</p>
                  </div>
                </div>
                <div v-if="scope.row.listScheduleServer.length>1">
                  <div v-for="(arr,id) in scope.row.listScheduleServer" :key="id">
                    <p>{{arr.serve==null?'无服务':arr.serve.name}}</p>
                    <p
                      style="border-bottom: 1px solid #CCCCCC;"
                    >{{arr.produceName==""?'无款式':arr.produceName}}</p>
                  </div>
                </div>
                <div v-if="scope.row.listScheduleServer.length==0">无</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="listScheduleServer"
              label="手艺人"
              width="130"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.listScheduleServer.length>1">
                  <div v-for="(arr,index) in scope.row.listScheduleServer" :key="index">
                    <p style="border-bottom: 1px solid #CCCCCC;"
                    >{{arr.technicianManage==null?"无技师":arr.technicianManage.name}}</p>
                  </div>
                </div>
                <div v-if="scope.row.listScheduleServer.length==1">
                  <div v-for="(arr,index) in scope.row.listScheduleServer" :key="index">
                    <p
                    >{{arr.technicianManage==null?"无技师":arr.technicianManage.name}}</p>
                  </div>
                </div>
                <div v-if="scope.row.listScheduleServer.length==0">无</div>
              </template>
            </el-table-column>

            <el-table-column
              prop="listScheduleServer"
              label="预约店铺"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{scope.row.departmentName}}
              </template>
            </el-table-column>

            <el-table-column
              prop="listScheduleServer"
              label="预约时间"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.listScheduleServer.length>1">
                  <div v-for="(arr,index) in scope.row.listScheduleServer" :key="index">
                    <p
                      style="border-bottom: 1px solid #CCCCCC;"
                    >{{arr.startTime==null?"无":arr.startTime}}</p>
                  </div>
                </div>
                <div v-if="scope.row.listScheduleServer.length==1">
                  <div v-for="(arr,index) in scope.row.listScheduleServer" :key="index">
                    <p>{{arr.startTime==null?"无":arr.startTime}}</p>
                  </div>
                </div>
                <div v-if="scope.row.listScheduleServer.length==0">无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="status" width="250" align="center">
              <template slot-scope="scope">
                <div class="whiteSpace">
                  <span class="text-blue"
                    @click="details(scope.row)"
                  >详情</span>
                  <span
                    v-if="scope.row.status == 1"
                    style="padding: 0 20px;">|</span>
                  <span class="text-blue"
                    v-if="scope.row.status == 1"
                    @click="showDialog(scope.row)"
                  >修改</span>
                  <!--<span
                    v-if="scope.row.status == 1"
                    style="padding: 0 20px;">|</span>
                  <span class="text-blue"
                    v-if="scope.row.status == 1"
                    @click="showopen(scope.row)"
                  >开单</span>-->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!--分页-->
      <div class="sx-footer">
        <div class="Block">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :current-page.sync="pageNum"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 开单人弹框 -->
    <el-dialog title="请选择开单人"
      @close="hideopen('operatorForm')"
      :visible.sync="operatorFormVisible"
      width="30%">
      <el-form :model="operatorForm"
        ref="operatorForm"
        :rules="operatorFormRules">
        <el-form-item label="开单人" labelWidth="100px" prop="operator">
          <el-select v-model="operatorForm.operator" style="width: 70%" clearable
            placeholder='请选择开单人' @visible-change="getOperator">
            <el-option v-for="operator in operatorList"
              :key="operator.id" :value="operator.id" :label="operator.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="open('operatorForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增、修改预约的弹框-->
    <el-dialog :title="title[titleIndex]"
      :visible.sync="dialogVisible"
      @close="hideDialog('appointmentForm')">
      <el-form :model="appointmentForm"
        :rules="appointmentFormrules"
        ref="appointmentForm" label-width="95px">
        <el-form-item label="预约用户" prop="storeScheduleUsername" class="serve-input">
          <el-input v-model="appointmentForm.storeScheduleUsername"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone" class="serve-input">
          <el-input v-model="appointmentForm.telephone"></el-input>
        </el-form-item>

        <el-form-item label="预约店铺" prop="storeSelected" class="serve-input">
          <div style="float: left">
          <el-select filterable placeholder="请选择 店铺" v-model="appointmentForm.storeSelected" @change="reChooseStore">
            <el-option
              v-for="store in stores"
              :key="store.id"
              :label="store.name"
              :value="store.id">
            </el-option>
          </el-select>
          </div>
          <div style="float: left"> <p style="margin-left: 12px; color: #f56c6c">* 注：先选择预约店铺</p></div>
        </el-form-item>

        <div v-for="(item, index) in appointmentForm.listScheduleServer" :key="index">
          <el-form-item label="预约服务" prop="listScheduleServer">
            <el-select v-model="appointmentForm.listScheduleServer[index].serve.type"
              placeholder="请选择类型"
              clearable
              @visible-change="getTypes"
              @change="typeChange(index)">
              <el-option v-for="type in types"
              :key="type.id" :label="type.name" :value="type.name"></el-option>
            </el-select>

            <el-select v-model="appointmentForm.listScheduleServer[index].serve.id"
              placeholder="请选择服务"
              clearable
              @focus="getService(index)"
              @change="serviceChange(index)">
              <el-option v-for="(service, id) in appointmentForm.listScheduleServer[index].serviceList"
                :key="id" :label="service.name" :value="service.id"></el-option>
            </el-select>

            <el-select v-model="appointmentForm.listScheduleServer[index].produceName"
              placeholder="请选择款式"
              clearable
              @focus="getProduce(index)"
              @change="producChange(index)"
              class="product-option">
              <el-option v-for="(product, id) in productList"
                :key="id" :label="product.name" :value="product.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="服务时间" prop="listScheduleServer">
            <el-col :span="6">
              <el-date-picker type="date"
                v-model="appointmentForm.listScheduleServer[index].startTime" style="width: 98%;"
                placeholder="选择日期"
                @change='startTimeChange(index)'
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-select
                v-model="appointmentForm.listScheduleServer[index].startTimer" style="width: 98%;"
                placeholder="选择时间"
                clearable
                @change='startTimerChange(index)'
                @focus="getTimeList(index)">
                <el-option v-for="serviceTime in timeList"
                :key="serviceTime.time"
                :label="serviceTime.time"
                :value="serviceTime.time"
                :disabled="serviceTime.status === 'false'"></el-option>
              </el-select>
            </el-col>
            <el-button type="danger" @click="removeServe(item)">- 删除服务</el-button>
          </el-form-item>

          <el-form-item label="手艺人" prop="listScheduleServer">
            <el-select v-model="appointmentForm.listScheduleServer[index].technicianId"
              placeholder="请选择"
              @focus="getTechnicianId(index)">
              <el-option v-for="technician in technicianList"
              :key="technician.id" :label="technician.name" :value="technician.id"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="" prop="newServe">
          <el-button class="btn-blue" @click="addServe()">+ 新增服务</el-button>
        </el-form-item>

        <el-form-item label="备注" prop="remark" class="serve-input">
          <el-input v-model="appointmentForm.remark"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button :loading="submitting" class="btn-blue" @click="submitForm('appointmentForm')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--新增提交不成功的提示框-->
    <el-dialog :visible.sync="centerDialogVisible" width="30%" title="错误提示，请选择操作">
      <span>{{errorMsg}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="checkNewDate()"
        >查看排期表(新窗口)</el-button>
        <el-button
          class="btn-blue"
          @click="goGo()"
        >继续填写</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import vue from "vue";
import { mapMutations, mapState } from "vuex";
//引入cookies和删除cookie
/*import { getCookie, removeCookie } from "../../config/mUtils";*/
import config from "./../../config/config";
import BaseNav from "../../components/common/BaseNav";
import { getTime, getDate } from '../../config/date';
import {
  AddScheduleWithServeByStore,
  ModifyScheduleServe,
  GetTypes,
  GetService,
  GetProduct,
  GetTimeList,
  GetTechnicianId, } from "../../apis/order.js"

export default {
  components: {
    BaseNav
  },
  data() {
    const validatePhone = (rule, value, callback) =>{
      let reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确的11位手机号码'));
      } else {
        callback();
      };
    };
    return {
      stores: [],
      //搜索店铺选择内容
      storeSelected: '',
      navData: "预约列表",
      title: ['新建预约', '修改预约'],
      titleIndex: 0,

      // 搜索框内容
      storeScheduleUserName: '',
      userId: this.$route.query.userId,
      userPhone:
        this.$route.query.userPhone == null
          ? ""
          : this.$route.query.userPhone,
      //保存下拉框状态
      status: 1,
      // 下拉框
      statusesText: ['全部', '已预约', '守约', '失约', '已取消'],
      //分页
      pageNum: 1,
      //每页数量
      pageSize: 10,
      //获取数据数组
      option_area: [],
      //设置总共条数
      total: null,
      dialogVisible: false,

      // 新建弹窗,recordType标志服务是新增（1）或修改（0）
      appointmentForm: {
        storeScheduleUsername: '',
        telephone: '',
        listScheduleServer: [{recordType: 1, serve:{}}],
        remark: '',
        storeSelected: ''
      },
      appointmentFormrules: {
        storeScheduleUsername: [
          {required: true, message: '请输入预约用户', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入11位手机号码', trigger: 'blur'},
          {trigger: 'blur', validator: validatePhone}
        ],
        listScheduleServer: [
          {required: true, message: '请选择预约服务', trigger: ''}
        ],
        storeSelected: [
          {required: true, message: '请选择预约店铺', trigger: ''}
        ]
      },
      types: [],
      productList: [],
      timeList: [],
      technicianList: [],

      // 选择开单人弹窗
      operatorFormVisible: false,
      operatorForm: {
        operator: ''
      },
      operatorFormRules: {
        operator: [{required: true, message: '请选择开单人', trigger: 'change'}]
      },
      operatorList: [],
      sameDayTime: this.$route.query.sameDayTime || null,
      submitting: false,
      modifyId: null,
      deleteServe: [],
      centerDialogVisible: false,
      errorMsg: ''
    };
  },
  //监听userId的变化
  watch: {
    userId(curVal, oldVal) {
      if (curVal != oldVal) {
        this.addNews.userId = this.userId;
      }
    }
  },
  mounted() {
    this.status = parseInt(this.$route.query.status) == 0 ? 0 : 1;
    this.pageNum = parseInt(this.$route.query.pageNum) || 1;
    this.getData();
    this.reChooseStore();
  },
  methods: {
    // 列表(默认以预约时间排序传一个任意的字符串， timing表示以提交时间排序此时不需要传)
    getData(sorting = 'acs') {
      let that = this;
      const params = {
          status: this.status == 0 ? '' : this.status,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          departmentId: this.storeSelected,
          // 排序方式，可传任意字符串，有就是预约时间，没有则创建时间
          arriveTime: sorting === 'timing'? '' : sorting,
          scheduledUse: this.userId,
          telephone: this.userPhone,
          storeScheduleUsername: this.storeScheduleUserName,
          sameDayTime: this.sameDayTime
      };
      this.$router.replace('/schedule/bespeak_index?status=' + this.status + '&pageNum=' + this.pageNum);
      this.$axios({
        url: config.order + "schedule/queryScheduleForPage",
        method: "get",
        params
      })
        .then(res => {
          if (res.data && res.data.success) {
            let nowTime = new Date();
            res.data.data.list.forEach(function(item, index) {
              item.name =
                  item.storeScheduleUsername || (item.customer == null ? '' : (item.customer.realName || item.customer.nickname));
              // 状态区分：新创建的预约三十分钟内背景色为黄色, 距离预约时间剩15分钟时粉色
              item.isNew =
                (new Date() - new Date(item.scheduledTime)) / 1000 / 60 > 30
                  ? false
                  : true;
              item.isArrive =
                (new Date(item.arriveTime) - new Date()) / 1000 / 60 > 0 &&
                (new Date(item.arriveTime) - new Date()) / 1000 / 60 < 15 &&
                item.status == 1
                  ? true
                  : false;
            });
            that.total = res.data.data.total;
            that.pageNum = res.data.data.pageNum;
            that.option_area = res.data.data.list;
          } else {
            this.$message({
              message: `${res.data.message}` || '操作失败',
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 0是新增， 1是修改
    async showDialog(item) {
      this.dialogVisible = true;
      if (item.id) {
        this.modifyId = item.id;
        this.titleIndex = 1;
        let clone = {
          id: item.id,
          telephone: item.telephone,
          storeScheduleUsername: item.storeScheduleUsername,
          listScheduleServer: item.listScheduleServer,
          remark: item.remark,
          storeSelected: item.departmentId
        };
        this.appointmentForm = clone;
        for(let i = 0; i < this.appointmentForm.listScheduleServer.length; i++) {
          delete this.appointmentForm.listScheduleServer[i].technicianManage;
          let temp = this.appointmentForm.listScheduleServer[i];
          // 用户端可不用选服务，而没有服务会显示出错，判断没有的时候夫一个空对象作为初值
          if (!this.appointmentForm.listScheduleServer[i].serve) {
            this.appointmentForm.listScheduleServer[i].serve = {};
          }
          let typeName = (temp.serve && temp.serve.type) || '';
          let serveId = (temp.serve && temp.serve.id) || '';
          this.appointmentForm.listScheduleServer[i].startTimer = getTime(temp.startTime);
          // this.appointmentForm.listScheduleServer[i].startTime = getDate(temp.startTime);
          // 如果有类型则筛选服务
          if (typeName) {
            await this.getService(i);
          }
          // 如果有类型和服务则筛选时间和技师
          if (typeName && serveId) {
            await this.getTimeList(i);
            await this.getTechnicianId(i);
          }
        }
      } else {
        this.titleIndex = 0;
       // this.$refs['appointmentForm'].resetFields();
        this.appointmentForm.listScheduleServer = [{serve:{}}];
      }
    },

    // 隐藏预约弹框
    hideDialog(formName) {
      this.modifyId = null;
     // this.$refs[formName].resetFields();
      this.appointmentForm.listScheduleServer = [{serve:{}}];
      this.dialogVisible = false;
    },

    // 添加服务
    addServe() {
      this.appointmentForm.listScheduleServer.push({recordType: 1, serve:{}});
    },

    // 删除服务
    removeServe(item) {
      let index = this.appointmentForm.listScheduleServer.indexOf(item);
      if (index !== -1) {
        this.appointmentForm.listScheduleServer.splice(index, 1);
      }
      if (this.modifyId) {
        this.deleteServe.push(item.id);
      }
    },

    // 获取服务类型，val为真时显示
    async getTypes(val) {
      if (!val) {
        return
      };
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let res = await GetTypes();
      loading.close();
      if (res.data && res.data.success) {
        this.types = res.data.data || [];
      } else {
        this.$message({
          message: `${res.data.message}` || '操作失败',
          type: 'error'
        });
      }
    },

    // 选择类型，当类型改变时，服务和款式的下拉框要清空，重新选择
    typeChange(idx) {
      this.appointmentForm.listScheduleServer[idx].serve.id = '';
      this.appointmentForm.listScheduleServer[idx].produceName = '';
    },

    // 获取服务
    async getService(idx) {
      let typeName = this.appointmentForm.listScheduleServer[idx].serve.type;
      if (!typeName) {
        this.$message({
          message: '请先选择类型',
          type: 'warning'
        });
        return;
      };
      let res = await GetService({
        type: typeName,
        departmentId: this.appointmentForm.storeSelected
      });
      if (res.data && res.data.success) {
        let obj = this.appointmentForm.listScheduleServer[idx];
        obj.serviceList = res.data.data || [];
        this.$set(this.appointmentForm.listScheduleServer, idx, obj);
      } else {
        this.$message({
          message: `${res.data.message}` || '操作失败',
          type: 'error'
        });
      }
    },

    // 选择服务，当服务改变时，款式的下拉框要清空，重新选择
    serviceChange(idx) {
      this.appointmentForm.listScheduleServer[idx].produceName = '';
      let obj = this.appointmentForm.listScheduleServer[idx];
      obj.serve.id = this.appointmentForm.listScheduleServer[idx].serve.id;
      this.$set(this.appointmentForm.listScheduleServer, idx, obj);
    },

    // 获取款式
    async getProduce(idx) {
      if (!this.appointmentForm.listScheduleServer[idx].serve.id) {
        this.$message({
          message: '请先选择服务',
          type: 'warning'
        });
        return;
      };
      let res = await GetProduct({
        serveId: this.appointmentForm.listScheduleServer[idx].serve.id
      });
      if (res.data && res.data.success) {
        this.productList = res.data.data || [];
      } else {
        this.$message({
          message: `${res.data.message}` || '操作失败',
          type: 'error'
        });
      }
    },

    producChange(idx) {
      let obj = this.appointmentForm.listScheduleServer[idx];
      obj.produceName = this.appointmentForm.listScheduleServer[idx].produceName;
      this.$set(this.appointmentForm.listScheduleServer, idx, obj);
    },

    // 选择日期
    startTimeChange(idx) {
      let obj = this.appointmentForm.listScheduleServer[idx];
      obj.startTimer = '';
      this.$set(this.appointmentForm.listScheduleServer, idx, obj);
    },

    // 获取预约时间
    async getTimeList(idx) {
      let startDate = getDate(this.appointmentForm.listScheduleServer[idx].startTime);
      let type = this.appointmentForm.listScheduleServer[idx].serve.type;
      let scheduleServeId = this.appointmentForm.listScheduleServer[idx].serve.id;
      if (!type || !scheduleServeId) {
        this.$message({
          message: '请选择预约服务',
          type: 'warning'
        });
        return;
      }
      if (!startDate) {
        this.$message({
          message: '请选择服务日期',
          type: 'warning'
        });
        return;
      };
      // lengthTime 时长
      let lengthTime = this.appointmentForm.listScheduleServer[idx].serviceList.find(s => s.id === scheduleServeId).serviceDuration;
      let params = {
        departmentId: this.appointmentForm.storeSelected,
        startDate,
        scheduleServeId,
        pcType: 1,
        lengthTime,
      };
      let res = await GetTimeList(params);
      if (res.data && res.data.success) {
        this.timeList = res.data.data || [];
      } else {
        this.$message({
          message: `${res.data.message}` || '操作失败',
          type: 'error'
        });
      }
    },

    // 选择时间
    startTimerChange(idx) {
      let obj = this.appointmentForm.listScheduleServer[idx];
      obj.startTimer = this.appointmentForm.listScheduleServer[idx].startTimer;
      this.$set(this.appointmentForm.listScheduleServer, idx, obj);
    },

    // 获取手艺人
    async getTechnicianId(idx) {
      let startTime = this.appointmentForm.listScheduleServer[idx].startTime;
      let startTimer = this.appointmentForm.listScheduleServer[idx].startTimer;
      let type = this.appointmentForm.listScheduleServer[idx].serve.type;
      let scheduleServeId = this.appointmentForm.listScheduleServer[idx].serve.id;
      if (!type || !scheduleServeId) {
        this.$message({
          message: '请先选择预约服务',
          type: 'warning'
        });
        return;
      }
      if (!startTime || !startTimer) {
        this.$message({
          message: '请先选择服务时间',
          type: 'warning'
        });
        return;
      };
      // lengthTime 时长为获取技师
      let lengthTime = this.appointmentForm.listScheduleServer[idx].serviceList.find(s => s.id === scheduleServeId).serviceDuration;
      // lengthTimeForEndTime时长添加预约时为计算结束时间
      this.appointmentForm.listScheduleServer[idx].lengthTimeForEndTime = lengthTime;
      let params = {
        departmentId: this.appointmentForm.storeSelected,
        startDateTime: getDate(startTime) + ' ' + startTimer,
        scheduleServeId,
        lengthTime,
      };
      let res = await GetTechnicianId(params);
      if (res.data && res.data.success) {
        this.technicianList = res.data.data || [];
      } else {
        this.$message({
          message: `${res.data.message}` || '操作失败',
          type: 'error'
        });
      }
    },

    // 提交表单
    async submitForm(appointmentForm) {
      let formInfo = this.appointmentForm;
      let {
        storeScheduleUsername,
        telephone,
        listScheduleServer,
        remark
      } = formInfo;
      // 校验
      if (!storeScheduleUsername) {
        this.$message({
          message: '请输入预约用户',
          type: 'warning'
        });
        return;
      }
      if (!telephone) {
        this.$message({
          message: '请输入手机号码',
          type: 'warning'
        });
        return;
      }
      if (listScheduleServer.length < 1) {
        this.$message({
          message: '至少要有一个服务',
          type: 'warning'
        });
        return;
      };
      for (let i = 0, len = listScheduleServer.length; i < len; i++) {
        if (!listScheduleServer[i].serve.id
          || !listScheduleServer[i].produceName) {
          this.$message({
            message: `请完整选择第${i+1}个预约服务信息`,
            type: 'warning'
          });
          return;
        }
        if (!listScheduleServer[i].startTime || !listScheduleServer[i].startTimer) {
          this.$message({
            message: `请选择第${i+1}个预约时间`,
            type: 'warning'
          });
          return;
        } else {
          listScheduleServer[i].startTime = getDate(listScheduleServer[i].startTime) + ' ' + listScheduleServer[i].startTimer;
        }
        if (!listScheduleServer[i].technicianId) {
          this.$message({
            message: `请选择第${i+1}个手艺人`,
            type: 'warning'
          });
          return;
        }
      };
      let pack = {
        ...formInfo,
        createUser: this.$Global.user.name,
        departmentId: this.appointmentForm.storeSelected,
      };
      if (this.modifyId) {
        pack.deleteServe = this.deleteServe.join(',');
      }
      for (let i = 0; i < pack.listScheduleServer.length; i++) {
        let temp = pack.listScheduleServer[i];
        pack.listScheduleServer[i].serveId = temp.serve.id;
        if (temp.id) {
          pack.listScheduleServer[i].recordType = 0;
        }
        delete pack.listScheduleServer[i].serviceList;
      }
      this.submitting = true;
      let res = null;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      console.log('pack: ', pack);
      if (this.modifyId) {
        res = await ModifyScheduleServe(pack);
      } else {
        res = await AddScheduleWithServeByStore(pack);
      }
      this.submitting = false;
      loading.close();
      this.hideDialog('appointmentForm');
      if (res.data && res.data.success) {
        this.getData();
        this.$message({
          message: `${res.data.message}` || '操作成功',
          type: 'success'
        });
      } else {
        this.getData();
        this.$message({
          message: `${res.data.message}` || '操作失败',
          type: 'error'
        });
        /*this.errorMsg = res.data.message;
        this.centerDialogVisible = true;*/
      }
    },

    //新增提交不成功的弹框跳转到查看排期管理
    checkNewDate() {
      this.centerDialogVisible = false;
      this.$router.push({
        path: "schedulingIndex"
      });
    },
    goGo() {
      this.centerDialogVisible = false;
    },

    //查询列表带过来的数据
    ...mapMutations("total", ["BESPEAKINDEX"]),

    // 选择状态
    getStatus(command) {
      this.status = command;
      this.getData();
    },

    // 列表状态区分，新建预约30分钟内的显示黄色，即将到预约时间的为粉色
    tableRowStyle({ row, rowIndex }) {
      if (row.isNew && row.isArrive || row.isArrive) {
        return "background-color: #ffe5e5";
      } else if (row.isNew) {
        return "background-color: #fffbe5";
      };
    },

    //分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getData();
    },

    // 跳转详情页
    details(val) {
      this.BESPEAKINDEX(val);
      // this.$router.push({
      //   path: "bespeakDetail"
      // });
      let routeData = this.$router.resolve({ path: 'bespeakDetail', query: {id: val.id}});
      window.open(routeData.href, '_blank');
    },
    // 获取开单人
    getOperator(val) {
      if (!val) {
        return;
      }
      this.$axios({
        url: config.store + "user/queryUserForAllNotQuit",
        method: "get",
        params: {
          departmentId: this.appointmentForm.storeSelected
        }
      }).then(res => {
        if (res.data && res.data.success) {
          this.operatorList = res.data.data || [];
        }
      });
    },
    // 开单弹窗
    showopen(val) {
      this.operateItem = val;
      this.operatorFormVisible = true;
    },
    // 隐藏弹窗
    hideopen(formName) {
      this.$refs[formName].resetFields();
    },
    // 确定开单
    open(operatorForm) {
      this.$refs[operatorForm].validate(valid => {
        if (valid) {
          this.$axios({
            url: config.order + "ordermanage/addOrderManage",
            method: "get",
            params: {
              schId: this.operateItem.id,
              openOrderUser: this.operatorForm.operator,
            }
          }).then(res => {
            //跳转到订单首页
            this.$router.push({
              path: "order_index"
            });
          });
        }
      });
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

    // 跳转会员列表
    /*goPerson(item) {
      let routeData = this.$router.resolve(
        { path: 'person',
          query: {
            userId: item.customer.id,
          }
        });
      window.open(routeData.href, '_blank');
    },*/
  },
  computed: {
    //把cookie信息转化成对象
    getUserName() {
      return this.$Global.user.name
    }/*,
    getDepartmentId() {
      return getCookie("departmentId");
    }*/
  },
};
</script>

<style lang="scss" scoped="scoped">
@import "src/style/mixin";
.container-top {
  display: flex;
  padding-bottom: 10px;
}
.new-tab {
  cursor: pointer;
  margin-right:20px;
}
.sx-body {
  padding: 0;
}
.check {
/*  width: 40%;
  height: 40px;*/
  display: flex;
  .check__input {
    margin-right: 10px;
  }
}
.bespeakIndex {
  position: relative;

  .Block {
    text-align: center;
  }
  .el-table .cell {
    line-height: 30px;
  }
}
.sx-footer {
  padding: 0px;
  background: #fff;
  text-align: center;

}
.button{
  padding-right: 15px;
}
</style>
