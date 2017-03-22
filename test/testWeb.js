"use strict";
/**
 * Created by zhoucaiguang on 2017/3/10.
 */
const req_1 = require('../service/api/req');
let iconv = require('iconv-lite');
let weiboConfig = [
    {
        uid: 1628426184,
        containerid: 1005051628426184,
        type: 'uid',
        page: 2
    },
    { type: 'uid', uid: 3942420528, containerid: 1076033942420528, page: 0 },
    { type: 'uid', uid: 1728752564, containerid: 1076031728752564, page: 0 },
    { type: 'uid', uid: 2929743110, containerid: 1076032929743110, page: 0 },
    { type: 'uid', uid: 3134881602, containerid: 1076033134881602, page: 0 },
    { type: 'uid', uid: 3735089870, containerid: 1076033735089870, page: 0 },
    { type: 'uid', uid: 1077059532, containerid: 1076031077059532, page: 0 },
    { type: 'uid', uid: 5128118587, containerid: 1005055128118587, page: 0 },
    { type: 'uid', uid: 5973673955, containerid: 1005055973673955, page: 0 },
    { type: 'uid', uid: 1978790285, containerid: 1076031978790285, page: 0 },
    { type: 'uid', uid: 1772484360, containerid: 1005051772484360, page: 0 },
    { type: 'uid', uid: 1107634412, containerid: 1076031107634412, page: 0 },
    { type: 'uid', uid: 1813904040, containerid: 1076031813904040, page: 0 },
    { type: 'uid', uid: 1762594520, containerid: 1076031762594520, page: 0 },
    { type: 'uid', uid: 1839304432, containerid: 1076031839304432, page: 0 },
    { type: 'uid', uid: 5852122196, containerid: 1076035852122196, page: 0 },
    { type: 'uid', uid: 1996669711, containerid: 1076031996669711, page: 0 },
    { type: 'uid', uid: 1770708833, containerid: 1076031770708833, page: 0 },
    { type: 'uid', uid: 1804197323, containerid: 1076031804197323, page: 0 },
    { type: 'uid', uid: 5312402241, containerid: 1076035312402241, page: 0 },
    { type: 'uid', uid: 1843119742, containerid: 1005051843119742, page: 0 },
    { type: 'uid', uid: 5587338758, containerid: 1076035587338758, page: 0 },
    { type: 'uid', uid: 5018003687, containerid: 1076035018003687, page: 0 },
    { type: 'uid', uid: 5582985423, containerid: 1076035582985423, page: 0 },
    { type: 'uid', uid: 3629815205, containerid: 1076033629815205, page: 0 },
    { type: 'uid', uid: 3812507603, containerid: 1076033812507603, page: 0 },
];
let imgs = [];
function send(url) {
    req_1.httpGet(url, {}, {
        // iSgb2312:true,
        // headers: {
        // Host:'www.weibo.com',
        // Connection: 'keep-alive',
        // 'Cache-Control': 'max-age=0',
        // 'Upgrade-Insecure-Requests': 1,
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        // Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        // DNT: 1,
        // Referer: "http://www.weibo.com/",
        // 'Accept-Encoding': "gzip, deflate, sdch",
        // 'Accept-Language': "zh-CN,zh;q=0.8",
        //            Cookie:"SINAGLOBAL=3889529195148.498.1460995503303; TC-Ugrow-G0=e66b2e50a7e7f417f6cc12eec600f517; SCF=AuBz1pl9VkA7QhZvQSjCMbAaBo7HUcYKPLg4iINbvRL815fzZdF4q2oivUjHCBhQw90Y8Uoi4LbHOoq3j5WAwrQ.; SUHB=0JvxQx6Q4fT8Nn; _s_tentry=login.sina.com.cn; Apache=8599336089335.852.1490087743070; ULV=1490087743083:58:3:2:8599336089335.852.1490087743070:1489984022488; SUB=_2AkMvjH4LdcNhrAFVnPAQxGnhaY9H-jycWRf9An7uJhMyAxgv7k5RqSVdbdSlU1Y_PdbSWop5eVmAVKAxXw..; SUBP=0033WrSXqPxfM72wWs9jqgMF55529P9D9Whiz3igvEJ0r1aT3aV5ydFI5JpV8sSQdNHrIg9XUcL.9-5peoqVqcv_; login_sid_t=ce3aba7ce918a54e0c87b2b807fa16f8; UOR=,,www.baidu.com; YF-Ugrow-G0=b02489d329584fca03ad6347fc915997"
        //        }
        resolveWithFullResponse: true
    }).then((req) => {
        // console.log(req);
        // let   base64 = new Buffer(req).toString('base64');
        // let b = new Buffer(base64, 'base64');
        // let s = b.toString();
        // console.log(req[0]);
        let containerid = decodeURIComponent(req.headers['set-cookie'][2]).match(/fid=+[0-9]+/i)[0].replace(/fid=/, '');
        console.log(containerid);
        // ;
        // console.log(getQueryString(cookie,'fid'));
        // req = JSON.parse(req);
        console.log();
        console.log(req.body);
        return;
        console.log(req['cardlistInfo']);
        // req['cardlistInfo'],
        // console.log(req['cards']);
        req['cards'].forEach((item) => {
            // console.log(item['mblog']['pics']);
            if (item['mblog']['pics']) {
                item['mblog']['pics'].forEach((item) => {
                    // console.log(item['large']['url']);
                    imgs.push(item['large']['url']);
                });
            }
        });
        console.log(imgs.length);
        console.log(imgs);
        // req = iconv.decode(req, ' utf8');
        //
        // console.log(req);
        // console.log(body);
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
send('http://m.weibo.cn/u/1628426184');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getIndex');
// send('http://m.weibo.cn/container/getSecond?containerid=1005052448582352_-_FOLLOWERS&jumpfrom=weibocom');
