/**
 * Created by zhoucaiguang on 16/7/29.
 */
"use strict";

var nodemailer = require('nodemailer');
var mailConfig = require('../configs').mail;
var compressionData = require('../action/compressionData').compression;




var sendMailer = {
    sendMailInfo:{
        service:mailConfig.service,
        auth:{
            user: mailConfig.auth.user,
            pass: mailConfig.auth.pass
        }
    },
    mailOptions:function(subject,text,html,attachments){

        return  {
            from: mailConfig.from, // sender address
            to: mailConfig.to, // list of receivers
            subject:subject,   //标题名
            text:text,//文本内容
            html:html,//html代码
            attachments:attachments//附件 数组对象
        }
    }
    ,
    send:function(Options,callback){
        console.log('开始发送邮件');
        var  transporter = nodemailer.createTransport(this.sendMailInfo);


        transporter.sendMail(this.mailOptions(Options['subject'],Options['text'],Options['html'],Options['attachments']), function(error, info){
            console.log('邮件发送完');
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
                callback();
            }
        });


    }
};

exports.Mailserver = sendMailer;



sendMailer.send(
    {subject:"邮件",
        text:"我是文本",
        html:'<b>你的图片资源已打包完成</b>',
        attachments:[
            {filename:"2016年7月1日11时21分312秒.zip",path:'../zip/'+"2016年7月1日11时21分312秒.zip"},
            {filename:"2016年7月1日11时21分312秒.zip",path:'../zip/'+"2016年7月1日11时24分316秒.zip"}
            ]
    },function(){
        console.log('发送成功----------------');
        // compressionData.deleteZip('../zip/',"uploads.zip");
    });


/*
var mailOptions = {
    from: mailConfig.from, // sender address
    to: mailConfig.to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>', // html body
    attachments: [
        {
            filename: 'text0.txt',
            content: 'hello world!'
        },
        {
            filename: 'text1.txt',
            path: './attach/text1.txt'
        },
        {
            filename: '2016年6月30日9时-2.zip',
            path: './2016年6月30日9时-3.zip'
        }
    ]

};
*/



