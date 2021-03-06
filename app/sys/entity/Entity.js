/**
 * Created by vanpersie on 2018/2/3.
 */
"use strict";
// ......................................................
// ..................实体对象定义
// ......................................................
var dbutil = require('../../database/BaseDao.js');
var Sequelize = require('sequelize');
var moment = require('moment');

//用户表
var UserEntity = dbutil.define('sys_user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login_name: Sequelize.STRING,
    // password: Sequelize.STRING,
    name: Sequelize.STRING,
    eng_name: Sequelize.STRING,//英文名
    user_type: Sequelize.STRING, // 0 学生   1 教室    2 管理员
    photo: Sequelize.STRING,
    remarks: Sequelize.STRING,
    del_flag: Sequelize.STRING
}, {freezeTableName: true,//设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    createdAt: 'createDate',
    updatedAt: 'updateDate'});

//课程表
var CourseEntity = dbutil.define('sys_course', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_name: Sequelize.STRING,
    course_teacher: {
        type:Sequelize.INTEGER,
        field: 'course_teacher',
    },
    course_desp: Sequelize.STRING,
    create_date: {
        type:Sequelize.DATE,
        get() {
            return moment(this.getDataValue('create_date')).format('YYYY-MM-DD');
        }
    }
}, {freezeTableName: true,//设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    createdAt: 'createDate',
    updatedAt: 'updateDate'});

//选课表
var CourseSelectionEntity = dbutil.define('sys_course_selection', {
    student_id: {type:Sequelize.INTEGER, primaryKey: true},
    course_id: {type:Sequelize.INTEGER, primaryKey: true},
    create_by: Sequelize.INTEGER,
    create_date: {
        type:Sequelize.DATE,
        get() {
            return moment(this.getDataValue('create_date')).format('YYYY-MM-DD');
        }
    },
    remarks: Sequelize.STRING,
    del_flag: Sequelize.STRING
}, {freezeTableName: true,//设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: true, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    createdAt: 'create_date',
    updatedAt: 'update_date'});

//排课表
var CourseScheduleEntity = dbutil.define('sys_schedule', {
    student_id:Sequelize.INTEGER,
    course_id:Sequelize.INTEGER,
    schedule_date:{
        type:Sequelize.DATE,
        get() {
            return moment(this.getDataValue('create_date')).format('YYYY-MM-DD HH:mm');
        }
    },
    room_id:Sequelize.STRING
}, {freezeTableName: true,//设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: true, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    createdAt: 'create_date',
    updatedAt: 'update_date'});

// UserEntity.hasMany(CourseEntity, {foreignKey:'course_teacher'});
CourseEntity.belongsTo(UserEntity, {foreignKey:'course_teacher'});
CourseSelectionEntity.belongsTo(CourseEntity, {foreignKey:'course_id'});
CourseSelectionEntity.belongsTo(UserEntity, {foreignKey:'student_id'});

module.exports.user = UserEntity;
module.exports.course = CourseEntity;
module.exports.courseSelection = CourseSelectionEntity;
module.exports.courseScheduleEntity = CourseScheduleEntity;

module.exports.dbutil = dbutil;
