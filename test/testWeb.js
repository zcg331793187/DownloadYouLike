"use strict";
/**
 * Created by zhoucaiguang on 2017/3/10.
 */
const req_1 = require('../service/api/req');
function send(url) {
    req_1.httpGet(url).then((req) => {
        console.log(req);
    }).catch((err) => {
        console.log(err);
    });
}
send('http://www.xiuren.org/category/TuiGirl-2.html');
