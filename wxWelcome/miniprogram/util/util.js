/**
 * 将时间戳转化为多少分钟前，多少小时前，几天前，几月前
 * para:
 * recordTime 时间戳
 * yearFlag 是否要年份
 */
function getDiffTime(recordTime,yearsFlag){
  if(recordTime){
    recordTime = new Date(parseFloat(recordTime) * 1000);
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var now = new Date();
    var diff = now - recordTime;
    var result = '';
    if(diff < 0){
      return result;
    }
    //计算几周前
    var weekR = diff / (7 * day);
    //几天前
    var dayC = diff / day;
    var hourC = diff / hour;
    var minC = diff / minute;
    if(weekR >= 1){
      var formate = 'MM-dd hh:mm';
      if(yearsFlag){
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.formate(formate);
    }
    else if(dayC == 1 || (hourC < 24 && recordTime.getDate() != now.getDate())){
      result = '昨天' + recordTime.formate('hh:mm');
      return result;
    }
    else if(dayC > 1){
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.formate(formate);
    }
    else if(hourC >= 1){
      result = parseInt(minC) + '分钟前';
      return result;
    }
    else{
      result = '刚刚';
      return result;
    }
  }
  return '';
}

  //拓展Date方法，得到格式化的日期格式
 (function initTimeFormat(){
  Date.prototype.formate = function(format){
    var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  };
})()

module.exports = {
  getDiffTime:getDiffTime
}