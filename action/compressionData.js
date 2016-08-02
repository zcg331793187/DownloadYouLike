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
        var fileSize=0;
        var paths = fs.readdirSync(path);
        // console.log(paths);
        fs.unlinkSync(curPath);
        var time = tool.formDate(tool.DateAddORSub(tool.checkDate(mail.time),mail.afterTime,mail.afterType,mail.after));
        for( s in paths ){
            if(paths[s]!=='.DS_Store'){
                console.log(paths[s]);
                console.log('------');
                console.log(time);
            if(paths[s]<time){
                // console.log('可使用'+path+paths[s]);
                // console.log(paths[s]);

               var rootFile =  fs.readdirSync(path+paths[s]);

                    for (var e=0 in rootFile){
                        if(rootFile[e]!='.DS_Store'){
                        var size = fs.statSync(path+paths[s]+'/'+rootFile[e]);
                        console.log('当前:'+size.size);
                        console.log('总:'+fileSize);
                        fileSize+=size.size;
                        if(fileSize<6500){
                            console.log(rootFile[e]);
                            console.log(fileSize);
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
        console.log(file);
        if(file.length==0){
            return;
        }
        console.log('开始压缩');
        var JSZip = require('jszip');
        var zip = new JSZip();

        file.forEach(function(file){
            var images = fs.readdirSync(file+'/');
            images.forEach(function(imamge){

                var foldsName =  tool.checkRegExp(file,/^\/[\s\S]+\//g);
                // console.log(imamge);

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


        return;

        // var imgs = fs.readdirSync("uploads/xiumm/1470122520");
        // console.log(imgs);
        // imgs.forEach(function(file){
        //     console.log("uploads/xiumm/1470122520"+file);
        //     var ee = fs.readdirSync("uploads/xiumm/1470122520/"+file);
        //     ee.forEach(function(files){
        //         console.log(files);
        //         zip.folder("images/"+file).file(files, fs.readFileSync("uploads/xiumm/1470122520/"+file+'/'+files));
        //
        //     })
        // });

        // var data = zip.generate({base64:false,compression:'DEFLATE'});
        // fs.writeFile('demo.zip', data, 'binary', function(){
        //     console.log('success');
        // });


/*
        var output = fs.createWriteStream('./zip/'+fileName);//压缩的名称
        archive.pipe(output);
        file.forEach(function(file,index){
            console.log(file);
            archive.bulk([
                { src: [file+'/**']} //读取的文件夹名称

            ]);

        });

        archive.finalize();
        archive.on('end',function(){
            compression.delete(file);
            // console.log(MailAction);
            compression.mailServer(fileName);
            console.log(fileName);

        });
*/

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





