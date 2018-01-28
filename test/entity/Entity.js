"use strict";
// ......................................................
// ..................实体对象定义
// ......................................................
var dbutil = require('../base/BaseDao.js');
var Sequelize = require('sequelize');

//测试实体
var TestEntity = dbutil.define('test', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
},{ freezeTableName: true,
    timestamps: true,
    createdAt: 'createDate',
    updatedAt: 'updateDate'});

//课程实体
var CourseEntity = dbutil.define('course', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    reserved1: Sequelize.STRING,
    reserved2: Sequelize.INTEGER
}, {freezeTableName: true,
    timestamps: false});

// ......................................................
// ..................直接在module.exports对象上添加方法，表示对外输出的接口
// ......................................................
module.exports.TestEntity = TestEntity;
module.exports.CourseEntity = CourseEntity;
