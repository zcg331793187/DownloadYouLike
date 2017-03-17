"use strict";
/**
 * Created by zhoucaiguang on 2017/3/10.
 */
const req_1 = require('../service/api/req');
let iconv = require('iconv-lite');
function send(url) {
    req_1.httpGet(url, {}, { iSgb2312: true }).then((req) => {
        var body = iconv.decode(req, 'gb2312');
        console.log(body);
    }).catch((err) => {
        console.log(err);
    });
}
send('http://www.rosmm.com');
