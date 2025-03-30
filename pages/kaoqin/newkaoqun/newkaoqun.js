// pages/gzt/uploadimg/uploadimg.js

var wxMarkerData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    l: 0,
    index2: 0,
    num: Math.random(),
    show: false,
    name: wx.getStorageSync('fullname'),
    user: wx.getStorageSync('username'),
    tempFilePaths: '',
    park: ['请选择', '上班卡', '下班卡', '出门卡', '回家卡', '其他'],
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    oneButton: [{
      text: '去设置'
    }],
    showOneButtonDialog: false
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  baidu() {
    wx.navigateTo({
      url: '/pages/gzt/kaoqun/baidu/baidu',

    })
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
    // this.getLocationzuobiao();
    this.getadd2();
    this.baiduditu();

  },

  openditu() {
    var that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          currentAddress: res.address,
          currestDesc: "(" + res.name + ")",
          x: res.longitude,
          y: res.latitude
        })
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {

        console.log('调用完成')
      }
    })
  },

  settime() {
    var that = this
    if (that.data.l == 0) {
      setTimeout(function () {
        that.baiduditu();
      }, 15000)
    }
  },

  baiduditu() {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'XzCAGB5pm5cEMphXlFZQGgXlhSXnqbQY'
    });
    var fail = function (data) {
      console.log(data)
    };

    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(wxMarkerData[0].latitude + "," + wxMarkerData[0].longitude);
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
      console.log(wxMarkerData[0])
      that.setData({
        currentAddress: wxMarkerData[0].address,
        currestDesc: "(" + wxMarkerData[0].desc + ")",
        add: wxMarkerData[0].address + "(" + wxMarkerData[0].desc + ")"
      })
      that.settime();
    }


    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../../img/marker_red.png',
      iconTapPath: '../../../img/marker_red.png'
    });
  },

  getLocationzuobiao: function () {
    var that = this
    var key = '2WWBZ-YDZKI-ERUGM-5S6E5-IWRBS-7DFZE'
    var SK = 'rQ03pQam08EcjwzNjmculadi7XRM5IZv'

    qqmapsdk = new QQMapWX({
      key: key
    })
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log("getLocationzuobiao success")
        console.log(res)
        app.globalData.longitude = res.longitude
        app.globalData.latitude = res.latitude

        var location = res.latitude + "," + res.longitude
        qqmapsdk.reverseGeocoder({
          location: location,
          success: function (res) {
            console.log("调用成功")
            var province = res.result.ad_info.province;
            var city = res.result.ad_info.city;
            var rough = res.result.formatted_addresses.recommend;
            console.log(rough)
            console.log(city)
            console.log(province)
            that.setData({
              // x: res.longitude, 
              // y: res.latitude,        
              add: province + city + rough
            })
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            console.log(res);
          }
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
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  getaddre: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          // address,
          success(res) {
            console.log(res)
          }
        })
      }
    })





  },
  getadd2: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(longitude, latitude)
        that.setData({
          //    add: res.data.add,
          x: longitude,
          y: latitude
        })
        //  that.getaddress(longitude, latitude);
      }
    })
  },
  getaddress: function () {
    var that = this
    wx.request({
      //
      url: 'https://fwgj.ofilm.com/kaoqun/weixin/getaddress', //仅为示例，并非真实的接口地址
      data: {
        x: x,
        y: y,

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 0) {
          that.setData({
            add: res.data.add,
            x: x,
            y: y
          })
        }
      },
      fail() {
        console.log('......fail......')
      }
    })
  },

  getimg: function () {
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
    if (!that.data.add || that.data.add == '()') {
      wx.showToast({
        title: '请获取位置！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (that.data.x == 0 && that.data.y == 0) {
      wx.showToast({
        title: '请获取位置！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (!that.data.sxban || that.data.sxban == '请选择') {
      wx.showToast({
        title: '请选择上下班！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    var user = that.data.user
    if (!user) {
      user = wx.getStorageSync('username')
    }
    this.setData({
      show: true
    })
    wx.uploadFile({
      url: 'https://fwgj.ofilm.com/kaoqun/logo/newgetimg',
      // url: 'http://10.71.7.77:8081/kaoqun1/logo/newgetimg',
      filePath: tempFilePaths[0],
      name: 'file',
      header: {
        'content-type': 'application/json' // 默认值
      },
      formData: {
        x: that.data.x,
        y: that.data.y,
        code: that.data.user,
        name: that.data.name,
        openid: wx.getStorageSync('openid'),
        sxban: that.data.sxban,
        adress: that.data.add,
      },
      success(res) {
        var data = JSON.parse(res.data)
        console.log(data.code)
        that.setData({
          show: false
        })
        if (data.code == '0') {
          wx.showToast({
            title: '提交成功',
            icon: 'ico',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        } else {
          wx.showToast({
            title: data.msg,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.bindAuthLocation()
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
  tapDialogButton: function () {
    this.setData({
      showOneButtonDialog: false
    })
    var that = this;
    //打开设置页面进行授权设置
    wx.openSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          //获取当前位置信息
          that.getadd2() //获取当前位置信息
        }
      }
    });

  },
  //授权位置按钮
  bindAuthLocation: function (e) {
    var that = this;
    //获取授权结果查看是否已授权位置
    wx.getSetting({
      success: (res) => {
        console.log(res)
        if (res.authSetting['scope.userLocation'] == undefined && !res.authSetting['scope.userLocation']) //未授权位置（首次进来页面）
        {
          console.log("未授权位置（首次进来页面）")
          that.setData({
            showOneButtonDialog: true
          })
        } else if (res.authSetting['scope.userLocation'] === false) //未授权位置(点击官方授权弹框取消按钮后)
        {
          console.log("未授权位置(点击官方授权弹框取消按钮后)")
          that.setData({
            showOneButtonDialog: true
          }) //显示自定义授权框

        } else { //已授权
          console.log("已授权")
          that.getadd2() //获取当前位置信息
        }

      }
    })
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