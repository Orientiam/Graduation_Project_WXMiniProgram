
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fieldList: [
      { label: '姓名', name: 'name', value: '张三', disabled: true },
      { label: '专业', name: 'zy', placeholder: '请输入专业' },
      { label: '学院', name: 'xy', placeholder: '请输入学院' },
      { label: '年级', name: 'nj', placeholder: '请输入年级', type: 'number' },
      { label: '班级', name: 'bj', placeholder: '请输入班级' },
      {
        label: '性别',
        name: 'xb', 
        type: 'selector',
        range: ['男', '女'],
        value: 0,
        placeholder: '请选择性别'
      },
      { label: '年龄', name: 'age', placeholder: '请输入年龄', type: 'number' },
      { label: '联系电话', name: 'dh', placeholder: '请输入手机号码', type: 'number' },
      { label: '职务', name: 'zw', placeholder: '请输入职务' },
      {
        label: '政治面貌',
        name: 'zzmm',
        type: 'selector',
        range: ['党员', '团员', '群众'],
        value: 0,
        placeholder: '请选择政治面貌'
      }
    ],
    show:false,
    fullname: wx.getStorageSync('fullname'),
    user: wx.getStorageSync('username'),
    tempFilePaths: '',
    isSubmitting:false
  },
  handleSubmitAction() {   
    // 执行表单提交
    this.formSubmit();
    // 执行上传图片
    this.uploadimg();
  },
  // 选择器改变事件
  bindPickerChange(e) {
    console.log('事件触发了');
    // 从 dataset 中获取字段名，重命名为 fieldName
    const { name: fieldName } = e.currentTarget.dataset;
    const value = e.detail.value;
    
    // 使用 fieldName 作为标识匹配字段
    const fieldList = this.data.fieldList.map(item => {
      return item.name === fieldName 
        ? { ...item, value }  // 匹配时更新值
        : item;                // 否则返回原值
    });
    this.setData({ fieldList });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      fullname: wx.getStorageSync('fullname'),
      user: wx.getStorageSync('username'),
     
    })
  },
  chooseimage: function() {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },


  getimg: function() {
    wx.getSavedFileList({
      success(res) {
        console.log(res.fileList)

        // if (res.size>100){
        //  wx.showToast({
        //    title: '文件过大，请重新选择',
        //  })
        // }
      },
      complete(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },


  uploadimg: function() {
    var that = this
    const tempFilePaths = that.data.tempFilePaths
    if (!tempFilePaths){
      wx.showToast({
        title: '请选择图片！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    this.setData({
      show: true
    })
    var account =that.data.user;
    console.log(account)
    wx.uploadFile({
      url: getApp().globalData.kaoqinurl+'student/update_profileImg/'+account, 
      filePath: tempFilePaths[0],
      name: 'image',
      account:account,
      header: {
        'account': account, 
        'content-type': 'application/json' // 默认值
      },
      formData: {
        account: account, 
      },
      data: {
        "account": account,
      },
      success(res) {     
        console.log(res)  
        var data = JSON.parse(res.data)
        console.log(data.msg)
        that.setData({
          show: false
        })
        if (data.msg == 'ok') {
          wx.showToast({
            title: '提交成功',
            icon: 'ico',
            duration: 1500
          })
          setTimeout(function() {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else  {
          wx.showToast({
            title: '参数错误，请退出重试',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail() {
        that.setData({
          show: false
        })
        wx.showToast({
          title: '网络异常，请查看网络！',
          icon: 'none',
          duration: 1500
        })
      }
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
  
  formSubmit(e){
    this.setData({
      isSubmitting:true
    });
    var that =this
    var formData = e.detail.value;
    console.log(formData)
    var data = {
      s_id: that.data.user, //id
      s_name: formData.name,
      s_zy: formData.zy,
      s_xy: formData.xy,
      s_nj: formData.nj,
      s_bj: formData.bj,
      s_zzmm: formData.zzmm,
      s_nl: formData.age,
      s_zw: formData.zw,
      s_xb: formData.xb,
      s_lxdh: formData.dh,
    }
    wx.request({
      url: getApp().globalData.kaoqinurl+'student/update_student_info',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          show: false,
          isSubmitting:false
        })
        if (res.data.msg=="ok") {
          console.log(res);
        } else {
          wx.showToast({
            title:'保存失败',
            icon: 'none'
          })
        }
      },
      fail() {
        this.setData({
          isSubmitting:false
        })
        wx.showToast({
          title: '请检查您的网络',
          icon: 'none'
        })
      }
    })
  },
})