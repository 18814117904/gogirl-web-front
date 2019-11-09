<template>
    <div class="Working_data" style="width:100%;height:100%;">
        <!--<div class="top">
            <p class="p1" @click="DisplayStore()">
                {{store1}}
                <van-icon name="arrow-down" style="font-size:20px;"/>
            </p>
             <div class="D1" ref="D1">
                    <van-popup v-model="show1" position="top" :click-overlay="false" >
                        <p class="p1" >所有门店
                            <van-icon name="arrow-down"  style="font-size:20px;"/>
                        </p>
                        <p class="p2">所有时间<van-icon name="arrow-down" style="font-size:20px;"/></p>
                        <ul class="u1" >
                            <li @click="storeChange(0,'所有门店')">所有门店</li>
                            <li @click="storeChange(L.id,L.name)" v-for="L in list" :key="L.id">{{L.name}}</li>
                            &lt;!&ndash; <li @click="off(1)">{{name}}</li>
                            <li @click="off(17)">{{name1}}</li>
                            <li @click="off(18)">{{name2}}</li> &ndash;&gt;
                        </ul>
                    </van-popup>
            </div>
            <p class="p2" @click="AllTime()" >
              {{store2}}
                <van-icon name="arrow-down" style="font-size:20px;"/>
            </p>
            <div class="D2" ref="D2">
                <van-popup v-model="show" position="top" :click-overlay="false">
                    <p class="p1" >{{store1}}
                        <van-icon name="arrow-down"  style="font-size:20px;"/>
                    </p>
                    <p class="p2">所有时间<van-icon name="arrow-down" style="font-size:20px;"/></p>
                    <ul class="u2">
                        <li @click="timeChange1()">所有时间</li>
                        <li @click="timeChange2()">当天</li>
                        <li @click="timeChange3()">近七天</li>
                        <li>自定义：</li>
                        <input type="text" :value="time1" @focus="in1()"  readonly="readonly" />&nbsp;—
                        <input type="text" :value="time2" @focus="in2()"  readonly="readonly" />
                        <button @click="timeChange()">确定</button>
                    </ul>
                </van-popup>
                <van-popup type="date" v-model="show2" position="bottom"  :click-overlay="false" style="height:45%;">
                    <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    @confirm="Finish"
                    @cancel="Finish2"
                    :max-date="date"
                    />
                </van-popup>
                 <van-popup type="date" v-model="show3" position="bottom" :click-overlay="false" style="height:45%;">
                    <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    @confirm="Finish1"
                    @cancel="Finish3"
                    :max-date="date"
                    />
                </van-popup>
             </div>
        </div>-->
        <div class="main-top">
            <div><p class="sp1"><b>{{Order}}</b></p>预约(个)</div>
            <div><p class="sp1"><b>{{sum_number}}</b></p>订单(个)</div>
            <div><p class="sp1"><b>{{totel_price}}</b></p>订单金额(元)</div>
        </div>
        <div class="main-m">
            <div><p class="sp1"><b>{{consumeCustomerNum}}</b></p>会员卡(个)</div>
            <div><p class="sp1"><b>{{sumCharge}}</b></p>充卡金额(元)</div>
            <div><p class="sp1"><b>{{sumBalance}}</b></p>开卡余额(元)</div>
        </div>
        <div class="main-bon">
            <div><p class="sp1"><b>{{customerBalanceNum}}</b></p>新增客户(个)</div>
            <div><p class="sp1"><b>{{customerNum}}</b></p>新增用户(个)</div>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                date:new Date(),
                usr:'',
                pas:'',
                store1:"所有门店",
                store2:"所有时间",
                // store:"我是门店",
                // store3:"我是时间",
                show:false,
                show1:false,
                show2:false,
                show3:false,
                currentDate: new Date(),
                time1:'',
                time2:'',
                Order:"",
                sum_number:"",
                totel_price:'',
                consumeCustomerNum:'',
                sumCharge:'',
                sumBalance:'',
                customerBalanceNum:'',
                customerNum:'',
                list:''
                // name:'',
                // name1:'',
                // name2:'',
                // name3:'',
                // id:'',
                // id1:'',
                // id2:'',
                // id3:''
			}
		},
		created(){
            this.GOIN()
        },
		methods: {
            //预约请求返回数据
            GOIN(){
                //获取店铺信息

                this.$axios({
					url: this.$BASE_STORE_URL +  "shop/queryShopForAll",
                    method: "get",
				}).then(res => {
                    console.log(res)
                    this.list = res.data.data
                    // this.name = res.data.data[0].name
                    // this.name1 = res.data.data[1].name
                    // this.name2 = res.data.data[2].name
                    // this.name3 = res.data.data[3].name

                    // this.id = res.data.data[0].id
                    // this.id1 = res.data.data[1].id
                    // this.id2 = res.data.data[2].id
                    // this.id3 = res.data.data[3].id

                })
                //订单
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url: this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            order(){
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data

                })
                this.show = false;
                //订单
                   this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //会员
                 this.$axios({
                    url: this.$BASE_USER_URL + "gogirl_user/countCustomerInfo",
                    method:"get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                        console.log(res)
                        this.consumeCustomerNum = res.data.data.consumeCustomerNum
                        this.customerBalanceNum = res.data.data.customerBalanceNum
                        this.customerNum = res.data.data.customerNum
                        this.sumBalance = res.data.data.sumBalance
                        this.sumCharge = res.data.data.sumCharge

                    })
            },
            in1(){
                this.show2 = true;
            },
            in2(){
                this.show3 = true;
            },
            Finish3(){
                    this.show3 = false;
            },
            Finish2(){
                    this.show2 = false;
			},
            Finish1(){
					let year = this.currentDate.getFullYear();
                    let month = this.currentDate.getMonth() + 1;
                    if(month<10){
                        month = "0" + month;
                    }
                    let day = this.currentDate.getDate();
                    if(day<10){
                        day = "0" + day;
                    }
                    let time = year + "-" + month + "-" + day
                    this.time2 = time
                    console.log(this.time2)
                    this.show3 = false;
			},
            Finish(){
					let year = this.currentDate.getFullYear();
                    let month = this.currentDate.getMonth() + 1;
                    if(month<10){
                        month = "0" + month;
                    }
                    let day = this.currentDate.getDate();
                    if(day<10){
                        day = "0" + day;
                    }
                    let time = year + "-" + month + "-" + day
                    this.time1 = time
                    this.show2 = false;
            },
            //隐藏元获取到的元素$refs
            AllTime(){
                this.$refs.D1.style.display = 'none'
                this.$refs.D2.style.display = 'block'
                this.show = true

            },
            DisplayStore(){
                this.show1 = true;
                this.$refs.D2.style.display = 'none'
                this.$refs.D1.style.display = 'block'
            },
            off0(){
                this.store1 = this.store1
                this.show1 = false;
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url:  this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:null,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            storeChange(id,name){
                if(id&&id!=0){
                    this.id= id
                    this.show1 = false;
                }else{
                    this.id= null
                    this.show1 = false;
                }
                this.store1 = name
                this.queryInfo();
            },
            timeChange1(){//所有
                this.show = false;
                this.time1 = null;
                this.time2 = null;
                this.store2 = "所有时间"
                this.queryInfo();
            },
            timeChange2(){//当天
                this.show = false;
                let year = this.currentDate.getFullYear();
                let month = this.currentDate.getMonth() + 1;
                    if(month<10){
                        month = "0" + month;
                    }
                let day = this.currentDate.getDate();
                    if(day<10){
                        day = "0" + day;
                    }
                let time = year + "-" + month + "-" + day
                this.time1 = time//今天日期
                this.time2 = time//今天日期
                this.store2 = this.time1+'~'+this.time2
                this.queryInfo();
            },
            timeChange3(){
                this.show = false;
                let year = this.currentDate.getFullYear();
                let month = this.currentDate.getMonth() + 1;
                    if(month<10){
                        month = "0" + month;
                    }
                let day = this.currentDate.getDate();
                    if(day<10){
                        day = "0" + day;
                    }
                let day1 = this.currentDate.getDate() ;
                    if(day<10){
                        day = "0" + day;
                    }

                let time = year + "-" + month + "-" + day
                let time7 = year + "-" + month + "-" + day1
                this.time1 = time //今天日期
                // this.time2 = time7 //七天后日期
                var today = new Date();
                var nowTime = today.getTime();
                var ms = 24*3600*1000*7;
                today.setTime(parseInt(nowTime + ms));
                var GM = today.getMonth()+1
                if(GM<10){
                    GM = "0" + GM
                }
                var GD = today.getDate()
                if(GD<10){
                    GD = "0" + GD
                }
                this.time2 = today.getFullYear()+"-"+ GM +"-"+ GD

                this.store2 = this.time1+'~'+this.time2
                this.queryInfo();
            },
            timeChange(){
                this.show = false;
                this.store2 = this.time1+'~'+this.time2
                this.queryInfo();
            },
            queryInfo(){
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:this.id,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:this.id,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url:  this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:this.id,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            off(id){
                this.store1 = this.name
                this.show1 = false;
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:this.id,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:this.id,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url: this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:this.id,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            off1(){
                this.store1 = this.name1
                this.show1 = false;
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:this.id1,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:this.id1,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url: this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:this.id1,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            off2(){
                this.store1 = this.name2
                this.show1 = false;
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:this.id2,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:this.id2,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url: this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:this.id2,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            off3(){
                this.store1 = this.name3
                this.show1 = false;
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:this.id3,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:this.id3,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url: this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:this.id3,
                        startTime:this.time1==""?null:this.time1,
                        endTime:this.time2==""?null:this.time2,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
            off4(){
                this.store2 = this.store2
                this.show = false;
                 this.store1 = this.name3
                this.show1 = false;
                this.$axios({
                    url: this.$BASE_ORDER_URL + "ordermanage/queryOrderSummary",
                    method:"get",
                    params:{
                        departmentId:null,
                        startTime:null,
                        endTime:null,
                    }
                    }).then(res => {
                            console.log(res)
                            this.sum_number = res.data.data.sumNumber
                            this.totel_price = res.data.data.totelPrice
                        })
                //预约
                this.$axios({
					url: this.$BASE_ORDER_URL +  "schedule/queryScheduleSummary",
                    method: "get",
                    params:{
                        departmentId:this.id3,
                        startTime:null,
                        endTime:null,
                    }
				}).then(res => {
                    console.log(res)
                    this.Order = res.data.data
                })
                //会员
                this.$axios({
					url: this.$BASE_USER_URL +  "gogirl_user/countCustomerInfo",
                    method: "get",
                    params:{
                        departmentId:this.id3,
                        startTime:null,
                        endTime:null,
                    }
				}).then(res => {
                    console.log(res)
                    this.consumeCustomerNum = res.data.data.consumeCustomerNum
                    console.log(this.consumeCustomerNum)
                    this.customerBalanceNum = res.data.data.customerBalanceNum
                    this.customerNum = res.data.data.customerNum
                    this.sumBalance = res.data.data.sumBalance
                    this.sumCharge = res.data.data.sumCharge

                })
            },
		},
		mounted() {

		}
	}
</script>

<style  scoped>
    .main-top{
        width:90%;
        margin-left:5%;
        height:100px ;
        div{
            margin-top: 15%;
            margin-left:2%;
            width: 30%;
            float: left;
            font-size:20px;
            color:#333;
        }

    }
    .main-m{
        width:90%;
        margin-left:5%;
        div{
             margin-left:2%;
            margin-top: 15%;
            width: 30%;
            float: left;
            font-size:20px;
            color:#333;

        }

    }
    .main-bon{
        width:90%;
        margin-left:5%;
        div{
             margin-left:2%;

            margin-top: 15%;
            width: 30%;
            float: left;
            font-size:20px;
            color:#333;
        }

    }
    .p1{
        height:50px;
        width: 50%;
        border-bottom:1px solid #ccc;
        border-right:1px solid #ccc;
        line-height:50px;
        font-size:13px;
        float: left;
        .van-icon{
            float: right;
            line-height: 50px;
            padding-right:10px;
        }

    }
    .p2{
        height:50px;
        width: 50%;
        float: left;
        border-bottom:1px solid #ccc;
        line-height:50px;
        font-size:13px;
        .van-icon{
            float: right;
            line-height: 50px;
            padding-right:10px;
        }
         .van-popup{
            height:100%;
        }
    }
    .u1{
        float: left;
        margin-left:3%;
        width: 90%;
        padding-bottom:20px;
        li{
            text-align: left;
            height:50px;
            line-height:50px;
            color:black;
            border-bottom:1px solid #ebedf0;
            font-size: 14px;
        }
    }
     .u2{
        float: left;
        margin-left:3%;
        width: 90%;
        padding-bottom:20px;
        li{
            text-align: left;
            height:50px;
            line-height:50px;
            color:black;
            border-bottom:1px solid #ebedf0;
            font-size: 14px;
        }
    }
    input{
        height:30px;
        border:1px solid #ccc;
        background:#FCFCFC;
        // text-indent:10px;
        margin-top:10px;
        text-align: center;
        // pointer-events: none;
    }
    button{
        height:30px;
        width: 40px;
        color:white;
        background:#fedb22;
        margin-left:8px;
    }
    .van-picker{
        position: absolute;
        bottom:0;
        width:100%;
        height:100%;
    }
</style>
<style >
	.Working_data {
		.van-picker__confirm {
			color:#fedb22;
		}
		.van-picker__cancel{
		    color: #cccccc;
		}
	}
</style>
