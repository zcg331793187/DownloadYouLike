/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
const rp = require('request-promise');
const Promise = require('bluebird');
(function (MethodEnum) {
    MethodEnum[MethodEnum["GET"] = 0] = "GET";
    MethodEnum[MethodEnum["POST"] = 1] = "POST";
})(exports.MethodEnum || (exports.MethodEnum = {}));
var MethodEnum = exports.MethodEnum;
function processOptions(method, option, data) {
    if (method == MethodEnum.GET) {
        option.qs = data;
    }
    else if (method == MethodEnum.POST) {
        option.body = data;
    }
    else {
        throw ('未知的请求方式');
    }
}
function req(uri, data, method) {
    var options = {
        uri: uri
    };
    processOptions(method, options, data);
    return rp(options).then((response) => {
        return Promise.resolve(response);
    }).catch((err) => {
        return Promise.reject(err);
    });
}
function httpGet(uri, data = {}) {
    return req(uri, data, MethodEnum.GET);
}
exports.httpGet = httpGet;
function httpPost(uri, data = {}) {
    return req(uri, data, MethodEnum.POST);
}
exports.httpPost = httpPost;
