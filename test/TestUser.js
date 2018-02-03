/**
 * Created by vanpersie on 2018/2/3.
 */
"use strict";
var user = require('../app/sys/entity/User.js').user;
// user.create({
//     login_name: 'yangdl70',
//     password: '123456',
//     name: '杨大龙',
//     del_flag: '0'
// }).then(function (result) {
//     console.log(result);
// }).catch(function (err) {
//     console.log(err.message);
// });


user.findAll({
    where: {
        login_name:'yangdl70',
        password: '123456'
    }
}).then(function (result) {
    console.log(result);
    var data = result.dataValues;
    console.log(data);
}).then (function (err) {
    console.log(err);
});