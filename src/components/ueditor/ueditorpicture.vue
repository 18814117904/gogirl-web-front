<template>
  <div>
    <script id="editorpicture" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'

  export default {
    name: "UEditorPicture",
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
        editorpicture: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editorpicture = UE.delEditor("editorpicture");
      this.editorpicture = UE.getEditor('editorpicture',this.config);
    },
    destoryed() {
      this.editorpicture.destory();
    },
    methods:{
      getUEPicContent: function(){
       return this.editorpicture.getContent();
      },
      setUEPicContent: function(content){
        var ue = UE.getEditor('editorpicture');
        ue.addListener('ready', function (editor) {
          ue.setContent(content);
        });
      },
      getPicContentTxt: function(){
        return this.editorpicture.getContentTxt();
      }
    }
  }
</script>
