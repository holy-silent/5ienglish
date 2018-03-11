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

var ClassScheduleService = function () {
    //学生预约上课时间
    var scheduleCourse = function (student_id, course_id, time, room_id) {
        return courseScheduleEntity.create({
            student_id: student_id,
            course_id: course_id,
            schedule_date:time,
            room_id: room_id
        });
    }

    //查找预约
    var findScheduleCourse = function (student_id, course_id) {
        // return courseScheduleEntity.findAll({
        //     where: {
        //         student_id:student_id,
        //         course_id: course_id
        //     }
        // });
        var sql = "select id, student_id, course_id, DATE_FORMAT(schedule_date, '%Y-%m-%d %H:%i') 'schedule_date', room_id from sys_schedule where student_id=$1 and course_id=$2 order by schedule_date";
        return dbutil.query(sql, {bind:[student_id, course_id], type: Sequelize.QueryTypes.SELECT});
    }
    //根据学生查找到选择的课程
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

    //取消预约
    var cancelScheduledCourse = function (id) {
        return courseScheduleEntity.destroy({'where':{id:id}});
    }

    //老师被预约的课程以及时间
    var schedulePageByTeacher = function (currentUser) {
        var sql = "SELECT s.id AS schedule_id, u.id AS student_id, u.name  'student_name' ,u.eng_name 'student_engname', DATE_FORMAT(s.schedule_date, '%Y-%m-%d %H:%i') 'schedule_date', c.course_name, s.room_id, c.course_teacher FROM sys_schedule s";
        sql += ' LEFT JOIN sys_user u ON s.student_id = u.id';
        sql += ' LEFT JOIN sys_course c ON c.id = s.course_id';
        sql += ' WHERE c.course_teacher = $1';
        sql += ' ORDER BY s.schedule_date;';

        return dbutil.query(sql, {bind:[currentUser.id], type: Sequelize.QueryTypes.SELECT});
    }

    return {
        getSelectedCourseByStudent:getSelectedCourseByStudent,
        scheduleCourse:scheduleCourse,
        findScheduleCourse:findScheduleCourse,
        cancelScheduledCourse: cancelScheduledCourse,
        schedulePageByTeacher:schedulePageByTeacher
    }
}();

module.exports.ClassScheduleService = ClassScheduleService;