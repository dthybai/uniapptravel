<template>
	<view class="box">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" :title="title" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
		</uni-nav-bar>
		<view class="navTab">
			<text class="active">热点问题</text>
			<text>文化币</text>
		</view>
		<view class="info" v-for='(item,index) of fnlist' :key='index'>
			<view class="item" @click="btnshow(index,item)">
				<text>{{item.title}}</text>
				<uni-icons type="arrowright" size="20" color="#C3C3C3"  v-if="item.isShow === false"></uni-icons>
				<uni-icons type="arrowdown" size="20" color="#C3C3C3"  v-if="item.isShow === true"></uni-icons>
			</view>
			<view class="item-con" v-if="item.isShow">
				{{item.content}}
			</view>
		</view>
		<com-pays-btn :btnName="btnName"></com-pays-btn>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
</template>

<script>
	import comPaysBtn from "@/components/com-pays-btn/com-pays-btn.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	var _self,
	page = 1,
	size = 10;
	export default {
		data() {
			return {
				loadingText: '加载中...',
				       loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				       contentText: {
				           contentdown:'上拉显示更多',
				           contentrefresh: '正在加载...',
				           contentnomore: '没有更多数据了'
				       },
				title: '帮助反馈',
				btnName: '我要反馈',
				isShow:true,
				fnlist:[],
				isShows:[]
				
			};
		},
		components: {
			uniNavBar,
			comPaysBtn,
			uniLoadMore
		},
		onLoad () {
			page = 1;
			//this.parms = option.id;
			this.getopinionlist()
		},
		// 下拉刷新
		onPullDownRefresh() {
			page = 1;
			this.getopinionlist()
			
		},
		onReachBottom: function() {
			//上拉加载
			this.getopinionlist()
		},
		methods:{
			//获取问题列表
			getopinionlist (){
				this.$api.opinionlist({page:page,size:size}).then(res => { 
				  if(res.code === 200){	
					  console.log(res)
					  for (var i = 0; i < res.data.length; i++) {
					  	 res.data[i].isShow=false;
					 }
					 console.log(res.data)
					if(res.data.length<size){
						 this.loadingType = 2;
							this.fnlist = res.data;
							//this.title= res.data[0].title;
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新 			
					}else{

							this.loadingType = 0;
							this.fnlist = res.data;
							//this.title= res.data[0].title;
							uni.hideNavigationBarLoading();
							uni.stopPullDownRefresh();//得到数据后停止下拉刷新
							 page++;

					}		
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
			btnshow(type,item){
				console.log(type)
				// if(this.isShow===true){
				// 	this.isShow=false
				// 	//this.fnlist[type].isShow = false
				// }else{
				// 	this.isShow=true	
				// }
				if(item.isShow===true){
					this.fnlist[type].isShow = false
				}else{
					for(let index in this.fnlist){
						this.fnlist[index].isShow = false
					}
					this.fnlist[type].isShow = true
				}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
.navTab{
	height: 100rpx;
	display: flex;
	color: #BBBBBB;
	font-size: 28rpx;
	padding: 0 40rpx;
	align-items: center;
	.active{
		margin-right: 60rpx;
		color:#333333;
	}
}
.info{
	margin-bottom: 30rpx;
	.item{
		height: 100rpx;
		padding: 0 40rpx;
		background-color: #F8F8F8;
		display: flex;
		align-items: center;
		margin: 0 40rpx;
		justify-content: space-between;
		font-size: 28rpx;
		color:#333333;
		border-radius:10rpx;
	}
	.item-con{
		padding: 30rpx 40rpx;
		background-color: #F8F8F8;
		align-items: center;
		margin: 0 40rpx;
		font-size: 28rpx;
		color:#333333;
	}
}
</style>
