<template>
	<el-dialog title="选择款式" 
		:visible.sync="dialogVisible" @close='cancel' 
		width="30%"
		:modal="false">
					<span v-for="(arr,index) in typeList" @click="choose(arr,index)"
					:key="index"
					class="tab"
					:class="index==Index?'btn-blue':'threeTab'">{{arr.name}}</span>
					<span slot="footer" class="dialog-footer">
				<el-button class="btn-blue" @click="sure()">确认选择</el-button>
				</span>
	</el-dialog>
</template>

<script>
		export default {
		props:['dialogVisible','typeList'],	
		data() {
			return {
				//设置高亮的状态码判断
				//设置必选
				Index:0,
				//保存选上的样式
				type:"",
			}
		},
		methods: {
		  cancel(){
		  	this.$emit('cancelClick')
		  },
		  choose(arr,val){
		  	this.Index = val
		  	this.type = arr.name
		  },
		  sure(){
		   	//判断是默认第一个还是自己选择的款式
		  	let produceName =""
		  	if(this.type){
		  		produceName = this.type
		  	}else{
		  		produceName = this.typeList[0].name
		  	}
		  	this.$emit('giveType', produceName)
		  	//传完值之后清空选上的款式避免影响全局
		  	this.type =""
		  	this.Index =0;
		  }
		},
	};
</script>

<style lang="scss" scoped>
	.tab {
    cursor: pointer;
		border-radius: 6px;
		display: inline-block;
		padding: 5px 12px;
		margin: 20px 10px;
	}
	.threeTabHover {
		color: #fff;
		background: gold;
		border: 1px solid gold;
	}
	.threeTab{
		background: white;
		border: 1px solid #dcdfe6;
	}
</style>