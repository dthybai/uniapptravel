<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="content">
			<view class="name">反馈原因</view>
			<textarea class="uTextarea" placeholder-style="color:#BBBBBB" placeholder="请输入反馈原因"/>
			<view class="name">凭证</view>
			<upload-image :url="url" :file-list="fileList" :name="name" @on-success="onSuccess" @on-remove="onRemove" />
			<com-pays-btn :btnName='btnName'></com-pays-btn>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uploadImage from '@/components/upload-image/upload-image.vue'
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	export default {
		data() {
			return {
				title: '我要反馈',
				btnName:'提交',
				name: '', // 判断跳转
				fileList: [],
				url: '',
			};
		},
		components: {
			uniNavBar,
			uploadImage
		},
		methods:{
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
			// 上传成功
			onSuccess(res) {
			  if (res.respCode === '0000') {
					uni.hideLoading()
			    this.fileList.push(res.data.url)
			  }
			  console.log(res)
			},
			// 上传进程
			onProcess(res) {
			  console.log(res)
			},
			// 上传失败
			onError(err) {
			  console.log(err)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 40rpx;
	}
	.name{
		// width:109rpx;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-bottom: 30rpx;
	}
	.uTextarea{
		width:640rpx;
		height:300rpx;
		margin-bottom: 70rpx;
		background:rgba(248,248,248,1);
		padding-top: 30rpx;
		padding-left: 30rpx;
		border-radius:10rpx;
	}
</style>
