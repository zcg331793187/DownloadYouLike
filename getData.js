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
var Iconv = require('iconv-lite');

var c = 0;
var ep = new EventProxy();













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
                    c=0;
                    this.getUrl(config[c].webRoot);
                }

            }

            // return;

        }


    },
    'getUrl':function(durl){
        console.log('当前时间:', new Date());

        var option = {
            url:durl,
        timeout: config[c].urlTimeout
        };
        if(config[c].iSgb2312==true){
            option.encoding = null
        }
        request(option,function(error, response, body){
            if (!error && response.statusCode == 200) {
                console.log('响应');

                if(config[c].iSgb2312==true){
                    body = Iconv.decode(body, 'gb2312');
                }

                var $ = cheerio.load(body);
                $("a").each(function (idx, element) {
                    try{
                        var href = url.resolve(option.url, element.attribs.href);


                    }catch (e){
                        console.log(e);

                    }
                    // console.log(href);
                    if(href){
                        var res = tool.checkUrl(href,config[c].urlSearchType,getData.urlAllArray);
                        if(res){//过滤不满足条件的url
                            getData.urlAllArray.push(href);
                            getData.urlNowArray.push(href);
                        }
                    }


                });
                // console.log('3响应');
                // ep.emit('all', '完成');//临时
                // var options = tool.checkHeader(durl,config[c]);
                var options = {
                    url:option.url,
                    timeout:config[c].timeout
                };
                if(config[c].iSgb2312==true){
                    options.encoding = null
                }


                getData.getImages(options);
                getData.go();
            }else{


                if(getData.urlErrorArray.indexOf(option.url)==-1){
                    getData.urlNowArray.push(option.url);
                    getData.urlErrorArray.push(option.url);
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
    'getImages':function(option){
        request(option,function(error, response, body){
            if (!error && response.statusCode == 200) {
                // console.log('相应');
                // ep.emit('got_url', null);
                // var imgs = getData.imagesUrl(option,body,config);
                //
                // console.log(imgs);
                // console.log('imagesUrl');
                // return;

                if(config[c].iSgb2312==true){
                    body = Iconv.decode(body, 'gb2312');
                }
                var $ = cheerio.load(body);
                var title;
                var res = tool.checkImagesKeyWordUrl(option.url,config[c].imagesKeyWordUrl);
                if (res) {

                 title= tool.checkFolderNameElement($,config[c].FolderNameElement,config[c].FolderNamRegExp);
                   //过滤title中的不需要内容

                    tool.checkFolder(config[c].imagesSavePath + title);//创建不存在的文件夹
                    console.log(config[c].imagesSavePath + title);
                    var imgs = tool.handleImgElement($,config[c].imagesInfoElement,config[c].imagesAttr,config[c].imagesNotDownload);
                    // var imgs = getData.imagesUrl(body,config[c]);
                    //所有获取到的图片属性src却不重复
                    console.log(imgs);

                    // console.log(imgs);
                    var len = imgs.length;

                    var i = 0;
                    var s = 0;
                    for (i; i < len; i++) {
                        if(imgs[i]) {
                            var href;

                            if(imgs[i].indexOf('http://')==-1){

                                try{
                                    href = url.resolve(option.url, imgs[i]);
                                }catch (e){
                                    console.log(e);
                                    continue;
                                }
                            }else{
                                href  = imgs[i];
                            }
                            // console.log(href);
                            var imagesName = path.basename(href);
                            var savePath = config[c].imagesSavePath + title + '/' + imagesName;
                            if (imagesName != undefined) {

                                // console.log(href);
                                var opntion = {
                                    url:href,
                                    timeOut:config[c].imgTimeout
                                };
                                if(config[c].headers.Referer!=''){
                                    opntion.headers =config[c].headers;
                                }
                                // console.log(opntion);
                                downLoadImg.saveImg(opntion, savePath, function (message) {
                                    // ep.emit('got_next_url', message);
                                    // console.log('已下载%s张图片', s);
                                    // ep.emit('got_url', message);
                                });
                            }


                        }


                        s++;
                    }


                }else {

                    // ep.emit('all', durl);
                }
            }
        }).on('error',function(err){
            if(getData.urlErrorArray.indexOf(option.url)==-1){
                getData.urlNowArray.push(option.url);
                getData.urlErrorArray.push(option.url);
            }
            console.log('图片请求异常'+err);
            // ep.emit('all', durl);
        });


    },
    'imagesUrl':function (option,body,config) {
        if(config[c].iSgb2312==true){
            body = Iconv.decode(body, 'gb2312');
        }
        var $ = cheerio.load(body);
        var title;
        var res = tool.checkImagesKeyWordUrl(option.url,config[c].imagesKeyWordUrl);
        if (res) {
            title= tool.checkFolderNameElement($,config[c].FolderNameElement,config[c].FolderNamRegExp);
            //过滤title中的不需要内容
            tool.checkFolder(config[c].imagesSavePath + title);//创建不存在的文件夹
            console.log(config[c].imagesSavePath + title);
            var imgs = tool.handleImgElement($,config[c].imagesInfoElement,config[c].imagesAttr,config[c].imagesNotDownload);


        }
        if(!imgs){
            imgs = [];
        }

        return imgs;
    }
};


exports.getData = getData;
exports.c = c;
















