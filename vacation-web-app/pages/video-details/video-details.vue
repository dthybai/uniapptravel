<template>
	<view class="video-details">
		<uni-nav-bar left-icon="" left-text="" fixed right-text="" title="视频详情" @clickLeft="clickLeft">
			<image slot="left" src="../../static/img/icon/jiantoufanhui.png" style="width: 40rpx;height: 40rpx;"></image>
			<view slot="right">
				<image src="/static/img/home/fenxiang.png" style="width: 44rpx;margin-top: 22rpx;" mode="widthFix"></image>
			</view>
		</uni-nav-bar>
		<!-- 记得参数 -->
		<video src="/static/test.mp4" controls poster="../../static/img/delete/video1.png">
		</video>
		<view class="video-strategy">
			<view class="title">
				{{videodetail.title}}{{videodetail.mini_title}}
			</view>
			<view class="explain">中文讲解</view>
			<view class="strategy">
				<view>
					视频期限{{videodetail.validity_time}}天
				</view>
				<view>
					播放量{{videodetail.read_num}}
				</view>
			</view>
		</view>
		<view class="video-content">
			<view class="video-nav">
				<view class="nav-item " v-for="(item, index) of navData" :key="index" :class=" index === navIndex ? 'active' : ''" @click="navHandler(index)">
					{{item.title}}
				</view>
			</view>
			<com-video-introduce v-show="navIndex === 0" ></com-video-introduce>
			<com-video-comment v-show="navIndex === 1" :commentData="commentData" @iconClick="iconClick" @commentclick="commentclick"></com-video-comment>
		</view>
		<com-footer />
		<view class="commentFooterText" v-if="commentTextFrom.isShow">
			<input type="text" 
        v-model="commentTextFrom.text"
        :focus="commentTextFrom.focus"
        confirm-type="send" @confirm="search" placeholder="我来说两句" placeholder-style="color:rgba(187,187,187,1);font-size:28rpx;"/>
			<text @click="commentSendText">发送</text>
		</view>
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import comVideoIntroduce from "@/components/com-video-introduce/com-video-introduce.vue"
	import comVideoComment from "@/components/com-video-comment/com-video-comment.vue"
	import comFooter from '@/components/com-footer/com-footer.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	
	var _self,
	page = 1,
	size = 10;
	export default {
		data() {
			return {
				ids:'',
				commentTextFrom:{
					isShow:false,
					text:"",
					focus:false
				},
				videodetail:[],
				introduce: '',
				loadingText: '加载中...',
				       loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				       contentText: {
				           contentdown:'上拉显示更多',
				           contentrefresh: '正在加载...',
				           contentnomore: '没有更多数据了'
				       },
				// options: [
				// {
				//   icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
				//   text: '客服'
				// }, {
				//   icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
				//   text: '店铺'
				// }, {
				//   icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
				//   text: '购物车',
				//   info: 2
				// }],
				// buttonGroup: [
				// 	{
				// 	  text: '加入购物车',
				// 	  backgroundColor: '#ff0000',
				// 	  color: '#fff'
				// 	},
				// 	{
				// 	  text: '立即购买',
				// 	  backgroundColor: '#ffa200',
				// 	  color: '#fff'
				// 	}
				// ],
				navIndex: 0,
				navData: [
					{
						title: '介绍'
					},
					{
						title: '评论'
					}
				],
				commentData: [
					{
						username: '拓冠科技小',
						timer: '02-27',
						dian1: '6666',
						dian2: '888',
						comment: '有空我一定要去一次！太美了~',
						state:false,
						state_cai:false,
					},
					{
						username: '拓冠科技小',
						timer: '02-27',
						dian1: '6666',
						dian2: '888',
						comment: '有空我一定要去一次！太美了~',
						state:false,
						state_cai:false,
						
					},
					{
						username: '拓冠科技小',
						timer: '02-27',
						dian1: '6666',
						dian2: '888',
						comment: '有空我一定要去一次！太美了~',
						state:false,
						state_cai:false,
						
					},
					{
						username: '拓冠科技小',
						timer: '02-27',
						dian1: '6666',
						dian2: '888',
						comment: '有空我一定要去一次！太美了~',
						state:false,
						state_cai:false,
						
					}
				]
			};
		},
		components: {
			uniNavBar,
			comVideoIntroduce,
			comVideoComment,
			comFooter
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			page = 1;
			this.ids = option.id;
			this.getvideodetails();
			if(this.navIndex === 1){
				this.videoinfolist()
			}
			
		},
		// 下拉刷新
		onPullDownRefresh() {
			page = 1;
			this.getvideodetails();
			if(this.navIndex === 1){
				this.videoinfolist()
			}
		},
		onReachBottom: function() {
			//上拉加载
			if(this.navIndex === 1){
				this.videoinfolist()
			}
		},
		methods: {
			//获取视频详情页
			getvideodetails(){
				this.$api.videodetails({id:this.ids}).then(res => {
				   // 获取视频详情页 
				   console.log(res.data)
				  if(res.code === 200){
						this.videodetail = res.data;
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
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
			//获取视频评论列表
			videoinfolist(){
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				if(this.ids){
				this.$api.videoinfolist({id:this.parms,page:page,size:size}).then(res => {
				   console.log(res.data)
				  if(res.code === 200){
						if(res.data.length<size){
							 this.loadingType = 2;
												 this.commentData = res.data;
												 uni.hideNavigationBarLoading();
												 uni.stopPullDownRefresh();//得到数据后停止下拉刷新
						}else{
												  this.loadingType = 0;
												  this.data = res.data;
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
				}
			},
			search(){
				this.commentSendText()
			},
			commentSendText(){
				this.commentTextFrom.isShow=false;
				this.commentData.unshift({
						username: '刘学超',
						timer: '02-26',
						dian1: '299',
						dian2: '99',
						comment: this.commentTextFrom.text,
						state:false,
						state_cai:false, 
					})
				this.commentTextFrom.text="";
				this.commentTextFrom.focus=false;
			},
			commentclick(res){
				this.commentTextFrom.isShow=true; 
				this.commentTextFrom.focus=true;
        uni.onKeyboardHeightChange(res => {
          console.log(res.height)
          document.getElementByclassName('commentFooterText').style.bottom = `${res.height}px`;
        })
			},
			iconClick(res){ 
				if(res.type===1){
					this.commentData[res.index].state=!this.commentData[res.index].state; 
					this.commentData[res.index].state_cai=false
				}else{
					this.commentData[res.index].state_cai=!this.commentData[res.index].state_cai 
					this.commentData[res.index].state=false
				}
			},
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
			navHandler(index){
				if (this.navIndex === index) return false
				this.navIndex = index
				this.navIndex === 0?this.commentTextFrom.isShow = false:''
				if(index===1){
					this.videoinfolist();
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.commentFooterText{
	display: flex;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	align-items: center;
	height:112rpx;
	background:rgba(255,255,255,1);
	box-sizing: border-box;
	justify-content: space-between;
	padding: 0 30rpx;
	box-shadow:0px 0px 30rpx 0px rgba(0, 0, 0, 0.04);
	input{
		width:600rpx;
		height:68rpx;
		background:rgba(248,248,248,1);
		border-radius:34rpx;
		text-indent: 1.3em;
		color: #333333;
		font-size: 28rpx;
	}
	text{
		// width:54px; ;
		font-size:28rpx; 
		font-weight:500;
		color:rgba(19,190,111,1);
		display: block;
		padding-right: 5rpx;
	}
}
.video-details{
	padding-bottom: 120rpx; 
}
video{
	width: 100%;
	height: 420rpx;
	display: block;
}
.video-strategy{
	width: 100%;
	box-sizing: border-box;
	padding: 50rpx 40rpx;
	background-color: #fff;
	.title{
		font-size:34rpx;
		line-height: 34rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		padding-bottom: 20rpx;
	}
	.explain{
		display: inline-block;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,187,2,1);
		padding: 8rpx 12rpx;
		background:rgba(255,187,2,0.1);
	}
	.strategy{
		padding-top: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
}
.video-content{
	background-color: #fff;
	width: 100%;
	margin-top: 16rpx;
	border-top: 16rpx solid rgba(249,249,249,1);
}
.video-nav{
	width: 100%;
	height: 106rpx;
	border-bottom: 1rpx solid rgba(249,249,249,1);
	display: flex;
	justify-content: space-around;
	align-items: center;
	.nav-item{
		line-height: 106rpx;
		text-align: center;
		position: relative;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.nav-item.active:after{
		content: '';
		width:48rpx;
		height:6rpx;
		background:rgba(19,190,111,1);
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -24rpx;
	}
}
</style>
