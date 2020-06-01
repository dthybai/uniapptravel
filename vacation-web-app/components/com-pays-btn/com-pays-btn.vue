<template>
	<view class="pays-footer">
		<view class="pays-button" v-if="btnName === '提交'" @click="addinfo">
			{{btnName}}
		</view>
		<view class="pays-button" v-else-if="btnName === '我要反馈'" @click="paybtn()">
			{{btnName}}
		</view>
		<view class="pays-button" @click="paysbtnHandler" v-else>
			{{btnName}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
		  btnName: {
		    type: String,
		    default: '确认支付'
		  },
		  datas:{
			  type: Object,
			  default: () => {}
		  }
		},
		data() {
			return {
				
			};
		},
		methods: {
			addinfo () {
				console.log(this.datas.name)
					this.$api.addinfo(this.datas).then(res => {
						console.log(res)
					  if(res.code === 200){
							console.log(res)
							uni.navigateTo({
								url: '/pages/page-contactsfrequent/page-contactsfrequent'
							})
					  }
					  else{
						uni.showToast({
							icon: "none",
						    title: res.msg,
						    duration: 2000
						});
					  }
					}).catch(res => {
						uni.showToast({
							icon: "none",
						    title: "请求服务器失败",
						    duration: 2000
						}); 
					　　// 失败进行的操作
					})	
			},
			paysbtnHandler () {
				alert(333)
				uni.navigateTo({
					url: '/pages/successful-order/successful-order'
				})
			},
			// 我要反馈
			paybtn(){
				uni.navigateTo({
					url: '/pages/pages-saleafter/pages-myhelp'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pays-footer{
		width: 100%;
		height: 112rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		.pays-button{
			width:670rpx;
			height:80rpx;
			line-height: 80rpx;
			text-align: center;
			background:rgba(19,190,111,1);
			border-radius:40rpx;
			font-size:28rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
		}
	}
</style>
