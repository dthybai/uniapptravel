<template>
	<view class="successful-order">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" title="订单成功" :border="false" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="successful-body">
			<image src="../../static/img/icon/success.png" mode=""></image>
			<view class="success-info">
				恭喜您，下单成功
			</view>
			<view class="order-btn" @click="orderBtnHandler()">
				查看订单
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				
			};
		},
		components: {
			uniNavBar
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
			// 跳转订单
			orderBtnHandler() {
				uni.setStorageSync('storage_key', '已完成');
				uni.navigateTo({
					url: '/pages/order-eratickets/order-eratickets'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.successful-order{
		
	}
	.successful-body{
		width: 520rpx;
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 50%;
		margin-left: -260rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			display: block;
			width: 150rpx;
			height: 150rpx;
		}
		.success-info{
			font-size:28rpx;
			line-height: 28rpx;
			padding-top: 40rpx;
			padding-bottom: 110rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.order-btn{
			width: 100%;
			height:88rpx;
			text-align: center;
			line-height: 88rpx;
			background:rgba(19,190,111,1);
			border-radius:44px;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
</style>
