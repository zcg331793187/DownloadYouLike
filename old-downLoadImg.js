/**
 * Created by zhoucaiguang on 16/7/14.
 */

'use strict';
var request= require('request');
var url = require('url'); //解析操作url
var cheerio = require('cheerio');
var fs = require('fs');
var tool = require('./tool').tool;
var mysql = require('./base/mysql');
var promise = require('q');


var  download = {
    'errorCount':0,
    'counts':0,
    'saveImg':function (option,savePath,callback) {
        var spath = option.path;
        var href = option.url;
        var title = option.title;
        var base64 = option.base64;

        mysql.query('select id,imgThums from node_title where `title`=? limit 1',[title],function(res){

            if(res[0]){
                download.qUrlDown(res[0].id,href,base64).then(function(data){
                    if(data[0]){
                        console.log('save done %s',href);
                        /*
                            if(base64){

                                var urlId= data[1];
                                console.log(urlId);
                                download.saveImageBase64(urlId,href,option).then(function(data){
                                    // console.log(data);
                                    if(data){
                                        //待优化
                                        mysql.update('node_img',{base64:data},{id:urlId},function(data){
                                            // console.log(res[0].id+'save done %s',href);
                                            console.log('save64  Ok');
                                        });
                                    }});


                            }
                            */
                    }
                });
                if(!res[0]['imgThums']){
                    mysql.update('node_title',{imgThums:href},{id:res[0].id},function(data){
                        console.log(res[0].id+'save done %s',href);
                    });
                }
            }
        });
        return;
        if(fs.existsSync(savePath)==false) {
            var startTime;
            var endTime;
            startTime = new Date().getTime();


            request(option,function(error,response,body){
            }).on('error',function(error)
            {
                console.log(error);

            }).on('response',function(error){
                // console.log('请求图片相应');

            }).pipe(fs.createWriteStream(savePath)).on('close', function(){
                endTime = new Date().getTime();
                console.log('下载图片完 第%s张...%s.. , 耗时: %ss', download.counts,savePath, (endTime - startTime) / 1000);
                download.counts++;
                // ep.emit('got_url', savePath);
                // callback();
            });
        }else{
            var res = tool.checkResetDownloadImage;
            if(res){
                download.checkImageSize(option,savePath,callback);
            }
            // callback('文件已存在');
            // console.log('文件已存在');
        }


    },'checkImageSize':function (href,savePath,callback){
        request(href, function(err, res, body){
            if(!err && res.statusCode==200){
                // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
                var downImageSize = res.headers['content-length'];

                // console.log(startPos);//重新下载的位置
                var localImageSize;
                tool.localFileSize(savePath,downImageSize,function(size,downImageSize){

                    localImageSize = size;

                    if(downImageSize>localImageSize){
                        tool.deleteFile(savePath,function(){

                            download.saveImg(href,savePath,callback);
                        });



                    }else{
                        callback();
                    }

                });

                // console.log('content-length:', res.headers['content-length']);  //图片大小
                if (err) {
                    console.log('err: '+ err);
                    return false;
                }
                // console.log('res: '+ res);


            }else{
                console.log('请求异常重新请求'+href);
                if(download.errorCount<3){
                    download.checkImageSize(href,savePath,callback);
                }else{
                    download.errorCount= 0;
                }
            }
        });


    },'qUrlDown':function(titleId,url,base64){
        "use strict";
        var deferred = promise.defer();
        mysql.query('select id from node_img where `titleId`=? and `url`=? limit 1',[titleId,url],function(res){
            if(!res[0]){
                if(base64){
                    mysql.insert('node_img',{url:url,titleId:titleId,Base64:1},function(insertRes){
                        deferred.resolve([true,insertRes.insertId])
                    });
                }else{
                    mysql.insert('node_img',{url:url,titleId:titleId,Base64:0},function(insertRes){
                        deferred.resolve([true,insertRes.insertId])
                    });
                }

            }else{
                deferred.resolve(false)
            }

        });
        return deferred.promise;



    },'saveImageBase64':function(imgId,imgUrl,options){
        var deferred = promise.defer();
        var option ={};
        option.url= options.url;
        option.encoding = null;

        request(option,function(error, response, body){
            if (!error && response.statusCode == 200) {
              var   type = response.headers["content-type"];
              var   prefix = "data:" + type + ";base64,";
              var   base64 = new Buffer(body).toString('base64');
                deferred.resolve(prefix + base64);
            }else{
                deferred.resolve(false)
            }
        });

        return deferred.promise;
    }
};

exports.download =download;

