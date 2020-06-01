<template>
	<view :class="titlIndex === 1 ? 'page-gray' : ''">
		<uni-nav-bar left-icon="" left-text="" fixed :right-text="allAdminCheckState?'完成':'管理'" title="titleData" :titleData="titleData" :titlIndex="titlIndex" @titleHandler="titleHandler" @clickLeft="clickLeft" @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<!-- 视频组件 -->
		<div style="padding: 8rpx 40rpx 0;" class="boxs" v-if="titlIndex === 0">
			<com-video :videoData="videoData" :checkState="allAdminCheckState"></com-video>
		</div>
		<!-- 门票组件 -->
		<view style="padding: 30rpx 40rpx 0;" class="boxs" v-if="titlIndex === 1">
			<com-tickets :ticketsData="ticketsData" :checkState="allAdminCheckState"></com-tickets>
		</view>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
		<view class="footer" v-if="allAdminCheckState">	
			<view class="footer_si" @click="checkAllClick">
				<inputCheck :clickstate="allSetCheck"/>全选
			</view>
			<view class="footer_color" @click="dellist()">
				取消收藏
			</view>
		</view>
		<comdelete :title='title' :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comVideo from "@/components/com-video/com-video.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import inputCheck from "@/components/input-check/input-check.vue"
	import comdelete from "@/components/com-delete/com-delete.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var _self,
	page = 1,
	size = 10;
	export default {
		data() {
			return {
				title:'您确定要取消收藏吗？',
				payDialogVisible: false,
				allAdminCheckState:false,
				allSetCheck:false,
				titlIndex: 0,
				loadingText: '加载中...',
				       loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				       contentText: {
				           contentdown:'上拉显示更多',
				           contentrefresh: '正在加载...',
				           contentnomore: '没有更多数据了'
				       },
				titleData:[
					{
						title: '视频',
						isChecked: true
					},
					{
						title: '门票',
						isChecked: false
					}
				],
				type:1,
				videoData:[],
				ticketsData:[]
			};
		},
		components: {
			uniNavBar,
			comVideo,
			comTickets,
			inputCheck,
			comdelete,
			uniLoadMore
		},
		onLoad () {
			page = 1;
			this.searchHandler()
		},
		// 下拉刷新
		onPullDownRefresh() {
			page = 1;
			this.searchHandler()
			
		},
		onReachBottom: function() {
			//上拉加载
			this.searchHandler()
		},
		methods: {
			getcollectlist(type){
				this.$api.collectlist({type:type,page:page,size:size}).then(res => {
				   // 获得历史下得视频数据 
				  if(res.code === 200){	
					  console.log(res)
					if(res.data.length<size){
						 this.loadingType = 2;
						 if(this.type===1){
							this.videoData = res.data;
							//this.title= res.data[0].title;
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新 
						 }else{
							 this.ticketsData = res.data;
							// this.title= res.data[0].title;
							 uni.hideNavigationBarLoading();
							 uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						 }
										
					}else{
						if(this.type===1){
							this.loadingType = 0;
							this.videoData = res.data;
							//this.title= res.data[0].title;
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 page++;
						}else{
							this.loadingType = 0;
							this.ticketsData = res.data;
							//this.title= res.data[0].title;
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 page++;
						}
					}		
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
			dellist(){
				this.payDialogVisible = true
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
				this.payDialogVisible = false
			},
			//	全选
			checkAllClick(){
				this.allSetCheck=!this.allSetCheck;
				if(this.allSetCheck){ 
					this.setListArrFn(this.titlIndex,true) 
				}else{
					this.setListArrFn(this.titlIndex,false)
				}  
			},
			setListArrFn(index,state){
				(index===0?this.videoData:this.ticketsData).map((item,indexs)=>{
					(index===0?this.videoData:this.ticketsData)[indexs].state=state
				})
			},
			//管理
			clickRight(){
				this.allAdminCheckState=!this.allAdminCheckState;
				
			},
			// 返回事件
			clickLeft () {
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			},
			// 接受title索引
			titleHandler (index) {
				if(index == this.titlIndex) return false
				else this.titlIndex = index
				this.allAdminCheckState=false
				this.searchHandler()
			},
			// 获取数据
			searchHandler () {
				if(this.titlIndex === 0) {
					this.type = 1;
					this.getcollectlist(this.type)
				}else {
					this.type = 2;
					//console.log(this.type)
					this.getcollectlist(this.type)
				}
			},
		} 
	}
</script>

<style lang="scss">
	.footer{
		width: 100%;
		height:112rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 30rpx 0rpx rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		left: 0;
		height: 112rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 40rpx 0 60rpx;
		justify-content: space-between;
		align-items: center;
		.footer_color{
			width:200rpx;
			height:80rpx;
			border:1px solid rgba(238,238,238,1);
			border-radius:40rpx;
			line-height: 80rpx;
			text-align: center;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
		}
		.footer_si{
			font-size:28rpx;
			display: flex;
			width: 120rpx;
			justify-content: space-between;
			align-items: center;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
	}
</style>
