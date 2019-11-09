<template>
  <div>
    <div id="updatePi">
      <el-form :model="broadcast" :rules="rules" ref="broadcast" label-width="100px">
        <div style="margin-bottom: 5px ">
          <div class="fixed-table-container bootstrap-table">
            <h3 style="margin-top:20px;">新增轮播图</h3>
            <table class="table table-hover">
              <tbody>
              <tr>
                <td colspan="2">
                  <span style="color: rgb(255, 0, 0);">选择轮播图:</span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div>
                    已选择图片: <span v-for="pic in PIC"><img style="height: 30px; width: 30px;" :src="$BASE_PICTUREPATH_URL+pic" /></span><i class="el-icon-plus avatar-uploader-icon"  style="font-size: 25px;margin-left: 5px;margin-top: 5px;"  @click="UpDate"></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td >
                  <el-form-item label="标题:" prop="title" >
                <span>
              <el-input placeholder="请输入标题" required v-model="broadcast.title" style="max-width:100%;"></el-input>
            </span>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="链接地址:" prop="url">
                <span>
                 <el-input placeholder="请输入 链接地址" v-model="broadcast.url" style="max-width:100%;"></el-input>
                </span>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-form-item label="备注:" prop="remark" >
             <textarea id="serveRemark" class="form-control" v-model="broadcast.remark" style="max-width: 100%;"></textarea>
                  </el-form-item>
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
        <el-button type="primary" plain @click="save" v-bind:disabled="hadSave">保存</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import selectimage from "@/components/imageutils/selectimage";
  import updatapic from "@/components/imageutils/updatapic";
  import "@/components/imageutils/dialogDrag";
  export default {
    name: "broadcast",
    components: {selectimage, updatapic},
    data: function(){
      return {
        broadcast: {
          title: '',
          url: '',
          picturePath: '',
          remark: '',
          topTime: ''
        },
        //筛选图片
        addVisible: false,
        //上传图片
        UpDatePic: false,
        //图片选择显示
        PIC: [],
        rules: {

        },
        hadSave: false
      }
    },
    mounted: function () {
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
      cancel () {
        this.$router.push({ path: '/broadcast/broadcast_index' })
      },
      save() {
        if(this.PIC == "" || this.PIC == null){
          this.$message.error('你还没有添加轮播图图片');
          return false;
        }
        this.hadSave = true
            var url = this.$BASE_URL + 'broadcast/addBroadcast/'
            var saveAxios = this.$axios.create({})
            var postData = this.$qs.stringify({
              title: this.broadcast.title,
              url: this.broadcast.url,
              picturePath: this.PIC.join(","),
              remark: this.broadcast.remark
            })
            saveAxios.post(url, postData)
              .then(function (req) {
                this.$layer.msg(req.data.message)
                if (req.data.success == true) {
                  this.hadSave = true
                }
                this.$router.push({ path: '/broadcast/broadcast_index' })
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

  .v-modal {

  }

  #updatePi .Tan .el-dialog {
    width: 100%;
    height: 80%;
  }
</style>
