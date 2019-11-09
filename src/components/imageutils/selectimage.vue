<template>
	<div>
		<div class="nav"></div>
		<el-container>
			<el-aside width="200px">
				<div>
					<button @click="updatePic">上传图片</button>
					<!--菜单栏-->
					<div class="CDL">
						<el-menu default-active="1-4-1" @open="handleOpen" ref='menu'>
							<el-submenu :index="nav.id+''"   v-for="(nav,index) in NAV" :key="index">
								<template slot="title">
									<span slot="title">{{nav.name}}</span>
								</template>
								<el-menu-item :index="nav.id+''" @click="Gorouter(nav)">
									{{nav.name}}
								</el-menu-item>
							</el-submenu>
						</el-menu>
					</div>
					<!--菜单栏-->
				</div>
			</el-aside>
			<el-main>
				<div class="selectImgDiv" id="selectItemDiv" v-for="(pic,index) in Pic" :key="index" >
					<div class="item" >
						<div class="img_show">
							<img :src="$BASE_PICTUREPATH_URL+pic.url" @click="getPage(pic,index)" />
						</div>
						<div>
							<p>{{pic.url}}</p>
						</div>
						<div class="img_title">
							{{pic.name}}.jpg
						</div>
						<div class="img_isCheck" >
							<i v-bind:style="{'display':pic.checkOn? 'block':'none'}" class="iconfont icon-xuanzhong"></i>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
		<!--分页-->
		<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"  :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="this.totalPage">
				</el-pagination>
			</div>
		<!--分页-->
		<div class="BTN">
			<el-button :plain="true" @click="sureF">确认保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "selectimage",
		data: function() {
			return {
				totalPage:null,
				NAV: [],
				currentPage4:null,
				Pic: [],
				page:null,
				Id:[],
				//保存id
				date:{},
				pageInfo: {
					pageNum: 1,
					pageSize: 5,
					startRow: 1,
					endRow: 1,
					total: 1,
					pages: 1,
					prePage: 0,
					nextPage: 2,
					isFirstPage: true,
					isLastPage: true,
					hasPreviousPage: false,
					hasNextPage: true,
					lastPage: 1,
					firstPage: 1
				},
				//勾上
				picArr:[],
				key:null,
			}
		},
		methods: {
			handleOpen(key,path){
				//console.log(key,path)
				this.key = key
			},
			//获取菜单栏信息
			getNavDate() {
				this.$axios({
					url: this.$BASE_URL + "image/queryImageGroup",
					methods: "get",
				}).then(response => {
					//console.log(response)
					let data ={
						id: 4,
						name: "全部"
					}
					let Data ={
						id: 5,
						name: "未分组"
					}
					response.data.message.unshift(data)
					response.data.message.push(Data)
					this.NAV = response.data.message
					console.log(response.data.message)
				})
			},
			//获取分页请求
			Gorouter(date){
				//把类保存起来
				this.date = date;
				this.picArr =[];
				if(date.name=="全部"){
					this.getPic()
				}else{
					this.$axios({
						url: this.$BASE_URL + "image/queryImageForPage",
						methods: "get",
						params: {
							imgGroup: date.name,
							pageNum: this.pageInfo.pageNum,
							pageSize: this.pageInfo.pageSize
						}
					}).then(response => {
						//console.log(response)
						//获取分组里面的总条数
						this.totalPage = response.data.pageInfo.total
						console.log(response.data.message)
						//加上是否勾上的判断状态
						for(let h in response.data.message){
							response.data.message[h].checkOn = false
						}
						this.Pic = response.data.message;
						console.log(this.Pic)
					})
				}
			},

			//初始化页面图片
			getPic() {
				this.$axios({
					url: this.$BASE_URL + "image/queryImageForPage",
					methods: "get",
					params: {
						pageNum: this.pageInfo.pageNum,
						pageSize: this.pageInfo.pageSize
					}
				}).then(response => {
					//console.log(response)
					//获取初始化界面的总条数
					this.totalPage = response.data.pageInfo.total
					//加上是否勾上的判断状态
					for(let h in response.data.message){
						response.data.message[h].checkOn = false
					}

					this.Pic = response.data.message
				})
			},

			//获取每页的条数
			handleSizeChange(val){
				this.pageInfo.pageSize = val

			},
			//获取页面,
			handleCurrentChange(val){
        if(this.date.name=="全部"){
          this.$axios({
            url: this.$BASE_URL + "image/queryImageForPage",
            methods: "get",
            params: {
              pageNum: val,
              pageSize: this.pageInfo.pageSize
            }
          }).then(response => {
            console.log(response)
            //加上是否勾上的判断状态
            for(let h in response.data.message){
              response.data.message[h].checkOn = false
            }
            this.Pic = response.data.message
          })
        }else {
          this.$axios({
            url: this.$BASE_URL + "image/queryImageForPage",
            methods: "get",
            params: {
              imgGroup: this.date.name,
              pageNum: val,
              pageSize: this.pageInfo.pageSize
            }
          }).then(response => {
            console.log(response)
            //加上是否勾上的判断状态
            for (let h in response.data.message) {
              response.data.message[h].checkOn = false
            }
            //console.log(response.data.message)
            //console.log(this.Id)
//					for(let i in response.data.message){
//						console.log("55555555")
//						for(let j in this.Id){
//							console.log(response.data.message[i].id,this.Id[j])
//							 if(response.data.message[i].id == this.Id[j]){
//							 	console.log("55555555")
//						 	      this.Pic[j].checkOn = true
//						    }
//						}
//
//					}
            this.Pic = response.data.message
          })
        }
			},
			//上传图片
			updatePic(){
				this.$emit('childClick')
			},

			//点击图片船数据到父组件
			sureF(){
				     this.$emit('childByValue', this.picArr)
			},

			//勾上渲染在首页
			getPage(pic,index){
				this.Pic[index].checkOn = !this.Pic[index].checkOn
				if(this.Pic[index].checkOn){
					this.picArr.push(pic.url);
					this.Id.push(pic.id)
				}else{
					this.picArr.splice(this.picArr.length-1, 1);
					this.Id.splice(this.Id.length-1, 1);
				}


			},
		},
		mounted() {
			this.getNavDate()
			this.getPic()
		},
	}
</script>

<style scoped>
	@import "../../../static/css/selectImg.css";
	 @import "../../../static/css/iconfont.css";
	 .el-pagination{
		margin-bottom: 20px;
		float: right;
	}
	.el-button{
		margin-left: 50%;
	}
</style>
