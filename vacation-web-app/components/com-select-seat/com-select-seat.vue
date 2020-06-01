<template>
	<view class="com-select-seat">
		<view class="select-seat-position">过道</view>
		<view class="com-select-seat-item" v-for="(item,index) of seatpageData" :key="index">
			<view v-for="(subItem,subIndex) of item" :key="subIndex" :class=" subItem.isTrue ? 'seat-item-checked' : 'seat-item'" @click="seatCheck(subItem)">{{subItem.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seatpageData: [],
			};
		},
		props: {
			seatData: {
				type: Array,
				default: () => [
					[
						{
							isTrue:true,
							title: 'A1'
						},
						{
							isTrue:false,
							title: 'B1'
						},
						{
							isTrue:false,
							title: 'C1'
						},
						{
							isTrue:false,
							title: 'D1'
						}
					],
					[
						{
							isTrue:false,
							title: 'A1'
						},
						{
							isTrue:false,
							title: 'B1'
						},
						{
							isTrue:false,
							title: 'C1'
						},
						{
							isTrue:false,
							title: 'D1'
						}
					],
					[
						{
							isTrue:false,
							title: 'A1'
						},
						{
							isTrue:false,
							title: 'B1'
						},
						{
							isTrue:false,
							title: 'C1'
						},
						{
							isTrue:false,
							title: 'D1'
						}
					],
					[
						{
							isTrue:false,
							title: 'A1'
						},
						{
							isTrue:false,
							title: 'B1'
						},
						{
							isTrue:false,
							title: 'C1'
						},
						{
							isTrue:false,
							title: 'D1'
						}
					]
				]
			},
			seatcontent: {
				type: String
			}
		},
		mounted() {
			this.seatpageData = this.seatData
		},
		methods: {
			seatCheck(subItem) {
				for(let item of this.seatpageData){
					for(let subItem of item){
						subItem.isTrue = false
					}
				}
				subItem.isTrue = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.com-select-seat{
		position: relative;
		width:100%;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		padding: 50rpx;
		box-sizing: border-box;
		.select-seat-position{
			position: absolute;
			left: 50%;
			width: 1rpx;
			top: 50%;
			transform: translateX(-50%);
			transform: translateY(-50%);
			word-wrap: word-wrap;
			display: flex;
			border: 2rpx dotted rgba(238,238,238,1);
			justify-content: center;
			align-items: center;
			height: 80%;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.com-select-seat-item{
			position: relative;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 54rpx 0;
			.seat-item-checked{
				box-sizing: border-box;
				text-align: center;
				line-height: 46rpx;
				font-size:20rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
				width: 66rpx;
				height: 66rpx;
				background: url(../../static/img/icon/seat-checked.png) no-repeat center center;
				background-size: contain;
			}
			.seat-item{
				box-sizing: border-box;
				width: 66rpx;
				height: 66rpx;
				line-height: 46rpx;
				font-size:20rpx;
				text-align: center;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(153,153,153,1);
				background: url(../../static/img/icon/seat.png) no-repeat center center;
				background-size: contain;
			}
		}
	}

</style>
