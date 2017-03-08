/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
let url = require('url'); //解析操作url
function checkUrl(url, config, urlAll) {
    let re = true;
    for (let i in config.notLikeKeyWord) {
        try {
            if (url.indexOf(config.notLikeKeyWord[i]) > -1 || urlAll.indexOf(url) > -1) {
                re = false;
                break;
            }
        }
        catch (e) {
            console.log('checkUlr' + e);
        }
    }
    if (re) {
        for (let j in config.likeKeyWord) {
            try {
                if (url.indexOf(config.likeKeyWord[j]) == -1) {
                    re = false;
                    break;
                }
            }
            catch (e) {
                console.log('checkUlr' + e);
            }
        }
    }
    return re;
}
exports.checkUrl = checkUrl;
function spliceUrl(host, uri) {
    let href = null;
    try {
        href = url.resolve(host, uri);
    }
    catch (e) {
        console.log(e);
        throw 'url error';
    }
    return href;
}
exports.spliceUrl = spliceUrl;
function getAllHref($, configs, urlAll, urlNow) {
    let array = [];
    $('a').each((index, ele) => {
        let path = this.spliceUrl(configs.url, ele.attribs.href);
        let isOk = this.checkUrl(path, configs, urlAll);
        if (isOk) {
            urlAll.push(path);
            urlNow.push(path);
            array.push(path);
        }
    });
    return array;
}
exports.getAllHref = getAllHref;
