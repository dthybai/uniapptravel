<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="mainWarp"> 
			<view class="box_header" v-for="(item,index) of paysPeople">
				<view class="header">
					<view class="header_l header_r">
						<view class="header_img">
							<image src="../../static/img/tou.png" mode=""></image>
						</view>
						<view class="header-size">
							<view class="header-col">
								{{item.name}}
							</view>
							<view class="header-col header-fam">
								{{item.data}}
							</view>
						</view>
					</view>
					<view class="header_l">
						<view class="garbage">
							<image src="../../static/img/garbage.png" mode="" @click="dellist(index)"></image>
						</view>
					</view>
				</view>
				<view class="content">
					<text>有空我一定要去一次！太美了~</text>
				</view>
				<view class="footer" @click='videoHandler'>
					<view class="footer_l">
						<text>故宫一日游最强攻略</text>
					</view>
					<view class="footer_l">
						<image src="../../static/img/delete/video1.png" mode=""></image>
						<image class="footer_asb" src="../../static/img/icon/play.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<comdelete :title='titlell' :payDialogVisible='payDialogVisible' @payDialog='payDialog' @desucceed='desucceed'></comdelete>
	</view>
</template>

<script>
	import comdelete from "@/components/com-delete/com-delete.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				titlell:'您确定要删除当前评论吗？',
				payDialogVisible: false,
				title: '我的评价',
				typeindex: '',
				paysPeople: [
					{
						data:'02-27',
						name:'拓冠科技小'
					},
					{
						data:'02-27',
						name:'拓冠科技小'
					},
					{
						data:'02-27',
						name:'拓冠科技小'
					}
				]
			};
		},
		components: {
			uniNavBar,
			comdelete
		},
		methods:{
			videoHandler(){
				uni.navigateTo({
					url: '/pages/video-details/video-details'
				})
			},
			dellist(index){
				this.typeindex = index
				this.payDialogVisible = true
			},
			payDialog(){ // 取消删除
				this.payDialogVisible = false
			},
			desucceed(){ // 确认删除
				this.paysPeople.splice(this.typeindex,1)
				this.payDialogVisible = false
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
.box{
	width: 100%; 
}
.box_header{
	width: 100%;
	margin-bottom: 100rpx;
	padding: 0 40rpx;
	box-sizing: border-box;
} 
.mainWarp{
	padding: 48rpx 0 0 0;
}
.header{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.header_l{
	align-items: center; 
	.header_img{
		width: 68rpx;
		height: 68rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.garbage{
		width: 30rpx;
		height: 29rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
}
.header_l{
	display: flex;
	.header-size{
		padding-left: 20rpx;
		.header-col{
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:42rpx;
		}
		.header-fam{
			color:rgba(153,153,153,1);
		}
	}
}
.content{
	width: 100%;
	display: flex;
	justify-content: left;
	// height: 84rpx;
	padding: 24rpx 0 40rpx 0;
	text{	
		font-size:28rpx;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
		line-height:42rpx;
	}
}
.footer{
	width: 100%;
	height:110rpx;
	background:rgba(248,248,248,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.footer_l{
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		image{
			width:165rpx;
			height:110rpx;
			border-radius:0rpx 10rpx 10rpx 0rpx;
		}
		.footer_asb{
			width:44rpx;
			height:44rpx;
			background:rgba(0,0,0,1);
			opacity:0.3;
			border-radius:50%;
			position: absolute;
			// z-index: 999;
			left: 40%;
			top: 30%;
		}
		text{
			padding-left: 40rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			color:rgba(51,51,51,1);
		}
	}
}
</style>
