/**
 * Created by zhoucaiguang on 16/7/13.
 */
'use strict';


var fs = require('fs');
var request= require('request');
var cheerio = require('cheerio');
var path = require('path');
var downLoadImg = require('./downLoadImg').download;
var c = require('./getData').c;
var configs = require('./configs').configs;



 var tool = {
    'checkUrl':function(urlString,config,urlAllArray){
        var re = true;
        var i=0;
        var j=0;
        // console.log(urlString);
        // console.log(config);
        for( i in config.notLikeKeyWord){

            if(urlString.indexOf(config.notLikeKeyWord[i])>-1 || urlAllArray.indexOf(urlString)>-1){
                re = false;
                break;
            }
        }
        if(re){
            for( j in config.likeKeyWord){
                if(urlString.indexOf(config.likeKeyWord[j])==-1){
                    re = false;
                    break;
                }

            }

        }

        return re;

    },
    'checkFolder':function (string) {
        if(!fs.existsSync(string)) {
            try  {
                fs.mkdirSync(string,'0777');
            }catch(e){
                console.log(e);
            }

        }
    },
    'checkFolName':function(str){
        return str.replace(/\s/g,'');
    },
    'localFileSize':function (href,downImageSize,callback){
        fs.stat(href,function (err, stats) {
            if (err){
                // throw err;
                console.log('localFileSize异常');
            }

            // console.log(data);
            if(stats.isFile()){
                callback(stats.size,downImageSize);
                // console.log('本地文件大小:'+stats.size);
            }else{
                callback(0,downImageSize);
            }
        });


},'checkImageUrl':function(urlString,configs){
        var re = true;
        var iu=0;
        for( iu in configs){

            if(urlString.indexOf(configs[iu])>-1){
                re = false;
                break;
            }
        }





    return re;
    }
    ,'checkImagesKeyWordUrl':function(urlString,configs){
         var re = false;
         var IK=0;
         for( IK in configs){

             if(urlString.indexOf(configs[IK])>-1){
                 re = true;
                 break;
             }
         }
         return re;
     },
     'sortType':function(arr,config){
         if(config=='desc'){
             arr.reverse();
         }else if(config=='asc'){
             arr.sort();
         }
     },
     'checkResetDownloadImage':function () {
         if(config[c].isResetDownImage==undefined){
             throw '未定义是否重新下载图片资源';
         }


         return config[c].isResetDownImage;
     },
     'deleteFile':function(savePath,callback){
         fs.unlink(savePath,function (err) {
             if(!err){
                 callback();
             }else{
                 throw err;
                 // console.log(err);
             }


         });//先删除已经存在的文件
     }


};

exports.tool = tool;

