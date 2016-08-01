/**
 * Created by zhoucaiguang on 16/7/29.
 */
"use strict";
var schedule = require("node-schedule");
var compressionData = require('../action/compressionData').compression;
var getData = require('../getData');
var configs = require('../configs').configs;



var scheduler ={
    start:function(time) {
        // console.log(time);
        // compressionData.start(configs[getData.c].imagesSavePath,'123.zip');
        //
        // return;
        var j = schedule.scheduleJob(time, function(){

            var date = new Date();
            var path = date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'日'+date.getHours()+'时'+date.getMinutes()+'分'+date.getMilliseconds()+'秒';
            // console.log(getData);
            console.log(path);
            console.log("执行任务");
            compressionData.start(configs[getData.c].imagesSavePath,path+'.zip');

        });
}
};

exports.schedule =scheduler;
