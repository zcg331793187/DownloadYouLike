/**
 * Created by zhoucaiguang on 16/7/29.
 */
"use strict";
var schedule = require("node-schedule");
var compressionData = require('../action/compressionData').compression;
var getData = require('../js/getData');
var configs = require('../js/old-configs').configs;
var mail = require('../js/old-configs').mail;



var scheduler ={
    start:function(time) {

        var times;

        if(typeof times=="string"){
            times = time;
        }else{
            var rule = new schedule.RecurrenceRule();
            // console.log(rule);
            // rule[time]
            var f = this.checkData(time);
            // rule.push(this.checkData(time));
            for (var s in f){
                rule[s] = f[s];
            }

            times = rule;

        }

        var j = schedule.scheduleJob(times, function(){

            var date = new Date();
            var path = date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'日'+date.getHours()+'时'+date.getMinutes()+'分'+date.getMilliseconds()+'秒';
            // console.log(getData);
            console.log(path);
            console.log("指定定时任务-压缩文件");
            // console.log(mail.archiveSavePath);
            compressionData.start(configs[getData.c].imagesSavePath,path+'.zip',mail.archiveSavePath);

        });
    },
    startEmail:function(time){
        var times;

        if(typeof times=="string"){
            times = time;
        }else{
            var rule = new schedule.RecurrenceRule();
            // console.log(rule);
            // rule[time]
            var f = this.checkData(time);
            // rule.push(this.checkData(time));
            for (var s in f){
                rule[s] = f[s];
            }

            times = rule;

        }

        var j = schedule.scheduleJob(times, function(){

            var date = new Date();
            var path = date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'日'+date.getHours()+'时'+date.getMinutes()+'分'+date.getMilliseconds()+'秒';
            // console.log(getData);
            console.log(path);
            console.log("指定定时任务发送邮件");
            // compressionData.start(configs[getData.c].imagesSavePath,path+'.zip');

        });


    },
    checkData:function(array){
        var i;
        var obj={};
        for (i in array){
            // obj.push(array[i]);
            // ob[array] = i;
            // console.log(array[i]);
            for (var s in array[i]){
                // console.log(array[i][s]);
                // console.log(s);
                obj[s] = array[i][s];
            }
        }

        // console.log(obj);
        return obj;
    }
};

exports.schedule =scheduler;
