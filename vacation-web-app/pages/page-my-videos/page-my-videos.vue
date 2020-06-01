<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="header">
			<myVideo :tabTitle='tabTitle' @tabindex='tabindex'></myVideo>
		</view>
		<view class="center_o" v-if="isShow === 0">
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
			<view class="cent_boundary">
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				<view class="boundary_r"><text>视频推荐</text></view>
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
			</view>
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
		</view>
		<view class="center_o" v-if="isShow === 1">
			<itemline :videolist='videolist'></itemline>
			<view class="cent_boundary">
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				<view class="boundary_r"><text>视频推荐</text></view>
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
			</view>
			<itemline :videolist='videolist' @videoHandler='videoHandler'></itemline>
		</view>
	</view>
</template>

<script>
	import myVideo from "@/components/com-my-videos/com-my-videos.vue"
	import itemline from "@/components/com-video-itemline/com-video-itemline.vue"
	export default {
		data() {
			return {
				title: '我的视频',
				tabTitle: ['生效中','已过期'],
				isShow: 0,
				videolist:[
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '视频期限三天',
						all: '￥89.99',
						valid: '有效期至2020-03-20',
						play:'播放量666'
					},
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '视频期限三天',
						all: '￥89.99',
						valid: '有效期至2020-03-20',
						play:'播放量666'
					}
				]
			};
		},
		components: {
			myVideo,
			itemline
		},
		methods:{
			videoHandler () {
				uni.navigateTo({
					url: '/pages/video-details/video-details'
				})
			},
			tabindex(type){
				this.isShow = type
				if(this.isShow === 1){
					this.videolist=[
						{
							videoUrl: '',
							url: '/static/img/delete/video1.png',
							bottomTitle: '故宫一日游最强攻略',
							bottomIntroduce: '视频期限三天',
							all: '￥89.99',
							valid: '已过期，去续期>>',
							play:'播放量666'
						},
						{
							videoUrl: '',
							url: '/static/img/delete/video1.png',
							bottomTitle: '故宫一日游最强攻略',
							bottomIntroduce: '视频期限三天',
							all: '￥89.99',
							valid: '已过期，去续期>>',
							play:'播放量666'
						}
					]
				}else{
					this.videolist=[
						{
							videoUrl: '',
							url: '/static/img/delete/video1.png',
							bottomTitle: '故宫一日游最强攻略',
							bottomIntroduce: '视频期限三天',
							all: '￥89.99',
							valid: '有效期至2020-03-20',
							play:'播放量666'
						},
						{
							videoUrl: '',
							url: '/static/img/delete/video1.png',
							bottomTitle: '故宫一日游最强攻略',
							bottomIntroduce: '视频期限三天',
							all: '￥89.99',
							valid: '有效期至2020-03-20',
							play:'播放量666'
						}
					]
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
		}
	}
</script>

<style lang="scss" scoped>
	.center_o{
		box-sizing: border-box;
		padding: 0 40rpx;
	}
	.cent_boundary{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 65rpx;
		.boundary_l{
			width: 26rpx;
			height: 19rpx;
			display: flex;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.boundary_r{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		text{
			padding: 0 20rpx;
		};
	}
</style>
