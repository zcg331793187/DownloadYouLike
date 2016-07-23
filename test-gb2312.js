/**
 * Created by zhoucaiguang on 16/7/21.
 */
var request = require('request');
var Iconv = require('iconv-lite');
request({
    encoding: null,
    url: 'http://www.111cn.net'
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(Iconv.decode(body, 'gb2312').toString());
    }
});