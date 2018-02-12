/**
 * 课程
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

course.post('/selectCourse', function(req, res, next) {
    var user = req.session.loginUser;
    var courseId = req.body.courseId;
    if (user==undefined) {
        var result = {};
        result.response_code='8888';
        result.response_msg='请先登录网站！';
        res.json(result);
    } else {
        UserService.selectCourse(user, courseId).then(function (success) {
            var result = {};
            result.response_code='0000';
            result.response_msg='success';
            res.json(result);
        },function (error) {
            console.log('error:' + error);
            var result = {};
            result.response_code='0000';
            result.response_msg='选课失败，可能您已选过这门课了';
            res.json(result);
        }).catch(function (err) {
            console.log('err:' + err);
            var result = {};
            result.response_code='0000';
            result.response_msg='选课失败，内部错误：' + err;
            res.json(result);
        });
    }
});

module.exports = course;