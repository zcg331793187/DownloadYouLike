/**
 * Created by zhoucaiguang on 2017/3/12.
 */
"use strict";
const Sequelize = require('sequelize');
const role_1 = require('../configs/role');
const config = role_1.dbConfigs;
let sequelize = new Sequelize(config.database, // 数据库名
config.user, // 用户名
config.password, // 用户密码
{
    'dialect': 'mysql',
    'host': config.server,
    'port': 3306,
    'define': {
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        'underscored': true
    },
    logging: false //关闭输出sql日志
});
let ImgDb = sequelize.define('img', {
    'url': {
        'type': Sequelize.STRING(255),
        'allowNull': true,
        'unique': true // 字段是否UNIQUE
    },
    'time': {
        'type': Sequelize.DATE(10),
        'allowNull': true
    },
    'titleId': {
        'type': Sequelize.STRING(100),
        'allowNull': true
    }
}, {
    // 自定义表名
    'freezeTableName': true,
    'tableName': 'node_img',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    'timestamps': false,
});
exports.ImgDb = ImgDb;
let TitleDb = sequelize.define('title', {
    'title': {
        'type': Sequelize.STRING(255),
        'allowNull': true,
        'unique': false // 字段是否UNIQUE
    },
    'imgThums': {
        'type': Sequelize.STRING(255),
        'allowNull': true //是否可以为空
    },
    'status': {
        'type': Sequelize.INTEGER,
        'allowNull': true
    }
}, {
    // 自定义表名
    'freezeTableName': true,
    'tableName': 'node_title',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    'timestamps': false,
});
exports.TitleDb = TitleDb;
