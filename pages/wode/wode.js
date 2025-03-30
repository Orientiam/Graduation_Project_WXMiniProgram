
// const app = getApp();


Page({onShareAppMessage: function (res) {
    return {
      title: 'iwork平台',
      path: '/pages/login/login',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  data: {
    userInfo: {},
    avatarUrl: '',
    img:'',
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    info:'',
    usercode001:"",
    user: wx.getStorageSync('username'),
    flag: wx.getStorageSync('flag'),
    hiddenModal:true
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clear(){
      // wx.removeStorageSync('logs') 
      // wx.removeStorageSync('username')   
      wx.clearStorageSync()
      wx.clearStorage()
      wx.reLaunch({
      url: "/pages/login/login",
    })
  },

  onLoad: function () {  
   var flag= wx.getStorageSync('flag')
   this.setData({
    flag
   })

  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   onShow: function () {
    var  img ='';  
    img =getApp().globalData.kaoqinurl+'student/profileImgs/' +this.data.user+".jpg?v="+ Math.random();
    console.log('图片路径:', img);
    //console.log('getUserProfile:', wx.getUserProfile==true);
    if (wx.getUserProfile) {
      this.setData({
        img,
        user: wx.getStorageSync('username'),
        canIUseGetUserProfile: true
      })
    }
     this.init()
  },
   onShareAppMessage: function (res) {
     return {
       title: 'iwork平台',
       path: '/pages/login/login',
       success: function (res) {
         // 转发成功
       },
       fail: function (res) {
         // 转发失败
       }
     }
   },
   init: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.kaoqinurl+'student/get_student_info', //获取个人信息
      data: {
        "s_id":that.data.user  //字符串
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
          if(res.data.msg=='ok'){
            var sz =res.data.data;
            // var img =sz.profileImg;
            var name =sz.s_name;
            var nj =sz.s_nj;
            var bj =sz.s_bj;
            var xy=sz.s_xy;
            if(name){
              wx.setStorageSync('fullname', name)
            }
            
            that.setData({
              //img: img,
              usercode001: name,
              nj,
              bj,
              xy
            })
          }
          else{
            that.setData({
              img: "/pages/img/menhu_05.png",
              usercode001: "猫用户",
            })
          }
      },
      fail() {
        wx.showToast({
          title: '连接超时',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  // 显示退出确认弹窗
  showLogoutConfirm() {
    console.log("退出登录按钮被点击");
    //pop up modal
    this.setData({ hiddenModal: false })
  },

  // 处理确认退出
  handleLogout() {
    // 执行退出逻辑
    this.clearUserData()
    this.navigateToLogin()
    
    // 关闭弹窗
    this.setData({ hiddenModal: true })
  },

  // 取消退出
  handleCancelLogout() {
    // 关闭弹窗
    this.setData({ hiddenModal: true })
  },
  // 清理用户数据
  clearUserData() {
    try {
      wx.clearStorageSync()
      wx.removeStorageSync('token')
      wx.removeStorageSync('userInfo')
    } catch (e) {
      console.error('清除存储失败:', e)
      this.showErrorToast('退出失败，请重试')
    }
  },

  // 跳转登录页
  navigateToLogin() {
    wx.reLaunch({
      url: "/pages/login/login",
      success: () => {
        this.showSuccessToast('已安全退出')
      },
      fail: (err) => {
        console.error('跳转失败:', err)
        this.showErrorToast('页面跳转异常')
      }
    })
  },

  // 显示成功提示
  showSuccessToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000
    })
  },

  // 显示错误提示
  showErrorToast(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2500
    })
  }
})
