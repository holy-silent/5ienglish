/**
 * Created by vanpersie on 2018/2/3.
 */
"use strict";
var user = require('../entity/User.js').user;
var course = require('../entity/User.js').course;
var courseSelection = require('../entity/User.js').courseSelection;
var courseScheduleEntity = require('../entity/User.js').courseScheduleEntity;
var Sequelize = require('sequelize');
var logger = require('morgan');


//用户接口
var UserService = function(){
    var getUserList = function (userPo) {
        var promise = user.findAll({
            where: {
                login_name:userPo.loginName,
                password: userPo.password,
                del_flag: '0'
            }
        });
        return promise;
    };

    var getAllUsers = function () {
        return user.findAll({
            where: {
                del_flag: '0'
            }
        });
    }

    //根据类型查找用户
    var getUserByType = function (type) {
        return user.findAll({
            where: {
                user_type:type,
                del_flag: '0'
            }
        });
    };

    var getUserById = function (id) {
        return user.findAll({
           where: {
               id: id,
               del_flag: '0'
           }
        });
    }

    var getCourseByTeacher = function (teacherId) {
        var include = [{
            model: user,
            as: 'sys_user'
        }];

        return course.findAll({
            where: {
                course_teacher:teacherId,
                del_flag: '0'
            },
            include:include
        });
    }

    var getCourseList = function (teacherName) {
        return course.findAll({
            where: {
                del_flag: '0'
            },
            include:{
                model:user
                // where: { name:{$like: '%'+tearcher.name==undefined?'':tearcher.name+'%'} }
            }
        });
    }

    //选课方法
    var selectCourse = function (currentUser, courseId) {
        return courseSelection.create({
            student_id: currentUser.id,
            course_id: courseId,
            create_by:currentUser.id,
            del_flag:'0'
        });
    }
    
    var scheduleCourse = function (student_id, course_id, time, room_id) {
        return courseScheduleEntity.create({
            student_id: student_id,
            course_id: course_id,
            schedule_date:time,
            room_id: room_id
        });
    }
    
    var findScheduleCourse = function (student_id, course_id) {
        return courseScheduleEntity.findAll({
            where: {
                student_id:student_id,
                course_id: course_id
            }
        });
    }
    
    var getSelectedCourseByStudent = function (currentUser) {
        var include = [{
            model: course,
            as: 'course'
        }];
        return courseSelection.findAll({
            where: {
                student_id:currentUser.id,
                del_flag: '0'
            },
            include: {
                model:course
            }
        });
    }

    return {
        getUserList : getUserList,
        getUserByType : getUserByType,
        getUserById: getUserById,
        getCourseByTeacher : getCourseByTeacher,
        getCourseList : getCourseList,
        selectCourse: selectCourse,
        getAllUsers: getAllUsers,
        getSelectedCourseByStudent:getSelectedCourseByStudent,
        scheduleCourse:scheduleCourse,
        findScheduleCourse:findScheduleCourse
    }
}();

module.exports.UserService = UserService;