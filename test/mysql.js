/**
 * Created by zhoucaiguang on 16/8/9.
 */


var mysql = require('./../base/mysql');
"use strict";

var title = '美女0';
var href = 'htt;213123123123213';

mysql.query('select id from node_title where title=? limit 1',[title],function(res){
    var titleId;


    if(!res[0]){
        console.log('查不到');
        mysql.insert('node_title',{title:title,imgThums:href},function(res){

            var titleId = res.insertId;
            mysql.insert('node_img',{url:href,titleId:titleId},function(res){
                console.log('save done %s',href);
            });
        });
    }else{
        titleId = res[0].id;
        //id
        mysql.insert('node_img',{url:href,titleId:titleId},function(res){
            console.log('save done %s',href);
        });

    }

});

return;


// console.log(sql);
mysql.query('select id from node_img where path=? limit 1',['1秀人网[XiuRen]No.347梓萱Crystal/14364464122252.jpg'],function(res){
    console.log(!!res[0]);

    // console.log(!res.id);

});

return;
mysql.insert('node_img',{path:'http://www.baidu.com'},function(res){
    console.log(res);


});