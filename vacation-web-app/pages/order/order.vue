<template>
	<view :class="titlIndex === 1 ? 'page-gray page-graybox' : 'page-graybox'">
		<uni-nav-bar fixed right-text="" title="titleData" :titleData="titleData" :titlIndex="titlIndex" @titleHandler="titleHandler" @clickLeft="clickLeft"></uni-nav-bar>
		<!-- 视频组件 -->
		<div class="boxs" v-show="titlIndex === 0">
			<tabvideo :videoData="videoData" :tabTitle='videoTitle'></tabvideo>
		</div>
		<!-- 门票组件 -->
		<view class="boxs" v-show="titlIndex === 1">
			<tabtickets :ticketsData="ticketsData" :tabTitle='ticketsTitle'></tabtickets>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import tabvideo from "@/components/com-tab-video/com-tab-video.vue"
	import tabtickets from "@/components/com-tab-tickets/com-tab-tickets.vue"
	export default {
		data() {
			return {
				videoTitle:['全部','待付款','已完成','已取消'], //导航栏格式 --导航栏组件
				ticketsTitle:['全部','待付款','待使用','已完成','已取消'], //导航栏格式 --导航栏组件
				titlIndex: 0,
				titleData:[
					{
						title: '视频订单',
						isChecked: true
					},
					{
						title: '门票订单',
						isChecked: false
					}
				],
				ticketsData:[]
			};
		},
		components: {
			uniNavBar,
			tabvideo,
			tabtickets
			// comVideo,
			// comTickets
		},
		onLoad () {
			this.searchHandler()
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
			// 接受title索引
			titleHandler (index) {
				if(index == this.titlIndex) return false
				else this.titlIndex = index
				this.searchHandler()
			},
			// 获取数据
			searchHandler () {
				if(this.titlIndex === 0) {
					this.videoData = [
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							},
							{
								videoUrl: '',
								url: '/static/img/delete/video1.png',
								bottomTitle: '故宫一日游最强攻略',
								bottomIntroduce: '青春如同一场旅游',
								money: '89.99',
								count: '666'
							}
						]
				}else {
					this.ticketsData = [
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
					]
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F8F8F8;
	}
.boxs{
	box-sizing: border-box;
}
.page-graybox{
	// height: var(--status-bar-height); 
}
</style>
