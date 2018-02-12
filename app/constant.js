/**
 * 常量
 * Created by vanpersie on 2018/2/3.
 */

var Constant = function () {

    return {
        loginPath : 'login',//登录页面路径
        sysIndexPath : 'sysIndex', //用户主页路径
        errorPath : 'error', //错误页面路径
        indexPath : 'index', //首页页面路径
        startLesson : 'startLesson', //開始上課頁面
        teacherList : 'teacherList',
        courseList : 'courseList',
        userTypeStudent : '0',
        userTypeTeacher : '1',
        userTypeAdmin : '2'

    }
}();

module.exports.Constant = Constant;