<template>
	<view class="page-gray" style="padding-bottom: 132rpx;">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" backgroundColor="#13BE6F" :border="false" color="#FFFFFF" title="确认购买" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="pays-body-video">
			<view class="video-checked">
				<view class="title">
					选择视频
				</view>
				<view class="video-checked-form">
					<com-video-checked :videoData="videoData"></com-video-checked>
				</view>
				
			</view>
		</view>
		<view class="pays-body-type">
			<view  class="video-checked-pays">
				<com-pays-checked :paysData="paysData"></com-pays-checked>
				<view class="video-checked-money">
					<view class="total-title">总计金额</view>
					<view class="total-count">¥90</view>
				</view>
			</view>
		</view>
		<com-pays-btn></com-pays-btn>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comVideoChecked from "@/components/com-video-checked/com-video-checked.vue"
	import comPaysChecked from "@/components/com-pays-checked/com-pays-checked.vue"
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	export default {
		data() {
			return {
				videoData: [
					{
						isChecked: true,
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '青春如同一场旅游',
						money: '89.99',
						count: '666'
					},
					{
						isChecked: true,
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '青春如同一场旅游',
						money: '89.99',
						count: '666'
					},
					{
						isChecked: true,
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '青春如同一场旅游',
						money: '89.99',
						count: '666'
					}
				],
				paysData: [
					{
						title:'微信',
						url: '/static/img/weixin.png',
						isChecked: true,
						state:true
					},
					{
						title:'支付宝',
						url: '/static/img/zhifubao.png',
						isChecked: true,
						state:false
					},
					{
						title:'文化币',
						url: '/static/img/wenhuab.png',
						isChecked: true,
						state:false
					}
				]
			};
		},
		components: {
			uniNavBar,
			comVideoChecked,
			comPaysChecked,
			comPaysBtn
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
		}
	}
</script>

<style lang="scss" scoped>
	.pays-body-video{
		width: 100%;
		min-height: 600rpx;
		box-sizing: border-box;
		padding: 40rpx 40rpx 0;
		background:linear-gradient(180deg,rgba(19,190,111,1) 0%,rgba(19,190,111,0) 600rpx);
		.video-checked{
			width: 100%;
			background:rgba(255,255,255,1);
			border-radius:20px;
			.title{
				text-align: center;
				line-height:32rpx;
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
				padding-top: 40rpx;
				padding-bottom: 90rpx;
			}
		}
		
	}
	.pays-body-type{
		width: 100%;
		margin-top: 30rpx;
		box-sizing: border-box;
		padding: 0 40rpx;
		.video-checked-pays{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 30rpx 0;
			background:rgba(255,255,255,1);
			border-radius:20px;
			.video-checked-money{
				border-top:1px solid rgba(238,238,238,1);
				height: 166rpx;
				line-height: 166rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.total-title{
					color: #333333;
					font-size: 28rpx;
					font-family:PingFang SC;
					font-weight:500;
				}
				.total-count{
					font-size:30rpx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(229,106,77,1);
				}
			}
		}
	}
	
</style>
