1.开发工具下载
地址：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
下载稳定版，看自己电脑配置选择下载32位或者64位版本。
2.下载后安装
一直点击下一步
3.注册小程序
地址：https://mp.weixin.qq.com/wxopen/waregister?action=step1&source=mpregister&token=&lang=zh_CN
4.注册后设置开发人员，体验人员权限等
5.修改小程序名，认证小程序
6.修改小程序中访问后台接口为本地接口
  例如：签到接口所在页面： pages/mao/maosc.js
7.  默认ip为127.0.0.1，  
   在 app.js第18行代码，改成自己的IP地址
8.login.js,record.js.register.js,toux.js,wode.js等文件中都有请求接口，都需要替换成新的 IP或域名，不要遗漏，可使用一键替换功能修改
9.重新编译，打包上传  
10.各个文件夹功能：
login : 登录
register：注册
maosc:签到功能
wode：个人中心界面
record：历史记录
toux：修改头像及用户名

