/**
 * 后台管理
 * Created by vanpersie on 2018/2/25.
 */
var express = require('express');
var user = express.Router();
var Constant = require('../app/constant.js').Constant;
var UserService = require('../app/sys/service/UserService.js').UserService;
var CourseService = require('../app/sys/service/CourseService.js').CourseService;
var ClassScheduleService = require('../app/sys/service/ClassSchedule.js').ClassScheduleService;
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
    var message = req.param('message');
    ClassScheduleService.getSelectedCourseByStudent(user).then(function (success) {
        res.render(Constant.courseSelectedList, {user:user, data:success, message:message})
    });
});

user.get('/schedule', function (req, res, next) {
    var user = req.session.loginUser;
    var student_id = req.param('student_id');
    var course_id = req.param('course_id');
    var course_teacher;
    CourseService.getCourseById(course_id).then(function (data) {
        course_teacher = data[0].course_teacher;
        ClassScheduleService.findScheduleCourse(student_id, course_id).then(function (success) {
            res.render(Constant.schedulePage, {student_id:student_id, course_id:course_id,course_teacher:course_teacher, data:success});
        })
    })

})

user.get('/selectedCourseSubmit', function (req, res, next) {
    var student_id = req.param('student_id');
    var course_id = req.param('course_id');
    var time = req.param('time');
    var room_id = chinaTime().getTime();

    ClassScheduleService.scheduleCourse(student_id, course_id, time, room_id).then(function () {
        var message = '恭喜你，预约成功!';
        res.redirect('/admin/selectedCourse?message=' + message);
    })
})
//取消计划课程(学生）
user.get('/cancelScheduledCourse', function (req, res, next) {
    var id = req.param('id');
    ClassScheduleService.cancelScheduledCourse(id).then(function () {
        var message = '取消成功!';
        res.redirect('/admin/selectedCourse?message=' + message);
    })
})

//取消计划课程（老师）
user.get('/cancelScheduledCourseByTeacher', function (req, res, next) {
    var id = req.param('id');
    ClassScheduleService.cancelScheduledCourse(id).then(function () {
        var message = '取消成功!';
        res.redirect('/admin/schedulePageByTeacher?message=' + message);
    })
})

//查看老师被预约的列表
user.get('/schedulePageByTeacher',function (req, res, next) {
    var user = req.session.loginUser;
    var message = req.param('message');
    ClassScheduleService.schedulePageByTeacher(user).then(function (success) {
        res.render(Constant.schedulePageByTeacher, {user:user, data:success, message: message});
    });
})

module.exports = user;