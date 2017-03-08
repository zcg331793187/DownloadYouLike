/**
 * Created by zhoucaiguang on 16/7/19.
 */

var http = require("http");
var fs = require("fs");




// var total = 50000,
//     count = 0,
//     pace = require('pace')(total);
/*
 while (count++ < total) {
 pace.op();

 // Cause some work to be done.
 for (var i = 0; i < 1000000; i++) {
 count = count;
 }
 }
 return;
 */

var request= require('request');


// var pace;
r= '';
l=0;
request.head({url:"http://www.xiumm.cc/data/0022/94/14403260971935.jpg"},function (res,rep) {
    // pace = require('pace')(rep.headers['content-length']);


    var total = rep.headers['content-length'];
        console.log(total);
        pace = require('pace')(total);
    pace.op(total);



}).on('end',function(){
    console.log('接受完成');
    // console.log(parseInt(l/1000)+'k');
    l = 0;
}).on('close',function(){
    console.log('接受完成close');

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