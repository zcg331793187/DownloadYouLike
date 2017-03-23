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
    // console.log(host);
    // console.log(uri);
    try {
        href = url.resolve(host, uri);
    }
    catch (e) {
        console.warn(e);
        throw 'url error';
    }
    return href;
}
exports.spliceUrl = spliceUrl;
function getAllHref($, _thisUrl, configs, urlAll, urlNow) {
    let array = [];
    $('a').each((index, ele) => {
        if (ele.attribs.href) {
            let path = this.spliceUrl(_thisUrl, ele.attribs.href);
            let isOk = this.checkUrl(path, configs, urlAll);
            if (isOk) {
                urlAll.push(path);
                urlNow.push(path);
                array.push(path);
            }
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
        // console.log(imgs);
        this.forEachSpliceUrl(url, imgs);
        title = this.checkFolderNameElement($, configs.FolderNameElement, configs.FolderNamRegExp, configs.FolderNameAttr);
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
function checkFolderNameElement(obj, ele, RegExp, attr) {
    let temp;
    let tempString = null;
    for (let i in ele) {
        temp = obj(ele[i]);
        obj((ele[i])).each((id, eles) => {
            for (let j in attr) {
                if (obj(eles).attr(attr[j])) {
                    tempString = obj(eles).attr(attr[j]);
                    break;
                }
            }
        });
    }
    if (!tempString) {
        tempString = temp['text']();
    }
    if (tempString) {
        for (let j in RegExp) {
            tempString = this.checkRegExp(tempString, RegExp[j]);
        }
    }
    if (!tempString) {
        tempString = '未定义';
    }
    return tempString;
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
function handleWeiBoImgs(req) {
    let imgs = [];
    req['cards'].forEach((item) => {
        // console.log(item['mblog']['pics']);
        if (item['mblog']['pics']) {
            item['mblog']['pics'].forEach((item) => {
                // console.log(item['large']['url']);
                imgs.push(item['large']['url']);
            });
        }
    });
    return imgs;
}
exports.handleWeiBoImgs = handleWeiBoImgs;
function handleWeiBoFollows(req) {
    let followList = [];
    if (req['cardlistInfo'].page) {
        if (req['cards']) {
            req['cards'].forEach((item) => {
                // console.log(item['mblog']['pics']);
                if (item['user']) {
                    followList.push({ uid: item['user']['id'], nickName: item['user']['screen_name'] });
                }
            });
        }
    }
    return followList;
}
exports.handleWeiBoFollows = handleWeiBoFollows;
function getContainerId(res) {
    return decodeURIComponent(res.headers['set-cookie'][2]).match(/fid=+[0-9]+/i)[0].replace(/fid=/, '');
}
exports.getContainerId = getContainerId;
