"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Created by zhoucaiguang on 2017/3/10.
 */
const req_1 = require('../service/api/req');
let iconv = require('iconv-lite');
// let zlib = require('zlib');
const zlib = require('zlib');
let imgs = [];
let headers = {
    iSgb2312: true,
    headers: {
        Host: 'bcy.net',
        Connection: 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        DNT: 1,
        Referer: "http://bcy.net/coser",
        'Accept-Encoding': "gzip, deflate, sdch",
        'Accept-Language': "zh-CN,zh;q=0.8",
        Cookie: "acw_tc=AQAAAFkUAn9CQQQAy8A2t0ryCX7tp5tO; PHPSESSID=3ctpoa25hd88e71c3nvfmejkr0; lang_set=zh; UM_distinctid=15b0601964e3ac-06ca498a41e063-1d3a6853-fa000-15b0601964f9a1; LOGGED_USER=Nn%2Flq9WmWx79eHT71Uf2byw%3D%3Ad2NnyjF654Y2u5RqI81PCA%3D%3D; mobile_set=no; CNZZDATA1257708097=1014489182-1490452282-null%7C1490534094; Hm_lvt_330d168f9714e3aa16c5661e62c00232=1490454419; Hm_lpvt_330d168f9714e3aa16c5661e62c00232=1490538074",
    },
};
const send = (url) => __awaiter(this, void 0, void 0, function* () {
    return yield req_1.httpGet(url, {}, headers);
});
function getQueryString(string, name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = string.match(reg);
    console.log(r);
    if (r != null)
        return r[2];
    return null;
}
/*
 async function  sendPro("http://bcy.net/coser/"){
    let ddd = aw zibPromise(res);
    console.log(ddd);
    var data = iconv.decode(ddd, 'utf-8');
    console.log(data);
}
*/
function sendPromise() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield send("http://bcy.net/coser/");
        let ddd = yield zibPromise(data);
        data = iconv.decode(ddd, 'utf-8');
        console.log(data);
    });
}
sendPromise();
/*
 zlib.gunzip(res, function(err, dezipped){

 var data = iconv.decode(dezipped, 'utf-8');

 console.log(data);
 });

});
 */
const zibPromise = (data) => __awaiter(this, void 0, void 0, function* () {
    return yield textzib(data);
});
const textzib = (data) => {
    return new Promise((resolve, reject) => {
        zlib.gunzip(data, function (err, dezipped) {
            resolve(dezipped);
        });
    });
};
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getSecond?containerid=1005052448582352_-_FOLLOWERS&jumpfrom=weibocom');
