/**
 * 后台管理
 * Created by vanpersie on 2018/2/25.
 */
var express = require('express');
var user = express.Router();
var Constant = require('../app/constant.js').Constant;
var UserService = require('../app/sys/service/UserService.js').UserService;
var chinaTime = require('china-time');

/**
 * 用户管理
 */
user.get('/userList', function(req, res, next) {
    var user = req.session.loginUser;
    UserService.getAllUsers().then(function (success) {
        res.render(Constant.userList, {user:user, data:success})
    });
});

user.get('/selectedCourse', function (req, res, next) {
    var user = req.session.loginUser;
    UserService.getSelectedCourseByStudent(user).then(function (success) {
        res.render(Constant.courseSelectedList, {user:user, data:success})
    });
});

user.get('/schedule', function (req, res, next) {
    var user = req.session.loginUser;
    var student_id = req.param('student_id');
    var course_id = req.param('course_id');

    UserService.findScheduleCourse(student_id, course_id).then(function (success) {
        res.render(Constant.schedulePage, {student_id:student_id, course_id:course_id, data:success});
    })

})

user.get('/selectedCourseSubmit', function (req, res, next) {
    var student_id = req.param('student_id');
    var course_id = req.param('course_id');
    var time = req.param('time');
    var room_id = chinaTime().getTime();

    UserService.scheduleCourse(student_id, course_id, time, room_id).then(function () {
        res.redirect('/admin/selectedCourse')
    })
})

module.exports = user;