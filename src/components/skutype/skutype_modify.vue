<template>
  <div>
    <div id="updatePi">
      <el-form :model="skutype" :rules="rules" ref="skutype" label-width="100px" width="35%" style="display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;">
        <!--<div style="margin-bottom: 5px ">-->
        <!--<div class="fixed-table-container bootstrap-table">-->
        <!--<table class="table table-hover">-->
        <!--<tbody>-->
        <!--<tr style="align: center;">-->
        <!--<td style="align: center">-->
        <el-form-item label="类型名称:" prop="name" >
          <!--<span>-->
          <el-input placeholder="请输入 类型名称" required v-model="skutype.name"></el-input>
          <!--</span>-->
        </el-form-item>
        <!--</td>-->
        <!--</tr>-->


        <!--<tr><td></td></tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <el-form-itam>
          <!--<h3 style="margin-top:20px;">新增员工</h3>-->
          <el-button type="primary" plain @click="modify" style="margin-top: 18px" v-bind:disabled="hadSave">保存</el-button>
        </el-form-itam>
      </el-form>

    </div>
    <!--<div style="margin: 10px auto">-->
    <!--<div style="margin: 0 auto;width: 20%">-->
    <!--<el-button type="primary" plain @click="save" v-bind:disabled="hadSave">保存</el-button>-->
    <!--</div>-->
    <!--</div>-->
  </div>

</template>

<script>
  export default {
    components:{},
    name: "skutype_modify",
    props: ["attr", "attrname"],
    data: function(){
      return {
        skutype: {
          name: ''
        },
        hadSave: false,
        addVisible: false,
        rules: {
          name: [{required: true, message: '请输入类型', trigger: 'blur'}]
        }
      }
    },
    mounted: function () {
      this.skutype.name = this.attrname
    },
    methods: {
      modify() {
        this.$refs.skutype.validate(valid => {
          if(valid){
            var searchAxios = this.$axios.create({
              headers: {'content-type': 'application/x-www-form-urlencoded'}
            })
            var postData = this.$qs.stringify({
              name: this.skutype.name,
              id: this.attr
            })
            searchAxios.post(this.$BASE_PURCHASE_URL + 'skuType/update', postData)
              .then(function (response) {
                this.$layer.msg(response.data.message)
                this.$emit('modifyChildClick')
              }.bind(this))
          }else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
