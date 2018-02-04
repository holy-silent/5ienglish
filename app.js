/**
 * Created by vanpersie on 2018/2/3.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require("ejs");

//设置路由
var index = require('./routes/index');

var app = express();

// express配置模板视图
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;//获取浏览器中当前访问的nodejs路由地址
    var userCookies = req.cookies.userCookies; //获取客户端存取的cookie,userCookies为cookie的名称；//有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块，//因此，获取cookie必须在1,2步之后才能使用，否则拿到的cookie就是undefined.
    console.log("访问URL："+url);
    console.log("cookie："+req.cookies.userCookies);

    if(url=='/login'&&!(userCookies==undefined)){ //通过判断控制用户登录后不能访问登录页面；
        return res.redirect('/');//页面重定向；
    }
    next();
});

//配置路由
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('你查找的页面不存在');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {err:err});
});

module.exports = app;
