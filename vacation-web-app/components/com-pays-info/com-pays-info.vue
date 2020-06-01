<template>
	<view class="pays-info-body">
		<view class="title">
			{{title}}
		</view>
		<view class="pays-info-item" v-for="(item, index) of paysInfoData" :key="index">
			<view>
				<view class="username">
					{{item.username}}
					<text>{{item.typeName}}</text>
				</view>
				<view class="identity">{{item.identity}}</view>
			</view>
			<view class="money">
				¥{{item.money}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			title:	{
				type: String,
				default: '购买信息'
			},
			paysInfoData: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pays-info-body{
		width:100%;
		background:rgba(255,255,255,1);
		border-radius:20px;
		.title{
			line-height: 110rpx;
			text-indent: 30rpx;
			border-bottom:1rpx solid rgba(0,0,0,0.05);
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
	}
	.pays-info-item{
		width: 100%;
		box-sizing: border-box;
		padding: 40rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.username{
			color: #333333;
			font-size: 28rpx;
			font-family:PingFang SC;
			line-height: 28rpx;
			padding-bottom: 20rpx;
			text{
				display: inline-block;
				line-height:20rpx;
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,187,2,1);
				background:rgba(255,187,2,0.1);
				padding: 5rpx;
				margin-left: 7rpx;
			}
		}
		.identity{
			font-size:24rpx;
			line-height: 24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		.money{
			color: #E56A4D;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
		}
	}
</style>
