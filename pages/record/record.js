
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result1: '',
    jilu:'',
    zc:'',
    user: wx.getStorageSync('username'),
    loading: false,
    hasMore: true,
    error: null,  // 错误状态
    filters: {
      statusColor: function (result) {
        const statusMap = {
          已签到: 'success',
          迟到: 'warning',
          缺勤: 'error'
        };
        return statusMap[result] || 'default';
      }
    }
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
      url: getApp().globalData.kaoqinurl +'student/home', //获取历史记录
      data: {
        s_id: this.data.user,
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

  }
})