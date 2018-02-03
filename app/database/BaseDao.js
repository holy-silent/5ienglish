// ......................................................
// ..................数据库操作基础类
// ......................................................
'use strict';

var Sequelize = require('sequelize');

var dbutil = new Sequelize('5ienglish', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = dbutil;
