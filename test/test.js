"use strict";

var TestEntity = require('./entity/Entity.js').TestEntity;
var CourseEntity = require('./entity/Entity.js').CourseEntity;
var Sequelize = require('sequelize');

console.log(Sequelize.UUID);

TestEntity.create({
    name: '联系方式'
}).then(function (result) {
    // console.log(result);
}).catch(function (err) {
    // console.log(err.message);
});

CourseEntity.create({
    name: '物理'
}).then(function(result){
    console.log('inserted 物理 ok');
}).catch(function(err){
    console.log('inserted 物理 error');
    console.log(err.message);
});