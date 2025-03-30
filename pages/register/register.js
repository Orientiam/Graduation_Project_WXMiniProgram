// pages/gzt/twcl/twcl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usercode: wx.getStorageSync("username"),
    openid: wx.getStorageSync('openid'),
    title:"注册",
    isPasswordVisible1:false,
    isPasswordVisible2:false,
    passwordType1: 'true',  // 新增类型控制
    passwordType2: 'true'  // 新增类型控制
  },
  togglePasswordVisibility1: function (e) {
      this.setData({
        isPasswordVisible1: !this.data.isPasswordVisible1,
        passwordType1: !this.data.passwordType1
      });
  },
  togglePasswordVisibility2: function (e) {
    this.setData({
      isPasswordVisible2: !this.data.isPasswordVisible2,
      passwordType2: !this.data.passwordType2
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var  vshow =options.vshow;
   var title;
   if(vshow==1){
    title ="注册";
   }
   if(vshow==2){
    title ="忘记密码";
   }
   if(vshow==3){
    title ="修改密码";
   }
   this.setData({
    title
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit(e) {
    
    var formData = e.detail.value;
    console.log(formData)
    if(!formData.account){
      wx.showToast({
        title: '请输入学号！！',
        icon: 'none'
      })
      return
    }
    if(formData.account.length<13){
      wx.showToast({
        title: '学号长度为13位！',
        icon: 'none'
      })
      return
    }
    if (formData.password !=  formData.password2 ) {
      wx.showToast({
        title: '二次输入密码不一致',
        icon: 'none'
      })
      return
    }
    var flag =0;
    if(formData.zw=='班长'){
      flag =1;
    }
    var data = {
      flag : flag ,
      s_id: formData.account,
      s_name: formData.username,
      s_password: formData.password,
    }
    wx.request({
      url: getApp().globalData.kaoqinurl + 'student/register',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.msg=="ok") {
          console.log(res)
          wx.showToast({
            title: '注册成功',
            icon: 'none'
          })
          wx.setStorage({
            key: 'fullname',
            data: formData.username
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          wx.showToast({
            title:'注册失败',
            icon: 'none'
          })
        }
      },
      fail() {
        wx.showToast({
          title: '请检查您的网络',
          icon: 'none'
        })
      }
    })

  }
})