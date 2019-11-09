<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="ibox float-e-margins">
        <!--<div class="ibox-title">
          <h5>会员详情</h5>
        </div>-->
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-sm-12">
              <div class="ibox-content">
                <h6>会员信息</h6>
                  <form id="toolbar" novalidate="novalidate">
                    <div class="form-inline search-form">
                      <div class="form-group">
                        <!--<label >姓名</label>-->
                        <el-input placeholder="" v-model="memberName" :disabled="true">
                          <template slot="prepend">&nbsp;&nbsp;&nbsp; 姓名：&nbsp;&nbsp;&nbsp;</template>
                        </el-input>
                      </div>
                      <div class="form-group">
                        <el-input placeholder="" v-model="member.phone" :disabled="true">
                          <template slot="prepend">手机号码：</template>
                        </el-input>
                      </div>
                      <div class="form-group" style="margin-top: 6px;">
                        <el-input placeholder="" v-model="memberCardFormat" :disabled="true">
                          <template slot="prepend">会员卡：</template>
                        </el-input>
                      </div>
                      <div class="form-group" style="margin-top: 6px;">
                        <el-input placeholder="" v-model="member.source" :disabled="true">
                          <template slot="prepend">会员来源：</template>
                        </el-input>
                      </div>
                      <div class="form-group" style="margin-top: 6px;">
                        <el-input placeholder="" v-model="member.scheduledTimes" :disabled="true">
                          <template slot="prepend">预约次数：&nbsp;&nbsp; &nbsp;</template>
                        </el-input>
                      </div>
                      <div class="form-group" style="margin-top: 6px;">
                        <el-input placeholder="" v-model="member.orderTimes" :disabled="true">
                          <template slot="prepend">订单次数：&nbsp;&nbsp; &nbsp;</template>
                        </el-input>
                      </div>
                      <div class="form-group" style="margin-top: 6px;">
                        <el-input placeholder="" v-model="member.registerTime" :disabled="true">
                          <template slot="prepend">注册时间：&nbsp;&nbsp; &nbsp;</template>
                        </el-input>
                      </div>
                      <!--<div class="form-group">
                        <button type="button" class="btn btn-sm btn-success" @click="search(1)">
                          <i class="fa fa-search"></i>&nbsp;搜索
                        </button>
                      </div>-->
                    </div>
                  </form>
                <h6 style="padding-top: 5px">详细信息</h6>
                <div class="ibox-content m-b-sm" style="display: block;">
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.referee" :disabled="true">
                      <template slot="prepend">推荐人：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.firstServeTime" :disabled="true">
                      <template slot="prepend">第一次服务时间：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.age" :disabled="true">
                      <template slot="prepend">年龄：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.birthday" :disabled="true">
                      <template slot="prepend">生日：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserMaritalStatus" :disabled="true">
                      <template slot="prepend">婚姻状况：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserHaveChildren" :disabled="true">
                      <template slot="prepend">是否有小孩：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.hobby" :disabled="true">
                      <template slot="prepend">爱好：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserColourOfSkin" :disabled="true">
                      <template slot="prepend">肤色：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.typeOfNailBed" :disabled="true">
                      <template slot="prepend">甲床类型：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.nailType" :disabled="true">
                      <template slot="prepend">喜欢的甲型：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserNailHardness" :disabled="true">
                      <template slot="prepend">指甲软硬度：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserResidence" :disabled="true">
                      <template slot="prepend">住所区域：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserWorkAddress" :disabled="true">
                      <template slot="prepend">工作区域：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserOccupation" :disabled="true">
                      <template slot="prepend">职业：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserFrequencyOfNail" :disabled="true">
                      <template slot="prepend">多久做一次指甲：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.keyPointsOfSalon" :disabled="true">
                      <template slot="prepend">重视美甲沙龙的要点：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuserLikeStyle" :disabled="true">
                      <template slot="prepend">喜欢什么款式：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.customerConcerns" :disabled="true">
                      <template slot="prepend">客户提到的顾虑：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.solution" :disabled="true">
                      <template slot="prepend">解决办法：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.eyelashCondition" :disabled="true">
                      <template slot="prepend">睫毛状况：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="form-group" style="margin-top: 6px;">
                    <el-input placeholder="" v-model="memberuser.eyeShape" :disabled="true">
                      <template slot="prepend">眼型：&nbsp;&nbsp; &nbsp;</template>
                    </el-input>
                  </div>
                  <div class="lightBoxGallery" style="margin-top: 6px;">
                    <!--<img v-for="picpath in memberuser.questionnaireImgUrl.split(',')" v-bind:src="$BASE_PICTUREPATH_URL+picpath" style="height: 200px;width: 200px;padding-right: 5px"> </img>-->
                    <a v-for="picpath in questionnaireImgUrlArray" v-bind:href="$BASE_PICTUREPATH_URL+picpath" title="图片" data-gallery=""><img v-bind:src="$BASE_PICTUREPATH_URL+picpath" style="height: 200px;width: 200px;padding-right: 5px"></a>
                    <div id="blueimp-gallery" class="blueimp-gallery">
                      <div class="slides"></div>
                      <h3 class="title"></h3>
                      <a class="prev">‹</a>
                      <a class="next">›</a>
                      <a class="close">×</a>
                      <a class="play-pause"></a>
                      <ol class="indicator"></ol>
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
  import storeuser_modify from '@/components/storeuser/storeuser_modify'
  import storeuser_new from '@/components/storeuser/storeuser_new'
    export default {
      name: "member_detail",
      props: ["member"],
      data: function () {
        return {
          memberuser: {
            referee: '',
            firstServeTime: '',
            age: '',
            birthday: '',
            maritalStatus: '',
            haveChildren: '',
            hobby: '',
            colourOfSkin: '',
            typeOfNailBed: '',
            nailType: '',
            nailHardness: '',
            residence: '',
            workAddress: '',
            occupation: '',
            frequencyOfNail: '',
            keyPointsOfSalon: '',
            likeStyle: '',
            customerConcerns: '',
            solution: '',
            eyelashCondition: '',
            eyeShape: ''
          },
          questionnaireImgUrlArray: []
        }
      },
      mounted: function () {
          this.doSearch()
      },
      computed: {
        memberName() {
          if(this.member.storeRecordRealName != null && this.member.storeRecordRealName != ''){
            return this.member.storeRecordRealName
          }else if(this.member.realName != null && this.member.realName != '') {
            return this.member.realName
          }else if(this.member.nickname != null && this.member.nickname != ''){
            return this.member.nickname
          }else {
            return ''
          }
        },
        memberCardFormat() {
          if(this.member.customerBalance == null){
            return '普通会员';
          }else {
            return this.member.customerBalance.level;
          }
        },
        memberuserMaritalStatus() {
          if(this.memberuser.maritalStatus == 1){
            return '已婚';
          }else if(this.memberuser.maritalStatus == 2) {
            return '未婚';
          }
        },
        memberuserHaveChildren() {
          if(this.memberuser.haveChildren == 1){
            return '有';
          }else if(this.memberuser.haveChildren == 2) {
            return '无';
          }
        },
        memberuserColourOfSkin() {
          if(this.memberuser.colourOfSkin == 1){
            return '偏白';
          }else if(this.memberuser.colourOfSkin == 2) {
            return '黑';
          }
        },
        memberuserNailHardness() {
          if(this.memberuser.nailHardness == 1){
            return '硬甲';
          }else if(this.memberuser.nailHardness == 2) {
            return '软甲';
          }
        },
        memberuserResidence () {
          if(this.memberuser.residence == 1){
            return '天河';
          }else if (this.memberuser.residence == 2) {
            return '海珠';
          }else if (this.memberuser.residence == 3) {
            return '白云';
          }else if (this.memberuser.residence == 4) {
            return '番禺';
          }else if (this.memberuser.residence == 5) {
            return '广州外';
          }
        },
        memberuserWorkAddress () {
          if(this.memberuser.workAddress == 1) {
            return '天河';
          }else if(this.memberuser.workAddress == 2) {
            return '海珠';
          }else if(this.memberuser.workAddress == 3) {
            return '白云';
          }else if(this.memberuser.workAddress == 4) {
            return '番禺';
          }else if(this.memberuser.workAddress == 5) {
            return '广州外';
          }
        },
        memberuserOccupation () {
          if(this.memberuser.occupation == 1) {
            return '白领';
          }else if(this.memberuser.occupation == 2) {
            return '学生';
          }else if(this.memberuser.occupation == 3) {
            return '家庭主妇';
          }else if(this.memberuser.occupation == 4) {
            return '自由职业';
          }else if(this.memberuser.occupation == 5) {
            return '其他';
          }
        },
        memberuserFrequencyOfNail () {
          if(this.memberuser.frequencyOfNail == 1) {
            return '三周';
          }else if (this.memberuser.frequencyOfNail == 2) {
            return '四周';
          }else if (this.memberuser.frequencyOfNail == 3) {
            return '五周';
          }else if (this.memberuser.frequencyOfNail == 4) {
            return '半年以上';
          }
        },
        memberuserLikeStyle () {
          if (this.memberuser.likeStyle == 1) {
            return '单色';
          }else if (this.memberuser.likeStyle == 2) {
            return '法式';
          }else if (this.memberuser.likeStyle == 3) {
            return '渐变';
          }else if (this.memberuser.likeStyle == 4) {
            return '彩绘';
          }
        }
      },
      filters:{
        },
      methods: {
        doSearch () {
          var searchAxios = this.$axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
          })
          var postData = this.$qs.stringify({
            customerId: this.member.id
          })
          searchAxios.post(this.$BASE_USER_URL + 'getCustomerDetailById', postData)
            .then(function (response) {
              if(response.data.data != null){
                this.memberuser = response.data.data
                if(response.data.data.questionnaireImgUrl != null && response.data.data.questionnaireImgUrl != '') {
                  this.questionnaireImgUrlArray = response.data.data.questionnaireImgUrl.split(",")
                }
              }
            }.bind(this))
        }
      }
    }
</script>

<style scoped>
</style>

<style>
  .lightBoxGallery img {
    margin: 5px;
    width: 160px;
  }
  .ibox-content {
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #fefefe;
    color: #606266
  }
</style>
