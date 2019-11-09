<template>
	<div class="updatePic">
		<header>本地上传图片</header>
		<div>
			<el-select v-model="picData"  filterable allow-create default-first-option @visible-change="" placeholder="请选择图片分类">
				<el-option v-for="item in picL" :key="item.name" :label="item.name" :value="item.name">
				</el-option>
			</el-select>
		</div>
		<div>
			<uploader :src="'/api/imgs'"  :picData="picData" ></uploader>
		</div>
	</div>
</template>

<script>
	import uploader from "../common/uploader";
	export default {
		components: {
		  uploader
		},
		data() {
			return {
				picL: [],
				picData:"",
			};
		},
		methods: {
			 getData() {
				this.$axios({
					url: this.$BASE_URL + "image/queryImageGroup",
					methods: "get",
				}).then(response => {
					console.log(response)
					this.picL = response.data.message
				})
			},





		},
		mounted() {
           this.getData()
		},
	}
</script>

<style scoped>
	@import "../../../static/css/updatapic.css";

</style>
