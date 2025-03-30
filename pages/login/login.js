
var username
var pass
var inputValue

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'iwork平台',
      path: '/pages/login/login',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  data: {
    username: '',
    pass: '',
    phone: '',
    open: false,//默认不显示密码
    focus:false,//是否获取焦点
    inputValue: "",
    modalHidden2: true,
    modalHidden1: true,
    openid: '',
    session_key: '',
    message: '',
    code: '',
    str: '',
    passwordType:'true',
    isPasswordVisible:'false'
  },
  togglePassword:function(e){
    this.setData({
      isPasswordVisible: !this.data.isPasswordVisible,
      passwordType: !this.data.passwordType
    });
},


  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },

  modalChange1: function (e) {
    this.setData({
      modalHidden1: true
    })
  },

  /**
   * 监听账号输入
   */
  listeneruserInput: function (e) {

    var username = e.detail.value;


  },

  /**
   * 监听密码输入
   */
  listenerPasswordInput: function (e) {
    var pass = e.detail.value;

  },


  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value); //格式 Object {userName: "user", userPassword: "password"}
    //获得表单数据
    var objData = e.detail.value;
    console.log(objData)
    if (objData.username && objData.pass) {
     

    } else if (!objData.username) {
      that.setData({
        modalHidden2: false,
        message: '请输入手机号'
      })
      return
    } else if (!objData.pass) {
      that.setData({
        modalHidden2: false,
        message: '请输入密码'
      })
      return
    }
    wx.request({
        url:  getApp().globalData.kaoqinurl +  'student/login', //登录接口
        data: {
          s_id: objData.username,
          password: objData.pass,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          if(res.data.msg=="登录成功"){
            wx.setStorage({
              key: 'password',
              data: objData.pass
            });
            wx.setStorage({
              key: 'username',
              data: objData.username
            });
            wx.setStorage({
              key: 'flag',
              data: res.data.flag
            });
            wx.switchTab({
              url: '/pages/mao/maosc',
            }) 
          }else{
            that.setData({
              modalHidden2: false,
              message: "账号或密码错误"
            })
          }
        },
        fail: function (res) {
          console.log(".....fail.....");
          that.setData({
            modalHidden2: false,
            message: "网络/服务器异常,请重试"
          })
          wx.hideLoading({
            success: (res) => {},
          })

        }
      }),

      wx.showToast({
        title: '登录中',
        icon: 'loading',
        duration: 5000
      })


  },
  
  onLoad: function (options) {
    //有工号和联系电话直接跳转到工作台
    const version = wx.getSystemInfoSync().SDKVersion
    if (compareVersion(version, '2.11.2') < 0) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本太低，部分功能不能使用。请升级微信版本。'
      })
    } 
    //自动登录方法，如有需要打开注释
    if(wx.getStorageSync("username")&&wx.getStorageSync("password")){
      wx.switchTab({
        url: '/pages/mao/maosc',
      }) 
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
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
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  // 弹窗确认处理
  handleModalConfirm() {
    this.setData({ modalHidden2: true })
    // 可扩展其他确认后逻辑，如跳转页面等
  },
  modalCancel() {
    this.setData({ modalHidden2: true })
    // 可扩展其他确认后逻辑，如跳转页面等
  }
})