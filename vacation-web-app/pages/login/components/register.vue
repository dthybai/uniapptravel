<template>
	<view class="signinWarp">
		<!-- 注册 --> 
		<view class="inputMain">
			<view class="inputRow">
				<input type="number" placeholder="请输入手机号" v-model="registerindex.phone" maxlength="11" placeholder-class="placeholderClass" />
			</view>
			<view class="inputRow">
				<input type="number" placeholder="请输入验证码" v-model="registerindex.code" maxlength="6" placeholder-class="placeholderClass" />
				<button class="getYanZhengMa" :data-id="2"  :disabled="disabled" @click="GetVerification">{{countdown}} <text v-show="timestatus">秒重获</text></button>
			</view>
			<view class="inputRow">
				<input type="text" placeholder="设置密码" v-model="registerindex.password" placeholder-class="placeholderClass" />
			</view>
			<view class="inputRow">
				<input type="text" placeholder="确认密码" v-model="registerindex.passwords" placeholder-class="placeholderClass" />
			</view>
		</view>
		<view class="loginBtnWarp">
			<button type="primary" :data-id="2"  @click="registerfn">提交</button>
			<view class="registerTextWarp">
				<text>提交即已同意</text>
				<text @click="openUserText">《用户注册协议》</text>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popupWarp">
				<view class="poputtitle">《用户注册协议》</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="scrollViewItem">         
						<view class="userSetTitle_con userSetTitle">一、总则</view>
						<view class="userSetTitle_con">1. 写的清楚，明白，字图少，内容顺。读者看着不用查资料，不费力，有术语与数据释意。</view>
						<view class="userSetTitle_con">2. 比较好的，字图多，仍清楚，明白，读者看着用时稍多，也不查资料，也很明白。以上两种情况占50%。</view>
						<view class="userSetTitle_con">3. 一般，字图很多，内容不顺，读者看着用时很多，还费力，须查资料，但还是可以看懂。这种情况占40%。</view>
						<view class="userSetTitle_con userSetTitle"> 二、注册信息和隐私保护 </view>
						<view class="userSetTitle_con">2. 比较好的，字图多，仍清楚，明白，读者看着用时稍多，也不查资料，也很明白。以上两种情况占50%。</view>
						<view class="userSetTitle_con">3. 一般，字图很多，内容不顺，读者看着用时很多，还费力，须查资料，但还是可以看懂。这种情况占40%。</view>
					</view> 
				</scroll-view>
				<view class="clonesWarp" @click="clonesPopup">
					<image src="/static/img/login/guanbi.png" mode=""></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return { 
				countdown:'获取验证码',
				 disabled:false,
				 timestatus:false,
				registerindex:{
					phone:"",
					password:"",
					passwords:"",
					code: "",
					type:2
			},
			}
		},  
		methods: { 
			//用户获取验证码
			GetVerification(e){
				var that = this;
				if(that.registerindex.phone === '' || that.registerindex.phone.length != 11){
					uni.showToast({
						icon: "none",
					    title: "请输入手机号或手机号输入有误",
					    duration: 2000
					});  
				}else{
					
					that.typeNumber = e.target.dataset.id;
					this.$api.GetVerification({phone: that.registerindex.phone,type:that.typeNumber}).then(res => {
					   // 获得数据 
					  if(res.code === 200){
						  that.disabled = true;
						   console.log(res) 
						 uni.showToast({
						        title: res.data.msg,
						        icon: 'none'
						    });
						    that.countdown = 60;
						    that.timestatus = true;
						    that.clear = setInterval(that.countDown,1000);
					  }
					  else{
						  that.disabled = false;
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
			//用户注册功能
			registerfn(){
				var that = this;
				if(that.registerindex.phone === ''){
					uni.showToast({
						icon: "none",
					    title: "请输入手机号",
					    duration: 2000
					});
				}else if(that.registerindex.code === ''){
					uni.showToast({
						icon: "none",
					    title: "验证码不能为空",
					    duration: 2000
					});
				}else if(that.registerindex.password === '' || that.registerindex.passwords === '' || that.registerindex.password != that.registerindex.passwords){
					uni.showToast({
						icon: "none",
					    title: "密码不能为空或俩次输入的密码不一致",
					    duration: 2000
					});
				}else{
					this.$api.register({phone: that.registerindex.phone,  type: that.registerindex.type,code: that.registerindex.code, pwd: that.registerindex.password}).then(res => {
					   // 获得数据 
					  if(res.code === 200){
						   console.log(res) 
						    uni.setStorageSync('userToken', res.data.token)
						   //注册成功后，跳转到登录页面
						   uni.switchTab({
						       url: '/pages/home/home'
						   });  
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
			openUserText(){
				this.$refs.popup.open()
			},
			clonesPopup(){
				this.$refs.popup.close()
			}
		},
		onLoad(option) {
			console.log(option)
		},
		components: {uniPopup}
	}
</script>

<style lang="scss" scoped>
	uni-button:after {
		border: none;
	}
	.placeholderClass{
		font-size:28rpx;
		font-weight:400;
		color:rgba(187,187,187,1);
	}
	.inputMain{
		width: 600rpx;
		margin: auto;
		padding-top: 200rpx;
		.inputRow{
			padding: 0 0 30rpx 0; 
			position: relative;
			input{
				height:92rpx;
				background:rgba(255,255,255,1);
				border-radius:46rpx;
				text-indent: 40rpx;
			}
			.getYanZhengMa{
				background: none;
				border: none;
				position: absolute;
				right: 40rpx;
				height: 100%;
				line-height: 92rpx;
				top:0;
				// width: 138rpx;
				font-size:28rpx; 
				font-weight:400;
				color:rgba(19,190,111,1);
			}
		}
	}
	.loginBtnWarp{
		width: 600rpx;
		padding-top: 32rpx;
		margin: auto;
		button{
			width: 100%;
			height:92rpx;
			line-height: 92rpx;
			background:linear-gradient(90deg,rgba(19,190,111,1) 0%,rgba(9,166,94,1) 100%);
			border-radius:44rpx;
			font-size:28rpx; 
			font-weight:400;
			color:rgba(255,255,255,1);
		}
		.registerTextWarp{
			display: flex;
			justify-content: center;
			font-size:28rpx; 
			font-weight:400;
			color:#999999;
			padding:38rpx 0 102rpx 0 ;
			text:nth-child(2){
				color:rgba(19,190,111,1);
			}
		}
	}
	.popupWarp{
		width:620rpx;
		box-sizing: border-box;
		height:900rpx;
		background:rgba(255,255,255,1);
		border-radius:14rpx;
		position: relative;
		.poputtitle{ 
			height:36rpx;
			font-size:38rpx; 
			font-weight:bold;
			color:#333333;
			line-height:46rpx; 
			padding: 39rpx 0 43rpx 0;
			text-align: center;
		}
		scroll-view{
			height: 741rpx;
			.userSetTitle_con{
				font-size:26rpx;  
				color:#666666;
				line-height:36rpx; 
				padding: 0 47rpx 18rpx 47rpx;
				box-sizing: border-box;
			}
			.userSetTitle{
				font-size:30rpx; 
				font-weight:bold;
				color:#333333;
				line-height:36rpx;
				padding-top: 30rpx;
			}
		}
		.clonesWarp{
			position: absolute;
			right: 30rpx;
			top: 26rpx;
			image{
				width: 34rpx;
				height: 34rpx;
			}
		}
	}
</style>
