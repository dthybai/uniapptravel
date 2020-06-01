<template>
	<view>
		<view class="search-input">
			<view class="uni-form-item uni-column">
				<input class="uni-input" type="text" @confirm="confirm" focus placeholder="请输入内容" placeholder-class="placeholder" confirm-type="search" v-model="value" />
				<text class="input-search-icon"></text>
				<text class="input-clear" :class="{'active':isShowAfter}" @click="clearHandler()"></text>
			</view>
			<view class="search-btn" @click="searchBtnHandler">搜索</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			};
		},
		computed:{
			isShowAfter () {
				return this.value.length > 0 ? true : false
			}
		},
		methods: {
			confirm(){
				this.$emit('searchBtnHandler',this.value)
			},
			// 清空input
			clearHandler () {
				this.value = ''
			},
			searchBtnHandler () {
				this.$emit('searchBtnHandler',this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-input{
	width: 100%;
	display: flex;
	padding: 20rpx 40rpx;
	box-sizing: border-box;
	background-color: #fff;
	justify-content: space-between;
	align-items: center;
	.search-btn{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(19,190,111,1);
	}
	.uni-column{
		position: relative;
		width:580rpx;
		height:68rpx;
		input{
			width:580rpx;
			height:68rpx;
			background:rgba(249,249,249,1);
			border-radius:34rpx;
			color: #333333;
			font-size: 28rpx;
			text-indent: 79rpx;
			box-sizing: border-box;
			padding-right: 60rpx;
			position: relative;
		}
		.input-search-icon{
			width: 30rpx;
			height: 30rpx;
			background: url(../../static/img/icon/sousuotopbar.png) no-repeat center center;
			background-size: contain;
			position: absolute;
			left: 26rpx;
			top: 20rpx;
			
		}
		.input-clear{
			display: none;
			width: 60rpx;
			height: 68rpx;
			background: url(../../static/img/icon/delete.png) no-repeat center center;
			background-size: 30%;
			position: absolute;
			right: 0rpx;
			top: 0rpx;
		}
		.input-clear.active{
			display: block;
		}
	}
	
}
</style>
