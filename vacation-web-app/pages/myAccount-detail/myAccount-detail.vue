<template>
	<view class="my-account-detail">
		<uni-nav-bar left-icon="" left-text="" fixed  :border="false"  title="明细" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view v-for="(item, index ) of pageData" :key="index">
			<view class="header-title">{{item.create_at}}</view>
			<view v-for="(subItem, subindex) of item.content" :key="index + subindex" class="body-wrapper">
				<view class="body-left">
					<view class="title">{{subItem.title}}</view>
					<view class="timer">{{subItem.create_at}}</view>
				</view>
				<view class="body-right" v-if="subItem.type===1">
					-{{subItem.money}}
				</view>
				<view class="body-right" v-if="subItem.type===2">
					+{{subItem.money}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				pageData:[
				]
			};
		},
		components: {
			uniNavBar
		},
		onLoad() {
			alert(1)
			this.getaccountlist();
		},
		methods: {
			//获取文化币明细
			getaccountlist (){
				this.$api.accountlist().then(res => {
				  if(res.code === 200){	
					  console.log(res)
						  this.pageData = res.data;
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
		}
	}
</script>

<style lang="scss" scoped>
	.my-account-detail{
		width: 100%;
		    overflow: hidden;
		.header-title{
			width:750rpx;
			height:88rpx;
			background:rgba(248,248,248,1);
			padding-left: 40rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(187,187,187,1);
			line-height:80rpx;
		}
		.body-wrapper{
			width: 670rpx;
			margin: 0 auto;
			height: 159rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid rgba(0,0,0,0.05);
			.title{
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:38rpx;
				padding-bottom: 8rpx;
			}
			.timer{
				font-size:24rpx;
				padding-top: 8rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(187,187,187,1);
				line-height:38rpx;
			}
			.body-right{
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(19,190,111,1);
				line-height:38rpx;
			}
		}
	}
</style>
