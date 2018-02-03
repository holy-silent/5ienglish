var express = require('express');
var index = express.Router();
var UserService = require('../app/sys/service/UserService.js').UserService;
var Constant = require('../app/constant.js').Constant;

/* GET home page. */
index.get('/', function(req, res, next) {
    var userCookies = req.cookies.userCookies;
  res.render(Constant.indexPath, {userCookies:userCookies});
});

index.get('/sys/startLesson', function(req, res, next) {
    res.render('sys/startLesson');
});

index.get('/login', function(req, res, next) {
    res.render(Constant.loginPath);
});

//登录逻辑
index.post('/login', function(req, res, next) {
    //登录校验
    if (!req.body) {
        res.sendStatus(400);
    }
    var username = req.body.username;
    var password = req.body.password;

    var userPo = {
        loginName:username,
        password:password
    }

    UserService.getUserList(userPo).then(function (success) {
        if (success instanceof Array && success.length > 0) {
            res.render(Constant.sysIndexPath);
        } else {
            res.render(Constant.loginPath, {err: '用户名或者密码错误'});
        }
    }, function (err) {
        console.log(err);
        res.render('error', {err:'登录失败'});
    });
});

module.exports = index;
