/**
 * Created by vanpersie on 2018/3/11.
 */
"use strict";
var user = require('../entity/Entity.js').user;
var course = require('../entity/Entity.js').course;
var courseSelection = require('../entity/Entity.js').courseSelection;
var courseScheduleEntity = require('../entity/Entity.js').courseScheduleEntity;
var Sequelize = require('sequelize');
var logger = require('morgan');
var dbutil = require('../entity/Entity.js').dbutil;

var CourseService = function () {
    //根据老师获取课程
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
    };

    //根据ID获取课程实体
    var getCourseById = function (courseId) {
        return course.findAll({
            where: {
                id:courseId,
                del_flag: '0'
            }
        });
    };

    //得到所有课程
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
    };

    //选课
    var selectCourse = function (currentUser, courseId) {
        return courseSelection.create({
            student_id: currentUser.id,
            course_id: courseId,
            create_by:currentUser.id,
            del_flag:'0'
        });
    }


    return {
        getCourseList : getCourseList,
        getCourseByTeacher : getCourseByTeacher,
        selectCourse: selectCourse,
        getCourseById: getCourseById
    }
}();

module.exports.CourseService = CourseService;