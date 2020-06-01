<template>
	<view class="box" :style="{minHeight:windowHeight+'px'}">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="header">
			<view class="header_tab">
				<view class="tab"
					:class="index === tabClick ? 'click' : ''"
					v-for="(item, index) in tabTitle"
					:key="index"
					@click="longClick(index)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="footer" v-if="tabClick===0">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
		<view class="footer" v-if="tabClick===1">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
		<view class="footer" v-if="tabClick===2">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
	</view>
</template>

<script>
	import alltickets from '@/components/alltickets/alltickets.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				windowHeight:0,
				tabClick: 0, //导航栏被点击
				title: '申请售后',
				tabTitle:['申请售后','待审核','售后完成'],
				ticketslist:[
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '申请售后',
						money:'￥90.00',
						quantity:'3张'
					},
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '申请售后',
						money:'￥90.00',
						quantity:'4张'
					}
				],
			};
		},
		components: {
			uniNavBar,
			alltickets
		},
		methods:{
		longClick(index){
				// if(index!=0){
				// 	uni.navigateTo({
				// 		url: '/pages/order-eravideo/order-eravideo'
				// 	});
				// 	uni.setStorageSync('storage_video', index);
				// }
				this.tabClick = index
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
		},
		onShow: function() {
			let _this=this;
			uni.getSystemInfo({
				success: function (res) {  
					_this.windowHeight=res.windowHeight
				}
			});
		},
	}
</script>

<style lang="scss" scoped>
	page{
		min-height:100%;
		background-color: #F8F8F8;
	}
.box{
		width: 100%;
		background-color: #F8F8F8;
	}
	.header{
		width: 100%;
		display: flex;
		justify-content: space-around;
		// padding-top: 20rpx;
		background-color: #fff;
		.header_tab{
			width: 100%;
			height:72rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			.tab{
				height:72rpx;
				line-height: 72rpx;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
			.click{
				font-weight:bold;
				border-bottom: 1rpx solid #13BE6F;
				color:rgba(51,51,51,1);
			}
		}
	}
	.footer{
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
	}
</style>
