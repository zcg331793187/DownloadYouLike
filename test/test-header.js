/**
 * Created by zhoucaiguang on 16/7/21.
 */
var request = require('request');
var Iconv = require('iconv-lite');
var fs =require('fs');



/*
fs.readFile('./2.jpg', function(err, data) {
    if (err) {
        // 错误处理
        return
    }

    var imgByte = new Buffer(data).toString('base64');
    console.log(imgByte);
    // 这应该就是你要的数据
});


return;
*/
request({
    url: 'http://www.xiuren.org/xiuren/XiuRen-N00621/0001.jpg',
    encoding:null,
    headers:{
        Referer:'http://www.xiuren.org/'
    }

}, function(error, response, body) {
    console.log(response);
    // console.log(body);
    if (!error && response.statusCode == 200) {
        type = response.headers["content-type"];
        prefix = "data:" + type + ";base64,";
        base64 = new Buffer(body).toString('base64');
        // var imgByte = new Buffer(body).toByteArray();
        // this.body = prefix + base64;
        // console.log(prefix+imgByte);
        console.log(prefix + base64);

    }else{
        console.log(123);
    }
});