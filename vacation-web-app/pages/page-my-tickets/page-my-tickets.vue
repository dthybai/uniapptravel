<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="header">
			<myVideo :tabTitle='tabTitle' @tabindex='tabindex'></myVideo>
		</view>
		<view class="center_o" v-if="isShow === 0">
			<alltickets :ticketslist="ticketslist" :ticketcolor='ticketcolor_need'></alltickets>
			<view class="cent_boundary">
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				<view class="boundary_r"><text>门票推荐</text></view>
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
			</view>
			<com-tickets :ticketsData="ticketsData"></com-tickets>
		</view>
		<view class="center_o" v-if="isShow === 1">
			<alltickets :ticketslist="ticketslist" :ticketcolor='ticketcolor'></alltickets>
			<view class="cent_boundary">
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
				<view class="boundary_r"><text>门票推荐</text></view>
				<view class="boundary_l"><image src="../../static/img/icon/boundary.png" mode=""></image></view>
			</view>
			<com-tickets :ticketsData="ticketsData"></com-tickets>
		</view>
	</view>
</template>

<script>
	import myVideo from "@/components/com-my-videos/com-my-videos.vue"
	import alltickets from '@/components/alltickets/alltickets.vue'
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	export default {
		data() {
			return {
				ticketcolor:{
					color:'#C4EFDB',
				},
				ticketcolor_need:{
					color:'#13BE6F',
				},
				title: '我的门票',
				tabTitle: ['待使用','已使用'],
				isShow: 0,
				ticketslist:[
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待使用',
						money:'￥90.00',
						quantity:'3张'
					},
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待使用',
						money:'￥90.00',
						quantity:'4张'
					}
				],
			ticketsData: [
				{
					title: '故宫门票',
					titleEn: 'The Imperial Palace',
					timer: '8:30 - 18:30',
					btn: '购买',
					form:[
						{
							money: '66',
							type: '成人票',
							isHave: true,
							content: '有'
						},
						{
							money: '66',
							type: '成人票',
							isHave: true,
							content: '有'
						},
						{
							money: '66',
							type: '成人票',
							isHave: true,
							content: '有'
						},
						{
							money: '6',
							type: '儿童票',
							isHave: false,
							content: '无'
						}
					]
				}
			],
			};
		},
		components: {
			myVideo,
			comTickets,
			alltickets
		},
		methods:{
			tabindex(type){
				this.isShow = type
				if(this.isShow === 1){
					this.ticketsData = [
						{
							title: '故宫门票',
							titleEn: 'The Imperial Palace',
							timer: '8:30 - 18:30',
							btn: '购买',
							form:[
								{
									money: '66',
									type: '成人票',
									isHave: true,
									content: '有'
								},
								{
									money: '66',
									type: '成人票',
									isHave: true,
									content: '有'
								},
								{
									money: '66',
									type: '成人票',
									isHave: true,
									content: '有'
								},
								{
									money: '6',
									type: '儿童票',
									isHave: false,
									content: '无'
								}
							]
						}
					],
					this.ticketslist=[
						{
							title: '故宫门票',
							titleEn: 'The Imperial Palace',
							timer: '2020-03-19',
							btn: '已使用',
							money:'￥90.00',
							quantity:'3张'
						},
						{
							title: '故宫门票',
							titleEn: 'The Imperial Palace',
							timer: '2020-03-19',
							btn: '已使用',
							money:'￥90.00',
							quantity:'4张'
						}
					]
					
				}else{
					this.ticketsData = [
						{
							title: '故宫门票',
							titleEn: 'The Imperial Palace',
							timer: '8:30 - 18:30',
							btn: '购买',
							form:[
								{
									money: '66',
									type: '成人票',
									isHave: true,
									content: '有'
								},
								{
									money: '66',
									type: '成人票',
									isHave: true,
									content: '有'
								},
								{
									money: '66',
									type: '成人票',
									isHave: true,
									content: '有'
								},
								{
									money: '6',
									type: '儿童票',
									isHave: false,
									content: '无'
								}
							]
						}
					],
					this.ticketslist=[
						{
							title: '故宫门票',
							titleEn: 'The Imperial Palace',
							timer: '2020-03-19',
							btn: '待使用',
							money:'￥90.00',
							quantity:'3张'
						},
						{
							title: '故宫门票',
							titleEn: 'The Imperial Palace',
							timer: '2020-03-19',
							btn: '待使用',
							money:'￥90.00',
							quantity:'4张'
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
	page{
		background-color: #F8F8F8;
	}
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
		// font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		margin-bottom: 20rpx;
		color:rgba(51,51,51,1);
		text{
			padding: 0 20rpx;
		};
	}
</style>
