/**
 * Created by zhoucaiguang on 2017/3/8.
 */
"use strict";
const SequelizeDb_1 = require('../dbBase/SequelizeDb');
const log4 = require('log4js');
let util = require('util');
// console.log(mysqlBase);
class mysql {
    constructor() {
        this.log = log4.getLogger();
    }
    addImgData(titleId, url) {
        return SequelizeDb_1.ImgDb.create({
            'titleId': titleId,
            'url': url
        });
    }
    addImgTitle(title, imgThums) {
        return SequelizeDb_1.TitleDb.create({
            'title': title,
            'imgThums': imgThums
        });
    }
    checkImgDataAndInsert(herfs, title) {
        return SequelizeDb_1.TitleDb.findOne({
            'where': {
                'title': title
            }
        }).then((response) => {
            if (!response) {
                // console.log('标题不存在');
                this.addImgTitle(title, herfs[0]).then((res) => {
                    this.addImgs(herfs, res.id); //待测试
                }).catch((error) => {
                    console.log(error);
                });
            }
            else {
                this.addImgs(herfs, response.id);
            }
        });
    }
    addImgs(herfs, titleId) {
        let data = this.handleImgData(herfs, titleId);
        if (data.length > 0) {
            data.forEach((item, index) => {
                SequelizeDb_1.ImgDb.findOne({
                    'where': {
                        'url': item.url
                    }
                }).then((res) => {
                    if (!res) {
                        this.addImgData(item.titleId, item.url);
                    }
                });
            });
        }
    }
    handleImgData(hrefs, title) {
        let data = {};
        hrefs.forEach((item, index) => {
            data = { url: item, titleId: title };
            hrefs[index] = data;
        });
        return hrefs;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mysql;
