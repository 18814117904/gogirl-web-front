<template>
  <div>
    <div id="updatePi">
      <el-form :model="produce" :rules="rules" ref="produce" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <h3 style="margin-top:20px;">修改款式</h3>
            <table class="table table-hover">
              <tbody>
              <tr>
                <td colspan="2">
                  <span style="color: rgb(255, 0, 0);">图案:</span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div>
                    已选择图案: <span v-for="pic in PIC"><img style="height: 30px; width: 30px;" :src="$BASE_PICTUREPATH_URL+pic" /></span><i class="el-icon-plus avatar-uploader-icon"  style="font-size: 25px;margin-left: 5px;margin-top: 5px;"  @click="UpDate"></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td >
                  <el-form-item label="款式名称:" prop="name" >
                <span>
              <el-input placeholder="请输入款式 名称" required v-model="produce.name" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="所属服务:" prop="serveSelected">
                <span>
                  <el-select filterable placeholder="请选择 服务" v-model="produce.serveSelected" @change="reChooseServe" style="max-width:100%;">
                    <el-option
                      v-for="serveList in serveLists"
                      :key="serveList.id"
                      :label="serveList.name"
                      :value="serveList.id">
                       <img :src="$BASE_PICTUREPATH_URL+serveList.picturePath" style="height:36px;width: 39px"> &nbsp;
                      <span>{{serveList.name}}</span>
                    </el-option>
                    </el-select>
                </span>
                  </el-form-item>
                </td>
                <!--<td>
                  <el-form-item label="服务价格:" prop="price">
                <span>
                 <el-input placeholder="请输入 价格" v-model="serve.price" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>-->
              </tr>
              <!--<tr>
                <td>
                  <el-form-item label="需要等级:" prop="reqGrade">
                <span>
                  <el-select filterable placeholder="请选择 等级" v-model="produce.reqGrade" style="max-width:100%;">
                    <el-option label="低级" value="低级"/>
                    <el-option label="中级" value="中级"/>
                    <el-option label="高级" value="高级"/>
                    </el-select>
                </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="标签:" prop="produceLabelSelected">

                <span>
                  <el-select filterable multiple placeholder="请选择 标签" v-model="produce.produceLabelSelected" @change="reChooseProduceLabel" style="max-width:100%;">
                    <el-option
                      v-for="produceLabel in produceLabels"
                      :key="produceLabel.id"
                      :label="produceLabel.name"
                      :value="produceLabel.name">
                    </el-option>
                    </el-select>
                </span>
                  </el-form-item>
                </td>
              </tr>-->
              <!--<tr>
                <td>
                  <el-form-item label="分类:" prop="produceTypeSelected">
                <span>
              <el-select filterable placeholder="请选择 分类" v-model="produce.produceTypeSelected" @change="reChooseproduceType()" style="max-width:100%;">
                    <el-option
                      v-for="type in produceTypes"
                      :key="type.id"
                      :label="type.name"
                      :value="type.name">
                    </el-option>
                    </el-select>
            </span>
                  </el-form-item>
                </td>

                <td>
                  <el-form-item label="状态:" prop="produceStatusSelected">
                <span>
                  <el-select filterable placeholder="请选择 状态" v-model="produce.produceStatusSelected" style="max-width:100%;">
                    <el-option label="上线"  value="1" />
                    <el-option label="下线" value="0" />
                    </el-select>
                </span>
                  </el-form-item>
                </td>
              </tr>-->
             <!-- <tr>
                <td>
                  <el-form-item label="排序:" prop="shopSort">
                <span>
                 <el-input placeholder="请输入 序号" v-model="produce.shopSort" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
                <td></td>
              </tr>-->
              <tr>
                <td colspan="2">
                  <el-form-item label="款式备注:" prop="produceRemark">

                    <textarea id="produceRemark" class="form-control" v-model="produce.produceRemark" style="max-width: 100%;"></textarea>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <span style="color: rgb(255, 0, 0);">款式详情</span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <UEditor :config=config2 ref="ueditor" v-model="produce.details"></UEditor>
                </td>
              </tr>
              <tr><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-form>

      <!--弹框选择图片筛选图片弹框-->
      <div class="tan" v-dialogDrag>
        <el-dialog title="添加图片" :visible.sync="addVisible" v-if='addVisible' width="90%" style=" z-index: 10000;" center>
          <selectimage v-on:childByValue="childByValue" v-on:childClick="childClick"></selectimage>
        </el-dialog>
      </div>

      <div class="Tan" v-dialogDrag>
        <el-dialog title="分组上传图片" :visible.sync="UpDatePic" style=" z-index: 10000; width: 100%; height: 90%" center>
          <updatapic></updatapic>
        </el-dialog>
      </div>
    </div>
    <div style="margin: 10px auto">
      <div style="margin: 0 auto;width: 20%">
        <el-button type="primary" plain @click="cancel">返回</el-button>
        <el-button type="success" plain @click="save" v-bind:disabled="hadSave">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import UEditor from '@/components/ueditor/ueditor.vue'
  import selectimage from "@/components/imageutils/selectimage";
  import updatapic from "@/components/imageutils/updatapic";
  export default {
    name: "produce_new",
    components: {UEditor,selectimage,
      updatapic},
    data: function(){
      return {
        config2: {
        },
        produceTypes: [],
        produceLabels: [],
        serveLists: [],
        produceId: this.$route.params.nodetail,
        produce: {
          name: '',
          produceLabelSelected: [],
          serveSelected: '',
          produceTypeSelected: '',
          produceStatusSelected: '1',
          shopSort: 1,
          grade: '0',
          reqGrade: '',
          produceRemark: ''
        },
        //筛选图片
        addVisible: false,
        //上传图片
        UpDatePic: false,
        //图片选择显示
        PIC: [],
        rules: {
          name: [{required: true, message: '请输入款式名称', trigger: 'blur'},
            {min: 3, message: '长度大于3', trigger: 'blur'}],
          /*shopSort: [{required: true, message: '请输入 序号'},
            {type: 'number', message: '序号必须为数字'}],
          produceLabelSelected: [{required: true, message: '至少选择一个标签'}],
          produceTypeSelected: [{required: true, message: '请选择 分类'}],
          produceStatusSelected: [{required: true, message: '请选择 状态'}],*/
          serveSelected: [{required: true, message: '请选择所属服务'}]
        },
        hadSave: false
      }
    },
    mounted: function () {
      this.reChooseProduceType()
      this.reChooseProduceLabel()
      this.reChooseServe()
      this.getProduceDetail()
    },
    methods: {
      UpDate() {
        this.addVisible = true
      },
      childByValue(url) {
        // childValue就是子组件传过来的值
        console.log(url)
        if(url.length == 0) {
          this.$message.error('你还没有添加图片');
        } else {
          this.addVisible = false
          this.PIC = url
          this.$message({
            message: '恭喜你，添加图片成功',
            type: 'success'
          });
        }
      },
      //点击令弹框消失
      childClick(data) {
        this.addVisible = false;
        this.UpDatePic = true;
      },
      save() {
        this.$refs.produce.validate(valid => {if(valid){
          if(this.PIC == "" || this.PIC == null){
            alert("请选择图案!");
            return false;
          }
          this.hadSave = true
          var url = this.$BASE_URL + 'produce/modifyProduce/'
          var saveAxios = this.$axios.create({})
          var postData = this.$qs.stringify({
            serveId: this.produce.serveSelected,
            id: this.produceId,
            name: this.produce.name,
            type: this.produce.produceTypeSelected,
            label: this.produce.produceLabelSelected.join(","),
            reqGrade: this.produce.reqGrade,
            shopSort: this.produce.shopSort,
            remark: this.produce.produceRemark,
            picturePath: this.PIC.join(","),
            details: this.$refs.ueditor.getUEContent()
          })
          saveAxios.post(url, postData)
            .then(function(req){
              this.$layer.msg(req.data.message)
              if(req.data.success == true){
                this.hadSave = true
              }
            }.bind(this))
          this.$router.push({ path: '/produce/produce_index' })
        }else{
          return false;
        }
        })
      },
      cancel () {
        this.$router.push({ path: '/produce/produce_index' })
      },
      getProduceDetail () {
        /*this.$nextTick(function () { })*/
        var getServeDetailAxios = this.$axios.create({})
        getServeDetailAxios.get(this.$BASE_URL + 'produce/queryProduceDetail', {
          params: {
            id: this.produceId
          }
        }).then(function (response) {
          this.produce = response.data.data
          if(response.data.data.serveId != null){
            this.produce.serveSelected = response.data.data.serveId
          }
          this.produce.produceTypeSelected = response.data.data.type
          this.produce.produceLabelSelected = response.data.data.label.split(",")
          this.produce.produceStatusSelected = response.data.data.status
          this.produce.produceRemark = response.data.data.remark
          this.PIC = response.data.data.picturePath.split(",")
            this.$nextTick(function () {
              this.$refs.ueditor.setUEContent(response.data.data.details)
            })
        }.bind(this))
      },
      reChooseProduceType: function() {
        var getProduceTypeAxios = this.$axios.create({})
        getProduceTypeAxios.get(this.$BASE_URL + 'type/queryType',{
          params: {
            type: 'type'
          }
        })
          .then(function (response) {
            this.produceTypes = response.data.data
          }.bind(this))
      },
      reChooseProduceLabel () {
        var getProduceTypeAxios = this.$axios.create({})
        getProduceTypeAxios.get(this.$BASE_URL + 'label/queryLabel',{
          params: {
            type: 'label'
          }
        })
          .then(function (response) {
            this.produceLabels = response.data.data
          }.bind(this))
      },
      reChooseServe () {
        var getServeAxios = this.$axios.create({})
        getServeAxios.get(this.$BASE_URL + 'serve/queryServeForAll',{
          params: {
          }
        })
          .then(function (response) {
            this.serveLists = response.data.data
          }.bind(this))
      }
    }
  }
</script>

<style scoped>
  @import "../../../static/css/selectImg.css";
  @import "../../../static/css/iconfont.css";
  #updatePi .tan .el-dialog {
    width: 100%;

  }

  #updatePi .Tan .el-dialog {
    width: 100%;
    height: 80%;
  }
</style>
