<template>
	<view>
			<uni-nav-bar left-icon="back" left-text="" fixed :right-text="headerTitle.right" :backgroundColor="headerTitle.backgroundColor" :border="false" :color="headerTitle.color" :title="headerTitle.title" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="pays-body-video">
			<headerv :pagetext='pagetext'></headerv>
			<view class="video-checked">
				<view class="video-checked-form">
					<com-tickets :ticketsData="ticketsData"></com-tickets>
				</view>
			</view>
			<view class="video-checked video-color">
				<view class="video-checked-form" style="padding-bottom: 20rpx;margin-bottom: 50rpx;">
					<com-pays-info :paysInfoData="paysInfoData" :title='title'></com-pays-info>
				</view>
			</view>
			<view class="video-checked video-color">
				<view class="video-checked-form" style="padding-bottom: 20rpx;margin-bottom: 50rpx;">
					<view class="header">
						<view class="header_o">
							<text>支付信息</text>
						</view>
					</view>
					<footerv :fnlist='fnlist'></footerv>
				</view>
			</view>
		</view>
		<view class="footer" v-if="rage_key=='待付款' || rage_key=='已取消'">
			<view class="footer_color" v-if="rage_key==='待付款'">
				取消订单
			</view>
			<view class="footer_color footer_si" v-if="rage_key==='待付款'">
				立即支付
			</view>
			<view class="footer_color footer_si" v-if="rage_key==='已取消'">
				再次购买
			</view>
		</view>
	</view>
</template>

<script>
	import headerv from "@/components/com-formorder-header/com-formorder-header.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import itemline from "@/components/com-video-itemline/com-video-itemline.vue"
	import footerv from "@/components/com-formorder-footer/com-formorder-footer.vue"
	import comTickets from "@/components/com-tickets/com-tickets.vue"
	import comPaysInfo from "@/components/com-pays-info/com-pays-info.vue"
	export default {
		components: {
			headerv,
			itemline,
			uniNavBar,
			footerv,
			comTickets,
			comPaysInfo
		},
		props: {
		},
		data() {
			return {
				pagetext:{
					unpaid:'待付款',
					data:'支付剩余时间 23:25',
					image:''
				},
				title:'购票信息',
				fnlist:{
					username:'¥90.00',
					typeName: '文化币支付',
					identity:'¥90.00',
					money:'AN1234567890',
					isShow:'',
					isType:''
				},
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
						timer: '2020年03月19日 8:30 - 18:30',
						btn: '门票',
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
				headerTitle:{
					backgroundColor:'#13BE6F',
					color:'#FFFFFF'
				},
				rage_key:''
			};
		},
		onLoad() {
			const storage_key = uni.getStorageSync('storage_key');
			this.rage_key = storage_key
			this.fnlist.isShow = storage_key
			if (storage_key == '待付款') {
				this.pagetext.unpaid = '待付款'
				this.pagetext.data = '支付剩余时间 23:25'
			}else if(storage_key == '待使用'){
				this.pagetext.unpaid = '待使用'
				this.pagetext.data = '使用时间2020年3月9日'
			}else if(storage_key == '已完成'){
				this.pagetext.unpaid = '已完成'
				this.pagetext.data = '欢迎下次光临～'
			}else if(storage_key == '已取消'){
				this.pagetext.unpaid = '已取消'
				this.pagetext.data = '很遗憾，该订单已取消'
			}
		},
		methods: {
			clickLeft () {
				// uni.switchTab({
				// 	url: '/pages/order/order'
				// });
				// #ifdef H5
				uni.navigateBack(-1)
				// #endif 
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta: 1
				});
				// #endif 
			}
		},
		created() {
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.pays-body-video{
		width: 100%;
		min-height: 600rpx;
		box-sizing: border-box;
		padding: 40rpx 40rpx 207rpx;
		background:linear-gradient(180deg,rgba(19,190,111,1) 0%,rgba(19,190,111,0) 600rpx);
		.video-checked{
			width: 100%;
			margin-bottom: 20rpx;
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
	.header{
		padding: 0 20rpx;
		box-sizing: border-box;
		overflow: hidden;
		width: 100%;
		height: 116rpx;
		line-height: 116rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}
	.header_o{
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		font-size: 32rpx;
		display: flex;
		align-items: center;
		float: left;
	}
	.footer{
		width: 100%;
		height:112rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 30rpx 0rpx rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		left: 0;
		height: 112rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 40rpx 0 60rpx;
		justify-content: flex-end;
		align-items: center;
		.footer_color{
			width:200rpx;
			height:80rpx;
			border:1px solid rgba(238,238,238,1);
			border-radius:40rpx;
			line-height: 80rpx;
			text-align: center;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(102,102,102,1);
		}
		.footer_si{
			border:1px solid rgba(19,190,111,1);
			color:rgba(19,190,111,1);
			margin-left: 20rpx;
		}
	}
	.video-color{
		background-color: #fff;
	}
</style>
