/**
 * Created by vanpersie on 2018/2/3.
 */
"use strict";
var user = require('../entity/Entity.js').user;
var course = require('../entity/Entity.js').course;
var courseSelection = require('../entity/Entity.js').courseSelection;
var courseScheduleEntity = require('../entity/Entity.js').courseScheduleEntity;
var Sequelize = require('sequelize');
var logger = require('morgan');
var dbutil = require('../entity/Entity.js').dbutil;


//用户接口
var UserService = function(){
    var getUserList = function (userPo) {
        var promise = user.findAll({
            where: {
                login_name:userPo.loginName,
                password: userPo.password,
                del_flag: '0'
            }
        });
        return promise;
    };

    var getAllUsers = function () {
        return user.findAll({
            where: {
                del_flag: '0'
            }
        });
    }

    //根据类型查找用户
    var getUserByType = function (type) {
        return user.findAll({
            where: {
                user_type:type,
                del_flag: '0'
            }
        });
    };

    var getUserById = function (id) {
        return user.findAll({
           where: {
               id: id,
               del_flag: '0'
           }
        });
    }


    return {
        getUserList : getUserList,
        getUserByType : getUserByType,
        getUserById: getUserById,
        getAllUsers: getAllUsers
    }
}();

module.exports.UserService = UserService;