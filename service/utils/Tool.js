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
function forEachSpliceUrl(url, uris) {
    uris.forEach((item, index) => {
        uris[index] = this.spliceUrl(url, item);
    });
    return uris;
}
exports.forEachSpliceUrl = forEachSpliceUrl;
function handleImagesUrl(url, $, configs) {
    let isOk = this.checkImagesKeyWordUrl(url, configs.imagesKeyWordUrl);
    let imgs = [];
    let title;
    if (isOk) {
        imgs = this.handleImgElement($, configs.imagesInfoElement, configs.imagesAttr, configs.imagesNotDownload);
        this.forEachSpliceUrl(url, imgs);
        title = this.checkFolderNameElement($, configs.FolderNameElement, configs.FolderNamRegExp);
    }
    return { list: imgs, title: title };
}
exports.handleImagesUrl = handleImagesUrl;
function checkImagesKeyWordUrl(url, configs) {
    let re = false;
    for (let IK in configs) {
        if (url.indexOf(configs[IK]) > -1) {
            re = true;
            break;
        }
    }
    return re;
}
exports.checkImagesKeyWordUrl = checkImagesKeyWordUrl;
function checkFolderNameElement(obj, ele, RegExp) {
    let temp;
    for (let i in ele) {
        // obj(ele[i]).html();
        temp = obj(ele[i]).text();
        if (temp) {
            for (let j in RegExp) {
                temp = this.checkRegExp(temp, RegExp[j]);
            }
        }
        if (temp) {
            console.log(temp);
            break;
        }
    }
    if (!temp) {
        temp = '未定义';
    }
    return temp;
}
exports.checkFolderNameElement = checkFolderNameElement;
function checkRegExp(str, exp) {
    return str.replace(exp, '');
}
exports.checkRegExp = checkRegExp;
function handleImgElement(obj, ele, attr, NotDownload) {
    let tmp = [];
    let tmps = [];
    let tmpsStauts = true;
    for (let i in ele) {
        obj((ele[i])).each(function (id, eles) {
            for (let j in attr) {
                if (obj(eles).attr(attr[j])) {
                    if (tmp.indexOf(obj(eles).attr(attr[j])) == -1) {
                        tmp.push(obj(eles).attr(attr[j]));
                    }
                }
            }
            // return;
        });
    }
    for (let r in tmp) {
        for (let t in NotDownload) {
            if (tmp[r].indexOf(NotDownload[t]) > -1) {
                tmpsStauts = false;
                break;
            }
        }
        if (tmpsStauts) {
            tmps.push(tmp[r]);
        }
        tmpsStauts = true;
    }
    return tmps;
}
exports.handleImgElement = handleImgElement;
function sortType(arr, config) {
    if (config == 'desc') {
        arr.reverse();
    }
    else if (config == 'asc') {
        arr.sort();
    }
}
exports.sortType = sortType;
