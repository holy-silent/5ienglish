var express = require('express');
var index = express.Router();
var UserService = require('../app/sys/service/UserService.js').UserService;
var Constant = require('../app/constant.js').Constant;

/* GET home page. */
index.get('/', function(req, res, next) {
    var user = req.session.loginUser;
  res.render(Constant.indexPath, {user:user});
});

index.get('/sys/startLesson', function(req, res, next) {
    var user = req.session.loginUser;
    var room_id = req.param('room_id');
    var student_id = req.param('student_id');
    var course_teacher = req.param('course_teacher');
    var student, teacher;
   UserService.getUserById(student_id).then(function (success) {
       student = success[0];
       UserService.getUserById(course_teacher).then(function (success1) {
           teacher = success1[0];
           res.render(Constant.startLesson, {room_id: room_id, user:user, student:student, teacher:teacher});
       })
   })

});

index.get('/sys/sysIndex', function (req, res, next) {
    res.render(Constant.sysIndexPath, {user:req.session.loginUser,Constant:Constant});
});

index.get('/login', function(req, res, next) {
    res.render(Constant.loginPath, {err: undefined});
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
            var user = success[0];
            //session保存到服务端，cookie写回客户端
            req.session.regenerate(function(err) {
                if(err){
                    res.render(Constant.loginPath, {err: '登录失败'});
                }
                req.session.loginUser = user;
                // res.render(Constant.sysIndexPath, {user:user});
                res.redirect('/sys/sysIndex');
            });
        } else {
            res.render(Constant.loginPath, {err: '用户名或者密码错误'});
        }
    }, function (err) {
        console.log(err);
        res.render('error', {err:'登录失败'});
    });
});

index.get('/logout', function(req, res, next) {
    delete req.session.loginUser;
    return res.redirect('/login');
});

module.exports = index;
