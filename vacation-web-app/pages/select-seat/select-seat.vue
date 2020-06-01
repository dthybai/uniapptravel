<template>
	<view class="page-gray">
		<uni-nav-bar left-icon="" left-text="" fixed right-text=""  :border="false"  title="选择座位" @clickLeft="clickLeft"  @clickRight="clickRight">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
			<image slot="right" src="../../static/img/duihaolv.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="select-seat-body">
			<view class="video-nav">
				<view class="nav-item " v-for="(item, index) of seatDatalist" :key="index" :class=" index === navIndex ? 'active' : ''" @click="navHandler(index,item.id)">
					{{item.name}}
				</view>
			</view>
			<com-select-seat ></com-select-seat>
		</view>
		<!-- <view class="select-reminder-body">
			<com-reminder :seatcontent="seatcontent"></com-reminder>
		</view> -->
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comSelectSeat from "@/components/com-select-seat/com-select-seat"
	// import comReminder from "@/components/com-Reminder/com-Reminder.vue"
	export default {
		data() {
			return {
				navIndex: 0,
				commentTextFrom:{
					isShow:false,
					text:"",
					focus:false
				},
				seatcontent:''
			};
		},
		props: {
			seatDatalist: {
				type: Array,
				default: () => []
			}
		},
		components: {
			uniNavBar,
			comSelectSeat
		},
		methods: {
			// 返回事件
			clickLeft () {
				this.$emit('selectSeatClick')
			},
			clickRight(){
				this.$emit('selectSeatClick')
			},
			navHandler(index,id){
				console.log(index,id)
				if (this.navIndex === index) return false
				this.navIndex = index
				this.navIndex === 0?this.commentTextFrom.isShow = false:''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-seat-body{
		box-sizing: border-box;
		padding: 40rpx 40rpx 0;
	}
	.select-reminder-body{
		box-sizing: border-box;
		padding: 30rpx 40rpx 0;
	}
	.video-nav{
		width: 100%;
		height: 106rpx;
		border-bottom: 1rpx solid rgba(249,249,249,1);
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #FFFFFF;
		border-radius: 20px;
		margin-bottom: 20px;
		.nav-item{
			line-height: 106rpx;
			text-align: center;
			position: relative;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(51,51,51,1);
		}
		.nav-item.active:after{
			content: '';
			width:48rpx;
			height:6rpx;
			background:rgba(19,190,111,1);
			position: absolute;
			bottom: 0;
			left: 50%;
			margin-left: -24rpx;
		}
	}
</style>
