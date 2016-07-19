/**
 * Created by zhoucaiguang on 16/7/19.
 */

var http = require("http");
var fs = require("fs");



var request= require('request');

r= '';
l=0;
request({url:"http://www.xiumm.cc/data/0022/94/14403260971935.jpg"},function (res,rep) {
    // console.log('回调');
    // res.setEncoding('binary');
    console.log((parseInt(rep.headers['content-length']/1000))+'k');

}).on('data',function(ere){

    console.log('接受数据');

    l+=ere.length;
    console.log(parseInt(l/1000)+'k');
    // ere+=ere

    // console.log(ere.length);
    // fs.createWriteStream(savePath)
}).on('end',function(){
    console.log('接受完成');
    console.log(parseInt(l/1000)+'k');
    l = 0;
}).on('close',function(){
    console.log('接受完成close');

}).on('response',function (res) {
    console.log('响应');
    // console.log(ee);



}).pipe(fs.createWriteStream('logonew.jpg'));




/*
var server = http.createServer(function(req, res){}).listen(50082);
console.log("http start");



var url = "http://s0.hao123img.com/res/img/logo/logonew.png";
http.get(url, function(res,rf){
    var imgData = "";
    console.log(res);


    res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开


    res.on("data", function(chunk){
        imgData+=chunk;
    });

    res.on("end", function(){
        fs.writeFile("logonew.png", imgData, "binary", function(err){
            if(err){
                console.log("down fail");
            }
            console.log("down success");
        });
    });
});
    */