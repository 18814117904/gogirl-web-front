<template>
  <div class="order-uploader">
    <div class="file-list">
      <!--渲染旧图片数据-->
      <section v-for="(pic, index) of picData" :key="index" class="file-item draggable-item"
				:class="{border_yellow:index === picIndex}">
        <img :src="pic && pic.file" alt ondragstart="return false;" 
					@click="changePic(index)"
				>
        <span class="file-remove" @click="Remove(index)">+</span>
      </section>
      <!--渲染新添加上去数据-->
      <section v-for="(file, index) of files" :key="file.src" class="file-item draggable-item"
				:class="{border_yellow:index === picIndex}">
        <img :src="file.src" alt ondragstart="return false;" @click="changePic(index, true)">
        <span class="file-remove" @click="remove(index)">+</span>
      </section>
      <section v-if="status == 'ready'" class="file-item">
        <div @click="add" class="add">
          <span>+</span>
        </div>
      </section>
    </div>

    <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple>
  </div>
</template>
<script>
export default {
  props: ["picData", "index"],
  data() {
    return {
      status: "ready",
      files: [],
      point: {},
      uploading: false,
      percent: 0,
      picIndex: 0,
      src: "http://192.168.6.230:8082/image/addPicture"
    };
  },
  watch: {
    index(curVal, oldVal) {
      if (curVal != oldVal) {
        this.files = [];
      }
    }
  },
  methods: {
    add() {
      this.$refs.file.click();
    },
    //上传的删除图片按钮
    remove(index) {
      this.files.splice(index, 1);
    },
    //旧数据回显的删除按钮
    Remove(index) {
      this.picData.splice(index, 1);
    },
    fileChanged() {
			const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
					this.html5Reader(list[i], item);
          this.files.push(item);

          this.files = this.picData.concat(this.files);
        }
        this.$emit("childByValue", this.files);
        this.picData = [];
      }

      this.$refs.file.value = "";
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
			const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    isContain(file) {
      this.files.forEach(item => {
        if (item.name === file.name && item.size === file.size) {
          return true;
        }
      });
      return false;
    },
    changePic(index, newPic) {
        this.picIndex = index;
        this.$emit("changePic", index, newPic);
    },
  }
};
</script>
<style scoped="scoped">
.border_yellow {
	border: 2px solid #ffda00;
}
.order-uploader .file-list {
  padding: 10px 0px;
}
.order-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.order-uploader .file-list .file-item {
	box-sizing: border-box;
  float: left;
  position: relative;
	width: 109px;
	height: 109px;
	margin-right: 10px;
	padding: 2px;
}

.order-uploader .file-list .file-item img:nth-of-type(1) {
  width: 100%;
  height: 100%;
  border: 1px solid #ececec;
}

.order-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.order-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.order-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.order-uploader .add {
  color: #b6b6b6;
  width: 108px;
  height: 108px;
  float: left;
  text-align: center;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
  background: white;
  padding-top: 38px;
  border-radius: 8px;
}
.order-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.order-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.order-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.order-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.order-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.order-uploader > input[type="file"] {
  display: none;
}
</style>