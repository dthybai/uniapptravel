<template>
	<view class="page-gray">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" backgroundColor="#13BE6F" :border="false" color="#FFFFFF" title="北京门票" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="tickets-page linear-gradient-color">
			<com-tickets :ticketsData="ticketsData"></com-tickets>
		</view>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	// 定义全局参数,控制数据加载
			var _self,
			page = 1,
			size = 10;	
	export default {
		data() {
			return {
				ticketsData: [],
				 loadingText: '加载中...',
				        loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				        contentText: {
				            contentdown:'上拉显示更多',
				            contentrefresh: '正在加载...',
				            contentnomore: '没有更多数据了'
				        }
			};
		},
		components: {
			uniNavBar,
			comTickets,
			uniLoadMore
		},
		//页面加载请求门票列表
		    onLoad: function() {
				page = 1;
			//页面一加载时请求一次数据
			_self = this;
		    this.getticketlist();
		    },
			// 下拉刷新
			onPullDownRefresh() {
				page = 1;
				this.getticketlist();
				
			},
			onReachBottom: function() {
				//上拉加载
				this.getticketlist();
			},
		methods: {
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
			getticketlist(){ 
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$api.goodslist({page:page,size:size}).then(res => {
				   // 获得门票列表数据 
				  if(res.code === 200){
					  console.log(res)
					  if(res.data.length<size){
					  	 this.loadingType = 2;
						 _self.ticketsData = res.data;
						 uni.hideNavigationBarLoading();
						 uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					  }else{
						  this.loadingType = 0;
						  _self.ticketsData = res.data;
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
		}
	}
</script>

<style lang="scss" scoped>
	.tickets-page{
		box-sizing: border-box;
		padding: 30rpx 40rpx 30rpx;
	}
	
</style>
