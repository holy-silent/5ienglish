/**
 * 后台--用户管理
 * Created by vanpersie on 2018/2/25.
 */
var express = require('express');
var user = express.Router();
var Constant = require('../app/constant.js').Constant;
var UserService = require('../app/sys/service/UserService.js').UserService;

user.get('/', function(req, res, next) {
    var user = req.session.loginUser;
    // UserService.getUserList().then(function (success) {
    //     res.render(Constant.userList, {user:user, data:success})
    // });
    res.render(Constant.userList, {user:user})

});

module.exports = user;