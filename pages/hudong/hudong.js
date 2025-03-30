// pages/hudong/hudong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: wx.getStorageSync('username'),
    name: wx.getStorageSync('fullname'),
    inputContent: '',
    firstcourse:'',
    disabled: false,
    courseindex: '-1',
    inputLength: 0,
    jilu: [],
    cid: '',
    cid1 :'',
    cname: '',
    cname1: ''
  },
 
  //修改事件代码
  bindwupinChange: function (e) {
    var index = e.detail.value
    var cname = this.data.jilu[index].c_name
    var cid = this.data.jilu[index].c_id
    var teacher = this.data.jilu[index].teacher
    console.log(cname)
    console.log(cid)
    this.setData({
      courseindex: index,
      cid1: cid,
      cname1: cname,
      teacher: teacher
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.mycourse();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  // 处理输入框内容变化  
  handleInput: function (e) {
    this.setData({
      inputContent: e.detail.value,
      inputLength: e.detail.value.length
    });
  },

  sleep(time) {
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + time;
    while (true) {
      if (new Date().getTime() > endTime) {
        return;
      }
    }
  },

  init: function () {
    this.setData({ isSubmitting: true })
    var that = this;
    wx.showLoading("正在发送中");
    console.log('2');
    this.setData({
      disabled: true
    })
    var cid =that.data.cid1;
    if(!cid){
      cid==that.data.cid;
    }
    var cname =that.data.cname1;
    if(!cname){
      cname==that.data.cname;
    }
    if(!cid){
      wx.showToast({
        title: '请点击选择课程',
        icon :'none'
      })
      this.setData({
        disabled: false
      })
      return;
    }
    console.log('3');
    wx.request({
      url: getApp().globalData.kaoqinurl + 'student/sendmessage', //发送信息
      data: {
        "s_id": that.data.user, //字符串
        "msg": that.data.inputContent,
        "name": that.data.name,
        "c_id": cid,
        "c_name": cname
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.msg == 'ok') {
          wx.showToast({
            title: '提交成功',
          })
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
        that.sleep(5000);
        that.setData({
          disabled: false,
          isSubmitting:false
        })
      },
      fail() {
        wx.hideLoading();
        wx.showToast({
          title: '连接超时',
          icon: 'none',
          duration: 1000
        })
        that.sleep(2000);
        that.setData({
          disabled: false
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  //查询我的课程
  mycourse: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.kaoqinurl + 'student/get_all_mycourse', //获取历史记录
      data: {
        sid: that.data.user
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

        if (res.data.msg == 'ok') {
          var jilu = res.data.data
          var cid = jilu[0].c_id
          var cname = jilu[0].c_name
          that.setData({
            jilu: jilu,
            cid: cid,
            cname:cname,
            courseindex: '-1',
          })
        } else {
          that.setData({
            jilu: '0',
            courseindex: '-1'
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