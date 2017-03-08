/**
 * Created by zhoucaiguang on 16/7/29.
 */

"use strict";


var exec = require('child_process').exec,child;
var fs = require('fs');
var archiver = require('archiver');
var mail = require('../js/old-configs').mail;
var tool = require('../js/tool').tool;
var configs = require('../js/old-configs').configs;
var getData = require('../js/getData').getData;
var JSZip = require('jszip');



var compression = {
    dirList:function(path){
        var s;
        var list=[];
        var fileSize=0;
        var paths = fs.readdirSync(path);
        // console.log(paths);
        // fs.unlinkSync(curPath);
        var time = tool.formDate(tool.DateAddORSub(tool.checkDate(mail.time),mail.afterTime,mail.afterType,mail.after));
        for( s in paths ){
            if(paths[s]!=='.DS_Store'){

            if(paths[s]<time){
                // console.log('可使用'+path+paths[s]);
                // console.log(paths[s]);

               var rootFile =  fs.readdirSync(path+paths[s]);

                    for (var e in rootFile){
                        if(rootFile[e]!='.DS_Store'){
                        var size = fs.statSync(path+paths[s]+'/'+rootFile[e]);

                        fileSize+=size.size;
                        if(fileSize<6000){
                            // console.log(path+paths[s]+'/'+rootFile[e]);
                            list.push(path+paths[s]+'/'+rootFile[e]);
                        }
                        }
                    }
                // console.log(sfs);
            }
            }
        }
       return list;
    },  
    start:function(path,fileName,savePath){
        var archive = archiver('zip');


        var file = this.dirList(path);
        if(file.length==0){
            return;
        }
        console.log('开始压缩');

        var zip = new JSZip();

        file.forEach(function(file){
            var images = fs.readdirSync(file+'/');
            images.forEach(function(imamge){

                var foldsName =  tool.checkRegExp(file,/^\/[\s\S]+\//g);
                console.log(imamge);
                console.log(foldsName);
                zip.folder("images/"+foldsName).file(imamge, fs.readFileSync(file+'/'+imamge));
            });
            // console.log(file);



        });
        var data = zip.generate({base64:false,compression:'DEFLATE'});
        fs.writeFile(savePath+fileName, data, 'binary', function(){
            console.log('success');
            compression.delete(file);
            compression.mailServer(fileName);
        });




    },
    'delete':function(path){
        path.forEach(function(file){
            console.log('删除:'+file);
            child = exec('rm -rf '+file,function(err,out) {
                console.log(out); err && console.log(err);
            });
        });



    },
    'deleteZip':function(path,fileName){
        child = exec('rm -rf '+path+fileName,function(err,out) {
            console.log(out); err && console.log(err);
        });
    }
    ,
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





