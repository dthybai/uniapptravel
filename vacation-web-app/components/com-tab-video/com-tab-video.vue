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
			<allothers :videolist="videolist" ></allothers>
		</view>
		<view class='content center_box' v-if="tabClick === 1">
			<allothers :videolist="videolist"></allothers>
		</view>
		<view class='content center_box' v-if="tabClick === 2">
			<allothers :videolist="videolist"></allothers>
		</view>
		<view class='content center_box' v-if="tabClick === 3">
			<allothers :videolist="videolist"></allothers>
		</view>
	</view>
</template>

<script>
import navTab from '../navTab/navTab.vue';
import allothers from '../allothers/allothers.vue';
export default {
	components: {navTab,allothers},
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
			videolist:[
			
			],
			tabClick: 0, //导航栏被点击
			currentTab: 0, //sweiper所在页
		};
	},
	onLoad(e) {
	},
	watch: {
		tabClick: {
			handler(newName, oldName) {
				this.searchHandler()
			},
			immediate: true,
			deep: true
		}
	},
	created(){
		this.searchHandler()
	},
	onShow() {},
	onHide() {},
	methods: {
		longClick(index){
			this.tabClick = index
		},
		// 获取数据
		searchHandler () {
			if(this.tabClick == 1){
				this.videolist = [
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					}
				]
			}else if(this.tabClick == 2){
				this.videolist = [
					{
						videoUrl: '已完成',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '已完成',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					}
				]	
			}else if(this.tabClick == 3){
				this.videolist = [
					{
						videoUrl: '已取消',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '已取消',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					}
				]
			}else{
				this.videolist = [
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '已完成',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '已取消',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '已完成',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '已取消',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					},
					{
						videoUrl: '待付款',
						url: '/static/img/delete/video1.png',
						bottomTitle: '故宫一日游最强攻略',
						bottomIntroduce: '下单时间 2020-03-19',
						money: '89.99',
						all: '总价￥89.99',
						count: '666'
					}
				]
			}
		},
	}
};
</script>

<style lang="scss" scoped>
	.center_box{
		width: 100%;
		padding: 0 40rpx 44rpx;
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
