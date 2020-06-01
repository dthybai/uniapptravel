import request from '@/common/request.js'
const api = {}
// 登录接口
api.login = params => request.globalRequest(`api/common/plogin`, 'POST', params, 1);
//获取验证码
api.GetVerification = params => request.globalRequest(`api/common/sms`, 'POST', params, 1);
//忘记密码
api.ForgetPassword = params => request.globalRequest(`api/common/forgetPwd`, 'POST', params, 1);
//用户注册
api.register = params => request.globalRequest(`api/common/register`, 'POST', params, 1,console.log(params));
//api.tvExMonitoring = params => request.globalRequest(`business/tv-ex-monitoring/1000?`, 'GET', params, 1);
//获取首页
api.getindex =params => request.globalRequest(`api/shop/index/index`, 'GET' , params, 4)
//获取热门搜索
api.hotkeyword =params => request.globalRequest(`api/shop/cate/hotkeyword`, 'GET' , params, 4)
//获取分类下得视频
api.videoslist =params => request.globalRequest(`api/shop/cate/videoslist`, 'GET' , params, 4)
//搜索获取视频列表
api.videolist =params => request.globalRequest(`api/shop/videos/list`, 'GET' , params, 4)
//搜索获取门票列表
api.goodslist =params => request.globalRequest(`api/shop/goods/list`, 'GET' , params, 4)
//获取视频详情
api.videodetails =params => request.globalRequest(`api/shop/videos/detail`, 'GET' , params, 4)
//获取视频评论列表
api.videoinfolist =params => request.globalRequest(`api/shop/comment/info`, 'GET' , params, 4)
//获取门票详情
api.ticketdetails = params => request.globalRequest(`api/shop/goods/detail`, 'GET', params, 4)
//选择门票日期查询
api.ticketdata = params => request.globalRequest(`api/shop/goods/time`, 'GET', params, 4)
//选择持票人
api.addresscontact = params => request.globalRequest(`api/shop/address/contact`, 'GET', params, 4)
//获取门票详情中的车辆列表
api.carslist= params => request.globalRequest(`api/shop/cars/info`, 'GET', params, 4)
//获取常用联系人列表
api.addressinfo = params => request.globalRequest(`api/shop/address/info`, 'GET', params, 4)
//删除联系人
api.deladdressinfo = params => request.globalRequest(`api/shop/address/info`, 'DELETE', params, 4)
//新增联系人
api.addinfo = params => request.globalRequest(`api/shop/address/info`, 'POST', params, 4)
//获取浏览视频门票列表
api.historylist = params => request.globalRequest(`api/shop/history/list`, 'GET', params, 4)
//获取我的收藏视频门票列表
api.collectlist = params => request.globalRequest(`api/shop/collect/info`, 'GET', params, 4)
//获取我的信息
api.userinfo = params => request.globalRequest(`api/user/info`, 'GET', params, 4)
//获取明细
api.accountlist = params => request.globalRequest(`api/shop/account/list`, 'GET', params, 4)
//获取我的账户
api.accountinfo = params => request.globalRequest(`api/shop/account/info`, 'GET', params, 4)

//帮助反馈获取常见问题列表
api.opinionlist = params => request.globalRequest(`/api/shop/opinion/info`, 'GET', params, 4)

// 首页-获取 tabs
api.gettype = params => request.globalRequest(`admin/type/gettype`, 'GET', params, 1);
// 首页-获取商户信息
api.getAduse =params => request.globalRequest(`admin/type/getAduse`, 'GET' , params, 1);
// 首页-获取商品列表
api.getGoods =params => request.globalRequest(`admin/type/getGoods`, 'GET' , params, 1);
// 首页-获取轮播图
api.getBanner =params => request.globalRequest(`admin/type/getBanner`, 'GET' , params, 1);

// 个人中心-获取用户个人信息
api.getUserInfo =params => request.globalRequest(`admin/type/getUserInfo`, 'GET' , params, 1);

// 投诉建议-获取商户信息和投诉类型
api.complain =params => request.globalRequest(`admin/type/complain`, 'GET' , params, 1);
// 投诉建议-提交投诉
api.addcompl =params => request.globalRequest(`admin/type/addcompl`, 'POST' , params, 1);

// 获取商品详情
api.getGoodsinfo =params => request.globalRequest(`admin/type/getGoodsinfo`, 'GET' , params, 1);
// 幸运免单
api.fortune =params => request.globalRequest(`admin/type/fortune`, 'POST' , params, 1);

// 用户条款
api.seruser =params => request.globalRequest(`admin/type/seruser`, 'GET' , params, 1);

// 一元抢购 获取数据
api.sunp =params => request.globalRequest(`admin/type/sunp`, 'GET' , params, 1);
// 一元抢购 上传数组
api.enyj =params => request.globalRequest(`admin/type/enyj`, 'POST' , params, 1);

// 一元抢购 抽奖
api.drawfaff =params => request.globalRequest(`admin/type/drawfaff`, 'POST' , params, 1);

// 幸运免单-抽奖
api.gogive =params => request.globalRequest(`admin/type/gogive`, 'POST' , params, 1);

// 我的订单  admin/type/getOrder （1 普通红包 2 中奖红包 3未中奖红包
api.getOrder =params => request.globalRequest(`admin/type/getOrder`, 'GET' , params, 1);

export default api