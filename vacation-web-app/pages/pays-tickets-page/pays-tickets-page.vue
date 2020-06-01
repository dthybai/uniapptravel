<template>
	<view class="page-gray">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" backgroundColor="#13BE6F" :border="false" color="#FFFFFF" title="确认购买" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="linear-gradient-color">
			<view class="pays-tickets-body">
				<com-tickets :ticketsData="ticketsData"></com-tickets>
			</view>
			<view class="pays-body-info">
				<com-pays-info :paysInfoData="paysInfoData"></com-pays-info>
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
		
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comPaysChecked from "@/components/com-pays-checked/com-pays-checked.vue"
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import comPaysInfo from "@/components/com-pays-info/com-pays-info.vue"
	export default {
		data() {
			return {
				paysInfoData:[
					{
						username:'叶清杨',
						typeName: '成人票',
						identity:'562458744155652325',
						money:'60'
					},
					{
						username:'叶清杨儿子',
						typeName: '儿童票',
						identity:'562458744155652325',
						money:'60'
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
					}
				]
			};
		},
		components: {
			uniNavBar,
			comPaysChecked,
			comPaysBtn,
			comTickets,
			comPaysInfo
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
	.pays-tickets-body{
		box-sizing: border-box;
		padding: 30rpx 40rpx 0;
	}
	.pays-body-info{
		box-sizing: border-box;
		padding: 8rpx 40rpx 30rpx;
	}
	.pays-body-type{
		width: 100%;
		// margin-top: 30rpx;
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
