// pages/fengguang/fengguang.js
Page({
  data:{
    user :wx.getStorageSync('username'),
    url : getApp().globalData.kaoqinurl,

  },
  
  init: function () {
    var that = this;
    wx.request({
      url:getApp().globalData.kaoqinurl+ 'student/my_faces', //获取个人信息
      data: {
        "sid":that.data.user  //字符串
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

          if(res.data.msg=='ok'){
            var sz =res.data.data;
            for(var i=0;i<  sz.length;i++){
                sz[i].image =that.data.url+ sz[i].image
            }
            that.setData({
              sz
            })
          }else{
            wx.showToast({
              title: '暂无数据',
              icon:'none'
              
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

  onSchoolTap: function (e) {
    const index = e.currentTarget.dataset.index;
    const image = this.data.sz[index].image;
    this.setData({
      selectedImage: image
    });
    console.log(`点击了第 ${index + 1} 项，图片: ${image}`);
  },

  handleImageError: function (e) {
    console.error('图片加载失败', e);
    // 可以设置默认图片
    const image = e.currentTarget;
    image.src = '/images/default.png'; // 默认图片路径
  },

  handlePreviewImageError: function (e) {
    console.error('预览图片加载失败', e);
    // 可以设置默认图片
    const image = e.currentTarget;
    image.src = '/images/default.png'; // 默认图片路径
  },
  // 缩略图点击处理
  handleThumbnailTap(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.sz[index]
    
    this.setData({
      activeIndex: index,
      selectedImage: item.hdImage || item.image,
      scale: 1,
      offsetX: 0,
      offsetY: 0
    })
  },

  // 缩放控制
  handleZoomIn() {
    this.setData({ scale: Math.min(this.data.scale + 0.2, 3) })
  },

  handleZoomOut() {
    this.setData({ scale: Math.max(this.data.scale - 0.2, 0.5) })
  },

  handleReset() {
    this.setData({ 
      scale: 1,
      offsetX: 0,
      offsetY: 0
    })
  },

  // 手势处理
  handleTouchStart(e) {
    this.setData({
      startX: e.touches[0].clientX - this.data.offsetX,
      startY: e.touches[0].clientY - this.data.offsetY
    })
  },

  handleTouchMove(e) {
    if (this.data.scale === 1) return
    
    const newX = e.touches[0].clientX - this.data.startX
    const newY = e.touches[0].clientY - this.data.startY
    
    this.setData({
      offsetX: newX,
      offsetY: newY
    })
  },

  // 全屏切换
  handleFullScreen() {
    wx.previewImage({
      current: this.data.selectedImage,
      urls: this.data.sz.map(item => item.hdImage || item.image)
    })
  },

  // 错误处理
  handleImageError(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      [`sz[${index}].imageError`]: true
    })
  },

  handlePreviewError() {
    wx.showToast({
      title: '图片加载失败',
      icon: 'none'
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    this.init();
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
