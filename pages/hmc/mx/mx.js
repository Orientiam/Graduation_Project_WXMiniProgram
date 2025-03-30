
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    fullname: wx.getStorageSync('fullname'),
    user: wx.getStorageSync('username'),
    tempFilePaths: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id =options.id;

    this.setData({
      userid: id,
     
    })
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
  init: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.kaoqinurl+'student/get_student_info', //获取个人信息
      data: {
        "s_id":that.data.userid  //字符串
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
            if(name){
              wx.setStorageSync('fullname', name)
            }
            
            that.setData({
              sz : sz,
              usercode001: name,
              nj,
              bj
            })
          }else{
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
})