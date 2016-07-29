/**
 * Created by zhoucaiguang on 16/7/11.
 */
// var express = require('express');
// var request= require('request');
// var fs = require('fs');
// var url = require('url'); //解析操作url
// var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
// var cheerio = require('cheerio');
// var eventproxy = require('eventproxy');
// var async = require("async");
// var targetUrl = 'http://www.xiumm.cc/';
// var chuUrl = 'http://www.chuu.co.kr/product/detail.html?product_no=16082&cate_no=1&display_group=3';
// var EventProxy = require('eventproxy');
//
// var paths = require('path');



var sss = [ 'http://xdm.1985t.com/templets/xdm/images/grey.gif',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152203.jpg',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152204.gif',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152206.jpg',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152207.jpg',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152208.gif',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152208-50.jpg',
    'http://xdm.1985t.com/uploads/allimg/141015/2-141015152209.jpg' ];

var f = ['gif'];
for (var r in sss)
{
    for(var e in f){
        if(sss[r].indexOf(f[e])>-1){
            sss.splice(r,1);
        }
    }



}


console.log(sss);




return;






return;
// superagent.get(taotaoUrl)
//     .end(function (err, res) {
//
//         var $ = cheerio.load(res.text);
// //通过CSS selector来筛选数据
//         $('img').each(function (idx, element) {
//             var href = url.resolve(taotaoUrl, element.attribs.src);
//             console.log(href);
//
//         });
//     });
//
// return;
// request('http://www.xiumm.cc').pipe(
//
//
//     // fs.createWriteStream('1.html')
// )


// var str = "      aaabbbcccaaabbbccc";
// var reg = /\s/g;
// var res = str.replace(reg,'');
// console.log(res);
// var s=checkFolName('      aaabbbcccaaabbbccc');
function checkFolName(str){
    return str.replace(/\s/g,'');
}



function checkImageName(string) {

    var reg = /[/]/;
    var imageName;
    var res = string.split(reg);
    for (i in res)
    {

        if(res[i].indexOf('.jpg')>-1){
            imageName = res[i];
        }
    }

    return imageName;
}

var count= 0;
var path = './uploads/';
var allUrl = [];
var photos = [];
var nowUrl = [];
// var folder_exists = ;
//
// console.log(folder_exists);
// return;




// downloadImg('http://n.sinaimg.cn/mobileh5/20160711/Xqj6-fxtwihv0238521.jpg',path,'qweqwe');

/*
function downloadImg(url, dir, desc) {
    var fileType = 'jpg';
    if (url.match(/\.(\w+)$/)) fileType = RegExp.$1;
    desc += '.' + fileType;
    var options = {
        url: url,
        headers: {
            Host: 'f.hiphotos.baidu.com',
            Cookie: 'BAIDUID=810ACF57B5C38556045DFFA02C61A9F8:FG=1;'
        }
    };
    console.log(dir+desc);
    var startTime = new Date().getTime();
    request.get('http://n.sinaimg.cn/mobileh5/20160711/Xqj6-fxtwihv0238521.jpg')
        .on('response', function() {
            var endTime = new Date().getTime();
            console.log('Downloading...%s.. , 耗时: %ss', desc, (endTime - startTime) / 1000);
        })
        .pipe(fs.createWriteStream(dir+desc));
}
*/


download(targetUrl);
function download(targetUrl){
    console.log(targetUrl);
    allUrl.push(targetUrl);
    request(targetUrl, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            // console.log(body) ;// Show the HTML for the Google homepage.
            var $ = cheerio.load(body);
            var title;
            if(targetUrl.indexOf('photo')>-1){
                $("div .inline").each(function(idx, element){
                    if(element.children[0]){
                        title  =   checkFolName(element.children[0].data);
                    }else{
                        title ='未定名';
                    }
                    // console.log(element.children[0].data);
                });
            }else{
                title ='未定名';
            }


            checkFolder(path+title);
            /*
            $("a").each(function(idx, element){
                var href = url.resolve(targetUrl, element.attribs.href);
                // console.log(href);
                // console.log(href.indexOf('#'));
                if(href.indexOf('.html')>-1&&!contains(allUrl,href)&&href.indexOf('#')==-1){
                    download(href);

                    // console.log(href);
                }

            });

*/
            /*
            var urls = $("a").toArray();
            var len = urls.length;
            for (var i=0; i<len; i++) {
                var htmlUrl =  url.resolve(targetUrl, urls[i].attribs.href);
                // console.log(imgsrc);
                if(htmlUrl.indexOf('.html')>-1){
                    nowUrl.push(htmlUrl);
                }

            }
            if(nowUrl.indexOf('.html')>-1&&!contains(allUrl,nowUrl)&&nowUrl.indexOf('#')==-1){
                console.log('开始递归0'+nowUrl);
                download(nowUrl);
                callback(null,'success');
            }
            // console.log(nowUrl);
            async.mapLimit(nowUrl,5,function(nowUrl,callback){

                // console.log("已有"+1+"个进入下载队列");
                // console.log(nowUrl);

            },function(err,result){
                if(err){
                    console.log(err);
                }else{
                    var endTime = new Date().getTime();
                    console.log("全部已下载完毕！%ss",(endTime - startTime) / 1000);
                }
            });
            // console.log(err);
            return;
            */
            // console.log(urls);
            $("a").each(function(idx, element){
                var href = url.resolve(targetUrl, element.attribs.href);
                // console.log(href);
                // console.log(href.indexOf('#'));
                if(href.indexOf('.html')>-1&&!contains(allUrl,href)&&href.indexOf('#')==-1){
                    download(href);
                    // console.log('循环');

                }

            });


            if(targetUrl.indexOf('photo')>-1){
                $('img').each(function (idx, element) {

                    var href = url.resolve(targetUrl, element.attribs.src);
                    var imagesName  = paths.basename(href);
                    if(imagesName!=undefined){
                        // console.log(imagesName);
                        var savePath = path+title+'/'+imagesName;
                        saveImg(href,savePath,function(){
                            console.log('下载完了');
                        });
                        // photos.push(href);
                    }
                });

            }else{

            }

            
            // console.log(photos);
           








        }else{
            process.exit(0);
            console.log(error);
        }
    });
    // console.log(allUrl);
}
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}



function next($){
    console.log('下一个页面');

}

function saveImg(href,savePath,callback) {
    if(fs.existsSync(savePath)==false) {
        var startTime = new Date().getTime();
        request.get(href).on('error',function(error)
        {
            console.log(error);

        }).on('response',function(){

            var endTime = new Date().getTime();
            console.log('下载图片 第%s张...%s.. , 耗时: %ss', count,savePath, (endTime - startTime) / 1000);
            count++;
        }).pipe(fs.createWriteStream(savePath)).on('close',callback);

    }else{
        console.log('文件已存在');
    }


}



function checkFolder(string) {

    if(!fs.existsSync(string)) {
        fs.mkdirSync(string);
    }


}


var downloadImg=function(asyncNum){


    console.log("即将异步并发下载图片，当前并发数为:"+asyncNum);
    var startTime = new Date().getTime();
    async.mapLimit(s,asyncNum,function(photo,callback){
        s = [];
        
        console.log("已有"+asyncNum+"张图片进入下载队列");
        var fileName=paths.basename(photo);
        // console.log(fileName);
        // console.log(photo);
        // path+fileName;
        tsaveImg(photo,path+fileName,callback);
    },function(err,result){
        if(err){
            console.log(err);
        }else{
            var endTime = new Date().getTime();
            console.log("全部已下载完毕！%ss",(endTime - startTime) / 1000);
        }
    });
};

function tsaveImg(href,savePath,callback) {
    if(fs.existsSync(savePath)==false) {
        var startTime = new Date().getTime();
        request.get(href).on('error',function(error)
        {
            console.log(error);

        }).on('response',function(){

            var endTime = new Date().getTime();
            console.log('下载图片 第%s张...%s.. , 耗时: %ss', count,savePath, (endTime - startTime) / 1000);
            count++;
            callback(null,null,'success!');
        }).pipe(fs.createWriteStream(savePath));
    }else{
        console.log('文件已存在');
        callback(null,null,'success!');
    }


}

var tdownloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
        // console.log('content-length:', res.headers['content-length']);  //图片大小
        if (err) {
            console.log('err: '+ err);
            return false;
        }
        console.log('res: '+ res);
        request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};



// downloadImg(3);