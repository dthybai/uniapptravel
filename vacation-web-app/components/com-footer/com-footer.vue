<template>
	<view class="com-footer">
		<view class="image">
			<image :src="isShow ? '../../static/img/icon/shoucang.png':'../../static/img/home-xing.png'" @click="choucangHandler()"></image>
		</view>
		<view class="look" @click="lookHandler">
			查看门票
		</view>
		<view class="buy" @click="paysHandler()">
			购买本视频
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: true
			};
		},
		methods: {
			paysHandler() {
				uni.navigateTo({
					url: '/pages/pays-video-page/pays-video-page'
				})
			},
			lookHandler(){
				uni.navigateTo({
					url: '/pages/tickets-page/tickets-page'
				})
			},
			choucangHandler() {
				this.isShow = !this.isShow
			}
		}
	}
</script>

<style lang="scss" scoped>
.com-footer{
	width: 100%;
	background-color: #fff;
	height: 112rpx;
	line-height: 112rpx;
	box-sizing: border-box;
	padding: 0 40rpx 0 60rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	left: 0;
	bottom: 0;
	.image{
		width:40rpx;
		height:40rpx;
		display: block;
		margin-right: 50rpx;
	}
	image{
		width:40rpx;
		height:40rpx;
		display: block;
	}
	.look{
		width:270rpx;
		height:80rpx;
		background:rgba(19,190,111,0.1);
		border-radius:40rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(19,190,111,1);
		text-align: center;
		line-height: 80rpx;
	}
	.buy{
		width:270rpx;
		height:80rpx;
		background:rgba(19,190,111,1);
		border-radius:40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
}
</style>
