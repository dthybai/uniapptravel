<template>
	<view>
			<uni-nav-bar left-icon="" left-text="" fixed :right-text="headerTitle.right" :backgroundColor="headerTitle.backgroundColor" :border="false" :color="headerTitle.color" :title="headerTitle.title" @clickLeft="clickLeft">
				<image slot="left" src="../../static/img/login/jiantou.png" style="width: 40rpx;height: 40rpx;"></image>
			</uni-nav-bar>
		<view class="pays-body-video">
			<headerv :pagetext='pagetext'></headerv>
			<view class="video-checked">
				<view class="video-checked-form">
					<view class="header">
						<view class="header_o">
							<text>视频信息</text>
						</view>
					</view>
					<itemline :videolist='videolist'></itemline>
				</view>
			</view>
			<view class="video-checked">
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
		<view class="footer" v-if="age_video!='已完成'">
			<view class="footer_color" v-if="age_video=='待付款'">
				取消订单
			</view>
			<view class="footer_color footer_si" v-if="age_video=='待付款'">
				立即支付
			</view>
			<view class="footer_color footer_si" v-if="age_video=='已取消'">
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
	export default {
		components: {
			headerv,
			itemline,
			uniNavBar,
			footerv
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
				fnlist:{
					username:'¥90.00',
					typeName: '文化币支付',
					identity:'¥90.00',
					money:'AN1234567890',
					isShow:'',
					isType:''
				},
				videolist:[
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '视频期限三天',
						all: '￥89.99',
					},
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '视频期限三天',
						all: '￥89.99',
					}
				],
				headerTitle:{
					backgroundColor:'#13BE6F',
					color:'#FFFFFF'
				},
				age_video:''
			};
		},
		onLoad() {
			const storage_video = uni.getStorageSync('storage_video');
			this.age_video = storage_video
			console.log(this.age_video,'sasa',this.age_video==='已完成')
			this.fnlist.isType = storage_video
			if (storage_video == '待付款') {
				this.pagetext.unpaid = '待付款'
				this.pagetext.data = '支付剩余时间 23:25'
				this.videolist.bottomIntroduce = '视频期限三天'
			}else if(storage_video == '已完成'){
				this.pagetext.unpaid = '已完成'
				this.pagetext.data = '请在视频有效期内观看'
				this.videolist=[
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '有效期至2020-03-16',
						all: '￥89.99',
					},
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '有效期至2020-03-16',
						all: '￥89.99',
					}
				]
			}else if(storage_video == '已取消'){
				this.pagetext.unpaid = '已取消'
				this.pagetext.data = '很遗憾，该订单已取消'
				this.videolist=[
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '有效期至2020-03-16',
						all: '￥89.99',
					},
					{
						videoUrl: '',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '有效期至2020-03-16',
						all: '￥89.99',
					}
				]
			}
		},
		methods: {
			clickLeft () {
				uni.switchTab({
					url: '/pages/order/order'
				});
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
</style>
