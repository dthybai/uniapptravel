<template>
	<view class="box">
		<view class="header">
			<view class="header_l">
					<view class="header_size">{{pagetext.unpaid}}</view>
					<view class="header_min">{{pagetext.data}}</view>
			</view>
			<view class="header_r">
				<view class="header_bo">
					<image src="../../static/img/daifukuan.png" mode="" v-if="pagetext.unpaid === '待付款'"></image>
					<image src="../../static/img/daishiyong.png" mode="" v-if="pagetext.unpaid === '待使用'"></image>
					<image src="../../static/img/yiwancheng.png" mode="" v-if="pagetext.unpaid === '已完成'"></image>
					<image src="../../static/img/quxiao.png" mode="" v-if="pagetext.unpaid === '已取消'"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['pagetext'],
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.box{
	width: 100%;
	.header{
		width: 100%;
		height: 157rpx;
		display: flex;
		padding: 0 20rpx;
		box-sizing: border-box;
		justify-content: space-between; // 两边平分
		align-items: center;
		.header_l{
			font-size:38rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color: #FFFFFF;
			.header_min{
				font-size:28rpx;
				line-height: 42rpx;
			}
		}
		.header_r .header_bo{
			width: 68rpx;
			height: 68rpx;
			border-radius:10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
