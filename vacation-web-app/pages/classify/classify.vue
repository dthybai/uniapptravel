<template>
	<view class="box">
		<!-- <view class="status_bar">
		</view> -->
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="home-body-wrapper">
			<view class="body-item" v-for="(item, index) of data" :key="index">
				<view class="body-item-top">
					<view class="body-item-title">
						<view class="body-title">
							{{item.title}}
						</view>
						<view class="body-introduce">
							{{item.desc}}
						</view>
					</view>
					<view class="body-item-look" @click="lookHandler()">
						查看门票
					</view>
				</view>
				<com-video :videoData="item.videos"></com-video>
			</view>
		</view>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
</template>

<script>
	import comVideo from "@/components/com-video/com-video.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	var _self,
	page = 1,
	size = 10;
	export default {
		data() {
			return {
				data:{
				},
				title:'',
				loadingText: '加载中...',
				       loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				       contentText: {
				           contentdown:'上拉显示更多',
				           contentrefresh: '正在加载...',
				           contentnomore: '没有更多数据了'
				       },
					   parms:''
			};
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			page = 1;
			this.parms = option.id; 
			this.getvideolist();
		},
		components: {
			comVideo,
			uniLoadMore
		},
			// 下拉刷新
			onPullDownRefresh() {
				page = 1;
				this.getvideolist();
				
			},
			onReachBottom: function() {
				//上拉加载
				this.getvideolist();
			},
		methods: {
			getvideolist(){
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				if(this.parms){
					this.$api.videoslist({id:this.parms,page:page,size:size}).then(res => {
					   // 获得分类下得视频数据 
					  if(res.code === 200){	
						  console.log(res)
						 
						if(res.data.length<size){
							
							 this.loadingType = 2;
												 this.data = res.data;
												 this.title= res.data[0].title;
												 uni.hideNavigationBarLoading();
												 uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}else{
												  this.loadingType = 0;
												  this.data = res.data;
												  this.title= res.data[0].title;
												  uni.hideNavigationBarLoading();
												  uni.stopPullDownRefresh();//得到数据后停止下拉刷新
												   page++;
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
				}
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
			// 查看门票
			lookHandler () {
				uni.navigateTo({
					url: '/pages/tickets-page/tickets-page'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
	}
.home-body-wrapper{
		width: 100%;
		box-sizing: border-box;
		padding: 16rpx 40rpx 50rpx;
		.body-item{
			padding: 56rpx 0 0;
		}
		.body-item-top{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.body-title{
				color: #333333;
				font-weight: bold;
				font-size: 38rpx;
				line-height: 38rpx;
				padding-bottom: 19rpx;
			}
			.body-introduce{
				color: #999999;
				font-size: 22rpx;
			}
			.body-item-look{
				width:160rpx;
				height:64rpx;
				line-height: 64rpx;
				text-align: center;
				border:1rpx solid rgba(229,229,229,1);
				border-radius:32rpx;
				font-size:26rpx;
				font-weight:500;
				color:rgba(153,153,153,1)
			}
		}
		
	}
</style>
