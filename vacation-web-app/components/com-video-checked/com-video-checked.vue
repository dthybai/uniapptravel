<template>
	<view class="page-wrapper">
		<view class="body-item-bottom" v-for="(subItem, subIndex) of videoData" :key="subIndex">
			<view class="image-wrapper">
		<!-- 		<view :class="subItem.isChecked ? 'checked' : 'nochecked'">
				</view> -->
				<view class="inputCheckWarp" @click="inputCheckWarpClick(subItem, subIndex)" v-if="subItem.isChecked">
					<inputCheck :clickstate="subItem.state"/>
				</view>
				<image :src="subItem.url" class="img-url"></image>
				<image src="../../static/img/icon/play.png" class="paly"></image>
			</view>
			<view class="item-bottom-wrapper">
				<view class="title">{{subItem.bottomTitle}}</view>
				<view class="introduce">{{subItem.bottomIntroduce}}</view>
				<view class="details">
					<text class="money">￥{{subItem.money}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import inputCheck from "@/components/input-check/input-check.vue"
	export default {
		data() {
			return {
				
			}
		},
		props: {
			videoData: {
				default: () => [],
				type: Array
			},
			checkState:{
				default: () => false,
				type:Boolean
			}
		},
		methods: {
			inputCheckWarpClick(item,index){
				this.videoData.map((item,indexs)=>{
					if(indexs===index){
						this.videoData[indexs].state=true
					}else{
						this.videoData[indexs].state=false
					}
				})
			},
		},
		components:{
			inputCheck
		}
	}
</script>
<style scoped lang="scss">
	.body-item-bottom{
		width: 100%;
		display: flex;
		padding-bottom: 64rpx;
		justify-content: space-between;
		.image-wrapper{
			width: 326rpx;
			height: 140rpx;
			border-radius: 10rpx;
			margin-left: 30rpx;
			position: relative;
			margin-right: 23rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image.img-url{
				width: 210rpx;
				height: 140rpx;
				border-radius: 10rpx;
			}
			image.paly{
				position: absolute;
				left: 72rpx;
				bottom: 16rpx;
				width: 44rpx;
				height: 44rpx;
			}
			.checked{
				width:34rpx;
				height:34rpx;
				background:rgba(19,190,111,1);
				border-radius:8rpx;
				margin-right: 20rpx;
			}
			.nochecked{
				width:34rpx;
				height:34rpx;
				background:rgba(249,249,249,1);
				border-radius:8rpx;
				margin-right: 20rpx;
				box-sizing: border-box;
				border: 1rpx solid rgba(19,190,111,1);
			}
		}
		
		.item-bottom-wrapper{
			width: 430rpx;
			.title{
				color: #333333;
				font-size: 26rpx;
				line-height: 26rpx;
			}
			.introduce{
				color: #999999;
				font-size: 24rpx;
				line-height: 24rpx;
				padding-top: 18rpx;
			}
			.details{
				vertical-align: bottom;
				padding-top: 43rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.money{
					vertical-align: bottom;
					color: #E56A4D;
					font-size: 30rpx;
					line-height: 30rpx;
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
</style>
