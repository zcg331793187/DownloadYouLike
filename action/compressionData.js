/**
 * Created by zhoucaiguang on 16/7/29.
 */

"use strict";


var exec = require('child_process').exec,child;
var fs = require('fs');
var archiver = require('archiver');
var mail = require('../configs').mail;
var tool = require('../tool').tool;
var configs = require('../configs').configs;
var getData = require('../getData').getData;




var compression = {
    dirList:function(path){
        var s;
        var list=[];
        var paths = fs.readdirSync(path);

        var time = tool.formDate(tool.DateAddORSub(tool.checkDate(mail.time),mail.afterTime,mail.afterType,mail.after));
        for( s in paths ){
            if(paths[s]<time){
                list.push(paths[s]);
            }
        }
       return list;
    },  
    start:function(path,fileName,callback){
        var archive = archiver('zip');


        var file = this.dirList('./'+path);
        if(file.length==0){
            return;
        }

        var output = fs.createWriteStream('./zip/'+fileName);//压缩的名称
        archive.pipe(output);
        file.forEach(function(file,index){
            console.log(path+'/'+file);
            archive.bulk([
                { src: [path+'/'+file+'/**']} //读取的文件夹名称

            ]);

        });

        archive.finalize();
        archive.on('end',function(){
            compression.delete(path,file);
            // console.log(MailAction);
            compression.mailServer(fileName);
            console.log(fileName);

        });


    },
    'delete':function(path,fileArray){
        var s;

        for (s in fileArray){
            child = exec('rm -rf '+path+'/'+fileArray[s],function(err,out) {
                console.log(out); err && console.log(err);
            });
        }


    },
    'deleteZip':function(path,fileName){
        child = exec('rm -rf '+path+fileName,function(err,out) {
            console.log(out); err && console.log(err);
        });
    },
    'mailServer':function(fileName){
        var mailService = require('../action/sendMailFoMy').Mailserver;

        mailService.send(
            {subject:"来自vps的打包资源",
                text:"我是文本",
                html:'<b>你的图片资源已打包完成</b>',
                attachments:[{filename:fileName,path:'./zip/'+fileName}]
            },function(){
                console.log('发送成功----------------');
                compression.deleteZip('../zip/',fileName);
            });
    }



};


exports.compression = compression;

// compression.start('.'+configs[getData.c].imagesSavePath,'sad.zip');
// compression.dirList('../uploads/xiumm');
// c++;
// compression.start('.'+configs[getData.c].imagesSavePath,'sad.zip');


// return;
//压缩文件->发送邮件->删除本地文件->等待下一次循环
// var date = new Date();
// var path = date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'日'+date.getHours()+'时';
// compression.start('../img/'+path,path+'.zip');







/*
 child = exec('rm -rf '+p+'/'+file,function(err,out) {
 console.log(out); err && console.log(err);
 });
 */
/*


function DateAddORSub(dates,interval,type,number)
{
    /*
     * 功能:实现Script的Date加减功能.
     * 参数:interval,字符串表达式，表示要添加的时间间隔.
     * 参数:number,数值表达式，表示要添加的时间间隔的个数.
     * 参数:type,加减类型.
     * 返回:新的时间对象.
     * var newDate =DateAddORSub("d","+",5);
     */
/*
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
        case "m" : {
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

var timestamp =Math.round(new Date(2015,4,28,2,0,0).getTime()/1000);
function timest(data) {
    var tmp = Date.parse( data ).toString();
    console.log(tmp);
    tmp = tmp.substr(0,10);
    return tmp;
}
console.log(timestamp);
console.log(new Date(timestamp*1000));
//当前时间加五天.
var newDate = DateAddORSub(new Date(timestamp*1000),"h","-",1);
console.log(Math.round(newDate.getTime()/1000));





*/