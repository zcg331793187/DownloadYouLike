/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const req_1 = require('./req');
const role_1 = require('../configs/role');
const weiboRole_1 = require('../configs/weiboRole');
const cheerio = require('cheerio');
const Tool = require('../utils/Tool');
const mysql_1 = require('../dbBase/mysql');
// import * as Promise from 'bluebird';
const log4 = require('log4js');
const log4_1 = require('../configs/log4');
let iconv = require('iconv-lite');
class robot {
    constructor() {
        this.urlAll = [];
        this.urlNow = [];
        this.index = 0;
        this.count = 0;
        this.loop = 0;
        this.indexWb = 0;
        this.indexFollow = 0;
        this.db = new mysql_1.default();
        log4.configure(log4_1.log4Config);
        this.log = log4.getLogger();
    }
    test() {
        let list = [
            'http://www.xiumm.cc/data/0166/79/14869855439014.jpg',
            'http://www.xiumm.cc/data/0166/79/1486985542263.jpg',
            'http://www.xiumm.cc/data/0166/79/14869855394032.jpg',
            'http://www.xiumm.cc/data/0166/79/14869855434423.jpg',
            'http://www.xiumm.cc/data/0166/82/14869855847266.jpg',
        ];
        // this.db.checkImgDataAndInsert(list,'测试');
        // return  this.db.addImgTitle('123123','http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        return this.db.checkImgDataAndInsert(list, '测试');
        // console.log(ddd);
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
        // this.db.addImgData(123,'http://www.xiumm.cc/data/0166/82/14869855847266.jpg');
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // let ddd =   this.test();
            //
            this.getUrl();
            this.getWeiboImgInit(0, 0);
            // this.getWeiboFollowInit(0);
        });
    }
    handelAuto() {
        let task = role_1.configs[this.index];
        if (!task) {
            this.index = 0;
            return this.handelAuto();
        }
        if (task['autoLoop'] == true) {
            this.index++;
            console.log(task.url);
            return task;
        }
        this.index++;
        return this.handelAuto();
    }
    getWeiboFollowInit(page) {
        this.getWeiboFollowList(page).then(res => {
            if (res['_data']['count']) {
                this.getWeiboFollowInit(res.config.page);
            }
            else {
                console.log('end');
            }
        });
    }
    getWeiboImgInit(page, offset) {
        this.getWeiboUrl(page, offset).then(res => {
            if (res['_data']['cardlistInfo']['page']) {
                this.getWeiboImgInit(res.page, offset);
            }
            else {
                offset++;
                this.getWeiboImgInit(0, offset);
            }
        });
    }
    getWeiboFollowList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(page);
            let config = weiboRole_1.followListConfig[this.indexFollow];
            let _data = [];
            let okData;
            let option = {};
            let follows = [];
            if (config) {
                try {
                    let res = yield req_1.httpGet(weiboRole_1.followListAPi, config, option);
                    _data = JSON.parse(res);
                    follows = Tool.handleWeiBoFollows(_data);
                    okData = yield this.getWeiboUserContainerId(follows);
                    okData = yield this.getWeiboMobileContainerId(okData);
                    yield this.db.insertWeiBoFollow(okData);
                    console.log('请求完一次');
                }
                catch (err) {
                    console.warn(err.statusCode);
                    if (err.statusCode == 403) {
                        yield this.setTimeout(120);
                    }
                }
                config.page++;
            }
            yield this.setTimeout(5);
            console.log('走');
            return { config: config, _data: _data };
        });
    }
    setTimeout(m) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(null);
                }, m * 1000);
            });
        });
    }
    getWeiboUserContainerId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i of data) {
                i.containerId = yield req_1.httpGet(weiboRole_1.weiboMobileApi + i.uid, {}, { resolveWithFullResponse: true });
                i.containerId = Tool.getContainerId(i.containerId);
            }
            return data;
        });
    }
    getWeiboMobileContainerId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp;
            for (let i of data) {
                temp = yield req_1.httpGet(weiboRole_1.weiboUserDataApi, { uid: i.uid, containerid: i.containerId }, {});
                temp = JSON.parse(temp);
                i.containerId = temp['tabsInfo']['tabs'][1]['containerid'];
            }
            return data;
        });
    }
    getWeiboUrl(page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            let configDb = yield this.db.getWeiBoFollow(offset);
            let idObj;
            let config = {};
            let data;
            if (configDb) {
                try {
                    config = { page: page, uid: configDb.uid, containerid: configDb.containerId };
                    data = yield req_1.httpGet(weiboRole_1.weiboUserDataApi, config, {});
                    data = JSON.parse(data);
                    let imgs = Tool.handleWeiBoImgs(data);
                    idObj = yield this.db.checkTtileIsSave(configDb.niceName);
                    if (!idObj) {
                        idObj = yield this.db.addImgTitle(configDb.niceName, imgs[0]);
                    }
                    yield this.db.addWeiBoImgs(imgs, idObj.id);
                }
                catch (error) {
                    console.warn(error.statusCode);
                    if (error.statusCode == 403) {
                        yield this.setTimeout(120);
                    }
                }
                page++;
            }
            else {
                console.log('没有可用微博爬虫配置信息');
                yield this.setTimeout(360);
            }
            yield this.setTimeout(3);
            // console.log(data);
            return { page: page, _data: data, offset: offset };
        });
    }
    getUrl() {
        let _this = this;
        if (_this.urlNow.length == 0) {
            _this.urlAll = [];
            _this.urlNow = [];
            _this.count = 0;
            _this.task = _this.handelAuto();
            _this.url = _this.task.url;
            _this.loop++;
        }
        else {
            Tool.sortType(_this.urlNow, _this.task.sortType);
            _this.url = _this.urlNow.shift();
        }
        console.log('进行地址：', _this.url);
        _this.loopGetUrl(_this.url, {}, _this.task).then((res) => {
            // console.log(this.urlAll.length);
            // console.log('当前时间:', new Date());
            console.log('本次获取新地址数:', res.length);
            if (res[1]) {
                // console.log(res[1]);
                if (res[1].title && res[1].list.length > 0) {
                    _this.db.checkImgDataAndInsert(res[1].list, res[1].title).then((res) => {
                        // console.log(res);
                    });
                }
            }
            console.log('总源地址数量：', _this.urlAll.length);
            console.log('剩余源地址数量：', _this.urlNow.length);
            console.log('已进行：', _this.count);
            _this.getUrl();
        }).catch((error) => {
            this.log.error(error);
            console.warn(error);
            _this.getUrl();
        });
    }
    loopGetUrl(url, data, task) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnURL;
            let returnImgURL;
            try {
                let req = yield req_1.httpGet(url, data, task);
                if (task.iSgb2312 == true) {
                    req = iconv.decode(req, 'gb2312');
                }
                this.count++;
                let $ = cheerio.load(req);
                returnURL = Tool.getAllHref($, url, task, this.urlAll, this.urlNow);
                returnImgURL = Tool.handleImagesUrl(this.url, $, task);
            }
            catch (error) {
                returnURL = [0];
                returnImgURL = [1];
            }
            return [returnURL, returnImgURL];
        });
    }
}
exports.robot = robot;
