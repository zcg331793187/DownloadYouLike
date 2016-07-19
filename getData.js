/**
 * Created by zhoucaiguang on 16/7/12.
 */
var EventProxy = require('eventproxy');
// var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var path = require('path');
var express = require('express');
var request= require('request');
var url = require('url'); //解析操作url
var cheerio = require('cheerio');
var config = require('./configs').configs;
var downLoadImg = require('./downLoadImg').download;
var tool = require('./tool').tool;
// var iconv = require('iconv-lite');


var c = 0;
var urlNowArray = [];
var urlErrorArrary = [];
var eqCount = 0;
var ep = new EventProxy();
// console.log(config[c].urlSearchType.likeKeyWord);
// console.log(config[c].urlSearchType.notLikeKeyWord);



var downLoadPath = config[c].imagesSavePath;


//明天开发 如果文件已经存在就判断文件大小是否相等,如果相等就表示下载,如果不相等就重新下载(删除重新下载或者断电续传)
// pop();
// sort();
// push();
// shift();


// ep.tail('url', 'image', function (tpl, data) {
//     // 在所有指定的事件触发后，将会被调用执行
//     // 参数对应各自的事件名的最新数据
//     var nowUrl = urlNowArray.shift();
//     console.log('新链接:'+nowUrl);
//     getUrl(nowUrl);
//
//     eqCount++;
//     console.log('第'+eqCount+'次');
//
// });
ep.tail('all',function (tpl) {
    urlNowArray.sort();

});
// var urlsss = config[c].webRoot;
/*
function go(){
    var nowUrl = urlNowArray.shift();
    console.log('新链接:'+nowUrl);
    eqCount++;
    console.log('第'+eqCount+'次');
    console.log('列队内剩余'+urlNowArray.length);
    if(nowUrl){

        getUrl(nowUrl);
    }else{
        console.log('-------------已遍历所有链接,程序将重置----------------------');

        urlNowArray = [];
        urlAllArray = [];
        count = 0;
        eqCount = 0;
        if(config[c].autoNext){
            c++;
        }
        getUrl(config[c].webRoot);
        // return;

    }

}
*/




/*
ep.after('got_next_url',2, function (list) {
    // 在所有指定的事件触发后，将会被调用执行
    // 参数对应各自的事件名的最新数据
    var nowUrl = urlNowArray.shift();
    console.log('新链接:'+nowUrl);
    getUrl(nowUrl);

    eqCount++;
    console.log('第'+eqCount+'次');

});
*/








var getData = {
    'init':function(){

        this.getUrl(config[c].webRoot);
    },
    'urlAllArray':[],
    'urlNowArray':[],
    'urlErrorArray':[],
    'eqCount':0,
    'count':0,
    'go':function(){
        if(config[c].isSort){
            tool.sortType(getData.urlNowArray,config[c].sortType);
            // getData.urlNowArray.sort();
        }
        var nowUrl = getData.urlNowArray.shift();


        if(nowUrl){
            console.log('新链接:'+nowUrl);
            console.log('第'+getData.eqCount+'次');
            console.log('列队内剩余'+getData.urlNowArray.length);
            getData.eqCount++;
            this.getUrl(nowUrl);
        }else{
            console.log('-------------已遍历所有链接,程序将重置----------------------');

            getData.urlNowArray = [];
            getData.urlAllArray = [];
            getData.count = 0;
            getData.eqCount = 0;
            console.log('列队内剩余'+getData.urlNowArray.length);
            if(config[c].autoLoop){
                this.getUrl(config[c].webRoot);
                return;
            }


            if(config[c].autoNext){
                c++;
                if(config[c]){
                    this.getUrl(config[c].webRoot);
                }else{
                    console.log('下一个配置不存在,返回执行当前配置');
                    c--;
                    this.getUrl(config[c].webRoot);
                }

            }

            // return;

        }


    },
    'getUrl':function(durl){
        console.log('当前时间:', new Date());

        request.get(durl,{timeout: config[c].urlTimeout},function(error, response, body){
            if (!error && response.statusCode == 200) {
                console.log('响应');
                var $ = cheerio.load(body);
                $("a").each(function (idx, element) {
                    try{
                        var href = url.resolve(durl, element.attribs.href);

                    }catch (e){
                        console.log(e);

                    }
                    // console.log(href);
                    var res = tool.checkUrl(href,config[c].urlSearchType,getData.urlAllArray);
                    if(res){//过滤不满足条件的url
                        getData.urlAllArray.push(href);
                        getData.urlNowArray.push(href);
                    }

                });
                // console.log('3响应');
                // ep.emit('all', '完成');//临时
                // var options = tool.checkHeader(durl,config[c]);


                getData.getImages(durl);
                getData.go();
            }else{
                if(getData.urlErrorArray.indexOf(durl)==-1){
                    getData.urlNowArray.push(durl);
                    getData.urlErrorArray.push(durl);
                }
                getData.go();
                // var nowUrl = urlNowArray.shift();
                // getUrl(nowUrl);
                // ep.emit('all', '完成');
                console.log('请求异常,进入下一次链接');
            }
        }).on('error',function(){
            // ep.emit('all', '完成');
            // process.exit(0);//退出进程
            if(getData.urlErrorArray.indexOf(durl)==-1){
                getData.urlNowArray.push(durl);
                getData.urlErrorArray.push(durl);
            }
            console.log('请求异常,重新放入队列中,进入下一次链接');//请求失败的重新放入队列中
        });

    },
    'getImages':function(durl){
        request.get(durl,{timeout:config[c].timeout},function(error, response, body){
            if (!error && response.statusCode == 200) {
                // console.log('相应');
                // ep.emit('got_url', null);

                var $ = cheerio.load(body);
                var title;
                var res = tool.checkImagesKeyWordUrl(durl,config[c].imagesKeyWordUrl);
                if (res) {

                 title= tool.checkFolderNameElement($,config[c].FolderNameElement,config[c].FolderNamRegExp);
                   //过滤title中的不需要内容

                    tool.checkFolder(config[c].imagesSavePath + title);//创建不存在的文件夹
                    var imgs = tool.handleImgElement($,config[c].imagesInfoElement,config[c].imagesAttr);
                    //所有获取到的图片属性src却不重复

                    // var imgs = $(config[c].imagesInfoElement[0]).toArray();
                    // console.log(imgs);
                    var len = imgs.length;
                    // console.log('需要下载'+len+'张图片');
                    ep.after('got_url', len, function (list) {
                        // console.log('下载完'+list);
                        // console.log(len+'张图片下载完');

                        // ep.emit('all', '完成');
                        // ep.emit('got_next_url', '完成');
                        // ep.emit('got_next_url', '完成');
                        // ep.emit('url', '完成');
                        // ep.emit('image', '完成');
                    });
                    var i = 0;
                    var s = 0;
                    for (i; i < len; i++) {
                  if(imgs[i]) {
                      try{
                          var href = url.resolve(durl, imgs[i]);
                      }catch (e){
                          console.log(e);
                          continue;
                      }

                      var imagesName = path.basename(href);
                      var savePath = config[c].imagesSavePath + title + '/' + imagesName;
                      if (imagesName != undefined) {
                          var re = tool.checkImageUrl(href, config[c].imagesNotDownload);
                          if (re) {
                              downLoadImg.saveImg(href, savePath, function (message) {
                                  // ep.emit('got_next_url', message);
                                  console.log('已下载%s张图片', s);
                                  // ep.emit('got_url', message);
                              });
                          }

                      } else {

                      }
                  }


                        s++;
                    }


                }else {

                    ep.emit('all', durl);
                }
            }
        }).on('error',function(err){
            if(getData.urlErrorArray.indexOf(durl)==-1){
                getData.urlNowArray.push(durl);
                getData.urlErrorArray.push(durl);
            }
            console.log('图片请求异常'+err);
            ep.emit('all', durl);
        });


    }
};


exports.getData = getData;
exports.c = c;

/*
function getUrl(durl){
    console.log('当前时间:', new Date());

    // console.log('1开始请求');
    request.get(durl,{timeout: config[c].timeout},function(error, response, body){
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            // console.log('2响应');
            $("a").each(function (idx, element) {

                // console.log(element.attribs);

                var href = url.resolve(durl, element.attribs.href);

                if(checkUrl(href,config.urlSearchType)){//过滤不满足条件的url
                    urlAllArray.push(href);
                    urlNowArray.push(href);
                }
                // if (href.indexOf('.html') > -1 &&urlAllArray.indexOf(href)==-1&& href.indexOf('#') == -1) {
                //
                //     // console.log('循环');
                //
                // }
            });
            // console.log('3响应');
            // ep.emit('all', '完成');//临时
            getImages(durl);
            go();
        }else{
            if(urlErrorArrary.indexOf(durl)==-1){
                urlNowArray.push(durl);
                urlErrorArrary.push(durl);
            }
            go();
            // var nowUrl = urlNowArray.shift();
            // getUrl(nowUrl);
            // ep.emit('all', '完成');
            console.log('请求异常,进入下一次链接');
        }
}).on('error',function(){
        // ep.emit('all', '完成');
        // process.exit(0);//退出进程
        if(urlErrorArrary.indexOf(durl)==-1){
            urlNowArray.push(durl);
            urlErrorArrary.push(durl);
        }
        console.log('请求异常,重新放入队列中,进入下一次链接');//请求失败的重新放入队列中
    });
    // console.log('1.1响应');

}
*/
/*
function getImages(durl){
    // console.log('请求图片');

    request.get(durl,{timeout:config[c].timeout},function(error, response, body){
        if (!error && response.statusCode == 200) {
            // console.log('相应');
            // ep.emit('got_url', null);

            var $ = cheerio.load(body);
            var title;
            if (durl.indexOf('photo') > -1) {
                $("div .inline").each(function (idx, element) {
                    if (element.children[0]) {
                        title = checkFolName(element.children[0].data);
                    } else {
                        title = '未命名';
                    }
                    // console.log(element.children[0].data);
                });


            checkFolder(downLoadPath + title);

                var imgs = $('td img').toArray();
                // console.log(imgs);
                var len = imgs.length;
                console.log('需要下载'+len+'张图片');
                ep.after('got_url', len, function (list) {
                    // console.log('下载完'+list);
                    console.log(len+'张图片下载完');

                    // ep.emit('all', '完成');
                    // ep.emit('got_next_url', '完成');
                    // ep.emit('got_next_url', '完成');
                    // ep.emit('url', '完成');
                    // ep.emit('image', '完成');
                });
                var i = 0;
                for (i; i < len; i++) {

                    var href = url.resolve(durl, imgs[i].attribs.src);
                    var imagesName = path.basename(href);
                    var savePath = downLoadPath + title + '/' + imagesName;
                    if (imagesName != undefined) {
                        saveImg(href, savePath, function (message) {
                            // ep.emit('got_next_url', message);
                            console.log('已下载'+i+'张图片');
                            // ep.emit('got_url', message);
                        });
                    } else {

                    }




                }


            }else {

                ep.emit('all', durl);
            }
        }
    }).on('error',function(err){
        if(urlErrorArrary.indexOf(durl)==-1){
            urlNowArray.push(durl);
            urlErrorArrary.push(durl);
        }
        console.log('图片请求异常'+err);
        ep.emit('all', durl);
    });


}
*/
















