var wxMarkerData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    l: 0,
    sid: wx.getStorageSync('username'),
    index2: 0,
    num: Math.random(),
    show: false,
    name: wx.getStorageSync('fullname'),
    user: wx.getStorageSync('username'),
    tempFilePaths: '',
    park: ['请选择', '上班卡', '下班卡'],
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    locationError: false,       // 定位错误状态
    currentAddress: '',         // 详细地址信息
    currestDesc: '',            // 附加描述信息
    isLocating: false,          // 防止重复点击
    locationRetryCount: 0,      // 重试次数
    maxRetryCount: 3            // 最大重试次数
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!name || !user) {
      var name = wx.getStorageSync('fullname');
      var user = wx.getStorageSync('username');
      //  user ='NF1203'
      this.setData({
        name: name,
        user: user,
      })
    }
    this.initializeLocation();
  },
  // 初始化定位
  initializeLocation() {
    this.checkLocationPermission().then(() => {
      this.getLocationDetails();
    }).catch(this.handleLocationError);
  },

  // 检查定位权限
  checkLocationPermission() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            resolve();
          } else {
            this.requestLocationPermission().then(resolve).catch(reject);
          }
        },
        fail: reject
      });
    });
  },

  // 请求定位权限
  requestLocationPermission() {
    return new Promise((resolve, reject) => {
      wx.authorize({
        scope: 'scope.userLocation',
        success: resolve,
        fail: (err) => {
          this.showAuthGuideModal();
          reject(err);
        }
      });
    });
  },

  // 显示授权引导弹窗
  showAuthGuideModal() {
    wx.showModal({
      title: '需要位置权限',
      content: '请允许我们获取您的位置信息以提供更好的服务',
      confirmText: '去设置',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting();
        }
      }
    });
  },

  // 获取地理位置信息
  getLocationDetails() {
    if (this.data.isLocating) return;

    this.setData({ isLocating: true });
    wx.showLoading({ title: '定位中...', mask: true });

    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (res) => {
        this.reverseGeocode(res);
      },
      fail: (err) => {
        wx.hideLoading();
        this.handleLocationError(err);
      },
      complete: () => {
        this.setData({ isLocating: false });
      }
    });
  },

  // 逆地址解析
  reverseGeocode(location) {
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: '09df520abce4e7da53b498ed98e966b4',
        location: `${location.longitude},${location.latitude}`,
        radius: 1000,
        extensions: 'all'
      },
      success: (res) => {
        if (res.data.status === '1') {
          const info = res.data.regeocode;
          this.setData({
            currentAddress: info.formatted_address || '',
            currestDesc: info.addressComponent.neighborhood.name || info.addressComponent.township || '',
            locationError: false
          });
        } else {
          this.handleLocationError({ errMsg: res.data.info });
        }
      },
      fail: this.handleLocationError,
      complete: wx.hideLoading
    });
  },

  // 刷新定位
  refreshLocation() {
    if (this.data.locationRetryCount >= this.data.maxRetryCount) {
      wx.showToast({ title: '已达最大重试次数', icon: 'none' });
      return;
    }

    this.setData({ locationRetryCount: this.data.locationRetryCount + 1 });
    this.getLocationDetails();
  },

  // 统一错误处理
  handleLocationError(err) {
    console.error('定位失败:', err);
    this.setData({
      locationError: true,
      currentAddress: '定位信息获取失败',
      currestDesc: this.getErrorDesc(err.errMsg)
    });
    wx.hideLoading();
    wx.showToast({
      title: this.getErrorToastText(err.errMsg),
      icon: 'none',
      duration: 3000
    });
  },

  // 错误信息映射
  getErrorDesc(errMsg) {
    const errorMap = {
      'auth deny': '用户拒绝授权',
      'location unauthorized': '位置权限未开启',
      'getLocation:fail': '定位服务不可用',
      'timeout': '定位超时',
      default: '未知错误'
    };
    return errorMap[errMsg.toLowerCase()] || errorMap.default;
  },

  getErrorToastText(errMsg) {
    return `定位失败：${this.getErrorDesc(errMsg)}，请检查定位设置`;
  }, 

  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [ 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },







  bindPickerChange2: function (e) {
    var liuc = this.data.park
    var index2 = e.detail.value
    this.setData({
      index2: index2,
      sxban: liuc[index2]
    })
  },

  uploadimg: function () {
    var that = this
    const tempFilePaths = that.data.tempFilePaths
    if (!tempFilePaths) {
      wx.showToast({
        title: '请选择图片！',
        icon: 'none',
        duration: 1500
      })
      return
    }


    var user = that.data.user
    if (!user) {
      user = wx.getStorageSync('username')
    }
    console.log("user:"+user)
    this.setData({
      show: true
    })
    wx.uploadFile({
      url: getApp().globalData.kaoqinurl +'student/upload_faces/'+user,
      // url: 'http://10.71.8.230:8081/kaoqun/logo/newgetimg',
      method: 'POST',
      filePath: tempFilePaths[0],
      name: 'image',
      sid :user,
      header: {
        'content-type': 'application/json' // 默认值
      },
      formData: {
        'sid': user,
      },
      success(res) {
        var data = JSON.parse(res.data)
        console.log(data.code)
        that.setData({
          show: false
        })
        if (data.msg == 'ok') {
          wx.showToast({
            title: data.data,
            icon: 'ico',
            duration: 1500
          })
          that.savereecode();
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        } else {
          wx.showToast({
            title: data.data,
            icon: 'none',
            duration: 3000
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

  savereecode(){
    var that =this
    var data = {
      sid: this.data.user, //猫类别
      // cat_explain: this.data.name,
      // time :new Date(),
      // account: this.data.user,
    }
    wx.request({
      url: getApp().globalData.kaoqinurl +'student/upload_facesfeature',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.msg=="ok") {
          console.log(res)
        
        } else {
          wx.showToast({
            title:'保存失败',
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
    this.setData({
      l: 1
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      l: 1
    })
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
  getBase64Image: function (img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
  }
})