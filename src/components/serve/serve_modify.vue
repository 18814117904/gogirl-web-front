<template>
  <div>
    <div>
      <el-form :model="serve" :rules="rules" ref="serve" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <h3 style="margin-top:20px;">服务修改</h3>
            <table class="table table-hover">
              <tbody>
              <tr>
                <td colspan="2" @click="UpDate">
                  <span style="color: rgb(255, 0, 0);">服务图片:</span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div>
                    已选择图片: <span v-for="pic in PIC"><img style="height: 30px; width: 30px;" :src="$BASE_PICTUREPATH_URL+pic" /></span><i class="el-icon-plus avatar-uploader-icon"  style="font-size: 25px;margin-left: 5px;margin-top: 5px;"  @click="UpDate"></i>
                  </div>
                  <!--<div>
                    <UEditorPicture :config=config1 ref="editorpicture" v-model="serve.picture"></UEditorPicture>
                  </div>-->
                </td>
              </tr>
              <tr>
                <td >
                  <el-form-item label="服务名称:" prop="name" >
                <span>
              <el-input placeholder="请输入服务 名称" required v-model="serve.name" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="价格（元）:" prop="price">
                <span>
                 <el-input placeholder="请输入 价格" v-model.number="serve.price" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="选择款式:" prop="serveProducesSelected">
                <span>
                  <el-select filterable multiple placeholder="请选择 款式" v-model="serve.serveProducesSelected" @change="getProduceAll" style="max-width:100%;">
                    <el-option
                      v-for="serveProduce in serveProduces"
                       :key="serveProduce.id"
                       :label="serveProduce.name"
                       :value="serveProduce.id">
                       <img :src="$BASE_PICTUREPATH_URL+serveProduce.picturePath" style="height:36px;width: 39px"> &nbsp;
                      <span>{{serveProduce.name}}</span>
                    </el-option>
                    </el-select>
                </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="服务分类:" prop="serveTypeSelected">
                <span>
              <el-select filterable placeholder="请选择 分类" v-model="serve.serveTypeSelected" @change="reChooseServeType" style="max-width:100%;">
                    <el-option
                      v-for="type in serveTypes"
                      :key="type.id"
                      :label="type.name"
                      :value="type.name">
                    </el-option>
                    </el-select>
            </span>
                  </el-form-item>
                  <!--<el-form-item label="服务标签:" prop="serveLabelSelected">
                <span>
                  <el-select filterable multiple placeholder="请选择 标签" v-model="serve.serveLabelSelected" @change="reChooseServeLabel" style="max-width:100%;">
                    <el-option
                      v-for="serveLabel in serveLabels"
                      :key="serveLabel.id"
                      :label="serveLabel.name"
                      :value="serveLabel.name">
                    </el-option>
                    </el-select>
                </span>
                  </el-form-item>-->
                </td>
              </tr>
              <!--<tr>
                <td>

                </td>

                <td>
                  <el-form-item label="服务状态:" prop="serveStatusSelected">
                <span>
                  <el-select filterable placeholder="请选择 状态" v-model="serve.serveStatusSelected" style="max-width:100%;">
                    <el-option label="上线"  value="1" />
                    <el-option label="下线" value="0" />
                    </el-select>
                </span>
                  </el-form-item>
                </td>
              </tr>-->
              <tr>
                <!--<td>
                  <el-form-item label="服务排序:" prop="shopSort">
                <span>
                 <el-input placeholder="请输入 序号" v-model.number="serve.shopSort" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>-->
                <td>
                  <el-form-item label="时长（分钟）:" prop="serviceDuration">
                <span>
                 <el-input placeholder="请输入 时长(分钟)" v-model.number="serve.serviceDuration" style="max-width:100%;"></el-input>
                </span>
                </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item label="服务备注:" prop="remark">

                    <textarea id="remark" class="form-control" v-model="serve.remark" style="max-width: 100%;"></textarea>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <UEditor :config=config2 ref="ueditor"></UEditor>
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
        <el-button type="success" plain @click="modify" v-bind:disabled="hadSave">修改</el-button>
      </div>
    </div>
  </div>
  <!--<body class="">
  <div class="wrapper wrapper-content">
    <div class="ibox-content m-b-sm  border-bottom">
      <h4>基础信息</h4>
      <table class="table table-bordered">
        <tbody>
        <tr>
          <td class="text-right">
            <label> 上传图片：</label>
          </td>
          <td>
            <input id="picture" name="picture" type="file" accept="image/png,image/gif"/>
            <input type="button" value="提交" @click="savePicture">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </body>-->

  <!--methods: {
  savePicture(){
  var pictureSaveAxios = this.$axios.create({
  headers: {'content-type': 'multipart/form-data'}
  })
  let file = document.getElementById('picture').files[0];
  let param = new FormData()
  param.append('addPicture', file, file.name)
  pictureSaveAxios.post(this.$BASE_URL + 'commodity/addPicture/', param)
  .then(function(response){
  alert("success");
  })
  }
  }-->
</template>

<script>
  import UEditor from '@/components/ueditor/ueditor.vue'
  import UEditorPicture from '@/components/ueditor/ueditorpicture.vue'
  import selectimage from "@/components/imageutils/selectimage";
  import updatapic from "@/components/imageutils/updatapic";
  import "@/components/imageutils/dialogDrag";
    export default {
        name: "serve_new",
      components: {UEditor, UEditorPicture,selectimage,
        updatapic},
      data: function(){
        var newReg1 = (rule, value, callback) => {
          if (value!=parseFloat(value)) {
            callback(new Error('只能是数字'));
          } else if(value < 0){
            callback(new Error('不能为负数'));
          }else{
            callback();
          }
        };
          return {
            /*config1: {
              toolbars: [[
                'source', 'fullscreen','simpleupload', 'insertimage'
              ]]
            },*/
            config2: {
            },
            serveTypes: [],
            serveLabels: [],
            serveProduces: [],
            serveId: this.$route.params.nodetail,
            serve: {
              name: '',
              shopSort: '',
              price: 0,
              serviceDuration: '',
              remark: '',
              serveProducesSelected: [],
              serveLabelSelected: [],
              serveTypeSelected: '',
              serveStatusSelected: '1'
            },
            //筛选图片
            addVisible: false,
            //上传图片
            UpDatePic: false,
            //图片选择显示
            PIC: [],
            rules: {
              name: [{required: true, message: '请输入服务名称', trigger: 'blur'}],
              price: [{validator: newReg1, trigger: 'blur'}],
              /*shopSort: [{required: true, message: '请输入 序号'},
                {type: 'number', message: '序号必须为数字'}],*/
              serviceDuration: [{validator: newReg1, trigger: 'blur'}],
           /*   serveLabelSelected: [{required: true, message: '至少选择一个标签'}],*/
              serveTypeSelected: [{required: true, message: '请选择 分类'}]
             /* serveStatusSelected: [{required: true, message: '请选择 状态'}]*/
            },
            hadSave: false
          }
      },
      mounted: function () {
        this.reChooseServeType()
        this.reChooseServeLabel()
        this.getProduceAll()
        this.$nextTick(function () {
          this.getServeDetail()
        })
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
           modify() {
             this.$refs.serve.validate(valid => {
               if(valid){
                 this.hadSave = true
               var url = this.$BASE_URL + 'serve/modifyServe/'
               var saveAxios = this.$axios.create({})
               var postData = this.$qs.stringify({
                 id: this.serveId,
                 name: this.serve.name,
                 type: this.serve.serveTypeSelected,
                 label: this.serve.serveLabelSelected.join(","),
                 produces: this.serve.serveProducesSelected.join(","),
                 price: this.serve.price,
                 shopSort: this.serve.shopSort,
                 serviceDuration: this.serve.serviceDuration,
                 remark: this.serve.remark,
                 details: this.$refs.ueditor.getUEContent(),
                 picturePath: this.PIC.join(",")
               })
               saveAxios.post(url, postData)
                 .then(function (req) {
                   this.$layer.msg(req.data.message)
                   if (req.data.success == true) {
                     this.hadSave = true
                   }
                   this.$router.push({ path: '/serve/serve_index' })
                 }.bind(this))
               }else {
                 return false
               }
             })
           },
        cancel () {
          this.$router.push({ path: '/serve/serve_index' })
        },
        reChooseServeType () {
             var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_URL + 'type/queryType',{
            params: {
            }
          })
            .then(function (response) {
              this.serveTypes = response.data.data
            }.bind(this))
        },
        reChooseServeLabel () {
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_URL + 'label/queryLabel',{
            params: {
            }
          })
            .then(function (response) {
              this.serveLabels = response.data.data
            }.bind(this))
        },
        getServeDetail () {
          var getServeDetailAxios = this.$axios.create({})
          getServeDetailAxios.get(this.$BASE_URL + 'serve/queryServeForDetail', {
            params: {
              id: this.serveId
            }
          }).then(function (response) {
            this.serve.name = response.data.data.name
            this.serve.shopSort = response.data.data.shopSort
            this.serve.serviceDuration = response.data.data.serviceDuration
            this.serve.price = response.data.data.price
            this.serve.remark = response.data.data.remark
            this.serve.serveTypeSelected = response.data.data.type
            this.serve.serveLabelSelected = response.data.data.label.split(",")
            this.PIC = response.data.data.picturePath.split(",")
            var arr = response.data.data.listProduce
            if (arr != null) {
            this.serve.serveProducesSelected = arr.map(function (item, index, arr) {
              return Number(item.id)
            })
          }
            this.serve.serveStatusSelected = response.data.data.status
            this.$nextTick(function () {
              this.$refs.ueditor.setUEContent(response.data.data.details)
            })
          }.bind(this))
        },
        getProduceAll () {
          var getServeTypeAxios = this.$axios.create({})
          getServeTypeAxios.get(this.$BASE_URL + 'produce/queryProduceNoDesignationServe',{
            params: {
              serveId: this.serveId
            }
          })
            .then(function (response) {
              this.serveProduces = response.data.data
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
