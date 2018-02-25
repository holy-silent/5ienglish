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
        userList: 'userList',
        userTypeStudent : '0', //用户类型：学生
        userTypeTeacher : '1',//用户类型：老师
        userTypeAdmin : '2'//用户类型：管理员

    }
}();

module.exports.Constant = Constant;