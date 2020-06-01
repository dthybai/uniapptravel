<template>
	<view class="box">
		<view class="center_box" v-for="(subItem, subIndex) of videolist" :key="subIndex">
			<view class="header">
				<view class="header_o">
					<image src="/static/img/order/video.png" mode=""></image>
					<text>视频</text>
				</view>
				<view class="header_t">
					<text @click='btndata(subItem.videoUrl)'>{{subItem.videoUrl}}</text>
				</view>
			</view>
			<view class="body-item-bottom" style="padding-left: 20rpx">
				<view class="image-wrapper" @click="videoHandler()">
					<image :src="subItem.url" class="img-url"></image>
					<image src="/static/img/icon/play.png" class="paly"></image>
				</view>
				<view class="item-bottom-wrapper">
					<view class="title">{{subItem.bottomTitle}}</view>
					<view class="introduce">{{subItem.bottomIntroduce}}</view>
					<view class="introduce">{{subItem.all}}</view>
				</view>
			</view>
			<view class="footer" v-if='subItem.videoUrl!="已完成"&&subItem.videoUrl!="已取消"'>
				<view class="zhifu">
					<text>立即支付</text>
				</view>
				<view class="quxiao">
					<text>取消订单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			videodai: {
				default:'待付款',
				type: String
			},
			videolist: {
				default: () => [],
				type: Array
			}
		},
		methods: {
			videoHandler () {
				uni.navigateTo({
					url: '/pages/video-details/video-details'
				})
			},
			btndata(type){
				uni.setStorageSync('storage_video', type);
				uni.navigateTo({
					url: '/pages/order-eravideo/order-eravideo'
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
.center_box{
	border-radius:20rpx;
	margin-top: 40rpx;
	// height: 460rpx;
	padding-bottom: 30rpx;
	background-color: #fff;
}
.header{
	padding: 0 20rpx;
	box-sizing: border-box;
	overflow: hidden;
	width: 100%;
	height: 116rpx;
	line-height: 116rpx;
	border-bottom: 1rpx solid #F2F2F2;
	.header_o{
		color: #333;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		float: left;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.header_t{
		color: #13BE6F;
		font-size: 26rpx;
		float: right;
	}
}
	.body-item-bottom{
		width: 100%;
		display: flex;
		padding-top: 32rpx;
		justify-content: left;
		.image-wrapper{
			width: 210rpx;
			height: 140rpx;
			border-radius: 10rpx;
			position: relative;
			image.img-url{
				width: 210rpx;
				height: 140rpx;
				border-radius: 10rpx;
			}
			image.paly{
				position: absolute;
				left: 16rpx;
				bottom: 16rpx;
				width: 44rpx;
				height: 44rpx;
			}
		}
		
		.item-bottom-wrapper{
			padding-left: 25rpx;
			width: 370rpx;
			.title{
				color: #333333;
				font-size: 28rpx;
				line-height: 44rpx;
			}
			.introduce{
				color: #999999;
				font-size: 24rpx;
				line-height: 24rpx;
				padding-top: 19rpx;
			}
			.details{
				vertical-align: bottom;
				padding-top: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				
				.money{
					vertical-align: bottom;
					color: #EC5E38;
					font-size: 30rpx;
					line-height: 30rpx;
					font-weight: bold;
				}
				.count{
					vertical-align: bottom;
					color: #999999;
					line-height: 30rpx;
					.text1{
						vertical-align: bottom;
						font-size: 20rpx;
						padding-right: 4rpx;
						line-height: 20rpx;
					}
					.text2{
						vertical-align: bottom;
						font-size: 28rpx;
						line-height: 21rpx;
					}
				}
			}
		}
	}
	.footer{
		padding: 0 20rpx;
		box-sizing: border-box;
		width: 100%;
		margin-top: 32rpx;
		overflow: hidden;
	}
	.quxiao{
		color: #666666;
		border: 1rpx solid #666666;
		margin-right: 30rpx;
	}
	.quxiao,.zhifu{
			font-size: 26rpx;
			width: 160rpx;
			height: 64rpx;
			line-height: 64rpx;
			border-radius:32rpx;
			text-align: center;
			float: right;
	}
	.zhifu{
		color: #13BE6F;
		border: 1rpx solid #13BE6F;
	}
</style>
