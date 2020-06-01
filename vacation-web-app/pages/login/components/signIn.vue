<template>
	<view class="signinWarp"> 
		<!-- 手机登录 -->
		<view class="tapTopWarp">
			<text @click="updataLoginState(1)" :style="{color:appIndex==1?'#ffffff':'rgba(255,255,255,0.5)'}">密码登陆</text>
			<text>|</text>
			<text @click="updataLoginState(2)" :style="{color:appIndex==2?'#ffffff':'rgba(255,255,255,0.5)'}">手机登陆</text>
		</view>
		<view class="inputWarp">
			<view v-if="appIndex==1"> 
				<view class="input_user">
					<image src="/static/img/login/shouji.png" mode="widthFix"></image>
					<input class="uni-input" v-model="passdinput.user" type="number" maxlength="11" placeholder="请输入手机号码" placeholder-class="placeholderClass"/>
				</view>
				<view class="input_user">
					<image src="/static/img/login/mima.png" mode="widthFix"></image>
					<input class="uni-input" type="" v-model="passdinput.password" placeholder="请输入密码" placeholder-class="placeholderClass"/> 
				</view> 
			</view>
			<view  v-if="appIndex==2">
				<view class="input_user">
					<image src="/static/img/login/shouji.png" mode="widthFix"></image>
					<input class="uni-input" v-model="codeInput.user" type="number" maxlength="11" placeholder="请输入手机号码" placeholder-class="placeholderClass"/>
				</view> 
				<view class="input_user" v-if="appIndex==2">
					<image src="/static/img/login/mima.png" mode="widthFix"></image>
					<input class="uni-input" v-model="codeInput.code" placeholder="请输入验证码"  maxlength="6" placeholder-class="placeholderClass"/> 
					<button class="getYanZhengMa"  :data-id="1"  :disabled="disabled" @click="GetVerification">{{countdown}} <text v-show="timestatus">秒重获</text></button>
				</view>
			</view>
		</view>
		<view class="loginBtnWarp">
			<button type="primary" @click="loginfn">登录</button>
			<view class="registerTextWarp">
				<text>还没有账号？</text>
				<text @click="setState">去注册</text>
			</view>
		</view>
		<view class="otherLoginWarp">
			<view class="otherLoginTitle">
				其他方式
			</view>
			<view class="otherLoginMain">
				<view class="otherimgBack">
					<image src="/static/img/login/weixin.png" mode=""></image>
				</view>
				<view class="otherimgBack">
					<image src="/static/img/login/qq@2x.png" mode=""></image>
				</view> 
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return { 
				 countdown:'获取验证码',
				 disabled:false,
				 timestatus:false,
				appIndex:1,
				passdinput:{
					user:"",
					password:""
				},
				codeInput:{
					user:"",
					code:""
				},
				typeNumber:'',
				datas:{}
			}
		},  
		methods: { 
			//用户获取验证码
			GetVerification(e){
				var that = this;
				if(that.codeInput.user === ''){
					uni.showToast({
						icon: "none",
					    title: "请输入手机号",
					    duration: 2000
					});  
				}else{
					
					that.typeNumber = e.target.dataset.id;
					this.$api.GetVerification({phone: that.codeInput.user,type:that.typeNumber}).then(res => {
					   // 获得数据 
					  if(res.code === 200){
						  that.disabled = true;
						   console.log(res) 
						 uni.showToast({
						        title: res.data.info,
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
			//用户登录功能
			loginfn(){
				if(this.appIndex === 1){
					var datas  = {
						phone: this.passdinput.user,
						type:this.appIndex,
						pwd:this.passdinput.password
					}
				}else if(this.appIndex === 2){
					var datas  = {
						phone: this.codeInput.user,
						type:this.appIndex,
						code:this.codeInput.code
					}
				}
				this.$api.login(datas).then(res => {
				   // 获得数据 
				  if(res.code === 200){
					  this.login(res.data.token);
					 // uni.setStorageSync(uerInfo, res.data.token)	
					//跳转到首页
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
					console.log(res+'222222222')
					uni.showToast({
						icon: "none",
					    title: "请求服务器失败",
					    duration: 2000
					}); 
				　　// 失败进行的操作
				})
				
			},
			updataLoginState(index){
				this.appIndex=index;
			},
			setState(){//设置当前登陆页面状态
				uni.$emit("setState",{state:4})
			},
			// 倒计时
			countDown(){
			    var that = this;
			    if(!that.countdown){                    
			        that.disabled = false;
			        that.timestatus = false;
			        that.countdown = '获取验证码';
			        clearInterval(that.clear);
			        }else{
			        --that.countdown;
			        }
			},
			//
			 ...mapMutations(['login'])
		},
		onLoad(option) {
			// console.log(option)
		}
	}
</script>

<style lang="scss" scoped>
	uni-button:after {
		border: none;
	}
	.signinWarp{
		.tapTopWarp{ 
			font-size:28rpx; 
			font-weight:400;
			color:rgba(255,255,255,1); 
			padding: 100rpx 0 50rpx 0;
			display: flex;
			justify-content: center;
			text:nth-child(2){
				padding:0 30rpx;
			}
		}
		.inputWarp{
			width: 600rpx;
			margin: auto;
			.input_user{
				width: 100%;
				height: 92rpx;
				background:rgba(255,255,255,0.3);
				box-sizing: border-box;
				border-radius:46rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 30rpx;
				position: relative;
				padding: 0 36rpx; 
				image{
					width: 36rpx;  
				}
				input{
					width: 100%;
					box-sizing: border-box;
					padding: 0 18rpx ;
					color: #ffffff;
				}
				.getYanZhengMa{
					background: none;
					border: none;
					position: absolute;
					right: 40rpx;
					height: 100%;
					line-height: 92rpx;
					// width: 138rpx;
					font-size:28rpx; 
					font-weight:400;
					color:rgba(19,190,111,1);
				}

			}
		}
		
		.loginBtnWarp{
			width: 600rpx;
			margin: auto;
			button{
				width: 100%;
				height:92rpx;
				line-height: 92rpx;
				background:rgba(19,190,111,0.5); 
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
				color:rgba(255,255,255,1);
				padding:38rpx 0 102rpx 0 ;
				text:nth-child(2){
					color:rgba(19,190,111,1);
				}
			}
		}
		.otherLoginWarp{
			.otherLoginTitle{
				text-align: center;
				font-size:28rpx; 
				font-weight:400;
				color:rgba(255,255,255,0.7); 
				padding: 0 0 40rpx 0;
			}
			.otherLoginMain{
				display: flex;
				width: 278rpx;
				margin: auto;
				justify-content: space-between;
				align-items: center;
				.otherimgBack{
					width:88rpx;
					height:88rpx;
					background:rgba(255,255,255,0.4); 
					border-radius:50%;
					display: flex;
					align-items: center;
					justify-content: center;
					image{
						width: 44rpx;
						height: 44rpx;
					}
				}
			}
		}
	}
	.placeholderClass{
		color:rgba(255,255,255,0.5); 
	}
</style>
