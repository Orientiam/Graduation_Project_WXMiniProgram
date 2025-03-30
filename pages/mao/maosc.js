// pages/mao/maosc.js
// const require = Require;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'XGVBZ-NBZWC-TN424-AF34K-TQW3T-CYB46'  // 需在腾讯位置服务官网申请
});
var amapFile = require('../../utils/amap-wx.130.js');
var geomapsdk = new amapFile.AMapWX({
  key:"09df520abce4e7da53b498ed98e966b4"
});


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'100001', //课程id
    img: null, //图片路径
    courseindex :'0',
    name: "", //
    size: "", //
    leibie: "", //
    jilu :[],
    user: wx.getStorageSync('username'),
    latitude:'',
    longitude:'',
    speed:'',
    accuracy:'',
    address: "",
    address2: '',
    userLocation: null,
    centerLatitude: 23.12463, // 圆心纬度
    centerLongitude: 113.36199, // 圆心经度
    radius: 500, // 指定范围半径，单位为米
    show :false
  },
  //图片放大
  prview() {
    var img = this.data.img;
    wx.previewImage({
      urls: [img],
    })
  },
  //前端5个选择框的修改事件代码
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
      cid: cid,
      cname :cname,
      teacher :teacher
    })
    
  },

  //上传图片
  shangchuan() {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    var  user =that.data.user
    var  cid =that.data.cid
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: getApp().globalData.kaoqinurl + 'student/face_idenitfy/'+user+'/'+cid, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            
          },
          success(res) {

            var data1 = res.data
            var data2 = JSON.parse(data1)
            console.log(data2)
            if(data2.msg=='ok'){
              wx.showToast({
                title: data2.data,
                icon: 'ico',
                duration: 1500
              })
            }else{
              wx.showToast({
                title: data2.data,
                icon: 'none',
                duration: 1500
              })
            }

          },
          
        })
      },
      complete() {
        wx.hideLoading({
          success: (res) => {},
        })
       
      }
    })
  },

  savereecode(){
    var that =this
    var data = {
      sid: this.data.user, 
      cid :this.data.cid

    }
    wx.request({
      url: getApp().globalData.kaoqinurl + 'student/face_idenitfy',
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user: wx.getStorageSync('username'),
      canIUseGetUserProfile: true
    })
    this.mycourse();    
    this.getLocation2();
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
  getLocation2(){
    console.log("开始")
    var that =this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const { latitude, longitude } = res;
        qqmapsdk.reverseGeocoder({
          location: { latitude, longitude },
          success: (resResult) => {
            const address = resResult.result.address_component;
            const address2 = resResult.result.formatted_addresses.standard_address;
            const formattedAddress = `${address.province} ${address.city} ${address.district}`;
            // 更新页面数据
            that.setData({
              address: formattedAddress,
              address2,
              userLocation: {
                latitude: res.latitude,
                longitude: res.longitude
              }
            });
            that.checkInRange();
          },
          fail: (err) => {
            console.error('逆地址解析失败', err);
          }
        });
      },
      fail(err) {
        console.error('获取位置失败', err);
      }
    });
    
    },
    checkInRange: function () {
      var userCoord = this.data.userLocation;
      var centerCoord = { latitude: this.data.centerLatitude, longitude: this.data.centerLongitude };
      
      var distance = this.calculateDistance(userCoord, centerCoord);
      
      if (distance <= this.data.radius) {
        console.log('用户在指定范围内，可以签到');
        wx.showToast({
          title: '用户在指定范围内，可以签到',          
          
        })
        this.setData({
          show :false
        })
        // 在这里添加签到逻辑
      } else {
        wx.showToast({
          title: '用户不在指定范围内，无法签到',          
          icon :'none'
        })
        console.log('用户不在指定范围内，无法签到');
        this.setData({
          show :true
        })
      }
    },
   
    calculateDistance: function(coord1, coord2) {
      const earthRadius = 6378137; // 地球平均半径，单位为米
      const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
      const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(coord1.latitude * Math.PI / 180) *
                Math.cos(coord2.latitude * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadius * c;
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

  },
  //查询我的课程
  mycourse: function () {
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
            var jilu =res.data.data
            var cid = jilu[0].c_id
            that.setData({
              jilu: jilu,
              cid :cid,
              courseindex :'0'
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
})