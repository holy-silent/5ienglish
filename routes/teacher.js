/**
 * 老师
 * Created by vanpersie on 2018/2/11.
 */
var express = require('express');
var teacher = express.Router();
var Constant = require('../app/constant.js').Constant;
var UserService = require('../app/sys/service/UserService.js').UserService;

teacher.get('/', function(req, res, next) {
    var user = req.session.loginUser;
    UserService.getUserByType(Constant.userTypeTeacher).then(function (success) {
        res.render(Constant.teacherList, {user:user, data:success});
    }, function (error) {
        console.log(error);
        res.render(Constant.errorPath, {err:'请求出错，请稍后访问网站！'});
    });

});

module.exports = teacher;