
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result1: '',
    jilu:'',
    originalList: [], // 新增原始数据存储
    zc:'',
    selectedCount: 0,
    searchKeyword:'',
    user: wx.getStorageSync('username')
  },
  // 搜索处理
  handleSearch(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.filterCourses();
  },

  // 课程选择
  handleSelect(e) {
    const item = e.currentTarget.dataset.item;
    const index = this.data.jilu.findIndex(c => c.c_id === item.c_id);
    
    this.setData({
      [`jilu[${index}].selected`]: !item.selected,
      selectedCount: item.selected ? 
        this.data.selectedCount - 1 : 
        this.data.selectedCount + 1
    });
  },

  // 完善确认选课功能
handleConfirm() {
  const selectedCourses = this.data.jilu.filter(c => c.selected);
  if (selectedCourses.length === 0) {
    wx.showToast({ title: '请先选择课程', icon: 'none' });
    return;
  }

  wx.showLoading({ title: '批量提交中...', mask: true });
  
  // 创建所有请求的Promise数组
  const requests = selectedCourses.map(course => {
    return new Promise((resolve) => {
      wx.request({
        url: getApp().globalData.kaoqinurl + 'student/choose_course',
        method: 'POST',
        data: {
          sid: this.data.user,
          cid: course.c_id
        },
        success: resolve
      });
    });
  });

  // 并行处理所有请求
  Promise.all(requests).then(results => {
    const successCount = results.filter(res => res.data.msg === 'ok').length;
    const errorCount = results.length - successCount;
    
    wx.showToast({
      title: `成功${successCount}门，失败${errorCount}门`,
      icon: 'none'
    });
    // 重新加载数据保持同步
    setTimeout(() => { this.init(); }, 300);
    //将select重置为0
    this.setData({ selectedCount: 0 }); // 新增这一行
  }).catch(() => {
    wx.showToast({ title: '部分操作失败', icon: 'none' });
  }).finally(() => {
    wx.hideLoading();
  });
},

  // 优化过滤方法
filterCourses() {
  const keyword = this.data.searchKeyword.trim();
  if (!keyword) {
    this.setData({ jilu: this.data.originalList });
    return;
  }
  
  const filtered = this.data.originalList.filter(c => 
    (c.c_name && c.c_name.includes(keyword)) ||
    (c.teacher && c.teacher.includes(keyword))
  );
  this.setData({ jilu: filtered });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: wx.getStorageSync('username'),
     
    })
  },
 

 // 修改初始化方法
init: function () {
  var that = this;
  wx.request({
    url: getApp().globalData.kaoqinurl + 'student/get_all_course',
    success: function (res) {
      if (res.data.msg === 'ok') {
        that.setData({
          originalList: res.data.data, // 存储原始数据
          jilu: res.data.data         // 显示数据
        });
      } else {
        that.setData({
          originalList: [],
          jilu: []
        });
      }
    }
  });
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
  // 修改xuanke方法
xuanke(e) {
  const that = this;
  const itemId = e.currentTarget.dataset.itemId;
  
  wx.showLoading({ title: '提交中...', mask: true });
  
  wx.request({
    url: getApp().globalData.kaoqinurl + 'student/choose_course',
    data: {
      sid: that.data.user,
      cid: itemId
    },
    method: 'POST',
    success: function (res) {
      wx.hideLoading();
      if (res.data.msg === 'ok') {
        // 更新前端状态
        const index = that.data.jilu.findIndex(c => c.c_id === itemId);
        if (index !== -1) {
          const newList = [...that.data.jilu];
          newList[index] = { 
            ...newList[index], 
            selected: true,
            disabled: true
          };
        }
        wx.showToast({ title: '选课成功' });
      } else {
        wx.showToast({ title: res.data.data || '操作失败', icon: 'none' });
        
      }
    },
    fail() {
      wx.hideLoading();
      wx.showToast({ title: '网络连接失败', icon: 'none' });
    }
  });
}
})