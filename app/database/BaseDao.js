// ......................................................
// ..................数据库操作基础类
// ......................................................
'use strict';

var Sequelize = require('sequelize');

var dbutil = new Sequelize('5ienglish', 'root', 'root', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 5,
        idle: 3000
    },
    timezone: '+08:00' //东八时区
});

module.exports = dbutil;
