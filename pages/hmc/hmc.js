// packageA/pages/gzt/chuche/listchuche/listchuche.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  init() {
    let usercode = wx.getStorageSync('username');
    let that = this;
    wx.request({

      url: getApp().globalData.kaoqinurl + 'student/get_all_student_info',

      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.msg == 'ok') {
          that.setData({
            // recordList: res.RESULT.reverse()
            recordList: res.data.data
          })
        } else {
          wx.showToast({
            title: res.MESSAGE,
            icon: 'none',
            duration: 1000,
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  toUrl(e) {
    wx.navigateTo({
      url: '/pages/hmc/mx/mx?id=' + e.currentTarget.dataset.index,
    })
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
  daochu() {
    this.getexcel();
  },

  getexcel() {
    let usercode = wx.getStorageSync('username');
    let that = this;
    wx.request({

      url: getApp().globalData.kaoqinurl + 'student/save_student_info_to_excel',

      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.msg == 'ok') {
          that.daochu1()
        } else {
          wx.showToast({
            title: res.MESSAGE,
            icon: 'none',
            duration: 1000,
          })
        }
      },
    })
  },
  //导出
  daochu1() {
    wx.downloadFile({
      url: getApp().globalData.kaoqinurl + 'student/studentsinfo/roster.xlsx',
      // filePath: wx.env.USER_DATA_PATH + '/'+ '自定义名字.xlsx',
      success(res) {
        console.log('downloadFile', res)
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: 'xlsx',
          success: function (ress) {
            console.log('打开文档成功', ress)
          },
          fail: function (err) {
            console.log('保存失败：', err)
          }
        })
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})