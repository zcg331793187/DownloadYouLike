/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
const req_1 = require('./req');
const role_1 = require('../configs/role');
const cheerio = require('cheerio');
const Tool = require('../utils/Tool');
const mysql_1 = require('../dbBase/mysql');
const Promise = require('bluebird');
class robot {
    constructor() {
        this.urlAll = [];
        this.urlNow = [];
        this.index = 0;
        this.count = 0;
    }
    init() {
        this.db = new mysql_1.default();
        // console.log(this.db);
        // console.log(c);
        this.getUrl();
    }
    getUrl() {
        let _this = this;
        console.log('开始时间:', new Date());
        _this.task = role_1.configs[_this.index];
        if (_this.urlNow.length == 0) {
            _this.url = _this.task.url;
        }
        else {
            _this.url = _this.urlNow.shift();
        }
        console.log('进行地址：', _this.url);
        _this.loopGetUrl(_this.url, _this.task).then((res) => {
            // console.log(this.urlAll.length);
            console.log('当前时间:', new Date());
            console.log('本次获取新地址数:', res.length);
            _this.db.checkDataAndInsert(res);
            console.log('总源地址数量：', _this.urlAll.length);
            console.log('剩余源地址数量：', _this.urlNow.length);
            console.log('已进行：', _this.count);
            _this.getUrl();
        }).catch((error) => {
            console.log(error);
        });
    }
    loopGetUrl(url, task) {
        return req_1.httpGet(url).then((req) => {
            this.count++;
            let $ = cheerio.load(req);
            let returnURL = Tool.getAllHref($, task, this.urlAll, this.urlNow);
            // console.log(urls);
            return Promise.resolve(returnURL);
        }).catch((err) => {
            console.log(err);
            return Promise.resolve([]);
        });
    }
}
exports.robot = robot;
