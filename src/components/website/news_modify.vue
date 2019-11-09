<template>
  <div>
    <div id="updatePi">
      <el-form :model="news" :rules="rules" ref="news" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <h3 style="margin-top:20px;">修改活动</h3>
            <table class="table table-hover">
              <tbody>
              <tr>
                <td >
                  <el-form-item label="标题:" prop="title" >
                <span>
              <el-input placeholder="请输入 标题" required v-model="news.title" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="简介:" prop="synopsis">
                <span>
                 <el-input placeholder="请输入 简介" v-model="news.synopsis" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="时间:" prop="time">
                <span>
                 <el-date-picker
                   v-model="news.time"
                   type="datetime"
                   value-format="yyyy-MM-dd HH:mm:ss"
                   placeholder="选择开始日期时间">
                  </el-date-picker>
                </span>
                  </el-form-item>
                </td>
                <td >
                  <el-form-item label="url:" prop="url" >
                <span>
              <el-input placeholder="请输入 url" required v-model="news.url" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="类型:" prop="type" >
                <span>
              <el-select filterable placeholder="请选择 类型" v-model="news.type" style="max-width:100%;">
                 <el-option label="活动"  :value="1" />
                    <el-option label="资讯" :value="2" />
                 <el-option label="款式" :value="3" />
              </el-select>
            </span>
                  </el-form-item>
                </td>

                <td >
                  <el-form-item label="备注:" prop="remark" >
                <span>
              <el-input placeholder="请输入 备注" required v-model="news.remark" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span style="color: red">图片：</span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span>
                    <div style="float: left">
                    <span v-if="PIC != '' && imageShow == true" v-for="pic in PIC"><img style="height: 80px; width: 80px;" :src="$BASE_PICTUREPATH_URL+pic" /></span>
                  </div>
                      <uploader v-on:childByValue="childByValue"></uploader>
                    </span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span style="color: red">活动详情：</span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <UEditor :config=config2 ref="ueditor"></UEditor>
                </td>
              </tr>
              <tr><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-form>
    </div>
    <div style="margin: 10px auto">
      <div style="margin: 0 auto;width: 20%">
        <el-button type="primary" plain @click="save" v-bind:disabled="hadSave">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import UEditor from '@/components/ueditor/ueditor.vue'
  import UEditorPicture from '@/components/ueditor/ueditorpicture.vue'
  import selectimage from "@/components/imageutils/selectimage";
  import updatapic from "@/components/imageutils/updatapic";
  import uploader from "@/components/uploadpicture/uploader.vue"
  export default {
    components:{
      uploader, UEditor, 	selectimage,UEditorPicture,
      updatapic, selectimage
    },
    name: "news_new",
   // props: ["attr"],
    data: function(){
      return {
        news: {
          id: '',
          picturePath: '',
          title: '',
          synopsis: '',
          time: '',
          type: '',
          url: '',
          remark: ''
        },
        config2: {
        },
        attr: this.$route.params.nodetail,
        hadSave: false,
        PIC: [],
        imageShow: true,
        //获取图片数组
        picArr:[],
        //筛选图片
        addVisible: false,
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          synopsis: [{required: true, message: '请输入简介', trigger: 'blur'}],
          /*url: [{required: true, message: '请输入链接地址', trigger: 'blur'}],*/
          time: [{required: true, message: '请输入时间', trigger: 'blur'}],
          type: [{required: true, message: '请选择类型', trigger: 'blur'}]/*,
          remark: [{required: true, message: '请输入备注', trigger: 'blur'}]*/
        }
      }
    },
    mounted: function () {
      this.getNewsDetail()
    },
    methods: {
      childByValue(val){
        this.picArr = val
        this.imageShow = false
      },
      save() {
        this.$refs.news.validate(valid => {
          if (valid) {
            this.hadSave = true
            const formData = new FormData()
            var temp = this.picArr;
            temp.forEach((item) => {
              formData.append("picData", item.file)
            })
            formData.append("id", this.attr)
            formData.append("title", this.news.title)
            formData.append("skuType", this.news.skuType)
            formData.append("synopsis", this.news.synopsis)
            formData.append("time", this.news.time)
            formData.append("url", this.news.url)
            formData.append("type", this.news.type)
            formData.append("remark", this.news.remark)
            formData.append("content", this.$refs.ueditor.getUEContent())
            //步骤一:创建异步对象
            var ajax = new XMLHttpRequest();
            var that = this;
            //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
            ajax.open('post',this.$BASE_PATH + 'websiteNews/update',true);
            ajax.withCredentials = true;
            ajax.crossDomain = true;
            //步骤三:发送请求
            ajax.send(formData);
            //步骤四:注册事件 onreadystatechange 状态改变就会调用
            ajax.onreadystatechange = function () {
              if (ajax.readyState==4 &&ajax.status==200) {
                var response = JSON.parse(ajax.responseText);
                if(response.success==true){
                  that.$layer.msg("提交成功！")
                  that.hadSave = true
                  that.$router.push({ path: '/website/news_index' })
                }else{
                  that.$layer.msg("提交失败！")
                  that.hadSave = false
                  that.$router.push({ path: '/website/news_index' })
                }
              }
            }
          }else {
            return false
          }
        })
      },
      getNewsDetail () {
        var getServeTypeAxios = this.$axios.create({})
        getServeTypeAxios.get(this.$BASE_PATH + 'websiteNews/selectByPrimaryKey',{
          params: {
            id: this.attr
          }
        }).then(function (response) {
          this.$nextTick(function () {
            this.$refs.ueditor.setUEContent(response.data.data.content)
          })
          this.news = response.data.data
          this.PIC = response.data.data.picturePath.split(",")
        }.bind(this))
      }
    }
  }
</script>

<style scoped>

</style>
