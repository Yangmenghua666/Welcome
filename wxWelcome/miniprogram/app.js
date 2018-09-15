//app.js
App({
  onLaunch: function () {
    var storageData = wx.getStorageSync('postList');
    if(!storageData){
      //如果postList缓存不存在
      var dataObj = require("data/data.js");
      wx.clearStorageSync();
      wx.setStorageSync('postList', dataObj.postList);
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
