"use strict";
/**
 * Created by zhoucaiguang on 2017/3/10.
 */
const req_1 = require('../service/api/req');
let iconv = require('iconv-lite');
let imgs = [];
function send(url) {
    req_1.httpGet(url, {}, {}).then((req) => {
        console.log(req);
    }).catch((err) => {
        console.log(err);
    });
}
function getQueryString(string, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = string.match(reg);
    console.log(r);
    if (r != null)
        return r[2];
    return null;
}
send('https://zippler.tuchong.com/');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getSecond?containerid=1005052448582352_-_FOLLOWERS&jumpfrom=weibocom');
