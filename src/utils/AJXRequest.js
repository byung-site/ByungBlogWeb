
const Axios = require('axios');

class AJXRequest{
    //post请求
    postRequest = (path, fromData, callback) => {
        // let config = {
        //     headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     }
        // };

        Axios.post(path, fromData).then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //get请求
    getRequest = (path, callback) => {
        Axios.get(path)
          .then(function (response) {
            callback(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    //注册
    registerRequest = (nickname, email, password, confirm, callback) =>{
        let fromData = new FormData();
        
        fromData.append('nickname', nickname);
        fromData.append('email', email);
        fromData.append('password', password);
        fromData.append('confirm', confirm);
        this.postRequest("/register", fromData, callback);
    }

    //登录请求
    loginRequest = (email, password, callback) =>{
        var fromData = new FormData();

        fromData.append('email', email);
        fromData.append('password', password);
        this.postRequest("/login", fromData, callback);
    }

    //得到最热的10篇文章
    getHottest = (callback) => {
        this.getRequest("/getHottest", callback);
    }

    //得到最新的10篇文章
    getNewest = (callback) => {
        this.getRequest("/getNewest", callback);
    }

    //得到所有文章
    getArticles = (callback) => {
        this.getRequest("/getArticles", callback);
    }

    //得到指定用户ID的所有文章
    getArticlesByUserID = (userId, callback) => {
        this.getRequest("/api/getArticlesByUserID/" + userId, callback);
    }

    //得到发布的所有文章
    getPublishArticles = (userId, callback) => {
        this.getRequest("/api/getPublishArticles/"+userId, callback);
    }

    //得到指定key的文章
    getArticle = (key, callback) =>{
        this.getRequest("/getArticle/" + key, callback)
    }

    //得到所有话题
    getTopics = (callback) => {
        this.getRequest("/getTopics", callback);
    }

    //添加话题
    addTopic = (topicId, userId, topic, callback) =>{
        var fromData = new FormData();

        fromData.append('name', topic);
        fromData.append('topicId', topicId);
        fromData.append('userId', userId);

        this.postRequest("/api/addTopic", fromData, callback);
    }

    //得到指定用户ID的所有话题
    getTopicsByUserID = (userId, callback) => {
        this.getRequest("/api/getTopicsByUserID/"+userId, callback);
    }

    //删除话题
    deleteTopic = (topicId, callback) =>{
        var fromData = new FormData();

        fromData.append('topicId', topicId);

        this.postRequest("/api/deleteTopic", fromData, callback);
    }

    //删除文章
    deleteArticle = (key, callback) =>{
        var fromData = new FormData();

        fromData.append('key', key);

        this.postRequest("/api/delArticle", fromData, callback);
    }

    // //管理页面发布文章
    // publishArticle = (key,callback) => {
    //     var fromData = new FormData();

    //     fromData.append('key', key);

    //     this.postRequest("/publish", fromData, callback);
    // }

    //得到topicid的所有文章
    getArticlesByTopicID = (topicId, callback) =>{
        this.getRequest("/getArticlesByTopicID/" + topicId, callback)
    }

    //获得一个key
    getNewKey = (callback) => {
        this.getRequest("/api/createKey", callback)
    }

    //保存文章
    saveArticle = (article, callback) => {
        let fromData = new FormData();


        fromData.append('userId', article.UserID);
        fromData.append('topicId', article.TopicID);
        fromData.append('key', article.Key);
        fromData.append('title', article.Title);
        fromData.append('summary', article.Summary);
        fromData.append('content', article.Content);
        fromData.append('image', article.Image);

        this.postRequest("/api/saveArticle", fromData, callback);
    }

    //保存同时发布文章
    publishArticle = (article, callback) => {
        let fromData = new FormData();


        fromData.append('userId', article.UserID);
        fromData.append('topicId', article.TopicID);
        fromData.append('key', article.Key);
        fromData.append('title', article.Title);
        fromData.append('summary', article.Summary);
        fromData.append('content', article.Content);
        fromData.append('image', article.Image);

        this.postRequest("/api/publishArticle", fromData, callback);
    }


    //更新文章访问量
    updateVisit = (key, callback ) => {
        var fromData = new FormData();

        fromData.append('key', key);

        this.postRequest("/updateVisit", fromData, callback);
    }

    //上传图片
    uploadArticleImage = (userId, articleKey, file, callback) => {
        let fromData = new FormData();
        fromData.append('userId', userId);
        fromData.append('file', file);
        fromData.append('key', articleKey);
        this.postRequest("/api/uploadArticleImage", fromData, callback);
    }

    //改昵称
    changeNickname = (userId, newNickname, callback) => {
        let fromData = new FormData();

        fromData.append('userId', userId);
        fromData.append('newNickname', newNickname);
        this.postRequest("/api/changeNickname", fromData, callback);
    }

    //改邮箱
    changeEmail = (userId, newEmail, callback) => {
        let fromData = new FormData();

        fromData.append('userId', userId);
        fromData.append('newEmail', newEmail);
        this.postRequest("/api/changeEmail", fromData, callback);
    }

    //改密码
    changePassword = (userId, oldPass, newPass, confirmPass, callback) => {
        let fromData = new FormData();

        fromData.append('userId', userId);
        fromData.append('oldPass', oldPass);
        fromData.append('newPass', newPass);
        fromData.append('confirmPass', confirmPass);
        this.postRequest("/api/changePassword", fromData, callback);
    }
};

var AjxRequest = new AJXRequest();

 export  {AjxRequest};