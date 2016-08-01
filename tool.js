/**
 * Created by zhoucaiguang on 16/7/13.
 */
'use strict';


var fs = require('fs');
var request= require('request');
var cheerio = require('cheerio');
var path = require('path');
var downLoadImg = require('./downLoadImg').download;
var getData = require('./getData').getData;
var configs = require('./configs').configs;



 var tool = {
    'checkUrl':function(urlString,config,urlAllArray){
        var re = true;
        var i=0;
        var j=0;
        // console.log(urlString);
        // console.log(config);
        for( i in config.notLikeKeyWord){

            try{
                if(urlString.indexOf(config.notLikeKeyWord[i])>-1 || urlAllArray.indexOf(urlString)>-1){
                    re = false;
                    break;
                }
            }catch (e){
                console.log('checkUlr'+e);
            }

        }
        if(re){
            for( j in config.likeKeyWord){
                try{
                    if(urlString.indexOf(config.likeKeyWord[j])==-1){
                        re = false;
                        break;
                    }
                }catch (e){
                    console.log('checkUlr'+e);
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
    'checkRegExp':function(str,exp){
        return str.replace(exp,'');
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
         if(config[getData.c].isResetDownImage==undefined){
             throw '未定义是否重新下载图片资源';
         }


         return config[getData.c].isResetDownImage;
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
     },
     'checkFolderNameElement':function(obj,ele,RegExp){
         var i = 0;
         var j = 0;
         var temp;
         for (i in ele){
             // obj(ele[i]).html();
             temp = obj(ele[i]).text();
             if(temp){

                 for( j in RegExp){

                     temp = tool.checkRegExp(temp,RegExp[j]);

                 }
             }
             if(temp){
                 console.log(temp);
                 break;
             }


         }
         if(!temp){
             temp = '未定义';
         }


        return temp;
     },
     'checkHeader':function(url,header){



     },
     'handleImgElement':function(obj,ele,attr,NotDownload){
         var tmp = [];
         var i = 0;
         var j = 0;
         var k = 0;
         var tmps = [];
         var tmpsStauts=true;
         var status;
         for (i in ele){
             obj((ele[i])).each(function(id,eles){
                    for (j in attr){
                        if(obj(eles).attr(attr[j])){

                            if(tmp.indexOf(obj(eles).attr(attr[j]))==-1){
                                tmp.push(obj(eles).attr(attr[j]));
                            }

                        }
                    }

                 // return;
         });
         }
         // console.log(tmp);

         // console.log('-------------------');
         for (var r in tmp){


             for(var t in NotDownload){

                 if(tmp[r].indexOf(NotDownload[t])>-1){
                     tmpsStauts = false;
                     break;
                 }



             }
             if(tmpsStauts){
                 tmps.push(tmp[r]);
             }
             tmpsStauts =true;

         }

         return tmps;
     },
     'checkDate':function(interval){
        var date = new Date();
         var dates;
         switch (interval)
         {
             case 'y':
                 dates = new Date(date.getFullYear());
                 break;
             case 'm':
                 dates = new Date(date.getFullYear(),date.getMonth());
                 break;
             case 'd':
                 dates = new Date(date.getFullYear(),date.getMonth(),date.getDay());
                 break;
             case 'h':
                 dates = new Date(date.getFullYear(),date.getMonth(),date.getDay(),date.getHours());
                 break;
             case 'M':
                 dates = new Date(date.getFullYear(),date.getMonth(),date.getDay(),date.getHours(),date.getMinutes());
                 break;
             case 's':
                 dates = new Date(date.getFullYear(),date.getMonth(),date.getDay(),date.getHours(),date.getMinutes(),date.getSeconds());
                 break;
             default:
                 dates = new Date(date.getFullYear(),date.getMonth(),date.getDay());
                 break;

         }
         return dates;
},
     'formDate':function(date){
         var tmp = Date.parse( date ).toString();
         tmp = tmp.substr(0,10);
         return tmp;
     },
     'DateAddORSub':function (dates,interval,type,number) {
         /*
          * 功能:实现Script的Date加减功能.
          * 参数:interval,字符串表达式，表示要添加的时间间隔.
          * 参数:number,数值表达式，表示要添加的时间间隔的个数.
          * 参数:type,加减类型.
          * 返回:新的时间对象.
          * var newDate =DateAddORSub("d","+",5);
          */
         var date = dates;
         switch(interval)
         {
             case "y" : {
                 if(type=="+"){
                     date.setFullYear(date.getFullYear()+number);
                 }else{
                     date.setFullYear(date.getFullYear()-number);
                 }
                 return date;
                 break;
             }
             case "q" : {
                 if(type=="+"){
                     date.setMonth(date.getMonth()+number*3);
                 }else{
                     date.setMonth(date.getMonth()-number*3);
                 }
                 return date;
                 break;
             }
             case "m" : {
                 if(type=="+"){
                     date.setMonth(date.getMonth()+number);
                 }else{
                     date.setMonth(date.getMonth()-number);
                 }
                 return date;
                 break;
             }
             case "w" : {
                 if(type=="+"){
                     date.setDate(date.getDate()+number*7);
                 }else{
                     date.setDate(date.getDate()-number*7);
                 }
                 return date;
                 break;
             }
             case "d" : {
                 if(type=="+"){
                     date.setDate(date.getDate()+number);
                 }else{
                     date.setDate(date.getDate()-number);
                 }
                 return date;
                 break;
             }
             case "h" : {
                 if(type=="+"){
                     date.setHours(date.getHours()+number);
                 }else{
                     date.setHours(date.getHours()-number);
                 }
                 return date;
                 break;
             }
             case "M" : {
                 if(type=="+"){
                     date.setMinutes(date.getMinutes()+number);
                 }else{
                     date.setMinutes(date.getMinutes()-number);
                 }
                 return date;
                 break;
             }
             case "s" : {
                 if(type=="+"){
                     date.setSeconds(date.getSeconds()+number);
                 }else{
                     date.setSeconds(date.getSeconds()-number);
                 }
                 return date;
                 break;
             }
             default : {
                 if(type=="+"){
                     date.setDate(d.getDate()+number);
                 }else{
                     date.setDate(d.getDate()-number);
                 }
                 return date;
                 break;
             }
         }
     }

};

exports.tool = tool;

