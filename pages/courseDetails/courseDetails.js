// pages/courseDetails/courseDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {} // 用于存储从上一个页面传递过来的课程信息 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从URL参数中解析课程信息  
    const courseName = options.courseName;  
    const startTime = options.startTime;  
    const endTime = options.endTime;  
    // 这里可以添加更多的解析，比如教师、教室、课程简介等  
    // 假设我们有一个函数可以从全局或本地存储中获取完整的课程信息  
    // 为了简化，我们直接构造一个模拟的课程对象  
    const mockCourse = {  
      courseName: courseName,  
      startTime: startTime,  
      endTime: endTime,  
      teacher: 'Prof. Smith',  
      classroom: 'Room 101',  
      description: 'This is a description of the course.'  
    };  
    this.setData({  
      course: mockCourse  
    });  
  },
  navigateBack: function() {  
    // 返回上一个页面  
    wx.navigateBack();  
  }  ,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})