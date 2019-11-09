<template>
  <body class="">
  <!--gray-bg-->
  <div class="wrapper wrapper-content">
    <div class="ibox-content m-b-sm  border-bottom">
      <h4>基础信息</h4>
      <!--<span class="text-danger">【】</span><span class="text-danger">【】</span>-->
      <table class="table table-bordered">
        <tbody>
        <tr>
          <td class="text-right">
            <label> 服务编号：</label>
          </td>
          <td>
            <span>{{serve.id}}</span>
          </td>
          <td class="text-right">
            <label>分类：</label>
          </td>
          <td>
            <span>{{serve.type}}</span>
          </td>
          <td class="text-right">
            <label>标签：</label>
          </td>
          <td>
            <span>{{serve.label}}</span>
          </td>
        </tr>
        <tr>
          <td class="text-right">
            <label> 网店排序：</label>
          </td>
          <td>
            <span>{{serve.shopSort}}</span>
          </td>
          <td class="text-right">
            <label>状态：</label>
          </td>
          <td>
            <span v-html="serve.status"></span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  </body>
</template>

<script>
    export default {
        name: "serve_detail",
      data: function () {
          return {
            serveId: this.$parent.nodetail,
            serve: {
              id: 0,
              type: '',
              label: '',
              shopSort: '',
              picturePath: '',
              status: ''
            }
          }
      },
      mounted: function () {
          this.getServeDetail()
      },
      methods: {
          getServeDetail () {
            var getServeDetailAxios = this.$axios.create({})
            getServeDetailAxios.get(this.$BASE_URL + 'serve/queryServeForDetail', {
              params: {
                id: this.serveId
              }
            }).then(function (response) {
              this.serve = response.data
              if(response.data.status == 0){
                this.serve.status = '<span style="color:red">关闭</span>'
              }else if(response.data.status == 1){
                this.serve.status = '<span style="color:green">开启</span>'
              }
            }.bind(this))
          }
      }
    }
</script>

<style scoped>

</style>
