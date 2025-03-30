//interface Course { name: string, time: string, location: string, teacher: string, weeks: string, day: string ,id:number,note:string,signDetail:signDetail,sr_id:number,type:string,week:number}
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    today:'',
    user :wx.getStorageSync('username'),
    url : getApp().globalData.kaoqinurl,
    array_weeks: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周','第9周', '第10周','第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周',],
    startDate: "",
    nowWeeks: 1 ,
    sign_valid:true,
    curriculum_msg: [],
    precise: [],//储存周几下面显示的精确日期
    curriculum: {
      "一": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "二": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "三": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "四": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "五": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "六": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "七": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
    },//课程表前端内容
    colors: [
      "#AEEC34",
      "#FFC44F",
      "#85B0FD",
      "#FEA17C",
      "#FF9392",
      "#D48DF9",
      "#7FCFF8",
      "#85B8CF",
      "#90C652",
      "#D8AA5A",
      "#FC9F9D",
      "#0A9A84",
      "#61BC69",
      "#12AEF3",
      "#E29AAD"],
  },
  /**
  * @function 跳转到对应的课程签到
  * @param {*e} 
  */
  async _goTo(e){
    //点击触发
  },
  /**
  * @function 根据学期开始日期判断今天属于哪一周
  * @param {*startDate} 学期开始日期
  */
  _getWeekNumber(startDate){
    const today = new Date(); // 获取当前日期
    const inputDate = new Date(startDate);
    if (today > inputDate) {
      const timeDiff = Math.abs(today.getTime() - inputDate.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 计算日期差
      if (daysDiff >= 18) {
        return 18;
      } else {
        const groupNumber = Math.ceil(daysDiff / 7);
        return groupNumber;
      }
    } else {
      this.setData({
        sign_valid:false,
      })
      return 1;
    }
  },
 
  switchWeek(e) {
    let index = parseInt(e.detail.value);
    this.setData({
      nowWeeks: index + 1,
    });
    
    this.init(index + 1);
  },
  /**
   * @function 计算显示这一周的什么课程
   * @param {*nowWeeks} 显示该学期第几周的课表
   */
  _getSchFromWeek(nowWeeks) {
    //计算日期
    this._getPreciseDates(this.data.startDate, nowWeeks);
    //console.log('nowWeeks=',nowWeeks);
    this._showCurriculums(nowWeeks, this.data.curriculum_msg);
  },
  /**
   * @function 返回输入日期的周一的日期
   * @return 日期字符串
   */
  _getMondayDate(inputDate) {
    const date = new Date(inputDate);
    const dayOfWeek = date.getDay(); // 获取输入日期是星期几
    const mondayTime = date.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000; // 找到那一周的周一的时间戳
    const mondayDate = new Date(mondayTime).toLocaleDateString(); // 转换为日期字符串
 
    return mondayDate;
  },
 
  /**
   * @function 根据输入的日期和过去的周数，获取并返回对应周的日期范围（从周一到周日）,即显示在课程表第一层的日期
   * @param {*startDate} 开始时间
   * @param {*nowWeeks} 第几周
   */
  _getPreciseDates(startDate, nowWeeks) {
    const oneDay = 24 * 60 * 60 * 1000; // 毫秒
    const mondayDate = new Date(this._getMondayDate(startDate)); // 找到开始日期的周一的日期
    mondayDate.setDate(mondayDate.getDate() + (7 * (nowWeeks - 1))); // 根据过去的周数计算所需周的周一日期
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(mondayDate.getTime() + i * oneDay);
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      weekDates.push(`${month}/${day}`);
    }
    this.setData({
      precise: weekDates,
    })
    return weekDates;
  },
  /**
   * @function 根据课程信息，更改前端课程表
   * @param {*curriculum_msg} 课程信息
   */
  _showCurriculums(nowWeeks, curriculum_msg) {
    //1检查这一周有没有这节课2更改curriculum里对应前端信息
    let c_temp = curriculum_msg;
    let c_exist = [];
    //编译所有课程信息
    c_temp.forEach(element => {
      //数据筛选1：有关键信息week,day,time才进行下一步操作
      if(element.week&&element.day&&element.time){
        //数据筛选2：该课程的上课周就是当前查看的周数
        if (element.week== nowWeeks) {
          c_exist.push(element);
        }
      }
    });
    let colors = this.data.colors;
    let new_curriculu = {
      "一": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "二": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "三": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "四": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "五": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "六": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
      "七": {
        1: { background_color: "", border_radius: "", text: "",id:0 },
        2: { background_color: "", border_radius: "", text: "",id:0 },
        3: { background_color: "", border_radius: "", text: "",id:0 },
        4: { background_color: "", border_radius: "", text: "",id:0 },
        5: { background_color: "", border_radius: "", text: "",id:0 },
        6: { background_color: "", border_radius: "", text: "",id:0 },
        7: { background_color: "", border_radius: "", text: "",id:0 },
        8: { background_color: "", border_radius: "", text: "",id:0 },
        9: { background_color: "", border_radius: "", text: "",id:0 },
        10: { background_color: "", border_radius: "", text: "",id:0 },
        11: { background_color: "", border_radius: "", text: "",id:0 },
      },
    };
    //遍历上一步筛选后的数据
    c_exist.forEach((item, index) => {
      let start = parseInt(item.time.split('-')[0]);
      let end = parseInt(item.time.split('-')[1]);
      //给课程上颜色
      for (let i = start; i <= end; i++) {
        new_curriculu[item.day][i].background_color = colors[index];
        new_curriculu[item.day][i].id=item.sr_id;
      }
      //上弧形边角
      new_curriculu[item.day][start].border_radius = "15rpx 15rpx 0 0";
      new_curriculu[item.day][end].border_radius = "0 0 15rpx 15rpx";
      if(start==end)
      new_curriculu[item.day][start].border_radius= "15rpx";
      //上文字
      new_curriculu[item.day][start].text = item.name + "@" + item.location;
    });
    //给前端赋值
    this.setData({
      curriculum: new_curriculu,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option){
    this.getCurrentDate()
    this.generateWeekDates()
    //let data = JSON.parse(option.data);
    var nowweeks=9;
    let data={
      startDate:"2024-12-04",
      nowWeeks : nowweeks,
      curriculum_msg:[
        {day:'五',name:"编译原理",teacher:"教师A",week:"9",time:"1-3",location:"第一课室大楼"},
        {day:'一',name:"大数据",teacher:"教师B",week:"9",time:"5-7",location:"计算机学院"},
        {day:'五',name:"编译原理",teacher:"教师A",week:"8",time:"1-3",location:"第一课室大楼"},
        {day:'一',name:"大数据",teacher:"教师B",week:"8",time:"5-7",location:"计算机学院"},
        {day:'二',name:"java",teacher:"教师S",week:"9",time:"1-2",location:"计算机学院"}
      ],
    }
    this.setData({
      curriculum_msg:data.curriculum_msg,
      startDate:data.startDate,
      nowWeeks:data.nowWeeks,
    });
    this._getSchFromWeek(data.nowWeeks);
    this.init(nowweeks);
  },
  // 获取今日日期
  getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    this.setData({
      todayDate: `${year}-${month}-${day}`
    })
  },

  // 生成本周日期（配合课程表头部显示）
  generateWeekDates() {
    const dates = []
    const today = new Date()
    
    // 获取本周一（假设每周从周一开始）
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1)
    
    // 生成7天日期
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      dates.push(
        `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      )
    }

    this.setData({
      precise: dates
    })
  },

  init: function (nowweeks) {
    var that = this;
    wx.request({
      url:getApp().globalData.kaoqinurl+ 'student/my_courseform', //获取个人信息
      data: {
        "s_id":that.data.user,  //字符串
        "week" :nowweeks
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

          if(res.data.msg=='ok'){
            var sz =res.data.data;
           
            that.setData({
              curriculum_msg:sz,
            });
            that._getSchFromWeek(nowweeks);
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

  /**
   * @function 将阿拉伯数字转换为简体中文数字
   */
  _convertToChinese(number) {
    var chineseNumber = '';
    switch (number) {
      case '1':
        chineseNumber = '一';
        break;
      case '2':
        chineseNumber = '二';
        break;
      case '3':
        chineseNumber = '三';
        break;
      case '4':
        chineseNumber = '四';
        break;
      case '5':
        chineseNumber = '五';
        break;
      case '6':
        chineseNumber = '六';
        break;
      case '7':
        chineseNumber = '七';
        break;
    }
    return chineseNumber;
  },
  onClickLeft(){
    wx.navigateBack();
  },
})