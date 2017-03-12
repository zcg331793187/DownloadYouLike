/**
 * Created by zhoucaiguang on 2017/3/10.
 */


// let Sequelize = require('sequelize');

import * as Sequelize from 'sequelize';
import {dbConfigs} from '../service/configs/role'
const config = dbConfigs;


let sequelize = new Sequelize(
    config.database, // 数据库名
    config.user,   // 用户名
    config.password,   // 用户密码
    {
        'dialect': 'mysql',  // 数据库使用mysql
        'host': config.server, // 数据库服务器ip
        'port': 3306,        // 数据库服务器端口
        'define': {
            // 字段以下划线（_）来分割（默认是驼峰命名风格）
            'underscored': true
        }
    }
);

let Img = sequelize.define('img', {
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
let Title = sequelize.define('title', {
    'title': {
        'type': Sequelize.STRING(255),
        'allowNull': true,
        'unique': false // 字段是否UNIQUE
    },
    'imgThums': {
        'type': Sequelize.STRING(255),
        'allowNull': true//是否可以为空
    }
}, {
    // 自定义表名
    'freezeTableName': true,
    'tableName': 'node_title',
    // 是否需要增加createdAt、updatedAt、deletedAt字段
    'timestamps': false,
});


export {Title,Img}

/*
 var user = User.build({
 'url': '1',
 'titleId': '123213123'
 });
 user =  user.save();
 console.log(user.get({'plain': true}));
 */
// 方法2：直接操作db
/*
 Img.create({
 'url': 'http://www.xiumm.cc/data/0168/04/14887122181527.jpg',
 'titleId': '123213123'
 });
 */

// Title.sync({force: true});//自动创建表

function textPromise() {


    return Title.create({
        'title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身',
        'imgThums': 'http://www.xiumm.cc/data/0168/04/14887122181527.jpg'
    });
}




// console.log();
// let res =  textPromise();


// console.log(res);


// let dataAll =  Title.findAll();
// let datafindById =  Title.findById('21');
// let datafindAndCount =  Title.findAndCount();
// let datafindAndCountAll =  Title.findAndCountAll();
// let datafindCreateFind =  Title.findCreateFind({
//     'where': {
//         'title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'
//     }
// });

/*
let datafindOne =  Title.findOrCreate(
    {
    'where': {
        'title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'
    }
}
);
*/



Title.findOne({
    'where': {
        'title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'
    }
});


let datafindOne =  Title.findByPrimary(49);//查询id
/*
dataAll.then((res)=>{
    console.log(res);
});
*/

datafindOne.then((res:any)=>{
    console.log(
        res
    );
});



// console.log(res.get('{plain:true}'));
/*

 textPromise().then((res)=>{
 console.log(res);
 })

 */



let list = [
    {imgThums:'http://www.xiumm.cc/data/0166/79/14869855439014.jpg','title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'},
    {imgThums:'http://www.xiumm.cc/data/0166/79/1486985542263.jpg','title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'},
    {imgThums:'http://www.xiumm.cc/data/0166/79/14869855394032.jpg','title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'},
    {imgThums:'http://www.xiumm.cc/data/0166/79/14869855434423.jpg','title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'},
    {imgThums:'http://www.xiumm.cc/data/0166/82/14869855847266.jpg','title': 'DK御女郎[DKGirl]2017.02.21VOL.013萌宝儿BoA黑丝湿身'},
];



let users =  Title.bulkCreate(
    list
);