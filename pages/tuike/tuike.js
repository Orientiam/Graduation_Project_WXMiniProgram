
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result1: '',
    jilu:'',
    zc:1,
    user: wx.getStorageSync('username'),
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: wx.getStorageSync('username'),
     
    })
  },
 

  init: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.kaoqinurl +'student/get_all_mycourse', //获取历史记录
      data:{
        sid :that.data.user
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

          if(res.data.msg=='ok'){
            that.setData({
              jilu: res.data.data
            })
           
          }else{
           
            that.setData({
              jilu: '0'
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init();
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
  xuanke(e){
    var that = this;
    var itemId = e.currentTarget.dataset.itemId;
    console.log('按钮的ID是：', itemId);
    wx.request({
      url: getApp().globalData.kaoqinurl +'student/unchoose_course', //获取历史记录
      data: {
        sid: that.data.user,
        cid : itemId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

          if(res.data.msg=='ok'){
             wx.showToast({
               title: res.data.data,
             })
             that.init();
          }else{
            wx.showToast({
              title: res.data.data,
              icon :"none"
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
  }
})