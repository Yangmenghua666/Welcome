class DBPost{
  constructor(postId){
    this.storageKeyName = "postList";
    this.postId = postId;
  }

  //得到全部文章的信息
  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require("../data/data.js").postList;
      this.execSetStorageSync(res);
    }
    return res;
  }
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }
  //通过postId获取item
  getPostItemById(){
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for(var i=0;i<len;++i){
      if(postsData[i].postId == this.postId){
        return {
          index:i,
          data:postsData[i]
        }
      }
    }
  }
  //收藏
  collect(){
    return this.updatePostData('collect');
  }
  //点赞
  up(){
    return this.updatePostData('up');
  }
  //更新缓存数据
  updatePostData(category,newComment)
  {
    var itemData = this.getPostItemById();
    var postData = itemData.data;
    var allPostData = this.getAllPostData();
    switch(category)
    {
      case 'collect':
        //处理收藏
        if(!postData.collectionStatus){
          postData.collectionNum++;
          postData.collectionStatus = true;
        }else{
          //如果当前状态是收藏
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      case 'up':
          if(!postData.upStatus){
            postData.upNum++;
            postData.upStatus = true;
          }else{
            postData.upNum--;
            postData.upStatus = false;
          }
         break;
      case 'comment':
          postData.comments.push(newComment);
          postData.commentNum++;
        break;
      case 'reading':
          postData.readingNum++;
        break;
      default:
        break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }
 

  //获取评论
  getCommentData(){
    var itemData = this.getPostItemById().data;
    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length;
    var comment;
    for(var i=0;i<len;i++){
      //将comment中的时间戳转换成可阅读格式
      comment = itemData.comments[i];
      var util = require('../util/util.js');
      comment.create_time = util.getDiffTime(comment.create_time);
    }
    console.log(itemData.comments);
    return itemData.comments;
  }

  //将评论按时间降序排列
  compareWithTime(value1,value2){
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if(flag < 0){
      return 1;
    }else if(flag > 0){
      return -1;
    }else{
      return 0;
    }
  }

  //发表评论
  newComment(newComment){
    this.updatePostData('comment',newComment);
  }

  //阅读量+1
  addReadingTimes(){
    this.updatePostData('reading');
  }
};
//暴露接口
export{DBPost};