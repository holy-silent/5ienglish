/**
 * 老师
 * Created by vanpersie on 2018/2/11.
 */
var express = require('express');
var course = express.Router();
var Constant = require('../app/constant.js').Constant;
var UserService = require('../app/sys/service/UserService.js').UserService;

course.get('/', function(req, res, next) {
    var user = req.session.loginUser;
    var teacherId = req.query.teacherId;
    var teacherName = req.query.teacherName;

    if (teacherId==undefined) {
        //如果没有传老师ID，则查出所有课程
        UserService.getCourseList().then(function (success) {
            res.render(Constant.courseList, {user:user, teacher:undefined, data:success});
        }, function (error) {
            console.log(error);
            res.render(Constant.errorPath, {err:'请求出错，请稍后访问网站！'});
        });
    } else {
        UserService.getUserById(teacherId).then(function (success) {
            var teacher = success[0]
            UserService.getCourseByTeacher(teacherId).then(function (success) {
                res.render(Constant.courseList, {user:user, teacher:teacher, data:success});
            }, function (error) {
                console.log(error);
                res.render(Constant.errorPath, {err:'请求出错，请稍后访问网站！'});
            });
        }, function (error) {
            console.log(error);
            res.render(Constant.errorPath, {err:'请求出错，请稍后访问网站！'});
        });
    }
});

module.exports = course;