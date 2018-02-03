/**
 * Created by vanpersie on 2018/2/3.
 */
"use strict";
// ......................................................
// ..................实体对象定义
// ......................................................
var dbutil = require('../../database/BaseDao.js');
var Sequelize = require('sequelize');

var UserEntity = dbutil.define('sys_user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login_name: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    del_flag: Sequelize.STRING
}, {freezeTableName: true,//设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    createdAt: 'createDate',
    updatedAt: 'updateDate'});

module.exports.user = UserEntity;