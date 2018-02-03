/**
 * Created by vanpersie on 2018/2/3.
 */
"use strict";
var user = require('../entity/User.js').user;
var Sequelize = require('sequelize');
var logger = require('morgan');


//用户接口
var UserService = function(){
    var getUserList = function (userPo) {
        var promise = user.findAll({
            where: {
                login_name:userPo.loginName,
                password: userPo.password
            }
        });
        return promise;
    };

    return {
        getUserList : getUserList
    }
}();

module.exports.UserService = UserService;