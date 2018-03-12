/*
SQLyog v10.2 
MySQL - 5.6.31 : Database - 5ienglish
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`5ienglish` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `5ienglish`;

/*Table structure for table `sys_course` */

DROP TABLE IF EXISTS `sys_course`;

CREATE TABLE `sys_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(128) DEFAULT NULL COMMENT '课程名称',
  `course_teacher` int(11) DEFAULT NULL COMMENT '授课老师',
  `course_desp` text COMMENT '课程介绍',
  `create_by` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `del_flag` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `sys_course` */

insert  into `sys_course`(`id`,`course_name`,`course_teacher`,`course_desp`,`create_by`,`create_date`,`update_by`,`update_date`,`remarks`,`del_flag`) values (1,'Spoken English-1',16,'小学一年级英语口语',1,'2018-02-11 21:49:19',1,'2018-02-11 21:49:24','小学一年级英语口语','0'),(2,'Spoken English-2',16,'小学一年级英语口语',1,'2018-02-11 22:05:05',1,'2018-02-11 22:05:10','小学二年级英语口语','0'),(3,'Spoken English-2',16,'小学一年级英语口语',1,'2018-03-11 21:33:58',1,'2018-03-11 21:34:01','小学三年级英语口语','0');

/*Table structure for table `sys_course_selection` */

DROP TABLE IF EXISTS `sys_course_selection`;

CREATE TABLE `sys_course_selection` (
  `student_id` int(11) NOT NULL COMMENT '学生ID',
  `course_id` int(11) NOT NULL COMMENT '课程ID',
  `create_by` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `del_flag` char(1) DEFAULT '0',
  PRIMARY KEY (`student_id`,`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_course_selection` */

insert  into `sys_course_selection`(`student_id`,`course_id`,`create_by`,`create_date`,`update_by`,`update_date`,`remarks`,`del_flag`) values (13,1,13,'2018-02-12 14:35:33',NULL,'2018-02-12 14:35:33',NULL,'0'),(13,2,13,'2018-02-12 14:36:06',NULL,'2018-02-12 14:36:06',NULL,'0'),(13,3,13,'2018-03-11 21:34:49',NULL,'2018-03-11 21:34:49',NULL,'0'),(14,1,14,'2018-02-25 11:26:10',NULL,'2018-02-25 11:26:10',NULL,'0'),(14,2,14,'2018-02-25 11:26:12',NULL,'2018-02-25 11:26:12',NULL,'0'),(16,1,16,'2018-03-08 23:13:01',NULL,'2018-03-08 23:13:01',NULL,'0'),(16,2,16,'2018-03-08 23:13:03',NULL,'2018-03-08 23:13:03',NULL,'0');

/*Table structure for table `sys_schedule` */

DROP TABLE IF EXISTS `sys_schedule`;

CREATE TABLE `sys_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL COMMENT '选课ID',
  `course_id` int(11) DEFAULT NULL,
  `schedule_date` datetime DEFAULT NULL COMMENT '预约计划上课时间',
  `create_date` datetime DEFAULT NULL COMMENT '预约时间',
  `update_date` datetime DEFAULT NULL COMMENT '预约修改时间',
  `room_id` varchar(32) DEFAULT NULL COMMENT '房间ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `sys_schedule` */

insert  into `sys_schedule`(`id`,`student_id`,`course_id`,`schedule_date`,`create_date`,`update_date`,`room_id`) values (17,13,1,'2018-03-30 21:43:00','2018-03-11 21:43:56','2018-03-11 21:43:56','1520775780000'),(18,13,1,'2018-04-04 18:00:00','2018-03-11 21:48:07','2018-03-11 21:48:07','1520776080000'),(19,13,1,'2018-05-02 17:20:00','2018-03-11 22:02:10','2018-03-11 22:02:10','1520776920000');

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `login_name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '登录名',
  `password` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '密码',
  `no` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '工号',
  `eng_name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '英文名',
  `name` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '中文名',
  `email` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '电话',
  `mobile` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '手机',
  `user_type` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '用户类型 0学生 1老师 2管理人员',
  `photo` varchar(1000) COLLATE utf8_bin DEFAULT NULL COMMENT '用户头像',
  `login_ip` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '最后登陆IP',
  `login_date` datetime DEFAULT NULL COMMENT '最后登陆时间',
  `login_flag` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '是否可登录',
  `create_by` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '创建者',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '更新者',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `remarks` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '删除标记',
  `sort` int(11) DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`id`),
  KEY `sys_user_login_name` (`login_name`),
  KEY `sys_user_del_flag` (`del_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户表';

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`login_name`,`password`,`no`,`eng_name`,`name`,`email`,`phone`,`mobile`,`user_type`,`photo`,`login_ip`,`login_date`,`login_flag`,`create_by`,`create_date`,`update_by`,`update_date`,`remarks`,`del_flag`,`sort`) values (1,'superadmin','123456','0000',NULL,'系统管理员','brave.yang@5i-english.com','8675','8675','2','','0:0:0:0:0:0:0:1','2017-10-15 18:56:48','1','1','2013-05-27 08:00:00','1','2017-09-11 22:04:40','最高管理员','0',1),(13,'xiaoming','123456','0013','xiaoming','小明',NULL,NULL,NULL,'0',NULL,NULL,NULL,'1','1','2013-05-27 08:00:00','1','2013-05-27 08:00:00',NULL,'0',13),(14,'yangdl70','123456','1000','Brave.Yang','大龙','brave.yang@5i-english.com',NULL,NULL,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','0',14),(16,'cangjingkong','123456','1001','cangjingkong','苍井空',NULL,NULL,NULL,'1','/img/tempTeacher.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'用心教育，用心沟通','0',15),(17,'wutenglan','123456','1002',NULL,'武腾兰',NULL,NULL,NULL,'1','/img/tempTeacher.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'读万卷书，行万里路','0',16),(18,'boduoye','123456','1003',NULL,'波多野',NULL,NULL,NULL,'1','/img/tempTeacher.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'世上无难事，只怕有心人','0',17),(19,'mashengxi','123456','1004',NULL,'麻生希',NULL,NULL,NULL,'1','/img/tempTeacher.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'学如逆水行舟，不进则退','0',18);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
