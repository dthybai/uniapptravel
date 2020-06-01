<template>
	<view class="com-video-comment">
		<view class="video-comment-top">
			<view class="total">
				共108条评论
			</view>
			<view class="comment" @click="commentTextFn">
				<image src="/static/img/home/pinglun.png" mode=""></image>评论
			</view>
		</view>
		
		<view class="video-comment-body">
			<view class="comment-body-wrapper" v-for="(item, index) of commentData" :key="index">
				<view class="body-wrapper-top">
					<view class="wrapper-top-left">
						<image src="../../static/img/icon/navurl2.png"></image>
						<view>
							<view class="username">{{item.username}}</view>
							<view class="timer">{{item.timer}}</view>
						</view>
					</view>
					<view class="wrapper-top-right">
						<view class="count" @click="conticonFn(item,index,1)">
							<image src="/static/img/icon/zan.png" mode="" v-show="!item.state"></image>
							<image src="/static/img/icon/zanhou.png" mode="" v-show="item.state"></image>
							{{item.dian1}}
						</view>
						<view class="count coumar" @click="conticonFn(item,index,2)"> 
							<image src="/static/img/icon/cai.png" mode="" v-show="!item.state_cai"></image>
							<image src="/static/img/icon/caihou.png" mode="" v-show="item.state_cai"></image>
							{{item.dian2}}
						</view>
					</view>
				</view>
				<view class="body-wrapper-bottom">
					{{item.comment}}
				</view>
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
			commentData: {
				type: Array,
				default: () => []
			}
		},
		methods:{
			//获取视频评论列表
			conticonFn(item,index,need){
				this.$emit("iconClick",{item:item,index:index,type:need})
			},
			commentTextFn(){
				this.$emit("commentclick",{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.com-video-comment{
		width: 100%;
		box-sizing: border-box;
		padding: 0 40rpx;
		.video-comment-top{
			line-height: 64rpx;
			padding: 60rpx 0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.total{
				font-size:32rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}
			.comment{
				width:174rpx;
				height:64rpx;
				line-height: 64rpx;
				border:1rpx solid rgba(238,238,238,1);
				border-radius:32rpx;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 26rpx;
					height: 26rpx;
					margin-right: 12rpx;
				}
			}
		}
		.video-comment-body{
			width: 100%;
			.body-wrapper-top{
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				.wrapper-top-left{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					image{
						display: block;
						width: 68rpx;
						height: 68rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.username{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
						line-height:24rpx;
					}
					.timer{
						font-size:24rpx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(153,153,153,1);
						line-height:24rpx;
						padding-top: 13rpx;
					}
				}
				
				.wrapper-top-right{
					display: flex;
					justify-content: space-around;
					width: 200rpx;
					align-items: center;
					.coumar{
						margin-left: 30rpx;
					}
					.count{
						font-size:24rpx;
						width: 100rpx;
						text-align: left;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(153,153,153,1);
						display: flex;
						align-items: center;
						image{
							width: 28rpx;
							height: 28rpx;
							margin: 0 12rpx 0 0 ;
						}
					}
				}
			}
			.body-wrapper-bottom{
				width: 100%;
				box-sizing: border-box;
				padding: 40rpx 0;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				line-height:42rpx;
				padding-left: 88rpx;
			}
		}
	}
</style>
