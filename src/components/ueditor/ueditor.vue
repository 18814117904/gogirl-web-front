<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
 //     this.initMethod()
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      initMethod: function() {
        const _this = this;
        this.editor = UE.delEditor("editor");
        this.editor = UE.getEditor('editor',this.config);
      },
      getUEContent: function(){
       return this.editor.getContent();
      },
      setUEContent: function(content){
        this.initMethod();
        var ue = UE.getEditor('editor');
        ue.addListener('ready', function (editor) {
        /*this.$nextTick(function () {})*/
          ue.setContent(content);
        });
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      }
    }
  }
</script>
