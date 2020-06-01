<template>
	<view class="page-gray pb112">
		<uni-nav-bar left-icon="" left-text="" fixed :right-text="headerTitle.right" :backgroundColor="headerTitle.backgroundColor" :border="false" :color="headerTitle.color" :title="headerTitle.title" @clickLeft="clickLeft" @clickRight="clickRight" v-if="isShowDate==false&&isShowIicketHolder==false&&isShowselectSeat== false && isselectpeople==false && isShowDescription==false">
			
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"  v-if="isShowDate||isShowIicketHolder||isShowselectSeat||isselectpeople"></image>
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;" v-else></image>
		</uni-nav-bar>
		<view class="linear-gradient-color">
			<view class="place-order-data">
				<view class="com-date-wrapper">
					<view class="com-date-item" v-for="(item, index ) of slecteData" :key="index" :class="{'disabled':item.isDisabled == false,'active': index == 1}" @click="checkDateHandler(item)">
						<view>{{item.week}}</view>
						<view>{{today === item.yearmd ? '今天' : item.monthd}}</view>
					</view>
					<view class="com-date-btn" style="" @click="dateBtn">
						<image src="../../static/img/icon/timer2.png" style="width: 36rpx; height: 36rpx; margin-bottom: 4rpx;"></image>
						<image src="../../static/img/icon/timer1.png" style="width: 11rpx; height: 11rpx;"></image>
					</view>
				</view>
			</view>
			
			<view class="pays-orider-tickets">
				<com-tickets :ticketsData="ticketsData" :handler="handler" :ticketsIndex="ticketsIndex" @comticketsClick="comticketsClick"></com-tickets>
			</view>
			
			<view class="pays-orider-selectpeople">
				<!-- <view class="orider-selectpeople" @click="selectpeopleHandler()" v-if="ticketsIndex ==0">
					<image src="../../static/img/icon/add-gree.png"></image>选择持票人
				</view> -->
				<com-pays-people :paysPeople="paysPeople" :ticketsIndex="ticketsIndex"  @selectpeopleHandler="selectpeopleHandler" @selectTicketHandler="selectTicketHandler(ticketsData[0].id)" @deleteHandler="deleteHandler"></com-pays-people>
			</view>
			<!-- 提示 -->
			<view class="pays-orider-reminder">
				<com-reminder :seatcontent="seatcontent"></com-reminder>
			</view>
			<view class="pays-orider-server">
				提交订单表示阅读并同意<text @click="openUserText">《服务条例》</text>
			</view>
			<!-- 服务条例 -->
			<uni-popup ref="popup" type="center">
				<view class="popupWarp">
					<view class="poputtitle">《服务协议》</view>
					<scroll-view scroll-y="true" class="scroll-Y">
						<view class="scrollViewItem">         
							<view class="userSetTitle_con">{{service_agreement_text}}</view>
							<!-- <view class="userSetTitle_con">2. 比较好的，字图多，仍清楚，明白，读者看着用时稍多，也不查资料，也很明白。以上两种情况占50%。</view>
							<view class="userSetTitle_con">3. 一般，字图很多，内容不顺，读者看着用时很多，还费力，须查资料，但还是可以看懂。这种情况占40%。</view>
							<view class="userSetTitle_con userSetTitle"> 二、注册信息和隐私保护 </view>
							<view class="userSetTitle_con">2. 比较好的，字图多，仍清楚，明白，读者看着用时稍多，也不查资料，也很明白。以上两种情况占50%。</view>
							<view class="userSetTitle_con">3. 一般，字图很多，内容不顺，读者看着用时很多，还费力，须查资料，但还是可以看懂。这种情况占40%。</view> -->
						</view> 
					</scroll-view>
					<view class="clonesWarp" @click="clonesPopup">
						<image src="/static/img/login/guanbi.png" mode=""></image>
					</view>
				</view>
			</uni-popup>
			<!-- 选择日期 -->
			<view class="select-date-wrapper" v-if="isShowDate">
				<select-date @selectDateHandler="selectDateHandler"></select-date>
			</view>
			<!-- 选择持票人 -->
			<view class="select-date-wrapper" v-if="isShowIicketHolder">
				<select-ticket-holder :addressInfo="addressInfo" @selectpeopleClick="selectpeopleClick"></select-ticket-holder>
			</view>
			<!-- 选择座位 -->
			<view class="select-date-wrapper" v-if="isShowselectSeat">
				<select-seat :seatDatalist="seatDatalist" :content="content" @selectSeatClick="selectSeatClick"></select-seat>
			</view>
			<!-- 购票须知 -->
			<view class="select-date-wrapper" v-if="isShowDescription">
				<ticket-description @descriptionClose="descriptionClose" @descriptionClick="descriptionClick" :ticketsData="ticketsData"></ticket-description>
			</view>
			
			<view class="pays-orider-footer">
				<view class="image">
					<image :src=" isShow ? '/static/img/icon/shoucang.png' : '/static/img/home-xing.png'" mode="" @click="shoucangHandler()"></image>
				</view>
				<view class="submit" @click="orderSubmitHandler()">
					提交订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import comPaysPeople from "@/components/com-pays-people/com-pays-people.vue"
	import comReminder from "@/components/com-Reminder/com-Reminder.vue"
	import selectDate from "@/pages/select-date/select-date.vue"
	import selectTicketHolder from "@/pages/select-ticket-holder/select-ticket-holder.vue"
	import selectSeat from "@/pages/select-seat/select-seat"
	import ticketDescription from "@/pages/ticket-description/ticket-description.vue"
	export default {
		data() {
			return {
				// 0是门票 1 是联票
				ticketsIndex:0,
				isShow: false,
				headerTitle:{
					backgroundColor:'#13BE6F',
					color:'#FFFFFF',
					title:'确认门票',
					right:'购票须知'
				},
				data:new Date(),
				// 显示时间选择
				isShowDate:false,
				// 显示选择人
				isShowIicketHolder:false,
				// 显示座位选择
				isShowselectSeat: false,
				// 是否有选择的人
				isselectpeople:false,
				// 购票须知
				isShowDescription:false,
				addressInfo:[],
				paysPeople:[
					// {
					// 	id:1,
					// 	username:'叶清杨',
					// 	type:'成人票',
					// 	identity:"562458744155652325",
					// 	zuo:'D1'
					// },
					// {
					// 	id:2,
					// 	username:'叶清杨',
					// 	type:'儿童票',
					// 	identity:"562458744155652325",
					// 	zuo:'D2'
					// }
				],
				handler: [
					{
						title:"门票",
						isTrue: true
					},
					{
						title:"联票",
						isTrue: false
					}
				],
				ticketsData: [],
				ids: '',
				service_agreement_text: '',
				seatcontent: '',
				seatDatalist:[]
			};
		},
		components: {
			uniNavBar,
			comTickets,
			comPaysPeople,
			comReminder,
			selectDate,
			selectTicketHolder,
			selectSeat,
			ticketDescription,
			uniPopup
		},
		computed:{
			
			today () {
				return this.getFormatDate(new Date().getTime(),'yyyy-mm-dd')
			},
			
			slecteData () {
				return [
					{
						timer:new Date(this.data).getTime()-24*60*60,
						yearmd:this.getFormatDate(new Date(this.data).getTime()-24*60*60*1000,'yyyy-mm-dd'),
						monthd:this.getFormatDate(new Date(this.data).getTime()-24*60*60*1000, 'mm-dd'),
						week:this.getFormatDate(new Date(this.data).getTime()-24*60*60*1000, 'week'),
						isDisabled:new Date(this.data).getTime()-24*60*60*1000<= new Date(new Date().toLocaleDateString()).getTime() ? false : true
					},
					{
						timer:new Date(this.data).getTime(),
						yearmd:this.getFormatDate(new Date(this.data).getTime(),'yyyy-mm-dd'),
						monthd:this.getFormatDate(new Date(this.data).getTime(), 'mm-dd'),
						week:this.getFormatDate(new Date(this.data).getTime(), 'week'),
						isDisabled:new Date(this.data).getTime()<= new Date(new Date().toLocaleDateString()).getTime() ? false : true
					},
					{
						timer:new Date(this.data).getTime()+24*60*60*1000,
						yearmd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000,'yyyy-mm-dd'),
						monthd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000, 'mm-dd'),
						week:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000, 'week'),
						isDisabled:new Date(this.data).getTime()+24*60*60*1000<= new Date(new Date().toLocaleDateString()).getTime() ? false : true
					},
					{
						timer:new Date(this.data).getTime()+24*60*60*1000*2,
						yearmd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*2,'yyyy-mm-dd'),
						monthd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*2, 'mm-dd'),
						week:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*2, 'week'),
						isDisabled:new Date(this.data).getTime()+2*24*60*60*1000<= new Date(new Date().toLocaleDateString()).getTime() ? false : true
					},
					{
						timer:new Date(this.data).getTime()-24*60*60*1000*3,
						yearmd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*3,'yyyy-mm-dd'),
						monthd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*3, 'mm-dd'),
						week:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*3, 'week'),
						isDisabled:new Date(this.data).getTime()+3*24*60*60*1000<= new Date(new Date().toLocaleDateString()).getTime() ? false : true
					},
					{
						timer:new Date(this.data).getTime()-24*60*60*1000*4,
						yearmd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*4,'yyyy-mm-dd'),
						monthd:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*4, 'mm-dd'),
						week:this.getFormatDate(new Date(this.data).getTime()+24*60*60*1000*4, 'week'),
						isDisabled:new Date(this.data).getTime()+4*24*60*60*1000<= new Date(new Date().toLocaleDateString()).getTime() ? false : true
					}
				]
			}
		},
		onLoad (opction)  {
			console.log(opction.id)
			this.ids = opction.id
			console.log(new Date(this.data).getTime())
			this.getticketdetail()
		},
		methods: {
			getticketdetail(){
				this.$api.ticketdetails({id:this.ids}).then(res => {
				   // 获得门票详情数据 
				  if(res.code === 200){
					  console.log(res.data[0].id)
					  this.ticketsData = res.data;
					  this.service_agreement_text = res.data[0].service_agreement_text;
					  this.seatcontent  =  res.data[0].content;
				  }
				  else{
					uni.showToast({
						icon: "none",
					    title: res.msg,
					    duration: 2000
					});  
				  }
				}).catch(res => {
					uni.showToast({
						icon: "none",
					    title: "请求服务器失败",
					    duration: 2000
					}); 
				　　// 失败进行的操作
				})
			},
			// 服务条例 打开
			openUserText(){
				this.$refs.popup.open()
			},
			// 服务条例 关闭
			clonesPopup(){
				this.$refs.popup.close()
			},
			// 门票联票切换
			comticketsClick(index) {
				this.ticketsIndex = index
			},
			shoucangHandler() {
					this.isShow = !this.isShow
			},
			clickRight(){
				this.isShowDescription = true
				// this.headerTitle={
				// 	backgroundColor:'rgba(19, 190, 111, 0.05)',
				// 	color:'#FFFFFF',
				// 	title:'购票须知',
				// 	right:''
				// }
			},
			headerTitleHandler(){
				this.headerTitle={
					backgroundColor:'#13BE6F',
					color:'#FFFFFF',
					title:'确认门票',
					right:'购票须知'
				}
			},
			// 选择日期
			dateBtn(){
				// this.headerTitle = {
				// 	backgroundColor:'#FFFFFF',
				// 	color:'',
				// 	title:'选择日期',
				// 	right:''
				// }
				this.isShowDate = true
			},
			// 选择日期回掉
			selectDateHandler(date){
				if(date){
					this.headerTitleHandler()
					this.data = date
					this.$api.ticketdata({id:this.ids,time:date}).then(res => {
					  if(res.code === 200){
						  console.log(res)
							this.ticketsData = res.data;
							this.service_agreement_text = res.data[0].service_agreement_text;
							this.seatcontent  =  res.data[0].content;
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "请求服务器失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
				}
				this.isShowDate = false
			},
			getFormatDate(date, dateType) {
			    let dateObj = new Date(date);
			    let month = dateObj.getMonth() + 1;
			    let strDate = dateObj.getDate();
			    let hours = dateObj.getHours();
			    let minutes = dateObj.getMinutes();
			    let seconds = dateObj.getSeconds();
				let week = dateObj.getDay()
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			
			    }
			    if (hours >= 0 && hours <= 9) {
			        hours = "0" + hours
			    }
			    if (minutes >= 0 && minutes <= 9) {
			        minutes = "0" + minutes
			    }
			    if (seconds >= 0 && seconds <= 9) {
			        seconds = "0" + seconds
			    }
			
			    let dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日';
			    if (dateType == "yyyy-mm-dd") {
			        dateText = dateObj.getFullYear() + '-' + month + '-' + strDate;
			    }
				let weekArray = ['周日','周一','周二','周三','周四','周五','周六']
				if (dateType == "week") {
				    dateText = weekArray[week];
				}
				if (dateType == "mm-dd") {
				    dateText =  month + '-' + strDate;
				}
				
			    if (dateType == "yyyy.mm.dd") {
			        dateText = dateObj.getFullYear() + '.' + month + '.' + strDate;
			    }
			    if (dateType == "yyyy-mm-dd MM:mm:ss") {
			        dateText = dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
			    }
			    if (dateType == "mm-dd MM:mm:ss") {
			        dateText = month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
			    }
			    if (dateType == "yyyy年mm月dd日 MM:mm:ss") {
			        dateText = dateObj.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hours + ":" + minutes + ":" + seconds;
			    }
			    return dateText;
			 },
			// 返回事件
			clickLeft () {
				if(this.isShowDate == true){
					this.isShowDate = false
					this.headerTitleHandler()
					return
				}
				if(this.isShowIicketHolder == true){
					this.headerTitleHandler()
					this.isShowIicketHolder = false
					return
				}
				if(this.isShowselectSeat == true){
					this.headerTitleHandler()
					this.isShowselectSeat = false
					return false
				}
				if(this.isShowDescription == true){
					this.headerTitleHandler()
					this.isShowDescription = false
					return false
				}
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			},
			// 购票须知关闭回掉
			descriptionClose(){
				this.headerTitleHandler()
				this.isShowDescription = false
			},
			// 购票须知返回回掉
			descriptionClick(){
				this.headerTitleHandler()
				this.isShowDescription = false
			},
			changeTitle(index){
				if(index==0){
					this.headerTitle={
						backgroundColor:'rgba(19, 190, 111, 0.05)',
						color:'#FFFFFF',
						title:'购票须知',
						right:''
					}
				}else{
					this.headerTitle={
						backgroundColor:'rgba(19, 190, 111, 0.05)',
						color:'#FFFFFF',
						title:'退票说明',
						right:''
					}
				}
			},
			// 选择持票人
			selectpeopleHandler () {
				// this.headerTitle = {
				// 	backgroundColor:'#FFFFFF',
				// 	color:'',
				// 	title:'选择持票人',
				// 	right:''
				// }
				this.isShowIicketHolder = true
				//获取常用联系人列表
					this.$api.addressinfo().then(res => {
					  if(res.code === 200){
						  console.log(res.data)
						  this.addressInfo = res.data;
						  
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "请求服务器失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
			},
			// 选择持票人回掉
			selectpeopleClick(data) {
				this.isShowIicketHolder = false
				if(data){
					//选择持票人
					this.$api.addresscontact({ids:data}).then(res => {
					  if(res.code === 200){
							console.log(res)
							this.paysPeople = res.data;
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "请求服务器失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
				}
			},
			orderSubmitHandler () {
				uni.navigateTo({
					url:'/pages/pays-tickets-page/pays-tickets-page'
				})
			},
			
			// 选择座位
			selectTicketHandler(index){
				//获取车辆列表
					this.$api.carslist({id:index}).then(res => {
					  if(res.code === 200){
							console.log(res.data)
							this.seatDatalist = res.data;
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "请求服务器失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
				this.isShowselectSeat = true
			},
			// 选择座位回掉
			selectSeatClick() {
				this.isShowselectSeat = false
			},
			// 本页面切换日期
			checkDateHandler(item){
				console.log(item)
				if(item.isDisabled){
					//调用选择门票日期查询接口
					this.$api.ticketdata({id:this.ids,time:item.yearmd}).then(res => {
					  if(res.code === 200){
						  this.data = item.yearmd
							console.log(res);
							this.ticketsData = res.data;
							this.service_agreement_text = res.data[0].service_agreement_text;
							this.seatcontent  =  res.data[0].content;
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});  
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "请求服务器失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})
					
				}
			},
			// 删除联系人
			deleteHandler(index){
				this.paysPeople.splice(index,1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-date-wrapper{
		width: 100%;
		height: 92rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.com-date-item{
			font-size:22rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
		.com-date-item.active{
			width: 92rpx;
			height: 92rpx;
			background:rgba(255,255,255,0.2);
			border:1px solid rgba(255,255,255,1);
			border-radius:12px;
		}
		.com-date-item.disabled{
			color:rgba(255,255,255,0.6);
		}
		.com-date-btn{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
	.select-date-wrapper{
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		background-color: #fff;
		z-index: 9999;
	}
	.pb112{
		padding-bottom: 112rpx;
	}
	.place-order-data{
		width: 100%;
		height: 150rpx;
		box-sizing: border-box;
		padding: 14rpx 0 44rpx;
	}
	.pays-orider-tickets{
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.pays-orider-selectpeople{
		box-sizing: border-box;
		padding: 30rpx 40rpx;
		.orider-selectpeople{
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 110rpx;
			background-color: #fff;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			border-radius:20rpx;
			color:rgba(19,190,111,1);
			image{
				width: 30rpx;
				height: 30rpx;
				margin-right: 15rpx;
			}
		}
	}
	.pays-orider-reminder{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.pays-orider-server{
		width: 100%;
		padding: 30rpx 0 87rpx;
		text-align: center;
		color: #999999;
		font-size: 24rpx;
		line-height: 24rpx;
		text{
			color: #13BE6F;
			font-size: 24rpx;
		}
	}
	.pays-orider-footer{
		position: fixed;
		background-color: #fff;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 112rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 40rpx 0 60rpx;
		justify-content: space-between;
		align-items: center;
		.image{
			width:40rpx;
			height:40rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.submit{
			width:570rpx;
			height: 80rpx;
			line-height: 80rpx;
			background:rgba(19,190,111,1);
			border-radius:40px;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			text-align: center;
		}
	}
	.popupWarp{
		width:620rpx;
		box-sizing: border-box;
		height:900rpx;
		background:rgba(255,255,255,1);
		border-radius:14rpx;
		position: relative;
		.poputtitle{ 
			height:36rpx;
			font-size:38rpx; 
			font-weight:bold;
			color:#333333;
			line-height:46rpx; 
			padding: 39rpx 0 43rpx 0;
			text-align: center;
		}
		scroll-view{
			height: 741rpx;
			.userSetTitle_con{
				font-size:26rpx;  
				color:#666666;
				line-height:36rpx; 
				padding: 0 47rpx 18rpx 47rpx;
				box-sizing: border-box;
			}
			.userSetTitle{
				font-size:30rpx; 
				font-weight:bold;
				color:#333333;
				line-height:36rpx;
				padding-top: 30rpx;
			}
		}
		.clonesWarp{
			position: absolute;
			right: 30rpx;
			top: 26rpx;
			image{
				width: 34rpx;
				height: 34rpx;
			}
		}
	}
</style>
