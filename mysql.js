/**
 * Created by zhoucaiguang on 16/8/9.
 */


var mysql = require('./base/mysql');
"use strict";

// console.log(sql);
mysql.query('select id from node_img where path=? limit 1',['1秀人网[XiuRen]No.347梓萱Crystal/14364464122252.jpg'],function(res){
    console.log(!!res[0]);

    // console.log(!res.id);

});

return;
mysql.insert('node_img',{path:'http://www.baidu.com'},function(res){
    console.log(res);


});