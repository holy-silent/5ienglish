/**
 * 后台管理
 * Created by vanpersie on 2018/2/25.
 */
var express = require('express');
var user = express.Router();
var Constant = require('../app/constant.js').Constant;
var UserService = require('../app/sys/service/UserService.js').UserService;

/**
 * 用户管理
 */
user.get('/userList', function(req, res, next) {
    var user = req.session.loginUser;
    // UserService.getUserList().then(function (success) {
    //     res.render(Constant.userList, {user:user, data:su35 e    m6  RW2RWEE2EEss})
    // });
    res.render(Constant.userList, {user:user})

});

module.exports = user;