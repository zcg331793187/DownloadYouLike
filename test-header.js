/**
 * Created by zhoucaiguang on 16/7/21.
 */
var request = require('request');
var Iconv = require('iconv-lite');
var fs =require('fs');
request({
    url: 'http://www.chuu.co.kr/chuu-noti/flal.jpg',
    // headers:{
    //     Referer:'http://www.4493.com/'
    // }

}, function(error, response, body) {
    console.log(body);
    if (!error && response.statusCode == 200) {


    }else{
        console.log(123);
    }
}).pipe(fs.createWriteStream('2.jpg'));