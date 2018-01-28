// ......................................................
// ..................数据库操作基础类
// ......................................................
'use strict';

var Sequelize = require('sequelize');

var dbutil = new Sequelize('student', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = dbutil;
