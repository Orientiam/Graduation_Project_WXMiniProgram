// course-schedule.js  
Page({  
  data: {  
    weekDays: ['周一', '周二', '周三', '周四', '周五'],  
    morningClasses: [  
      {name: '数学', description: '微积分基础'},  
      {name: '英语', description: '大学英语'},  
      {name: '物理', description: '大学物理'},  
      {name: '计算机', description: '计算机基础'},  
      // Repeat for each day  
      // ...  
      // Copy and paste above objects 4 more times to simulate 5 days  
    ],  
    afternoonClasses: [  
      {name: '化学', description: '无机化学'},  
      {name: '体育', description: '体育课'},  
      {name: '历史', description: '世界历史'},  
      {name: '政治', description: '思想政治'},  
      // Repeat for each day  
      // ...  
      // Copy and paste above objects 4 more times to simulate 5 days  
    ],  
    showModal: false,  
    selectedCourse: {}  
  },  
  
  viewCourseDetails: function(e) {  
    const course = e.currentTarget.dataset.course;  
    this.setData({  
      showModal: true,  
      selectedCourse: course  
    });  
  },  
  
  closeModal: function() {  
    this.setData({  
      showModal: false,  
      selectedCourse: {}  
    });  
  }  
});