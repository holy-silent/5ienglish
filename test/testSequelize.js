'use strict';

var Sequelize = require('sequelize');

//................sequelize参数介绍.....................
//................第一个参数'test1' 是数据库名。
//................第二个参数'root'是登录用户名。
//................第三个参数'123456'是登录用户对应的密码。
//................第四个参数：
//................host：数据库主机地址
//................dialect：'mysql'|'sqlite'|'postgres'|'mssql'
var sequelize = new Sequelize('student', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

//............................................
//......................映射对象................
//............................................
var Course = sequelize.define('course', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    reserved1: Sequelize.STRING,
    reserved2: Sequelize.INTEGER
});

// ......................................................
// ..................Test实体映射
// ......................................................
var Test = sequelize.define('test', {
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

// Course.create({
//     name: '物理'
// }).then(function(result){
//     console.log('inserted 物理 ok');
// }).catch(function(err){
//     console.log('inserted 物理 error');
//     console.log(err.message);
// });

// ......................................................
// ..................插入数据
// ......................................................
Test.create({
    name: '联系方式'
}).then(function (result) {
    // console.log(result);
}).catch(function (err) {
    // console.log(err.message);
});

// ......................................................
// ..................更新数据
// ......................................................
Test.update({
  name: '联系'
}, {
    where: {
        id:2
    }
}).then(function (result) {
    // console.log(result);
});

// ......................................................
// ..................查询
// ......................................................
Test.findAll({
    where:{
        id: 2
    }
}).then(function(result){
    // console.log(result);
        for (var i = 0, usr; usr = result[i++];) {
        console.log('id=' + usr.id + ', name=' + usr.name);
    }
});

// ......................................................
// ..................删除
// ......................................................
Test.destroy({
    where: {
        id: 6
    }
}).then(function (result) {
    console.log(result);
});