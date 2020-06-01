<template>
	<view class="container999">
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
		<view class='content center_box' v-if="tabClick === 0">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
		<view class='content center_box' v-if="tabClick === 1">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
		<view class='content center_box' v-if="tabClick === 2">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
		<view class='content center_box' v-if="tabClick === 3">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
		<view class='content center_box' v-if="tabClick === 4">
			<alltickets :ticketslist="ticketslist"></alltickets>
		</view>
	</view>
</template>

<script>
const util = require('../../util/util.js');
import navTab from '@/components/navTab/navTab.vue';
import alltickets from '@/components/alltickets/alltickets.vue';
export default {
	components: {navTab,alltickets},
	props: {
		videoData: {
			default: () => [],
			type: Array
		},
		tabTitle: {
			default: () => [],
			type: Array
		},
	},
	data() {
		return {
			ticketslist:[
			
			],
			tabClick: 0, //导航栏被点击
			currentTab: 0, //sweiper所在页
		};
	},
	onLoad(e) {
	},
	created(){
		this.searchHandler()
	},
	onShow() {},
	onHide() {},
	watch: {
		tabClick: {
			handler(newName, oldName) {
				this.searchHandler()
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		longClick(index){
			this.tabClick = index
		},
		// 获取数据
		searchHandler () {
			if(this.tabClick === 1){
				this.ticketslist = [
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待付款',
						money:'￥90.00',
						quantity:'1张'
					},
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待付款',
						money:'￥90.00',
						quantity:'2张'
					}
				]
			} else if(this.tabClick === 2){
				this.ticketslist = [
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待使用',
						money:'￥90.00',
						quantity:'3张'
					}
				]
			} else if(this.tabClick === 3){
				this.ticketslist = [
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '已完成',
						money:'￥90.00',
						quantity:'5张'
					}
				]
			} else if(this.tabClick === 4){
				this.ticketslist = [
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '已取消',
						money:'￥90.00',
						quantity:'4张'
					}
				]
			}else{
				this.ticketslist = [
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待付款',
						money:'￥90.00',
						quantity:'1张'
					},
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '待付款',
						money:'￥90.00',
						quantity:'2张'
					},
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
						btn: '已取消',
						money:'￥90.00',
						quantity:'4张'
					},
					{
						title: '故宫门票',
						titleEn: 'The Imperial Palace',
						timer: '2020-03-19',
						btn: '已完成',
						money:'￥90.00',
						quantity:'5张'
					},
				]
			}
		},
	}
};
</script>

<style lang="scss" scoped>
	.center_box{
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
	}
	.header{
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-top: 20rpx;
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
</style>
